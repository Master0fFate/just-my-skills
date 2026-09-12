# angelcore-design / v5.0.0

A reusable skill for the hard-edged monochrome UI in the supplied reference.
The skill is interface-first. It still supports native websites, CLI output,
real terminal interfaces, and explicitly requested non-UI work.

## Start here

Use this folder in place of the old `angelcore-design` folder in the location
where your agent loads local skills. Keep `SKILL.md` at the folder root and keep
the relative paths intact. Do not load both versions under the same skill name.
The exact installation path depends on your agent; this bundle does not assume one.

Give the agent a real task and the content it must use. For example:

> Use angelcore-design in reference-monochrome mode. Build the requested settings
> panel in the existing stack. Start without an image. Keep square corners,
> compact mono type, thin separators, and visible keyboard focus. Implement the
> input, selected, disabled, empty, and error states that apply. Render it at
> normal size and check the narrow layout before delivery.

More task-specific starters are in `references/prompt-recipes.md`.

`SKILL.md` is also usable alone. It contains the core rules, tokens, image method,
and release gate. The full folder is the preferred version because it includes
the reference, helper code, state contracts, and repeatable tests.

## What is included

| Path | Use |
| --- | --- |
| `SKILL.md` | Core rules and required build loop. |
| `references/reference-audit.md` | What the supplied files support, gaps in v4, and limits. |
| `references/target-ui.png` | User-supplied visual reference only. Never use it as a product background. |
| `references/tokens.json` | Neutral palette, geometry, type, and spacing values. |
| `references/visual-system.md` | Relationships that carry the style across layouts. |
| `references/components.md` | Component anatomy and state contracts. |
| `references/image-treatment.md` | Binary, ambient, and ASCII workflows. |
| `references/quality-check.md` | Hard failures, visual review, and test reporting. |
| `references/sources.md` | Primary sources and source-use limits. |
| `assets/angelcore.css` | Scoped, reusable CSS primitives. |
| `tools/ascii_dither.py` | Deterministic source converter with validation. |
| `tools/audit.py` | Package, neutral-token, contrast-pair, and static CSS checks. |
| `examples/web/` | Workspace, ordinary website, and working component examples. |
| `examples/terminal/demo.py` | Plain CLI snapshots and a real small curses TUI. |
| `tests/` | Renderer, token, terminal, and targeted browser checks. |
| `evidence/` | Actual test output, screenshots, and reference measurements. |

The CSS uses `.ac` as its scope. Add that class to a containing element or the
page body. Use the existing product's layout and framework. Do not copy the
example workspace structure into every new component.

## Open the web examples

The examples have no build step, external font, CDN, or runtime package dependency.
Serve the bundle root so all relative paths work:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/examples/web/index.html` in a browser. The page
links to the website and component examples. Serving the folder is preferred to
opening files directly. Nothing in these demos sends data to a service.

Workspace: project and file filters, selection, sample-file preview, local notes,
secondary-panel controls, settings, and an idle-only image.
Website: native reading layout, filters, note disclosure, and a local email-format
check. No subscription is created.
Components: action feedback, disabled control, form error, select, checkbox,
record selection, a native dialog, a table, and a working empty-state action.
Loading and failure samples are explicitly labeled display examples, not active
backend operations.

All notes and settings are memory-only and reset when the page reloads. The
synthetic folded-surface image is a renderer test fixture, not a photograph or a
recommended default illustration. The website and component pages use no image.

## Run the terminal example

Plain output works without third-party packages:

```sh
python examples/terminal/demo.py --width 80 --height 24
python examples/terminal/demo.py --view review --width 120 --height 40
python examples/terminal/demo.py --interactive
```

Interactive mode needs a TTY and Python's `curses` module. Use j/k or arrow keys
to select, Tab to change view, and q or Escape to exit. Resize redraws the view.
The example has no filesystem access. The display uses an explicit ASCII escape
fallback for unsupported or non-ASCII labels; it does not change the original
input string. Plain output never emits terminal control sequences.

On hosts without `curses`, use the plain snapshots. Windows, macOS, and different
terminal emulators were not tested in this build. See the evidence report.

## Convert an image

```sh
python -m pip install -r requirements.txt
python tools/ascii_dither.py source.png output.png --width 512 --scale 2
python tools/ascii_dither.py source.png output.txt --mode ascii --width 80
```

Read `references/image-treatment.md` before using ambient gray inks or custom
glyph coverage. The tool's binary output is not the same as a complete 1-bit
browser screenshot. The default ASCII coverage values are estimates.

## Run the checks

```sh
python -m pip install -r requirements-dev.txt
python -m pytest -q tests
python tools/audit.py --output evidence/package-audit.json
python -m playwright install chromium
python tests/browser_check.py
# For a browser environment that cannot navigate to local HTTP:
python tests/browser_check.py --offline
```

The browser script uses system Chromium when available, otherwise the installed
Playwright browser. It starts and stops a local server. Offline mode renders the same trusted local
HTML, CSS, JavaScript, and images as inlined content. It does not test HTTP asset
loading. This build used offline mode because local HTTP navigation was blocked
by the browser environment. It uses `--no-sandbox` for
this local test environment; do not reuse that launch option to browse untrusted
sites. Browser tests can overwrite the evidence screenshots with your new run.

The checks are deliberately separate: local code tests, browser behavior and
layout checks, and visual inspection. None alone proves user preference or full
accessibility conformance. The actual results and remaining limits are in
`evidence/test-report.md`.

## Rights and reuse

No font files are included. No external photo is included. The user-provided
screenshot remains reference material; no public redistribution rights over its
branding, project names, or underlying artwork are asserted. Remove that file
before publishing the bundle unless you have the needed rights. The new example
source image is a clearly labeled numerical test fixture.
