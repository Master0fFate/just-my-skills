# Installation

## Portable Agent Skills / Codex

Place the skill at:

```text
.agents/skills/adaptive-orchestrator/SKILL.md
```

For proactive project-wide assessment in Codex, merge the supplied `AGENTS.md` text into the repository's applicable `AGENTS.md` file. The skill description can also trigger implicitly without the wrapper when the host supports implicit skill invocation.

Codex worker model selection is runtime configuration, not portable `SKILL.md` metadata. Configure a cheaper default subagent model or role-specific custom agents in Codex when you need guaranteed strong-parent/weak-worker routing.

## Claude Code

Place the skill at:

```text
.claude/skills/adaptive-orchestrator/SKILL.md
```

For proactive project-wide assessment, merge the supplied `CLAUDE.md` text into the repository's applicable `CLAUDE.md`. Claude Code subagent model selection belongs in custom subagent definitions or runtime configuration; the portable skill requests economical routing whenever the host exposes that choice.

## Generic agent harness

Load `SKILL.md` as an available skill or developer instruction and expose a subagent/task tool. The tool should let the parent provide a bounded prompt, choose a worker tier when possible, wait or run concurrently, resume a worker, and collect a structured result.

## Recommended runtime limits

- Parent: strongest available reasoning model.
- Default worker: economical model suitable for bounded tasks.
- Maximum active workers: 3.
- Maximum total workers per user task: 4.
- Delegation depth: 1; workers cannot delegate.
- Read-only tools by default; write and external-action permissions only when needed.
