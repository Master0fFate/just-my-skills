---
name: sexyness
description: >-
  Build or polish code, UI design, interaction, performance, architecture, or
  prose. Use for sexyness, premium design, code craft, humanizing text, animation,
  smoothness, measured optimization, rapid build-test iteration (ACCELERATE),
  requested image concepts, or accessibility/a11y/WCAG audit and fixes.
  Select only the needed local playbooks. Not a broad project-readiness audit,
  migration workflow, planning interview, video renderer, or CLI slop scanner.
---

# Sexyness

Improve the artifact, not the size of the process. Inspect the real surface,
choose the smallest relevant playbook, make scoped changes, and verify them.
A single-domain task needs one playbook, not the whole bundle.

## Route once

Resolve paths from this directory. Nested playbooks are loaded on demand; their
`disable-model-invocation` flag hides duplicate automatic prompt entries in Pi;
explicit commands and file loading remain available.

| User need | Read |
| --- | --- |
| Implementation, bug fix, refactor, code review, ACCELERATE | [code-sexyness](subskills/code-sexyness/SKILL.md) |
| Layout, visual hierarchy, typography, color, responsive design, critique | [design-sexyness](subskills/design-sexyness/SKILL.md) |
| Requested image concepts or bitmap assets | [imagegen-sexyness](subskills/imagegen-sexyness/SKILL.md) |
| Animation, transitions, input feel, async continuity, loading and recovery | [smoothness-sexyness](subskills/smoothness-sexyness/SKILL.md) |
| Profiling, latency, memory, queries, bundles, resource limits | [performance-sexyness](subskills/performance-sexyness/SKILL.md) |
| System boundaries, ownership, state flow, contracts, layered documents/workflows | [architecture-sexyness](subskills/architecture-sexyness/SKILL.md) |
| Labels, errors, UX writing, humanizing prose, voice-preserving edits | [copy-sexyness](subskills/copy-sexyness/SKILL.md) |
| Explicit accessibility audit/fix or applicable accessibility requirement | [accessibility-sexyness](subskills/accessibility-sexyness/SKILL.md) |

For “make it sexy,” inspect first. Start with design for a visible UI defect or
code for an implementation defect. Add another playbook only for a distinct
problem found in scope. Broad code simplification uses code and, where needed,
architecture; do not confuse fewer lines with faster runtime.

## Working contract

1. Name the intended outcome, audience, protected behavior, scope, and checks.
2. Inspect current files, behavior, design evidence, and existing user changes.
3. Load the selected playbook and use its concrete domain checks.
4. Improve the real artifact. Preserve purpose, factual content, public contracts,
   and established conventions unless their replacement is requested.
5. Exercise the changed surface: tests, real interactions, renders, source checks,
   or equivalent measurements. Use [quality-loop](references/quality-loop.md)
   when a substantial pass needs explicit acceptance and stopping rules.
6. Report the result, changed paths, actual checks, and unresolved limits.

Critique, review, and audit requests remain read-only unless fixes are requested.
Do not publish, create PRs, install tooling, or generate paid assets merely
because a playbook suggests them. Host instructions and user authorization govern.

## Non-regression rules

- Preserve accessibility, reduced motion, focus, semantics, and platform rules.
  An optional full accessibility audit does not make basic preservation optional.
- Keep loading, empty, error, long-content, narrow-screen, and repeated-use states
  functional. Decoration must not hide missing behavior.
- Use existing assets and tools first. Image generation is optional; a direct
  image request follows the host image-tool instructions without extra setup.
- Never invent metrics, testimonials, users, test passes, screenshots, or speed
  gains. Report blocked checks instead of claiming perfection.
- Stop when material acceptance criteria pass. Fix demonstrated defects, not
  everything a larger skill catalog could possibly suggest.

See [the capability map](references/consolidation.md) for migrated playbooks.
Planning belongs to planner-omega; broad review/fix work to shipshape; migration
to retrofit; a specific monochrome style to angelcore-design. Use installed
specialist tools for explicit CLI or media tasks rather than pretending this
bundle contains them.
