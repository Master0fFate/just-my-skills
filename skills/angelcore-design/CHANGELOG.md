# Change record

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
