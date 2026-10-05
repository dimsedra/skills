# Document Skill

Transforms design discussions, architectural models, decisions, and technical workflows into clean, modular, and traceable markdown documents inside `docs/`.

## Install

```bash
npx skills add dimsedra/skills --skill document
```

## Features

- **Decision Tree Classification**: Automatically infers the correct documentation category (`architecture/`, `decisions/`, `guides/`, `concepts/`, `reference/`).
- **Specialized Sub-Skills**: Integrates seamlessly with `/prd` (Product Requirements), `/srs` (Software Requirements), and `/plan` (Implementation Roadmaps) for structured lifecycle documentation.
- **Placement Announcement**: Transparently announces inferred category and destination path before or upon file creation (zero stealth writing).
- **Modular Single Responsibility**: Enforces focused, decoupled documentation instead of monolithic, hard-to-maintain encyclopedias.
- **Durable Code Traceability**: Binds documents to codebase files and durable symbols via YAML frontmatter (`related_code`).
- **Anti-Rot Index Maintenance**: Automatically catalogs new and modified documents into `docs/README.md`.

## Usage

Invoke after aligning or discussing a system feature, workflow, or architectural choice:

```text
Tolong /document kan ya
```

Or trigger via `/document` with a specific topic:

```text
/document SQLite migration and caching strategy
```
