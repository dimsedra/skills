# PR Gatekeeper Skill

Add-on directive for `/code-review` that enforces an uncompromising, external reviewer stance (CodeRabbit / Copilot Reviewer posture) for inbound Pull Requests and Merge Requests.

## Install

```bash
npx skills add dimsedra/skills --skill pr-gatekeeper
```

## Purpose

Adds strict production-grade constraints to standard code reviews:
- **Third-Party Neutrality**: Enforces review via fresh subagent to eliminate confirmation bias.
- **Grounded Context Exploration**: Never reviews in a vacuum; inspects caller files, PR descriptions/comments, and existing repo conventions before declaring blockers.
- **Flawless Mergeability**: Audits diffs for production readiness and regression safety.
- **Happy-Path Hunting**: Assumes early implementations predominantly cover only happy paths, actively hunting for unhandled edge cases, boundary failures, and timeouts.
- **Evidence-Backed Bug Claims**: Banned from making speculative "ghost bug" claims. Every reported defect must include exact code locations and concrete reproducible trigger scenarios.
- **Clean & Battle-Tested Solutions**: Demands clean, simple, maintainable, and reliable fixes—recognizing that the best solution often removes over-engineering rather than adding LOC.
- **Calibrated Verdicts**: Clear criteria separating `BLOCKED` (crashes, data loss, security, regressions) from `NEEDS POLISH` (non-blocking debt, minor optimizations).
- **Multi-Pass Loop**: Built for iterative review rounds until certified clean.

## Usage

Invoke alongside `/code-review`:

```text
Tolong lakukan code-review dengan skill /code-review, arahanku ada di /pr-gatekeeper
```
