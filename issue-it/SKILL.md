---
name: issue-it
description: Use when converting a debugging session, bug report, architectural gap, or problem discussion into a clean, user-centered tracking issue.
---

# Issue It

## Overview
Turns debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues designed for someone reading it six weeks later with zero active context. Relies on semantic symbol pointers instead of brittle code dumps, and enforces cognitive slicing to keep issues discrete and actionable.

## When to Use
- Immediately following a debugging session where the root cause was identified but fix deferred
- After an architectural review or discovery of a structural/state gap
- Upon discovering a defect, regression, or edge-case failure during feature development
- When capturing technical debt, unhandled failure modes, or boundary leaks for backlog tracking

## When NOT to Use
- Trivial, 1-line fixes or typos being resolved immediately in the current turn
- Routine personal scratchpad notes or local TODO comments
- Multi-month epic roadmaps or broad milestone-level product planning (use dedicated planning skills instead)

## Quick Reference

| Gate | Action | Key Rule |
|------|--------|----------|
| **Gate 1: Target Resolution & Context Slicing** | Resolve scope from arguments or chat; split multi-layer problems | If 3+ unfamiliar files, dispatch research subagent; slice independent concerns into separate sub-issues |
| **Gate 2: Issue Draft Generation** | Format according to schema (Problem-First title, context, defect, pointers) | Durable symbol pointers only (`path/to/file` -> `SymbolName()`); strictly NO code blocks or line numbers |
| **Gate 3: User Confirmation & Publishing** | Present drafted issue in chat; offer `gh issue create` CLI snippet | NEVER publish to GitHub/tracker without explicit user approval |

## Core Pattern

### ❌ Bad Issue (Monolithic & Brittle)
```markdown
Title: Fix auth.ts and update database query

We need to rewrite auth.ts line 45-62 because when users login:
```typescript
const user = await db.query("SELECT * FROM users WHERE id = " + req.userId);
if (!user.token) {
  throw new Error("Invalid");
}
```
Also we should fix the payment webhook timeout in billing.ts and refactor redis caching.
```
*Why it fails: Solution-first title, no system context for cold re-orientation, brittle raw line numbers, decaying code snippet dump, crammed unrelated concerns.*

### ✅ Good Issue (Context-Framed & Durable)
```markdown
Title: Authentication token expiration bypasses database validation on high-concurrency requests

## Context
The session management subsystem validates inbound user session tokens against Redis cache with a database fallback for expired cache entries.

## Problem Description
When Redis cache misses occur under high concurrency, parallel requests with expired tokens bypass the database validity check because the fallback lock fails to acquire, allowing unverified tokens to pass through.

## Affected Locations
- `src/auth/session_manager.py` -> `SessionManager.validate_token()`
- `src/auth/token_store.py` -> `TokenStore.get_fallback_lock()`

## Proposed Direction
Implement a distributed mutex around database fallback verification and return an explicit unauthorized state on lock contention timeout.
```
*Why it works: Problem-first title, 1-2 sentence high-level re-orientation, localized defect, durable symbol pointers, high-level fix strategy without decaying code snippets.*

## Execution Lifecycle (Phase Gates)

### Gate 1: Target Resolution & Context Slicing
1. **Target Identification**:
   - **Explicit Argument**: If provided (e.g. `/issue-it memory leak in worker thread` or `/issue-it src/auth/token.ts`), target that specific problem, file, or architectural component.
   - **Active Chat Context / Recent Diff**: If invoked without arguments after debugging or code review, synthesize the core failure condition directly from the active conversation context.
   - **Ambiguous Scope**: If the problem is ambiguous, ask the user in one short sentence to clarify the failure condition.
2. **Context Exploration Scope**:
   - **Inline Execution**: Synthesize directly in the main conversation if context derives from the immediate chat or 1–2 familiar files.
   - **Research Subagent**: Dispatch a `research` subagent if 3+ unfamiliar files or broad codebase exploration is needed, keeping the main context clean.
3. **Cognitive Slicing**:
   - Check if the issue spans multiple independent system layers, repositories, or distinct failure modes.
   - If multiple concerns exist, slice them into discrete, independent sub-issues rather than packing a single monolithic issue.

### Gate 2: Issue Draft Generation
Construct the issue body strictly following the schema in [ISSUE-FORMAT.md](ISSUE-FORMAT.md):
1. **Problem-First Title**: State what breaks or is missing, not the proposed implementation. Skimmable in a backlog.
2. **Big-Picture Context**: 1–2 high-level framing sentences for cold re-orientation.
3. **Localized Problem**: Specific failure mechanics, triggers, and operational impact.
4. **Affected Locations**: File paths and durable symbol pointers (`path/to/file.ext` -> `SymbolName()`). Strictly no code blocks or line numbers.
5. **Fix Direction (Optional)**: High-level architectural approach and boundaries only. No code snippets or pseudo-code.

### Gate 3: User Confirmation & Tracker Publishing
1. Present the drafted issue (or sliced sub-issues) clearly in the chat for user review.
2. Provide the optional GitHub CLI (`gh issue create`) command formatted for easy execution.
3. If publishing directly via CLI or API, ALWAYS request explicit user confirmation before running the creation command.

## Discipline & Rationalization Counters

| Excuse | Reality |
|---|---|
| *"Printing 'Gate 1 / Gate 2' headers in the response looks organized."* | Meta-labels clutter the chat. Present the drafted issue directly using the clean markdown schema. |
| *"A code snippet makes the problem clearer."* | Code snippets rot immediately as surrounding code shifts. Durable symbol pointers survive refactors. |
| *"Line numbers are fast to find."* | Line numbers become stale after a single commit. Use symbol pointers (`ClassName.method()`). |
| *"A solution-first title tells what to do."* | Solution-first titles hide the underlying failure condition and bias future developers toward premature fixes. |
| *"It's easier to put everything in one issue."* | Monolithic issues create cognitive overload and stall execution. Slicing creates focused, deliverable units. |
| *"The user asked to issue it, so I can publish directly."* | Drafting and publishing are distinct. Always confirm before creating remote tracker artifacts. |

## Red Flags - STOP and Reset

- 🚩 Printing internal Gate labels (e.g. `### Gate 2: Issue Draft`) in user output
- 🚩 Fenced code blocks in the issue body
- 🚩 Raw line numbers used as primary references (e.g., `auth.ts:45-62`)
- 🚩 Solution-first title (e.g., `Add caching to session store`)
- 🚩 Monolithic issue combining unrelated system layers or multiple distinct bugs
- 🚩 Publishing to GitHub CLI (`gh issue create`) or issue tracker without explicit user confirmation
- 🚩 Omitting the high-level context section and jumping straight into micro-details

**If any red flag occurs: STOP. Reset the draft to follow [ISSUE-FORMAT.md](ISSUE-FORMAT.md) with durable symbol pointers and problem-first framing.**

## Flat References

- [ISSUE-FORMAT.md](ISSUE-FORMAT.md): Structural rationale, standard markdown schema, GitHub CLI publishing snippet, and concrete archetype examples (Bug Report, State/Architectural Gap, Security/Auth Boundary).
