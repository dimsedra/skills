# Intent Skill

Captures the human narrative, codebase reality, guiding principles, and boundaries from an alignment session into a permanent, readable record of intent on disk.

## Install

```bash
npx skills add dimsedra/skills --skill intent
```

## Features

- **Human-First Narrative**: Replaces bureaucratic PRDs with a chronological, human story of the problem and desired experience.
- **Grounded in Codebase Reality**: Directly references actual files, functions, and data structures to explain why the current system falls short.
- **Core Guiding Principles**: Preserves non-negotiable mental models and philosophical rules agreed on during alignment.
- **Explicit Guardrails & Non-Goals**: Documents traps, rabbit holes, and adjacent features explicitly out of scope to stop scope creep early.
- **Chronological Indexing**: Saves records to `docs/intent/YYYYMMDD_<slug>.md` and catalogs them in `docs/README.md`.

## Usage

Trigger via `/intent` with an initiative or discussion topic:

```text
/intent Batch image chronological story reconstruction
```
