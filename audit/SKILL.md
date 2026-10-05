---
name: audit
description: Use when auditing or reviewing Pull Requests, Merge Requests, or code diffs (e.g. via /audit or natural review requests) to enforce production readiness, specification conformance (PRD/SRS), third-party neutrality, and battle-tested fixes.
---

# Audit

When reviewing or auditing a Pull Request, Merge Request (PR/MR), or code diff (e.g. via `/audit` or natural review requests), follow these non-negotiable review directives:

## How I Want Code Audited

1. **Build the Big-Picture Mental Model First (Context Before Diff)**:
   - Never audit diffs in an architectural vacuum. A standalone diff without the larger system context produces shallow, false-positive-prone reviews.
   - Before evaluating individual code changes:
     - **Inspect Specification Artifacts**: Check `docs/` for relevant specification documents—including parent PRDs (`docs/prd/`), SRS specifications (`docs/srs/`), ADRs (`docs/decisions/`), or linked issues. Never guess what was intended from the code alone.
     - **Understand the Intent**: Read the PR description, linked issue, or problem discussion to grasp what problem this PR/MR is solving and why.
     - **Map the Architectural Context**: Understand where the modified modules sit in the overall architecture, how data flows through them, and what upstream callers or downstream consumers depend on them.
     - **Check Surrounding Conventions**: Inspect existing repository patterns, middleware, and boundaries so you evaluate the code within its real environment, not against generic assumptions.

2. **Verify Specification & Contract Conformance (Anti-Drift Audit)**:
   - Clean code that builds the wrong thing or breaks agreed contracts is unacceptable.
   - Cross-check the implementation against the originating PRD, SRS, or architecture docs:
     - **Requirement Completeness**: Verify that all scoped features from the PRD and functional requirements (`REQ-XXX` from the SRS) are fully implemented. Flag any silently omitted or half-baked requirements.
     - **Contract & Schema Fidelity**: Verify that endpoint signatures, parameter types, database schemas, HTTP status codes, and payload formats match the exact technical contract defined in the SRS.
     - **Zero Scope Creep (Anti-Bloat)**: Identify and reject unrequested features, unsolicited interactive behaviors, or premature abstractions not approved in the PRD/SRS.
     - **NFR Adherence**: Verify compliance with specified non-functional limits (e.g. pagination caps, payload size bounds, timeout thresholds, authorization guards).

3. **Third-Party Neutrality (Adversarial Lens)**:
   - Act as an external, unattached third-party auditor (like CodeRabbit or GitHub Copilot Reviewer) with zero project bias.
   - Never assume the implementation is sound. Treat every diff as unverified until proven safe and production-ready.

4. **Hunt for the Unhappy Path**:
   - Inbound PRs (especially first-pass AI code) predominantly solve only the happy path.
   - Actively search for missing error handling, timeouts, empty/null states, race conditions, and boundary leaks.

5. **Evidence-Backed Findings (No Speculative Ghost Bugs)**:
   - Trace the actual execution path before reporting an issue.
   - For every defect, provide:
     - Exact file and line/symbol reference (`path/to/file.ts` -> `Class.method()`).
     - A concrete, step-by-step reproducible trigger scenario.
     - Concrete operational impact (crash, data loss, deadlock, unauthorized access, specification drift).

6. **Simple & Battle-Tested Remedies (No Mandatory LOC Expansion)**:
   - A good solution does not require adding more lines of code. Deleting redundant abstractions or simplifying logic is often superior.
   - Propose clean, idiomatic, maintainable fixes without bloated wrappers, spaghetti code, or fragile hacks.

7. **Calibrated 3-Tier Merge Verdict**:
   - End every review with an unambiguous verdict:
     - `BLOCKED`: Must fix before merge (crashes, data loss, check-then-act races, security holes, broken contracts, missing scoped requirements, unapproved scope creep).
     - `NEEDS POLISH`: Non-blocking advisory (minor tech debt, style/naming improvements, suboptimal query).
     - `CLEAN & MERGEABLE`: Production-ready. All boundaries verified, zero blockers, full specification conformance.

## Multi-Pass Review Workflow

1. **Pass 1 (Context & Initial Audit)**: Ingest specification artifacts (`docs/prd/`, `docs/srs/`), build the big-picture mental model, audit the diff against both code quality and specification contracts, and provide evidence-backed findings with a calibrated verdict.
2. **Author Iteration**: If `BLOCKED`, the author addresses the blockers.
3. **Pass 2+ (Verification)**: Re-audit the updated diff to verify that blockers are resolved without introducing regressions or specification drift.
4. **Certification**: Certify as ready to merge once the verdict reaches `CLEAN & MERGEABLE`.
