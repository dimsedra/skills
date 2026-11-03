---
name: ship
description: "Use ONLY when the user explicitly invokes /ship or asks to run the full autonomous shipping loop. Never trigger on casual 'build' or 'implement' prompts. Orchestrates the interactive gate (/align -> /intent -> /blueprint) and then runs an autonomous execution and self-healing loop (/method per contract -> /audit loop) until landing at /proof."
---

# Ship

`/ship` is our end-to-end workflow orchestrator. It separates the human decisions that belong to me from the disciplined execution loop that belongs to you, so you never guess what I want upfront and I never have to babysit every contract commit once we agree on the Blueprint.

Never trigger this skill when I casually ask you to "build" or "implement" something in conversation. Only run `/ship` when I explicitly invoke it.

## Phase 1: The Interactive Gate (Before the Autonomous Loop)

You cannot run an autonomous loop without an approved Intent and an approved Blueprint on disk. Before writing any implementation code:

1. Check that our `Engineering Rules & Directives` are present in `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` (if missing, run `/setup` first), and read `docs/README.md` to load our existing project context.
2. Check whether we already have an approved Intent (`docs/intent/`) and an approved Blueprint (`docs/blueprint/`, with `status: Approved`) for the work:
   - If I invoked `/ship` pointing to an existing Intent and Blueprint that are already approved (and `docs/design/brand.md` is approved if UI is involved), skip straight to **Phase 2**.
   - If either the Intent or the Blueprint is missing or still in `Draft`, walk through them with me interactively first:
     1. Align with me via `/align` (`align/SKILL.md`) until we share the exact same picture.
     2. Capture and confirm the Intent on disk via `/intent` (`intent/SKILL.md`).
     3. If the work touches front-end UI and `docs/design/brand.md` is missing or does not cover it, align and get my approval on `docs/design/brand.md` following `method/VISUAL_TESTING.md`.
     4. Draft the technical Blueprint via `/blueprint` (`blueprint/SKILL.md`), consulting `/method` (`method/SKILL.md`) to pick the right method (`tdd`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, or `visual testing`), verification check, and atomic commit plan for each contract.
     5. Present the Blueprint to me in chat and wait for my explicit approval. Never enter Phase 2 until I approve the Blueprint and its `status` is set to `Approved`.

## Phase 2: The Autonomous Execution & Self-Healing Loop

Once the Blueprint is `Approved`, run the implementation and audit loop hands-free from start to finish without pausing after each contract for permission:

1. **Execute each contract in order via `/method`:**
   - Pick the next contract (`BP-[MODULE]-001`, `BP-[MODULE]-002`, and so on) from the approved Blueprint.
   - Open and read the matching route file in `method/` (`TDD.md`, `CHARACTERIZATION.md`, `TEST_AFTER.md`, `DESIGN_BY_CONTRACT.md`, `INTEGRATION_E2E.md`, or `VISUAL_TESTING.md`) by resolving its path from where the `method` skill is installed.
   - Follow that method's exact steps to build and verify the contract. Run the concrete `Verification` check specified in the contract and confirm it passes.
   - Commit the work in the planned atomic `Commit` increments (`test: ...`, `feat: ...`, `refactor: ...`) as each step turns green, never staging `docs/` files in parent project commits when `docs/` is ignored or tracked in a separate repository.

2. **Run `/audit` and self-heal until clean:**
   - After all contracts in the Blueprint are implemented, verified, and committed, open and follow `/audit` (`audit/SKILL.md`) to spawn the three isolated subagents in order (`Spec Auditor`, `Resilience Auditor`, and `Quality Auditor`).
   - If any auditor returns `BLOCKED` (or if any test or Visual QA check fails), fix the concrete defects in code or tests, re-run the contract `Verification` checks, commit the fix atomically, and re-run the failed auditor.
   - Repeat this self-healing loop until all three audit stages return `CLEAN & MERGEABLE` (if an auditor returns `NEEDS POLISH` with straightforward, non-breaking cleanups that honor the Blueprint, apply them and re-verify).

3. **Respect the circuit breaker (the only early stop):**
   - If at any point during Phase 2 reality in the codebase proves that a Blueprint contract cannot hold as designed, or that fixing an issue would contradict the Intent or Non-Goals, **stop the autonomous loop immediately**.
   - Do not invent a silent workaround or rewrite the contract on your own. Explain what you found, invoke `/align` with me, and wait for my decision so we can update the Blueprint (or Intent) before resuming the loop.

## Phase 3: Landing at `/proof`

Once every contract in the Blueprint is committed and `/audit` is certified `CLEAN & MERGEABLE`, transition directly into `/proof` (`proof/SKILL.md`). Present the completed work with real verification evidence (test outputs, terminal execution, screenshots from Visual QA, and the audit results) so I can review, poke at your choices, and verify the finished work with you.
