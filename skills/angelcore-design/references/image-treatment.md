# Image treatment

Two tools. `whitewash.py` makes the look's light: clipped white, halo, grain,
scratches, edge loss, band dither, optional cold tint. `ascii_dither.py` makes
dim two-ink dither marks and ASCII art for terminals and strict binary. Pick
the whitewash tool for hero and ambient raster art. Pick the dither tool for
character cells and literal black/white.

## Whitewash workflow

```sh
python tools/whitewash.py source.png hero.png --seed 3 --sparkles 5 --scan-period 3 --report hero.json
python tools/whitewash.py source.png ambient.png --seed 3 --peak 0.3 --halo 0.4 --scratches 3 --dust 30 --grain 0.03
python tools/whitewash.py source.png cold.png --seed 3 --tint cold --fade left
python tools/whitewash.py portrait.png carved.png --seed 3 --key left --key-strength 0.7 --relic 140
python tools/whitewash.py assets/grain.png --tile 128 --seed 9
```

Order inside the tool: crop, Lanczos resize, crush (`--black 28 --white 110
--gamma 1.0`), halation (`--halo 0.7 --halo-radius 36 --halo-knee 0.7`), edge
fade (`--fade radial|left|right|top|bottom --fade-strength 0.9`), scratches,
dust, sparkles, band dither (`--dither band|full|none --matrix 8`), grain
(`--grain 0.07`), scanlines (`--scan-period 3 --scan-depth 0.2`), peak, tint.
With `--dither full` the grain and scanlines go before quantization so the
output stays binary. Band dither keeps tones outside the band and draws marks
between the two band edges inside it, so a gradient that crosses the band
edge does not leave a contour. The signature numbers are measured on the tone
before dither.

`--key` ramps the grayscale source from one side before the crush. The lit
side clips to white, the far side falls under the black point. Strength 0.6 is
a start; 0.8 gives the half-white, half-void face. `--relic` keeps one hue from
the source: pixels within `--relic-width` degrees of it and above 25 percent
saturation keep their color at their own brightness, blended in with a soft
mask. The output is RGB. Full binary dither rejects a relic because it cannot
hold one. The report adds `relic_share`; keep it at or under 0.05.

Every random element comes from `--seed`. The report records the seed, the
source hash, every parameter, and three signature numbers: `void_share`,
`white_share`, `mid_share`. Compare them to `look.md`. Fix crop first, then the
white point, then halo, then grain. Lower `--white` for more clipped mass.
Raise `--halo-radius` for a softer bleed. Keep scratches under twelve.

`--peak 0.3` bakes an ambient asset. Do not dim with CSS opacity instead.
`--tint cold` writes RGB from `#04070b` to `#dfe9f1`; the page then also uses
`data-ac-tint="cold"` so chrome and art share one tone family.

The grain tile is a transparent white speckle. Over black it reads as film
grain; over clipped white it disappears, which is what the covers do.

## Web placement of the light

```html
<section class="ac-stage">
  <img class="ac-art" data-light="soft" src="hero.png" alt="">
  <div class="ac-layer ac-fade" aria-hidden="true"></div>
  <div class="ac-layer ac-scan" aria-hidden="true"></div>
  <div class="ac-layer ac-grain" aria-hidden="true"></div>
  <svg class="ac-orn" aria-hidden="true"><use href="assets/ornaments.svg#orn-sparkle"/></svg>
  <div>copy, title, voice list</div>
</section>
```

`.ac-stage` isolates the stack. Layers take no pointer input. The fade is
ground-colored so the art dissolves into the page at any viewport. Forced-
colors mode hides every layer and ornament. `data-light="soft"` lets a
whitewash asset scale smoothly; binary dither assets keep pixelated scaling.

## Distinguish the three dither outputs

A grayscale source is a tone map. It is not the final two-ink result.
A binary raster assigns one of two values to each pixel. An ASCII image assigns
one of several glyphs to each cell. Both can create a tone impression through
coverage, but they are not the same representation.

This bundle has three dither artifacts and two whitewash artifacts
(`sample-whitewash.png`, `sample-whitewash-ambient.png`, with their JSON
reports beside them):

- `sample-light-map.png`: a labeled synthetic folded-surface source, not a photo.
- `sample-1bit.png`: a mode-1 black/white output from that source.
- `sample-ambient.png`: the same binary pattern, mapped to neutral values 5 and 34.

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
ambient = np.where(source == 255, 34, 5).astype(np.uint8)
Image.fromarray(ambient).save("ambient.png")
```

This maps black to `#050505` and white marks to `#222222`. It gives the image a
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
