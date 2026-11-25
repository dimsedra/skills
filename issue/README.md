# Issue Skill

Convert debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues designed for cold re-orientation with zero active context.

## Install

```bash
npx skills add dimsedra/skills --skill issue
```

## Features

- **Problem-First Framing**: Formulates descriptive, problem-first titles instead of premature solution labels.
- **Flexible, Convention-First Structure**: Follows the repository's existing issue templates and ticketing conventions when present, or adapts sections to fit the ticket type (such as reproduction steps and expected vs actual behavior for bugs).
- **Cold Re-Orientation**: Includes enough context so a maintainer reading it weeks later can understand the problem and act on it without prior chat history.
- **Durable Symbol Pointers**: Uses stable semantic identifiers (`path/to/file` -> `SymbolName()`) instead of rotting line numbers or decaying code block snapshots.
- **Cognitive Slicing**: Splits multi-layer or multi-bug problems into independent, focused tracking issues.
- **Issue Tracker CLI Support**: Formats ready-to-run commands (such as `gh issue create` or `glab issue create`) while requiring explicit user confirmation before remote publishing.

## Example Output

Here is one example of a generated bug report (actual structure adapts to the repository's templates and ticket type):

```markdown
Title: Authentication token expiration bypasses database validation on high-concurrency requests

## Problem
When Redis cache misses occur under high concurrency, parallel requests with expired tokens bypass the database validity check because the fallback lock fails to acquire, allowing unverified tokens to pass through.

## Steps to Reproduce
1. Expire an active user session token in both Redis and the database.
2. Send 20+ concurrent authenticated requests with that token.
3. Observe that requests hitting the fallback path while the lock is held succeed instead of returning 401.

## Expected vs Actual
- Expected: All concurrent requests with an expired token fail with 401 Unauthorized.
- Actual: Requests that fail to acquire the fallback lock skip database validation and pass through.

## Affected Locations
- `src/auth/session_manager.py` -> `SessionManager.validate_token()`
- `src/auth/token_store.py` -> `TokenStore.get_fallback_lock()`
```

## Files Reference

- `SKILL.md`: Framing principles, flexible convention-first structure guidelines, and draft-before-publish workflow.
