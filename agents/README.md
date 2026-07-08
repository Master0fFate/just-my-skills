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

## Layout

```text
agents/
-- coherence-governor/
|   `-- AGENTS.md
`-- precision-reasoning/
|   `-- AGENTS.md
```

Use `agents/[agent-name]/AGENTS.md` for new agents.
