# Five-principles process simplification

Use for explicit Elon Musk/five-principles requests or a process with demonstrated
waste. Apply the sequence, not the personality. Optimize a real objective under
protected safety, reliability, data, user, legal, and compatibility constraints.

## Establish the unit

Name the workflow, requirement, product flow, or code path; its trigger, end
result, owner, inputs, states, handoffs, exceptions, and current evidence. Choose
a meaningful metric: time, cost, queue delay, rework, failure rate, or user effort.
Separate a measured baseline from an estimate. Identify rollback and approvals.

## 1. Challenge requirements

Ask what problem a requirement solves now, who is accountable for it, what
supports it, and what happens without it. Distinguish required outcomes from
inherited solutions. A missing owner or evidence is a reason to investigate,
not proof that a safety or compliance requirement can be deleted.

Decide: **keep / challenge / rewrite / deletion candidate / specialist review**.
Use named owners when known; do not halt all work until every owner is found.

## 2. Delete unnecessary parts

Look for unused reports, duplicate handoffs, dead paths, repeated data entry,
unnecessary settings, and controls with the same demonstrated function.
Before deletion, check consumers, usage, side effects, harm prevented, and a
recovery path. Duplicate-looking controls can protect different failure modes.

Decide: **delete now / trial behind a flag / deprecate with migration / keep
until dependency changes / retain**. Unknown usage means investigate or stage,
not delete blindly. Do not apply a deletion quota or intentionally over-delete
just to satisfy a slogan. Preserve tests, observability, and accountable control.

## 3. Simplify survivors

Reduce states, branches, ownership ambiguity, and avoidable configuration.
Consolidate truly equivalent workflows; use platform capabilities when suitable.
Improve boundaries and error recovery. Compression that makes a process harder
to understand is not simplification. Confirm the surviving flow still reaches
the intended result, including exceptions.

## 4. Accelerate the proven path

Measure waiting, batch size, approvals, CI, review queues, and repeated rework.
Prioritize the actual bottleneck. Use smaller batches, early failure signals,
clear decision rights, caching, or independent parallel work where justified.
Do not accelerate a path with unresolved material safety defects. Check that
work or cost was not merely transferred to another team or step.

## 5. Automate stable repetition

Automate only a recurring, valuable, understood process with known exceptions.
Specify trigger, input/output contracts, owner, logs, failure signal, limits,
manual override, verification, and rollback. Keep high-stakes judgment with
appropriate human review. A one-off task rarely needs an automation system.

## Compact result

| Item | Evidence/problem | Keep/delete/simplify/speed/automate | Dependency or risk | Verification and rollback |
| --- | --- | --- | --- | --- |
| Real finding | Observed effect | Specific action | Protected constraint | Actual check |

Report changes in that order. Distinguish proposed actions from executed work.
Use a small pilot for uncertain deletion. Stop when the requested outcome is
proved or name the unresolved boundary; do not promise guaranteed efficiency.
