---
name: audit
description: Use when auditing or reviewing Pull Requests, Merge Requests, or code diffs (e.g. via /audit or natural review requests) to enforce specification conformance (PRD/SRS/Plan), runtime resilience, security, scalability, and code quality with TDD rigor via isolated subagents.
---

# Audit

When I ask you to review or audit a Pull Request, Merge Request, or code diff, do not review the code directly in our main conversation thread. Because we have been working together in this session, you already carry context bias. Instead, always delegate the review to isolated auditor subagents so the diff is inspected with fresh, objective eyes.

Rather than forcing a single subagent to check everything at once, we split the audit into three focused subagents, each with its own evaluation lens:

1. `Spec Auditor` (`SPEC-AUDITOR.md`): Checks whether the code builds the exact requirements and contracts we agreed on in `docs/prd/`, `docs/srs/`, `docs/decisions/`, and `docs/plan/`, with no missing requirements and no unrequested scope creep.
2. `Resilience Auditor` (`RESILIENCE-AUDITOR.md`): Checks whether the implementation logic holds up in the real world across edge cases, core domain invariants, security vulnerabilities, race conditions, and scaling bottlenecks like N+1 queries.
3. `Quality Auditor` (`QUALITY-AUDITOR.md`): Checks whether the implementation and its test suite follow our `Engineering Rules & Directives`, including deep modules, locality of behavior, fail-fast boundary parsing, rethinking the core model instead of adding special-case `if` patches, flat control flow, and behavior-driven public API testing.

## Preparing the Context for Every Subagent

A subagent starts completely blind to our session history and does not know where your skills are installed on disk. Never pass relative skill paths like `audit/RESILIENCE-AUDITOR.md`, and never paraphrase the auditor instructions inside your prompt as a substitute for the subagent reading the file itself.

Before spawning any auditor subagent, resolve the exact full paths on disk and include all four of these in every subagent prompt ( across Stage 1, Stage 2, and Stage 3 alike):

1. The full absolute path to the auditor instruction file inside the directory where this skill is located (for example, `/home/user/.gemini/config/skills/audit/SPEC-AUDITOR.md` or `/home/user/.config/opencode/skills/audit/SPEC-AUDITOR.md`), instructing the subagent to read that file first before doing anything else.
2. The exact `git diff` command or commit range to inspect (for example, `git diff a1b2c3d..f4e5d6c` or `git diff main...HEAD`) along with the full absolute paths to all modified implementation and test files in the target repository.
3. The full absolute paths to the relevant specification and plan documents in the project's `docs/` directory (`docs/prd/`, `docs/srs/`, `docs/decisions/`, and the active `docs/plan/` file) so every auditor understands the intended domain contracts, invariants, and planned scenarios directly from the source of truth rather than guessing from a summary.
4. The full absolute path to our `Engineering Rules & Directives` (`/home/user/.gemini/GEMINI.md` or `/home/user/.config/opencode/AGENTS.md`).

Remind every subagent you spawn to strictly follow bounded file reading: it must run the assigned `git diff` command and read only the assigned instruction, specification, and code files without wandering across unrelated parts of the repository.

## How to Run the Audit

First, make sure the scope of the review is clear. If it is not obvious which branch, commit range, or PR I want audited, ask me before proceeding.

If I explicitly ask you to run only one or a specific combination of these auditors (for example, just checking spec compliance, or running resilience and code quality after a bug fix), spawn only the subagents I asked for.

If I invoke `/audit` after finishing an implementation plan or ask for a full review without narrowing it down, run the three stages sequentially as strict resolve-before-advancing gates. Never collect findings from one stage, leave them unfixed, and move on to the next stage just to pile up more findings:

1. Stage 1 (`Spec Auditor`): Spawn the `Spec Auditor` first, because there is no point tuning performance or polishing code style if we built the wrong thing. Walk me through its findings in chat. If it reports any spec deviations, missing requirements, or scope creep, stop and resolve those issues with me first until spec compliance is completely clean before moving to Stage 2.
2. Stage 2 (`Resilience Auditor`): Only after Stage 1 is fully resolved, spawn the `Resilience Auditor` against the updated diff, because fixing an unhandled edge case, broken invariant, race condition, or security flaw will change the shape of the implementation code. Walk me through its findings, and if any resilience, security, or scaling issues are found, resolve them completely before moving to Stage 3.
3. Stage 3 (`Quality Auditor`): Only after both spec compliance and runtime resilience are resolved and solid, spawn the `Quality Auditor` against the latest diff to verify our engineering and testing rules across both the implementation and the test suite, and resolve any remaining quality or TDD violations until the code is ready to merge.

At the end of each stage, relay the subagent's findings naturally and transparently in chat rather than dumping a rigid template. Explain the verdict (`BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`), walk through any real bugs, spec deviations, or rule violations clearly, and make sure the current stage is 100% resolved and confirmed by me before spawning the next auditor.
