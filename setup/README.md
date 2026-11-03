# Setup Skill

Injects or updates the shared `Engineering Rules & Directives`, `UI Design & Front-End Philosophy`, `Technical Documentation, Specifications & Planning`, and `Subagent Behavior & Delegation` sections into a user's `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` at either the project level or global level, preserving any existing personal instructions.

## Install

```bash
npx skills add dimsedra/skills --skill setup
```

## Features

- **Project or Global Scope**: Lets the user choose whether to install the rules in the current repository root or in their global agent config directory (`~/.gemini/GEMINI.md`, `~/.claude/CLAUDE.md`, `~/.config/opencode/AGENTS.md`).
- **Non-Destructive Injection**: Preserves existing personal communication styles, identity sections, or project-specific notes while adding or updating the four required skill sections.
- **Verbatim Guardrails**: Injects the exact engineering thresholds, testing rules, `docs/` version control rules, and bounded subagent rules that `/blueprint`, `/method`, `/proof`, and `/audit` rely on.

## Usage

```text
/setup
```
