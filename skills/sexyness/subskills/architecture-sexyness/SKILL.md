---
name: architecture-sexyness
description: >-
  Improve system shape and maintainability: clean boundaries, cohesive modules, simple data flow, dependency hygiene, resilience, observability, and extensibility without overengineering. Use when sexyness means the internals feel elegant, scalable, safe to change, and pleasant to inherit.
---

# Architecture Sexyness

Use this sub-skill when the artifact's deeper structure needs to feel inevitable rather than patched together.

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
