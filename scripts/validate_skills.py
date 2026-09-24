#!/usr/bin/env python3
"""Validate skill packaging, local Markdown links, catalog coverage, and JSON.

This checks structure, not model behavior. Run behavioral cases separately.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

import yaml


class UniqueKeyLoader(yaml.SafeLoader):
    """Reject duplicate YAML keys instead of silently replacing instructions."""


def unique_mapping(loader, node, deep=False):
    result = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node, deep=deep)
        if key in result:
            raise ValueError(f"duplicate YAML key: {key}")
        result[key] = loader.construct_object(value_node, deep=deep)
    return result


UniqueKeyLoader.add_constructor(
    yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, unique_mapping
)


def prose_only(text: str) -> str:
    """Exclude fenced examples and inline code from Markdown link checks."""
    lines = []
    fence = None
    for line in text.splitlines():
        marker = re.match(r"^\s{0,3}(`{3,}|~{3,})", line)
        if marker:
            token = marker.group(1)
            if fence is None:
                fence = token
            elif token[0] == fence[0] and len(token) >= len(fence):
                fence = None
            continue
        if fence is None:
            lines.append(line)
    return re.sub(r"(`+).*?\1", "", "\n".join(lines))


def local_links(text: str):
    prose = prose_only(text)
    # Balance parentheses in destinations; do not mistake file(v2).md for file(v2.
    for match in re.finditer(r"!?\[[^\]\n]*\]\(\s*", prose):
        start = match.end()
        if start < len(prose) and prose[start] == "<":
            end = prose.find(">", start + 1)
            if end != -1:
                yield prose[start + 1:end]
            continue
        target = []
        depth = 0
        index = start
        while index < len(prose):
            char = prose[index]
            if char == "\\" and index + 1 < len(prose):
                index += 1
                target.append(prose[index])
            elif char.isspace() or (char == ")" and depth == 0):
                break
            else:
                depth += (char == "(") - (char == ")")
                target.append(char)
            index += 1
        if target:
            yield "".join(target)
    for match in re.finditer(r"^\s{0,3}\[[^\]]+\]:\s*(<[^>]+>|\S+)", prose, re.M):
        yield match.group(1).strip("<>")


def validate(root: Path) -> tuple[list[str], dict]:
    root = root.resolve()
    errors = []
    skills = {}
    words = 0
    root_skills = []
    paths = sorted((root / "skills").rglob("SKILL.md"))
    if not paths:
        errors.append("skills/: no SKILL.md files found")
    for path in paths:
        label = path.relative_to(root).as_posix()
        text = path.read_text(encoding="utf-8-sig")
        words += len(text.split())
        match = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)", text, re.S)
        if not match:
            errors.append(f"{label}: missing YAML frontmatter")
            continue
        try:
            data = yaml.load(match.group(1), Loader=UniqueKeyLoader)
        except (yaml.YAMLError, ValueError, TypeError) as exc:
            errors.append(f"{label}: invalid YAML: {exc}")
            continue
        if not isinstance(data, dict):
            errors.append(f"{label}: frontmatter must be a mapping")
            continue
        name = data.get("name")
        if not isinstance(name, str) or not re.fullmatch(
            r"[a-z0-9]+(?:-[a-z0-9]+)*", name
        ) or len(name) > 64:
            errors.append(f"{label}: invalid skill name")
            continue
        if name != path.parent.name:
            errors.append(f"{label}: name must match directory for portable installs")
        if name in skills:
            errors.append(f"{label}: duplicate skill name {name}")
        skills[name] = label
        description = data.get("description")
        if not isinstance(description, str) or not 1 <= len(description.strip()) <= 1024:
            errors.append(f"{label}: description must contain 1-1024 characters")
        compatibility = data.get("compatibility")
        if compatibility is not None and (
            not isinstance(compatibility, str) or len(compatibility) > 500
        ):
            errors.append(f"{label}: invalid compatibility field")
        hidden = data.get("disable-model-invocation")
        if hidden is not None and not isinstance(hidden, bool):
            errors.append(f"{label}: disable-model-invocation must be boolean")
        metadata = data.get("metadata")
        if metadata is not None and (
            not isinstance(metadata, dict)
            or any(not isinstance(k, str) or not isinstance(v, str) for k, v in metadata.items())
        ):
            errors.append(f"{label}: metadata must map strings to strings")
        if not text[match.end():].strip():
            errors.append(f"{label}: empty skill body")
        if path.parent.parent == root / "skills":
            root_skills.append(path)

    markdown_paths = [root / "README.md"]
    for folder in ("skills", "docs"):
        markdown_paths.extend((root / folder).rglob("*.md"))
    for path in markdown_paths:
        if not path.is_file() or any(p.startswith(".") for p in path.relative_to(root).parts):
            continue
        for link in local_links(path.read_text(encoding="utf-8-sig")):
            try:
                parsed = urlsplit(link)
            except ValueError as exc:
                errors.append(f"{path.relative_to(root)}: invalid link {link}: {exc}")
                continue
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            target = (path.parent / unquote(parsed.path)).resolve()
            if not target.is_relative_to(root):
                errors.append(f"{path.relative_to(root)}: link escapes repository: {link}")
            elif not target.exists():
                errors.append(f"{path.relative_to(root)}: missing local link: {link}")

    catalog = root / "skills" / "README.md"
    if not catalog.is_file():
        errors.append("skills/README.md: missing catalog")
    else:
        catalog_text = catalog.read_text(encoding="utf-8-sig")
        destinations = set()
        for link in local_links(catalog_text):
            try:
                destinations.add(unquote(urlsplit(link).path))
            except ValueError:
                pass  # Reported by the Markdown scan above.
        for path in root_skills:
            relative = path.relative_to(catalog.parent).as_posix()
            if relative not in destinations:
                errors.append(f"skills/README.md: missing catalog link for {path.parent.name}")

    json_count = 0
    for folder in ("skills", "tests"):
        for path in (root / folder).rglob("*.json"):
            if any(p.startswith(".") for p in path.relative_to(root).parts):
                continue
            json_count += 1
            try:
                data = json.loads(path.read_text(encoding="utf-8-sig"))
            except (ValueError, OSError) as exc:
                errors.append(f"{path.relative_to(root)}: invalid JSON: {exc}")
                continue
            if path.name == "skill_cases.json":
                if not isinstance(data, list):
                    errors.append(f"{path.name}: cases must be an array")
                    continue
                seen = set()
                for case in data:
                    if not isinstance(case, dict):
                        errors.append(f"{path.name}: each case must be an object")
                        continue
                    case_id = case.get("id")
                    if not isinstance(case_id, str) or not case_id:
                        errors.append(f"{path.name}: case id must be a nonempty string")
                        continue
                    if case_id in seen:
                        errors.append(f"{path.name}: duplicate case id {case_id}")
                    seen.add(case_id)
                    if not isinstance(case.get("owner"), str) or (case["owner"] not in skills and case["owner"] != "none"):
                        errors.append(f"{path.name}: unknown case owner {case.get('owner')}")
                    checks = case.get("checks")
                    if (not isinstance(case.get("prompt"), str) or not case["prompt"].strip()
                            or not isinstance(checks, list) or not checks
                            or any(not isinstance(item, str) or not item.strip() for item in checks)):
                        errors.append(f"{path.name}: case {case_id} needs a prompt and nonempty string checks")
    yaml_paths = sorted((root / "skills").rglob("*.yaml")) + sorted((root / "skills").rglob("*.yml"))
    for path in yaml_paths:
        try:
            list(yaml.load_all(path.read_text(encoding="utf-8-sig"), Loader=UniqueKeyLoader))
        except (yaml.YAMLError, ValueError, TypeError) as exc:
            errors.append(f"{path.relative_to(root)}: invalid YAML: {exc}")
    return errors, {"skills": len(paths), "root_skills": len(root_skills),
                    "skill_words": words, "json_files": json_count,
                    "yaml_files": len(yaml_paths)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    errors, stats = validate(args.root)
    for error in errors:
        print(f"ERROR {error}", file=sys.stderr)
    print(json.dumps({**stats, "errors": len(errors)}, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
