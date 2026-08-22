
---
name: explain
description: Explain any topic from zero using a polished, highly visual HTML artifact with big visuals, few words, and mandatory light and dark modes.
---

# /explain

Explain a topic so that an intelligent person with no prior knowledge can understand it quickly.

The finished output MUST be a polished, standalone HTML artifact.

## Invocation

/explain <what you want explained>

## Goal

Assume the reader knows nothing about this specific topic.

Start from first principles.

Build only the context needed to understand the subject.

Do not make the reader feel stupid.

Do not simplify something until it becomes inaccurate.

The artifact should make the reader think:

> "I get it now."

## Core experience

The artifact should feel like an excellent visual teacher.

Use:

- big visuals
- diagrams
- simple examples
- short labels
- progressive explanation
- concrete analogies
- clear hierarchy
- generous spacing
- minimal prose

Prefer showing over describing.

A reader should be able to skim the artifact and understand the main idea without reading every sentence.

## Mandatory Light / Dark Mode

EVERY artifact MUST support both:

- Light mode
- Dark mode

This is mandatory.

Include a clearly visible theme switch in the interface.

The switch should be easy to find, preferably in the top-right area.

Requirements:

1. Respect `prefers-color-scheme` on first load.
2. Let the user manually select Light or Dark.
3. Save the user's choice with `localStorage`.
4. Use CSS variables for the theme system.
5. Design both themes intentionally.
6. Check text, borders, diagrams, icons, shadows, backgrounds, and illustrations in both themes.
7. Maintain strong contrast in both themes.
8. Do not make Dark mode a lazy inversion of Light mode.
9. Do not use pure black and pure white unless there is a clear design reason.

## Explanation structure

Use this structure when it helps the topic.

### 1. The point

Start with the simplest useful answer.

One core idea.

One strong visual.

Very few words.

The reader should understand what the thing basically is within the first screen.

### 2. The mental model

Always talk in ASD-STE100 Simplified Technical English.

Always talk to the user like he has ADHD.

Give the reader a simple way to think about the topic.

Use a familiar analogy when it improves understanding.

Clearly identify analogies as analogies.

Do not let an analogy replace the real explanation.

### 3. The parts

Show the important components visually.

Prefer:

- labeled diagrams
- flows
- timelines
- before / after views
- comparisons
- layers
- annotated illustrations

Avoid long bullet lists.

### 4. How it works

Show the sequence when sequence matters.

Use numbered visual steps.

Make the flow understandable from the visual structure before the reader needs to read supporting text.

### 5. A concrete example

Move from abstract ideas to something real.

Use names, objects, values, or situations the reader can understand.

Prefer:

"Your calendar app asks Google for permission to read your meetings."

Instead of:

"Entity A requests authorization from Entity B."

### 6. Why it matters

Answer:

"So what?"

Explain the practical effect.

Show why the reader should care.

Prefer consequences over abstract benefits.

### 7. Go one level deeper

Only after the basic mental model is clear, introduce the technically correct terminology.

Define each technical term when it first appears.

Do not dump a glossary on the reader.

Use this sequence:

1. explain the idea normally
2. introduce its technical name
3. continue using the technical name

### 8. What people get wrong

When useful, include a small misconception section.

Prefer a strong visual contrast such as:

**NOT THIS → THIS**

Keep it short.

Only include misconceptions that materially improve understanding.

### 9. Remember this

End with a compact visual recap.

Use no more than 3 to 5 key ideas.

The final section should work as a memory aid without requiring the reader to review the whole artifact.

## Visual rules

The artifact MUST be visual-first.

Aim for approximately:

- 70% visual structure
- 30% text

This is a design principle, not a literal pixel calculation.

Use large visual explanations wherever they improve understanding.

Preferred techniques:

- inline SVG
- CSS diagrams
- cards used as visual objects
- arrows and connectors
- process flows
- timelines
- simple charts
- annotated examples
- comparison views
- interactive reveals
- before / after states
- lightweight animation

Every major visual must teach something.

Do not add decorative graphics just to make the artifact look busy.

Do not use generic stock imagery when a diagram would teach more.

Ask:

> "What question does this visual answer?"

If the answer is unclear, remove or redesign it.

## Text rules

Use as few words as possible without losing accuracy.

Prefer short, direct language.

Keep paragraphs very short.

Prefer labels and captions placed near the object they explain.

Do not put a textbook inside a nice webpage.

Remove text that repeats what the visual already communicates.

When a paragraph can become a diagram, strongly prefer the diagram.

## Language rules

Assume zero topic knowledge.

Assume the reader is intelligent.

Avoid:

- unexplained jargon
- unnecessary acronyms
- academic language
- corporate filler
- childish language
- vague abstraction
- metaphors that create incorrect mental models
- unnecessary technical detail before the core idea is clear

If a technical term is necessary, explain the concept first.

Then give it a name.

Example pattern:

> "Think of this as a temporary permission slip. The technical term is an access token."

## Interaction

Use interaction only when it improves understanding.

Good uses:

- step through a process
- reveal deeper detail
- switch between two states
- compare alternatives
- hover or tap labels
- animate a flow
- move between an example and the underlying concept

Bad uses:

- interaction added only because HTML supports it
- hiding information required for basic understanding
- excessive animation
- unnecessary carousels
- controls that do not materially help learning

The basic explanation must still make sense without interaction.

## Layout

Design mobile-first.

The artifact must work well on both desktop and mobile.

Use:

- a comfortable maximum content width
- large visual sections
- strong spacing
- obvious reading order
- clear section boundaries
- responsive typography
- responsive diagrams

Avoid dense dashboard layouts unless the subject genuinely needs one.

A strong default structure is:

1. Header + Light / Dark switch
2. Core idea
3. Big visual
4. How it works
5. Concrete example
6. Why it matters
7. One level deeper
8. Common misconception
9. Remember this

Do not force this structure when another structure explains the topic better.

## Accessibility

Required:

- semantic HTML
- keyboard-accessible controls
- visible focus states
- sufficient contrast
- descriptive labels
- meaningful document structure
- `prefers-reduced-motion` support
- do not communicate important meaning using color alone

## Technical requirements

Produce one self-contained HTML artifact.

Prefer:

- HTML
- CSS
- vanilla JavaScript
- inline SVG

Avoid unnecessary dependencies.

The artifact must:

- run without a build step
- work on desktop
- work on mobile
- have no horizontal overflow
- have no broken controls
- support Light mode
- support Dark mode
- remember the selected theme
- respect the system theme on first load
- remain understandable with JavaScript disabled where practical

## Design quality

The result should feel intentionally designed.

Do not create a generic documentation page with some colored cards added to it.

Do not create a wall of text.

Do not create twelve identical rounded rectangles and call that visual communication.

Use scale, layout, spacing, typography, diagrams, and interaction to create a clear teaching experience.

The visual hierarchy should make the explanation obvious even before the reader starts reading closely.

## Quality check

Before finishing, verify all of the following:

- Can someone understand the basic idea in 30 seconds?
- Does the first screen answer "What is this?"
- Is the explanation accurate?
- Does it assume zero prior knowledge?
- Is the reader treated as intelligent?
- Is the artifact visual-first?
- Can any paragraph become a visual?
- Can any sentence be deleted?
- Does every major visual teach something?
- Is there a concrete example?
- Is the practical importance clear?
- Are technical terms introduced only when needed?
- Does the explanation become progressively deeper?
- Is there a useful final recap?
- Is the Light / Dark switch clearly visible?
- Does Light mode look intentional?
- Does Dark mode look intentional?
- Is the selected theme remembered?
- Does the artifact respect the system theme on first load?
- Does it work well on a phone?
- Are controls keyboard accessible?
- Is reduced motion supported?
- Is there any unnecessary decoration, prose, or interaction?

If any answer is no, revise the artifact before returning it.
