# Implement Skill

Executes implementation plans from `docs/plan/`—either phase-by-phase or continuously end-to-end—with strict TDD cycles (Red-Green-Refactor), separate test and feature commits, automated verification, and real-time audit trail tracking (recording commit hashes directly into the plan document).

## Install

```bash
npx skills add dimsedra/skills --skill implement
```

## Features

- **Flexible Execution Pace (Per-Phase or End-to-End)**: Offers the choice to pause after each phase milestone for confirmation or execute the entire plan continuously to completion before handing off to `/audit`.
- **Strict TDD Execution (Red-Green-Refactor)**: Executes behavior scenarios strictly test-first—demonstrating failure, delivering minimal implementation, and refactoring cleanly without ever batching scenarios into giant commits.
- **Separate Commits (Test vs Feat)**: Commits tests and implementation code separately, enabling clean, independent diff reviews.
- **Baseline & Impact Mapping**: Inspects the target codebase area before writing tests to ground tests in existing signatures, types, and invariants, mitigating test tampering friction.
- **Readable Behavior Test Logs**: Formats test runs to output clean, human-readable scenario descriptions and proof of delivery in chat.
- **Strict Anti-Tampering Circuit Breaker**: Prohibits deleting, skipping, or weakening assertions to force a pass; requires immediate stopping and `/align` calibration if a test or requirement conflicts with codebase reality, even during an end-to-end run.
- **Minimal Implementation Discipline**: Delivers only the minimal code necessary to satisfy passing tests without unrequested complexity or features.
- **Living Plan Synchronization**: Automatically ticks task checkboxes (`- [x]`), appends Git commit hashes (e.g. `a1b2c3d`), and recalculates progress metrics in real-time after every single commit.

## Usage

Trigger via `/implement` referencing an active plan or feature:

```text
/implement Checkout Pipeline
```

Or specify the execution pace naturally:

```text
Please implement Phase 1 of the checkout pipeline plan
```

```text
Implement the checkout pipeline plan all the way through
```
