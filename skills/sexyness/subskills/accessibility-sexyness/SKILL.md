---
name: accessibility-sexyness
description: >-
  Make premium work inclusive and robust: keyboard access, screen reader semantics, focus management, contrast, target size, reduced motion, error messaging, and resilient content. Use only when the user explicitly asks for accessibility, a11y, WCAG, screen reader support, keyboard support, contrast, reduced motion, inclusive design, or an accessibility audit/fix. Do not trigger from general sexyness, premium UI, design polish, or animation requests.
---

# Accessibility Sexyness

Use this sub-skill only when accessibility is the user's stated goal or an explicit constraint. Do not treat it as part of the default `sexyness` bundle, and do not combine it with `animate-sexyness` unless the user clearly asks for both.

When a request is primarily about full-motion animation, fluidity, smoothness, or a motion overhaul, leave reduced-motion behavior out of scope unless the user explicitly adds an accessibility requirement.

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
