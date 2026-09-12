from pathlib import Path
import importlib.util

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
