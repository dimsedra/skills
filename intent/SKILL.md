---
name: intent
description: Use when capturing, distilling, or refining a documented source of alignment (an Intent document) that records our conversation, human narrative, codebase reality, guiding principles, and boundaries before technical specification.
---

# Intent

When I ask you to draft or refine an Intent document, your goal is not to produce a bureaucratic product requirements document. Your goal is to **crystallize our alignment conversation into a shared, permanent record of intent on disk**.

Conversations in chat evaporate, and models suffer from context drift over time. An Intent document freezes the shared mental model (how both of us picture the system working) so neither of us forgets why we made certain choices, what human experience we are trying to create, and what boundaries we agreed to respect.

## Ground in the Alignment Dialogue First

An Intent document is born out of real conversation (typically starting in `/align`). It should reflect the authentic back-and-forth between us, not a generic template filled with corporate filler.

Before writing or refining an Intent document:
- Pull directly from our discussion: the raw intuition, the frustration with the current state, and the core experience I want to achieve.
- Ground in codebase reality: inspect the actual files, functions, and data structures so our evaluation of the current system is anchored in facts, not guesses.
- Never guess or silently invent product intent on my behalf. If there are unresolved product trade-offs, open scope questions, or competing directions, pause and invoke `/align` first so we settle them together.

## The Core Perspective: Story, Reality, and Principles

Unlike traditional requirements that jump straight into sterile rules ("The system shall..."), an Intent document must be readable in under 30 seconds and tell the story of the change across five clear pillars:

1. **The Origin & Human Narrative**: Start with the human perspective. What triggered this work? What does the user actually experience or feel? Frame the desired outcome as a natural narrative that anyone can digest without technical jargon.
2. **Current Reality & The Gap**: Grounded directly in our codebase. How does the system work today? What architectural patterns or data structures are currently in place? What primitives already exist, and why do they fall short of our intended narrative?
3. **Guiding Principles**: The non-negotiable philosophical anchors and mental models we settled on during discussion (for example: "the reader primarily consumes from the narrative, while technical details remain strictly optional").
4. **Settled Intent & Outcomes**: The concrete behavioral shifts we agree to build toward. Focus on observable outcomes and system responsibilities ("why" and "what"), leaving internal implementation mechanics, database schemas, and micro-contracts to downstream technical specs.
5. **Guardrails & Non-Goals**: Explicit boundaries protecting us from scope creep. Note rabbit holes we discussed and rejected, features deferred for later, and things the system deliberately will not do.

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating an Intent document. Save files at `docs/intent/YYYYMMDD_<feature_slug>.md` in snake_case.

If we revise the intent on a later calendar date, rename the file using `git mv` to match the new date, update `last_updated` in the frontmatter, and update references in `docs/README.md` as well as any downstream technical specs or plans.

Structure the Intent document with clean YAML frontmatter and readable sections:

```markdown
---
title: "Intent: [Feature or Initiative Name]"
type: intent
status: Settled
last_updated: YYYY-MM-DD
---

# Intent: [Feature or Initiative Name]

## Origin & Human Narrative
Explain the spark behind this initiative and the human experience we want to create. Tell the story of what a user or developer encounters, written in natural, chronological language so the intent is immediately obvious to anyone reading it cold.

## Current Reality & The Gap
Explain how the system currently behaves, referencing actual files, data structures, or workflows. Call out what pieces already exist in our engine and what is missing or broken that prevents the intended narrative from happening.

## Guiding Principles
Document the non-negotiable mental models, philosophical rules, or architectural anchors we agreed on during our alignment session. These serve as our decision filter when evaluating technical trade-offs later.

## Settled Intent & Target Outcomes
Describe the concrete capabilities and shifts in behavior that fulfill this intent. Focus on observable outcomes and user impact, keeping implementation details flexible for technical specification.

## Guardrails & Non-Goals
Clearly state what is out of scope. Call out traps, rabbit holes, or adjacent features we explicitly decided not to build during our discussion to prevent scope creep.
```

Once you create or update the file, catalog it in `docs/README.md` and give me a brief summary in chat focusing on the settled mental model and any remaining open questions.
