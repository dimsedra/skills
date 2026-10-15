# RFC Skill

Proposes significant engineering initiatives, drives technical consensus, and aligns cross-functional stakeholders through structured, review-driven Request for Comments (RFC) documents.

## Install

```bash
npx skills add dimsedra/skills --skill rfc
```

## Features

- **Modular Component-Based Architecture**: Treats document sections as modular building blocks assembled on demand based on specific intent (policy inquiries, authority requests, or technical proposals), avoiding rigid boilerplate.
- **Audience-Aware Stakeholder Framing**: Tailors depth to stakeholder profiles—supporting high-impact, low-interest decision makers with structured checkbox choices while reserving deep technical traces for appendices.
- **Strict Scope Boundaries**: Enforces explicit Goals and Non-Goals when needed to guard against proposal bloat.
- **Comprehensive Cross-Cutting Evaluation**: Covers security, migration paths, rollout, and risks when evaluating concrete architectural proposals.
- **Living Lifecycle Tracking**: Manages proposal states from `Draft` and `In-Review` to `Accepted`, `Rejected`, or `Superseded`.
- **Sequential Indexing & Anti-Rot**: Places files at `docs/rfc/rfc_NNN_<slug>.md` and catalogs all proposals in `docs/README.md`.

## Usage

Trigger via `/rfc` with a technical initiative or proposal topic:

```text
/rfc Migrate session management from in-memory store to Redis Cluster
```

Or ask naturally:

```text
Please draft an RFC proposing a new asynchronous event-driven notifications service
```
