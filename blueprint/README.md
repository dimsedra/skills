# Blueprint Skill

Translates an approved Intent document into a concrete, defendable technical blueprint (system architecture, deep modules, public API contracts, and fit-for-purpose verification strategies) that complies with our engineering directives.

## Install

```bash
npx skills add dimsedra/skills --skill blueprint
```

## Features

- **Agent-Authored Technical Translation**: The agent inspects the code, applies engineering directives, and drafts the technical schematic for the builder to review.
- **Engineering Directives Enforcement**: Actively bakes in AHA over DRY, deep modules, locality of behavior, parse-don't-validate, fail-fast error handling, max 2 levels of indentation, and zero boolean flags.
- **Traceable Public Contracts**: Defines public entry points with explicit `BP-[MODULE]-[INDEX]` identifiers covering preconditions, mutations, outputs, and failure modes.
- **Pragmatic Verification Strategy**: Avoids dogmatic TDD; assigns fit-for-purpose verification methods (automated public test, tests after, manual live run, visual audit) for each contract.
- **Chronological Indexing**: Saves records to `docs/blueprint/YYYYMMDD_<slug>.md` and catalogs them in `docs/README.md`.

## Usage

Trigger via `/blueprint` with a module or subsystem name:

```text
/blueprint Narrative Synthesis Engine
```
