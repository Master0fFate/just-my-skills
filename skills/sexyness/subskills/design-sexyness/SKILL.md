---
name: design-sexyness
description: >-
  Create polished, non-generic visual design with strong hierarchy, spacing, typography, color, alignment, density, design-system fit, and optional imagegen-assisted visual direction. Use for frontend creation, redesign, critique, visual polish, responsive layout, typography, color, design-system extraction, hardening, onboarding, or optional Fibonacci/golden-ratio design.
---

# Design Sexyness

Use this sub-skill to make interfaces feel deliberate, premium, and domain-appropriate.

## Standards

- Match the product context: dense and calm for operational tools, expressive for games, editorial only when the content calls for it.
- Build hierarchy with layout, scale, contrast, spacing, and grouping before adding decoration.
- Use a real palette with restraint. Avoid one-note color themes and generic purple-blue gradient energy.
- Make typography feel intentional: readable sizes, deliberate weights, and typography suited to the surface. Preserve established type; use a stable rem scale for dense controls and choose display treatment from the brief.
- Align edges, rhythm, and whitespace. Keep repeated items consistent.
- Use real controls for real actions: icons for tool buttons, segmented controls for modes, toggles for binary choices, sliders or inputs for numbers.
- Use containers to express real grouping. Avoid repetitive nested card chrome; retain established containers when they communicate meaningful structure.

## Process

1. Inspect the existing design system, components, tokens, and screenshots.
2. Identify the weakest design dimension: hierarchy, density, spacing, color, typography, controls, or responsiveness.
3. If the surface needs stronger visual direction or generated bitmap assets, load `../imagegen-sexyness/SKILL.md` and use generated images as concept references or saved assets, not as static UI replacements.
4. Improve the design using existing patterns first.
5. Test mobile and desktop layouts, long text, empty states, and error states.
6. Capture or inspect screenshots when the artifact is visual.

## QA Gate

- No overlapping text, clipped labels, unstable control sizes, or incoherent responsive layout.
- Visual hierarchy is obvious within five seconds.
- The design uses at least one meaningful visual asset or product-specific signal when building a site, app, or game.
- The result fits the domain instead of applying a generic landing-page treatment.
- If imagegen was used, the final UI implements extracted design decisions rather than embedding a mockup screenshot.
- Screenshot or real render verification is performed when possible.

## Direction and mode

The brief and incumbent visual evidence govern. Refinement preserves identity and behavior; an authorized redesign can replace the visual system while preserving product truth. Missing DESIGN.md alone does not imply a blank slate. Inspect existing product/design notes and actual screenshots; record decisions in the project's existing documentation only when useful.

Choose by the surface's purpose: persuade (decision and action), operate (task completion), read (comprehension), or experience (the work itself leads). A tool's landing page may persuade while its settings operate. Operational UI favors familiar controls and consistency; expressive composition belongs where the content and task earn it.

For critique, report concrete evidence, user impact, and priority before recommendations. For bolder/quieter requests, adjust hierarchy, density, color, and emphasis coherently. Resolve a generic structure through the actual task/story; do not ban familiar patterns or rebuild merely because a trend appears. Preserve factual copy and do not invent logos, testimonials, metrics, or claims.

## Focused references

- Responsive fixes, hardening, localization, native considerations, onboarding, and token/component extraction: [references/layout-and-resilience.md](references/layout-and-resilience.md).
- Explicit Fibonacci/golden ratio or a suitable calm new direction: [references/fibonacci.md](references/fibonacci.md). Optional; never overrides the brief or incumbent design system.
- Live browser variants or detector/diagnostic tooling: [optional frontend toolkit](../../toolkits/impeccable/TOOLKIT.md). Ordinary design work does not need its setup or files.

Choose real assets for a concrete role. Reserve dimensions, use appropriate image formats/sizes, and verify font loading and fallback behavior. Image generation remains optional and follows imagegen-sexyness when useful.
