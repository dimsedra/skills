---
name: issue
description: Use when converting a debugging session, bug report, architectural gap, or problem discussion into a clean, user-centered tracking issue.
---

# Issue

When I ask you to turn a bug, architectural gap, or debugging session into a tracking issue, write it so that anyone reading it weeks later with zero context can immediately understand what is broken and why it matters.

## How to Frame an Issue

Always frame the issue around the problem, not a speculative solution. The title should clearly state what is failing or missing (for example, "Authentication token expiration bypasses database validation on high-concurrency requests") rather than how you think we should code the fix ("Fix auth.ts and add locking"). If the problem we found actually spans multiple separate bugs or independent subsystems, split them into individual issues instead of cramming everything into one giant ticket.

When pointing to the codebase, use stable symbol paths (`path/to/file.ext` -> `ClassName.method()`) instead of pasting large code blocks or volatile line numbers that will go stale after a few commits.

In the proposed direction section, outline the high-level approach, boundary changes, and testing expectations (such as regression or integration tests). If the fix is not obvious yet or involves architectural trade-offs that need discussion, say so openly and list the options rather than guessing a premature solution.

## Workflow and Issue Format

If I give you a specific topic (like `/issue memory leak in worker`), focus on that. If I invoke `/issue` without arguments after we just finished debugging or reviewing code, pull the failure details directly from our conversation. Ask me a quick clarifying question if the scope is unclear, and if you need to inspect 3 or more unfamiliar files to trace the problem, spawn a `research` subagent so our main chat stays clean.

Draft the issue using this structure:

```markdown
Title: [Problem-first statement of what is broken or missing]

## Context
1 or 2 sentences explaining where this subsystem fits in the bigger picture so a reader coming in cold can orient themselves.

## Problem Description
Explain what breaks, what triggers it, and the concrete impact on the system or users.

## Affected Locations
- `path/to/file.ext` -> `SymbolName()`
- `path/to/another_file.ext` -> `ClassName.methodName()`

## Proposed Direction
Outline the high-level fix strategy and testing expectations, or note that the approach is open for discussion along with the key trade-offs to weigh.
```

Show me the markdown draft in chat first and wait for my confirmation. If our project uses an issue tracker CLI (such as `gh issue create`, `glab issue create`, or whatever tool we use for the repository), include the ready-to-run command or offer to publish it once I approve. Never create or publish an issue to a remote tracker automatically without my confirmation.
