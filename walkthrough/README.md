# Walkthrough Report Skill

Generate structured post-implementation walkthrough reports that communicate code changes, architectural decisions, annotated logic walkthroughs, and empirical verification evidence to the user.

## Install

```bash
npx skills add dimsedra/skills --skill walkthrough
```

## Features

- **Annotated Code Highlights**: Breaks down code changes by Input, Process / Mechanics, and Output so readers understand logic without guessing.
- **Context-Driven Composition**: Adapts structural sections (diagrams, tables, diffs, metrics) to the exact domain of the task rather than cloning rigid templates.
- **Adaptive Scope Depth**: Automatically scales reporting detail based on change magnitude:
  - **Small (1–2 files)**: Summary, file changes table, test proof.
  - **Medium (3–8 files)**: Contextual diagram if helpful, component breakdown, annotated key diffs, test logs.
  - **Large (8+ files)**: Macro architecture, module deep dives, annotated diff highlights, edge cases, benchmarks, rollback plan.
- **Evidence-First Verification**: Enforces actual test execution and embeds terminal output directly into the report.
- **Standalone HTML Output**: Leverages `report-in-html` for styled deliverables with dark/light themes.
- **Local Live Server Delivery**: Automatically serves the walkthrough over `http://localhost:<port>` instead of raw `file:///` paths.

## Files Reference

- `SKILL.md`: Main instructions, invariants, adaptive depth definitions, and reporting rules.
- `SCHEMA.md`: Content schema, component catalog, and annotated code diff blueprints.
- `examples/auth-session-refactor/`: Complete real-world walkthrough deliverable example showcasing distributed session refactoring with live terminal test proofs and split-view diffs.
- Dependency: Uses `report-in-html` for HTML generation and styling.
