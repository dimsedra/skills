---
name: audit
description: Use when auditing or reviewing Pull Requests, Merge Requests, or code diffs (e.g. via /audit or natural review requests) to enforce production readiness, specification conformance (PRD/SRS/Plan), performance scalability, TDD rigor, and battle-tested fixes.
---

# Audit

When I ask you to review or audit a Pull Request, Merge Request, or code diff, do not review the code directly in our main conversation thread. Because we have been working together in this session, you already carry context bias. Instead, always spawn an isolated `Code Auditor` subagent so the diff is reviewed with fresh, objective eyes.

## How to Run the Audit

First, make sure the scope of the review is clear. If it is not obvious which branch, commit range, or PR I want audited, ask me before proceeding. Once the target diff is clear, identify the exact list of modified files and check `docs/prd/`, `docs/srs/`, `docs/decisions/`, and `docs/plan/` for any specifications, decisions, or implementation plans related to those changes.

Next, spawn the isolated subagent and give it everything it needs to do a focused review:

- Tell it to read `audit/AUDITOR-INSTRUCTIONS.md` for its review criteria.
- Pass the exact paths to the relevant spec and plan documents in `docs/`.
- Pass the exact list of modified files in the diff, and remind it to strictly follow bounded reading so it does not wander into unrelated repository files.
- Point it to the `Engineering Rules & Directives` in our active harness configuration (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`).

Once the subagent finishes its review and reports back to you, relay the findings to me naturally and transparently in our conversation. Do not just dump a rigid compliance template into chat; walk me through the verdict (`BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`), explain any real bugs, spec deviations, or rule violations clearly, and highlight what needs to be fixed before we can safely merge.
