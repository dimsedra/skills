---
name: srs
description: Use when drafting, specifying, or breaking down a Software Requirements Specification (SRS/SRD) to define unambiguous, testable, and traceable technical requirements.
---

# SRS (Software Requirements Specification)

When I ask you to draft or refine an SRS, your goal is to translate our requirements—whether from an existing PRD in `docs/prd/` or directly from our discussion—into clear, testable, and traceable technical specifications that `/plans` and `/implement` can build against without guesswork.

## Assess Domain Boundaries and Decomposition First

If a parent PRD in `docs/prd/` exists, do not assume it maps to a single SRS document. PRDs live in the problem space and often span multiple technical domains. Your first job is to evaluate whether the scope should be split into multiple SRS documents using domain-driven decomposition or kept as a single cohesive spec.

Look at the underlying system mechanics, data boundaries, and operational lifecycles. If the PRD crosses distinct bounded contexts—such as separating public-facing user workflows from asynchronous background processing, or decoupling independent payment logic from core catalog operations—treat them as separate technical modules. Whenever you see a case for splitting, pause and invoke `/align` with me first. Propose the decomposition map, walk through the domain boundaries and rationale for each proposed SRS, and agree on the breakdown with me before writing any files. If the PRD describes a small, cohesive capability that shares a single lifecycle and data model, keep it as a single SRS so we avoid premature complexity.

If there is no parent PRD and we are designing directly from discussion, ground yourself in the existing codebase and confirm the technical boundaries with me before proceeding.

## Align on Open Technical Choices

Read our discussion, the parent PRD, and the existing codebase to understand what stack choices, conventions, and system boundaries are already settled. Separate that settled baseline from open technical decisions—such as data consistency models, auth mechanisms, state storage, or external dependencies—where I have not given explicit direction yet.

Never lock in high-level architecture, database models, or third-party dependencies on my behalf. If there are open technical trade-offs or ambiguous non-functional targets, pause and invoke `/align` with me first. Lay out concrete options with their pros and cons so we can settle the design together before you write the spec. If we intentionally defer an item for later, mark it clearly in the document.

## Write Concrete, Traceable Specifications

Write requirements with clear cause-and-effect precision. Avoid subjective words like "fast", "robust", or "scalable", and state explicit thresholds, data types, payload shapes, and status codes instead. If a response must return within 200ms or an input must reject payloads over 10KB, write that exact number.

Treat the unhappy path as a first-class citizen. Define how the system handles invalid inputs, boundary conditions, timeouts, rate limits, and network failures right alongside the normal flow. Every error must specify its trigger condition, returned status code, and error payload format.

Give every functional capability a unique identifier in the format `REQ-[MODULE]-[INDEX]` (such as `REQ-AUTH-001`). This ID must trace cleanly forward to behavioral test scenarios in `/plans` and back to the parent PRD if one exists, ensuring full traceability across our documentation.

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating an SRS. Save each SRS file at `docs/srs/YYYYMMDD_<module_slug>.md` in snake_case. When a single PRD decomposes into multiple SRS documents, create a separate file for each module and point `parent_prd` in the frontmatter to the shared PRD path.

If we revise an SRS on a later calendar date, rename the file using `git mv` to match the new date, update `last_updated` in the frontmatter, and update references to it in `docs/README.md` as well as any downstream Plan files (`parent_srs`).

Structure each SRS with consistent YAML frontmatter (leave `parent_prd: null` if there is no parent PRD) and clear, readable sections:

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
