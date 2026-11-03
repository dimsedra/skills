# Ship Skill

End-to-end workflow orchestrator that guides the interactive human gate (`/align` -> `/intent` -> `/blueprint`) and then runs an autonomous execution and self-healing loop (`/method` per contract -> `/audit` subagent loop) until landing at `/proof`.

## Install

```bash
npx skills add dimsedra/skills --skill ship
```

## Features

- **Explicit Activation Only**: Triggers only when `/ship` is explicitly invoked, never when you casually say "build" or "implement".
- **Human Gate First**: Never invents requirements on its own. Ensures an approved Intent (`docs/intent/`) and an approved Blueprint (`docs/blueprint/`) exist before starting the autonomous loop.
- **Contract-by-Contract Execution**: Steps through every `BP-[MODULE]-[INDEX]` contract in the Blueprint, reading and executing its assigned route in `/method` (`TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, `visual testing`) with atomic commits.
- **Autonomous Self-Healing Audit Loop**: Spawns the isolated `/audit` subagents (`Spec Auditor`, `Resilience Auditor`, `Quality Auditor`), fixes any `BLOCKED` findings, and re-verifies until the diff is certified `CLEAN & MERGEABLE`.
- **Circuit Breaker for Reality Drift**: Stops immediately and calls `/align` if codebase reality invalidates a Blueprint contract or contradicts the Intent.
- **Finishes at `/proof`**: Hands control back with real runtime evidence ready for interactive verification.

## Usage

Start from scratch (runs the interactive gate first, then loops autonomously once you approve the Blueprint):

```text
/ship
```

Or start directly from an already approved Intent and Blueprint:

```text
/ship docs/intent/20261104_duty_scheduling.md docs/blueprint/20261104_duty_scheduler.md
```
