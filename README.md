# just-my-skills

A personalized skill and agent collection for daily agent workflows. [regular updates]

## Layout

- `skills/` contains reusable LLM skills. Each skill lives in its own folder with a `SKILL.md`.
- [Skill catalog](skills/README.md): eight primary skills, eight on-demand playbooks, and migration routes.
- [Audit record](docs/skill-audit.md): every original skill, consolidation decisions, checks, and limits.
- `scripts/validate_skills.py` checks packaging; `tests/` contains validator tests and behavioral evaluation cases.
- `agents/` contains reusable agent operating contracts. Each agent lives in its own folder with an `AGENTS.md`, matching the `skills/[skill-name]/SKILL.md` layout.
- `agents/README.md` indexes the agent folder so GitHub shows `agents/` as a separate top-level directory.
