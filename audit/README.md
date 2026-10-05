# Audit Skill

Production-grade code review and PR auditing engine that enforces zero-bias review via an isolated subagent auditor, specification conformance (PRD/SRS), evidence-backed findings, and calibrated mergeability verdicts.

## Install

```bash
npx skills add dimsedra/skills --skill audit
```

## Structure

```text
audit/
├── SKILL.md                 # Primary agent review orchestration & subagent dispatching
├── AUDITOR-INSTRUCTIONS.md  # Dedicated review protocol & directives for subagent auditor
└── README.md
```

## Purpose

Enforces strict production-grade constraints when auditing code:
- **Zero-Bias Subagent Isolation**: Primary agent dispatches a clean, isolated subagent auditor to eliminate confirmation bias.
- **Dedicated Subagent Protocol**: Subagent operates under `AUDITOR-INSTRUCTIONS.md` with strictly bounded reading directives.
- **Specification & Contract Conformance**: Audits against parent PRDs and SRS requirements to eliminate specification drift, missing requirements, or unrequested scope creep.
- **Happy-Path Hunting**: Actively hunts for unhandled edge cases, boundary failures, and timeouts.
- **Evidence-Backed Bug Claims**: Banned from making speculative "ghost bug" claims. Every reported defect must include exact code locations and concrete reproducible trigger scenarios.
- **Clean & Battle-Tested Solutions**: Demands clean, simple, maintainable fixes—recognizing that the best solution often removes over-engineering rather than adding LOC.
- **Calibrated Verdicts**: Clear criteria separating `BLOCKED` (crashes, data loss, security, specification drift, broken contracts) from `NEEDS POLISH` (non-blocking debt, minor optimizations).

## Usage

Invoke directly whenever reviewing a branch, PR, or diff:

```text
Tolong audit PR ini: #123
```

Or simply trigger via `/audit` during code review discussions.
