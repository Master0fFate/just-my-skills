---
name: angelcore-design
description: >-
  Build hard-edged, monochrome websites, UI components, desktop tools, CLI output,
  and terminal interfaces. Use this skill for the user's Fate UI reference style:
  near-black fields, square corners, small mono type, thin separators, bracketed
  actions, and faint source-driven dither or ASCII imagery. Also use it when the
  user requests this specific ethereal or angelcore treatment. Do not substitute
  pastel angelcore, a generic dark dashboard, rounded cards, neon, or a fixed mascot.
metadata:
  version: "5.0.0"
  scope: "interface-first; cross-medium rules remain available"
  default-profile: "reference-monochrome"
  character-default: "printable ASCII for interface marks"
---

# Angelcore Design / reference-locked edition

## 1. The result to build

Build a useful interface with a quiet, hard-edged frame. Use near-black space,
small clear type, exact alignment, thin rules, and a few bright details. When
an image has a role, break its actual tones into fixed marks. Let parts of its
edge disappear into the background. Do not place a normal gray photo under noise.

**Style is not subject.** Keep the user's content. Do not infer an angel, wing,
halo, cross, statue, moon, flower, cathedral, or brand name from the style label.
A supplied subject is allowed. It is not a mascot for later projects.

**Preserve the visual system, not the screenshot's layout.** A website must still
work as a website. A terminal must still work in character cells. A component
must still fit its host product. Do not turn every request into a three-pane app.

This file contains the core contract. The full bundle adds code, reference notes,
and tests. When only this file is available, apply the core contract directly;
do not claim that missing helper files were read or run.

## 2. Choose the right profile before coding

Use **reference-monochrome** by default for this brief. Use a different profile
only when the user requests it. Do not interpret the word "angelcore" again.

| Profile | Use | Rule |
| --- | --- | --- |
| reference-monochrome | Default web, GUI, and styled terminal output | Near-black ground, neutral text levels, dim two-ink art, no hue accents. |
| strict-binary | User asks for literal black/white output | Quantized image pixels are only 0 or 255. Use two design inks. Do not claim a whole browser screenshot is 1-bit; text antialiasing can add tones. |
| medium-native | Explicit print, cover, identity, or other non-UI task | Keep the image and contrast grammar. Choose type and structure for that medium. Do not force a terminal layout. |

Choose image role independently: `none`, `ambient`, or `content`.
Use `none` for forms, dense work, errors, and small components unless an image
explains the task. Use `ambient` for an idle workspace or entry view. Use
`content` when the image itself is what people need to inspect.

## 3. Priority order

1. Current user requirements, real content, and the target medium.
2. Useful behavior, access needs, and clear state.
3. The reference's geometry, type, spacing, and contrast relationships.
4. Image crop and reproduction.
5. Optional ornament.

If a requirement conflicts with the reference, make the smallest needed change.
Record that change. Do not use access needs as a reason to replace the whole
visual system. Do not copy faint labels or a tiny capture scale at the cost of use.

## 4. Lock these visual rules

These are requirements, not suggestions for a mood board.

| Area | Required default | Reject |
| --- | --- | --- |
| Corners | `border-radius: 0` on frames, inputs, buttons, tabs, menus, and dialogs | Pills, soft cards, rounded chips |
| Ground | One near-black field with very small surface changes | A stack of floating gray cards |
| Palette | Neutral inks only; status also uses words or marks | Neon, gradients, colored success/error dots |
| Boundaries | One thin rule where it explains structure | A full box around each content block |
| Type | One mono family for interface text; a small, controlled scale | Giant dashboard headlines, wide tracking on paragraphs |
| Actions | Compact words; brackets are optional visual syntax | Decorative command labels with no action |
| State | `>`, a local rule, a text label, or restrained inversion | Color-only state, glow, motion-only status |
| Art | Source-driven, fixed dither; low priority when ambient | Noise over a photo, random glyph rain, generic dot wallpaper |
| Motion | Still by default; immediate feedback | Flicker, animated grain, parallax, entrance sequences |
| Depth | Flat surfaces; no decorative shadows or blur | Glass, soft shadows, glowing borders |

"Hard-edged" applies to component geometry and image reproduction. Do not turn
off text antialiasing or damage font rendering to make normal text look rough.
Native control glyphs may differ by operating system. Do not rebuild them only
to force a pixel shape if that would remove their useful behavior.

## 5. Use a small token system

These are **new implementation defaults**, not extracted CSS from the screenshot.
Use them as one system. Do not add arbitrary intermediate shades per component.

```css
.ac {
  --ac-bg: #090909;
  --ac-surface: #111111;
  --ac-selected: #191919;
  --ac-rule: #2b2b2b;       /* Decorative separators only. */
  --ac-control: #737373;    /* Necessary control boundary. */
  --ac-muted: #909090;      /* Readable metadata, not faint decoration. */
  --ac-text: #b8b8b8;
  --ac-strong: #eeeeee;
  --ac-art-ink: #252525;    /* Ambient art only, never useful text. */
  --ac-radius: 0;
  --ac-step: 4px;
  --ac-mono: ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  background: var(--ac-bg);
  color: var(--ac-text);
  font: 0.8125rem/1.55 var(--ac-mono);
}
```

Use spacing steps of 4, 8, 12, 16, 24, and 32 CSS pixels. Use 1px structural
rules. Use a 2px visible focus outline with a small offset; do not confuse a
keyboard focus outline with a decorative ring effect.

Dense web UI: start with 13px main type, 12px metadata, 16-20px section titles,
and 28-32px rows. Use relative units in code. Website reading text: start at
16px. Website titles: usually 24-40px, not a full-screen slogan. These sizes
are design defaults, not WCAG minimum font sizes. Respect user text scaling.

Keep readable small text at least 4.5:1 against its actual surface. Keep visual
information needed to identify controls and state at least 3:1 against adjacent
colors. The dim rule token is for nonessential separators only. Use visible
labels and real focus states. See `references/sources.md` for the standards.

Default targets are at least 24 by 24 CSS pixels. Use about 44px height for
coarse-pointer controls. Do not shrink the hit area to match a small label.
A thin label can sit inside a larger invisible hit area.

## 6. Build the frame before adding an image

Start with real content and an image-free layout. Set reading order, labels,
control behavior, spacing, and type first. Then decide whether an image helps.

For a workspace, a navigation rail, open work region, and optional inspector
can work. Treat the screenshot's approximate 14 / 64 / 22 percent split as an
observation, not a required grid. Size rails for their content and collapse them
before the work region becomes too narrow. Never scale the whole app down.

For a website, use normal page navigation, document flow, section headings,
links, and forms. For a component, style its own anatomy. Do not add a fake
terminal header around a pricing row, product record, or settings control.

Keep empty space where it gives the main work room. Keep lists and tool areas
compact. Do not use a large empty hero to hide a lack of usable content.

Use one boundary between regions. An input or modal may need a full outline.
Do not add a second box around the same boundary. Put metadata on a shared
alignment line. Use a local selected-row fill only when it supports a real list.

## 7. Keep image processing honest

The reference shows dim, regular, source-shaped marks. It does not prove the
original renderer, threshold matrix, font, or shader. Ordered Bayer dithering
is this bundle's reproducible default, not a claim about the original source.

Use this sequence:

1. Select a supplied or relevant source. Record its origin and permitted use.
2. Set crop, image role, and final display size. Do not dither a UI screenshot
   and use it as a substitute for building the UI.
3. Flatten transparency onto the intended ground. Correct source orientation.
4. Build a grayscale tone map. Set shadow and highlight limits deliberately.
5. Resize the **tone map** to the target pixel grid or character-cell grid.
6. Quantize once. Use a fixed ordered matrix. Keep the pattern tied to the source.
7. Map binary marks to the two chosen art inks. Inspect at normal display size.

For a deterministic 4 by 4 starting matrix:

```text
 0  8  2 10
12  4 14  6
 3 11  1  9
15  7 13  5

v = clamp((gray - black) / (white - black), 0, 1) ** gamma
threshold(x, y) = (matrix[y % 4][x % 4] + 0.5) / 16
pixel(x, y) = 255 when v > threshold, otherwise 0
```

The tool uses a documented perceptual grayscale map. It is not a physical
light simulation. In this formula, gamma above 1 darkens the map. Do not apply
a second dither pass to already quantized art.

**Ambient art:** Use the binary pattern with near-black ground and dim gray ink
such as `#252525`. These are two art inks, not literal black and white. Keep
labels brighter. Do not use CSS opacity, blur, or a smooth mask to dim the
finished asset. Bake any edge fade into the tone map before quantization.

**Content art:** Use stronger inks. Preserve details that users need to inspect.
Do not apply the ambient contrast limit to diagrams, product details, or charts.

**Strict binary:** Export a mode-1 PNG or verify that raster values are only
0 and 255. Remapping to gray inks or adding opacity means the display is no
longer literal black/white, even when the pattern is still binary.

Scale final raster art by integer factors with nearest-neighbor sampling where
possible. `image-rendering: pixelated` is a fallback, not proof of 1-bit display
at every zoom level. Never dither labels, code, icons needed for use, or focus.

If no usable source exists, use a no-image result. A synthetic renderer test
map is allowed in an example only when it is clearly labeled. It is not a
replacement hero asset for the user's product.

## 8. ASCII and terminal rules

Default interface marks use printable ASCII. Examples:

```text
> selected     [ok] complete     [!] error     [ ] off     [x] on
/search        [open]            + added       - removed   ... working
```

Keep the user's Unicode names, code, and content. An ASCII decoration rule must
not erase user text. If the host cannot display it, use a labeled fallback while
keeping the original value. Do not print raw control codes from untrusted input.

For source-derived ASCII art, start with ` .,:;ox%#@`. Account for glyph density
and character-cell aspect ratio. The supplied renderer accepts measured glyph
coverage when available; its default ramp is an estimate, not a calibrated font.
For source size W by H, columns C, and cell-width / cell-height ratio a:
`rows = round(C * H / W * a)`. Start with a = 0.5 and test the actual terminal.

Do not require Braille art, emoji, box-drawing symbols, patched fonts, or
truecolor. Do not force a font size in a terminal. Use one local selection
marker. Use reverse video only when the terminal supports it and it stays clear.

CLI output must be readable when piped: no cursor movement or forced ANSI.
A full TUI must handle keyboard input, resize, clean exit, and terminal restore.
Do not call a static text snapshot an interactive TUI. At narrow widths, show
one useful region, not a crushed three-column layout. Drop ambient art first.

## 9. Component and behavior contract

Read `references/components.md` for anatomy and state detail when it is present.
The minimum contract still applies when only this file is available:

- Actions use real buttons or links. Inputs have visible labels. Text in square
  brackets does not create a button by itself.
- Navigation has a visible current item. Tabs have actual panels and keyboard
  behavior, or use ordinary navigation instead of pretending to be ARIA tabs.
- Selection, focus, disabled, loading, empty, success, and error states stay in
  the same visual system. Do not add color to repair an unclear state.
- Search, file selection, toggles, menus, and submit actions must do what their
  labels promise. Label local-only actions and sample data. Never imply a real
  backend, build, AI reply, save, or upload that did not occur.
- Show errors beside the relevant field. Use `[!]` plus useful text. Keep entered
  data. A full failure screen is not a reason to add decorative art.

On the web, keep semantic HTML, logical reading order, visible focus, and
keyboard access. Decorative art uses empty alt text or `aria-hidden="true"` and
must not intercept pointer input. Meaningful art needs a useful text equivalent.

For responsive output, test a large desktop, 1440px, 768px, and 390px viewport.
Also test 320 CSS-pixel reflow, longer labels, and larger text. Switch to one
column where needed. Use local horizontal scrolling only for content that needs
a two-dimensional layout, such as code or a wide data table. Do not hide page
overflow to conceal broken layout. Respect reduced motion and forced colors.

## 10. Required build loop

Before implementation, record a short working brief in task notes, not as a long
preamble to the user:

```text
Purpose and medium:
Reference/profile:
Content and image role:
Geometry, type, and density:
Palette and art inks:
States and responsive behavior:
What must not be added:
```

Then complete this loop:

1. Inspect the current reference. In the full bundle, open
   `references/target-ui.png` and read `references/reference-audit.md`.
   A new user reference can override it. Never claim image inspection when it
   was not available.
2. Build the image-free skeleton. Use the tokens and real content.
3. Build the required component states and smallest layout.
4. Add source-derived art only if its role is clear.
5. Render the result at normal size. Compare geometry, type, density, relative
   brightness, mark scale, and boundaries. Do not compare only the main image.
6. Inspect one active state and one narrow state. Remove the image and check
   that the identity remains. Fix failures before adding more decoration.
7. Run available tests. State exactly what was tested and what was not.

If rendering is unavailable, provide the implementation and mark visual review
as not run. Do not invent screenshots, test results, or a fidelity score.

## 11. Release gate

Do not ship while an applicable hard failure remains:

- Rounded interface corners, hue accents, decorative gradients, glow, or blur.
- Generic card-heavy layout, giant type, or fake terminal structure for a website.
- Readable content made faint to preserve atmosphere.
- A source image covered by unrelated dots instead of being quantized.
- Art reused as a required mascot or copied from the reference's subject.
- Missing focus, clipped labels, broken controls, or a nonfunctional small layout.
- A claimed binary asset that contains intermediate pixel values.
- A required helper file that is absent from the delivered package.
- Claimed visual, browser, terminal, or accessibility tests that did not run.

Use `references/quality-check.md` for the full rubric. Its score is an internal
review aid, not a measured probability of user approval or a proof of quality.

## 12. Handoff and reusable instruction

Keep the skill separate from project-specific output. Deliver editable sources,
source notes, used token values, a short change record, and actual test limits.
The bundled screenshot is a visual reference only. It is not a reusable image
asset, a font source, or a layout that every future request must copy.

Read as needed: `references/visual-system.md`, `references/components.md`,
`references/image-treatment.md`, `references/quality-check.md`,
`references/prompt-recipes.md`, and `references/tokens.json`.
Use `assets/angelcore.css` and `tools/ascii_dither.py` where they fit the task.

```text
Use angelcore-design in reference-monochrome mode. Build the requested object,
not a generic dark dashboard or a copy of a three-pane terminal. Lock square
corners, neutral inks, compact mono type, exact alignment, and thin separators.
Keep functional text clear. Use real controls and complete states. Add faint,
fixed, source-derived dither only when an image has a role. Do not add a mascot,
noise overlay, rounded cards, glow, or color accents. Render and compare at
normal size. Check an active state, a narrow state, and the no-image result.
Report only tests that actually ran.
```
