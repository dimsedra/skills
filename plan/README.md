# Plan Skill

Translates approved PRD user outcomes and SRS technical specifications into structured, commit-driven implementation roadmaps with stateful, real-time progress tracking.

## Install

```bash
npx skills add dimsedra/skills --skill plan
```

## Features

- **Specification-Anchored**: Derives scope and technical contracts directly from approved `docs/prd/` and `docs/srs/` artifacts.
- **Commit-Driven Task Decomposition**: Enforces small, digestible steps where each individual task specifies its own conventional commit message, target files, and verification test.
- **Stateful Progress Tracker**: Uses interactive markdown checkboxes (`- [ ]` / `- [x]`) and progress indicators designed to be updated in real-time by downstream implementation skills (e.g. `/implement`).
- **Scale-Aware Phasing**: Breaks large, complex specifications into logical sequential milestones (storage, domain logic, interfaces, UI, end-to-end testing).
- **Alignment Gate (`/align`)**: Proactively surfaces sequencing ambiguities and architecture trade-offs before locking in implementation order.
- **Durable Repo Artifacts**: Generates persistent documentation in `docs/plan/<name>.md` and catalogs every plan in `docs/README.md`.

## Usage

Trigger via `/plan` referencing a feature or specification:

```text
/plan Checkout Pipeline
```

Or ask the agent naturally:

```text
Berdasarkan SRS auth-service, tolong buatkan implementation plan berbasis commit dan checklist progress ya
```
