# Human editing and meaning preservation

Use for humanizing prose, documentation, PR descriptions, articles, or substantial product copy. Edit the passage as connected writing rather than replacing a list of forbidden words.

Preserve facts, names, numbers, dates, quotations, citations, rankings, uncertainty, and material claims. Never invent anecdotes, credentials, reactions, or attribution to make prose feel human. If a claim needs unavailable evidence, retain its uncertainty or identify the gap. Do not quietly delete a substantive claim under the label of filler.

Match a supplied writing sample's formality, rhythm, vocabulary, punctuation, and deliberate quirks. Keep real specificity, mixed feelings, humor, useful asides, and sentence-length variation. Technical and reference text stays appropriately neutral. Ordinary formal language is not evidence of AI authorship.

## Patterns to inspect

- Inflated importance, legacy claims, name-dropping, sales adjectives, and vague attribution that add no supported information.
- Shallow analysis appended as participial phrases; fake ranges; generic challenges-and-future sections; decorative headings or repeated summaries.
- Stock AI vocabulary, avoidance of simple verbs such as is/has, synonym cycling, forced rule-of-three lists, and repeated negative-parallel formulas.
- Mechanical transitions, overused dashes, bold mini-headings, emojis, typographic changes, or lists that erase the writer's natural structure.
- Chatbot greetings and sign-offs, excessive agreement, knowledge-cutoff disclaimers, and plausible guesses about missing facts.
- Filler phrases, stacked qualifiers, generic optimistic endings, needless hyphenated phrases, and passive constructions that hide the actor.
- Declarations of a deeper truth, announcements of the next point, headings restated in the first sentence, forced punchlines, and formulaic sayings.
- Fake-candid hooks, unsupported defenses against unnamed objections, and implausible alternatives introduced only to reject them.
- Documentation about the previous draft when the document should describe current behavior. Keep history in release notes and migration guides when it serves their purpose.

These are contextual signals, not automatic bans. Preserve quoted text, proper names, real alternatives, useful scope limits, legal notices, deliberate repetition, and punctuation that belongs to the writer. Do not infer AI authorship from a phrase, correct grammar, or a dash.

## Pass and delivery

Read the source, draft a coherent rewrite, review rhythm and voice, then compare source and result for added or missing claims. Rewrite an awkward paragraph around its actual point instead of stacking phrase-level patches. Return the final rewrite by default; provide diagnosis or before/after material when requested.

For file edits, change the prose in place while preserving code blocks, YAML, structured data, literal identifiers, and link targets unless their modification is part of the task. For embedded PR or product-copy work, deliver only the requested text, without editing-process commentary inside it.

Adapted from Humanizer by Siqi Chen and its use of [Wikipedia's Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing). The original MIT notice is retained in [LICENSE-humanizer](../LICENSE-humanizer).
