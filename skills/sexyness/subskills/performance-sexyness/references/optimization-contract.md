# Optimization under constraints

Use for algorithm, backend, frontend, resource, or shape optimization. Improve the primary metric within hard constraints; do not silently exchange memory, correctness, usability, or maintainability for speed. Do not silently exchange a "faster" inner loop for more code, more branches, or another helper that already exists.

## Contract and baseline

Identify behavior, inputs and outputs, invariants, failure modes, input bounds and distribution, concurrency, runtime and platform, compatibility, resource budgets, primary metric, and metrics that must not regress. Infer from code, tests, configuration, and telemetry; do not invent precise budgets. Use documented budgets when available; label inferred targets and confirm them when the choice changes scope or cost.

Reproduce current behavior. Profile the end-to-end critical path, derive time and space complexity, and measure representative and relevant worst cases. For UI, inspect interaction steps, render frequency, DOM size, assets, and user-visible latency.

For structural work, record eliminated duplication, clearer ownership, and preserved contracts. Optional line counts exclude generated files, vendor code, lockfiles, and pure fixtures. Counts are context, not a quality quota. A shorter file is not evidence of runtime improvement. Distinguish measured gains from an unmeasured complexity argument.

## Order of work

1. Eliminate unnecessary work, data, requests, duplicate state, dead code, and rename-only wrappers.
2. Unify the remaining ways to do a thing. Collapse if-if-if-else routing into data, early returns, exhaustive types, or one dispatcher. Break god files along ownership, not vanity.
3. Improve algorithms, data structures, query plans, and asymptotic costs.
4. Reduce passes, serialization, copies, allocations, and network round trips.
5. Apply locality, batching, streaming, indexing, caching, or bounded concurrency where measured workload supports them.
6. Tune hot loops and constants only when still material.

For bounded small inputs, a clear linear implementation may beat a more complex theoretical improvement. Stop when acceptance criteria pass or further work lacks evidence of useful value. Report a blocked budget honestly; do not continue a cleanup solely to reduce counts.

## Resource and correctness checks

- Algorithms: empty, boundary, duplicate, skewed, maximum-size, and malformed inputs; integer overflow, precision, recursion depth, sentinel safety, and adversarial ordering. Explain non-obvious greedy, pruning, or compressed-state correctness.
- Structures: operation costs, worst-case and amortized behavior, memory overhead, locality, and invalidation. Justify hashing assumptions and precomputation by the actual domain.
- Backend: inspect N+1 queries and query plans; paginate or stream large results; bound queues, retries, fan-out, buffers, and caches. Define timeouts, backpressure, cancellation, cleanup, and remote-operation idempotency where relevant.
- Caches: define ownership, keys, consistency, capacity or eviction, invalidation, failure behavior, and expected reuse before adding one.
- Concurrency: preserve ordering and consistency, minimize lock scope safely, and test failure recovery. More parallelism can worsen the bottleneck.
- Frontend: derive state instead of duplicating it; remove unnecessary effects, observers, listeners, and repeated rendering. Reserve async media dimensions; justify lazy loading, virtualization, and code splitting against the user path. Preserve labels, recovery actions, focus behavior, and existing accessibility.
- Shape: every unified helper must have one ownership home. Every split file must have a reason-to-change that is not "it was long." Every replaced if-ladder must get shorter or obviously easier to extend. Interpretability of wiring must go up: a stranger can follow the call graph without a guided tour.

## Evidence

Compare equivalent builds, devices, data, and load. Distinguish cold startup from warm steady state. Repeat noisy measurements enough to assess variation; include tail latency or peak memory when those are the constraint. Report workload, metric, before/after result, and material tradeoffs. If execution is unavailable, label expected gains as unmeasured and give the complexity argument.

For a campaign, also report the structural changes and their checks. Complete authorized local work rather than returning only suggestions. Create commits, pushes, or pull requests only when the user authorizes those actions.

Recheck behavior and changed invariants with meaningful regression coverage. Never optimize undefined behavior, hardcode benchmarks, or claim fastest/optimal/zero-cost without a relevant proof. Isolate necessary low-level complexity behind a narrow interface. Unreadable cleverness is a regression even if the microbenchmark moved.
