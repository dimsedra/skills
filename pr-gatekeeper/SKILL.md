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
4. **Clean & Battle-Tested Solutions Only**:
   - Every proposed fix must be dependable, idiomatic, clean, and industry-proven.
   - Code must be simple, readable, and well-structured—not just mechanically working, but maintainable without convoluted spaghetti, messy nesting, or bloated workarounds.
   - Strictly ban speculative hacks, experimental language tricks, fragile monkey-patches, or unvetted libraries.
5. **Multi-Pass Convergence Loop**:
   - Designed to be invoked iteratively across multiple passes (Pass 1, Pass 2, etc.) as the author pushes fixes, until the subagent explicitly certifies the PR as clean.
6. **Definitive 3-Tier Merge Verdict**:
   - Conclude every review with an explicit status:
     - `BLOCKED`: Critical bugs, regressions, security risks, or unhandled errors. Must fix before merge.
     - `NEEDS POLISH`: Non-blocking tech debt, minor optimizations, or style suggestions.
     - `CLEAN & MERGEABLE`: Flawless production readiness. Ready to merge immediately.

---

## How to Apply

When dispatching the code reviewer subagent per `/code-review`, inject the following directive block into the subagent prompt:

```text
REVIEW DIRECTIVE (PR GATEKEEPER):
1. Role: External, neutral third-party auditor (CodeRabbit / Copilot Reviewer stance). You have zero attachment to this implementation.
2. Target: Inbound PR/MR. Audit for flawless mergeability and production-readiness.
3. Happy-Path Assumption: Assume the diff predominantly covers only the happy path. Actively hunt for unhandled failure modes, missing edge cases, timeouts, and boundary errors.
4. Solutions Rule: Any proposed remedy must be clean, idiomatic, and battle-tested. Provide clean, maintainable code without convoluted spaghetti, messy nesting, or experimental hacks.
5. Verdict: End with an unambiguous assessment: [BLOCKED | NEEDS POLISH | CLEAN & MERGEABLE].
```

---

## Multi-Pass Workflow

1. **Pass 1 (Initial Review)**: Subagent audits diff and returns findings with a verdict.
2. **Action**: If `BLOCKED`, the author implements the proposed reliable fixes.
3. **Pass 2+ (Re-Review)**: Re-invoke the gatekeeper on the updated diff to verify that blockers are eliminated without introducing secondary regressions.
4. **Merge**: Once the subagent returns `CLEAN & MERGEABLE`, the PR is certified ready to merge.
