---
name: smoothness-sexyness
description: >-
  Improve UI interaction continuity, async feedback, state preservation, motion,
  transitions, and micro-interactions. Use for smoothness, animation polish,
  loading/recovery flows, rapid-input bugs, or a requested motion overhaul.
  Covers both motion and non-animated responsiveness. Not a video-rendering
  workflow or a substitute for measured runtime optimization.
disable-model-invocation: true
---

# Smoothness Sexyness

Make state changes clear and controls responsive. Motion is one tool, not the
objective. This playbook owns the former animation and smoothness workflows.

## Inspect the real flow

Exercise normal use, rapid input, mistakes, slow work, and recovery. Identify
waiting, jumps, stale responses, double submission, lost focus, awkward scroll,
and lost drafts. Preserve scroll, selection, filters, focus, and progress where
users expect continuity. Keep hit areas and control dimensions stable.

For review-only requests, report findings without changing files. Preserve
existing accessibility, reduced-motion behavior, and platform requirements in
all work. A full accessibility audit is a separate scope, not a prerequisite
for preventing regressions.

## Immediate feedback and async correctness

- Show input feedback immediately; debounce expensive work, not typing feedback.
- Distinguish perceived response from completed work. Skeletons and progress
  explain waiting; they must not claim success before it exists.
- Optimistic mutations need reconciliation or rollback. Cancel obsolete work
  or reject stale results; prevent duplicate mutations and preserve server truth.
  Client cancellation does not undo a server mutation: use appropriate idempotency
  and reconciliation before retrying or declaring cancellation complete.
- Preserve drafts and useful partial progress. Keep errors local with a clear
  retry, undo, exit, or next action. Onboarding should reach a useful outcome,
  not a tour with no task value.
- Prefetch only when reuse justifies bandwidth and invalidation. Clean up timers,
  observers, listeners, and subscriptions on cancellation or unmount.

## Motion that serves the task

Map a purpose to each animated change: orientation, feedback, continuity,
attention, or a justified expressive moment. Prefer the existing runtime or
platform primitives over a new dependency.

- Prefer transform and opacity; profile layout, masks, filters, and material
  effects when they are needed. Avoid forced reflow and layout jumps.
- Keep transitions interruptible. New input must not queue obsolete animations
  or leave a stale selected state.
- Start near 100–150 ms for feedback, 150–300 ms for routine changes, and
  300–500 ms for view changes. These are tuning ranges, not compliance rules.
  Tune easing and duration to distance, content, and device performance.
- Use shared elements or FLIP when they preserve spatial continuity. Bound
  staggers, usually exit faster than entering, and avoid repeated reveal effects.
- Operational and reading surfaces must not delay tasks with entrance sequences.
  Expressive entrances belong only where the brief earns them.
- Keep default content visible if animation scripts fail. Release temporary
  `will-change`, stop offscreen loops, and make changed motion honor the user/system
  reduced-motion preference. Test both the normal and reduced paths.

## Verification gate

Test the applicable cases through the real UI:

1. Repeated clicks, fast tab changes, pointer, keyboard, and touch-sized layouts.
2. A slow old request finishing after a newer fast request.
3. Repeat submission, navigation during work, and failure after optimistic success.
4. Focus, scroll, drafts, and active-state continuity after completion or failure.
5. Narrow layouts, slow conditions, reduced motion, and target-device performance.

No stuck state, stale overwrite, accidental duplicate mutation, hidden failure,
or hover/loading jump should remain in the changed flow. Pair visible motion
review with behavior checks; a still screenshot cannot verify interruption.
Report the tested flows and limits. Use performance-sexyness for a measured
runtime bottleneck rather than masking it with a longer animation.
