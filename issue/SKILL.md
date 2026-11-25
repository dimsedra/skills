---
name: issue
description: Use when converting a debugging session, bug report, architectural gap, or problem discussion into a clean, user-centered tracking issue, whether explicitly invoked or when logging a deferred bug or gap for later work is the clearest next step.
---

# Issue

When I ask you to turn a bug, architectural gap, or debugging session into a tracking issue, write it so a maintainer reading it weeks later with zero context can immediately understand what is happening, why it matters, and what they need to act on it.

## How to Frame an Issue

Always frame the issue around the problem, not a speculative solution. The title should clearly state what is failing or missing (for example, "Authentication token expiration bypasses database validation on high-concurrency requests") rather than how you think we should code the fix ("Fix auth.ts and add locking"). If the problem we found actually spans multiple separate bugs or independent subsystems, split them into individual issues instead of cramming everything into one giant ticket.

When pointing to the codebase, use stable symbol paths (`path/to/file.ext` -> `ClassName.method()`) instead of pasting large code blocks or volatile line numbers that will go stale after a few commits.

When a proposed direction helps, keep it high-level (boundary changes, testing expectations, or key trade-offs to weigh). If the fix is not obvious yet, say so openly rather than prescribing a premature solution.

## Structure and Project Conventions

Do not lock every issue into one fixed template. Prioritize whatever structure makes the issue easiest for maintainers to understand and act on.

Check for existing project conventions first (such as `.github/ISSUE_TEMPLATE/`, `.gitlab/issue_templates/`, contributing guides, or recent issues in the tracker) and follow them when present.

When the project has no set template, pick only the sections that fit the ticket:
- For bug reports, include what a maintainer needs to reproduce and verify the failure, such as steps to reproduce, expected vs actual behavior, relevant environment or version details, and concrete error output.
- For architectural gaps, tech debt, or enhancements, focus on brief cold-reader context, the concrete gap and impact, affected locations, and open trade-offs or direction.
- Skip any section that adds noise rather than clarity.

## Workflow

If I give you a specific topic (like `/issue memory leak in worker`), focus on that. If I invoke `/issue` without arguments after we just finished debugging or reviewing code, pull the failure details directly from our conversation. Ask me a quick clarifying question if the scope is unclear, and if you need to inspect 3 or more unfamiliar files to trace the problem, spawn a `research` subagent so our main chat stays clean.

Show me the markdown draft in chat first and wait for my confirmation. If our project uses an issue tracker CLI (such as `gh issue create`, `glab issue create`, or whatever tool we use for the repository), include the ready-to-run command or offer to publish it once I approve. Never create or publish an issue to a remote tracker automatically without my confirmation.
