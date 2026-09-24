# Plan contract templates

Load only when a complex or durable plan needs more structure. Select fields that change execution. These are output templates, not required ceremonies.

## Compact control artifact

```markdown
# [Goal]
Outcome / beneficiary:
Done means: [observable result, not effort spent]
Scope / non-goals:
Constraints: [time, cost, tools, permissions, compatibility]
Current state -> desired state:
Recommended route / strongest alternative:
Decision reason / counter-case:

| ID | Action and output | Depends on / precondition | Owner / resource | Acceptance and evidence | State |
|---|---|---|---|---|---|
| T1 | [specific action -> artifact] | [input or prior gate] | [owner, path/system, capacity] | [check + pass threshold + evidence location] | pending |

Critical path:
Next unblocked action:
Open assumptions / blockers:
Continue / change / stop conditions:
```

Resource means more than a person: include exclusive files, shared databases, deployment targets, budgets, credentials, test environments, and scarce equipment when relevant. Name the integration owner. Work on the same resource must be sequenced or explicitly isolated.

## State and action model

Use for migrations, high-risk operations, or plans with non-obvious prerequisites.

| Action | Required state | State change | Resource consumed | Failure / recovery | Gate |
|---|---|---|---|---|---|
| Backfill new column | Backup recoverable; additive schema live | Old and new representations coexist | Database write budget; migration owner | Pause batches; retain old read path | Reconciliation finds no unexplained mismatch |
| Switch reads | Reconciliation passed; compatibility checked | New representation is authoritative | Release slot | Restore old read path | Smoke tests and error-rate threshold pass |

Do not make rollback a word without a method. State the recovery artifact, safe boundary, trigger, owner, and check. Do not authorize a destructive action merely by listing it in a plan.

## Grounding and uncertainty

| ID | Fact / assumption | Basis and date/version | Effect if false | Cheapest check | Decision threshold |
|---|---|---|---|---|---|
| A1 | [what must be true] | [inspected source or explicit unknown] | [affected task/option] | [test or source] | [continue/change/stop] |

Prefer primary documentation, relevant standards, original data, and maintained local contracts. Record what each source supports, not just a reading list. Keep disagreements visible. Check freshness only where it matters. If tools or access are missing, schedule the check and label the dependent result unverified.

## Risk and change control

| Risk | Warning / trigger | Prevention | Fallback | Owner / review point |
|---|---|---|---|---|
| [failure mode] | [observable signal] | [specific safeguard] | [safe alternate route] | [who, when] |

Use an if-then rule for predictable obstacles: `If [signal], then [response], and reopen [decision] if [threshold].`

A compact change note is enough:

```text
Reason / new evidence:
Affected task and decision IDs:
New next action:
Changed risk / scope / acceptance:
```

Revise when user constraints change, evidence invalidates an assumption, a dependency fails, a safety issue appears, or a simpler path meets the same contract. Do not rewrite the whole plan for a minor status update.

## Evidence gates by deliverable

- Code: relevant tests, type checks/build where applicable, diff inspection, runtime reproduction.
- Data: schema checks, reconciliation, edge fixtures, privacy and lineage checks.
- Research: inspected sources, quote/claim match, date/context limits, competing evidence.
- Product/design: user task acceptance, accessibility, empty/error/loading states, measurement.
- Operations: restore or rollback proof, monitoring, runbook and permission checks.
- Business: cost model, sensitivity tests, vendor evidence, explicit go/no-go thresholds.

Use the strongest practical check; a long test list is not evidence. Record command/method, result, artifact, and limitation. A blocked test does not pass. Planning a test does not complete the task. When only a plan was requested, label its gates **planned**, not **verified**.

## Task sizing and surface

A useful task has one inspectable result. Split “build backend” into contract-sized actions; avoid splitting routine steps so far that status bookkeeping costs more than the work. Decompose uncertain work around the cheapest informative test first. Estimate ranges with assumptions rather than invented exact dates.

Keep one source of plan state. Use checkboxes only if helpful, with status notes for blocked/deferred work. Leave a checkbox open until acceptance evidence exists. Do not create extra files solely to mirror these templates.
