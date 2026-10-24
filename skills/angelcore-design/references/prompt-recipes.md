# Reuse prompts

Supply the actual task and content after one of these starters. A prompt can
reduce ambiguity; it cannot guarantee a model's output quality.

## One web component

> Use angelcore-design in reference-monochrome mode. Build only the requested
> component in the existing stack. Apply the top-three rule: make purpose, next
> action, and state clear at a glance; keep copy factual and minimal, but retain
> necessary visible labels and accessible names, units, errors, and consequences.
> Keep square corners, neutral inks, compact mono type, one useful separator,
> and visible keyboard focus. Do not cage fields or buttons in 4-sided mid-gray
> borders. Do not add a terminal shell or hero image. Implement the states that
> apply. Check narrow widths and long labels. Use the current product's real
> labels and data.

## A website

> Use angelcore-design in reference-monochrome mode. Apply the top-three rule:
> make purpose, next action, and state clear at a glance; keep UI copy factual
> and minimal, but retain visible labels, accessible names, and state details.
> Keep normal website navigation and reading flow. Use ruled lists, restrained
> headings, 16px reading text, square form controls, and no colored accents.
> In-page fields use a label plus a one-sided hairline, not a whiteboard box.
> Do not copy the three-pane workspace. Start without art. Add a source-derived
> dither image only if it
> serves the content. Test the form, links, filter, and small-screen layout.

## A desktop work tool

> Use angelcore-design with the supplied reference screenshot. Apply the top-three
> rule: make purpose, next action, and state clear at a glance; use minimal,
> factual copy while retaining visible labels, accessible names, and state details.
> Match the visual relationships, not the private project names or image subject.
> Build clear navigation, an open work area, and only the side regions the task needs.
> Keep ambient art dim and idle-only. Make labels readable. Do not leave native
> white bevels or 4-sided control cages. Implement selection,
> search, keyboard focus, empty state, and error state before visual polish.

## A terminal tool

> Use angelcore-design for a real terminal, not a browser that looks like one.
> Apply the top-three rule: make purpose, next action, and state clear at a glance.
> Keep output factual and concise; retain necessary labels and error details.
> Use printable ASCII interface marks and preserve user text. Keep redirected
> output free from terminal control sequences. Test 80x24 and 120x40, then a
> narrow case. Do not claim interactivity unless input, resize, and clean exit
> are implemented. Remove art before useful information.

## A hero, cover, or release page

> Use angelcore-design in reference-monochrome mode with the whitewash light.
> Build the page as a normal website: navigation, sections, a real heading.
> Put one `.ac-stage` at the top with the supplied source whitewashed by
> `tools/whitewash.py` (record the seed and the signature numbers), a
> ground-colored fade behind the copy, one tracked serif display title that
> crosses into the light, a short voice list, a micro line, and three to five
> thin ornaments with one cropped by the edge. Carve the subject with a key
> light from one side. Keep it duotone. Leave a washed color trace only if the
> source has one that matters. Keep every control below the stage in mono with square corners and
> no cages. Neutral tint unless I say cold. Test 1440, 768, and 390 widths and
> the page with the stage removed.

## A source image

> Keep this exact source subject. Crop for the output size. For hero or
> ambient art, run `tools/whitewash.py`: crush to clipped white, halo, edge
> fade, seeded grain and scratches, band dither. For terminal or strict binary,
> run `tools/ascii_dither.py` once with a fixed matrix. Do not put dots or noise
> over an unchanged photo. Show the output at its final size and record the
> seed, source hash, and signature numbers.

## Continue an existing build

> Retain the approved token values, typography, image method, and square geometry.
> Apply the top-three rule: make purpose, next action, and state clear at a glance.
> Keep UI copy factual and minimal while retaining necessary labels and state
> details. Add the new behavior without redesigning the style. Check the new
> state beside the approved state. Do not add a new gray palette, icon style, or
> accent color,
> animation, or a new 4-sided border system. Record only the changes needed for this task.
