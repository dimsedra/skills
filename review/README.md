# Review Skill

Explains incoming Pull Requests, Merge Requests, and branch diffs directly in conversation through execution tracing, behavioral shifts, and risk assessment.

## Install

```bash
npx skills add dimsedra/skills --skill review
```

## Features

- **Conversational, Not a Document**: Delivers the review directly in the thread without polluting the repository with temporary review files.
- **Author Intent & Context**: Grounds analysis in the problem the author set out to solve and how the system worked before.
- **Execution Flow Over File Lists**: Traces control and data flow from entry points to persistence, rather than reciting an alphabetical list of files.
- **Behavioral vs Cosmetic**: Separates genuine logic and state changes from cosmetic refactoring, renames, and formatting.
- **Blast Radius & Hidden Risks**: Identifies breaking changes to contracts, unhandled edge cases, missing error paths, and performance traps.
- **Test Integrity**: Evaluates whether tests actually verify the changed behavior rather than testing implementation details.

## Usage

Trigger via `/review` or by asking to review a PR, MR, or branch diff:

```text
/review
```
