# Image treatment

## Distinguish the three outputs

A grayscale source is a tone map. It is not the final two-ink result.
A binary raster assigns one of two values to each pixel. An ASCII image assigns
one of several glyphs to each cell. Both can create a tone impression through
coverage, but they are not the same representation.

This bundle has three supplied image artifacts:

- `sample-light-map.png`: a labeled synthetic folded-surface source, not a photo.
- `sample-1bit.png`: a mode-1 black/white output from that source.
- `sample-ambient.png`: the same binary pattern, mapped to neutral values 9 and 37.

The last image is a two-ink ambient display. It is not literal black and white.
The source and output are in `../examples/web/assets/`. The source generator is
`../tools/make_test_source.py`. It uses no random seed or external asset.
These files are test fixtures, not required art for new products.

## Pixel workflow

From the bundle root:

```sh
python -m pip install -r requirements.txt
python tools/ascii_dither.py source.png output.png \
  --mode pixels --width 512 --matrix 4 \
  --black 8 --white 232 --gamma 1.4 --scale 2 \
  --report conversion.json
```

Use a source that you are permitted to use. Inspect the crop first. The optional
`--crop LEFT,TOP,RIGHT,BOTTOM` rectangle uses oriented source pixels. The tool
corrects EXIF orientation, uses the first frame, flattens transparency onto black,
and makes a perceptual grayscale map using Pillow's documented conversion.
It does not perform a full ICC color-managed workflow or infer a foreground subject.

The final logical pixel grid is chosen before dithering. The source tone map is
resampled with Lanczos. The limits and gamma then change its tones. Gamma above
1 darkens this tool's map. Gamma conventions in other tools can differ.

The fixed Bayer threshold at each pixel chooses 0 or 255. A 2, 4, or 8 square
matrix is available. The default 4x4 matrix gives a visible ordered pattern.
An integer `--scale` duplicates finished pixels with nearest-neighbor sampling.
The export uses mode 1 with dither disabled, so it does not add Floyd-Steinberg
after the ordered pass. The converter rejects source overwrite and invalid limits.

Do not expect one crop and gamma value to fit every image. First fix crop, then
shadow/highlight limits, then gamma, then pixel size. Do not repair a poor source
with unrelated dust, lines, noise, or glyphs.

## Ambient remapping

Keep the pattern binary while changing its two display inks:

```python
from PIL import Image
import numpy as np

source = np.asarray(Image.open("output.png").convert("L"))
assert set(np.unique(source)).issubset({0, 255})
ambient = np.where(source == 255, 37, 9).astype(np.uint8)
Image.fromarray(ambient).save("ambient.png")
```

This maps black to `#090909` and white marks to `#252525`. It gives the image a
lower visual priority without fading labels or introducing a smooth gray photo.
The output has two neutral values. Do not call it a mode-1 black/white file.

For a fading edge, modify the source tone map before quantization. Do not apply
a smooth CSS opacity mask to a finished image and still call it strict binary.
For meaningful image content, choose stronger inks; dim ambient values are not
appropriate for data or details the user must see.

## Web placement

Use a raster asset rather than thousands of DOM nodes for dots. Keep a normal
semantic interface above it. Mark decorative imagery with empty alt text or
`aria-hidden`. Keep pointer events off. Use no animated texture by default.

The example workspace uses the 768px asset at its natural size inside a clipped
art-only region. Small layouts omit it. The page itself is not clipped to hide
layout faults. To resize, export a matching grid or use integer scaling. CSS
`image-rendering: pixelated` helps but is not proof of exact device-pixel mapping
at every zoom level. Inspect the real rendering.

Do not use the reference screenshot as a background image. Do not use a smooth
photo and a dotted CSS overlay. Do not rasterize the interface's functional text.

## ASCII workflow

```sh
python tools/ascii_dither.py source.png output.txt \
  --mode ascii --width 80 --cell-ratio 0.5 \
  --black 8 --white 232 --gamma 1.4 --matrix 4
```

The output is plain ASCII text with significant trailing spaces. Keep the image
in a fixed-cell region without wrapping. The row formula is:

`rows = round(columns * source_height / source_width * cell_width / cell_height)`

A ratio of 0.5 is a starting value, not a property of all fonts. Inspect the
actual terminal. Use `--height` only when you deliberately choose a fixed grid;
it can distort the source aspect ratio.

The default ramp is ` .,:;ox%#@`. Its coverage values are estimates. For a
measured font, pass `--coverage` with one strictly increasing value per glyph,
starting at 0 and ending at no more than 1. Values are relative ink coverage.
The tool blends adjacent glyph levels with the same fixed threshold method.
A custom ramp without supplied coverage uses evenly spaced estimates.

For two-state text art, use `--ramp ' #'`. This produces two text states, not a
literal pixel bitmap. Text rendering can still use antialiasing. ASCII density
and a 1-bit raster must have separate validation.

## Conversion checks

Check dark and white uniform fixtures, a middle-gray fixture, deterministic
repeat output, binary pixel values, output dimensions, aspect-ratio handling,
ASCII character range, invalid input, alpha flattening, and source overwrite
protection. Check the exported file as well as the in-memory array.

The bundled tests cover these local properties. They do not identify the
original screenshot's algorithm, validate every font, or prove artistic quality.
