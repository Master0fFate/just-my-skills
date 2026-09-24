# Skill pack

Eight primary skills. Eight on-demand Sexyness playbooks. One owner per job.
Use the smallest route that produces the requested result; do not stack general
planning, audit, and polish loops on every task.

## Primary skills

| Skill | Use it for | Not its job |
| --- | --- | --- |
| [adaptive-orchestrator](adaptive-orchestrator/SKILL.md) | Coordinate useful independent workers, integrate evidence, verify results | Add a team to simple work or replace the task owner |
| [angelcore-design](angelcore-design/SKILL.md) | The specific hard-edged monochrome style, terminal rules, source-driven dither | Generic dark UI or a mandatory mascot/layout |
| [calibrate-how-we-work](calibrate-how-we-work/SKILL.md) | Explicit interview and approved durable collaboration profile | Ordinary task questions or unsolicited profiling |
| [explain](explain/SKILL.md) | Beginner explanations and useful visual HTML artifacts | Forced insults, mandatory files, or media-generation substitutes |
| [planner-omega](planner-omega/SKILL.md) | Executable plans, brainstorm convergence, prompt specifications | Endless clarification or implementation without permission |
| [retrofit](retrofit/SKILL.md) | A defined old-to-new migration with compatibility and data preservation | General cleanup or purely visual polish |
| [sexyness](sexyness/SKILL.md) | Scoped code, design, interaction, copy, architecture, and measured performance work | Broad readiness audits or a second general planning system |
| [shipshape](shipshape/SKILL.md) | Broad audit/fix/recheck, scored assessment, refinement, process simplification | Silent edits in an audit or unsupported readiness claims |

## Sexyness playbooks

The root router loads only what the task needs. Pi's `disable-model-invocation`
flag hides these from automatic prompt entries while keeping explicit commands and direct
file loading available. Other hosts may apply different discovery rules.

| Playbook | Owns |
| --- | --- |
| [code-sexyness](sexyness/subskills/code-sexyness/SKILL.md) | Implementation, debugging, local refactoring, rapid verified iteration |
| [design-sexyness](sexyness/subskills/design-sexyness/SKILL.md) | Visual layout, hierarchy, typography, responsive design, tokens |
| [smoothness-sexyness](sexyness/subskills/smoothness-sexyness/SKILL.md) | Animation, interruption, async correctness, state continuity |
| [performance-sexyness](sexyness/subskills/performance-sexyness/SKILL.md) | Measured runtime and resource optimization |
| [architecture-sexyness](sexyness/subskills/architecture-sexyness/SKILL.md) | Cross-module ownership, state flow, dependency and boundary contracts |
| [copy-sexyness](sexyness/subskills/copy-sexyness/SKILL.md) | Meaning-preserving human prose and product language |
| [imagegen-sexyness](sexyness/subskills/imagegen-sexyness/SKILL.md) | Requested image concepts/assets through a real host tool |
| [accessibility-sexyness](sexyness/subskills/accessibility-sexyness/SKILL.md) | Explicit accessibility audit/fix and applicable requirements |

## Migration map

Retired names are not forwarding skills. Their useful methods are integrated in
the maintained owner; do not install both the old folder and its replacement.

| Retired name | Maintained owner | What moved |
| --- | --- | --- |
| accelerate | sexyness → code-sexyness | Short build/test/learn increments and honest handoff |
| animate-sexyness | smoothness-sexyness | Purposeful, interruptible motion and tuning rules |
| brainstorm-funnel | planner-omega | Capture, unique idea traceability, evidence, challenge, convergence |
| precision-architect | planner-omega | Prompt specification and handoff without clarification deadlock |
| iterative-refinement | shipshape | Acceptance-driven review, repair, regression, stop rules |
| universal-auditor | shipshape | Optional scored dimensions, material findings, evidence limits |
| elon-five-principles | shipshape | Challenge, delete, simplify, accelerate, automate |

## Installation and maintenance

Copy complete skill folders, including linked references, assets, and scripts.
Keep backups outside any skill-discovery directory. Remove retired installed
folders when adopting this pack, and refresh the host's skill catalog. Editing
this repository does **not** update global skill installations automatically.

Do not copy a linked method into a second competing skill. Keep routing in the
core and detail in references. Preserve licenses and attribution with retained
third-party material. See the [audit record](../docs/skill-audit.md) for coverage,
decisions, evidence, and remaining limits.

From the repository root:

```sh
python -m pip install -r requirements-dev.txt
python scripts/validate_skills.py
python -m unittest discover -s tests -v
```

The validator checks metadata, names, catalog coverage, local link targets, and
JSON syntax. It does not prove model behavior, visual appeal, remote link
availability, or every Markdown fragment anchor. Behavioral cases in `tests/`
are evaluation specifications; run them with the intended host/model before
making model-quality claims.
