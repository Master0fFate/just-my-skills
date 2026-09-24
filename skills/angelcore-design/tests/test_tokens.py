from pathlib import Path
import importlib.util
import json
import shutil

import pytest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("audit", ROOT / "tools/audit.py")
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)


def test_bundle_contracts():
    report = a.audit(ROOT)
    assert report["passed"], [item for item in report["checks"] if not item["passed"]]


def test_contrast_known_values():
    assert a.contrast("#000000", "#ffffff") == 21
    assert a.contrast("#090909", "#090909") == 1


@pytest.mark.parametrize("missing", [
    "references/tokens.json", "assets/angelcore.css", "references/no-cages.md",
    "tests/test_renderer.py", "examples/web/assets/sample-1bit.png",
])
def test_missing_package_file_reports_failure(tmp_path, missing):
    root = tmp_path / "bundle"
    shutil.copytree(ROOT, root, ignore=shutil.ignore_patterns("evidence", "__pycache__", ".pytest_cache"))
    (root / missing).unlink()
    report = a.audit(root)
    assert not report["passed"]
    assert missing in report["checks"][0]["details"]


def test_public_package_can_omit_private_reference(tmp_path):
    root = tmp_path / "bundle"
    shutil.copytree(ROOT, root, ignore=shutil.ignore_patterns("evidence", "__pycache__", ".pytest_cache"))
    (root / "references/target-ui.png").unlink()
    assert a.audit(root)["passed"]
    assert not a.audit(root)["reference_present"]
    assert not a.audit(root, require_reference=True)["passed"]


@pytest.mark.parametrize("empty_field", ["text_tokens", "surfaces"])
def test_empty_contrast_coverage_is_not_a_pass(tmp_path, empty_field):
    root = tmp_path / "bundle"
    shutil.copytree(ROOT, root, ignore=shutil.ignore_patterns("evidence", "__pycache__", ".pytest_cache"))
    path = root / "references/tokens.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["contrast_checks"][empty_field] = []
    path.write_text(json.dumps(data), encoding="utf-8")
    report = a.audit(root)
    assert not report["passed"]
    assert report["checks"][-1]["name"] == "Token data is valid"


@pytest.mark.parametrize("content", ["{", "{}", json.dumps({"colors": [], "contrast_checks": {}})])
def test_bad_tokens_return_structured_failure(tmp_path, content):
    root = tmp_path / "bundle"
    shutil.copytree(ROOT, root, ignore=shutil.ignore_patterns("evidence", "__pycache__", ".pytest_cache"))
    (root / "references/tokens.json").write_text(content, encoding="utf-8")
    report = a.audit(root)
    assert not report["passed"]
    assert report["checks"][-1]["name"] == "Token data is valid"
