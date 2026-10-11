# Plans Skill

Translates approved PRD user outcomes and SRS technical specifications into structured, commit-driven implementation roadmaps organized by behavioral TDD scenarios with real-time progress tracking.

## Install

```bash
npx skills add dimsedra/skills --skill plans
```

## Features

- **Specification & Baseline Grounded**: Derives scope from approved `docs/prd/` and `docs/srs/` artifacts, while mapping existing codebase baselines upfront to prevent friction and test tampering.
- **4-Dimension Scenario Coverage**: Systematically plans test scenarios across normal path, boundaries (edge cases), error paths, and core system invariants.
- **TDD Dual-Task Decomposition**: Structures every behavior scenario into an atomic pair of tasks: `Task X.Ya [TEST]` (failing test commit) and `Task X.Yb [FEAT]` (minimal implementation commit).
- **Public API Behavior Focus**: Enforces black-box behavioral verification via public interfaces, avoiding over-mocking and brittle interaction assertions.
- **Human-Readable Test Logs**: Structures scenario descriptions into clear behavioral statements that generate clean, easily readable test output.
- **Durable Chronological Artifacts**: Generates persistent documentation in `docs/plan/YYYYMMDD_<plan_slug>.md` and catalogs every plan in `docs/README.md`.

## Usage

Trigger via `/plans` referencing a feature or specification:

```text
/plans Checkout Pipeline
```

Or ask naturally:

```text
Based on the auth service SRS, please create a commit-driven TDD implementation plan with task checklists
```
