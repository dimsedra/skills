# Walkthrough Report Skill

Generate structured post-implementation walkthrough reports that communicate code changes, architectural decisions, and empirical verification evidence to the user.

## Install

```bash
npx skills add dimsedra/skills --skill walkthrough
```

## Features

- **Adaptive Scope Depth**: Automatically scales reporting detail based on change magnitude:
  - **Small (1–2 files)**: Summary, file changes table, test proof.
  - **Medium (3–8 files)**: Mermaid diagram, component breakdown, key diffs, test logs.
  - **Large (8+ files)**: Macro architecture, module deep dives, edge cases, benchmarks, rollback plan.
- **Evidence-First Verification**: Enforces actual test execution and embeds terminal output directly into the report.
- **Standalone HTML Output**: Leverages `report-in-html` for styled deliverables with dark/light themes.
- **Local Live Server Delivery**: Automatically serves the walkthrough over `http://localhost:<port>` instead of raw `file:///` paths.

## Files Reference

- `SKILL.md`: Main instructions, invariants, adaptive depth definitions, and reporting rules.
- `SCHEMA.md`: Content schema and required sections mapped to scope tiers.
- Dependency: Uses `report-in-html` for HTML generation and styling.
