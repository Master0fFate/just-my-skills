#!/usr/bin/env python3
"""Create a deterministic synthetic folded-surface tone map for renderer tests.

This is a numerical fixture, not a photograph, product image, or required mascot.
The source is supplied with the examples so the conversion can be inspected.
"""
from pathlib import Path
import numpy as np
from PIL import Image


def make_source(width: int = 768, height: int = 768) -> Image.Image:
    y, x = np.mgrid[0:height, 0:width]
    x = (x / (width - 1) - 0.5) * 2
    y = y / (height - 1)
    center = -0.12 + 0.12 * np.sin(y * 5.6)
    radius = 0.12 + 0.48 * np.sqrt(np.clip(y, 0, 1))
    u = (x - center) / radius
    edge = np.clip((1.0 - np.abs(u)) * 12, 0, 1)
    top = np.clip((y - 0.035) * 22, 0, 1)
    fold = 11.5 * u + 5.4 * y + 1.1 * np.sin(y * 7 + u * 2)
    fine = np.maximum(np.cos(fold), 0) ** 7
    broad = (0.5 + 0.5 * np.cos(fold - 0.8)) ** 3
    light = 0.035 + 0.50 * fine + 0.27 * broad
    side_light = np.clip(0.75 + 0.35 * u, 0, 1)
    hem = 0.21 * np.exp(-((y - (0.48 + 0.16 * np.sin(2.1 * u))) / 0.035) ** 2)
    value = np.clip((light * side_light + hem) * edge * top, 0, 1)
    # A deliberately lost lower edge, applied before quantization.
    value *= np.clip((1.10 - y) * 4, 0, 1)
    return Image.fromarray(np.round(value * 255).astype(np.uint8))


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    target = root / "examples/web/assets/sample-light-map.png"
    target.parent.mkdir(parents=True, exist_ok=True)
    make_source().save(target)
    print(target)
