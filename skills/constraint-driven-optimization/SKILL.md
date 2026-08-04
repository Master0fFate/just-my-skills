---
name: constraint-driven-optimization
description: Optimizes implementations under explicit constraints across algorithms, backend systems, frontend code, and user interfaces. Use when creating, reviewing, profiling, or refactoring code to reduce runtime, CPU work, memory use, allocations, I/O, network transfer, bundle size, rendering cost, interaction latency, or visual clutter while preserving correctness, security, maintainability, accessibility, and required behavior.
---

# Constraint-Driven Optimization

## Objective

Produce the simplest correct solution that minimizes total cost within the task's hard constraints.

Treat optimization as a multi-objective problem. Consider runtime, CPU work, peak memory, allocations, I/O, network transfer, storage, bundle size, render work, interaction effort, visual complexity, maintenance risk, and implementation time. Do not improve one metric by silently violating another requirement.

**Optimal means Pareto-efficient for the stated constraints, not merely shortest code or the lowest value in one benchmark.**

## Priority Order

Apply this order unless the user explicitly sets a different one:

1. Correctness, safety, and security
2. Required behavior and user outcomes
3. Hard time, memory, platform, and compatibility limits
4. Usability and accessibility
5. Measured end-to-end performance and resource efficiency
6. Simplicity and maintainability
7. Code compactness and cosmetic micro-optimization

Never sacrifice a higher priority for a negligible improvement in a lower priority.

## Workflow

### 1. Define the optimization contract

Before changing code or UI, identify:

- Required behavior, inputs, outputs, invariants, and failure modes
- Maximum input size, data distribution, concurrency, and request volume
- Runtime, memory, latency, bundle, network, and storage budgets
- Target language, runtime, framework, devices, browsers, and deployment environment
- Existing APIs, tests, design system, accessibility requirements, and compatibility constraints
- The primary metric to minimize and the metrics that must not regress

When constraints are missing, inspect the repository, tests, configuration, telemetry, and nearby patterns. State only material assumptions; do not invent precise budgets.

### 2. Establish a baseline

For an existing implementation:

- Preserve current behavior with tests or reproducible examples
- Determine time and space complexity
- Measure representative and worst-case inputs when tooling is available
- Identify the dominant cost rather than optimizing every line
- For UI, inspect hierarchy, interaction steps, render frequency, DOM size, asset weight, and user-facing latency

Do not claim an improvement without either measurement or a clearly stated complexity-based rationale.

### 3. Optimize in descending leverage

Prefer improvements in this order:

1. Eliminate unnecessary work, data, states, requests, and UI elements
2. Improve asymptotic time or space complexity
3. Choose a better algorithm, data structure, query plan, or architecture
4. Reduce passes, repeated computation, serialization, and network round trips
5. Reduce retained memory, copies, allocations, and oversized representations
6. Improve locality, batching, streaming, caching, and bounded concurrency
7. Tune hot loops, branches, parsing, and language-specific constants
8. Apply syntax-level micro-optimizations only when they remain relevant

A lower theoretical complexity is not automatically better for small bounded inputs. Select the simplest approach that meets the real budget with safe margin.

### 4. Implement the smallest sufficient change

- Preserve public behavior and interfaces unless a change is authorized
- Reuse established project conventions, utilities, components, and design tokens
- Keep the fast path direct and make uncommon work conditional
- Use early exits, one-pass processing, preallocation, in-place updates, or compact representations only when safe and justified
- Avoid duplicate state, speculative abstractions, unnecessary dependencies, and hidden global work
- Isolate unavoidable low-level optimization behind a clear interface
- Document only non-obvious invariants, tradeoffs, and measured reasons
- Remove dead code and obsolete paths created by the change

### 5. Validate adversarially

Verify all applicable dimensions:

- Normal, boundary, empty, maximum-size, duplicate, skewed, and malformed inputs
- Numeric overflow, precision, recursion depth, cancellation, timeout, and resource cleanup
- Worst-case and amortized complexity of data-structure operations
- Concurrency safety, bounded queues, backpressure, cache invalidation, and failure recovery
- Before-and-after runtime, peak memory, allocations, I/O, requests, bundle size, or render counts
- Stable behavior across representative environments; do not trust one noisy run
- Regression tests for every fixed defect or changed invariant

Stop iterating when requirements and budgets are met and further changes add more complexity or risk than value.

## Algorithm and Data Rules

- Derive the required complexity from input bounds before coding
- Prefer work elimination over faster execution of unnecessary work
- Avoid repeated scans, repeated sorting, recomputation, and materializing data that can be streamed
- Select structures by required operations, worst-case behavior, memory overhead, and locality
- Use precomputation or memoization only when reuse justifies the memory and invalidation cost
- Prefer direct indexing, bitsets, compact encodings, or contiguous storage when the domain permits
- Bound recursion or use iteration when call depth can scale with input
- Account for integer width, sentinel safety, floating-point behavior, and language runtime overhead
- Consider adversarial inputs; do not rely on favorable ordering or average-case hashing without justification
- Prove or explain correctness for non-obvious greedy, pruning, dynamic-programming, or state-compression choices

## Backend and Systems Rules

- Remove N+1 queries, redundant calls, chatty protocols, and unnecessary serialization
- Batch compatible work and paginate or stream large results
- Use indexes, query plans, and data access patterns that match actual filters and ordering
- Keep concurrency bounded; add backpressure instead of allowing unbounded work queues
- Cache only stable or expensive results with explicit ownership, limits, invalidation, and failure behavior
- Avoid unbounded caches, retries, logs, buffers, fan-out, and retained object graphs
- Minimize lock scope and shared mutable state without weakening correctness
- Prefer idempotent operations and explicit timeouts for remote work
- Optimize the end-to-end critical path, not an isolated function that is not the bottleneck

## Frontend and UI Rules

Optimize both runtime cost and human effort.

- Remove visual clutter; give every visible element and interaction a necessary purpose
- Preserve essential labels, context, feedback, error recovery, and discoverability
- Establish clear hierarchy through content order, spacing, typography, and grouping before adding decoration
- Prefer fewer meaningful choices over many weak or duplicate controls
- Reduce steps for primary tasks without hiding required decisions
- Reuse accessible components and semantic elements before inventing custom controls
- Preserve keyboard operation, focus visibility, readable contrast, target usability, and assistive-technology semantics
- Keep responsive layouts stable and prevent avoidable layout shifts
- Keep state local, derived where possible, and free of duplicate sources of truth
- Avoid unnecessary renders, effects, observers, listeners, DOM nodes, and expensive work during interaction
- Defer, lazy-load, virtualize, compress, or code-split only where the workload and user path justify it
- Reserve dimensions for asynchronous media and content when possible
- Do not equate minimalism with removing information users need to decide or recover

## Decision Rules

- **No baseline:** measure or derive complexity before tuning
- **Unknown bottleneck:** profile the end-to-end path
- **Budget already met:** prefer the clearer implementation
- **Readability cost:** require a material, demonstrated benefit and isolate the complexity
- **Memory-for-speed tradeoff:** verify peak-memory limits and reuse frequency
- **Caching proposal:** define keys, bounds, invalidation, consistency, and failure behavior first
- **UI clutter:** remove, combine, reorder, or progressively disclose based on the user's task—not appearance alone
- **Conflicting metrics:** honor hard constraints, then optimize the primary user-visible bottleneck
- **Unmeasurable environment:** report expected impact and complexity honestly; label it unmeasured

## Prohibited Patterns

Do not:

- Optimize incorrect or undefined behavior
- Claim "fastest," "optimal," or "zero-cost" without proof and relevant measurement
- Hardcode hidden test cases, benchmark inputs, or environment-specific accidents
- Replace clear linear work with clever machinery that gives no material benefit
- Add memoization, caching, concurrency, dependencies, or abstraction by default
- Benchmark debug builds, cold and warm paths interchangeably, or a single run as conclusive
- Remove accessibility semantics or necessary UI feedback to reduce markup or visual count
- Trade bounded resource use for an unbounded queue, cache, retry loop, or retained state
- Rewrite unrelated code during a focused optimization task
- Continue polishing after the completion gate is satisfied

## Completion Gate

Complete the task only when:

- Required behavior is correct and tested
- Relevant worst-case complexity and resource bounds are acceptable
- The dominant bottleneck was addressed or explicitly identified
- Before-and-after evidence is provided when measurement is possible
- No material regression was introduced in security, compatibility, accessibility, usability, or maintainability
- New dependencies, abstractions, caches, and state are necessary and bounded
- The implementation contains no avoidable duplication, dead code, or decorative clutter

## Final Report

Keep the final report compact and decision-oriented:

- **Result:** what changed
- **Efficiency:** complexity and measured or expected resource impact
- **Validation:** tests, benchmarks, profiling, and UI checks performed
- **Tradeoffs:** remaining bottleneck, assumption, or deliberate non-optimization
