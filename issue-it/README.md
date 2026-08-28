# Issue It Skill

Convert debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues designed for cold re-orientation with zero active context.

## Install

```bash
npx skills add dimsedra/skills --skill issue-it
```

## Features

- **Problem-First Framing**: Formulates descriptive, problem-first titles instead of premature solution labels.
- **Cold Re-Orientation Context**: Includes 1–2 high-level system context sentences so anyone can understand the issue weeks later.
- **Durable Symbol Pointers**: Uses stable semantic identifiers (`path/to/file` -> `SymbolName()`) instead of rotting line numbers or decaying code block snapshots.
- **Cognitive Slicing**: Splits multi-layer or multi-bug problems into independent, focused tracking issues.
- **GitHub CLI Integration**: Formats ready-to-run `gh issue create` commands while requiring explicit user confirmation before remote publishing.

## Files Reference

- `SKILL.md`: Core invariants, phase gates (Target Resolution, Draft Generation, Confirmation), rationalization counters, and guardrails.
- `ISSUE-FORMAT.md`: Standard markdown issue schema, GitHub CLI publishing snippet, and archetype examples (Bug Report, Architectural Gap, Security Boundary).
