# Skills

Reusable LLM skills live here. Each skill sits in its own folder with a `SKILL.md`.

## Skill Catalog

### Abstraction Layers

Path: `skills/abstraction-layers/SKILL.md`

Applies layered thinking to complex work by separating intent, concepts, contracts, mechanisms, and implementation details while keeping boundaries clear and complexity contained.

### Adaptive Orchestrator

Path: `skills/adaptive-orchestrator/SKILL.md`

Coordinates complex work by decomposing it into focused tasks, delegating when useful, and integrating the results. It keeps planning and final verification with the parent agent while avoiding unnecessary orchestration for simple requests.

### Brainstorm Funnel

Path: `skills/brainstorm-funnel/SKILL.md`

Transforms raw, dictated brainstorming into a researched, de-duplicated, and evidence-backed decision funnel. It preserves the user's original intent while turning ideas into validated options, concrete actions, and measurable plans.

### Calibrate How We work

Path: `skills/calibrate-how-we-work/SKILL.md`

This skill interviews you to learn how you think, learn, decide, communicate, and work best with an AI, using concrete examples instead of shallow personality labels. Validate patterns into practical instructions for AGENTS.md, only after checking for exceptions, contradictions, and getting your approval.

### Constraint-Driven Optimization

Path: `skills/constraint-driven-optimization/SKILL.md`

Optimizes code and interfaces within explicit constraints, prioritizing correctness and required behavior while reducing the costs that matter, such as runtime, memory, I/O, network transfer, or rendering work.

### Elon Five Principles

Path: `skills/elon-five-principles/SKILL.md`

Applies Elon Musk's five-step engineering algorithm to simplify requirements, delete unnecessary process, accelerate feedback, and automate stable repetition.

### Explain

Path: `skills/explain/SKILL.md`

Creates a nice artifact/html file explaining you any topic. No overly complicated lingo.

### Iterative Refinement

Path: `skills/iterative-refinement/SKILL.md`

Guides deliberate generate-evaluate-revise-verify loops for complex or quality-sensitive work.

### Planner Omega

Path: `skills/planner-omega/SKILL.md`

Builds grounded, verification-first plans for substantial goals. It turns broad build, launch, migration, research, roadmap, and strategy requests into concrete phases, acceptance checks, risks, and immediate next actions.

### Precision Architect

Path: `skills/precision-architect/SKILL.md`

Turns rough requests into fully specified, unambiguous, execution-ready prompts.

### Retrofit

Path: `skills/retrofit/SKILL.md`

Modernizes old systems, code, designs, docs, workflows, or prompts while preserving intent, compatibility, and trust.

### Sexyness

Path: `skills/sexyness/SKILL.md`

Drives premium transformations across design, code, motion, performance, accessibility, copy, and architecture.

### Universal Auditor

Path: `skills/universal-auditor/SKILL.md`

Provides evidence-based audits across domains with calibrated grading, dimensional scoring, and actionable remediation.

Add new skills above this note using the same pattern: title, path, and a short explanation.

## Layout

```text
skills/
|-- abstraction-layers/
|   `-- SKILL.md
|-- adaptive-orchestrator/
|   `-- SKILL.md
|-- brainstorm-funnel/
|   `-- SKILL.md
|-- constraint-driven-optimization/
|   `-- SKILL.md
|-- elon-five-principles/
|   `-- SKILL.md
|-- iterative-refinement/
|   `-- SKILL.md
|-- planner-omega/
|   `-- SKILL.md
|-- precision-architect/
|   `-- SKILL.md
|-- retrofit/
|   `-- SKILL.md
|-- sexyness/
|   `-- SKILL.md
`-- universal-auditor/
    `-- SKILL.md
```

Use `skills/[skill-name]/SKILL.md` for new skills.
