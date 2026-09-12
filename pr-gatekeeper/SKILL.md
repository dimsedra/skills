---
name: pr-gatekeeper
description: Use when reviewing inbound Pull Requests or Merge Requests with the code-review skill to enforce production readiness, third-party neutrality, and battle-tested fixes.
---

# PR Gatekeeper

Add-on directive designed to accompany `/code-review` when evaluating inbound Pull Requests or Merge Requests (PR/MR). Enforces an uncompromising, external reviewer stance (CodeRabbit / GitHub Copilot Reviewer posture) executed strictly via neutral subagents.

---

## What This Skill Adds to `/code-review`

While `/code-review` handles the standard review mechanics (diff inspection, plan alignment, read-only guarantees), `pr-gatekeeper` injects the following non-negotiable constraints:

1. **Third-Party Neutrality (Adversarial Lens)**:
   - The reviewing subagent must act as an external, unattached reviewer with zero project bias.
   - Never assume the implementation is sound. Treat every diff as unverified until proven safe and production-ready.
2. **Flawless Mergeability Standard**:
   - The PR must be robust enough for immediate production deployment: zero regressions, bounded timeouts, guarded error boundaries, and no data integrity risks.
3. **Assume Happy-Path Bias (Unhappy-Path Hunting)**:
   - Inbound PRs (especially first-pass AI implementations) predominantly solve only the happy path.
   - Actively hunt for missing error handling, boundary extremes, network failures, timeouts, null/empty payloads, race conditions, and illegal state transitions.
4. **Evidence-Backed Bug Claims (No Speculative Ghost Bugs)**:
   - Subagents must trace the actual code execution path before claiming a defect. Vague hand-waving (e.g. "there might be a race condition here") is strictly forbidden.
   - Every claimed bug MUST state:
     - Exact file and line/symbol reference (`path/to/file.ts:line` or `Class.method()`).
     - Concrete, step-by-step reproducible trigger scenario (e.g. "When request A arrives at T=0 and request B arrives at T=5ms before the DB lock acquires, state diverges because...").
     - Concrete operational impact (crash, data loss, deadlock, unauthorized access).
5. **Clean, Simple & Battle-Tested Solutions (No Mandatory LOC Expansion)**:
   - A solution does not inherently mean adding lines of code (LOC). Depending on the state of the implementation, the optimal remedy is often deleting redundant logic, collapsing over-engineered abstractions, or leveraging standard language primitives.
   - Every proposed fix must be dependable, idiomatic, clean, simple, and maintainable—without convoluted spaghetti, bloated wrappers, or temporary band-aids.
   - Strictly ban speculative hacks, experimental language tricks, fragile monkey-patches, or unvetted libraries.
6. **Calibrated 3-Tier Merge Verdict**:
   - Conclude every review with an unambiguous assessment calibrated strictly as follows:
     - `BLOCKED`: Must fix before merge.
       - Examples: Data loss/corruption, check-then-act race conditions, unhandled exceptions crashing workers, missing server-side auth checks, breaking changes to existing contracts/schemas.
     - `NEEDS POLISH`: Non-blocking advisory. Mergeable at maintainer's discretion.
       - Examples: Suboptimal memory filtering instead of SQL `where`, redundant helper abstractions, minor naming ambiguity, non-critical tech debt, missing documentation comments.
     - `CLEAN & MERGEABLE`: Flawless production readiness. All error boundaries guarded, battle-tested solutions verified, zero blockers. Ready to merge immediately.
7. **Multi-Pass Convergence Loop**:
   - Designed to be invoked iteratively across multiple passes (Pass 1, Pass 2, etc.) as the author pushes fixes, until the subagent explicitly certifies the PR as clean.

---

## How to Apply

When dispatching the code reviewer subagent per `/code-review`, inject the following directive block into the subagent prompt:

```text
REVIEW DIRECTIVE (PR GATEKEEPER):
1. Role: External, neutral third-party auditor (CodeRabbit / Copilot Reviewer stance). You have zero attachment to this implementation.
2. Target: Inbound PR/MR. Audit for flawless mergeability and production-readiness.
3. Happy-Path Assumption: Assume the diff predominantly covers only the happy path. Actively hunt for unhandled failure modes, missing edge cases, timeouts, and boundary errors.
4. Evidence Rule: Trace the code execution path. Never claim hypothetical 'ghost bugs'. Every reported defect MUST specify the exact file/line and a concrete reproducible trigger scenario showing how the failure occurs.
5. Solutions Rule: Any proposed remedy must be clean, simple, maintainable, and battle-tested. Fixes do not have to add code; deleting over-engineering or simplifying logic is often superior. No spaghetti, bloated wrappers, or experimental hacks.
6. Calibrated Verdict: End with an unambiguous status strictly calibrated to impact:
   - BLOCKED: Critical defects, race conditions, crashes, data loss, security gaps, contract regressions.
   - NEEDS POLISH: Non-blocking performance suboptimality, minor debt, style/naming improvements.
   - CLEAN & MERGEABLE: Flawless production readiness.
```

---

## Multi-Pass Workflow

1. **Pass 1 (Initial Review)**: Subagent traces paths, audits diff, and returns evidence-backed findings with a calibrated verdict.
2. **Action**: If `BLOCKED`, the author implements the proposed reliable fixes.
3. **Pass 2+ (Re-Review)**: Re-invoke the gatekeeper on the updated diff to verify that blockers are eliminated without introducing secondary regressions.
4. **Merge**: Once the subagent returns `CLEAN & MERGEABLE`, the PR is certified ready to merge.
