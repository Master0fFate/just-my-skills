---
name: imagegen-sexyness
description: >-
  Use an available image-generation tool for requested visual concepts, UI
  re-imagining, mockups, or project bitmap assets. Translate concepts into real
  interactive components; do not substitute a UI screenshot for implementation.
  Optional for design work, not a prerequisite for ordinary frontend fixes.
disable-model-invocation: true
---

# Imagegen Sexyness

A generated image is a concept reference or an asset. It does not prove that a
working interface exists.

## Tool and scope rules

- For a direct image request, use the host's image tool and follow its execution
  rules immediately. Do not delay generation to search for another skill.
- Do not assume a tool named `imagegen`, a provider, or a script is installed.
  Use the actual available capability. If none exists, state the limit; never
  present SVG, HTML, screenshots, or prose as a generated raster image.
- Generate one strong direction by default. Produce multiple variants only
  when requested. Do not trigger paid generation from a vague polish request
  without applicable authorization.
- For optional implementation-led exploration, skip generation when the task is
  code, copy, accessibility, or a deterministic layout fix, or a suitable asset
  or exact target already exists. This skip does not override an explicit request
  to generate or edit an image, including one based on an exact supplied target.
- Do not upload private screenshots, source material, or personal data to an
  external generator without authorization for that disclosure.

## Concept-to-product workflow

1. Use the supplied brief and available context to identify domain, audience,
   asset role, composition, crop, aspect ratio, brand constraints, and exclusions.
   For implementation-led exploration, inspect the real UI first. A direct
   image-only request does not require a codebase inspection.
2. Prompt the chosen direction. Include exact text only when essential; invented
   small UI text is not a reliable content source.
3. Inspect the returned image before using it as a design reference. Extract
   concrete decisions: hierarchy, density, spacing, palette, imagery, and materials.
   Do not claim visual inspection if the result cannot be opened.
4. Implement concepts with native components, tokens, and responsive behavior.
   Keep meaningful text editable. Never embed a mockup as the functional UI.
5. Save assets actually used by the project to a stable local path when export
   is supported. Do not invent a local file from a chat attachment. Record the
   generation/source provenance and check usage constraints.
6. Choose an appropriate delivery format and resolution; reserve dimensions.
   Check the final responsive crop, legibility, loading, and interaction.

## Completion

For an image-only request, return the generated image without unnecessary
implementation work. For a design/build request, verify the built surface, not
just the concept. State unavailable export, render, or tool steps honestly.
