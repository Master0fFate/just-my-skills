---
name: accessibility-sexyness
description: >-
  Make premium work inclusive and robust: keyboard access, screen reader semantics, focus management, contrast, target size, reduced motion, error messaging, and resilient content. Use only when the user explicitly asks for accessibility, a11y, WCAG, screen reader support, keyboard support, contrast, reduced motion, inclusive design, or an accessibility audit/fix. Do not trigger from general sexyness, premium UI, design polish, or animation requests.
disable-model-invocation: true
---

# Accessibility Sexyness

Use this sub-skill for an explicit accessibility audit, fix, or applicable accessibility requirement. Do not expand a general polish request into a full audit. All UI work must still preserve existing accessibility and platform requirements; opt-in audit scope is not permission to introduce a regression. Pair with smoothness-sexyness when the requested change covers motion or interaction.

Audit-only requests return evidence and recommendations without edits. Fix requests permit scoped changes. Name the supported platforms and target standard before judging compliance.

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

## Verification depth

For an explicit audit, identify the target standard and supported platform, then pair automated findings with manual interaction checks. Verify modal entry/return focus, dynamic errors and status announcements, 200% text/zoom behavior, relevant forced-colors/high-contrast settings, and non-color state cues. Use platform touch-target conventions (for example 44 pt on iOS and 48 dp on Android); cite the actual WCAG criterion and its exceptions for web findings rather than treating a design preference as a compliance threshold.

Do not infer full conformance from an automated scan. Record the affected control, reproduced failure, user impact, fix, and checks that remain unverified.
