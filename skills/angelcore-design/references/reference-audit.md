# Reference audit

## Basis and limits

Reviewed: the user's complete 403-line `angelcore-design` v4.0.0 file and the
supplied 2048 by 835 PNG screenshot. The original CSS, source photo, font files,
renderer, and the later poor result were not supplied. This is a static image
review, not a review of the original app's code or behavior.

The upload contains the main skill and screenshot. The five helper paths named
at lines 384-388 were not supplied. This does not prove that they were absent
from the user's original installation. Their actual contents could not be checked.

## What the reference shows

- A near-black continuous field, with almost no visual depth.
- Square interface regions and thin vertical and horizontal separators.
- A dense navigation rail, a much wider open work region, and a file inspector.
- Small, mostly monospaced interface type. Bracketed actions and path-like labels.
- Dim, regular image marks whose density follows a source-shaped figure.
- A low composer area with simple top and bottom rules, not a floating pill.
- White or pale labels above much dimmer image marks. Small gray levels support
  hierarchy. The screenshot is not an exactly two-color raster.

No identity, original image source, exact font, shader, or animation can be
established from these pixels. The marks look compatible with ordered dithering,
but the screenshot alone does not identify the original algorithm.

## Measurements of the supplied PNG

Measurements were taken from the file, not from reconstructed CSS.

| Measure | Result | Use |
| --- | --- | --- |
| Image size | 2048 x 835 pixels | Inspect at this size as well as at common viewports. |
| Most common RGB value | (9, 10, 11), about 89.9% of pixels | Very dark ground dominates. |
| Next common RGB value | (15, 17, 19), about 4.6% | Surface differences are small. |
| Pixels with channel mean <= 24 | About 96.8% | Brightness is highly restrained in this capture. |
| Main vertical boundaries | Near x = 291 and x = 1607 | Approximate 14 / 64 / 22 region split. |
| Small blue/brown pixel differences | Present | A capture need not be exactly neutral; new tokens intentionally are. |

Do not make 96.8% darkness a release rule. More content, larger text, active work,
and accessible controls change pixel distribution. Do not copy tiny captured text
sizes. The screenshot's device scale and source font sizes are unknown.

The raw measurement output is in `../evidence/reference-measurements.json`.

## Where v4 is good

The uploaded skill already has strong source and subject rules. It separates
subject, style, treatment, medium, and structure (lines 61-73). It defines an
image pipeline and rejects fake dot overlays (lines 198-237). It protects readable
content (lines 48-59 and 145-159), avoids heavy boxes (lines 261-283), and rejects
false test claims (lines 353-370). These rules remain in v5.

## Why a compliant output can still look wrong

| Gap in the uploaded file | Where | Consequence | Change in v5 |
| --- | --- | --- | --- |
| General art direction has priority over interface-specific precision. | 27-30, 314-328 | Very different UI systems fit the same description. | Add an interface-first default profile; keep other media as explicit routes. |
| No explicit zero-radius rule or complete flat-surface rule. | 127-179, 261-271 | A model can add rounded controls while retaining monochrome images. | Lock square component corners; reject glow, glass, and decorative depth. |
| Palette points to an unseen token file; it allows flexible starting values. | 181-196 | Contrast, row fills, and image brightness can drift independently. | Ship role-based tokens and test contrast pairs. |
| Type and spacing are mostly qualitative. | 143-159, 287-300 | Large web type and loose spacing can replace the compact tool rhythm. | Add separate UI and reading scales, row sizes, spacing steps, and small-screen rules. |
| White-on-black decorative ink is not the same as the dim displayed art in the reference. | 183-188 | A correct binary asset can become far too bright behind the work. | Separate binary pattern creation from dim two-ink display. |
| Component anatomy and state handling are not defined. | 245-250, 302-312 | Buttons, forms, errors, and menus are redesigned independently. | Add component contracts and working state examples. |
| Release gates do not compare visual relationships against a concrete reference. | 353-370 | Software tests can pass while the appearance is far from the target. | Add normal-size render, active-state, narrow-state, and no-image checks. |
| Referenced helper files are not in this upload. | 384-388 | Their usefulness and availability cannot be checked here. | Deliver every linked local resource in the new bundle. |

These are plausible causes of drift. The unseen second output could have other
causes: a different model, missing context, a different task, or an omitted asset.
This review cannot assign a measured success rate to any of those causes.

## Intentional differences from the screenshot

The new default uses exactly neutral token colors, larger readable web text,
clearer functional boundaries, and visible keyboard focus. These are controlled
changes. It keeps the reference's square geometry, quiet field, compact rhythm,
and low-priority image treatment. It does not try to reproduce the original
app, hidden interactions, branding, or image subject.
