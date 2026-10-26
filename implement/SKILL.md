---
name: implement
description: Use when executing implementation tasks from an approved docs/plan/ document—either phase-by-phase or end-to-end—with atomic commits, strict TDD cycles (Red-Green-Refactor), automated test verification, and real-time plan tracking.
---

# Implement

When I ask you to implement a feature or execute a roadmap, work from our approved implementation plan in `docs/plan/` using strict TDD (Red -> Green -> Refactor). Never start writing implementation code without an approved plan in `docs/plan/`; if we do not have one yet, tell me to run `/plans` first.

## Choosing the Execution Pace

Find the active plan in `docs/plan/YYYYMMDD_<plan_slug>.md` and locate the first phase that still has unchecked tasks (`- [ ]`). If all tasks in the plan are already checked off, let me know that the plan is complete and suggest running `/audit`.

If I have not already told you whether I want to run the plan phase by phase or all the way through to the end, ask me before starting so I can pick the pace:

- Phase-by-phase mode: Execute one phase at a time, then pause at the end of the phase to share a milestone summary and wait for my confirmation before moving on to the next phase.
- End-to-end mode: Execute all remaining phases in the plan continuously until the entire plan is complete, pausing early only if you hit a real blocker or test/requirement conflict that needs `/align`.

Before touching any code in a phase, read the target files in the codebase so you understand the existing types, function signatures, and invariants we are building on. Outline which phase we are starting, the sequence of TDD scenarios you are about to run, and how they cover the 4 test dimensions (normal path, boundaries and edge cases, error paths, and core invariants).

## The TDD Execution Cycle (Red -> Green -> Refactor)

Whether you are running a single phase or executing the whole plan end to end, never batch multiple scenarios into one big commit. Work through each scenario one by one using a strict Red -> Green -> Refactor loop, committing tests and implementation separately:

1. Red (write the failing test first): Write a test that checks observable behavior through the public API. Do not mock internal collaborators or assert that private methods were called, and only add brief comments when explaining why an invariant matters (never what the syntax does). Run the test runner and show me the failing output in chat so I can see the failure reason from a behavior perspective. Once verified failing, stage only the test files, commit them using the `test(...)` message from the plan, and note the short commit hash.
2. Green (minimal implementation): Write only the code needed to make the test pass, without adding unrequested features or extra complexity. Follow our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`): prefer duplication over premature abstraction, keep related logic co-located in deep modules, parse strictly at boundaries and fail fast without silent fallbacks, eliminate special cases by rethinking the core model rather than adding special-case `if` patches, and keep control flow flat and obvious. Run the test suite, show me the passing output in chat as proof, then stage only the implementation files, commit them using the `feat(...)` message from the plan, and note the short commit hash.
3. Refactor (clean up while staying green): If the new code introduced duplication or clutter that needs tidying up without changing behavior, clean it up now, re-run the tests to make sure everything stays green, and commit as `refactor(...)`.

Never delete, skip (`it.skip`, `@Disabled`), or weaken a test assertion just to force a failing test to pass. Even when running in end-to-end mode, if you find that a test is flawed, an invariant breaks unexpectedly, or the requirements conflict with codebase reality, stop immediately, explain the problem to me with exact file and line references, and invoke `/align` before changing the test or proceeding further.

## UI Verification and Real-Time Plan Tracking

If a task or phase modifies frontend UI, views, layout, or styling, remember that passing backend tests only proves server-side logic—and we do not write unit tests for UI layout or styling. Before marking the UI work complete, follow `/design` by spawning the `UI Visual Auditor` subagent against real mobile (`360x640`) and desktop (`1280x800`) screenshots until it returns a `PASS & CERTIFIED` verdict.

Right after each test or feature commit succeeds, update the active plan file in `docs/plan/` in real time (keep the original filename even if our work spans multiple days):

- Check off the completed task (`- [x]`) and append the short commit hash at the end of the task title, such as `(`a1b2c3d`)`.
- Update `completed_tasks`, `status` (`in_progress` or `completed`), and the progress summary in the plan file.

In phase-by-phase mode, pause when all tasks in the current phase are finished, give me a milestone summary in chat (listing the commits created, the updated plan progress, and the `UI Visual Auditor` result if UI changed), and wait for my confirmation before moving to the next phase. In end-to-end mode, keep working through the phases with the same atomic TDD commits and real-time plan updates until the entire plan is complete, then give me the full completion summary and offer to run our staged `/audit`.
