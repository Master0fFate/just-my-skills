# Change record

## 6.1.0 / 2026-10-24

Aligned the skill with the Angel Core 2026 write-up. Light and dark are now
described as opposing forces. Added two properties to the look: carving, a
hard key light that leaves one side white and the other in the void, and
duotone, two inks with color off by default. `whitewash.py` gained `--key` and
`--residue`, which leaves at most a washed trace of one source hue, and its
report adds `residue_share`. There are no color tokens; chrome and ornaments
stay two-ink. Iconography is now allowed in hero, cover, and brand art
when no subject is supplied, one motif per piece, and a broken halo joined the
ornaments. Removed two comments that broke the house no-comment rule.

## 6.0.0 / 2026-10-11

Rebuilt the look around four user-supplied covers. The ground is now `#050505`
and the other neutral tokens moved with it. Added `--ac-white` and a serif
voice: display title, voice list, micro line, vertical word, one ghost echo.
Added `tools/whitewash.py`, a seeded light pipeline with crush, halation, edge
fade, scratches, dust, sparkles, band dither, grain, scanlines, peak, and cold
tint, plus a grain tile mode and a JSON report with signature numbers. Added
`assets/angelcore-art.css` for the stage, layers, ornaments, and cold tint,
`assets/ornaments.svg`, `assets/grain.png`, two whitewash fixtures, and a
release-page example. Fieldsets lost their border. Wrote `references/look.md`
and updated the other references, the rubric, the recipes, and the audit.
The dim-dither workspace art, the ASCII tool, and the no-cage contract are
unchanged in spirit; their values follow the darker ground.

Band dither no longer snaps tones above the band to solid white. Inside the
band it switches between the band edges, so gradients that cross the edge do
not leave a contour. Found on real photos while building the Angelify
example, which now ships in `examples/angelify/`. The cover references are
git-ignored.

## 5.1.0 / 2026-09-13

Added a hard no-cage contract. `--ac-control` is no longer a default 4-sided
field or button border. In-page fields use a label plus a one-sided `--ac-rule`
hairline. Buttons have no resting border. Floating dialogs may keep one square
`--ac-rule` outline. Native desktop Light/Midlight bevels are a hard failure.
See `references/no-cages.md`. CSS primitives follow the same resting chrome.

## 5.0.0 / 2026-09-12

Changed the default from broad art direction to an explicit interface profile
based on the supplied screenshot. Kept the original subject policy, native-medium
rule, source-driven image treatment, stillness, and honest test reporting.

Added square-corner and flat-surface rules; shared role-based tokens; UI and
website type scales; spacing and row defaults; component state contracts;
responsive and terminal rules; separate binary and ambient image modes; a
working source converter; reusable CSS; live web examples; a plain CLI example;
reference measurements; and repeatable checks.

Delivered the support files named by the new skill. Kept the main file usable
when it is the only available file. Added an explicit normal-size visual review
loop and a no-image test to reduce reliance on a decorative hero.

No claim of an exponential or measured quality increase is made. Reuse across
multiple model runs has not been evaluated. See `evidence/test-report.md` for
what actually ran in this build.
