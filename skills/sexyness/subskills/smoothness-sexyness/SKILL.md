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
