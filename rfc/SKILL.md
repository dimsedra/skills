---
name: rfc
description: Use when authoring, reviewing, or iterating on an engineering Request for Comments (RFC) to propose significant technical changes, align cross-functional stakeholders, and achieve team consensus before building.
---

# RFC (Request for Comments)

When I ask you to draft or refine an RFC, your goal is to help me write a clear, audience-aware document that fits the exact reason we are writing it—whether that is clarifying ambiguous policies with stakeholders, requesting permission to touch restricted infrastructure, or proposing a technical architecture for team consensus.

## Start with the Intent and the Audience

Do not force every RFC into a monolithic engineering template. First, figure out what this specific RFC is trying to accomplish and who will be reading it:

- Policy or business inquiry: When rules, legal boundaries, or workflows are unclear and no technical solution exists yet. The goal is to get clear answers and decisions from stakeholders.
- Permission or authority request: When we need sign-off from tech leads, DevOps, or security to modify restricted files, pipelines, or server configs with a controlled blast radius.
- Technical or architectural proposal: When we are proposing a concrete engineering design, migration, or API contract and want team critique and consensus.

Keep in mind that many stakeholders have high organizational impact but very little interest in low-level code mechanics. Match the depth of the writing to the reader. When writing for management, department leads, or cross-functional reviewers, keep the main narrative focused on operational reality, and keep raw code snippets, JSON payloads, or file lists out of the main body (put them in an Appendix if needed).

When we need input from business or operational stakeholders, remember the division of roles: their only job is to describe how they want their operational or bureaucratic workflow to run from upstream to downstream, and our job is to read their narrative and infer the technical architecture from it. Do not box them into premature multiple-choice checkboxes or ask them to make system design calls. Instead, use guided open-ended questions (leading prompts) that walk them through concrete scenarios from start to finish, helping them naturally narrate the full flow, hand-offs, and edge-case rules in their own words.

If the intent, target audience, or right mix of sections is not obvious from my prompt, do not guess—pause and invoke `/align` with me first. Propose a quick section outline based on what we are trying to achieve, and wait for my confirmation so we do not generate unnecessary paperwork.

## Assemble Sections Modularly

Treat RFC sections as modular building blocks and only include the ones that serve our goal. Every RFC should have consistent YAML frontmatter, a brief summary (TL;DR), the problem statement and background context, and a review/decision log. Beyond that, pick only what fits:

- For a policy inquiry: Include guided open-ended questions that prompt stakeholders to narrate their desired end-to-end workflow, along with any operational risks, and completely omit sections like "Proposed Architecture" or "Alternatives Considered" since we are gathering their operational story first before inferring a technical build.
- For a permission request: Include the exact scope of permission requested, the authority choices, a minimal low-risk action plan, and an appendix of affected files or configs.
- For a technical proposal: Include goals and non-goals, the proposed architecture, alternatives considered (and why they were rejected), cross-cutting concerns (security, rollout, rollback), and open risks.

Use this frontmatter structure at the top of the file:

```markdown
---
title: "RFC-NNN: [Short Title]"
type: rfc
status: Draft
author: [Name or Role]
reviewers: [Names or Roles]
created_date: YYYY-MM-DD
review_deadline: YYYY-MM-DD
parent_prd: null
supersedes: null
superseded_by: null
---
```

## File Placement, Lifecycle, and Indexing

Always tell me the target file path before creating or updating an RFC. Save RFCs at `docs/rfc/rfc_NNN_<proposal_slug>.md` in snake_case using a 3-digit sequential number (starting at `001` after checking existing files in `docs/rfc/`). Track the document's lifecycle through its `status` field (`Draft`, `In-Review`, `Accepted`, `Rejected`, or `Superseded`).

Once you create or update the RFC, add or update its entry in `docs/README.md` and give me a short summary in chat covering the core intent, the key questions or decisions for reviewers, and the next steps.
