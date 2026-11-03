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
- **Deterministic Script**: The shared block lives in [`RULES.md`](./RULES.md) and is written by [`scripts/inject-rules.mjs`](./scripts/inject-rules.mjs) between `BEGIN`/`END` marker comments, so every agent produces the exact same edit and re-running it only updates the marked block.
- **Confirmed Manual Fallback**: If the script cannot run, the agent asks before making the same marked edit by hand, and never installs software or works around restrictions to force the script.

## Requirements

Node.js, with no extra packages. If you installed this skill with `npx`, you already have it.

## Usage

```text
/setup
```

## Upgrading From an Earlier Version

Versions installed before the script existed wrote the four sections without markers. The script cannot tell where those unmarked sections end, so it appends a fresh marked block instead of replacing them. After running `/setup` once, delete the old unmarked sections by hand (or let the agent do it after it asks you). From then on, updates replace only the marked block.

## Testing

```bash
node --test setup/scripts/
```
