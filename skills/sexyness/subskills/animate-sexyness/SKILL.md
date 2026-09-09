---
name: animate-sexyness
description: >-
  Add full, fluid motion for transitions, active states, menus, tabs, navigation, loading, reveal, feedback, and micro-interactions. Use when the user wants animation sexyness, a full motion website overhaul, smoother transitions, active indicators that glide, frontend motion polish, or motion that makes a UI feel alive and smooth. Does not imply accessibility-sexyness, reduced-motion constraints, or accessibility QA unless explicitly requested.
---

# Animate Sexyness

Use this sub-skill when motion should explain change, reward action, or make state transitions feel physical and confident. Treat this as the full-motion path: fluidic, smooth, visibly animated, and expressive where the interface benefits from it.

Preserve existing reduced-motion behavior and platform requirements. Do not automatically load `accessibility-sexyness` from this skill. If the user explicitly asks for both animation and accessibility, reconcile the two as a separate, named constraint instead of silently reducing the motion pass.

## Standards

- Animate cause and effect: hover, press, selection, navigation, loading, insertion, removal, and mode changes.
- Prefer transform and opacity over layout-affecting animation.
- Use consistent timing: fast for feedback, medium for navigation, slower only for expressive moments.
- Use easing that feels natural. Avoid linear motion for visible UI transitions.
- Keep animations interruptible. Rapid user input should not stack awkwardly or leave stale states.
- Avoid motion that hides latency, blocks interaction, causes layout shift, or distracts from task completion.

## Process

1. Map the state changes that users actually perceive.
2. Choose a motion purpose for each change: orientation, feedback, continuity, delight, or attention.
3. Implement with the project's animation tools or platform primitives.
4. Test repeated clicks, fast tab switching, pointer/touch interactions, visual continuity, and low-end performance.

## QA Gate

- Motion has a clear purpose and consistent timing.
- Active states transition smoothly between previous and next state.
- Animations are responsive to interruption and do not create stuck states.
- Visual verification confirms the motion is visible, non-janky, and not layout-breaking.

## Motion composition

Separate immediate feedback, continuity, and a focal expressive sequence. Operational and reading surfaces should not delay tasks with page-load choreography. Marketing or experience surfaces can earn a longer focal moment; avoid repeating the same reveal everywhere.

Useful starting ranges are 100-150 ms for feedback, 150-300 ms for routine changes, 300-500 ms for view transitions, and 500-800 ms for an authored entrance. Tune to distance and consequence; cap total stagger and usually exit faster than entering.

Choose shared-element transitions or FLIP for continuity, masks for reveal, and bounded filters/material effects only when the visual intent needs them. Keep default content visible if scripts fail. Release temporary `will-change`, stop offscreen loops, and verify expensive effects on target devices. The existing runtime or platform primitives are preferable to a new dependency for a small effect.
