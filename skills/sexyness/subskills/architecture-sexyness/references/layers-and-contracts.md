# Layers and contracts

Use for boundary design, modularity, layered analysis, or simplification across code, interfaces, documentation, and workflows. Organize the actual task with this model; do not turn it into a lesson unless requested.

Separate intent (outcome and constraints), concepts (meaning and invariants), contracts (capabilities and failure semantics), mechanisms (components and procedures), and implementation details. Merge levels that add no value. Group responsibilities by ownership and reason for change.

At a meaningful boundary, identify inputs, outputs, state and lifecycle ownership, side effects, preconditions, errors and recovery, dependencies, and the details it hides. Expose material latency, resource costs, trust boundaries, compatibility, and evidence requirements. A simple API must not conceal important costs or failures.

Shape contracts around the consumer's need. Keep domain rules independent from replaceable vendors, storage formats, and framework types. Translate representations at boundaries. Avoid dependency cycles and do not force a call through a layer that adds no policy, translation, ownership, or protection.

Retain a layer only if it isolates volatility, enforces an invariant, separates ownership or lifecycle, supports substitution, or reduces cognitive load. Merge wrappers that merely forward or rename. Do not unify cases with different semantics just because their code looks similar.

Decide from outcome toward details; verify from details back to public behavior and intended outcome. When material, check substitution of a tool/vendor, a new consumer, a changed policy or scale, and failure or partial completion. Changes should remain inside the boundary that owns them.

Adapt vocabulary to the domain:

| Domain | Useful progression |
|---|---|
| UI | User goal, interaction model, domain components, primitives, browser details |
| Documents | Reader goal, concepts, procedures, technical detail, reference |
| Research | Decision, questions, claims, methods, evidence |
| Operations | Objective, outcomes, workstreams, procedures, tools |
| Debugging | Symptom, affected capability, subsystem, component, root cause |

Lead the deliverable with the usable outcome and reveal supporting detail as needed. Keep claims traceable to evidence and requirements traceable to implementation. Decluttering alone does not create an abstraction, and summarization must not erase facts needed for verification.
