# Quality check

## Evidence before approval

Record output type, reference, content source, image role, viewport or cell size,
and test method. A source-file scan is not a browser render. A browser render is
not a user test. A contrast calculation is not a full accessibility audit.

Use `../tools/audit.py` for local package, palette, and source-style checks.
Use `../tests/browser_check.py` for the included web examples. Its `--offline`
mode inlines the same trusted local assets when HTTP navigation is unavailable;
that mode does not check HTTP asset loading. Use the unit tests
for the renderer and terminal example. None of these tools proves visual appeal.

## Hard failures

Reject an applicable default-profile output that has rounded component frames,
hue accents, decorative gradients, glass, glow, decorative shadows, illegible
functional text, color-only state, or a noise overlay presented as dithering.
Also reject fake functionality, broken keyboard focus, unhandled small widths,
unrequested mascots, or a claimed binary file with nonbinary pixel values.

A user's explicit requirement can override a style default. Record that override;
do not conceal it as a perfect reference match. Native controls and forced-color
access modes may use platform rendering. Check their behavior before changing it.

## Visual review rubric

This is a structured human review, not a benchmark validated on model outputs.
Use 0 for absent, half credit for inconsistent, and full credit for consistent.

| Area | Points | What to inspect |
| --- | ---: | --- |
| Geometry and flatness | 15 | Square corners, no unneeded depth or floating cards. |
| Palette and hierarchy | 15 | Neutral tokens, clear text, dim ambient art, controlled highlights. |
| Type and density | 15 | Compact tool rhythm; readable website copy; native terminal scale. |
| Layout and boundaries | 15 | Shared alignment, thin useful rules, task-first structure. |
| Image treatment | 15 | Relevant source, correct crop, fixed marks, correct display role; no image is full credit when appropriate. |
| Components and states | 10 | Consistent selection, focus, error, empty, and loading states. |
| Medium and narrow layout | 10 | No fake medium; useful small-screen or small-cell fallback. |
| Evidence and honesty | 5 | Real sources, editable output, accurate test limits. |

Aim for 90/100 with no hard failure before requesting visual approval. A high
self-score is not evidence of user preference. Do not report a numeric score as
an independent result. Fix the weakest area rather than adding more decoration.

## Side-by-side review

At normal size, compare the result with the current reference. Start with a
thumbnail view to compare mass and brightness. Then inspect full size for label
clarity, mark scale, edge sharpness, and boundaries. Do not improve only the hero
image while leaving the controls generic.

Repeat with active content, no art, and narrow width. The no-art result must
still look related. The active result must not bury work under the background.

## Functional review

Web: check real links, forms, buttons, current state, empty/error states, keyboard
focus, dialog close/return, and text scaling. Check 2048, 1440, 768, 390, and 320
CSS-pixel widths. Also check a keyboard-only path. Local code/table scrolling is
allowed; page-wide clipping is not. Check reduced motion and forced colors.

Terminal: check output at 80x24, 120x40, and a narrow size. Check redirected
output, unusual labels, and unsupported display characters. Full TUIs also need
input, resize, terminal restore, and actual-host tests. Do not substitute a PNG
of terminal text for those tests.

## Report format

```text
Built:
Reference used:
Actual sources and image settings:
Automated checks run:
Visual states inspected:
Not tested:
Known limits:
Intentional differences from reference:
```

Do not claim a percentage quality increase without a controlled evaluation.
To measure reuse, run fixed prompts across several models or seeds. Keep the
reference, content, evaluation rules, and available files constant. Compare
blinded outputs and record both hard failures and preference judgments. This
bundle does not include such a model-reuse study.
