# Reference audit

## Basis and limits

The current `target-ui.png` is a 2048 by 835 capture of Fate UI's Angelcore
skin, taken on 2026-10-12 after the skin was rebuilt on the v6 tokens. It
replaced the user's first reference screenshot, which stays in git history.
The capture uses the real renderer, a fake Pi runtime, and a demo project. The
conversation, session, and file names are fixture content.

The first review covered the user's 403-line `angelcore-design` v4.0.0 file and
that first screenshot. Its CSS, source photo, font files, and renderer were not
supplied. The sections from "Where v4 is good" on record that review.

## What the reference shows

- One true-black field with no depth: no shadows, glass, or gradients.
- Square regions. One hairline between rail, work region, and inspector.
- A dense navigation rail, a wide open work region, and a file inspector.
- Small mono interface type, bracketed actions, path-like labels, and `>` on
  the current tab, section, and file row.
- No cages. The task row and the composer use top and bottom rules only. Search
  fields use one bottom rule. Buttons and chips have no resting border.
- No ambient art. An active workspace uses image role `none`, so the frame alone
  carries the look. Art appears only when the user supplies a permitted source.
- Pale labels on the ground and a few gray levels for hierarchy. The capture is
  not a two-color raster.

Text antialiasing adds colored subpixel fringes. They are font rendering, not
hue tokens. Do not turn antialiasing off to remove them.

## Measurements of the current PNG

Measurements were taken from the file, not from reconstructed CSS.

| Measure | Result | Use |
| --- | --- | --- |
| Image size | 2048 x 835 pixels | Inspect at this size as well as at common viewports. |
| Most common RGB value | (5, 5, 5), about 97.1% of pixels | The `bg` token dominates. |
| Next common RGB value | (41, 41, 41), about 0.4% | The `rule` hairline. Surfaces barely step: (14, 14, 14) is about 0.35%. |
| Pixels with channel mean <= 24 | About 97.7% | Brightness is highly restrained in this capture. |
| Main vertical boundaries | x = 266 and x = 1712 | About a 13 / 71 / 16 region split. |
| Blue and brown pixels | About 0.07% | Subpixel text fringes only; every token is neutral. |

Do not make 97.7% darkness a release rule. More content, larger text, active work,
and accessible controls change pixel distribution. The capture is at device
scale 1. Do not copy its small text sizes at the cost of reading.

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
