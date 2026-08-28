# Issue It Skill

Convert debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues designed for cold re-orientation with zero active context.

## Install

```bash
npx skills add dimsedra/skills --skill issue-it
```

## Features

- **Problem-First Framing**: Formulates descriptive, problem-first titles instead of premature solution labels.
- **Cold Re-Orientation Context**: Includes 1–2 high-level system context sentences so anyone can understand the issue weeks later.
- **Durable Symbol Pointers**: Uses stable semantic identifiers (`path/to/file` -> `SymbolName()`) instead of rotting line numbers or decaying code block snapshots.
- **Cognitive Slicing**: Splits multi-layer or multi-bug problems into independent, focused tracking issues.
- **GitHub CLI Integration**: Formats ready-to-run `gh issue create` commands while requiring explicit user confirmation before remote publishing.

## Example Output

Here is what a generated issue looks like:

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

## Files Reference

- `SKILL.md`: Core invariants, phase gates (Target Resolution, Draft Generation, Confirmation), rationalization counters, and guardrails.
- `ISSUE-FORMAT.md`: Standard markdown issue schema, GitHub CLI publishing snippet, and archetype examples (Bug Report, Architectural Gap, Security Boundary).
