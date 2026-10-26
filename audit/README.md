# Audit Skill

Production-grade code review and PR auditing engine that eliminates context bias by dispatching three focused, isolated auditor subagents—either sequentially stage-by-stage or selectively on demand:

1. **Spec Auditor** (`SPEC-AUDITOR.md`): Verifies specification conformance against PRDs, SRS (`REQ-XXX`), ADRs, and implementation plans while blocking unrequested scope creep.
2. **Resilience Auditor** (`RESILIENCE-AUDITOR.md`): Hunts for unhandled edge cases, broken invariants, race conditions, security vulnerabilities, and scaling bottlenecks (like N+1 queries and unbounded table scans).
3. **Quality Auditor** (`QUALITY-AUDITOR.md`): Enforces our `Engineering Rules & Directives` across architecture, deep modularity, fail-fast boundary parsing, flat readability, and behavior-driven TDD discipline.

## Install

```bash
npx skills add dimsedra/skills --skill audit
```

## Structure

```text
audit/
├── SKILL.md               # Primary agent review orchestration & subagent dispatching
├── SPEC-AUDITOR.md        # Stage 1: Specification & contract compliance protocol
├── RESILIENCE-AUDITOR.md  # Stage 2: Runtime resilience, security & scalability protocol
├── QUALITY-AUDITOR.md     # Stage 3: Code quality, engineering rules & TDD protocol
└── README.md
```

## Purpose

Enforces strict production-grade constraints when auditing code:
- **Zero-Bias Subagent Isolation**: Primary agent dispatches clean, isolated subagent auditors to eliminate confirmation bias.
- **Sequential Resolve-Before-Advancing Gates**: Runs stages one by one (Spec -> Resilience -> Quality), resolving all findings in the current stage before advancing to the next, or invokes any individual auditor on demand.
- **Full-Path Grounded Context**: Requires passing the resolved full path to the auditor instruction file, the exact `git diff` command, and full paths to relevant `docs/` specifications and plans at every stage.
- **Evidence-Backed Bug Claims**: Banned from making speculative "ghost bug" claims. Every reported defect must include exact code locations, concrete reproducible trigger scenarios, and system impact.
- **Calibrated Verdicts**: Clear criteria separating `BLOCKED` (spec drift, crashes, security flaws, fatal scaling bottlenecks, engineering rule violations, or test tampering) from `NEEDS POLISH` and `CLEAN & MERGEABLE`.

## Usage

Invoke directly whenever reviewing a branch, PR, or diff—either as a full sequential pipeline or targeting a specific stage:

```text
Please audit this PR: #123
```

Or simply trigger via `/audit` after completing an implementation plan.
