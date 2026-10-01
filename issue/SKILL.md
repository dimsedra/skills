---
name: issue
description: Use when converting a debugging session, bug report, architectural gap, or problem discussion into a clean, user-centered tracking issue.
---

# Issue

When I ask you to track or turn a problem, bug, architectural gap, or debugging findings into an issue (e.g. via `/issue` or natural requests), handle it using these instructions:

## How I Want Issues Drafted

1. **Problem-First, Not Solution-First**:
   - Title must state what is broken, failing, or missing—not your speculative fix (e.g., `Authentication token expiration bypasses database validation on high-concurrency requests`, not `Fix auth.ts and add locking`).
   - Frame the issue so that anyone reading it weeks later with zero active context can immediately orient themselves.

2. **Durable Symbol Pointers (No Decaying Code Dumps)**:
   - Identify affected locations using durable symbol paths: `path/to/file.ext` -> `ClassName.method()`.
   - Never paste large blocks of code or volatile line numbers that become obsolete after a single commit.

3. **Cognitive Slicing (No Monolithic Issues)**:
   - If the problem spans multiple distinct layers, independent subsystems, or separate bugs, slice them into focused, individual sub-issues rather than packing everything into one bloated issue.

4. **Honest Fix Direction & Discussion**:
   - Outline the high-level architectural direction and boundaries.
   - For bugs or regressions, explicitly note testing expectations (unit, integration, or regression suites).
   - If the solution requires team consensus or trade-offs, state clearly that the direction is open for discussion and list the key trade-offs/options. Do not hallucinate or guess a premature fix.

5. **Confirmation Before Publishing**:
   - Present the clean markdown draft in chat first for my review.
   - Provide the optional GitHub CLI command (`gh issue create ...`).
   - NEVER publish or create remote tracker issues automatically without my explicit confirmation.

## Execution Steps

1. **Target Identification**:
   - If I provide arguments (e.g. `/issue memory leak in worker`), target that problem.
   - If invoked without arguments after a debugging or review discussion, synthesize the core failure condition directly from our active conversation context. If scope is ambiguous, ask me one clarifying question.
   - If you need to explore 3+ unfamiliar files across the codebase, dispatch a `research` subagent to keep our main chat clean.

2. **Drafting the Issue**:
   Structure the draft cleanly using this markdown schema:
   - **Title**: Problem-first statement.
   - **Context**: 1–2 high-level sentences for cold re-orientation.
   - **Problem Description**: Concrete failure mechanics, triggers, and operational impact.
   - **Affected Locations**: File paths and durable symbol references (`file` -> `Symbol()`).
   - **Proposed Direction**: High-level fix approach, testing expectations, or key trade-offs open for discussion.

3. **Review & Hand-off**:
   - Present the draft directly in chat (do not clutter with internal meta-labels like "Gate 1/Gate 2").
   - Offer the `gh issue create` CLI snippet, and wait for my review.
