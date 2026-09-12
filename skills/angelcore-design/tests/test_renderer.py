from pathlib import Path
import importlib.util
import subprocess
import sys

import numpy as np
from PIL import Image
import pytest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("renderer", ROOT / "tools/ascii_dither.py")
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)


@pytest.mark.parametrize("size", [2, 4, 8])
def test_bayer_has_all_thresholds(size):
    matrix = r.bayer(size)
    assert matrix.shape == (size, size)
    assert len(np.unique(matrix)) == size * size
    assert 0 < matrix.min() < matrix.max() < 1


def test_known_bayer_matrix():
    expected = np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]])
    assert np.array_equal(r.bayer(4), (expected + 0.5) / 16)


@pytest.mark.parametrize("value,expected", [(0, 0), (1, 255)])
def test_binary_extremes(value, expected):
    assert np.all(r.binary_pixels(np.full((24, 32), value)) == expected)


def test_middle_gray_coverage_and_repeatability():
    tone = np.full((64, 64), 0.5)
    first = r.binary_pixels(tone)
    assert (first == 255).mean() == 0.5
    assert np.array_equal(first, r.binary_pixels(tone))


def test_tone_map_gamma_darkens():
    image = Image.new("L", (10, 10), 128)
    light = r.tone_map(image, image.size, 0, 255, 1)
    dark = r.tone_map(image, image.size, 0, 255, 2)
    assert np.all(dark < light)


@pytest.mark.parametrize("black,white,gamma", [(30, 10, 1), (0, 256, 1), (0, 255, 0), (0, 255, float("nan"))])
def test_bad_tone_parameters(black, white, gamma):
    with pytest.raises(ValueError):
        r.tone_map(Image.new("L", (2, 2)), (2, 2), black, white, gamma)


def test_alpha_is_flattened_and_crop_is_checked(tmp_path):
    path = tmp_path / "source.png"
    Image.new("RGBA", (10, 20), (255, 255, 255, 0)).save(path)
    assert np.asarray(r.load_source(path)).max() == 0
    assert r.load_source(path, (1, 2, 8, 15)).size == (7, 13)
    with pytest.raises(ValueError):
        r.load_source(path, (0, 0, 11, 20))


def test_exif_orientation(tmp_path):
    image = Image.new("RGB", (10, 20))
    exif = image.getexif(); exif[274] = 6
    path = tmp_path / "rotated.jpg"
    image.save(path, exif=exif)
    assert r.load_source(path).size == (20, 10)


def test_size_uses_cell_aspect():
    assert r.output_size((400, 200), 80, cell_ratio=0.5) == (80, 20)
    assert r.output_size((400, 200), 80) == (80, 40)
    assert r.output_size((400, 200), 80, 31) == (80, 31)


def test_saved_png_is_binary_and_scaled(tmp_path):
    values = np.array([[0, 255], [255, 0]], dtype=np.uint8)
    path = tmp_path / "output.png"
    r.save_binary(values, path, 3)
    with Image.open(path) as image:
        assert image.mode == "1"
        assert image.size == (6, 6)
        assert set(np.unique(np.asarray(image.convert("L")))) == {0, 255}


def test_ascii_grid_and_range():
    tone = np.tile(np.linspace(0, 1, 80), (24, 1))
    text = r.ascii_text(tone)
    assert len(text.splitlines()) == 24
    assert all(len(line) == 80 for line in text.splitlines())
    assert all(32 <= ord(char) <= 126 or char == "\n" for char in text)
    assert text == r.ascii_text(tone)


def test_two_state_ascii():
    text = r.ascii_text(np.full((8, 16), 0.5), ramp=" #")
    assert set(text) <= set(" #\n")
    assert text.count("#") == 64


def test_ascii_coverage_is_validated():
    with pytest.raises(ValueError):
        r.ascii_text(np.ones((2, 2)), ramp=" .", coverage=[0.2, 0.1])
    with pytest.raises(ValueError):
        r.ascii_text(np.ones((2, 2)), ramp=" \u2588")


def test_actual_fixture_files():
    binary = Image.open(ROOT / "examples/web/assets/sample-1bit.png")
    assert binary.mode == "1"
    assert set(np.unique(np.asarray(binary.convert("L")))) == {0, 255}
    ambient = np.asarray(Image.open(ROOT / "examples/web/assets/sample-ambient.png"))
    assert set(np.unique(ambient)) == {9, 37}
    assert np.array_equal(ambient == 37, np.asarray(binary.convert("L")) == 255)


def test_cli_success_and_source_protection(tmp_path):
    path = tmp_path / "source.png"
    Image.new("L", (20, 30), 128).save(path)
    output = tmp_path / "output.png"
    result = subprocess.run([sys.executable, str(ROOT / "tools/ascii_dither.py"), str(path), str(output), "--width", "12"], capture_output=True, text=True)
    assert result.returncode == 0
    assert Image.open(output).size == (12, 18)
    protected = subprocess.run([sys.executable, str(ROOT / "tools/ascii_dither.py"), str(path), str(path)], capture_output=True, text=True)
    assert protected.returncode == 2
    assert Image.open(path).mode == "L"
