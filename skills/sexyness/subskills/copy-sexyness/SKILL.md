---
name: copy-sexyness
description: >-
  Edit product language and prose so they feel clear, human, and specific while preserving meaning: labels, buttons, empty states, errors, onboarding, settings, tooltips, docs snippets, and microcopy. Use for UX writing, humanizing AI-sounding prose, preserving an author's voice, documentation, articles, PR descriptions, or removing filler and unsupported rhetoric.
---

# Copy Sexyness

Use this sub-skill for product words and standalone prose. For humanizing or substantial rewriting, read [references/human-editing.md](references/human-editing.md).

## Standards

- Make copy specific to the user's task and domain.
- Prefer short, concrete labels over clever slogans.
- Put the action in buttons and the consequence in supporting text.
- Make errors explain what happened, why it matters, and what the user can do next.
- Keep tone consistent with the product: calm for tools, playful only where it helps.
- Remove filler, hype, vague adjectives, duplicated explanation, and AI-sounding structure.
- Avoid visible instructions that explain obvious UI mechanics.

## Process

1. Read the source passage or inventory visible copy in the affected flow; identify the audience and preserve every substantive claim.
2. Identify the user's state: first use, routine use, error, empty, loading, success, or destructive action.
3. Rewrite for clarity, confidence, and brevity.
4. Compare the rewrite with the source for factual fidelity and voice. For UI copy, also check wrapping, truncation, and translation risk.

## QA Gate

- Labels and actions are understandable without extra explanation.
- Error and empty states are actionable.
- Copy fits inside its containers at relevant viewport sizes.
- Tone matches the product context.
- No generic AI filler remains in the touched surface.

## Meaning and delivery

Keep names, numbers, quotations, citations, uncertainty, and factual claims intact. Match a supplied writing sample rather than enforcing punctuation bans. Remove unsupported rhetoric without inventing supporting facts. For file edits, preserve code, metadata, data, and link targets unless they are in scope. Return the final text by default; include editorial diagnosis only when requested or useful outside the artifact.

UI-specific QA gates apply to UI copy; prose-only tasks verify meaning, structure, voice, and the target document format. For localized interfaces, preserve translation keys and placeholders and use complete translatable messages rather than concatenated English fragments.
