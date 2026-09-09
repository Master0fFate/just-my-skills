# Optimization under constraints

Use for algorithm, backend, frontend, or resource optimization. Improve the primary metric within hard constraints; do not silently exchange memory, correctness, usability, or maintainability for speed.

## Contract and baseline

Identify behavior, inputs and outputs, invariants, failure modes, input bounds and distribution, concurrency, runtime and platform, compatibility, resource budgets, primary metric, and metrics that must not regress. Infer from code, tests, configuration, and telemetry; do not invent precise budgets.

Reproduce current behavior. Profile the end-to-end critical path, derive time and space complexity, and measure representative and relevant worst cases. For UI, inspect interaction steps, render frequency, DOM size, assets, and user-visible latency. A shorter function or smaller markup is not itself evidence of improvement.

## Order of work

1. Eliminate unnecessary work, data, requests, and duplicate state.
2. Improve algorithms, data structures, query plans, and asymptotic costs.
3. Reduce passes, serialization, copies, allocations, and network round trips.
4. Apply locality, batching, streaming, indexing, caching, or bounded concurrency where measured workload supports them.
5. Tune hot loops and constants only when still material.

For bounded small inputs, a clear linear implementation may beat a more complex theoretical improvement. Stop tuning when the real budget is met with margin.

## Resource and correctness checks

- Algorithms: empty, boundary, duplicate, skewed, maximum-size, and malformed inputs; integer overflow, precision, recursion depth, sentinel safety, and adversarial ordering. Explain non-obvious greedy, pruning, or compressed-state correctness.
- Structures: operation costs, worst-case and amortized behavior, memory overhead, locality, and invalidation. Justify hashing assumptions and precomputation by the actual domain.
- Backend: inspect N+1 queries and query plans; paginate or stream large results; bound queues, retries, fan-out, buffers, and caches. Define timeouts, backpressure, cancellation, cleanup, and remote-operation idempotency where relevant.
- Caches: define ownership, keys, consistency, capacity or eviction, invalidation, failure behavior, and expected reuse before adding one.
- Concurrency: preserve ordering and consistency, minimize lock scope safely, and test failure recovery. More parallelism can worsen the bottleneck.
- Frontend: derive state instead of duplicating it; remove unnecessary effects, observers, listeners, and repeated rendering. Reserve async media dimensions; justify lazy loading, virtualization, and code splitting against the user path. Preserve labels, recovery actions, focus behavior, and existing accessibility.

## Evidence

Compare equivalent builds, devices, data, and load. Distinguish cold startup from warm steady state. Repeat noisy measurements enough to assess variation; include tail latency or peak memory when those are the constraint. Report workload, metric, before/after result, and material tradeoffs. If execution is unavailable, label expected gains as unmeasured and give the complexity argument.

Recheck behavior and changed invariants with meaningful regression coverage. Never optimize undefined behavior, hardcode benchmarks, or claim fastest/optimal/zero-cost without a relevant proof. Isolate necessary low-level complexity behind a narrow interface.
