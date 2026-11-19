# Agent Skills

[![skills.sh](https://skills.sh/b/dimsedra/skills)](https://skills.sh/b/dimsedra/skills)

Most AI coding setups force you into one of two traps. You either treat chat like a vending machine that spits out 400 lines of code you cannot defend at 2:00 AM, or you adopt a rigid framework that buries your thinking under templates.

This collection takes a different stance: **the discussion is the engineering.** Your working thoughts are the framework, and talking things through with the agent is how good software gets designed and shipped.

## Why It Feels Different

A skill is not a plugin with special powers. It is plain text loaded into the same stream as your chat. Because the agent reads the skill and your words in one voice, writing skills like corporate SOPs makes the agent perform compliance instead of thinking with you.

So the collection splits into two registers:
- **Collaboration skills** are written in first-person dialogue (`personal/WRITING.md`) so the agent stays present as a thinking partner.
- **Verification skills** stay strictly procedural, because proof should be checkable and mechanical, not improvised.

The engineering practices here (TDD, ADRs, RFCs, contract-first design) are standard craft. What actually compounds is the collaboration half: knowledge about how you think and work, built from real sessions rather than theory.

## Think Together

Before writing code, these skills make sure you and the agent share the same mental model.

- [`align`](./align/SKILL.md): Meets a rough two-sentence idea before any code is written, playing back understanding (`UNDERSTAND.md`), laying out options (`DECIDE.md`), or stress-testing assumptions (`CHALLENGE.md`).
- [`research`](./research/SKILL.md): Grounds technical choices in your actual dependency versions and official docs instead of stale training data.
- [`explain`](./explain/SKILL.md): Breaks down code, bugs, or architecture in the way that clicks with how you learn.
- [`learn`](./learn/SKILL.md): Extracts transferable, cross-project mental models into runnable lesson playbooks in `docs/lesson/`.
- [`reflect`](./reflect/SKILL.md): Reviews how a session went and saves confirmed working preferences into your personal `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` so tomorrow starts with less friction.

## Build and Verify

Once the picture is clear, execution becomes deliberate and verifiable.

- [`method`](./method/SKILL.md): Picks the right engineering discipline for the job (`TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, or browser `visual testing`) and builds in small increments.
- [`intent`](./intent/SKILL.md): Captures what you want, why, and what to avoid in `docs/intent/` when a feature is too large for chat alone.
- [`blueprint`](./blueprint/SKILL.md): Turns an approved intent into concrete contracts, verification checks, and planned atomic commits in `docs/blueprint/`.
- [`implement`](./implement/SKILL.md): Steps through each contract with you via `/method`, tripping back to `/align` if codebase reality conflicts with the plan.
- [`ship`](./ship/SKILL.md) and [`audit`](./audit/SKILL.md): Runs the full build autonomously after alignment, spawning three fresh-eyed auditor subagents to catch and fix defects.
- [`proof`](./proof/SKILL.md): Verifies completed work in chat using real terminal output and test runs, owning up plainly to anything missed or untested.
- [`review`](./review/SKILL.md): Applies the same evidence-first walkthrough to incoming pull requests and branch diffs.

## Setup and Project Docs

- [`setup`](./setup/SKILL.md): Injects the shared engineering baseline into your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` via `setup/scripts/inject-rules.mjs` without touching your personal `/reflect` notes.
- [`document`](./document/SKILL.md), [`adr`](./adr/SKILL.md), [`rfc`](./rfc/SKILL.md), [`issue`](./issue/SKILL.md), and [`report`](./report/SKILL.md): Keeps architecture notes, decisions, proposals, issues, and HTML reports organized in `docs/` and indexed in `docs/README.md`.

## Installation

```bash
npx skills add dimsedra/skills
```

Run `/setup` in your agent to add the shared engineering baseline, and run `/reflect` after sessions so the agent keeps learning how you work. To install a single skill, pass `--skill <name>` (for example `npx skills add dimsedra/skills --skill align`).

## License

MIT
