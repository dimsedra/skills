---
name: blueprint
description: Use when translating an approved Intent document into a technical blueprint (module boundaries, contracts, and how each will be verified) that the implementing agent follows together with the Intent.
---

# Blueprint

When I ask you to draft or refine a Blueprint, your job is to translate an approved Intent (`docs/intent/`) into a technical spec that an agent can implement without guessing. The Intent says what I want and why. The Blueprint says how we will build it. The implementing agent reads both, so the Blueprint does not restate the Intent. It points back to it.

The Intent is my domain. The Blueprint is yours: you write it, you follow it while implementing, and you keep it true when reality changes.

## Start From the Intent

Read the Intent first and treat it as the source of truth. Every contract you write must serve a specific part of it: a goal, a boundary, or an invariant. If you cannot point to the part of the Intent a contract serves, it is probably scope creep, so either drop it or raise it with me.

Carry the Intent's non-goals forward explicitly. They tell the implementing agent what not to build, and they are easy to lose once the work turns technical.

Before presenting, check coverage in both directions: every contract traces back to the Intent, and every goal in the Intent is covered by at least one contract or is openly marked as not covered yet, with the reason. If the Intent is silent or ambiguous on something the design needs, do not fill the gap with your own assumption. Bring it to me through `/align`.

## Ground in the Codebase

Read the actual code in the areas we are touching before designing anything: existing files, types, data flows, and patterns. Design against what exists, and follow established patterns rather than inventing new ones.

Check whether the Intent maps to one cohesive module or crosses separate lifecycles (for example a user-facing flow and a background job) that deserve separate Blueprints. If the split is not obvious, align with me before writing.

## Apply the Engineering Rules Where Design Decides Them

Apply the engineering rules from my global instructions (such as `AGENTS.md` or `GEMINI.md`). Read them from that source instead of relying on a summary.

A Blueprint can only honor the rules that are decided at design time: where module boundaries sit, how much each public interface exposes, where untrusted data gets parsed, how failures surface, what gets abstracted and what stays duplicated, and how each capability gets verified. Make those decisions explicit in the contracts. Rules that only exist in written code, such as formatting, nesting depth, or naming, are checked during implementation, `/proof`, and `/audit`, so do not make claims about them here.

Pick the `Method` that fits each contract by consulting the `/method` skill (`method/SKILL.md`) instead of defaulting to test-first for everything: `TDD` when the behavior and boundaries are known upfront, `characterization` when refactoring or migrating existing code while keeping external behavior identical, `test-after` for glue code or exploratory logic, `visual testing` for UI, `design by contract` when strict boundary parsing and runtime invariants are the main concern, or `integration/e2e` when behavior crosses module or I/O boundaries. During implementation, read and follow the matching route file in `method/` for each contract. Pair the method with `Verification`: the concrete check you will actually run and show in `/proof`.

Plan the atomic `Commit` sequence for each contract (for example `test: ...` followed by `feat: ...`). During implementation, commit in those small increments as each step is completed rather than piling everything into one large commit at the end.

## When Reality Disagrees With the Blueprint

The Blueprint is written before the code, so implementation will sometimes show that a contract does not hold. When that happens, do not quietly work around it. Stop, explain what you found and why the contract no longer fits, and align with me on the change. Update the Blueprint first, then continue building, so the document and the code never drift apart. If the change also contradicts the Intent, the Intent needs my decision before anything else.

## File Placement and Format

Tell me the target path before creating or updating a Blueprint. Save it at `docs/blueprint/YYYYMMDD_<module_slug>.md` in snake_case, where the date is the day it was created. When you revise it later, keep the filename and update `last_updated`, so links to it stay stable.

Contracts and non-goals are required, because the implementing agent, `/proof`, and `/audit` all rely on them. Every other section is optional. Include it only when it helps the implementing agent build correctly.

```markdown
---
title: "Blueprint: [Module or Subsystem Name]"
type: blueprint
parent_intent: docs/intent/YYYYMMDD_<slug>.md
status: Draft
last_updated: YYYY-MM-DD
---

# Blueprint: [Module or Subsystem Name]

[A short paragraph on how this design serves the Intent, in technical terms.]

## Current Code (optional)
How the relevant code works today and the gap between it and the Intent, citing real files.

## Design (optional)
Module boundaries, execution flow, and why things live where they do. Add a diagram only if it makes the flow clearer.

## Contracts

### BP-[MODULE]-001: [Capability name]
- Serves: [the goal, boundary, or invariant in the Intent]
- Input: [what comes in, and where it gets parsed]
- Behavior: [what happens, including state changes]
- Output: [what comes back]
- Failure: [what can go wrong and how it surfaces]
- Method: [tdd, characterization, test-after, visual testing, design by contract, integration/e2e]
- Verification: [the concrete check that will be proven in /proof]
- Commit: [planned atomic commits, e.g. (test: ...), (feat: ...)]

## Non-Goals
What the implementing agent must not build, carried from the Intent, plus any technical non-goals we agreed on.

## Not Covered Yet (optional)
Intent goals this Blueprint does not address yet, and why.
```

Once it is written, catalog it in `docs/README.md` and present it to me in chat: how you understood the Intent technically, the key design decisions and why, and which part of the Intent each contract covers. Wait for my approval before implementation starts, then set `status` to `Approved`.
