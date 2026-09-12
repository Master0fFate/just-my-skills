#!/usr/bin/env python3
"""Deterministic source-driven binary and ASCII conversion.

Tone mapping happens before quantization. Pixel output is a mode-1 PNG.
ASCII output uses measured coverage when supplied, otherwise an estimated ramp.
No network access, font dependency, random noise, or extra dither pass is used.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Sequence

import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

DEFAULT_RAMP = " .,:;ox%#@"
DEFAULT_COVERAGE = (0.0, 0.03, 0.06, 0.10, 0.14, 0.22, 0.28, 0.42, 0.55, 0.65)
MAX_PIXELS = 16_777_216


def bayer(size: int = 4) -> np.ndarray:
    """Return a fixed threshold map. Values are strictly between 0 and 1."""
    if size not in (2, 4, 8):
        raise ValueError("Matrix size must be 2, 4, or 8.")
    matrix = np.array([[0, 2], [3, 1]], dtype=np.float64)
    while matrix.shape[0] < size:
        matrix = np.block([[4 * matrix, 4 * matrix + 2],
                           [4 * matrix + 3, 4 * matrix + 1]])
    return (matrix + 0.5) / (size * size)


def load_source(path: Path, crop: tuple[int, int, int, int] | None = None) -> Image.Image:
    """Load the first image frame; orient it; flatten alpha onto black."""
    with Image.open(path) as image:
        if image.width * image.height > MAX_PIXELS:
            raise ValueError(f"Source exceeds {MAX_PIXELS:,} pixels. Resize it first.")
        image = ImageOps.exif_transpose(image).convert("RGBA")
        if crop is not None:
            left, top, right, bottom = crop
            if not (0 <= left < right <= image.width and
                    0 <= top < bottom <= image.height):
                raise ValueError("Crop must be a positive rectangle inside the oriented source.")
            image = image.crop(crop)
        base = Image.new("RGBA", image.size, (0, 0, 0, 255))
        return Image.alpha_composite(base, image).convert("L")


def output_size(source: tuple[int, int], width: int, height: int | None = None,
                cell_ratio: float = 1.0) -> tuple[int, int]:
    if not 1 <= width <= 4096:
        raise ValueError("Width must be between 1 and 4096.")
    if not math.isfinite(cell_ratio) or not 0 < cell_ratio <= 2:
        raise ValueError("Cell ratio must be greater than 0 and no more than 2.")
    if height is None:
        height = max(1, round(width * source[1] / source[0] * cell_ratio))
    if height < 1 or width * height > MAX_PIXELS:
        raise ValueError("Output dimensions are invalid or too large.")
    return width, height


def tone_map(image: Image.Image, size: tuple[int, int], black: float = 8,
             white: float = 232, gamma: float = 1.4,
             invert: bool = False) -> np.ndarray:
    if not (math.isfinite(black) and math.isfinite(white) and 0 <= black < white <= 255):
        raise ValueError("Tone limits must satisfy 0 <= black < white <= 255.")
    if not math.isfinite(gamma) or gamma <= 0:
        raise ValueError("Gamma must be finite and greater than 0.")
    if size[0] < 1 or size[1] < 1 or size[0] * size[1] > MAX_PIXELS:
        raise ValueError("Tone-map dimensions are invalid or too large.")
    # Resample the continuous source, not an already quantized image.
    gray = np.asarray(image.convert("L").resize(size, Image.Resampling.LANCZOS),
                      dtype=np.float64)
    if invert:
        gray = 255 - gray
    return np.clip((gray - black) / (white - black), 0, 1) ** gamma


def threshold_grid(shape: tuple[int, int], size: int) -> np.ndarray:
    matrix = bayer(size)
    rows, cols = shape
    return matrix[np.arange(rows)[:, None] % size, np.arange(cols)[None, :] % size]


def binary_pixels(tone: np.ndarray, matrix: int = 4) -> np.ndarray:
    if tone.ndim != 2 or not np.isfinite(tone).all() or ((tone < 0) | (tone > 1)).any():
        raise ValueError("Tone must be a finite two-dimensional map in [0, 1].")
    return (tone > threshold_grid(tone.shape, matrix)).astype(np.uint8) * 255


def ascii_text(tone: np.ndarray, ramp: str = DEFAULT_RAMP,
               coverage: Sequence[float] | None = None, matrix: int = 4) -> str:
    if len(ramp) < 2 or ramp[0] != " " or len(set(ramp)) != len(ramp):
        raise ValueError("Ramp must start with space and contain at least two unique characters.")
    if any(not 32 <= ord(char) <= 126 for char in ramp):
        raise ValueError("Art ramp must contain printable ASCII only.")
    if tone.ndim != 2 or not np.isfinite(tone).all() or ((tone < 0) | (tone > 1)).any():
        raise ValueError("Tone must be a finite two-dimensional map in [0, 1].")
    if coverage is None:
        coverage = DEFAULT_COVERAGE if ramp == DEFAULT_RAMP else np.linspace(0, 1, len(ramp))
    levels = np.asarray(coverage, dtype=np.float64)
    if (levels.shape != (len(ramp),) or not np.isfinite(levels).all()
            or levels[0] != 0 or levels[-1] > 1 or np.any(np.diff(levels) <= 0)):
        raise ValueError("Coverage must match the ramp, start at 0, increase, and end at <= 1.")
    # Map source white to the darkest glyph's measured ink coverage.
    value = tone * levels[-1]
    low = np.clip(np.searchsorted(levels, value, side="right") - 1, 0, len(ramp) - 2)
    mix = (value - levels[low]) / (levels[low + 1] - levels[low])
    index = low + (mix > threshold_grid(tone.shape, matrix)).astype(np.int64)
    chars = np.asarray(list(ramp))[index]
    # Keep trailing spaces: they are part of the fixed character grid.
    return "\n".join("".join(row) for row in chars) + "\n"


def save_binary(pixels: np.ndarray, path: Path, scale: int = 1) -> None:
    if path.suffix.lower() != ".png":
        raise ValueError("Binary output must use a .png filename.")
    if not 1 <= scale <= 8 or pixels.size * scale * scale > MAX_PIXELS:
        raise ValueError("Integer scale must be 1 to 8 and fit the output pixel limit.")
    if not set(np.unique(pixels)).issubset({0, 255}):
        raise ValueError("Binary output contains a value other than 0 or 255.")
    image = Image.fromarray(pixels.astype(np.uint8)).convert("1", dither=Image.Dither.NONE)
    if scale != 1:
        image = image.resize((image.width * scale, image.height * scale), Image.Resampling.NEAREST)
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def parse_crop(value: str) -> tuple[int, int, int, int]:
    try:
        parts = tuple(int(x) for x in value.split(","))
    except ValueError as exc:
        raise argparse.ArgumentTypeError("Crop requires four integers.") from exc
    if len(parts) != 4:
        raise argparse.ArgumentTypeError("Use LEFT,TOP,RIGHT,BOTTOM for crop.")
    return parts  # type: ignore[return-value]


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--mode", choices=("pixels", "ascii"), default="pixels")
    parser.add_argument("--width", type=int, default=None, help="Pixel columns or text columns.")
    parser.add_argument("--height", type=int, help="Optional explicit rows; may change source aspect.")
    parser.add_argument("--cell-ratio", type=float, default=0.5, help="Text cell width / height.")
    parser.add_argument("--black", type=float, default=8)
    parser.add_argument("--white", type=float, default=232)
    parser.add_argument("--gamma", type=float, default=1.4)
    parser.add_argument("--matrix", type=int, choices=(2, 4, 8), default=4)
    parser.add_argument("--scale", type=int, default=1, help="Integer pixel export scale.")
    parser.add_argument("--invert", action="store_true")
    parser.add_argument("--crop", type=parse_crop)
    parser.add_argument("--ramp", default=DEFAULT_RAMP)
    parser.add_argument("--coverage", help="Comma-separated measured ink coverage for each glyph.")
    parser.add_argument("--report", type=Path, help="Optional JSON conversion record.")
    args = parser.parse_args(argv)
    try:
        if args.source.resolve() == args.output.resolve():
            raise ValueError("Source and output must be different files.")
        if args.report and args.report.resolve() in (args.source.resolve(), args.output.resolve()):
            raise ValueError("Report must not replace the source or output.")
        if args.mode == "ascii" and args.scale != 1:
            raise ValueError("Use text columns and cell ratio for ASCII; --scale is pixel-only.")
        image = load_source(args.source, args.crop)
        width = args.width if args.width is not None else (80 if args.mode == "ascii" else 512)
        size = output_size(image.size, width, args.height,
                           args.cell_ratio if args.mode == "ascii" else 1.0)
        tone = tone_map(image, size, args.black, args.white, args.gamma, args.invert)
        if args.mode == "pixels":
            pixels = binary_pixels(tone, args.matrix)
            save_binary(pixels, args.output, args.scale)
            extra = {"binary_values": [int(x) for x in np.unique(pixels)],
                     "ink_coverage": float((pixels == 255).mean()), "png_mode": "1"}
        else:
            coverage = [float(x) for x in args.coverage.split(",")] if args.coverage else None
            text = ascii_text(tone, args.ramp, coverage, args.matrix)
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(text, encoding="utf-8")
            extra = {"ramp": args.ramp, "coverage_source": "supplied" if coverage else "estimate"}
        record = {"source": str(args.source), "output": str(args.output), "mode": args.mode,
                  "grid": list(size), "scale": args.scale, "matrix": args.matrix,
                  "black": args.black, "white": args.white, "gamma": args.gamma,
                  "inverted": args.invert, "alpha_ground": "black", **extra}
        if args.report:
            args.report.parent.mkdir(parents=True, exist_ok=True)
            args.report.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(record))
        return 0
    except (OSError, ValueError, UnidentifiedImageError, Image.DecompressionBombError) as exc:
        parser.exit(2, f"error: {exc}\n")


if __name__ == "__main__":
    raise SystemExit(main())
