# RFC Skill

Proposes significant engineering initiatives, drives technical consensus, and aligns cross-functional stakeholders through structured, review-driven Request for Comments (RFC) documents.

## Install

```bash
npx skills add dimsedra/skills --skill rfc
```

## Features

- **Plain-Narrative & Technical Appendix**: Ensures main proposal sections remain accessible for non-codebase stakeholders while isolating raw payloads and code traces in an appendix.
- **Audience-Aware Framing**: Adjusts technical tone across leadership, cross-functional partners, and peer engineers.
- **Strict Scope Boundaries**: Enforces explicit Goals and Non-Goals to guard against proposal bloat.
- **Comprehensive Cross-Cutting Evaluation**: Systematically covers migration paths, zero-downtime rollouts, security, observability, and rollback safety.
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
