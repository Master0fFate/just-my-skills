# Sources and scope

Reviewed on 2026-09-12. These sources support implementation checks, not the
user's taste or the exact origin of the screenshot.

## User-provided sources

- `SKILL(20260912-005308).md`: angelcore-design v4.0.0, 403 source lines.
- `target-ui.png`: a 2048 x 835 capture of Fate UI's Angelcore skin after the
  v6 rebuild, taken 2026-10-12. It replaced the user's first reference
  screenshot, which stays in git history.

- `look/01-butterflies.png`, `look/02-captivation.png`, `look/03-jane.webp`,
  `look/04-poison-tearz.webp`: four cover images the user supplied on
  2026-10-11 as references for the current meaning of angelcore. Their read is
  in `look.md`. They are other people's artwork, so they are git-ignored and
  never published with the repository.

The screenshot and the covers are included for this user's visual calibration. No license to
redistribute its branding, project names, or underlying artwork is asserted.
Do not use it as a production asset. No font files are included.

## Primary implementation references

- W3C, WCAG 2.2, Contrast (Minimum):
  https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
  Supports 4.5:1 for normal text, with the standard's stated exceptions. This
  bundle uses 4.5:1 for readable text rather than relying on large-text exceptions.
- W3C, Non-text Contrast:
  https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
  Supports 3:1 for visual information needed to identify controls and state,
  subject to the standard's scope and exceptions. Not every decorative line
  has the same requirement.
- W3C, Target Size (Minimum):
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
  Defines 24 by 24 CSS-pixel targets or the stated exceptions. The bundle chooses
  24px as its default floor; its 44px coarse-pointer size is a design choice.
- W3C, Reflow:
  https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
  Supports narrow-view checks and permits exceptions for content whose use or
  meaning requires a two-dimensional layout.
- MDN, image-rendering:
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering
  Explains scaling behavior. In particular, `pixelated` does not promise identical
  integer-pixel mapping at all fractional display sizes or zoom levels.
- MDN, prefers-reduced-motion:
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
  Supports the reduced-motion access mode. Stillness is also a design choice.
- ImageMagick, command-line options, ordered-dither:
  https://imagemagick.org/command-line-options/#ordered-dither
  Documents fixed threshold maps and ordered dither. The included NumPy renderer
  is a separate implementation; it does not require ImageMagick.
- Pillow, Image module:
  https://pillow.readthedocs.io/en/stable/reference/Image.html
  Documents grayscale conversion, image modes, resizing, and the fact that the
  default mode-1 conversion uses Floyd-Steinberg. The tool quantizes explicitly
  and disables a second dither during export.

## New design decisions

The whitewash pipeline, its default levels, the band dither, the grain tile,
the ornament set, the serif voice rules, the cold tint values, and the
signature targets are new choices made from the four covers. They are not
extracted from any cover's source files, and they do not claim to reproduce
any artist's process.

The exact token values, layout ranges, image-ink value, density scale, component
rules, default Bayer matrix, and review rubric are new choices made for this
brief. They are not extracted source code, universal definitions of angelcore,
or requirements set by the references above.
