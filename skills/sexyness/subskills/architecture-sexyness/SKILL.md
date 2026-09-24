---
name: architecture-sexyness
description: >-
  Review or refactor system boundaries, module ownership, dependency direction,
  state flow, integration contracts, and resilience. Use when a problem spans
  modules or layers, including layered documents or operational workflows.
  Local implementation cleanup belongs to code-sexyness;
  measured runtime bottlenecks belong to performance-sexyness.
disable-model-invocation: true
---

# Architecture Sexyness

Use this playbook for structural changes with a concrete cause. Review-only requests remain read-only. Preserve public contracts and unrelated work; do not create speculative extension points.

## Standards

- Keep ownership boundaries clear: UI, domain, data, infrastructure, configuration, and integration code should not blur without reason.
- Prefer simple data flow and explicit dependencies.
- Make invalid states hard to represent.
- Keep modules cohesive and APIs narrow.
- Delete or merge abstractions that do not pay rent.
- Add extension points only for real variation already visible in the system.
- Preserve observability and failure handling at boundaries.

## Process

1. Map the current structure: modules, callers, dependencies, state ownership, data flow, and error boundaries.
2. Identify the architecture smell: coupling, duplication, unclear ownership, temporal dependency, hidden global state, leaky abstraction, or missing boundary.
3. Choose a small structural correction.
4. Update tests and call sites affected by the boundary change.
5. Verify the system still behaves through its public surface.

## QA Gate

- The new structure reduces real complexity or blast radius.
- Public interfaces are clear and documented by names, types, tests, or examples.
- No speculative framework or abstraction was added.
- Error paths and integration boundaries remain explicit.
- A future maintainer can locate the relevant behavior faster than before.

## Layered work

For abstraction design or cross-domain layering, read [references/layers-and-contracts.md](references/layers-and-contracts.md). It supplies the intent-to-details model, explicit boundary contracts, layer-value test, dependency direction, and substitution/failure checks. Use it to complete the requested work and reveal only the detail the user needs. For non-code artifacts, verify ownership, handoffs, consistency, and representative examples rather than requiring compilers or code tests.
