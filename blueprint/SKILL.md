---
name: blueprint
description: Use when translating an approved Intent document into a concrete, defendable technical blueprint (system architecture, domain boundaries, data contracts, and public APIs) that complies with our engineering directives.
---

# Blueprint

When I ask you to draft or refine a Blueprint, your job is to translate our agreed Intent (`docs/intent/`) into an executable, defendable technical blueprint that we can build against without guesswork.

While `intent` is my domain to define what I want and verify the human outcome, `blueprint` is your domain as the agent. You write it, you follow it during implementation, and you present it to me in clear technical language so I can trace, understand, and 100% defend every technical decision in a peer code review in under 30 seconds.

## The Mental Dialogue

Whenever you present a Blueprint to me, frame it around this natural dialogue:
- *"Here is how I grasp your intent based on codebase reality, technically."*
- *"Here is how we can implement it, strictly applying our engineering directives."*
- *"Here are the interfaces, contracts, and the expected endpoint."*

## Ground in Codebase Reality First

Never invent architecture in a vacuum or rely on abstract assumptions. Before writing a single line of the Blueprint:
- Inspect the actual codebase: read the existing files, types, and workflows in the areas we are touching.
- Evaluate domain boundaries: determine whether the Intent maps cleanly to a single cohesive module or if it crosses distinct lifecycles (such as separating public user workflows from background tasks) that warrant separate blueprints.
- If the domain boundaries or technical trade-offs are ambiguous, pause and invoke `/align` with me first so we agree on the decomposition before you write.

## Enforce Our Engineering Directives

The Blueprint is the gatekeeper of our engineering rules. Every design decision in the document must explicitly reflect our core directives:

1. **AHA > DRY (Avoid Premature Abstraction)**:
   Do not extract shared helpers, base classes, or generic interfaces unless a pattern is already repeated at least 3 times in our codebase. Solve only our immediate problem (YAGNI). Do not introduce unnecessary interfaces or abstract classes when there is only one implementation.
2. **Deep Modules & Locality of Behavior**:
   Keep code that changes together in the same file or directory. Design deep modules with simple, minimal public signatures (few parameters, explicit return types) that encapsulate substantial logic inside.
3. **Parse, Don't Validate**:
   Define strict validation schemas at entry boundaries (APIs, user input, environment variables). Once data crosses into core domain logic, trust the types.
4. **Fail Fast and Loud**:
   No silent fallbacks (such as `?? 0` or empty catch blocks) that swallow bugs. Specify descriptive errors and explicit failure payloads for every unhappy path.
5. **Boring & Readable**:
   No boolean flags in function signatures (use named option objects or distinct functions). Keep control flow flat using guard clauses (early returns) with a maximum of 2 levels of indentation.
6. **Pragmatic Verification (Fit-for-Purpose, Not Dogmatic TDD)**:
   Avoid dogmatically forcing everything into TDD. Use automated behavioral tests through public APIs when the correct behavior is known upfront, can be verified automatically, and will live long enough to be maintained. For exploratory logic, glue code, or UI, specify the appropriate verification method (tests written after, manual live runs, contract checks, or visual review) that will be demonstrated in `/proof`. Never mock internal collaborators or expose private state for tests.

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating a Blueprint. Save each Blueprint at `docs/blueprint/YYYYMMDD_<module_slug>.md` in snake_case.

If we revise a Blueprint on a later calendar date, rename the file using `git mv` to match the new date, update `last_updated` in the frontmatter, and update references in `docs/README.md`.

Structure the Blueprint with consistent YAML frontmatter and clear sections:

```markdown
---
title: "Blueprint: [Module or Subsystem Name]"
type: blueprint
parent_intent: docs/intent/YYYYMMDD_<slug>.md
status: Draft
last_updated: YYYY-MM-DD
---

# Blueprint: [Module or Subsystem Name]

## Codebase Context & Reality Check
Explain how the relevant parts of the codebase operate today, citing actual files, existing data flows, and current limitations. Clearly articulate the technical gap between today's implementation and the target Intent.

## System Architecture & Domain Boundaries
Explain the module boundaries, execution flow, and component relationships. Demonstrate Locality of Behavior (keeping related logic together) and explain why this architecture avoids premature abstraction. Include a Mermaid diagram when it clarifies data flow.

## Public API & Interface Contracts
Define the public entry points, functions, and communication contracts. Give each concrete capability a clean identifier in the format `BP-[MODULE]-[INDEX]` (such as `BP-AUTH-001`). For each contract, specify:
- Inputs and preconditions (including schema parsing at the boundary)
- State mutations and execution behavior
- Returned outcomes and status codes
- Unhappy paths (error triggers, status codes, and error payloads)

## Data Representation & Storage
Define the internal domain models, state containers, schemas, and persistence rules. Ensure core models rely on trusted, parsed data rather than defensive null checks.

## Directives Compliance & Verification Strategy
Briefly explain how this technical design satisfies our engineering directives (such as max 2 levels of indentation, no boolean flags, and deep modules). For each `BP-XXX` contract, state its specific verification strategy—whether automated public-API test, test written after, manual live demonstration, or visual audit—which you will prove to me during `/proof`.
```

Once you create or update the file, catalog it in `docs/README.md` and present the Blueprint to me in chat using the dialogue framing: summarize your technical grasp of the intent, how our engineering rules are upheld, and the concrete endpoint we are building toward.
