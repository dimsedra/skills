---
name: prd
description: Use when writing, drafting, or refining a Product Requirements Document (PRD) to define the problem space, target outcomes, scope, and user requirements before building.
---

# PRD (Product Requirements Document)

When I ask you to draft or refine a PRD, the goal is to clearly define the problem we are solving, who we are solving it for, the outcomes we want, and the scope boundaries—while leaving technical implementation details flexible for engineering and the `/srs` spec.

## Align on Open Product Decisions First

Start by reading my prompt, our prior discussion, and the current codebase context. Separate what we have already settled (such as the core problem, target users, and main MVP need) from high-level product or scope questions that are still open (such as edge-case business rules, scope boundaries, or policy trade-offs).

Never guess or silently invent product and scope decisions on my behalf. If there are open gaps or trade-offs we have not discussed yet, pause and invoke `/align` first so we can walk through the options and agree on the direction before you write the PRD. If we intentionally decide to leave a question open for later, note it clearly in the document.

## Keep the Focus on Problems, Outcomes, and Scope

When shaping the requirements, keep three things in mind:

- Tie every capability directly back to the root problem we are solving, and leave out surface-level bells and whistles.
- Focus on what the user needs to accomplish and the observable outcome ("what" and "why"), leaving database schemas, internal APIs, and code architecture to `/srs` and `/plans`.
- Draw a hard line on scope. Clearly separate what is in scope for the MVP (must-have items required for launch) from what is explicitly out of scope so we prevent scope creep early.

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating a PRD. Save PRD files at `docs/prd/YYYYMMDD_<feature_slug>.md` in snake_case. If we revise the PRD on a later calendar date, rename the file using `git mv` to match the new date, update `last_updated` in the frontmatter, and update references to it in `docs/README.md` as well as any downstream SRS or Plan files.

Structure the PRD with consistent YAML frontmatter and clear, readable sections:

```markdown
---
title: "PRD: [Feature or Initiative Name]"
type: prd
status: Draft
last_updated: YYYY-MM-DD
---

# PRD: [Feature or Initiative Name]

## Problem & Context
Explain the root problem we are solving, why it matters now, and who the target users are. Write this in clear paragraphs so anyone reading it cold understands the background.

## Goals & Success Criteria
Describe the concrete user and product outcomes we want to achieve, along with how we will know the solution is working.

## Scope & Constraints
Clearly separate what is in scope for the MVP (must-haves) from what is explicitly out of scope (deferred or non-goals), and note any business, timeline, or compliance constraints.

## User Journeys & Requirements
Walk through the critical user journeys (step-by-step or Given/When/Then), the core functional requirements and business rules, and any high-level non-functional expectations (such as responsiveness, security, or reliability).

## Risks, Rollout & Open Questions
Note key operational or product risks and how we will handle them, any rollout considerations, links to related design or technical docs, and any remaining open questions.
```

Once you create or update the file, add or update its entry in `docs/README.md` and give me a brief summary of the PRD and any remaining open questions in chat.
