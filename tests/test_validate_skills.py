"""Regression tests for the pack validator. No network or model calls."""
import json
from pathlib import Path
import tempfile
import unittest

from scripts.validate_skills import local_links, validate


class SkillValidationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.skill = self.root / "skills" / "sample" / "SKILL.md"
        self.skill.parent.mkdir(parents=True)
        self.skill.write_text(
            "---\nname: sample\ndescription: A focused test skill.\n---\n# Sample\nDo the task.\n",
            encoding="utf-8",
        )
        (self.root / "skills" / "README.md").write_text(
            "# Catalog\n[Sample](sample/SKILL.md)\n", encoding="utf-8"
        )

    def errors(self):
        return validate(self.root)[0]

    def test_valid_pack(self):
        self.assertEqual(self.errors(), [])

    def test_duplicate_name(self):
        other = self.root / "skills" / "other" / "SKILL.md"
        other.parent.mkdir()
        other.write_text(self.skill.read_text(encoding="utf-8"), encoding="utf-8")
        self.assertTrue(any("duplicate skill name" in e for e in self.errors()))

    def test_missing_frontmatter(self):
        self.skill.write_text("# No metadata\n", encoding="utf-8")
        self.assertTrue(any("missing YAML" in e for e in self.errors()))

    def test_duplicate_yaml_key(self):
        self.skill.write_text(
            "---\nname: sample\nname: different\ndescription: test\n---\nBody\n",
            encoding="utf-8",
        )
        self.assertTrue(any("duplicate YAML key" in e for e in self.errors()))

    def test_invalid_yaml(self):
        self.skill.write_text("---\nname: [\n---\nBody\n", encoding="utf-8")
        self.assertTrue(any("invalid YAML" in e for e in self.errors()))

    def test_description_limit(self):
        self.skill.write_text(
            f"---\nname: sample\ndescription: {'x' * 1025}\n---\nBody\n", encoding="utf-8"
        )
        self.assertTrue(any("1-1024" in e for e in self.errors()))

    def test_missing_relative_link(self):
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write("\n[Missing](references/missing.md)\n")
        self.assertTrue(any("missing local link" in e for e in self.errors()))

    def test_parenthesized_and_escaped_link_paths(self):
        (self.skill.parent / "file(v2).md").write_text("# Reference\n", encoding="utf-8")
        (self.skill.parent / "with space.md").write_text("# Reference\n", encoding="utf-8")
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write('[v2](file(v2).md "title") [space](<with space.md>)\n')
            stream.write(r'[escaped](file\(v2\).md)' + '\n')
        self.assertEqual(self.errors(), [])

    def test_malformed_url_reports_error_without_crashing(self):
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write("[broken](https://[invalid)\n")
        self.assertTrue(any("invalid link" in error for error in self.errors()))

    def test_reference_style_link(self):
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write("\nRead [guide].\n[guide]: missing.md\n")
        self.assertTrue(any("missing local link" in e for e in self.errors()))

    def test_code_examples_are_not_links(self):
        self.assertEqual(list(local_links(
            "```md\n[x](missing.md)\n```\n`[x](missing.md)`\n"
        )), [])

    def test_external_links_and_anchors_are_not_local_files(self):
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write("[web](https://example.com/a) [self](#sample)\n")
        self.assertEqual(self.errors(), [])

    def test_link_escape(self):
        with self.skill.open("a", encoding="utf-8") as stream:
            stream.write("[outside](../../../../external.md)\n")
        self.assertTrue(any("escapes repository" in e for e in self.errors()))

    def test_catalog_must_cover_root_skills(self):
        (self.root / "skills" / "README.md").write_text("# Catalog\n", encoding="utf-8")
        self.assertTrue(any("missing catalog link" in e for e in self.errors()))

    def test_invalid_support_yaml(self):
        (self.skill.parent / "agent.yaml").write_text("interface: [", encoding="utf-8")
        self.assertTrue(any("agent.yaml: invalid YAML" in e for e in self.errors()))

    def test_invalid_json(self):
        (self.skill.parent / "bad.json").write_text("{", encoding="utf-8")
        self.assertTrue(any("invalid JSON" in e for e in self.errors()))

    def test_cases_must_target_existing_owner(self):
        directory = self.root / "tests"
        directory.mkdir()
        (directory / "skill_cases.json").write_text(json.dumps([
            {"id": "case", "owner": "absent", "prompt": "test", "checks": ["test"]}
        ]), encoding="utf-8")
        self.assertTrue(any("unknown case owner" in e for e in self.errors()))

    def test_malformed_cases_report_errors_without_crashing(self):
        directory = self.root / "tests"
        directory.mkdir()
        cases = directory / "skill_cases.json"
        for value in ({}, [None], [{"id": []}], [{"id": "case", "owner": []}],
                      [{"id": "case", "owner": "sample", "prompt": "test", "checks": "not a list"}]):
            with self.subTest(value=value):
                cases.write_text(json.dumps(value), encoding="utf-8")
                self.assertTrue(any("skill_cases.json" in error for error in self.errors()))

    def test_discovery_flag_must_be_boolean(self):
        self.skill.write_text(
            "---\nname: sample\ndescription: test\ndisable-model-invocation: 'true'\n---\nBody\n",
            encoding="utf-8",
        )
        self.assertTrue(any("must be boolean" in e for e in self.errors()))


if __name__ == "__main__":
    unittest.main()
