# Blueprint Skill

Translates an approved Intent document into a technical blueprint (module boundaries, contracts, verification methods, and planned atomic commits) that the implementing agent follows together with the Intent.

## Install

```bash
npx skills add dimsedra/skills --skill blueprint
```

## Features

- **Intent-First Traceability**: Every contract names the part of the Intent it serves, with a two-way coverage check so nothing is invented and nothing is missed.
- **Non-Goals Carried Forward**: The Intent's boundaries become a required section, so the implementing agent knows what not to build.
- **Your Rules, Applied at Design Time**: Reads the engineering rules from the user's global instructions instead of a copy, and applies only the ones a design can actually decide (boundaries, parsing, failure surfaces, abstraction, verification).
- **Traceable Contracts**: Each capability gets a `BP-[MODULE]-[INDEX]` identifier covering input, behavior, output, failure, method, verification, and planned commits, which `/proof` and `/audit` refer back to.
- **Pragmatic Method & Verification**: Consults `/method` to pick the approach (`TDD`, `characterization`, `test-after`, `visual testing`, `design by contract`, `integration/e2e`) that fits each contract and pairs it with the concrete check to run in `/proof`.
- **Planned Atomic Commits**: Breaks each contract down into small, planned commits (such as `test: ...`, `feat: ...`) so implementation happens in traceable increments rather than one large commit at the end.
- **Stays True During Implementation**: When reality breaks a contract, the agent stops, aligns, and updates the Blueprint before continuing.
- **Lean Template**: Only contracts and non-goals are required. Other sections appear when they help.

## Usage

Trigger via `/blueprint` with a module or subsystem name:

```text
/blueprint Narrative Synthesis Engine
```
