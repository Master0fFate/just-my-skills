#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
from typing import Sequence

import numpy as np
from PIL import Image, ImageFilter, UnidentifiedImageError

from ascii_dither import MAX_PIXELS, binary_pixels, load_source, output_size, parse_crop, same_file

TINTS = {
    "neutral": ((0, 0, 0), (255, 255, 255)),
    "cold": ((4, 7, 11), (223, 233, 241)),
}
FADES = ("none", "radial", "left", "right", "top", "bottom")
KEYS = ("none", "left", "right", "top", "bottom")
RESIDUE_SATURATION = (0.18, 0.45)
RESIDUE_MAX = 0.25
DITHERS = ("none", "band", "full")
BAND = (0.12, 0.88)


def key_light(gray: np.ndarray, side: str, strength: float) -> np.ndarray:
    if side == "none" or strength <= 0:
        return gray
    rows, cols = gray.shape
    across = np.linspace(-1, 1, cols)[None, :] if side in ("left", "right") else np.linspace(-1, 1, rows)[:, None]
    toward = -across if side in ("left", "top") else across
    return np.clip(gray * (1 + strength * toward), 0, 255)


def crush(gray: np.ndarray, black: float, white: float, gamma: float) -> np.ndarray:
    if not (0 <= black < white <= 255) or not math.isfinite(gamma) or gamma <= 0:
        raise ValueError("Levels must satisfy 0 <= black < white <= 255 and gamma > 0.")
    return np.clip((gray - black) / (white - black), 0, 1) ** gamma


def blur(value: np.ndarray, radius: float) -> np.ndarray:
    image = Image.fromarray(np.round(np.clip(value, 0, 1) * 255).astype(np.uint8))
    return np.asarray(image.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float64) / 255


def screen(base: np.ndarray, light: np.ndarray) -> np.ndarray:
    return 1 - (1 - base) * (1 - np.clip(light, 0, 1))


def halation(value: np.ndarray, knee: float, radius: float, strength: float) -> np.ndarray:
    if radius <= 0 or strength <= 0:
        return value
    glow = blur(np.clip((value - knee) / (1 - knee), 0, 1), radius) * strength
    return screen(value, glow)


def fade_map(shape: tuple[int, int], mode: str, strength: float) -> np.ndarray:
    rows, cols = shape
    y = np.linspace(-1, 1, rows)[:, None]
    x = np.linspace(-1, 1, cols)[None, :]
    if mode == "none" or strength <= 0:
        return np.ones(shape)
    if mode == "radial":
        kept = 1 - np.sqrt(x ** 2 + y ** 2) / math.sqrt(2)
    elif mode == "left":
        kept = (x + 1) / 2
    elif mode == "right":
        kept = (1 - x) / 2
    elif mode == "top":
        kept = (y + 1) / 2
    else:
        kept = (1 - y) / 2
    return 1 - strength * (1 - np.clip(kept, 0, 1)) ** 2


def scratches(value: np.ndarray, rng: np.random.Generator, count: int, strength: float) -> np.ndarray:
    rows, cols = value.shape
    light = np.zeros_like(value)
    for _ in range(count):
        length = int(rows * rng.uniform(0.2, 0.9))
        start = int(rng.integers(0, max(1, rows - length)))
        column = rng.uniform(0, cols - 1)
        slope = math.tan(math.radians(rng.uniform(-6, 6)))
        brightness = rng.uniform(0.25, 1.0) * strength
        flicker = rng.uniform(0.3, 1.0, length)
        for step in range(length):
            x = int(round(column + step * slope))
            if 0 <= x < cols:
                light[start + step, x] = max(light[start + step, x], brightness * flicker[step])
    return screen(value, light)


def dust(value: np.ndarray, rng: np.random.Generator, count: int, strength: float) -> np.ndarray:
    rows, cols = value.shape
    light = np.zeros_like(value)
    ys = rng.integers(0, rows, count)
    xs = rng.integers(0, cols, count)
    light[ys, xs] = rng.uniform(0.4, 1.0, count) * strength
    return screen(value, light)


def sparkles(value: np.ndarray, rng: np.random.Generator, count: int, size: float) -> np.ndarray:
    rows, cols = value.shape
    light = np.zeros_like(value)
    for _ in range(count):
        length = size * rng.uniform(0.5, 1.5)
        tall = length * 1.3
        width = max(1.0, length * 0.07)
        cy = rng.uniform(tall, rows - tall)
        cx = rng.uniform(length, cols - length)
        y0, y1 = int(cy - tall) - 1, int(cy + tall) + 2
        x0, x1 = int(cx - length) - 1, int(cx + length) + 2
        dy = np.arange(y0, y1)[:, None] - cy
        dx = np.arange(x0, x1)[None, :] - cx
        arm_v = np.clip(1 - np.abs(dy) / tall, 0, 1) ** 3 * np.clip(1 - np.abs(dx) / width, 0, 1)
        arm_h = np.clip(1 - np.abs(dx) / length, 0, 1) ** 3 * np.clip(1 - np.abs(dy) / width, 0, 1)
        core = np.exp(-(dx ** 2 + dy ** 2) / (2 * (width * 1.6) ** 2))
        light[y0:y1, x0:x1] = np.maximum(light[y0:y1, x0:x1], np.clip(arm_v + arm_h + core, 0, 1))
    return screen(value, light)


def grain(value: np.ndarray, rng: np.random.Generator, sigma: float) -> np.ndarray:
    if sigma <= 0:
        return value
    noise = rng.standard_normal(value.shape) * sigma * (0.4 + 0.6 * (1 - value))
    return np.clip(value + noise, 0, 1)


def scanlines(value: np.ndarray, period: int, depth: float) -> np.ndarray:
    if period < 2 or depth <= 0:
        return value
    out = value.copy()
    out[::period] *= 1 - depth
    return out


def dither(value: np.ndarray, mode: str, matrix: int) -> np.ndarray:
    if mode == "none":
        return value
    if mode == "full":
        return binary_pixels(value, matrix) / 255
    low, high = BAND
    marks = binary_pixels(np.clip((value - low) / (high - low), 0, 1), matrix) / 255
    return np.where((value >= low) & (value <= high), low + (high - low) * marks, value)


def tint(value: np.ndarray, name: str) -> Image.Image:
    if name == "neutral":
        return Image.fromarray(np.round(value * 255).astype(np.uint8))
    dark, light = (np.array(x, dtype=np.float64) for x in TINTS[name])
    rgb = dark + (light - dark) * value[..., None]
    return Image.fromarray(np.round(rgb).astype(np.uint8), mode="RGB")


def residue_mask(rgb: Image.Image, hue: float, width: float) -> tuple[np.ndarray, np.ndarray]:
    hsv = np.asarray(rgb.convert("HSV"), dtype=np.float64) / 255
    distance = np.abs((hsv[..., 0] * 360 - hue + 180) % 360 - 180)
    near = np.clip(1 - distance / width, 0, 1)
    low, full = RESIDUE_SATURATION
    colored = np.clip((hsv[..., 1] - low) / (full - low), 0, 1)
    return blur(near * colored, 1.2), hsv[..., 0]


def residue(base: Image.Image, mask: np.ndarray, hue: np.ndarray, strength: float) -> Image.Image:
    rgb = np.asarray(base.convert("RGB"), dtype=np.float64) / 255
    washed = np.stack([hue, strength * mask, rgb.max(axis=-1)], axis=-1)
    tinted = np.asarray(Image.fromarray(np.round(washed * 255).astype(np.uint8), mode="HSV").convert("RGB"), dtype=np.float64) / 255
    return Image.fromarray(np.round((rgb + (tinted - rgb) * mask[..., None]) * 255).astype(np.uint8), mode="RGB")


def whitewash(gray: np.ndarray, rng: np.random.Generator, args: argparse.Namespace) -> tuple[np.ndarray, np.ndarray]:
    value = crush(key_light(gray, args.key, args.key_strength), args.black, args.white, args.gamma)
    value = halation(value, args.halo_knee, args.halo_radius, args.halo)
    value *= fade_map(value.shape, args.fade, args.fade_strength)
    value = scratches(value, rng, args.scratches, args.scratch_strength)
    value = dust(value, rng, args.dust, args.scratch_strength)
    value = sparkles(value, rng, args.sparkles, args.sparkle_size)
    if args.dither == "full":
        value = grain(value, rng, args.grain)
        value = scanlines(value, args.scan_period, args.scan_depth)
        return dither(value * args.peak, args.dither, args.matrix), value * args.peak
    tone = value * args.peak
    value = dither(value, args.dither, args.matrix)
    value = grain(value, rng, args.grain)
    value = scanlines(value, args.scan_period, args.scan_depth)
    return value * args.peak, tone


def grain_tile(size: int, rng: np.random.Generator, alpha: float) -> Image.Image:
    if not 8 <= size <= 1024:
        raise ValueError("Tile size must be between 8 and 1024.")
    noise = np.clip(rng.standard_normal((size, size)) * 0.5 + 0.1, 0, 1)
    rgba = np.zeros((size, size, 4), dtype=np.uint8)
    rgba[..., :3] = 255
    rgba[..., 3] = np.round(noise * alpha * 255).astype(np.uint8)
    return Image.fromarray(rgba, mode="RGBA")


def signature(value: np.ndarray, mask: np.ndarray | None) -> dict:
    gray = value * 255
    return {"void_share": float((gray <= 24).mean()), "white_share": float((gray >= 230).mean()),
            "mid_share": float(((gray > 60) & (gray < 180)).mean()),
            "residue_share": float((mask > 0.5).mean()) if mask is not None else 0.0}


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Whitewash a source into the angelcore light.")
    parser.add_argument("source", type=Path, nargs="?")
    parser.add_argument("output", type=Path)
    parser.add_argument("--tile", type=int, help="Write a seeded transparent grain tile of this size instead of converting a source.")
    parser.add_argument("--tile-alpha", type=float, default=0.1)
    parser.add_argument("--seed", type=int, default=1)
    parser.add_argument("--width", type=int, default=768)
    parser.add_argument("--height", type=int)
    parser.add_argument("--crop", type=parse_crop)
    parser.add_argument("--black", type=float, default=28, help="Source value that becomes the void.")
    parser.add_argument("--white", type=float, default=110, help="Source value that clips to white.")
    parser.add_argument("--gamma", type=float, default=1.0)
    parser.add_argument("--key", choices=KEYS, default="none", help="Side the light comes from; the far side falls into the void.")
    parser.add_argument("--key-strength", type=float, default=0.6)
    parser.add_argument("--residue", type=float, help="Hue in degrees that keeps a washed trace of its color, for example 135 for green eyes.")
    parser.add_argument("--residue-width", type=float, default=22, help="Hue window in degrees around --residue.")
    parser.add_argument("--residue-strength", type=float, default=0.12, help="Saturation of the trace, at most 0.25.")
    parser.add_argument("--halo", type=float, default=0.7, help="Halation strength, 0 disables.")
    parser.add_argument("--halo-radius", type=float, default=36)
    parser.add_argument("--halo-knee", type=float, default=0.7)
    parser.add_argument("--fade", choices=FADES, default="radial")
    parser.add_argument("--fade-strength", type=float, default=0.9)
    parser.add_argument("--scratches", type=int, default=10)
    parser.add_argument("--scratch-strength", type=float, default=0.6)
    parser.add_argument("--dust", type=int, default=120)
    parser.add_argument("--sparkles", type=int, default=0)
    parser.add_argument("--sparkle-size", type=float, default=22)
    parser.add_argument("--grain", type=float, default=0.07, help="Noise sigma in [0, 1] tone units.")
    parser.add_argument("--scan-period", type=int, default=0, help="Darken every Nth row; 0 disables.")
    parser.add_argument("--scan-depth", type=float, default=0.2)
    parser.add_argument("--peak", type=float, default=1.0, help="Scale the final light; use about 0.35 for ambient art.")
    parser.add_argument("--dither", choices=DITHERS, default="band")
    parser.add_argument("--matrix", type=int, choices=(2, 4, 8), default=8)
    parser.add_argument("--tint", choices=tuple(TINTS), default="neutral")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args(argv)
    try:
        if args.output.suffix.lower() != ".png":
            raise ValueError("Output must use a .png filename.")
        if args.report and same_file(args.report, args.output):
            raise ValueError("Report must not replace the output.")
        rng = np.random.default_rng(args.seed)
        if args.tile:
            if args.source is not None:
                raise ValueError("A grain tile takes no source.")
            image = grain_tile(args.tile, rng, args.tile_alpha)
            record = {"output": str(args.output), "mode": "grain-tile", "size": args.tile,
                      "alpha": args.tile_alpha, "seed": args.seed}
        else:
            if args.source is None:
                raise ValueError("A source image is required unless --tile is used.")
            if same_file(args.source, args.output):
                raise ValueError("Source and output must be different files.")
            if not 0 < args.peak <= 1:
                raise ValueError("Peak must be in (0, 1].")
            if args.residue is not None and not (0 <= args.residue < 360 and 0 < args.residue_width <= 90
                                                 and 0 < args.residue_strength <= RESIDUE_MAX):
                raise ValueError(f"Residue hue must be in [0, 360), width in (0, 90], strength in (0, {RESIDUE_MAX}].")
            if args.residue is not None and args.dither == "full":
                raise ValueError("A color residue cannot survive full binary dither.")
            source = load_source(args.source, args.crop)
            size = output_size(source.size, args.width, args.height)
            if size[0] * size[1] > MAX_PIXELS:
                raise ValueError("Output is too large.")
            gray = np.asarray(source.resize(size, Image.Resampling.LANCZOS), dtype=np.float64)
            value, tone = whitewash(gray, rng, args)
            image = tint(value, args.tint)
            mask = None
            if args.residue is not None:
                color = load_source(args.source, args.crop, "RGB").resize(size, Image.Resampling.LANCZOS)
                mask, hue = residue_mask(color, args.residue, args.residue_width)
                image = residue(image, mask, hue, args.residue_strength)
            digest = hashlib.sha256(args.source.read_bytes()).hexdigest()
            record = {"source": str(args.source), "source_sha256": digest, "crop": list(args.crop) if args.crop else None,
                      "output": str(args.output), "mode": "whitewash", "grid": list(size), "seed": args.seed,
                      "key": {"side": args.key, "strength": args.key_strength},
                      "residue": ({"hue": args.residue, "width": args.residue_width, "strength": args.residue_strength}
                                  if args.residue is not None else None),
                      "levels": {"black": args.black, "white": args.white, "gamma": args.gamma},
                      "halation": {"strength": args.halo, "radius": args.halo_radius, "knee": args.halo_knee},
                      "fade": {"mode": args.fade, "strength": args.fade_strength},
                      "scratches": args.scratches, "dust": args.dust, "scratch_strength": args.scratch_strength,
                      "sparkles": args.sparkles, "sparkle_size": args.sparkle_size, "grain": args.grain,
                      "scanlines": {"period": args.scan_period, "depth": args.scan_depth},
                      "peak": args.peak, "dither": args.dither, "matrix": args.matrix, "tint": args.tint,
                      "png_mode": image.mode, "signature": signature(tone, mask)}
        args.output.parent.mkdir(parents=True, exist_ok=True)
        image.save(args.output, format="PNG", optimize=True)
        if args.report:
            args.report.parent.mkdir(parents=True, exist_ok=True)
            args.report.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(record))
        return 0
    except (OSError, ValueError, UnidentifiedImageError, Image.DecompressionBombError) as exc:
        parser.exit(2, f"error: {exc}\n")


if __name__ == "__main__":
    raise SystemExit(main())
