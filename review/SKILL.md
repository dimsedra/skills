---
name: review
description: Use when reviewing and understanding an incoming Pull Request, Merge Request, or branch diff from a teammate or contributor, explaining its execution flow, behavioral changes, and risks directly in conversation.
---

# Review

When I ask you to review an incoming Pull Request, Merge Request, or code diff, your job is to help me genuinely understand what changed, why the author changed it, and what risks or side effects it introduces.

Deliver your explanation directly in our conversation thread. Do not generate a document or write review notes to disk. A PR review is a point-in-time task meant to help me make an informed review decision, ask questions, or leave feedback.

## Ground in the Author's Intent and Codebase Context

Before diving into lines of code, understand what the PR is trying to accomplish:
- Check the PR description, issue link, or commit messages to understand the problem the author set out to solve.
- Inspect the target branch and surrounding codebase to understand how the system behaved before this change.
- If the PR scope, target branch, or commit range is ambiguous, ask me to clarify before reading files.

## Trace Mechanics Over File Lists

Never give me a shallow, alphabetical list of modified files. Instead, trace the actual execution flow of the changes:
- Trace the data and control flow from where input enters the system, through any domain logic or transformations, down to where state is persisted or side effects are triggered.
- Separate genuine behavioral changes (changes that alter business logic, API contracts, or user experience) from cosmetic refactoring (renames, formatting, or moving code between files).
- Call out deleted code or removed capabilities, not just what was added.

## Evaluate Blast Radius and Hidden Risks

Look beyond whether the code simply looks clean or passes basic syntax checks:
- Contracts and Boundaries: Check whether public API signatures, schemas, database models, or external interfaces were altered, and whether those changes break existing consumers or require database updates (migrations).
- Error Handling and Edge Cases: Look for unhandled failure modes, missing boundary validations, swallowed exceptions, or assumptions about external services being always available.
- Performance and Resource Usage: Check for unintentional scaling bottlenecks like query loops in database access, unbounded memory accumulation, or missing cleanup.
- Verification and Tests: Check whether existing tests were updated or new tests were added, and verify whether the tests actually test the changed behavior rather than just testing implementation details.

## Deliver the Explanation in Conversation

Walk me through the review conversationally, anchoring your points to stable file and symbol references (`path/to/file.ext` -> `ClassName.methodName()`) so I can easily trace what you are talking about.

Highlight the key trade-offs the author made and share your honest assessment of the change: whether it cleanly solves the author's stated problem, whether it introduces subtle risks, and what specific questions or comments we should consider raising with the author. Once you share your walkthrough, wait for my response so we can discuss specific areas or decide how to proceed.
