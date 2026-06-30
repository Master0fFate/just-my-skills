---
name: retrofit
description: Modernize old systems, code, designs, docs, workflows, or prompts into newer versions while preserving intent, behavior, compatibility, and user trust. Use when the user asks to retrofit, modernize, migrate, upgrade, convert old to new, refresh legacy work, replace deprecated patterns, move to a newer framework/API/version, redesign an older interface, or bring an inherited artifact up to current standards without a careless rewrite.
---

# Retrofit

## Overview

Use this skill to turn an older artifact into a modern one without losing the reasons it worked. Treat retrofit work as research-led preservation plus targeted replacement: understand the old contract, identify the new target, bridge the gap, and verify real behavior.

## Core Principle

Preserve value before changing form. A retrofit is successful only when the new version keeps the old version's essential behavior, data, constraints, audience fit, and operational expectations while removing obsolete, fragile, or limiting choices.

## Retrofit Workflow

### 1. Establish the Old Contract

Research the existing artifact before changing it.

- Identify what the artifact is: codebase, component, API, prompt, document, workflow, design, data model, or mixed system.
- Inventory the current interfaces, inputs, outputs, dependencies, consumers, side effects, data formats, state, error cases, and implicit assumptions.
- Find what must not change: user-facing behavior, public APIs, schema compatibility, accessibility, performance, security posture, business rules, saved data, or visual identity.
- Capture evidence from source files, tests, docs, screenshots, logs, examples, user reports, release notes, or production behavior.
- Mark unknowns clearly. Infer only when evidence is unavailable and the assumption is low risk.

### 2. Define the New Target

Research the target state before choosing an implementation.

- Determine whether "new" means a specific version, current best practice, newer visual language, better architecture, replacement platform, stricter safety standard, or cleaner user experience.
- For libraries, APIs, frameworks, tools, regulations, security practices, or platform behavior, fetch current primary documentation before relying on memory.
- Read migration guides, deprecation notes, changelogs, compatibility tables, and known breaking changes when upgrading versions.
- Prefer the smallest target that meaningfully solves the user's goal. Avoid upgrading unrelated layers just because they are old.
- Define success in observable terms: what should compile, render, pass, load, import, export, preserve, or improve.

### 3. Choose a Retrofit Strategy

Pick the least disruptive path that reaches the target.

- **Adapter first**: add wrappers, compatibility layers, feature flags, or translation boundaries when consumers cannot migrate at once.
- **Incremental replacement**: upgrade one layer, module, route, screen, or workflow at a time when blast radius is high.
- **Codemod or mechanical pass**: use deterministic search, AST tools, formatters, or official migration commands when the change pattern is repetitive.
- **Parallel implementation**: build the new path beside the old one when direct mutation risks data loss or downtime.
- **Clean rewrite only**: rewrite from scratch only when the old artifact is small, behavior is fully understood, tests/examples lock the contract, and compatibility risk is lower than patching.

Record the chosen strategy briefly before editing if the work is substantial.

### 4. Lock Behavior Before Changing

Create or identify verification before the retrofit when feasible.

- Prefer existing tests, golden files, snapshots, fixtures, CLI examples, screenshots, API responses, sample documents, or manual QA flows.
- Add focused regression coverage for behavior likely to break.
- For UI work, capture before/after screenshots and verify responsive, interactive, loading, empty, error, and long-content states.
- For data migrations, test representative legacy inputs, nulls, malformed records, duplicates, timezone boundaries, encoding, and rollback paths.
- For docs or prompts, compare old intent against new output on representative tasks.

### 5. Modernize Carefully

Make changes in dependency order.

- Preserve public names and formats unless the user asked for a breaking change or the migration requires one.
- Replace deprecated APIs with documented modern equivalents.
- Remove obsolete compatibility code only after confirming no current consumer depends on it.
- Keep migration notes close to the changed code only when future maintainers need them; avoid narrative comments.
- Update tests, docs, examples, configs, lockfiles, schemas, and generated artifacts that are genuinely part of the retrofit.
- Keep unrelated cleanup out of scope unless it blocks the upgrade or reduces real retrofit risk.

### 6. Verify the New Artifact

Drive the result through its matching surface.

- Run the strongest local checks available: tests, type checks, linters, builds, migrations, formatters, smoke tests, visual QA, sample imports/exports, or document rendering.
- Exercise the old-to-new path, not only the new happy path.
- Check compatibility claims against evidence.
- Compare before/after behavior where preservation matters.
- Report any unverified surface, known incompatibility, migration step, or manual action needed.

## Research Checklist

Use the checklist that matches the artifact:

- **Code/frameworks**: current official docs, migration guides, changelogs, deprecations, dependency graph, tests, public APIs, runtime behavior.
- **UI/design**: current product goals, old interaction contract, accessibility, responsive layouts, design-system tokens, content density, visual hierarchy, existing brand cues.
- **Data/schema**: legacy data samples, migration scripts, validation rules, indexes, constraints, encoding, idempotency, rollback, audit requirements.
- **Docs/processes**: audience, stale claims, current policy/tooling, examples, owner workflows, handoff points, failure handling.
- **Prompts/skills/agents**: trigger conditions, boundaries, tool availability, progressive disclosure, validation loops, failure modes, concise instructions.

## Decision Rules

- Prefer compatibility over novelty when users rely on the old behavior.
- Prefer official migration paths over improvised conversions.
- Prefer structured parsers, codemods, schema tools, and AST-aware changes over brittle text replacement for code or data.
- Prefer measurable improvements over aesthetic "modernization" that only changes surface style.
- Ask one narrow question only when the old contract or new target cannot be inferred safely.
- Stop expanding scope when the retrofit target is achieved and verified.

## Anti-Patterns

Avoid these during retrofit work:

- Big-bang rewrites without contract evidence.
- Claiming support for the latest version without checking current documentation.
- Deleting legacy paths before proving they are unused.
- Weakening tests, schemas, validation, or accessibility to make the new version pass.
- Mixing unrelated refactors into migration work.
- Translating old design literally when the user's goal is modern usability.
- Modernizing style while preserving old security, performance, or reliability flaws.

## Output Protocol

When finishing retrofit work, report:

- What was modernized and what compatibility was preserved.
- The target version, pattern, standard, or design direction used.
- Verification performed, including old-to-new behavior checks.
- Any remaining migration risk, manual follow-up, or intentional breaking change.
