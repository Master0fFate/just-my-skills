---
name: fibonacci-design
description: Design visual interfaces, pages, HTML artifacts, landing pages, dashboards, and layouts with the Fibonacci paradigm — golden-ratio rhythm, calm mathematical spacing, layout-physics tests, and an anti-slop audit. Use when the user asks for design, a UI, a layout, a visual system, Fibonacci design, golden ratio, or whenever a designed visual artifact must feel tranquil and must not look like AI slop.
metadata:
  type: design-system
  version: "1.0"
  paradigm: fibonacci
---

# Fibonacci Design

Design as if the page were a quiet proof. Beauty here is not decoration. It is proportion that the eye recognizes before the mind can name it.

Read this skill before producing any visual artifact. Apply it to HTML pages, UI mockups, landing pages, dashboards, cards, posters-as-pages, and any layout you generate. If another skill defines personality or content, this skill still owns structure, space, type, color, motion, and QA.

Load references only when needed.

- Scale tables and tokens — [references/scale.md](references/scale.md)
- Layout physics tests — [references/layout-physics.md](references/layout-physics.md)
- AI-slop pattern catalog — [references/anti-slop.md](references/anti-slop.md)
- Type and color recipes — [references/palette-and-type.md](references/palette-and-type.md)
- Starter tokens — [assets/tokens.css](assets/tokens.css)

## Soul

The paradigm is Fibonacci. Not a spiral watermark. Not a gimmick overlay. The sequence and the golden ratio are the hidden skeleton.

- Elegance is mathematical tranquility. Nothing shouts. Nothing fidgets.
- Calmness is structural. Space does the talking. Type sits where it must sit.
- Resonance is the goal. A stranger should feel the page is beautiful without knowing why.
- Restraint is a feature. If an element does not serve proportion, remove it.
- Never illustrate the Fibonacci spiral unless the user explicitly asks to see the math. Using the ratio is the point. Drawing the ratio is usually slop.

φ is 1.6180339887. Use it. Do not brand it.

## Non-negotiable laws

1. Every spatial decision maps to a Fibonacci measure or a golden split. See [references/scale.md](references/scale.md).
2. Every layout must pass the layout-physics tests before you show it. See [references/layout-physics.md](references/layout-physics.md).
3. Every layout must pass the anti-slop audit. If it looks like generated UI, tear it down and rebuild. See [references/anti-slop.md](references/anti-slop.md).
4. Prefer fewer elements in better proportion over more elements in equal boxes.
5. Static things stay static. Nested things must not secretly shove the world around them.

If a law and a trend conflict, keep the law.

## Number system

Work in this sequence for sizes, gaps, type, radii, and time.

`1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233`

Allowed derived values

- Halves of even Fibonacci numbers when you need a hairline (`1`, `2`). Use `4` only as half of `8` when `8` is too coarse.
- Golden complements of a width — major 61.8%, minor 38.2%.
- Viewport splits of 38.2 / 61.8 or 23.6 / 76.4 (φ² companion). Never use 50 / 50 as the primary split unless the content is truly dual and equal.

Forbidden as a default rhythm

- Even 4/8/12/16/24/32/40/48 scales used for everything.
- Identical padding on every box.
- Three equal columns as the hero structure.
- A page built only from 16px and 24px.

Pick one base unit per artifact, usually 8px as F5, and express all other space as Fibonacci multiples of that unit. Store it as `--f-base`.

## How a Fibonacci page is composed

### Canvas

- Max measure for text is about 55–89 characters, or a width near 34rem / 55rem depending on density.
- Page margins grow with viewport. On a phone, 21px sides. On a tablet, 34px. On a wide screen, 55px or 89px. Never let a text column span a full 1440px field.
- The primary split is golden. A sidebar is the minor. The main stage is the major. Invert only when the sidebar is the product (filters, a tool, a score).

### Hierarchy

One dominant. One secondary. Everything else recedes.

- One display size per view (Fibonacci type step 8 or 9).
- One supporting headline size.
- Body at a readable step. 13px is too small for body. 16px is allowed as the reading exception. Prefer 21px body on spacious pages.
- Do not use more than five type sizes on one page.

### Grouping

Group by proximity at Fibonacci gaps. Related items share an 8 or 13 gap. Separate groups with 21, 34, or 55. If two groups use the same gap as items inside a group, the grouping has failed.

### Alignment

- Pick a spine. Left-align most interfaces. Center only a short ceremonial block (a title page, a closing mark).
- Align numbers, icons, and captions to a shared vertical rhythm. Baseline matters more than box-centering.
- Optical alignment beats geometric alignment for display type. Shift a large letter slightly if the glyph looks late.

### Shape

- Radii from the sequence. A card may be 8 or 13. A pill may be 21 or fully round. Do not radius every rectangle 12px.
- Prefer a mix of sharp large planes and one soft object. If everything is rounded, nothing is considered.
- Hairlines (1px) are allowed. Thick decorative borders are usually noise.

## Type

- Choose one family with a real italic and at least four weights, or a display + text pair that shares a skeleton.
- Default away from the AI-default stack. Do not reach first for Inter, Roboto, Arial, system-ui, or the usual geometric sans. If you use a sans, pick one with a distinct voice and commit.
- Body leading is about 1.618 of the body size, then snapped to the baseline grid.
- Headlines can tighten toward 1.0–1.236 so the mass of the letter sits in the space around it.
- Tracking — slightly open small caps and labels; slightly tight large display. Never letterspace lowercase body.
- One weight family per role. Do not jump from thin display to black body for drama.

Full recipes live in [references/palette-and-type.md](references/palette-and-type.md).

## Color

Color serves calm. A Fibonacci page is mostly field, a little structure, a single accent.

- Field (background) occupies the major share of pixels.
- Structure (text, rules, icons) occupies the next share.
- Accent occupies the minor share — roughly the golden remnant, not a carnival.
- Limit the artifact to one hue family plus neutrals, unless the content is data that needs categorical color.
- Contrast is a law, not a vibe. Body text must hold against the field. Do not place gray-on-gray poetry and call it quiet.
- Dark themes are not desaturated navy plus purple glow. Light themes are not cool-gray chrome.

If you cannot name why a color exists (field, structure, accent, state, data), delete it.

## Motion

Motion is breath, not entertainment.

- Durations from the sequence in milliseconds — 130, 210, 340, 550. Rarely 890.
- Easing is gentle. Use a cubic that eases out. No bounce. No elastic. No spring that overshoots a static header.
- Animate only what changes meaning — open/close, value change, page section reveal, focus.
- Do not animate layout (width, height, top, left) if it reflows siblings. Animate transform and opacity.
- Looping decoration is banned unless the user asked for a living ornament.
- Respect reduced-motion. Instantly snap when the user prefers stillness.

Ambiguous movement is a defect. If an animation causes a parent to grow, a sticky bar to twitch, or a static caption to jump, the motion is wrong.

## Interaction states

Every clickable thing needs rest, hover or focus, active, and disabled. States must not change layout size. A hover border that adds 2px and shoves neighbors is a physics fail. Use inner shadows, color, or an absolutely positioned underline that does not add height.

Focus rings are visible and do not clip.

## Images and media

- Images crop to golden or to a Fibonacci aspect (3/2, 5/3, 8/5, 13/8, 21/13). Avoid lazy 16/9 on every hero unless the media is video.
- Do not place five identical rounded photos in a row.
- Captions sit in the minor column or under the image at an 8 or 13 gap, never floating in a random margin.
- Icons are one system, one optical size, one stroke weight. No emoji as UI icons. No randomly mixed icon packs.

## What this design looks like

A finished Fibonacci artifact should feel like

- A wide quiet field.
- A few masses in golden relation.
- Type that is obviously considered.
- Gaps that feel inevitable.
- One place the eye lands, then a clear path.
- Almost no ornament.

It should not feel like

- A component library demo.
- A SaaS template.
- A generated startup landing page.
- A moodboard of trends (glass, blobs, grain, aurora, Bento, neon).
- A poster for the golden ratio itself.

## Mandatory test — layout physics

Before you show work, run the tests in [references/layout-physics.md](references/layout-physics.md). Minimum set, every time

1. Nested growth — does an inner element enlarge the parent? Should it? If the parent is a fixed stage, the child must scroll, clip, or wrap inside. If the parent is a stack, growth must be expected and must not break the page rhythm.
2. Parent malformation — does the child squash, stretch, or skew the parent into a shape that no longer matches the grid? Fix the child's constraints, not the parent's soul.
3. Static drift — do fixed, sticky, or should-not-move elements shift when something else opens, wraps, or loads? They must not.
4. Sibling shove — does a hover, focus, badge, or extra line of text push neighbors? States and overflow must be absorbed.
5. Wrap and resize — shrink the canvas to a phone and stretch it to a wide screen. Proportions may reflow by plan. They may not collapse into a heap or explode into a thin strip of orphans.
6. Ambiguous movement — anything that moves without a named reason fails. Name the reason or stop the movement.

If you cannot answer "should the parent resize?" in one sentence, the structure is wrong. Redesign the containment.

## Mandatory test — anti-slop

Ask, in order

1. Does this look like absolute AI slop?
2. Does it contain known AI patterns?

If yes to either, stop. Do not ship a polish pass on a rotten structure. Identify the pattern from [references/anti-slop.md](references/anti-slop.md), then apply a structural fix.

- Equal card triads → one featured mass + a quiet list, or a 61.8 / 38.2 split.
- Generic hero + three features + logos + testimonials → cut to the actual story. One claim. One proof. One act.
- Purple gradient on dark glass → field, structure, one mineral accent.
- Icon-in-rounded-square grid → text with a single taut diagram, or icons without tiles.
- Everything 16px / 24px / 12px radius / drop shadow → Fibonacci scale, mixed radii, shadow only if a plane must lift.
- Decorative golden spiral, grain overlay, fake 3D torus, floating orbs → delete.

Deeply think about the fix. Apply it. Re-run both tests. Repeat until both answers are no.

## Output behavior

- Produce the artifact, not an essay about Fibonacci.
- You may state the base unit and the primary split in one short note if it helps the user continue the system.
- Do not dump the sequence as page content.
- Do not add a Designed with the golden ratio badge.
- Keep implementation simple. Semantic HTML, CSS custom properties from the scale, no framework flex for its own sake.
- Phone first, then golden expansion at larger widths.
- Light and dark only when the artifact is a product UI or the user asks. If you offer both, both must pass the same tests.
- If another skill demands a loud personality, keep this skill's proportions. Personality lives in words and a few graphic marks. It does not get to smash the grid.

## Final gate

Refuse to present the work if any of these are true.

- Primary split is an unconsidered 50/50 or a row of equal cards.
- Spacing cannot be mapped back to the sequence.
- A nested element malforms its parent or moves a static element.
- Hover or focus changes an element's layout size.
- The page matches two or more patterns in the slop catalog.
- You added a visible Fibonacci spiral so people get it.
- The result is calm only because it is empty, not because it is composed.

Fix it. Then present it.
