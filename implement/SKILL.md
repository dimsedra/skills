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

## Executing Tasks: Logic (TDD) vs UI Design (Visual Verification)

Whether you are running a single phase or executing the whole plan end to end, never batch multiple tasks into one big commit. Execute tasks according to their nature:

1. **Logic & Backend Scenarios (Strict TDD)**:
   - Work through each logic scenario one by one using a strict Red -> Green -> Refactor loop, committing tests and implementation separately:
     - Step 1 (Red): Write a test asserting observable behavior through the public API (never mock internal collaborators or private methods). Run the test runner, show the failing output in chat, stage only test files, and commit as `test(...)`.
     - Step 2 (Green): Write minimal code to pass the test, adhering to our `Engineering Rules & Directives` (prefer duplication over premature abstraction, keep related logic co-located in deep modules, parse strictly at boundaries, eliminate special cases by rethinking the core model, and keep control flow flat). Run tests, show passing output in chat, stage only implementation files, and commit as `feat(...)`.
     - Step 3 (Refactor): If needed, clean up duplication or clutter while keeping tests green, and commit as `refactor(...)`.
   - Never delete, skip (`it.skip`, `@Disabled`), or weaken a test assertion to force a pass. If a test is flawed or requirements conflict with codebase reality, stop immediately, explain with file/line references, and invoke `/align`.

2. **UI & Design Tasks (Direct Implementation & Visual Verification)**:
   - For markup, layouts, component appearance, and styling, do NOT write unit tests (per Directive #5, never create unit tests for UI layout or styling).
   - Implement the UI code directly without a Red/Green TDD cycle, and commit as a single atomic feature commit (e.g. `feat(ui): ...`).
   - Before marking the UI task complete, ensure build and typecheck pass, then follow `/design` by spawning the `UI Visual Auditor` subagent against real mobile (`360x640`) and desktop (`1280x800`) Playwright screenshots until it returns a `PASS & CERTIFIED` verdict. (If a component contains non-trivial business logic or state calculation, isolate and TDD that logic function separately, while keeping visual styling verified visually).

## Real-Time Plan Tracking and Milestones

Right after each commit succeeds (whether a test commit, feature commit, or UI task commit), update the active plan file in `docs/plan/` in real time (keep the original filename even if our work spans multiple days):

- Check off the completed task (`- [x]`) and append the short commit hash at the end of the task title, such as `(`a1b2c3d`)`.
- Update `completed_tasks`, `status` (`in_progress` or `completed`), and the progress summary in the plan file.

In phase-by-phase mode, pause when all tasks in the current phase are finished, give me a milestone summary in chat (listing the commits created, the updated plan progress, and the `UI Visual Auditor` result if UI changed), and wait for my confirmation before moving to the next phase. In end-to-end mode, keep working through the phases with the same atomic TDD commits and real-time plan updates until the entire plan is complete, then give me the full completion summary and offer to run our staged `/audit`.
