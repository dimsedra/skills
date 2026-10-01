# Audit Skill

Production-grade code review and PR auditing engine that enforces an uncompromising, external reviewer stance (CodeRabbit / Copilot Reviewer posture) with evidence-backed findings and calibrated mergeability verdicts.

## Install

```bash
npx skills add dimsedra/skills --skill audit
```

## Purpose

Enforces strict production-grade constraints when auditing code:
- **Big-Picture Mental Model First**: Never audits diffs in a vacuum; maps PR intent, linked problem context, and surrounding system architecture before evaluating code changes.
- **Third-Party Neutrality**: Enforces review via fresh subagent to eliminate confirmation bias.
- **Grounded Context Exploration**: Inspects caller files, PR discussions, and existing repo conventions before declaring blockers.
- **Flawless Mergeability**: Audits diffs for production readiness and regression safety.
- **Happy-Path Hunting**: Assumes early implementations predominantly cover only happy paths, actively hunting for unhandled edge cases, boundary failures, and timeouts.
- **Evidence-Backed Bug Claims**: Banned from making speculative "ghost bug" claims. Every reported defect must include exact code locations and concrete reproducible trigger scenarios.
- **Clean & Battle-Tested Solutions**: Demands clean, simple, maintainable, and reliable fixes—recognizing that the best solution often removes over-engineering rather than adding LOC.
- **Calibrated Verdicts**: Clear criteria separating `BLOCKED` (crashes, data loss, security, regressions) from `NEEDS POLISH` (non-blocking debt, minor optimizations).
- **Multi-Pass Loop**: Built for iterative review rounds until certified clean.

## Usage

Invoke directly whenever reviewing a branch, PR, or diff:

```text
Tolong audit PR ini: #123
```

Or simply trigger via `/audit` during code review discussions.
