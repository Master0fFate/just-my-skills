# Agents

Reusable agent operating contracts live here. Each agent sits in its own folder with an `AGENTS.md`, matching the skill layout used under `skills/`.

## Agent Catalog

### Coherence Governor

Path: `agents/coherence-governor/AGENTS.md`

<img width="1080" height="720" alt="coherence_governor_auditimage" src="https://github.com/user-attachments/assets/30f6e04d-00e3-42be-829e-0327e4e99dca" />


Coherence Governor is a high-control execution contract for agents that need to stay grounded under pressure. It turns a regular agent workflow into a coherence-first loop: lock the active instructions, inspect real evidence, clarify intent, execute narrowly, verify the result, and report only what is true.

Use Coherence Governor when you want an agent to:

- Follow the live instruction stack without drifting into preference.
- Inspect files, tools, docs, runtime output, and git state before making claims.
- Turn messy requests into concrete acceptance tests.
- Keep changes narrow, verified, and auditable.
- Move fast by parallelizing independent discovery and escalating verification only when risk requires it.

It is designed for coding, repo work, audits, research, UI QA, documentation, and git operations where a confident-but-unverified answer is not good enough.

### Precision Reasoning Agent

Path: `agents/precision-reasoning/AGENTS.md`

<img width="1672" height="941" alt="precision_reasoning_image" src="https://github.com/user-attachments/assets/461a06e7-4dd1-418f-a429-1054d9961e99" />


Precision Reasoning is an always-on high-rigor reasoning kernel for agents that need better framing, branch selection, edge-case coverage, verification discipline, and concise final synthesis. It converts broad problem solving into a precision-first loop: frame the real goal, separate facts from assumptions, branch when strategy matters, simulate failure cases, attack the chosen path, refine, and answer with calibrated confidence.

Use Precision Reasoning when you want an agent to:

- Scale effort intelligently instead of overthinking simple tasks or underthinking hard ones.
- Compare multiple solution paths before committing to a fragile answer.
- Dry-run code, systems, math, plans, and decisions against edge cases and failure modes.
- Verify current, technical, factual, or high-risk claims on the right proof surface.
- Keep final answers direct, useful, auditable, and free of hidden-reasoning leakage.

It is designed for coding, debugging, architecture, research synthesis, mathematical reasoning, planning, audits, and high-consequence decisions where the quality of the reasoning path materially changes the outcome.

if forked -> push request:
Add new agents below this section using the same pattern: title, path, short explanation, optional image, and practical use cases.

### Verity Operator

Path: `agents/verity-operator/AGENTS.md`

<img width="1672" height="941" alt="verity_operator_image" src="https://github.com/user-attachments/assets/2eacf0e2-6f47-4f62-83ea-afe941c55223" />


Verity Operator is a grounded execution and reasoning contract for agents that need both strong judgment and strict execution discipline. It combines Coherence Governor's instruction, scope, evidence, and verification controls with Precision Reasoning's framing, branch selection, failure analysis, and edge-case discipline.

Its core operating loop is: lock the real goal, observe live state, decide with the right amount of reasoning, make the smallest correct change, prove the result on the real surface, and report only what the evidence supports.

Use Verity Operator when you want an agent to:

- Stay locked onto the user's actual outcome instead of drifting into nearby work.
- Inspect the live workspace, runtime, documentation, and git state instead of guessing.
- Scale reasoning effort to task difficulty without overthinking simple work.
- Compare alternative approaches when strategy is genuinely unclear.
- Keep code changes narrow and avoid unnecessary refactors or abstractions.
- Debug from evidence instead of stacking speculative fixes.
- Match verification strength to the risk and user-facing surface.
- Reject fake completion, stale assumptions, and confident-but-unverified claims.

It is designed for coding, debugging, repo maintenance, architecture, research, audits, UI QA, integrations, and high-impact implementation work where both reasoning quality and execution reliability matter.

Path: `agents/verity-operator/AGENTS.md`



## Layout

```text
agents/
- coherence-governor/
|   -- AGENTS.md
- precision-reasoning/
|   -- AGENTS.md
- verity-operator/
|   -- AGENTS.md
```

Use `agents/[agent-name]/AGENTS.md` for new agents.
