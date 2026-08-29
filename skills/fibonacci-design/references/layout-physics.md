# Layout Physics

Ambiguous movement is a defect. Test containment the way an engineer tests a joint — press it and watch what else moves.

Run this file before presenting any designed artifact. Mentally simulate first. If the artifact is HTML, also think through phone, tablet, and wide canvas. If you can execute the page, do it.

## Containment model

Every element is one of four roles. Name the role when you build it.

| Role    | Resizes with content? | May move siblings? | Examples                         |
|---------|-----------------------|--------------------|----------------------------------|
| Stage   | No                    | No                 | hero frame, media well, dialog   |
| Stack   | Yes, downward         | Only below itself  | article, list, form              |
| Rail    | Height follows stage  | No                 | sidebar, caption column          |
| Fixture | No                    | No                 | sticky header, floating control  |

If you cannot name the role, you cannot know whether a child should resize the parent.

## Test 1 — Nested growth

Question — do nested elements resize the parent? Should they?

Procedure

1. Add a long string, a second paragraph, a tall image, and a multi-line badge to each nested container.
2. Watch the parent.

Pass rules

- Stage parents do not grow. Children wrap, scroll, or clip on purpose. Prefer wrap for text, scroll for lists, clip only for media masks.
- Stack parents grow down. Growth must not change the width of the page or shove fixtures.
- Rail parents may grow in height with the stage, never wider than their golden column.
- A child with `position: absolute` or `fixed` must not be the thing that "creates" parent height unless the parent has an explicit min-height that already accounts for it.

Fail examples

- A tag list inside a card stretches the card width and breaks the grid.
- An image with `height: auto` and no max-height turns a stage into a tower.
- A dropdown rendered in-flow pushes the whole page down instead of overlaying.

Fix

- Set the parent's role explicitly (`min-height`, `height`, `overflow`, `max-width`).
- Give the child a wrapping rule (`overflow-wrap`, `min-width: 0` on flex children).
- Move transient UI to a portal / overlay.

## Test 2 — Parent malformation

Question — does the child malform the parent?

Malform means the parent leaves its intended shape — aspect, column width, radius clipping, or alignment spine.

Procedure

1. Drop in an oversized replaced element (wide table, long URL, unbroken code, 4K image).
2. Drop in an undersized element (one word, a 16px icon).
3. Check whether the parent remains the same species of rectangle.

Pass rules

- Flex/grid children have `min-width: 0` and `min-height: 0` when they are allowed to shrink.
- Tables and pre blocks scroll inside, they do not widen the article.
- Aspect-ratio boxes keep their ratio. The media object-fits inside.
- Border-radius parents clip overflowing children (`overflow: hidden` only when clipping is the design).

Fail examples

- A long unbreakable string turns a 38.2% rail into a 70% rail.
- A square avatar in a golden media well letterboxes the well into a square.
- `align-items: stretch` turns a label row into a tall striped block.

Fix the child constraints. Do not "fix" by letting the parent become whatever the child wants.

## Test 3 — Static drift

Question — does the design move static elements it should not?

Fixtures and optical anchors must stay.

Procedure

1. Open every disclosure, accordion, menu, tab, and error state.
2. Increase root font size by 25%.
3. Load a late image (simulate without dimensions, then with).
4. Watch headers, page numbers, section indexes, spines, and captions.

Pass rules

- Sticky / fixed headers occupy a reserved slot. Content begins below that slot. Opening a menu overlays, it does not double the header height.
- Skeleton and final media use the same aspect box so the page does not jump when images arrive.
- Footnotes, badges, and status dots sit in reserved insets. They do not appear by growing a row.
- Scroll anchoring does not send the user backward when a widget hydrates.

Fail examples

- Adding a one-line validation message shoves the submit button and the footer.
- A sticky header grows on scroll (from 55 to 89) and the content jumps under it.
- Web fonts load and every heading reflows the hero.

Fix

- Reserve space. Use min-heights on message slots.
- Keep fixture height constant. Change color or hairline, not height.
- Pair every image with width/height or aspect-ratio.

## Test 4 — Sibling shove

Question — do states and extras push neighbors?

Procedure

1. Hover and focus every control.
2. Add a 2-digit and a 3-digit badge.
3. Wrap labels onto two lines.

Pass rules

- Hover/focus never adds border width, padding, or extra lines that change box size. Draw rings with outlines, shadows, or inset pseudo-elements.
- Badges sit in a reserved pocket or overlay a corner. They may not widen the heading.
- Multi-line labels grow inside a stack, not sideways into another column.

## Test 5 — Wrap and resize

Question — does the layout survive the canvas changing?

Breakpoints are not equal-column collapses. Plan the reflow.

Suggested canvas checks

- 360 × 800
- 768 × 1024
- 1280 × 800
- 1440 × 900

Pass rules

- Golden split stacks major-then-minor on the small canvas.
- Gaps step down at most one Fibonacci token when the canvas shrinks, never to zero.
- No orphan heading at the end of a column.
- No horizontal page scroll caused by a child. Horizontal scroll is allowed only inside a named stage (a table well, a filmstrip).
- Touch targets stay at least 34px on phone, 21px only for inline textual actions.

## Test 6 — Ambiguous movement

Question — did anything move whose motion you cannot name?

Name motions with a verb the user would recognize — open, close, advance, confirm, reveal. If the verb is "jiggle", "breathe", "float", or "I don't know", kill it.

Pass rules

- Only transform and opacity animate, except for scroll-position itself.
- Layout properties (`top`, `left`, `width`, `height`, `margin`, `padding`) do not animate if siblings exist.
- Reduced-motion users get a cut, not a slower version of the same shove.

## Decision cheat sheet

When a nested element wants more room

1. Can it wrap inside the current box? Do that.
2. Can it scroll inside a stage? Do that.
3. Should the stack grow downward? Allow it, then recheck fixtures.
4. Should the golden split change? Almost never at runtime. Change only at a breakpoint.
5. If none of the above, the element does not belong in that parent. Move it.

Write the answer in one sentence before you ship.

"The tag list is a stack child and may grow the card downward; the card is not a stage."

If you cannot write that sentence, rebuild the containment.
