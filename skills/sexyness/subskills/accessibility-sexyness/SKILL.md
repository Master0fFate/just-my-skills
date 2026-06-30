---
name: accessibility-sexyness
description: >-
  Make premium work inclusive and robust: keyboard access, screen reader semantics, focus management, contrast, target size, reduced motion, error messaging, and resilient content. Use when polishing UI, forms, navigation, modals, dashboards, animations, or any interaction that must work for real people.
---

# Accessibility Sexyness

Use this sub-skill because inaccessible polish is fake polish.

## Standards

- Make every interactive element reachable and operable by keyboard.
- Use semantic elements before ARIA; add ARIA only when semantics need help.
- Keep focus visible, logical, and trapped only inside true modal contexts.
- Meet contrast requirements for text, controls, focus rings, and state indicators.
- Provide names, labels, descriptions, and errors that assistive tech can understand.
- Respect reduced motion, zoom, text resizing, touch targets, and color-independent state.
- Preserve accessibility during loading, empty, disabled, error, and success states.

## Process

1. Identify interactive surfaces and reading order.
2. Check semantics, keyboard flow, focus behavior, labels, contrast, and reduced motion.
3. Fix structural issues before cosmetic issues.
4. Verify manually with keyboard and available automated accessibility tools.

## QA Gate

- Keyboard navigation reaches all controls in a sensible order.
- Focus is visible and never lost after actions.
- Controls have accessible names and states.
- Color is not the only signal for status or selection.
- Contrast and reduced-motion behavior are acceptable or clearly reported if unverified.
