---
name: srs
description: Use when drafting, specifying, or breaking down a Software Requirements Specification (SRS/SRD) to define unambiguous, testable, and traceable technical requirements.
---

# SRS (Software Requirements Specification)

When I ask you to draft or refine an SRS, the goal is to translate our requirements—whether from an existing PRD in `docs/prd/` or directly from our discussion—into clear, testable, and traceable technical specifications that `/plans` and `/implement` can build against without guesswork.

## Ground in Context and Align on Technical Choices First

Start by reading the parent PRD in `docs/prd/` if one exists, along with our discussion and the existing codebase, so you know which stack choices, conventions, and system boundaries are already settled. Separate that settled baseline from open technical decisions—such as data consistency models, auth mechanisms, state storage, or external dependencies—where I have not given explicit direction yet.

Never lock in high-level architecture, database models, or third-party dependencies on my behalf. If there are open technical trade-offs or ambiguous non-functional targets, pause and invoke `/align` with me first. Lay out the concrete options (for example, stateless vs. session-based, polling vs. webhooks) with their pros and cons so we can settle the design before you write the spec. If we intentionally defer an item for later, mark it clearly in the document.

## Write Specific, Traceable Requirements

When writing the technical specifications, keep three rules in mind:

- Be concrete rather than vague. Avoid subjective words like "fast", "robust", or "scalable", and state explicit thresholds, data types, payload shapes, and status codes instead.
- Treat the unhappy path as a first-class citizen. Define how the system handles invalid inputs, edge cases, timeouts, rate limits, and network failures right alongside the normal flow.
- Give every functional capability a unique ID (`REQ-[MODULE]-[INDEX]`, such as `REQ-AUTH-001`) so it traces cleanly forward to the test scenarios in `/plans` (and back to the PRD if one exists).

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating an SRS. Save SRS files at `docs/srs/YYYYMMDD_<module_slug>.md` in snake_case. If we revise the SRS on a later calendar date, rename the file using `git mv` to match the new date, update `last_updated` in the frontmatter, and update references to it in `docs/README.md` as well as any downstream Plan files (`parent_srs`).

Structure the SRS with consistent YAML frontmatter (leave `parent_prd: null` if there is no parent PRD) and clear, readable sections:

```markdown
---
title: "SRS: [Module or System Name]"
type: srs
parent_prd: null
status: Draft
last_updated: YYYY-MM-DD
---

# SRS: [Module or System Name]

## System Overview & Architecture
Explain the scope of this module, the actors involved (users, background workers, external services), and how the components and data stores fit together. Include a Mermaid diagram when it helps clarify the flow.

## External Interfaces & API Contracts
Define the frontend/UI boundaries, API endpoints, request/response payload schemas, and communication protocols.

## Functional Requirements
Group capabilities by module and give each requirement a unique `REQ-[MODULE]-[INDEX]` identifier. For each requirement, clearly describe its inputs and preconditions, how it processes data and mutates state, its expected outputs and status codes, and how it handles errors or failure modes.

## Data Models & Storage
Specify the entity schemas, keys, indexes, consistency boundaries, and any retention or cleanup rules.

## Non-Functional Requirements & Verification
State concrete targets for latency, throughput, security, and resource limits, and map out how each `REQ-XXX` requirement will be verified (unit, integration, contract, or load tests) along with any platform constraints or fallback strategies.
```

Once you create or update the file, add or update its entry in `docs/README.md` and give me a brief summary in chat covering the file path, any linked PRD, and the key contracts defined.
