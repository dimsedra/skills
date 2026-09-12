# PR Gatekeeper Skill

Add-on directive for `/code-review` that enforces an uncompromising, external reviewer stance (CodeRabbit / Copilot Reviewer posture) for inbound Pull Requests and Merge Requests.

## Install

```bash
npx skills add dimsedra/skills --skill pr-gatekeeper
```

## Purpose

Adds strict production-grade constraints to standard code reviews:
- **Third-Party Neutrality**: Enforces review via fresh subagent to eliminate confirmation bias.
- **Flawless Mergeability**: Audits diffs for production readiness and regression safety.
- **Happy-Path Hunting**: Assumes early implementations predominantly cover only happy paths, actively hunting for unhandled edge cases, boundary failures, and timeouts.
- **Clean & Battle-Tested Solutions**: Demands fixes that are both production-reliable and cleanly architected (idiomatic, maintainable, no spaghetti or band-aids).
- **Multi-Pass Loop**: Built for iterative review rounds until clean.
- **Clear Verdict**: Concludes with `BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`.

## Usage

Invoke alongside `/code-review`:

```text
Tolong lakukan code-review dengan skill /code-review, arahanku ada di /pr-gatekeeper
```
