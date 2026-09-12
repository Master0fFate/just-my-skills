# Test report / v5.0.0

Date: 2026-09-12. This report describes checks that actually ran on the bundled
examples and tools. It is not a model-reuse benchmark, a user preference study,
or a full accessibility conformance report.

## Result

| Check group | Result | Evidence |
| --- | --- | --- |
| Python tests | 46 passed | `unit-tests.txt` |
| Targeted Chromium checks | 107 passed | `browser-report.json`, `browser-checks.txt` |
| Package, token, contrast-pair, and static CSS checks | 47 passed | `package-audit.json` |
| Screenshot output | 23 captures | `screenshots/` |
| Reference measurements | Completed on the supplied PNG | `reference-measurements.json` |

Commands run from the bundle root:

```sh
python -m pytest -q tests
python tests/browser_check.py --offline
python tools/audit.py --output evidence/package-audit.json
```

## Browser test scope

Chromium 144.0.7559.96 on Linux. The three example pages were rendered at
2048x835, 1440x900, 768x1024, 390x844, and 320x800 CSS pixels.

The browser environment blocked local HTTP navigation. The successful run used
`--offline`: the same trusted local HTML, CSS, JavaScript, and image files were
inlined into browser pages. Layout, actual rendering, JavaScript state, and
keyboard behavior ran in Chromium. HTTP asset loading was not tested. Link
checks in this mode check that each local target file exists.

The checks covered page-wide overflow, square controls, selected target sizes,
script errors, project and file search, selection, sample preview, note validation,
literal user-text rendering, active-work image removal, image settings, small-screen
panel access, website filters, native disclosure, local email validation,
button feedback, keyboard focus, dialog input, Tab cycling, Escape and focus
return, component form errors, density, detail toggling, record selection,
empty-state action, an 80-character unbroken label, and 200% text at 390px.

Reduced-motion and forced-color modes were exercised. The forced-color check
only confirms that tested controls remain visible; it is not a full access-mode
audit. The text-scaling check is not a claim that all possible zoom settings were
manually tested.

## Renderer test scope

Checked fixed Bayer matrices, black and white limits, middle-gray coverage,
deterministic output, tone-map gamma direction, invalid tone values, source alpha,
source crop, EXIF orientation, cell aspect ratio, PNG mode and values, integer
scaling, ASCII dimensions and character range, custom two-state ASCII,
coverage validation, real fixture files, command execution, and source overwrite
protection.

The fixture's binary PNG has only 0 and 255. Its ambient version has only 9 and
37, with the same binary mark locations. These checks apply to those source
assets, not to a complete antialiased browser screenshot.

## Terminal test scope

Plain snapshots were checked at 80x24, 120x40, 40x16, 24x8, and 32x10 cells in
four views. Checked line bounds, plain redirected output, the explicit Unicode
and control-character escape fallback, and rejection of interactive mode when
no TTY is attached.

A real Linux pseudo-terminal session ran the curses example. It received a
selection key, a resize from 80x24 to 120x40, a view-change key, and a quit key.
The test checked the rendered review state, clean exit, absence of a traceback,
and restoration of terminal settings using `termios`.

This is not a test on every terminal emulator. Windows and macOS were not tested.
The terminal example uses sample content and never changes real files.

## Visual review

Inspected the reference at full size and a magnified texture crop. Inspected
normal-size workspace, website, and component captures, plus the mobile
workspace, enlarged-text view, and dialog state. Reviewed a contact sheet of all
15 baseline page/width combinations. See `review-grid.png`.

The result keeps the square structure, near-black field, thin separators,
compact mono rhythm, low-priority source-derived art, and image-free transfer.
Useful web text and field boundaries are deliberately clearer than the tiny,
faint details in the supplied capture. The source image is a labeled synthetic
renderer fixture, not an attempt to copy the screenshot's figure.

The review is a design judgment. No independent preference score is claimed.

## Issues found and corrected

The first browser pass found a dialog Tab-loop issue. Explicit Tab cycling was
added to the native modal dialogs. It also found a timing issue in the resize
test; the assertion now waits for the responsive state change before checking
panels. Both passed on the final run.

Visual review also led to fewer duplicate separator lines in the website,
left-aligned small-screen controls, removal of the image credit when no image is
shown, and wrapping for long preview names.

## Not tested or not established

No Firefox, Safari, real touch-device, screen-reader, deployment, or backend test
was run. The examples have no remote account, model call, subscription, or save.
The original source photo, font, shader, app code, and weaker second result were
not available. The exact original renderer remains unknown.

No repeated independent model runs were used to measure skill reliability. The
new contracts and code remove known degrees of freedom, but they do not establish
an exponential improvement or guarantee future visual approval.

Package versions and platform details are in `environment.json`.
