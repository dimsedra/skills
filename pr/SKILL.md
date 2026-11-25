---
name: pr
description: Use when creating or updating a pull request (or merge request) from branch changes, turning the actual diff, commits, and verification into a clear, reviewer-ready PR description, whether explicitly invoked or when opening a PR is the clearest next step.
---

# Pull Request

When I ask you to create or update a pull request (or merge request), write it so a reviewer coming in cold can immediately understand why this change exists, what actually changed, and how it was verified.

## Ground in the Real Diff

Never draft a PR from memory or chat summaries alone. Inspect the actual git state first:
- Check the current branch, target base branch, commit log, and full diff against the base branch (`git diff <base>...HEAD`).
- Check any linked issues, tickets, or existing PR description if we are updating an open PR.
- If there are uncommitted changes or unpushed commits, flag that plainly instead of silently committing or rewriting git history. This skill focuses strictly on drafting and creating or updating the PR itself.

## How to Frame a PR

Lead with the problem or goal, not a file-by-file changelog. A reviewer can already see the file list in the diff; what they need from the description is the "why", the high-level behavioral change, and anything non-obvious they should pay attention to (such as schema migrations, config changes, breaking boundaries, or intentional trade-offs).

Keep the title short, specific, and matched to the repository's commit or PR title convention (for example, conventional commits if the repo uses them).

Be honest about verification: state what was actually tested or verified (commands run, manual or visual checks) and call out anything that was not tested yet. Never fabricate passing checks or claim coverage that was not run.

## Structure and Project Conventions

Do not force every PR into one fixed template. Prioritize whatever structure makes the PR easiest for reviewers to scan and evaluate.

Check for existing project conventions first (such as `.github/PULL_REQUEST_TEMPLATE.md`, `.github/PULL_REQUEST_TEMPLATE/`, `.gitlab/merge_request_templates/`, contributing guides, or recent merged PRs) and follow them when present.

When the project has no set template, pick only the sections that fit the change:
- Why this change is needed (context, problem, or linked issue).
- What changed at a behavioral or architectural level.
- How it was verified (tests run, screenshots for UI changes, or manual checks).
- Review notes, risks, or rollout steps when relevant (migrations, feature flags, follow-up work).
- Skip any section that adds noise rather than clarity.

## Workflow

If I invoke `/pr` with a target base branch or specific focus (like `/pr against release`), follow that. If I invoke `/pr` without arguments, infer the base branch from the repo's default branch (or ask me quickly if the target branch is ambiguous). If updating an existing PR, read its current title and body first so you preserve useful context and linked tickets while bringing it up to date with the latest diff.

Show me the draft PR title and markdown body in chat first and wait for my confirmation. Once I approve, publish or update it using the project's PR tool or CLI (such as `gh pr create`, `gh pr edit`, `glab mr create`, or the active PR MCP tool), or provide the ready-to-run command if no tool is available. Never create, push, or update a remote PR automatically without my confirmation.
