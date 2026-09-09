---
name: performance-sexyness
description: >-
  Make software feel fast and efficient: lower latency, reduce bundle or payload size, improve render speed, remove repeated work, optimize memory, tighten queries, and verify measurable performance. Use for profiling and constraint-driven optimization of algorithms, backend systems, frontend rendering, latency, memory, I/O, bundles, queries, or throughput.
---

# Performance Sexyness

Use this sub-skill when the premium feel depends on speed, efficiency, or scale.

## Standards

- Measure or bound before optimizing when possible.
- Fix algorithmic waste before micro-optimizing.
- Remove repeated work, unnecessary renders, excessive allocations, unbounded loops, chatty network calls, and oversized payloads.
- Prefer lazy loading, caching, memoization, batching, pagination, streaming, or indexing only when they match the bottleneck.
- Keep performance fixes readable and tested.
- Do not trade correctness, accessibility, or security for speed.

## Process

1. Identify the performance surface: startup, render, interaction, network, database, memory, CPU, build, or test runtime.
2. Capture a baseline using available tools, logs, timings, profiler output, or representative examples.
3. Apply the smallest fix that attacks the bottleneck.
4. Compare after the change.
5. Add regression coverage or guardrails when the bottleneck can return.

## QA Gate

- A relevant performance claim is backed by a measurement, profiler signal, benchmark, or clear complexity argument.
- The change improves or preserves correctness.
- The fix does not add brittle caching, stale data, memory leaks, or unreadable cleverness.
- Slow-path and large-input behavior are considered.
- Remaining performance uncertainty is reported.

## Optimization contract

Read [references/optimization-contract.md](references/optimization-contract.md) for substantial optimization. Establish input/resource bounds, a representative baseline, and protected metrics before choosing a fix. Bound concurrency and retained state, define cache invalidation, verify adversarial inputs, and compare equivalent workloads. Stop when the real budget is met; complexity that buys no material benefit is a regression.
