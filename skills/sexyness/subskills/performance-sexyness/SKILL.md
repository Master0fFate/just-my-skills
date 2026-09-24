---
name: performance-sexyness
description: >-
  Measure and improve runtime speed, memory, loading, throughput, query cost,
  bundle size, or build time. Use for profiling, resource budgets, and measured
  optimization. Code readability belongs to code-sexyness; system boundaries
  belong to architecture-sexyness. Do not infer a repository-wide rewrite from
  a local speed request.
disable-model-invocation: true
---

# Performance Sexyness

Remove work the system does not need. Prove the gain on a representative workload.
Fewer lines, files, or branches do not by themselves prove better performance.

## Contract and baseline

1. Identify the slow operation, input sizes, target environment, and metric:
   latency (including tail latency), throughput, memory, bytes, queries, or cost.
2. Record the baseline, test method, and protected behavior. Include correctness,
   data integrity, security, accessibility, and resource limits.
3. Locate the bottleneck with available profiles, traces, query plans, or focused
   measurements. State uncertainty if only code inspection is possible.
4. For substantial work, read [the optimization contract](references/optimization-contract.md).

## Optimize in order

- Delete unnecessary work and duplicate operations first.
- Fix algorithms, data structures, query shape, I/O, and allocation pressure.
- Use batching, indexes, lazy work, streaming, or bounded concurrency only when
  they address the measured constraint.
- Cache only with a key, invalidation policy, capacity limit, and failure behavior.
- Micro-optimize only a remaining material hot path. Readability is a protected
  property, not a prize to trade for an unmeasured gain.

Keep a local request local. A broad optimization request permits a broader
investigation, not unrelated rewrites. If structural duplication causes the cost,
merge equivalent implementations and update callers. Use code or architecture
playbooks only when those changes need their specific checks.

## Keep structural work scoped

For a purely structural simplification campaign, use code-sexyness and, when
needed, architecture-sexyness. This playbook owns the runtime/resource target.
Within that target, remove equivalent repeated work and dead paths after checking
consumers. Do not split files or replace conditions merely to reduce a count.

Report structural changes separately from measured speed. Never impose a
line-count quota or remove tests, licenses, errors, observability, compatibility,
or useful comments to meet one. Commits, pushes, and pull requests require
explicit authorization.

## Verification and stopping

Compare before and after with the same workload, environment, warm-up, and
measurement method. Use repeated samples when noise could change the conclusion.
Check normal, large, adversarial, slow, and failure cases relevant to the change.
Run correctness and regression tests as well as the benchmark. Inspect memory
and contention when speed is gained through caching or concurrency.

Stop when the agreed budget is met or remaining work has no supported value.
If the target cannot be met safely, give the measured limit and next useful
experiment. Do not expand the scope or relax the metric to manufacture success.

Report: **baseline → result**, method, changed paths, checks, tradeoffs, and
unverified limits. A complexity argument is not a measured runtime improvement.
Review-only requests receive findings, not edits.
