---
name: elon-five-principles
description: Apply Elon Musk's five-step engineering algorithm to requirements, processes, systems, code, product flows, and operations. Use when the user mentions Elon Musk, five principles, first-principles simplification, delete/simplify/accelerate/automate, process optimization, or making a system radically more efficient.
license: NONE (by github.com/Master0fFate)
metadata:
  trigger: Elon Musk five principles, five-step algorithm, delete simplify accelerate automate, process optimization, first principles
  source: Based on the widely cited Elon Musk five-step engineering algorithm
---

# Elon Five Principles

Apply Elon Musk's five-step engineering algorithm as a disciplined reduction and acceleration framework. The goal is not to sound intense. The goal is to remove bad requirements, delete unnecessary work, simplify what remains, speed the proven path, and automate only after the system is clean.

## When To Use This Skill

Use this skill when the user asks to:

- Apply Elon Musk's five principles or five-step algorithm.
- Improve a process, workflow, product flow, operation, code path, architecture, or team ritual.
- Reduce complexity, remove waste, simplify a system, or make execution faster.
- Review requirements, specs, roadmaps, meetings, CI pipelines, onboarding, handoffs, or release processes.
- Decide what to delete before optimizing or automating.
- Turn a vague improvement request into a ruthless but safe execution plan.

Do not use this skill for:

- Purely aesthetic work unless the issue is process or system complexity.
- Trivial edits where a simple direct fix is enough.
- Safety-critical changes without domain validation.
- Work that requires legal, medical, financial, or regulatory judgment beyond available evidence.

If the user provides a specific article, quote, transcript, or source, treat that source as authoritative and adapt the terminology to it. If no source is provided, use the standard five-step algorithm below.

## Core Principle

Do the steps in order. Never automate waste. Never accelerate confusion. Never optimize something that should not exist.

The algorithm:

1. Make the requirements less dumb.
2. Delete the part or process.
3. Simplify or optimize.
4. Accelerate cycle time.
5. Automate.

Optional step zero for AI agents: establish the actual objective, constraints, and evidence before touching the system.

## Operating Contract

When this skill is active, the assistant must:

- Treat every requirement as guilty until proven necessary.
- Ask who owns each requirement and why it exists.
- Prefer deletion over improvement when the thing does not serve the objective.
- Optimize only after deletion has been attempted.
- Accelerate only after the remaining path is understood.
- Automate only after the process is stable, valuable, and measured.
- Preserve safety, reversibility, tests, observability, and human accountability.
- Produce concrete decisions, not motivational slogans.

## Step 0: Establish Objective, Constraints, And Evidence

Before applying the five steps, identify:

- Objective: What outcome must improve?
- Unit of analysis: Requirement, workflow, code path, feature, process, org ritual, toolchain, or product flow.
- Success metric: Time, cost, quality, reliability, conversion, latency, defect rate, support load, user activation, or another measurable target.
- Constraints: Security, compliance, budget, team capacity, deadlines, backward compatibility, uptime, customer commitments.
- Current evidence: Logs, metrics, code, tickets, user complaints, process maps, incidents, tests, interviews, or direct observation.
- Reversibility: Whether changes can be rolled back safely.

If the objective or constraints are unclear, ask targeted questions. Do not produce a fake optimization plan.

## Step 1: Make Requirements Less Dumb

Assume requirements are often inherited, stale, or overfit to old constraints.

For every requirement, ask:

- Who requested this? Name the human owner, not a department.
- What problem does it solve now?
- What evidence proves the problem still exists?
- What happens if this requirement is removed?
- Is this a real constraint or an assumed constraint?
- Is the requirement stated as a solution instead of an outcome?
- Is it protecting users, protecting the business, or protecting someone's preference?
- Can the requirement be narrowed, reworded, or made testable?

Output each requirement as one of:

- Keep: Necessary and evidence-backed.
- Challenge: Plausible but under-evidenced.
- Rewrite: Valuable intent, bad wording or excessive scope.
- Delete candidate: No current owner, no evidence, or no material value.
- Escalate: Safety, legal, financial, or policy requirement that needs accountable review.

Rule: A requirement without an accountable owner is suspicious. A requirement without evidence is weaker than it looks.

## Step 2: Delete The Part Or Process

Deletion is the highest-leverage move. Delete before simplifying.

Look for:

- Steps nobody uses.
- Features with no active users or no strategic value.
- Meetings with no decision output.
- Reports nobody reads.
- Handoffs that exist because ownership is unclear.
- Validation layers that duplicate other validation layers.
- Configuration options that support imaginary futures.
- Code paths that only serve obsolete behavior.
- Metrics that do not drive decisions.
- Documentation that preserves wrong knowledge.

Deletion safety check:

- What depends on this?
- What breaks if it disappears?
- Who notices?
- How do we roll back?
- What test, metric, or alert confirms safe deletion?
- Is there a smaller deletion slice we can try first?

Decision labels:

- Delete now: Low risk, clear waste, easy rollback.
- Delete behind flag: Medium risk, needs staged rollout.
- Deprecate: External dependency or migration window required.
- Keep temporarily: Needed until another dependency changes.
- Do not delete: Safety, compliance, reliability, or core value reason.

Musk-style deletion heuristic: If you never have to add anything back, you probably did not delete aggressively enough. Apply this with judgment. Do not break safety, trust, data integrity, or legal obligations to satisfy the heuristic.

## Step 3: Simplify Or Optimize

Only simplify what survived deletion.

Simplification targets:

- Reduce branches, states, and special cases.
- Collapse duplicate workflows.
- Replace custom logic with a standard platform capability.
- Make ownership explicit.
- Convert implicit tribal knowledge into visible rules.
- Shorten user paths.
- Remove unnecessary configuration.
- Improve names, boundaries, and contracts.
- Make errors actionable.

Optimization targets:

- Improve the actual bottleneck, not the most visible annoyance.
- Reduce latency, queue time, rework, handoff cost, cognitive load, or failure rate.
- Prefer structural simplification over micro-optimization.
- Preserve readability and testability.

Guardrail: If simplification makes the system harder to understand, it is not simplification. It is compression.

## Step 4: Accelerate Cycle Time

Speed comes after clarity. Accelerate the correct path, not the broken path.

Find cycle-time bottlenecks:

- Waiting for approvals.
- Slow CI or deploys.
- Manual QA loops with low defect discovery.
- Back-and-forth requirements clarification.
- Repeated handoffs between teams.
- Large batch sizes.
- Poor local dev feedback loops.
- Slow review queues.
- Unclear ownership.
- Long-running jobs with no incremental checkpoints.

Acceleration moves:

- Shrink batch size.
- Parallelize independent work.
- Move checks earlier.
- Cache expensive repeated work.
- Create fast failure signals.
- Tighten ownership and decision rights.
- Reduce queue depth and WIP.
- Define done more clearly.
- Add progressive rollout instead of big-bang release.

Do not accelerate:

- A process with unclear requirements.
- A path with known safety defects.
- A workflow that should be deleted.
- A system with no monitoring or rollback.

## Step 5: Automate

Automate last. Automation freezes assumptions and scales both value and mistakes.

Automate when:

- The requirement is valid.
- The unnecessary parts have been deleted.
- The remaining workflow is simple.
- The bottleneck is proven and recurring.
- Success and failure are measurable.
- Exceptions are known and handled.
- A human owner remains accountable.
- Rollback or manual override exists.

Automation candidates:

- Repetitive checks.
- CI quality gates.
- Alert routing.
- Report generation that drives decisions.
- Data validation.
- Release packaging.
- Test generation for stable contracts.
- Environment setup.
- Ticket triage with human review.

Do not automate:

- One-off tasks.
- Politically unclear decisions.
- Broken requirements.
- Processes with high exception rates.
- Safety-critical judgment without review.
- Anything whose failure would be silent and material.

Automation design must include:

- Trigger.
- Input contract.
- Output contract.
- Owner.
- Logs or audit trail.
- Failure mode.
- Manual override.
- Rollback path.
- Verification method.

## Universal Analysis Canvas

Use this table when reviewing a system.

| Layer | Question | Evidence Needed | Output |
| --- | --- | --- | --- |
| Objective | What result matters? | Goal, metric, stakeholder | Target outcome |
| Requirements | Which requirements are dumb, stale, or solution-shaped? | Owner, rationale, current evidence | Keep, challenge, rewrite, delete |
| Deletion | What can disappear? | Dependency map, usage, rollback path | Delete plan |
| Simplification | What survived but is too complex? | Flow map, state map, error map | Simpler design |
| Acceleration | Where is the real bottleneck? | Timings, queues, cycle data | Speed plan |
| Automation | What stable repeated work should a machine do? | Frequency, failure modes, metrics | Automation spec |

## Software Engineering Application

When applying this skill to code or architecture, inspect:

- State ownership: Where does truth live?
- Interfaces: Which contracts are public, internal, or accidental?
- Dependency graph: What imports or calls this?
- Runtime path: What happens before, during, and after the change?
- Tests: Which tests prove behavior and deletion safety?
- Observability: What logs, metrics, traces, or errors show success or failure?
- Rollback: How do we revert without data loss?
- Data migration: Does old state need conversion?
- Security: Does deletion or automation weaken auth, validation, privacy, or auditability?

Code review sequence:

1. Restate the goal.
2. List requirements and challenge them.
3. Identify dead or redundant code paths.
4. Propose deletions before refactors.
5. Simplify remaining boundaries.
6. Speed feedback loops or hot paths only with evidence.
7. Automate checks only after stable behavior exists.
8. Define tests and rollback.

## Product And UX Application

When applying this skill to product flows, inspect:

- User objective.
- Business objective.
- Required user inputs.
- Screens, steps, and decisions.
- Drop-off points.
- Error states.
- Support tickets.
- Accessibility and trust requirements.
- Analytics events.
- Experiment or rollback path.

Deletion candidates:

- Optional fields that are not used.
- Screens that restate prior information.
- Choices users cannot evaluate.
- Confirmation steps that do not reduce risk.
- Settings that exist for edge cases nobody has.
- Empty states without a next action.

Automation candidates:

- Pre-filling known data.
- Background validation.
- Smart defaults.
- Progressive disclosure.
- Guided recovery from common errors.

## Operations And Process Application

When applying this skill to workflows or team operations, inspect:

- Trigger: What starts the process?
- Exit: What means done?
- Owner: Who can change the process?
- Handoffs: Where does work wait?
- Queues: Where does work pile up?
- Rework: Where does work bounce backward?
- Exceptions: What breaks the standard path?
- Controls: Which checks prevent real harm?
- Metrics: Which numbers drive decisions?

Deletion candidates:

- Status meetings with no decisions.
- Approval steps with no rejection history.
- Reports with no named reader.
- Ticket fields with no downstream use.
- Manual spreadsheet reconciliation that duplicates source systems.
- Rituals that exist because trust is low.

Acceleration candidates:

- Decision rights matrix.
- Smaller batch sizes.
- Async review with explicit SLA.
- Templates for repeated decisions.
- Fast escalation paths.
- Better ownership boundaries.

## Decision Rules

Use these decision rules to avoid mushy advice.

- If no one owns it, challenge it.
- If no one uses it, delete it.
- If it duplicates another control, merge or delete it.
- If it exists for an edge case, quantify the edge case.
- If it protects against real harm, keep it but make it cheaper.
- If it is complex because ownership is unclear, fix ownership first.
- If it is slow because batch size is large, shrink the batch.
- If it is repeated and stable, consider automation.
- If it is repeated but unstable, simplify before automation.
- If failure would be silent, add observability before acceleration or automation.

## Required Output For A Full Pass

When the user asks for a full analysis, produce:

1. Objective and constraints.
2. Current system map.
3. Requirement challenge table.
4. Deletion candidates ranked by value and risk.
5. Simplification plan for what remains.
6. Acceleration plan tied to bottlenecks.
7. Automation candidates with prerequisites.
8. Risks, rollback, and verification plan.
9. Next three actions.

## Quick Output Template

Use this for small requests.

```markdown
## Elon Five Principles Pass

Objective:
- [target outcome]

1. Requirements To Challenge
- [requirement] -> [keep/challenge/rewrite/delete] because [evidence]

2. Delete
- [thing to remove] because [reason]
- Safety check: [dependency/rollback/test]

3. Simplify
- [remaining thing] -> [simpler version]

4. Accelerate
- Bottleneck: [where time is lost]
- Move: [specific acceleration]

5. Automate
- Candidate: [task]
- Prerequisites: [stability/metrics/owner/override]

Next Actions:
1. [action]
2. [action]
3. [action]
```

## Full Output Template

Use this for substantial systems.

```markdown
# Elon Five Principles Analysis

## Objective
- Outcome:
- Success metric:
- Constraints:
- Evidence reviewed:

## Current System Map
- Trigger:
- Actors:
- Steps:
- State or artifacts:
- Feedback loops:
- Failure modes:

## 1. Make Requirements Less Dumb
| Requirement | Owner | Evidence | Finding | Decision |
| --- | --- | --- | --- | --- |
| [req] | [person/team] | [evidence] | [issue] | [keep/challenge/rewrite/delete] |

## 2. Delete The Part Or Process
| Candidate | Value Of Deletion | Risk | Dependency | Rollback | Decision |
| --- | --- | --- | --- | --- | --- |
| [item] | [time/cost/complexity saved] | [low/med/high] | [depends] | [rollback] | [delete/flag/deprecate/keep] |

## 3. Simplify Or Optimize
| Surviving Area | Current Complexity | Simplified Design | Verification |
| --- | --- | --- | --- |
| [area] | [complexity] | [change] | [test/metric/review] |

## 4. Accelerate Cycle Time
| Bottleneck | Evidence | Acceleration Move | Guardrail |
| --- | --- | --- | --- |
| [bottleneck] | [timing/queue data] | [move] | [safety check] |

## 5. Automate
| Candidate | Why Now | Owner | Failure Mode | Observability | Override |
| --- | --- | --- | --- | --- | --- |
| [automation] | [stable and repeated] | [owner] | [failure] | [log/metric] | [manual path] |

## Plan
1. [delete first]
2. [simplify second]
3. [accelerate third]
4. [automate last]

## Risks And Rollback
- Risk:
- Mitigation:
- Rollback:

## Next Three Actions
1. [specific action]
2. [specific action]
3. [specific action]
```

## Implementation Planning Template

When the user wants implementation, produce atomic steps in this order:

```markdown
## Execution Plan

### Step 1: Challenge Requirements
- Change:
- Files/processes affected:
- Verification:

### Step 2: Delete Waste
- Change:
- Deletion safety check:
- Verification:

### Step 3: Simplify Remaining System
- Change:
- Verification:

### Step 4: Accelerate Feedback Or Runtime
- Change:
- Bottleneck evidence:
- Verification:

### Step 5: Automate Stable Repetition
- Change:
- Owner:
- Observability:
- Manual override:
- Verification:
```

## Anti-Patterns

Stop and call out these mistakes:

- Automating a broken workflow.
- Optimizing before deleting.
- Treating inherited requirements as facts.
- Deleting safety controls without understanding the harm they prevent.
- Speeding up a process that produces bad outputs.
- Using first principles as an excuse to ignore domain expertise.
- Confusing simple with simplistic.
- Removing observability to reduce apparent complexity.
- Creating hidden manual work while claiming automation success.
- Leaving no owner for the new simplified system.

## Clarifying Questions

Ask only the questions needed to proceed. Good defaults:

- What outcome are we optimizing for?
- What artifact or workflow should I analyze?
- Who owns the current requirements?
- What evidence do we have that the current process is slow, expensive, fragile, or confusing?
- What cannot be broken?
- Is rollback required?
- Should I produce an analysis, an implementation plan, or make the changes directly?

## Final Response Discipline

Every response should be concrete and ordered. Avoid vague advice like "streamline the process" unless followed by exactly what to remove, simplify, speed up, or automate.

End with one of these decisions:

- Full Coherence: The system can be cleaned safely now.
- Pragmatic Partial: Core deletion or simplification is clear, but some risks remain.
- Hold And Clarify: The objective, owner, dependency, safety, or evidence is too unclear.
- User Override: The user asked to proceed despite flagged risks.
