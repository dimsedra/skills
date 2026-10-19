---
name: adr
description: Use when recording, evaluating, or superseding an Architectural Decision Record (ADR) to document significant technical choices, rationale, trade-offs, and consequences.
---

# ADR (Architecture Decision Record)

When I ask you to record or supersede an architectural decision, the goal is to capture the context, reasoning, evaluated alternatives, and consequences behind a technical choice in a short, focused record that I can easily reference and defend later.

## How to Approach an ADR

Keep each ADR focused on a single architectural decision, like choosing PostgreSQL for the order service rather than covering an entire storage roadmap. If what we are discussing involves multiple separate decisions, split them into individual ADRs.

Before writing anything, make sure the decision is actually settled between us. Never lock in frameworks, databases, queues, or protocols on your own. If there are still open trade-offs or multiple viable approaches we have not agreed on yet, pause and invoke `/align` first so we can weigh 2 or 3 concrete options and reach a clear decision together.

When you write the ADR, ground it in the real constraints of our project, whether those are technical drivers like latency, throughput, and consistency, team factors like operational overhead and familiarity, or business and compliance boundaries. State the final choice in a clear, active voice ("We will use X...") rather than a tentative suggestion. Be thorough about the alternatives we considered and specifically why we rejected them so we do not end up relitigating the same debate months later. Also be honest about the trade-offs: every architectural choice has downsides and operational costs, and I want those documented right alongside the benefits.

## File Placement, Lifecycle, and Format

Always tell me the target file path before you create or update an ADR. Save ADR files under `docs/decisions/adr_NNN_<decision_slug>.md` using snake_case and a 3-digit sequential number (starting at `001` after checking existing files in `docs/decisions/`). Once you create or update the file, add or update its entry in `docs/README.md` so the documentation index stays accurate, and give me a short summary in chat.

Treat accepted ADRs as immutable history. If we later change our minds and replace an old decision, do not delete or rewrite the old ADR. Instead, create a new ADR that links to the old one in `supersedes`, and update the old ADR's `status` and `superseded_by` fields to point to the new record.

Use this frontmatter and section structure so our records stay consistent and easy to read:

```markdown
---
title: "ADR-NNN: [Short Title Describing the Decision]"
type: adr
status: Proposed
date: YYYY-MM-DD
deciders: [Names or Roles]
tags: [architecture, storage, messaging]
parent_prd: null
parent_srs: null
supersedes: null
superseded_by: null
---

# ADR-NNN: [Short Title Describing the Decision]

## Context
Explain the problem, project constraints, and technical or operational forces that triggered this decision. Write this in clear paragraphs rather than a fragmented checklist.

## Decision
State the decision clearly in active voice, including where it applies and its architectural boundaries.

## Alternatives Considered
Walk through the other realistic options we evaluated. For each alternative, explain its strengths, its drawbacks in our context, and the specific reason we decided against it.

## Consequences
Explain what becomes easier or better with this choice, what becomes harder or adds operational overhead, and any risks we need to watch out for along with how we plan to handle them.

## Verification & Related Context
Briefly note how we will keep the codebase aligned with this decision (such as linter rules, tests, or review checks) and link to any superseded ADRs or related PRD/SRS specs if relevant.
```
