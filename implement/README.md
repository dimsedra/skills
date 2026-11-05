# Implement Skill

Executes an approved Blueprint (`docs/blueprint/`) or an aligned change step by step using `/method` (`TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, or `visual testing`), verifying each step and committing atomically without running the full `/ship` triple-auditor subagent loop.

## Install

```bash
npx skills add dimsedra/skills --skill implement
```

## Features

- **Direct Execution After Alignment or Blueprint**: Bridges the gap between planning (`/align`, `/intent`, `/blueprint`) and building when you do not want the full autonomous `/ship` audit loop.
- **Method-Driven Discipline**: Resolves and follows the exact `/method` route (`TDD.md`, `CHARACTERIZATION.md`, `TEST_AFTER.md`, `DESIGN_BY_CONTRACT.md`, `INTEGRATION_E2E.md`, or `VISUAL_TESTING.md`) for every contract or change.
- **Atomic Commits**: Commits incrementally (`test: ...`, `feat: ...`, `refactor: ...`) as each step turns green while respecting `docs/` version control boundaries.
- **Circuit Breaker**: Halts immediately and falls back to `/align` if real codebase constraints conflict with the approved Blueprint, Intent, or agreed approach.

## Usage

```text
/implement
```
