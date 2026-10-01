---
name: audit
description: Use when auditing or reviewing Pull Requests, Merge Requests, or code diffs (e.g. via /audit or natural review requests) to enforce production readiness, third-party neutrality, and battle-tested fixes.
---

# Audit

When reviewing or auditing a Pull Request, Merge Request (PR/MR), or code diff (e.g. via `/audit` or natural review requests), follow these non-negotiable review directives:

## How I Want Code Audited

1. **Build the Big-Picture Mental Model First (Context Before Diff)**:
   - Never audit diffs in an architectural vacuum. A standalone diff without the larger system context produces shallow, false-positive-prone reviews.
   - Before evaluating individual code changes:
     - **Understand the Intent**: Read the PR description, linked issue, or problem discussion to grasp what problem this PR/MR is solving and why.
     - **Map the Architectural Context**: Understand where the modified modules sit in the overall architecture, how data flows through them, and what upstream callers or downstream consumers depend on them.
     - **Check Surrounding Conventions**: Inspect existing repository patterns, middleware, and boundaries so you evaluate the code within its real environment, not against generic assumptions.

2. **Third-Party Neutrality (Adversarial Lens)**:
   - Act as an external, unattached third-party auditor (like CodeRabbit or GitHub Copilot Reviewer) with zero project bias.
   - Never assume the implementation is sound. Treat every diff as unverified until proven safe and production-ready.

3. **Hunt for the Unhappy Path**:
   - Inbound PRs (especially first-pass AI code) predominantly solve only the happy path.
   - Actively search for missing error handling, timeouts, empty/null states, race conditions, and boundary leaks.

4. **Evidence-Backed Findings (No Speculative Ghost Bugs)**:
   - Trace the actual execution path before reporting an issue.
   - For every defect, provide:
     - Exact file and line/symbol reference (`path/to/file.ts` -> `Class.method()`).
     - A concrete, step-by-step reproducible trigger scenario.
     - Concrete operational impact (crash, data loss, deadlock, unauthorized access).

5. **Simple & Battle-Tested Remedies (No Mandatory LOC Expansion)**:
   - A good solution does not require adding more lines of code. Deleting redundant abstractions or simplifying logic is often superior.
   - Propose clean, idiomatic, maintainable fixes without bloated wrappers, spaghetti code, or fragile hacks.

6. **Calibrated 3-Tier Merge Verdict**:
   - End every review with an unambiguous verdict:
     - `BLOCKED`: Must fix before merge (crashes, data loss, check-then-act races, security holes, broken contracts).
     - `NEEDS POLISH`: Non-blocking advisory (minor tech debt, style/naming improvements, suboptimal query).
     - `CLEAN & MERGEABLE`: Production-ready. All boundaries verified, zero blockers.

## Multi-Pass Review Workflow

1. **Pass 1 (Context & Initial Audit)**: Build the big-picture mental model, trace execution paths against surrounding architecture, audit the diff, and provide evidence-backed findings with a calibrated verdict.
2. **Author Iteration**: If `BLOCKED`, the author addresses the blockers.
3. **Pass 2+ (Verification)**: Re-audit the updated diff to verify that blockers are resolved without introducing regressions.
4. **Certification**: Certify as ready to merge once the verdict reaches `CLEAN & MERGEABLE`.
