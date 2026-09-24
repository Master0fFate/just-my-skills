# Installation

Copy the skill directory to a skill location supported by your host. Keep `SKILL.md` and its support files together. Installation does not grant delegation tools, model controls, or permissions.

## Hosts that use `.agents`

Where supported, use `.agents/skills/adaptive-orchestrator/SKILL.md`. For project-level routing, merge only the relevant supplied `AGENTS.md` guidance into the project's existing instructions; do not overwrite them. Check the host's current discovery rules. The description can route implicitly only when the host supports that behavior.

## Hosts that use `.claude`

Where supported, use `.claude/skills/adaptive-orchestrator/SKILL.md`. The supplied `CLAUDE.md` provides equivalent optional project guidance. Merge it without replacing existing rules. Worker/model setup belongs to supported host configuration, not this skill.

## Other hosts

Load `SKILL.md` using the host's documented skill mechanism. Map briefing, waiting, result collection, permission control, and workspace ownership to real capabilities. No particular tool name is required or assumed. Without delegation, use the serial fallback.

## Runtime choices

- Use sufficient parent and worker capability for the actual task. Select a model or effort level only if the host exposes that choice.
- Host capacity, permissions, cost limits, resource ownership, and useful independent outcomes govern staffing. There is no skill-imposed total-worker cap or fixed depth.
- Further delegation needs parent approval and host permission. Keep ownership and final integration with the parent.
- Start with least privilege. Grant writes and consequential actions only within authorized scope.
- Reuse an existing plan. `planner-omega` is an optional plan/specification producer, not a required setup step or a delegation tool.

## Check the installation

Use `evals/trigger-evals.json` for routing cases and `evals/behavior-evals.md` for observable behavior. A trigger means assess coordination value, not automatically create workers. These fixtures are evaluation inputs, not proof of a passing live run.
