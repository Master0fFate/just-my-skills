---
name: abstraction-layers
description: "Apply abstraction layers as a general execution paradigm: separate intent, concepts, contracts, mechanisms, and implementation details; hide volatile complexity behind stable boundaries; reveal detail progressively. Use for complex planning, analysis, design, implementation, review, debugging, refactoring, or explanation across software, UI, workflows, documents, research, and operations—especially for layered thinking, separation of concerns, modularity, or simplification without information loss. Do not use for trivial one-step work or cosmetic decluttering."
---

# Apply Abstraction Layers

## Operating directive

Apply abstraction layers **to perform the user's task**. Do not turn the response into a lesson about abstraction unless the user asks for one.

Start from the desired outcome. Organize the work so each layer exposes the meaning needed by the layer above while hiding lower-level detail that is volatile, distracting, or replaceable.

Use the layer model internally. Show the layer map only when it improves the deliverable.

## Reference layer stack

Create a task-specific stack of roughly three to six layers. Use this as a default, not a rigid template:

1. **Intent** — desired outcome, users, success criteria, and constraints.
2. **Concepts** — domain objects, responsibilities, rules, and invariants.
3. **Contracts** — capabilities, inputs, outputs, states, dependencies, and failure semantics.
4. **Mechanisms** — components, workflows, algorithms, tools, and integrations.
5. **Details** — code, configuration, data, evidence, parameters, and edge cases.

Merge or remove a layer when it does not reduce complexity. Add a specialized layer only when it owns a distinct responsibility or boundary.

## Core procedure

### 1. Frame the outcome

Identify the actual deliverable and what makes it successful.

Separate:

- stable intent from changeable implementation;
- required constraints from incidental preferences;
- domain meaning from tool or framework terminology; and
- user-visible behavior from internal mechanics.

Proceed with reasonable assumptions unless missing information blocks a correct result.

### 2. Build the layer map

Group the task's complexity by responsibility, semantic level, and rate of change.

For each proposed layer, determine:

- its single primary purpose;
- what it owns;
- what it receives and produces;
- what it may depend on;
- what it hides;
- which invariants it enforces; and
- which risks or costs must remain visible.

Keep neighboring concepts together. Separate concerns that change for different reasons.

### 3. Define boundaries and contracts

Make every meaningful boundary explicit enough to execute against.

Specify, when relevant:

- inputs and outputs;
- state and lifecycle ownership;
- preconditions and invariants;
- errors and recovery behavior;
- side effects;
- security and trust boundaries;
- performance, latency, or resource costs;
- compatibility and versioning; and
- observability or evidence requirements.

Translate across boundaries. Do not leak lower-layer types, jargon, vendor behavior, storage models, raw evidence, or framework mechanics upward unless they are intentionally part of the contract.

### 4. Set dependency direction

Keep high-level decisions independent from replaceable low-level mechanisms.

Prefer contracts shaped by the higher-level need. Let lower layers implement or satisfy those contracts.

Avoid cycles. Do not force every interaction through every layer; a direct dependency is acceptable when an intermediate layer adds no policy, translation, ownership, protection, or clarity.

### 5. Execute top-down

Make decisions in this order:

1. preserve the intended outcome;
2. preserve domain meaning and invariants;
3. satisfy the contracts;
4. select suitable mechanisms; and
5. implement the necessary details.

Do not begin with tools, syntax, components, or low-level structure unless the user explicitly asks for that layer.

### 6. Verify bottom-up

Validate details first, then mechanisms, contracts, concepts, and finally the intended outcome.

Check at least these change scenarios when material:

- replace a lower-level tool, vendor, format, or implementation;
- add a new use case or consumer;
- change a constraint, policy, or scale requirement; and
- handle failure, partial completion, or invalid input.

A strong abstraction contains most resulting changes within the appropriate lower layer.

### 7. Present with progressive disclosure

Lead with the usable result at the highest relevant level.

Add lower-level structure only as needed for understanding, verification, implementation, or handoff. Preserve traceability so a reader can move from outcome to detail and back without information loss.

Do not expose the abstraction process as ceremony. Use natural headings appropriate to the task.

## Layer-value test

Add or retain a layer only when it does at least one of the following:

- isolates volatile details;
- translates between meanings or representations;
- enforces policy, invariants, security, or quality;
- separates ownership, trust, deployment, or lifecycle;
- enables substitution, testing, reuse, or independent evolution;
- reduces cognitive load for the next layer; or
- provides a stable point for observability or control.

Remove or merge a layer when it only renames, forwards, mirrors, or reorganizes without changing meaning or containing complexity.

## Cross-domain mappings

Adapt the stack to the task instead of forcing software terminology.

| Domain | Typical layers |
|---|---|
| Software systems | user outcome → domain policy → application contract → adapters/services → platform details |
| UI and product design | user goal → interaction model → domain component → UI primitives → tokens/browser mechanics |
| Research and analysis | decision → questions/model → claims → methods → evidence/raw sources |
| Planning and operations | objective → outcomes → workstreams → procedures → tasks/tools |
| Documentation | reader outcome → conceptual model → procedures → technical detail → reference material |
| Debugging | observed symptom → affected capability → subsystem → component → root cause/fix |

In UI work, visual decluttering is not itself an abstraction layer. Apply abstraction when grouping behavior, meaning, state, accessibility, or implementation behind a coherent interface. Visual simplification may be one outcome.

## Failure modes to prevent

- **Detail-first execution:** choosing tools or syntax before defining the outcome.
- **Leaky boundary:** upper layers must understand hidden internals to work correctly.
- **Pass-through layer:** a layer forwards information without translation, policy, or containment.
- **Wrong altitude:** a contract exposes mechanisms instead of the meaning consumers need.
- **Over-layering:** simple work becomes difficult to trace through unnecessary indirection.
- **God layer:** unrelated responsibilities are grouped behind one broad abstraction.
- **False unification:** superficially similar cases with different semantics are forced together.
- **Hidden cost:** a simple surface conceals important latency, failure, security, or resource behavior.
- **Abstraction inversion:** normal use repeatedly requires bypassing the abstraction.
- **Traceability loss:** summarization or simplification removes facts needed to verify the result.

## Default output behavior

Deliver the requested artifact, answer, implementation, or decision directly.

For complex work, usually structure the result as:

1. the outcome or recommendation;
2. the high-level model or layer map;
3. the contracts, decisions, or interfaces;
4. the implementation details that are currently necessary; and
5. validation, risks, or next actions.

Do not literally use these headings when domain-specific headings are clearer. Do not include a layer map for a simple task merely because this skill is active.


## Completion gate

Before finishing, verify that:

- the user's real task was completed rather than merely explained;
- each retained layer has a distinct responsibility and positive value;
- high-level meaning does not depend on unnecessary low-level detail;
- boundaries expose necessary constraints, failures, and costs;
- information is simplified without becoming incomplete or misleading;
- dependencies are intentional and acyclic where applicable;
- the result is traceable from outcome to implementation;
- no pass-through or speculative layers were added; and
- the visible response contains only the depth the user needs.
