# Optimization under constraints

Use for algorithm, backend, frontend, resource, or shape optimization. Improve the primary metric within hard constraints; do not silently exchange memory, correctness, usability, or maintainability for speed. Do not silently exchange a "faster" inner loop for more code, more branches, or another helper that already exists.

You are here to starve waste, not to decorate it with caches.

## Contract and baseline

Identify behavior, inputs and outputs, invariants, failure modes, input bounds and distribution, concurrency, runtime and platform, compatibility, resource budgets, primary metric, and metrics that must not regress. Infer from code, tests, configuration, and telemetry; do not invent precise budgets. Do not wait for the user to name a budget the tree already implies.

Reproduce current behavior. Profile the end-to-end critical path, derive time and space complexity, and measure representative and relevant worst cases. For UI, inspect interaction steps, render frequency, DOM size, assets, and user-visible latency.

Count shape before claiming a simplification win: in-scope LOC (excluding generated, vendored, lockfiles, pure fixtures), god files, duplicate helpers, and nested routing depth. A shorter function or smaller markup is not itself evidence of *runtime* improvement. A 30% LOC drop on a campaign is evidence of shape improvement only if tests still lock behavior and the deleted lines were not load-bearing. Never claim faster because the file got shorter unless you measured it or have a complexity argument (fewer hot-path branches, less allocation, less I/O).

## Order of work

1. Eliminate unnecessary work, data, requests, duplicate state, dead code, and rename-only wrappers.
2. Unify the remaining ways to do a thing. Collapse if-if-if-else routing into data, early returns, exhaustive types, or one dispatcher. Break god files along ownership, not vanity.
3. Improve algorithms, data structures, query plans, and asymptotic costs.
4. Reduce passes, serialization, copies, allocations, and network round trips.
5. Apply locality, batching, streaming, indexing, caching, or bounded concurrency where measured workload supports them.
6. Tune hot loops and constants only when still material.

For bounded small inputs, a clear linear implementation may beat a more complex theoretical improvement. Stop *runtime* tuning when the real budget is met with margin. Do not stop a simplification campaign while god files, duplicate helpers, unreachable branches, or nested routing still dominate the in-scope tree.

## Resource and correctness checks

- Algorithms: empty, boundary, duplicate, skewed, maximum-size, and malformed inputs; integer overflow, precision, recursion depth, sentinel safety, and adversarial ordering. Explain non-obvious greedy, pruning, or compressed-state correctness.
- Structures: operation costs, worst-case and amortized behavior, memory overhead, locality, and invalidation. Justify hashing assumptions and precomputation by the actual domain.
- Backend: inspect N+1 queries and query plans; paginate or stream large results; bound queues, retries, fan-out, buffers, and caches. Define timeouts, backpressure, cancellation, cleanup, and remote-operation idempotency where relevant.
- Caches: define ownership, keys, consistency, capacity or eviction, invalidation, failure behavior, and expected reuse before adding one. A cache that exists to avoid deleting duplicate work is a confession.
- Concurrency: preserve ordering and consistency, minimize lock scope safely, and test failure recovery. More parallelism can worsen the bottleneck.
- Frontend: derive state instead of duplicating it; remove unnecessary effects, observers, listeners, and repeated rendering. Reserve async media dimensions; justify lazy loading, virtualization, and code splitting against the user path. Preserve labels, recovery actions, focus behavior, and existing accessibility.
- Shape: every unified helper must have one ownership home. Every split file must have a reason-to-change that is not "it was long." Every replaced if-ladder must get shorter or obviously easier to extend. Interpretability of wiring must go up: a stranger can follow the call graph without a guided tour.

## Evidence

Compare equivalent builds, devices, data, and load. Distinguish cold startup from warm steady state. Repeat noisy measurements enough to assess variation; include tail latency or peak memory when those are the constraint. Report workload, metric, before/after result, and material tradeoffs. If execution is unavailable, label expected gains as unmeasured and give the complexity argument.

For a campaign, also report before/after LOC, files split, helpers unified, and routing collapsed. Open the PR or set of PRs with that evidence. Do not return a plan of optional cleanups.

Recheck behavior and changed invariants with meaningful regression coverage. Never optimize undefined behavior, hardcode benchmarks, or claim fastest/optimal/zero-cost without a relevant proof. Isolate necessary low-level complexity behind a narrow interface. Unreadable cleverness is a regression even if the microbenchmark moved.
