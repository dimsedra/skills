# Implement Skill

Executes implementation plans phase-by-phase from `docs/plan/` with atomic Git commits, mandatory automated test verification, and real-time audit trail tracking (recording commit hashes directly into the plan document).

## Install

```bash
npx skills add dimsedra/skills --skill implement
```

## Features

- **Plan-Driven Execution**: Strictly executes against approved roadmaps in `docs/plan/` rather than improvising code changes.
- **Phase Milestone Cadence**: Executes work phase-by-phase, pausing at milestone checkpoints for user review and validation.
- **Strictly Atomic Commits (1 Task = 1 Commit)**: Prevents massive code dumps by keeping every change discrete, self-contained, and easily auditable.
- **Mandatory Pre-Commit Verification**: Runs automated test suites for every task; commits are only created when tests pass cleanly.
- **Living Plan Synchronization**: Automatically ticks task checkboxes (`- [x]`), appends Git commit hashes (e.g. `a1b2c3d`), and recalculates progress metrics in real-time.
- **Blocker Gate (`/align`)**: Flags unexpected architectural issues or contract mismatches and triggers `/align` instead of writing silent hacks.

## Usage

Trigger via `/implement` referencing an active plan or feature:

```text
/implement Checkout Pipeline
```

Or ask the agent naturally:

```text
Tolong implementasikan Phase 1 dari plan checkout ya
```
