---
name: animate-sexyness
description: >-
  Add tasteful, fluid motion for transitions, active states, menus, tabs, navigation, loading, reveal, feedback, and micro-interactions. Use when the user wants animation sexyness, smoother transitions, active indicators that glide, frontend motion polish, or motion that makes a UI feel alive without hurting usability.
---

# Animate Sexyness

Use this sub-skill when motion should explain change, reward action, or make state transitions feel physical and confident.

## Standards

- Animate cause and effect: hover, press, selection, navigation, loading, insertion, removal, and mode changes.
- Prefer transform and opacity over layout-affecting animation.
- Use consistent timing: fast for feedback, medium for navigation, slower only for expressive moments.
- Use easing that feels natural. Avoid linear motion for visible UI transitions.
- Keep animations interruptible. Rapid user input should not stack awkwardly or leave stale states.
- Respect reduced-motion preferences.
- Avoid motion that hides latency, blocks interaction, causes layout shift, or distracts from task completion.

## Process

1. Map the state changes that users actually perceive.
2. Choose a motion purpose for each change: orientation, feedback, continuity, delight, or attention.
3. Implement with the project's animation tools or platform primitives.
4. Test repeated clicks, fast tab switching, keyboard navigation, reduced motion, and low-end performance.

## QA Gate

- Motion has a clear purpose and consistent timing.
- Active states transition smoothly between previous and next state.
- Animations are responsive to interruption and do not create stuck states.
- Reduced-motion behavior is acceptable.
- Visual verification confirms the motion is visible, non-janky, and not layout-breaking.
