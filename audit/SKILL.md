---
name: audit
description: Use when stress-testing a draft Blueprint before user handoff (during /blueprint) or when auditing Pull Requests, Merge Requests, and code diffs (via /audit, /ship, or natural review requests) via isolated subagents.
---

# Audit

When you audit a draft Blueprint or a code diff, never review your own work directly in our main conversation thread. Because we have been working together in this session, you already carry context bias. Always delegate the audit to isolated subagents so the design or code is inspected with fresh, objective eyes.

This skill covers two stages of our workflow:

1. **Blueprint Audit (Before Implementation):**
   - `Blueprint Auditor` (`BLUEPRINT-AUDITOR.md`): Stress-tests a draft Blueprint (`docs/blueprint/`) before it is handed to me, checking Intent fidelity, state machines, edge cases, failure recovery, alignment with real codebase files, deep module boundaries, and verification methods.
2. **Code Diff Audit (After Implementation):**
   - `Spec Auditor` (`SPEC-AUDITOR.md`): Checks whether the written code builds the exact requirements and contracts we agreed on in `docs/intent/`, `docs/blueprint/`, and `docs/decisions/`, with no missing requirements and no unrequested scope creep.
   - `Resilience Auditor` (`RESILIENCE-AUDITOR.md`): Checks whether the implementation logic holds up in the real world across edge cases, core domain invariants, security vulnerabilities, race conditions, and scaling bottlenecks like N+1 queries.
   - `Quality Auditor` (`QUALITY-AUDITOR.md`): Checks whether the implementation and its test suite follow our `Engineering Rules & Directives`, including deep modules, locality of behavior, fail-fast boundary parsing, rethinking the core model instead of adding special-case `if` patches, flat control flow, and behavior-driven public API testing.

## Preparing the Context for Every Subagent

A subagent starts completely blind to our session history and does not know where your skills are installed on disk. Never pass relative skill paths like `audit/RESILIENCE-AUDITOR.md`, and never paraphrase the auditor instructions inside your prompt as a substitute for the subagent reading the file itself.

Before spawning any auditor subagent, resolve the exact full paths on disk and include all of these in the subagent prompt:

1. The full absolute path to the auditor instruction file inside the directory where this skill is located (for example, `/home/user/.gemini/config/skills/audit/BLUEPRINT-AUDITOR.md` or `/home/user/.gemini/config/skills/audit/SPEC-AUDITOR.md`), instructing the subagent to read that file first before doing anything else.
2. For **Code Diff Audits**, the exact `git diff` command or commit range to inspect along with the full absolute paths to all modified implementation and test files. For **Blueprint Audits**, the full absolute paths to the existing codebase files that the Blueprint touches or integrates with, plus the full path to `method/SKILL.md` and a brief changelog of prior audit passes (on Pass 2 and later).
3. The full absolute paths to the relevant Intent, Blueprint, and ADR documents in the project's `docs/` directory (`docs/intent/`, `docs/blueprint/`, and `docs/decisions/`, plus `docs/design/brand.md` when UI is involved) so every auditor reads the source of truth directly.
4. The full absolute path to our `Engineering Rules & Directives` (`/home/user/.gemini/GEMINI.md` or `/home/user/.config/opencode/AGENTS.md`).

Remind every subagent you spawn to strictly follow bounded file reading: it must read only the assigned instruction, specification, and code files without wandering across unrelated parts of the repository.

## How to Run a Blueprint Audit

When drafting or substantially revising a Blueprint in `/blueprint` (or when I ask you to audit a Blueprint directly):

1. Spawn the `Blueprint Auditor` subagent (`BLUEPRINT-AUDITOR.md`) against the draft Blueprint on disk.
2. If the auditor reports any `BLOCKER (INTENT_GAP)` where the Intent itself is ambiguous or missing a product decision that belongs to me, stop the loop immediately and invoke `/align` with me rather than guessing an answer.
3. If the auditor returns `BLOCKED` with real design defects (`BLOCKER (DESIGN_DEFECT)`), fix the contracts in the Blueprint file and spawn a new `Blueprint Auditor` pass. On Pass 2 and every subsequent pass, include a brief changelog of what previous passes flagged and what you changed in the Blueprint so the subagent can verify how the fixes interact without ping-ponging.
4. **When to stop (avoid diminishing returns):** Only re-run the auditor when a pass returned `BLOCKED` and required structural changes to the contracts. As soon as a pass returns `CLEAN & READY`, or returns `NEEDS POLISH` with zero `BLOCKER` items (only minor `ADVISORY` notes), apply any worthwhile polish directly to the Blueprint and stop the audit loop immediately without spawning another pass.

## How to Run a Code Diff Audit

First, make sure the scope of the review is clear. If it is not obvious which branch, commit range, or PR I want audited, ask me before proceeding.

If I explicitly ask you to run only one or a specific combination of these auditors (for example, just checking spec compliance, or running resilience and code quality after a bug fix), spawn only the subagents I asked for.

If I invoke `/audit` after delivering `/proof` or ask for a full review without narrowing it down, run the three stages sequentially as strict resolve-before-advancing gates. Never collect findings from one stage, leave them unfixed, and move on to the next stage just to pile up more findings:

1. Stage 1 (`Spec Auditor`): Spawn the `Spec Auditor` first, because there is no point tuning performance or polishing code style if we built the wrong thing. Walk me through its findings in chat. If it reports any spec deviations, missing requirements, or scope creep, stop and resolve those issues with me first until spec compliance is completely clean before moving to Stage 2.
2. Stage 2 (`Resilience Auditor`): Only after Stage 1 is fully resolved, spawn the `Resilience Auditor` against the updated diff, because fixing an unhandled edge case, broken invariant, race condition, or security flaw will change the shape of the implementation code. Walk me through its findings, and if any resilience, security, or scaling issues are found, resolve them completely before moving to Stage 3.
3. Stage 3 (`Quality Auditor`): Only after both spec compliance and runtime resilience are resolved and solid, spawn the `Quality Auditor` against the latest diff to verify our engineering and testing rules across both the implementation and the test suite, and resolve any remaining quality or TDD violations until the code is ready to merge.

At the end of each stage, relay the subagent's findings naturally and transparently in chat rather than dumping a rigid template. Explain the verdict (`BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`), walk through any real bugs, spec deviations, or rule violations clearly, and make sure the current stage is 100% resolved and confirmed by me before spawning the next auditor.
