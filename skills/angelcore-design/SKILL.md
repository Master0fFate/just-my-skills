---
name: angelcore-design
description: >-
  Build the user's angelcore look, Angel Core 2026 or dark angelcore: a
  hard-edged near-black interface with whitewashed light. Extreme chiaroscuro
  pushes subjects into clipped white and shadows into a true-black void, with
  halation, a carving key light, seeded film grain and scratches, band
  dithering, at most one selective relic color in the art, sparse sparkle,
  cross, sigil, broken halo, and filigree ornaments, and thin tracked serif
  titles over small mono interface type. Use for websites, UI components, desktop
  tools, covers and hero art, and terminal output. Also use it for the user's
  Fate UI reference style: square corners, thin separators, bracketed actions,
  source-driven dither. Not pastel or cherub angelcore, not a generic dark
  dashboard, not neon, not rounded cards, not a fixed mascot.
metadata:
  version: "6.1.0"
  scope: "interface-first; covers, hero art, and cross-medium rules included"
  default-profile: "reference-monochrome"
  default-light: "whitewash for hero and ambient art; dither for terminal and strict binary"
  character-default: "printable ASCII for interface marks"
---

# Angelcore Design / whitewash edition

## 1. The result to build

**Hard frame, soft light.** Build a useful interface as a hard-edged black
instrument: near-black void, square corners, small mono type, exact alignment,
thin rules, no cages. Then, only where an image has a role, place a whitewashed
apparition: a subject blown to clipped white, haloed, grained, scratched, and
dissolved into the same black. The two layers never trade properties. No bloom
on a button. No cage on a photo.

Light and dark are opposing forces, not a gentle continuum. Highlights pass
their natural limit and still glow. Shadows go absolute and still keep grain.
The result reads as black and white that still breathes, gothic without losing
the celestial. This is what the user calls Angel Core 2026.

Read `references/look.md` for the ten properties of the look and the numbers
behind them. The short form:

| Property | Rule |
| --- | --- |
| Void | Ground is `#050505`. Keep large empty black. Half of a hero can be empty. |
| Whitewash | Crush the curve. Subject clips to white. Midtones nearly vanish. |
| Halation | White bleeds into black with a soft halo, baked into the asset. |
| Texture | Seeded grain, dust, and a few long scratches live in the dark. White stays clean. |
| Dither | Ordered marks appear only in the transition band, not across the frame. |
| Ornament | Thin white sparkles, cross, sigil, filigree, chain. At most five. One cropped by the edge. |
| Voice | Serif, thin, wide-tracked titles and a tiny tracked list. Mono for everything that works. |
| Composition | Subject at an edge, title crosses the light, every edge is lost to the void. Cold tint is opt-in. |
| Carving | A hard key light from one side. One side of a face or form clips white, the other falls into the void. |
| Relic | At most one selective hue survives in the art, small and intense: green eyes, a crimson mark, a gold rim. Never in chrome. |

**Style is not subject.** Keep the user's content. In functional UI, never add
angels, wings, halos, or crosses because of the style name. In a hero, cover,
or brand piece with no supplied subject, one motif from the look's vocabulary
is allowed: wings, a broken halo, falling feathers, a gothic arch, thorns, or
chains. One motif per piece, chosen for this brief. It is not a mascot for
later projects. A supplied subject always wins.

**Clarity before copy.** Make purpose, next action, and current state clear at
a glance through layout, familiar controls, grouping, and feedback. Keep
interface text short and factual. Retain visible labels, accessible names,
units, errors, and consequences. Never replace useful labels with icons or
remove them for atmosphere. When reading is the task, keep the content.

**Preserve the system, not the screenshot.** A website still works as a website.
A terminal still works in character cells. A component still fits its host. Do
not turn every request into a three-pane app or a cover.

Use this skill for the requested look only, not generic design polish. Do not
load a competing general design manual beside it. Review-only requests stay
read-only. When only this file is available, apply it directly and do not claim
that missing helper files were read or run.

## 2. Choose profile, image role, and light before coding

| Profile | Use | Rule |
| --- | --- | --- |
| reference-monochrome | Default web, GUI, styled terminal | Near-black ground, neutral text levels, whitewash or dim dither art, no hue in chrome. Art may keep one relic hue. |
| strict-binary | User asks for literal black/white | Pixels are only 0 or 255. Two design inks. Antialiased text is not 1-bit. |
| medium-native | Explicit print, cover, identity, or other non-UI task | Keep the light and contrast grammar. Choose type and structure for that medium. |

Image role: `none`, `ambient`, `hero`, or `content`. Use `none` for forms,
dense work, errors, and small components. Use `ambient` for an idle workspace.
Use `hero` for a landing, release, cover, or entry view where the light is the
point. Use `content` when the image itself must be inspected.

Light treatment: `whitewash` for hero and ambient raster art. `dither` for
terminal, ASCII, strict binary, and the dim two-ink marks of the Fate UI
reference. Do not whitewash a diagram, product photo, or chart that users must
read; use `content` with stronger, honest tones.

Tint: `neutral` by default. `cold` only when requested or when the brief is a
cover or hero where the reference calls for it. Tint applies to the whole view
through `data-ac-tint="cold"`, never to one widget.

Relic: none by default. When the source carries one meaningful color, keep it
with `--relic HUE` and name it on the stage with `data-ac-relic` (`crimson`,
`venom`, or `gold`). One relic hue per view. It lives in the art and in at
most one ornament (`data-ink="relic"`). It never colors text, controls, focus,
state, rules, or surfaces. The chrome stays neutral even when the art bleeds.

## 3. Priority order

1. Current user requirements, real content, and the target medium.
2. Useful behavior, access needs, and clear state.
3. The frame: geometry, type, spacing, boundaries, contrast.
4. The light: crop, whitewash, edge loss, ornament placement.
5. Optional extras: tint, ghost echo, vertical word, scanlines.

If a requirement conflicts with the look, make the smallest change and record
it. Do not use access needs as a reason to drop the whole system. Do not copy
faint labels or a tiny capture scale at the cost of use.

## 4. The instrument: locked frame rules

| Area | Required default | Reject |
| --- | --- | --- |
| Corners | `border-radius: 0` on frames, inputs, buttons, tabs, menus, dialogs | Pills, soft cards, rounded chips |
| Ground | One near-black field, very small surface steps | A stack of floating gray cards |
| Palette | Neutral inks; status uses words or marks | Neon, hue accents, colored status dots |
| Boundaries | One thin `--ac-rule` hairline where it explains structure | A 4-sided cage around any field, button, chip, card, or group |
| Type | One mono family for interface text; a small controlled scale | Giant dashboard headlines, tracking on paragraphs |
| Actions | Compact words; brackets are optional syntax | Decorative command labels with no action |
| State | `>`, a local rule, a text label, or restrained inversion | Color-only state, glow, motion-only status |
| Motion | Still by default; immediate feedback | Flicker, animated grain, parallax, entrance sequences |
| Depth | Flat chrome; no shadows, glass, or blur on controls | Glowing borders, blurred panels, soft shadows |

"Hard-edged" applies to chrome geometry. Do not turn off text antialiasing.
Native control glyphs may differ by operating system; keep their behavior.

### 4.1 No cages

Do not stroke every control. `--ac-control` (`#737373`) on `--ac-bg` reads as
a white whiteboard. That is a hard failure.

- In-page field with a visible label: no box, or one 1px `--ac-rule` hairline
  on one side. Never a 4-sided `--ac-control` rectangle.
- Buttons, chips, tabs, badges: no resting border. Hover uses `--ac-selected`.
  Focus is a 2px outline with offset.
- One structural hairline between regions. Do not also box every child.
- A floating dialog, menu, or tooltip may have one square `--ac-rule` outline.
- Fieldsets have no border. Legends are kickers.
- Desktop toolkits: kill native bevels. Set Light/Midlight/Mid away from white.
  Turn sunken frames off before the stylesheet.

Read `references/no-cages.md`. If the idle UI looks like stacked whiteboards,
stop and remove sides before adding anything else.

## 5. Tokens

New implementation defaults, not extracted CSS. Use them as one system.

```css
.ac {
  --ac-bg: #050505;
  --ac-surface: #0e0e0e;
  --ac-selected: #171717;
  --ac-rule: #292929;
  --ac-control: #737373;
  --ac-muted: #909090;
  --ac-text: #b8b8b8;
  --ac-strong: #eeeeee;
  --ac-white: #ffffff;
  --ac-art-ink: #222222;
  --ac-radius: 0;
  --ac-step: 4px;
  --ac-mono: ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  --ac-serif: "Cormorant Garamond", "EB Garamond", Garamond, "Hoefler Text", "Times New Roman", serif;
}
```

`--ac-white` is the one clipped white: display titles, sparkles, the hero
light. Interface text uses `--ac-strong`. `--ac-art-ink` is for dim dither
marks only. `--ac-rule` is a hairline, never text. `--ac-control` is for small
marks, never a border. Cold tint values are in `references/tokens.json` and in
`assets/angelcore-art.css` under `[data-ac-tint="cold"]`. Relic presets sit
beside them under `[data-ac-relic]` and set `--ac-relic`.

Spacing steps: 4, 8, 12, 16, 24, 32 px. Rules 1px. Focus 2px with offset.
Dense UI: 13px main, 12px metadata, 16 to 20px section titles, 28 to 32px rows.
Website reading text: 16px. Website titles: 24 to 40px mono or sentence serif.
Display serif title: 28 to 52px, weight 300, tracking 0.32em uppercase or
0.42em lowercase. Voice list: 13px serif, tracking 0.22em, uppercase. Micro
line: 11px, tracking 0.3em, `--ac-muted`. Respect user text scaling.

Readable text stays at least 4.5:1 against its actual surface. Control
identification stays at least 3:1 without boxing widgets. Targets are at least
24 by 24 CSS px, about 44px for coarse pointers.

## 6. Two type voices

Mono is the instrument: labels, controls, metadata, code, tables, status.
Serif is the voice: one display title, one voice list, one micro line, and at
most one vertical word per view. Never set a button, input label, error, or
table cell in the serif. Never track body text.

Ghost echo: a display title may carry one duplicate inside it, `aria-hidden`,
offset about 0.06em by 0.09em, opacity 0.3, blur 0.6px. One per view. Never on
interface text. Markup: `<h1 class="ac-display ac-ghost">Title<span
class="ac-ghost-echo" aria-hidden="true">Title</span></h1>`.

Fonts: system stacks only unless the host already has a licensed family. No
font files ship with this bundle. Render at normal size before adjusting.

## 7. The apparition: light pipeline

Two tools, two jobs. `tools/whitewash.py` makes the look. `tools/ascii_dither.py`
makes dim dither marks and ASCII for terminals and strict binary.

Whitewash order, one seed, one JSON report:

1. Select a permitted source. Record origin and permitted use. Crop first.
2. Grayscale, resize to the final grid with Lanczos.
3. Key light: `--key left|right|top|bottom` with `--key-strength 0.6` ramps
   the source before the crush, so one side clips white and the far side
   drops into the void. Use it when the source is lit flat.
4. Crush: `black 28`, `white 110`, `gamma 1.0`. The subject clips to white.
5. Halation: blur the clipped mask, screen it back. Strength 0.7, radius 36.
6. Edge loss: `radial`, `left`, `right`, `top`, or `bottom` fade to the void,
   baked into the tone map, strength 0.9.
7. Scratches, dust, optional sparkles from the recorded seed.
8. Band dither: tones under 0.12 and over 0.88 keep their value. Between them,
   8x8 ordered marks switch between the two band edges, so the mean tone stays
   continuous and no contour appears. `full` quantizes everything. `none`
   keeps 8-bit.
9. Grain in the dark, optional scanline comb, then `--peak` for ambient.
10. Tint: `neutral` (mode L) or `cold` (RGB from `#04070b` to `#dfe9f1`).
11. Relic: `--relic HUE --relic-width 22` keeps the saturated source pixels
    near that hue and lifts them to their own brightness. Everything else
    stays monochrome. Full binary dither refuses a relic.

```sh
python tools/whitewash.py source.png hero.png --seed 3 --sparkles 5 --scan-period 3 --report hero.json
python tools/whitewash.py source.png ambient.png --seed 3 --peak 0.3 --halo 0.4 --scratches 3 --grain 0.03
python tools/whitewash.py portrait.png hero.png --seed 3 --key left --relic 140 --report hero.json
python tools/whitewash.py assets/grain.png --tile 128 --seed 9
```

The report prints `void_share`, `white_share`, and `mid_share`. A hero asset
should land near the covers: void at least 40 percent, white 3 to 12 percent,
midtone under 20 percent. A large blown subject such as a wing may push white
higher; keep the void and the midtone limits. `relic_share` stays at or under
5 percent. Ambient assets use `--peak 0.3` and have no white.

Dither pipeline for terminals and strict binary stays as before: tone map,
fixed Bayer matrix, quantize once, map to two inks. Ambient dither marks use
`--ac-art-ink` on `--ac-bg`. Never dither labels, code, icons, or focus.

Rules that hold for both tools:

- Do not place noise over an unchanged photo. The grain, dots, and halo come
  from the tone map and the seed, and the seed is recorded.
- Do not dim a finished asset with CSS opacity. Bake `--peak` instead.
- A CSS `filter: blur()` is allowed only on a duplicate art image inside a
  stage (`.ac-halo`), never on chrome, text, or a panel.
- Hero whitewash assets use `data-light="soft"` so they scale smoothly.
  Binary dither assets keep `image-rendering: pixelated` and integer scaling.
- If no usable source exists, ship no image. A labeled synthetic fixture is
  allowed in an example only.

## 8. Ornaments

`assets/ornaments.svg` holds `orn-sparkle`, `orn-sparkle-wide`, `orn-cross`,
`orn-sigil`, `orn-filigree`, `orn-halo-broken`, `orn-chain`, and `orn-scratch` as symbols with
1px strokes in `currentColor`. Use them with `<svg class="ac-orn"
aria-hidden="true"><use href="assets/ornaments.svg#orn-sparkle"/></svg>`.

- At most five per view. Vary size. Use at least two different symbols.
- At least one is cropped by the stage edge.
- Place them in the void or across the halo, asymmetrically. Never centered.
- Ink: `--ac-white` for one or two, `data-ink="dim"` or `faint` for the rest.
  `data-glow` adds a 3px halo to a sparkle only. `data-ink="relic"` is allowed
  on one ornament, only when the art on the same stage carries that relic.
- Never under a control, over interface text, inside a focus path, or on a
  dense work view. Forced-colors mode removes them.
- Ornaments are still. No twinkle.

## 9. Build the frame before the light

Start with real content and an image-free layout. Set reading order, labels,
control behavior, spacing, and type first. Then decide whether an image helps.

Workspace: navigation rail, open work region, optional inspector. Size rails
for content and collapse them before the work region is too narrow. Ambient
art is idle-only and leaves during dense work.

Website: normal navigation, document flow, sections, links, forms. No fake
terminal around marketing copy. A hero stage is allowed on an entry page.

Hero or cover: a `.ac-stage` with the art at one edge, a ground-colored fade
behind the copy, the display title crossing the light, a voice list under it,
a micro line at the foot, ornaments in the void. Below the stage the page
returns to the instrument: ruled sections, tables, mono.

Component: only the pieces the component needs. A button has no title bar.
A modal may have one square outline because it left the page.

Keep empty space where it gives the main work room. Do not use an empty hero
to hide a lack of usable content.

## 10. ASCII and terminal rules

Interface marks use printable ASCII: `> selected`, `[ok]`, `[!]`, `[ ]`,
`[x]`, `/search`, `[open]`, `+ added`, `- removed`, `... working`. Keep the
user's Unicode names, code, and content. If the host cannot display a glyph,
use a labeled fallback and keep the original value. Do not print raw control
codes from untrusted input.

Source-derived ASCII art starts with ` .,:;ox%#@`. For width W, height H,
columns C, and cell ratio a: `rows = round(C * H / W * a)`, start with a = 0.5.
No Braille, emoji, box drawing, patched fonts, or truecolor required. CLI
output must be plain when piped. A full TUI handles input, resize, clean exit,
and terminal restore. Drop art first at narrow widths.

## 11. Component and behavior contract

Read `references/components.md`. Minimum:

- Actions are real buttons or links with visible labels. Brackets alone do
  not make a button.
- Navigation shows the current item. Tabs have panels and keyboard behavior
  or are plain navigation.
- Selection, focus, disabled, loading, empty, success, and error stay in the
  same visual system. No color to repair unclear state.
- Search, toggles, menus, and submit actions do what they say. Label local-only
  behavior and sample data. Never imply a backend, save, upload, or AI reply
  that did not occur.
- Errors sit beside the field with `[!]` and useful text. Keep entered data.
- Web: semantic HTML, logical order, visible focus, keyboard access. Decorative
  art and ornaments use empty alt or `aria-hidden` and take no pointer input.
- Responsive: test 1440, 768, 390, and 320 CSS px, longer labels, 200 percent
  text. One column where needed. No `overflow-x: hidden` to hide faults.
  Respect reduced motion and forced colors.

## 12. Required build loop

Record a short working brief in task notes, not as a preamble to the user:

```text
Purpose and medium:
Profile / image role / light / tint / key side / relic hue:
Content and source (origin, permission, crop):
Motif (none, or one from the vocabulary):
Geometry, type, density:
Ornaments (which, how many, which one is cropped):
States and responsive behavior:
Must not add: cages, bloom on chrome, grain on text, sparkle spam, a mascot
```

Then:

1. Inspect the references. Read `references/look.md`. Open `references/look/`
   and `references/target-ui.png` when present. A new authorized user
   reference overrides them. Never claim image inspection that did not happen.
2. Build the image-free skeleton with the tokens and real content.
3. Build the required states and the smallest layout.
4. Convert the source with `whitewash.py` or `ascii_dither.py`. Check the
   signature numbers. Place the art, the fade, the ornaments.
5. Render at normal size. Compare mass, brightness, edge loss, mark scale,
   title tracking, ornament count, and boundaries against the look.
6. Inspect one active state and one narrow state. Remove the image and the
   ornaments and check that the frame alone still reads as this system.
7. Run the available checks. State what ran and what did not.

If rendering is unavailable, deliver the implementation and mark visual review
as not run. Do not invent screenshots, test results, or a score. Bundled
`evidence/` files record an earlier run, not the current change.

## 13. Release gate

Do not ship while an applicable hard failure remains:

- Rounded chrome, any hue on chrome, gradients, glow, blur, or shadow on
  controls or panels.
- More than one relic hue, a relic over 5 percent of the art, or relic color
  on text, controls, focus, state, rules, or surfaces.
- Angel iconography added to functional UI, or more than one motif in a piece.
- Flat, evenly lit art with no carving: both sides of the subject the same
  gray.
- Four-sided mid-gray or light cages on fields, buttons, chips, cards, or
  fieldsets. Native bevels left on.
- Generic card layout, giant mono headlines, or a fake terminal for a website.
- Readable content made faint, grained, blurred, or tracked for atmosphere.
- A normal photo under a noise or dot overlay instead of a whitewashed or
  quantized tone map. An unrecorded seed.
- A hero asset far from the signature: gray midtones everywhere, no clipped
  white, no edge loss.
- More than five ornaments, none cropped, symmetric placement, ornaments on
  controls or text, or an animated twinkle.
- Serif used for interface text, or a second ghost echo, or a tinted widget
  inside a neutral view.
- Art reused as a required mascot or copied from a reference subject.
- Missing focus, clipped labels, broken controls, or a nonfunctional small
  layout.
- A claimed binary asset with intermediate values. A missing helper file.
  Claimed tests that did not run.

Use `references/quality-check.md` for the full rubric. Its score is a review
aid, not a measurement.

## 14. Handoff

Deliver editable sources, source notes with permissions, the conversion
reports with seeds, used token values, a short change record, and actual test
limits. The reference images are calibration only, never product assets.

Read as needed: `references/look.md`, `references/visual-system.md`,
`references/no-cages.md`, `references/components.md`,
`references/image-treatment.md`, `references/quality-check.md`,
`references/prompt-recipes.md`, `references/tokens.json`.
Use `assets/angelcore.css`, `assets/angelcore-art.css`, `assets/ornaments.svg`,
`tools/whitewash.py`, and `tools/ascii_dither.py` where they fit.
