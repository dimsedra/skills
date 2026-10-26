---
name: audit
description: Use when auditing or reviewing Pull Requests, Merge Requests, or code diffs (e.g. via /audit or natural review requests) to enforce specification conformance (PRD/SRS/Plan), runtime resilience, security, scalability, and code quality with TDD rigor via isolated subagents.
---

# Audit

When I ask you to review or audit a Pull Request, Merge Request, or code diff, do not review the code directly in our main conversation thread. Because we have been working together in this session, you already carry context bias. Instead, always delegate the review to isolated auditor subagents so the diff is inspected with fresh, objective eyes.

Rather than forcing a single subagent to check everything at once, we split the audit into three focused subagents, each with its own instructions and domain boundary:

1. `Spec Auditor` (`audit/SPEC-AUDITOR.md`): Checks whether the code builds the exact requirements and contracts we agreed on in `docs/prd/`, `docs/srs/`, `docs/decisions/`, and `docs/plan/`, with no missing requirements and no unrequested scope creep.
2. `Resilience Auditor` (`audit/RESILIENCE-AUDITOR.md`): Checks whether the implementation logic holds up in the real world across edge cases, core invariants, security vulnerabilities, race conditions, and scaling bottlenecks like N+1 queries.
3. `Quality Auditor` (`audit/QUALITY-AUDITOR.md`): Checks whether the implementation and its test suite follow our `Engineering Rules & Directives`, including deep modules, locality of behavior, fail-fast boundary parsing, flat control flow, and behavior-driven public API testing.

## How to Run the Audit

First, make sure the scope of the review is clear. If it is not obvious which branch, commit range, or PR I want audited, ask me before proceeding.

If I explicitly ask you to run only one or a specific combination of these auditors (for example, just checking spec compliance, or running resilience and code quality after a bug fix), spawn only the subagents I asked for.

If I invoke `/audit` after finishing an implementation plan or ask for a full review without narrowing it down, run the three stages sequentially one by one:

Start with the `Spec Auditor`, because there is no point optimizing performance or polishing code style if we built the wrong thing. Give it `audit/SPEC-AUDITOR.md`, the exact paths to the relevant PRD, SRS, ADR, and plan documents in `docs/`, and the list of modified implementation files in the diff.

Next, run the `Resilience Auditor`, because fixing an unhandled edge case, race condition, or security flaw will change the shape of the implementation code. Give it `audit/RESILIENCE-AUDITOR.md` and the list of modified implementation files in the diff.

Finally, once spec compliance and runtime logic are solid, run the `Quality Auditor` to verify our engineering and testing rules. Give it `audit/QUALITY-AUDITOR.md`, the path to our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`), and the list of modified implementation and test files in the diff.

Remind every subagent you spawn to strictly follow bounded file reading so it only reads the files you assigned and never wanders across the repository.

In sequential mode, pause after each subagent finishes and walk me through its findings naturally and transparently in chat before moving on to the next stage. Do not dump a rigid template into our conversation; explain the verdict (`BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`), walk through any real bugs, spec deviations, or rule violations clearly, and wait for my confirmation—or let us fix any blockers first—before spawning the next auditor.
