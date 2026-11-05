---
name: implement
description: "Use when the user invokes /implement or tells you to go ahead and build after aligning on a change or approving an Intent/Blueprint, without running the full /ship autonomous audit loop. Executes each contract or agreed change via /method, verifies it, and commits atomically."
---

# Implement

Once we agree on a plan or Blueprint, the biggest risk during coding is drifting away from it: batching multiple contracts into one giant diff, skipping the verification check, or silently inventing workarounds when the existing code pushes back. Your job here is to turn our agreed plan into small, verified, defendable increments that stay 100% faithful to our contracts and non-goals.

## Before You Start

1. Check that our `Engineering Rules & Directives` are present in `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` (if missing, run `/setup` first), and check `docs/README.md` if `docs/` exists.
2. Make sure we actually have an agreed scope to build:
   - **With a Blueprint (`docs/blueprint/`):** Verify that the Blueprint `status` is `Approved` (and `docs/design/brand.md` is approved if UI is involved). If the Blueprint is still `Draft` or unapproved, pause and confirm with me before writing code.
   - **Without a Blueprint (direct from `/align`):** Make sure we have already aligned on the approach. If the request is brand new and ambiguous, align with me via `/align` first instead of guessing.

## Execution Loop

### 1. When Implementing an Approved Blueprint
Execute each contract in order without skipping steps:
1. Pick the next contract (`BP-[MODULE]-001`, `BP-[MODULE]-002`, and so on) from the approved Blueprint.
2. Open and read the matching route file in `method/` (`TDD.md`, `CHARACTERIZATION.md`, `TEST_AFTER.md`, `DESIGN_BY_CONTRACT.md`, `INTEGRATION_E2E.md`, or `VISUAL_TESTING.md`) by resolving its path from where the `method` skill is installed.
3. Follow that method's exact steps to build and verify the contract. Run the concrete `Verification` check specified in the contract and confirm it passes.
4. Commit the work in the planned atomic `Commit` increments (`test: ...`, `feat: ...`, `refactor: ...`) as each step turns green, never staging `docs/` files in parent project commits when `docs/` is ignored or tracked in a separate repository.

### 2. When Implementing Directly After `/align` (No Blueprint)
1. Open and read `/method` (`method/SKILL.md`), pick the route that fits the change (`TDD`, `Characterization`, `Test-After`, `Design by Contract`, `Integration / E2E`, or `Visual Testing`), and read that route's file in `method/`.
2. Follow that method's exact workflow to build and verify the change in small, bite-sized increments.

## Respect the Circuit Breaker

If at any point during implementation reality in the codebase proves that a Blueprint contract or our agreed approach cannot hold as designed, or that fixing an issue would contradict our Intent or Non-Goals, **stop immediately**.

Do not invent a silent workaround or rewrite the contract on your own. Explain what you found, invoke `/align` with me, and wait for my decision so we can update our plan (and the Blueprint or Intent if applicable) before continuing.

## Finishing Up

Once every contract or agreed change is implemented and verified, stop and present the results to me so we can review the work (or transition into `/proof` if I ask for verification). Do not automatically spawn the `/audit` subagent loop unless I ask for `/audit` or `/ship`.
