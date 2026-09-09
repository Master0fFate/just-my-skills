---
name: smoothness-sexyness
description: >-
  Push interaction smoothness beyond basic animation: fluid input feel, continuity, latency masking, scroll quality, state preservation, ergonomic flows, and UI that feels effortless. Use when the user wants overdrive smoothness, buttery UX, silky interactions, or an interface that feels premium under real use.
---

# Smoothness Sexyness

Use this sub-skill when the target is not just animated, but frictionless.

## Standards

- Preserve context across transitions: scroll position, selection, focus, filters, drafts, and user progress.
- Make feedback immediate even when work is async.
- Hide unavoidable latency with skeletons, optimistic states, progress, prefetching, or staged rendering when appropriate.
- Prevent jank: avoid forced reflow, heavy synchronous work, layout shift, scroll traps, and expensive re-renders.
- Make controls feel stable: fixed dimensions, predictable hit areas, no hover-induced layout movement.
- Make flows reversible and forgiving: undo, clear exits, preserved state, and no surprise resets.

## Process

1. Exercise the workflow like a real user, including rapid input and mistakes.
2. Find friction points: waiting, jumping, snapping, losing state, double clicks, focus loss, awkward scroll, or delayed feedback.
3. Add continuity and immediate response before adding visual decoration.
4. Verify on keyboard, pointer, touch-sized viewport, and slow conditions when possible.

## QA Gate

- Common interactions give immediate feedback.
- No visible layout shift occurs from hover, loading, or active states.
- Rapid repeated actions do not break UI state.
- Focus, scroll, and user-entered state are preserved where users expect them.
- The workflow feels coherent from start to finish, not just pretty in screenshots.

## Async and recovery

Distinguish perceived response from completed work. Optimistic changes need rollback or reconciliation; cancel obsolete work or ignore stale responses, prevent duplicate mutations, and clean up timers/listeners/subscriptions. Debounce expensive search requests without delaying input feedback. Prefetch only when likely reuse justifies bandwidth and invalidation costs.

Test a slow request followed by a newer fast request, repeat submission, navigation during work, and failure after optimistic success. Preserve drafts and useful partial progress, show local recovery, and keep server-authoritative state consistent. First-use flows should lead to a useful outcome with clear next actions and resumable progress where appropriate.
