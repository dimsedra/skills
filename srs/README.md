# SRS Skill

Translates high-level PRD needs into unambiguous, testable, and traceable Software Requirements Specifications (SRS/SRD) with unique requirement identifiers (`REQ-[MODULE]-[INDEX]`).

## Install

```bash
npx skills add dimsedra/skills --skill srs
```

## Features

- **Technical Precision & Zero Ambiguity**: Replaces vague adjectives with quantitative latency percentiles, throughput targets, and exact schemas.
- **Alignment Gate (`/align`)**: Flags unguided architectural decisions (database paradigms, auth models, API protocols) and calibrates with the user before locking in specifications.
- **Rigorous Bidirectional Traceability**: Assigns stable `REQ-[MODULE]-[INDEX]` identifiers to every requirement, mapping back to parent PRDs and forward to test suites.
- **Unhappy Path as First-Class Citizen**: Systematically defines error response schemas, timeout recovery, edge cases, and rate limits.
- **Verification Matrix & Anti-Rot Indexing**: Generates a test verification matrix and catalogs every SRS in `docs/README.md`.

## Usage

Trigger via `/srs` with a module or subsystem name:

```text
/srs Auth Service & Session Management
```

Or ask the agent naturally:

```text
Tolong breakdown SRS untuk modul background job runner ini ya
```
