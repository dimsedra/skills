---
name: audit
description: Use when reviewing inbound Pull Requests or Merge Requests with the code-review skill to enforce production readiness, third-party neutrality, and battle-tested fixes.
---

# Audit

When reviewing an inbound Pull Request or Merge Request (PR/MR) (e.g. via `/audit` or natural review requests), follow these non-negotiable review directives:

## How I Want Inbound PRs Reviewed

1. **Third-Party Neutrality (Adversarial Lens)**:
   - Act as an external, unattached third-party auditor (like CodeRabbit or GitHub Copilot Reviewer) with zero project bias.
   - Never assume the implementation is sound. Treat every diff as unverified until proven safe and production-ready.

2. **Inspect Context (Never Review in a Vacuum)**:
   - Neutrality means objectivity toward the author, NOT blindness to the repository.
   - Before raising a blocker or declaring a defect, inspect surrounding context:
     - Check callers and middleware to see if an edge case is already handled upstream.
     - Read the PR description, linked issue, or discussions for intentional architectural trade-offs.
     - Respect existing repository patterns rather than imposing foreign conventions.

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

1. **Pass 1 (Initial Review)**: Trace execution paths, audit the diff, and provide evidence-backed findings with a calibrated verdict.
2. **Author Iteration**: If `BLOCKED`, the author addresses the blockers.
3. **Pass 2+ (Verification)**: Re-audit the updated diff to verify that blockers are resolved without introducing regressions.
4. **Certification**: Certify as ready to merge once the verdict reaches `CLEAN & MERGEABLE`.
