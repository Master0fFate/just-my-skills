---
name: design-sexyness
description: >-
  Create or refine visual hierarchy, layout, typography, color, density, responsive
  behavior, and design-system fit. Use for frontend design, redesign, visual
  critique, token extraction, low-reading-load UI, or optional Fibonacci
  styling. Interaction timing and async state belong to smoothness-sexyness;
  wording belongs to copy-sexyness.
disable-model-invocation: true
---

# Design Sexyness

Use this sub-skill to make interfaces feel deliberate, premium, and domain-appropriate.

## Top-three rule: clarity before copy

**TOP-THREE DESIGN RULE — CLARITY BEFORE COPY.** Make the interface's purpose,
next action, and current state understandable at a glance through hierarchy,
grouping, familiar controls, and immediate feedback. Do not make users read
explanatory prose to operate obvious UI. Keep necessary text short and factual.
Keep visible labels and accessible names; include the words needed for values,
units, status, errors, choices, and consequences. Do not replace a useful label
with an ambiguous icon or remove text to satisfy a literal “no labels” rule.
When reading is the task, preserve the content the task needs.

## Standards

- Match the product context: dense and calm for operational tools, expressive for games, editorial only when the content calls for it.
- Build hierarchy with layout, scale, contrast, spacing, and grouping before adding decoration.
- Use a real palette with restraint. Avoid one-note color themes and generic purple-blue gradient energy.
- Make typography feel intentional: readable sizes, deliberate weights, and typography suited to the surface. Preserve established type; use a stable rem scale for dense controls and choose display treatment from the brief. Let the browser break lines well: `text-wrap: pretty` for prose, `balance` for short headings.
- Align edges, rhythm, and whitespace. Keep repeated items consistent.
- Use real controls that match the action: labeled buttons, segmented controls for a small mode set, toggles for binary settings, and numeric inputs or sliders where appropriate. Icon-only controls need an accessible name and a clear meaning.
- Keep interface copy sparse and factual. Let hierarchy, familiar affordances,
  and feedback explain the obvious; omit repeated instructions and decorative prose.
- Use containers to express real grouping. Avoid repetitive nested card chrome; retain established containers when they communicate meaningful structure.

## Process

1. Inspect the existing design system, components, tokens, and screenshots.
2. Identify the weakest design dimension: hierarchy, density, spacing, color, typography, controls, or responsiveness.
3. If the surface needs stronger visual direction or generated bitmap assets, load `../imagegen-sexyness/SKILL.md` and use generated images as concept references or saved assets, not as static UI replacements.
4. Improve the design using existing patterns first.
5. Test mobile and desktop layouts, long text, empty states, and error states.
   Run a glance test: can users find the purpose, primary action, and current
   state without reading an explanatory paragraph?
6. Capture or inspect screenshots when the artifact is visual.

## QA Gate

- No overlapping text, clipped labels, unstable control sizes, or incoherent responsive layout.
- Visual hierarchy is obvious within five seconds. Purpose, primary action, and
  current state do not depend on explanatory prose.
- Necessary labels, accessible names, values, units, and state/error details remain clear and factual.
- Real content and product-specific decisions establish identity. Do not add an image merely to satisfy an asset quota.
- The result fits the domain instead of applying a generic landing-page treatment.
- If imagegen was used, the final UI implements extracted design decisions rather than embedding a mockup screenshot.
- Screenshot or real render verification is performed when possible.

## Direction and mode

The brief and incumbent visual evidence govern. Refinement preserves identity and behavior; an authorized redesign can replace the visual system while preserving product truth. Missing DESIGN.md alone does not imply a blank slate. Inspect existing product/design notes and actual screenshots; record decisions in the project's existing documentation only when useful.

Choose by the surface's purpose: persuade (decision and action), operate (task completion), read (comprehension), or experience (the work itself leads). A tool's landing page may persuade while its settings operate. Operational UI favors familiar controls and consistency; expressive composition belongs where the content and task earn it.

For critique, report concrete evidence, user impact, and priority before recommendations. For bolder/quieter requests, adjust hierarchy, density, color, and emphasis coherently. Resolve a generic structure through the actual task/story; do not ban familiar patterns or rebuild merely because a trend appears. Preserve factual copy and do not invent logos, testimonials, metrics, or claims.

## Focused references

- Responsive fixes, line breaking, hardening, localization, native considerations, onboarding, and token/component extraction: [references/layout-and-resilience.md](references/layout-and-resilience.md).
- Explicit Fibonacci/golden ratio or a suitable calm new direction: [references/fibonacci.md](references/fibonacci.md). Optional; never overrides the brief or incumbent design system.

For critique-only requests, inspect and report; do not edit. Use the project's browser and test tools without installing a separate design toolkit.

Choose real assets for a concrete role. Reserve dimensions, use appropriate image formats/sizes, and verify font loading and fallback behavior. Image generation remains optional and follows imagegen-sexyness when useful.
