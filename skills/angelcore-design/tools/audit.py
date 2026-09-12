#!/usr/bin/env python3
"""Check this bundle's local contracts. This is not a full visual or access audit."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def luminance(value: str) -> float:
    rgb = [int(value[index:index + 2], 16) / 255 for index in (1, 3, 5)]
    linear = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in rgb]
    return sum(x * weight for x, weight in zip(linear, (0.2126, 0.7152, 0.0722)))


def contrast(foreground: str, background: str) -> float:
    high, low = sorted((luminance(foreground), luminance(background)), reverse=True)
    return (high + 0.05) / (low + 0.05)


def audit(root: Path = ROOT) -> dict:
    checks = []
    def check(name, passed, details=""):
        checks.append({"name": name, "passed": bool(passed), "details": details})

    required = ["SKILL.md", "README.md", "CHANGELOG.md", "references/reference-audit.md",
                "references/visual-system.md", "references/components.md", "references/image-treatment.md",
                "references/quality-check.md", "references/prompt-recipes.md", "references/sources.md",
                "references/tokens.json", "references/target-ui.png", "assets/angelcore.css",
                "tools/ascii_dither.py", "tools/make_test_source.py", "examples/web/index.html",
                "examples/web/archive.html", "examples/web/components.html", "examples/web/demo.js",
                "examples/web/demo.css", "examples/terminal/demo.py", "requirements.txt",
                "tests/browser_check.py"]
    missing = [path for path in required if not (root / path).is_file()]
    check("All required package files exist", not missing, missing)
    tokens = json.loads((root / "references/tokens.json").read_text())
    colors = tokens["colors"]
    css = (root / "assets/angelcore.css").read_text()
    for name, value in colors.items():
        check(f"Token {name} is neutral", value[1:3] == value[3:5] == value[5:7], value)
        check(f"CSS matches token {name}", f"--ac-{name}: {value};" in css, value)
    c = tokens["contrast_checks"]
    for text in c["text_tokens"]:
        for surface in c["surfaces"]:
            ratio = contrast(colors[text], colors[surface])
            check(f"Text contrast: {text} on {surface}", ratio >= c["text_min"], {"ratio": ratio, "minimum": c["text_min"]})
    for surface in c["surfaces"]:
        ratio = contrast(colors[c["boundary_token"]], colors[surface])
        check(f"Control contrast on {surface}", ratio >= c["boundary_min"], {"ratio": ratio, "minimum": c["boundary_min"]})
    for path in ("assets/angelcore.css", "examples/web/demo.css"):
        source = (root / path).read_text()
        declarations = re.findall(r"border-radius\s*:\s*([^;}]+)", source)
        check(f"Square radius declarations: {path}", all(x.strip() in ("0", "0px", "var(--ac-radius)") for x in declarations), declarations)
        check(f"No decorative effects in CSS: {path}", not re.search(r"(?:linear|radial|conic)-gradient\(|(?:backdrop-)?filter\s*:\s*(?!none)", source), "Static CSS check only")
        for value in set(re.findall(r"#[0-9a-fA-F]{6}\b", source)):
            check(f"Neutral declared hex: {path} {value}", value[1:3].lower() == value[3:5].lower() == value[5:7].lower())
    check("No bundled font files", not any(path.suffix.lower() in (".ttf", ".otf", ".woff", ".woff2") for path in root.rglob("*")))
    return {"scope": "Local file, token, contrast-pair, and static CSS checks only. Not full WCAG conformance or a visual score.",
            "passed": all(item["passed"] for item in checks), "check_count": len(checks), "checks": checks}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    report = audit()
    text = json.dumps(report, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text)
    print(text, end="")
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
