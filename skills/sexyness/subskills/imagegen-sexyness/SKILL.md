---
name: imagegen-sexyness
description: >-
  Use image generation as a premium design accelerator for UI re-imagining, visual direction, mockups, hero/product assets, game visuals, and bitmap concept references. Use when the user asks to use imagegen, generate visual variants, re-imagine a design, or when generated imagery can materially improve a visual implementation before code is changed.
---

# Imagegen Sexyness

Use this sub-skill when generated images can sharpen visual direction before implementation. The image is a concept reference, critique surface, or project-bound bitmap asset. It is not a substitute for building the actual interactive UI.

## Use When

- The user asks to use imagegen, generate visual variants, re-imagine a design, create a mockup, or make a visual surface feel more premium.
- A UI, page, game, brand, or asset task lacks a strong visual target after inspecting the current artifact.
- A hero image, product visual, illustration, texture, sprite, or editorial bitmap would improve the user-visible result.
- Two or three distinct visual directions would help choose better hierarchy, palette, composition, or product signal before coding.

## Skip When

- The task is code-only, copy-only, accessibility-only, or a deterministic layout/control fix.
- The right asset already exists as editable SVG, canvas, HTML/CSS, or an established icon system.
- No image generation capability is available. Continue with `design-sexyness` and name the skipped imagegen pass only if it matters to the result.
- The user asks not to generate images or provides an exact deterministic design target.

## Workflow

1. Inspect the real artifact first: files, screenshots, design system, product domain, viewport, and constraints.
2. Decide the image role: concept reference, asset candidate, edit target, or final project-bound bitmap.
3. If generating or editing an image, load and follow the `imagegen` skill/tool instructions.
4. Prompt one strong direction for narrow tasks, or up to three distinct directions when the visual strategy is unclear.
5. Include domain, audience, current weakness, screen or asset role, viewport, design-system constraints, brand/product signals, exact text only when needed, and an avoid list.
6. Inspect the generated result. Extract implementable decisions: composition, density, spacing rhythm, palette, material feel, imagery style, product cues, and motion ideas.
7. Implement with code-native components, tokens, and responsive behavior. Do not embed a generated UI screenshot as the interface.
8. Save any generated asset used by the project into the workspace and wire references to that saved file.
9. Verify the final real surface with screenshot or browser/app inspection. Compare against the extracted decisions, not pixel-perfect resemblance to the generated concept.

## Prompt Checklist

- Product/domain and audience.
- Current visual problem.
- Screen, component, or asset role.
- Viewport and composition.
- Existing design-system constraints.
- Required product or brand signals.
- Exact text only when required; otherwise avoid tiny fake UI text.
- Must keep, must avoid, and accessibility or performance constraints if the user requested them.

## QA Gate

- The imagegen step has a clear role and follows real artifact inspection.
- Generated concepts are critiqued before implementation.
- Generated UI mockups are translated into interactive, code-native UI.
- Project-bound generated assets are saved in the workspace and referenced from there.
- Final verification uses the built artifact, not the generated image alone.
