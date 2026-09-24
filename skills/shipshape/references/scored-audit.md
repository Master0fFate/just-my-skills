# Evidence-based scored audit

Use when the user requests grades, dimensional scores, a cross-domain audit, or
an independent assessment. This preserves the useful Universal Auditor method
without mandatory report bulk or unsupported professional assurance.

## Scope and independence

Identify the subject, stated objective, inferred objective (if any), inspected
representation, vectors, stakeholders, date/version, and materiality threshold.
Choose dimensions that could change the user's decision; omit irrelevant ones.
Do not audit a person's character from thin evidence or infer sensitive traits.

Keep the review read-only unless fixes are explicitly requested. Declare whether
the reviewer also created the work. A self-review must not claim independence.
If independence matters, use a separate reviewer with the criteria and artifact,
not a persuasive maker narrative, or disclose that independence was unavailable.
A conversational audit is not legal, medical, financial, security, or regulatory
certification. Name the actual evidence coverage instead of asserting credentials.

## Dimensions and evidence

Possible dimensions: objective fit, effectiveness, efficiency, technical rigor,
security, privacy, usability, resilience, operations, cost, stakeholder impact,
and cross-system consistency. Use as many as matter, not a fixed quota.

For each selected dimension record:

`Criterion | observation/evidence | strength or gap | impact | score if supported | confidence`

Separate direct evidence, inference, and missing evidence. Confirm benchmark
comparability before using a peer or best-in-class claim. Do not invent a
benchmark to complete a template. For mixed domains, inspect how boundaries
interact: a local win can move cost or risk elsewhere. Support causal claims;
do not label interactions additive or multiplicative without a model.

## Scoring contract

Define the rubric before scoring. For example: 0 = the observed capability fails,
5 = partly meets requirements with material gaps, 8 = meets requirements with
minor gaps, 10 = all named criteria demonstrated in the inspected scope.
An unknown is **not assessed**, not zero and not ten. Ten is not universal perfection.

Use weights only when justified by the objective. State weights, require them to
sum to 100%, and show the calculation. Do not average away an untested dimension;
report assessed coverage separately. Confidence is evidence quality, not an
arithmetic mean of colored icons. A critical failure blocks readiness regardless
of the average score. Grade bands, when requested, must be defined before use.

## Material findings and action

For each material finding include the observed condition, expected criterion,
evidence location, impact, severity, root cause (or hypothesis), and acceptance
check. Add likelihood and urgency when supported. Link a concrete remedy to
that finding, with expected outcome, effort, owner if known, and dependencies.
Do not manufacture three findings when only one is supported.

Default report: scope/limits → verdict → scorecard if requested → prioritized
findings → actions. Optional audit-opinion labels can be used if the user needs
them: unqualified (criteria met), qualified (named exceptions), adverse (material
failure), disclaimer (insufficient evidence). Explain them in ordinary language
and do not imply professional certification. Shipshape's readiness gate still
controls milestone claims.
