---
name: sexyness
description: >-
  Orchestrate a premium polish pass across code, design, animation, smoothness, performance, copy, architecture, and opt-in accessibility. Use when the user asks for sexyness, sexyfication, sexification, make it sexy, make it premium, remove AI slop, make code/design/UI/UX feel elite, smooth, beautiful, high-quality, delightful, optimized, or competition-grade. Loads nested sexyness sub-skills from subskills/*/SKILL.md as needed and applies QA gates before declaring work done. Accessibility is only selected when explicitly requested or when the active task is specifically an accessibility audit/fix.
---

# Sexyness

Use this skill to turn a merely working artifact into something that feels deliberately crafted. "Sexyness" means high taste plus proof: clean structure, beautiful execution, fluid interaction, strong performance, sharp language, and verification on the real surface.

## Router

Read only the nested sub-skills needed for the task, then follow them as local playbooks.

- `subskills/code-sexyness/SKILL.md`: code quality, formatting, naming, types, complexity, algorithms, maintainability, tests.
- `subskills/design-sexyness/SKILL.md`: visual design, composition, hierarchy, spacing, color, typography, design-system fit.
- `subskills/animate-sexyness/SKILL.md`: full-motion website or UI overhaul, transitions, micro-interactions, state changes, timing, easing, motion intent.
- `subskills/smoothness-sexyness/SKILL.md`: perceived fluidity, input feel, UX continuity, latency masking, interaction flow.
- `subskills/performance-sexyness/SKILL.md`: runtime speed, bundle weight, rendering, memory, loading, throughput.
- `subskills/accessibility-sexyness/SKILL.md`: opt-in accessibility audit/fix for keyboard, screen reader, contrast, focus, semantics, and reduced-motion constraints.
- `subskills/copy-sexyness/SKILL.md`: UX writing, labels, errors, empty states, product voice, removal of AI-sounding prose.
- `subskills/architecture-sexyness/SKILL.md`: system shape, boundaries, data flow, extensibility, resilience, dependency hygiene.

When the user says only "make it sexy" or "sexify this", inspect the artifact first, then select the smallest set of sub-skills that covers the visible problem. For UI work, usually combine design, animate, smoothness, performance, and copy. For code-only work, usually combine code, architecture, performance, and tests.

Do not select `accessibility-sexyness` as part of the default UI polish bundle. It is explicit opt-in only: use it when the user asks for accessibility, a11y, WCAG, screen reader support, keyboard support, contrast, reduced motion, inclusive design, or an accessibility audit/fix. Do not combine it with `animate-sexyness` unless the user explicitly asks for both motion and accessibility constraints.

## Operating Loop

1. Define the target: identify what "premium" means for this artifact, audience, and domain.
2. Inspect reality: read the current files, behavior, screenshots, tests, logs, or examples before changing anything.
3. Pick sub-skills: load the relevant nested SKILL.md files and follow their gates.
4. Make scoped improvements: polish the artifact without changing the user's core intent.
5. Verify directly: run tests, builds, linters, previews, screenshots, benchmarks, or manual QA as appropriate for the selected sub-skills.
6. Report the proof: summarize what improved, what was verified, and any remaining risk.

## Global Taste Rules

- Prefer craft over decoration. Every flourish must improve clarity, feel, speed, trust, or delight.
- Remove AI slop: filler text, generic layouts, bloated abstractions, redundant logic, inconsistent spacing, vague labels, dead states, and performative comments.
- Preserve the product's purpose. Do not make operational tools look like landing pages or serious workflows feel like toys.
- Keep the artifact usable under stress: long text, small screens, slow devices, loading states, errors, and repeated use.
- Choose strong defaults, then verify them.

## Global QA Gate

Do not call sexyness done until all relevant checks pass or are honestly reported:

- The selected sub-skill QA gates are satisfied.
- The changed artifact is exercised through its real surface.
- No obvious regression exists in behavior, responsiveness, performance, or maintainability.
- The result still matches the user's original goal.
- Remaining uncertainty is named instead of hidden.
