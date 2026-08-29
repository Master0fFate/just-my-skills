# Fibonacci Scale

Use this file when choosing sizes. Do not invent a parallel scale.

## Sequence

F = 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377

Named steps for CSS

| Token        | px  | rem (base 16) | Typical use                         |
|--------------|-----|---------------|-------------------------------------|
| --f-1        | 1   | 0.0625        | hairline, focus offset              |
| --f-2        | 2   | 0.125         | micro gap, icon optical pad         |
| --f-3        | 3   | 0.1875        | tight label tracking companion      |
| --f-5        | 5   | 0.3125        | compact inline gap                  |
| --f-8        | 8   | 0.5           | inner cluster gap, small radius     |
| --f-13       | 13  | 0.8125        | related-item gap, compact pad       |
| --f-21       | 21  | 1.3125        | section pad, body-adjacent gap      |
| --f-34       | 34  | 2.125         | group separation, phone margin      |
| --f-55       | 55  | 3.4375        | major section gap, tablet margin    |
| --f-89       | 89  | 5.5625        | scene break, wide margin            |
| --f-144      | 144 | 9             | hero vertical air, large stage      |
| --f-233      | 233 | 14.5625       | ceremonial void, chapter break      |

`--f-base` is 8 by default. If the artifact is dense data UI, `--f-base` may be 5. If it is editorial, `--f-base` may stay 8 and type may jump a step.

## Type steps

| Step | Size | Role                          |
|------|------|-------------------------------|
| T1   | 13   | meta, fine print, never body  |
| T2   | 16   | compact body (exception)      |
| T3   | 21   | preferred body, large labels  |
| T4   | 34   | section title                 |
| T5   | 55   | page title on product UIs     |
| T6   | 89   | display, one per view max     |
| T7   | 144  | ceremonial / poster only      |

Do not use T6 and T7 on the same view. Do not use more than five steps total.

Line-height

- Body — size × 1.618, then snap to a 8px or 5px baseline.
- Title — size × 1.0 to 1.236.
- Meta — size × 1.236 to 1.382.

Measure

- Body columns target 55–89 characters.
- A secondary rail may run 21–34 characters.
- If a column exceeds 89 characters, the split is wrong.

## Golden splits

For a parent width W

- Major = W × 0.618
- Minor = W × 0.382
- Residual strip = W × 0.236 (use for captions, index, timeline)

CSS pattern

```css
.stage {
  display: grid;
  grid-template-columns: 1.618fr 1fr; /* major | minor */
  gap: var(--f-34);
}
```

Invert to `1fr 1.618fr` when the rail is the product.

Break the split on small screens by stacking major above minor, keeping the same gap token one step down (`--f-21`).

## Aspect ratios

Prefer

- 1 / 1 only for avatars, marks, tools
- 3 / 2
- 5 / 3
- 8 / 5 (near golden)
- 13 / 8
- 21 / 13

Avoid defaulting every media box to 16 / 9.

## Radii

| Surface            | Radius   |
|--------------------|----------|
| Large plane / hero | 0 or 3   |
| Card / panel       | 8 or 13  |
| Control / chip     | 21 or 999 |
| Image inset        | inherit from parent or 3 |

Never apply one radius token to every element.

## Time

| Token     | ms  | Use                    |
|-----------|-----|------------------------|
| --t-130   | 130 | color, opacity         |
| --t-210   | 210 | small transforms       |
| --t-340   | 340 | panel, accordion       |
| --t-550   | 550 | scene change           |
| --t-890   | 890 | rare ceremonial reveal |

Easing default — `cubic-bezier(0.22, 1, 0.36, 1)`.

## Mapping an arbitrary mock to the scale

1. List every gap, pad, type size, radius, and duration you used.
2. Snap each to the nearest Fibonacci token. Midpoints go to the token that preserves grouping (inner gaps smaller than outer gaps).
3. If two nesting levels snapped to the same token, push the outer one up a step.
4. Recheck measure and the primary split.
