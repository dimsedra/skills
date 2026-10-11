# ADR Skill

Captures and maintains Architecture Decision Records (ADRs) to document significant technical choices, rationale, evaluated alternatives, and consequences in short, immutable records.

## Install

```bash
npx skills add dimsedra/skills --skill adr
```

## Features

- **Single & Short Scope**: Enforces focused, one-decision records that fit on one page rather than bloated design documents.
- **Architectural Alignment Gate (`/align`)**: Surfaces contested trade-offs and calibrates technical options before finalizing the record.
- **Alternative Rigor & Anti-Relitigation**: Systematically documents rejected alternatives and rejection rationale to prevent endless future debates.
- **Intellectual Honesty on Consequences**: Requires explicit documentation of negative trade-offs and operational risks alongside benefits.
- **Immutability & Superseding Protocol**: Preserves historical truth by superseding rather than erasing outdated decisions.
- **Zero Stealth Writing & Anti-Rot Indexing**: Declares sequential paths upfront (`docs/decisions/adr_NNN_<slug>.md`) and registers records in `docs/README.md`.

## Usage

Trigger via `/adr` with a technical decision or architectural challenge:

```text
/adr Use Apache Kafka for inter-service communication
```

Or ask the agent naturally:

```text
Please create an ADR for choosing PostgreSQL over MongoDB for the order service module
```
