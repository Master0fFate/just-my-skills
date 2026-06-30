---
name: code-sexyness
description: >-
  Produce competition-grade code craft: beautiful formatting, precise names, strong types, low complexity, efficient algorithms, clear boundaries, maintainable tests, and no AI slop. Use when polishing, refactoring, optimizing, reviewing, or implementing code so it reads and performs like a senior engineer cared deeply.
---

# Code Sexyness

Use this sub-skill when code must feel sharp, intentional, and fast without becoming clever for its own sake.

## Standards

- Make the code easy to scan: small functions, direct control flow, precise names, consistent formatting, and local patterns respected.
- Prefer strong types, parsed boundaries, explicit errors, and narrow interfaces.
- Remove dead imports, unused parameters, duplicated logic, unnecessary comments, speculative abstractions, and decorative patterns.
- Optimize where it matters: choose appropriate data structures, avoid repeated work, handle large inputs, and keep hot paths simple.
- Keep the public contract stable unless the user asked for a breaking change.
- Write tests that lock behavior, edge cases, and regressions instead of only happy paths.

## Process

1. Read the surrounding code and callers before editing.
2. Identify the real quality problem: readability, correctness, performance, API shape, test gap, or maintainability.
3. Make the smallest high-leverage improvement.
4. Run formatters, type checks, tests, static analysis, or targeted examples.
5. Re-read the diff for accidental churn.

## QA Gate

- Code compiles or type-checks where the project supports it.
- Relevant tests pass or the unrun checks are named with a reason.
- No new unused code, dead branches, broad casts, swallowed errors, or needless abstractions were introduced.
- Complexity is lower or justified by real requirements.
- The final diff looks like something a maintainer would keep.
