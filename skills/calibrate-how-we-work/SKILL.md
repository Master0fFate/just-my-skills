---
name: calibrate-how-we-work
description: >-
  Interview the user about durable collaboration preferences and propose an
  approved About me / How I think section for AGENTS.md. Use only on explicit
  request for this interview or a durable collaboration profile. Never trigger
  from a single preference, frustration, onboarding, or ordinary project intake.
---

# Calibrate How We Work

Build useful interaction rules, not a personality diagnosis. The deliverable is
an exact draft of `## About me / How I think`. Do not save it before the user
sees and explicitly approves the text and its destination.

## Boundaries

- Explicit invocation or a direct profile/interview request is required. A
  preference statement is not permission to build a persistent user model.
- Focus on learning, communication, decisions, feedback, getting stuck, and
  working under pressure. Project requirements are not durable personal traits.
- Do not diagnose, infer sensitive traits, assign intelligence/personality
  labels, flatter, or treat writing style as evidence of mood or intent.
- Ask one primary question at a time. Wait for the answer. Do not display a
  questionnaire unless asked, and do not repeatedly summarize each answer.
- Let the user skip, pause, or stop. Finish early when the evidence is enough;
  question counts are not a completion target.

## Interview

1. Once the intended profile path is known, inspect it for an existing section
   before interviewing or proposing an update. Read that section first. Treat existing rules as
   hypotheses to validate, not facts that cannot change. Do not inspect unrelated
   personal files to fill gaps.
2. Start from a concrete event, for example: “Think of the last difficult thing
   you learned well. What did you do that made it click?”
3. Follow the most useful unanswered area in [the question bank](references/interview.md).
   Cover material gaps without forcing every question. Reuse answers already given.
4. Translate labels into behavior. For “concise,” ask whether that means answer
   first, fewer branches, less repetition, or optional depth. Do not assume.
5. Probe vague or absolute claims with one example or exception. When answers
   conflict, find the condition rather than choosing the more flattering claim.
6. Challenge the provisional model: when would the user want the opposite, and
   what might an assistant overdo? Use answers to weaken or remove false rules.
7. Show a short summary of the strongest patterns and ask what is wrong or
   missing. Then draft only supported, useful instructions.

Keep interview notes in the current conversation unless storage is authorized.
Use a compact record when helpful:

`Candidate rule | example/evidence | condition | counterexample | confidence`

Prefer repeated concrete examples, then one recent example, then a clear
operational preference, then abstract self-description, then hypotheticals.
This is an evidence guide, not a claim that reported behavior is independently
observed. Separate what the user wants from what they report doing.

- **High:** repeated examples, or an explicit practical preference that survives
  an exception check.
- **Medium:** one strong example or a clear but conditional preference.
- **Low:** abstract, hypothetical, conflicting, or unclear evidence. Probe,
  qualify, or omit; never store it as a durable fact.

## Draft useful rules

Prefer a small set of strong instructions; do not fill headings to look complete.
Use only sections with supported content: learning, communication, decisions,
getting stuck, feedback, pressure, and important exceptions.

Write “When learning an unfamiliar system, start with a diagram, then code”
rather than “The user is a visual learner.” Write “During execution, recommend
one path; during exploration, compare distinct options” rather than “The user
likes options.” Stable, task-dependent, stakes-dependent, familiarity-dependent,
and temporary preferences must not be flattened into universal rules.

Persist only information useful for future collaboration. Prefer the interaction
rule to a medical, political, religious, sexual, family, or biographical explanation.
Do not store sensitive interview details merely because they were disclosed.

## Approval and saving

1. Show the complete proposed section or exact replacement diff. Label it draft.
2. Confirm the intended `AGENTS.md` path/scope if it is not already clear.
3. Wait for explicit approval such as “save it” or “approved, add that.” Silence,
   a topic change, and a general earlier request are not approval of unseen text.
4. Incorporate requested edits. If prior approval did not cover the revised text,
   show it and obtain approval before saving.
5. Update only the approved section. Preserve unrelated content; do not create
   duplicate headings. Re-read the saved section and report the path.

If the user stops early, return only supported provisional rules and remaining
material gaps. Do not invent a complete profile or keep interviewing against
an explicit stop request.

## Completion check

The draft gives actionable, evidence-backed guidance about the areas the user
wanted covered. Conditions and exceptions remain visible. No unsupported or
unnecessary sensitive claim is persisted. A saved profile matches the approved
text; otherwise report that it remains a draft.
