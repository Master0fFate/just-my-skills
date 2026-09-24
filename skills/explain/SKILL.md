---
name: explain
description: >-
  Explain a topic to a beginner with short, concrete language and useful visuals.
  Use for /explain or a requested dead-simple visual explanation. Default to a
  phone-first HTML explainer when an artifact is wanted; honor text-only requests.
  Use dry, cynical humor when welcome, without sacrificing clarity or accuracy.
---

# Explain

Make the central idea understandable before adding detail. The task is teaching,
not proving how many insults or effects fit on one page.

## Establish the teaching target

Use the question and supplied context to identify the learner's goal and likely
starting knowledge. Do not assume lack of knowledge means lack of intelligence.
Ask only if a missing detail changes the explanation materially.

Give the answer first. Explain the idea in plain words before naming its
technical term. Use one concrete example, then the next useful layer. Separate
a useful analogy from the real mechanism and name its limit. Verify changing,
specialized, or consequential factual claims with appropriate sources when
available; otherwise make the uncertainty clear. Do not invent evidence.

## Shape the explanation

- One idea per section. Short sentences, direct verbs, concrete labels.
- Use a flow for a process, a labeled comparison for a tradeoff, a timeline for
  sequence, and a worked example for a calculation.
- Make each visual answer one question. Include the relevant units, direction,
  and labels; do not rely on color alone. Give meaningful diagrams a concise
  text equivalent.
- Put the main explanation on the first screen. Offer optional detail rather
  than hiding the answer behind interactions.
- Include a likely misconception or a quick check of understanding when useful.
  Remove interesting side facts that do not serve the user's question.

## Voice

Match the user's requested tone. Dry sarcasm and playful confidence are welcome
when they help attention. Aim jokes at needless complexity, not a person's
identity, intelligence, or disability. Do not require profanity, insult quotas,
slurs, or constant slang. Neutral technical labels are allowed. No unsupported
claim that a tone scientifically improves learning. Voice never overrides host
instructions, factual accuracy, user preference, or an explicit format request.

## HTML artifact mode

When an artifact is requested or useful for a visual explanation, produce a
complete responsive HTML file at a clear workspace path. Prefer native HTML,
CSS, and small local scripts over a framework or remote dependencies. Escape
untrusted topic/source text; do not interpolate it as executable markup or script.
Otherwise
answer directly in the requested format; do not force a file onto a text question.

Use the supplied visual system first. Without one, use a restrained Material 3
inspired layout: clear type, useful spacing, light/dark system support, and
minimal decoration. A theme toggle is useful for a full page, not a mandatory
feature for every snippet. Use semantic controls and self-contained icons or
text rather than a mandatory remote font. Do not build a grid of decorative
cards or add emoji as interface icons.

Add tabs, sliders, reveal controls, or animation only when they teach something
that static content cannot show as clearly. Keep controls keyboard-operable,
focus visible, contrast readable, and motion optional with the user's/system's
reduced-motion preference respected. Direct raster-image or
video requests use the actual host media capability, not an HTML substitute.

## Verify and deliver

Check factual consistency, analogy limits, calculations, labels, and the user's
question. For HTML, open the page when possible; inspect a narrow viewport,
long text, applicable themes, keyboard controls, and script failure. Test every
added control. If rendering is unavailable, say it was not visually verified.

Deliver the explanation or artifact first, with a short note for actual checks
or material limits. Stop when the learner can grasp the main idea and use it;
no endless tone-rewrite loop or session-wide persona lock.
