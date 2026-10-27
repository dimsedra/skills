---
name: plans
description: Use when creating a structured, commit-driven implementation plan with real-time progress tracking based on PRD and SRS specifications into docs/plan/.
---

# Plans

When I ask you to create or refine an implementation plan, your goal is to translate our agreed requirements—whether from an existing PRD or SRS, or directly from our discussion—into a clear, commit-driven TDD roadmap in `docs/plan/` that we can execute step by step with `/implement`.

## Grounding in Context and the Codebase

If a parent PRD (`docs/prd/YYYYMMDD_<feature>.md`) or SRS (`docs/srs/YYYYMMDD_<module>.md`) exists, read it first so the tasks in the plan trace back to those `REQ-XXX` requirements or user outcomes; if neither exists, ground the plan directly in our agreed scope from conversation. Before designing the tasks, inspect the existing source code, types, and boundaries in the area we are modifying so the plan fits how our codebase actually works rather than relying on assumptions.

If the order of phases, migration steps, or technical trade-offs is still open to interpretation, do not guess—pause and invoke `/align` first so we can weigh 2 or 3 sequencing options and agree on the approach before you write the plan.

## Designing Scenarios and Tasks: Logic vs UI Design

Follow our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`) when breaking the work down:

Do not leave phases or scenarios standing as bare headings and checkboxes without context. Give the plan a brief overview of our overall approach, explain the goal and architectural boundary of each phase, and include a short paragraph under each scenario or task explaining what is being built, how it connects to the codebase, and which requirement (`REQ-XXX`, if an SRS exists) it fulfills.

Distinguish clearly between logic tasks and UI design tasks:

1. **Logic & Backend Scenarios (Strict TDD)**:
   - For domain rules, calculations, API contracts, state management, or data transformations, frame tests around observable behavior through the public API (never mock internal collaborators or check that an internal method was called).
   - Cover 4 dimensions: normal happy paths, boundaries and edge cases (empty inputs, limits, off-by-one conditions), error paths (validation rejections, timeouts, unauthorized access), and core business invariants.
   - Break every logic scenario into two separate tasks (1 scenario = 2 commits):
     - Task `a` (Red step): Write a failing public-API test, verify that the test runner fails as expected, and commit as `test(<scope>): add failing test for <scenario>`.
     - Task `b` (Green step): Write the minimal code needed to pass the test, verify that the suite turns green, and commit as `feat(<scope>): implement minimal logic for <scenario>`.

2. **UI & Design Tasks (Visual Verification, No TDD)**:
   - For frontend markup, layouts, component appearance, and styling, do NOT write unit tests (per Directive #5, never write unit tests for UI layout, styling, or rendering).
   - UI design tasks do not use a Red/Green TDD pair. Plan them as single direct implementation tasks (e.g. `feat(ui): ...` or `style(...)`).
   - The verification criteria must be explicit: verify that the build/typecheck succeeds, followed by running the `/design` isolated `UI Visual Auditor` subagent against mobile (`360x640`) and desktop (`1280x800`) Playwright screenshots until it returns `PASS & CERTIFIED`. (If a UI component contains non-trivial business logic or state calculation, isolate and TDD that logic function separately, while keeping the visual markup/styling verified visually).

## File Placement, Lifecycle, and Format

Always tell me the target file path before creating or updating a plan. Save plans at `docs/plan/YYYYMMDD_<plan_slug>.md` in snake_case. If we revise the plan's scope or structure on a later date via `/plans`, rename the file with `git mv` to match the new date and update `docs/README.md` (whereas routine checkbox ticking and commit hash updates during `/implement` keep the original filename).

Structure the plan file like this (leave `parent_prd` or `parent_srs` as `null` when they do not exist) so it reads clearly and stays easy to track during `/implement`:

```markdown
---
title: "Implementation Plan: [Feature Name]"
type: plan
parent_prd: null
parent_srs: null
status: planned
total_tasks: [Total Number of Tasks]
completed_tasks: 0
last_updated: YYYY-MM-DD
---

# Implementation Plan: [Feature Name]

Progress: 0 / [Total] tasks completed (0%)

## Overview & Approach
Briefly explain the overall implementation strategy, how these changes fit into the existing codebase, and why the phases below are sequenced in this order.

## Phase 1: [Milestone Name]
Explain what this phase accomplishes, which subsystem or boundary it touches, and what foundation it lays for the next phase.

### Scenario 1.1: [Logic scenario description, e.g. Rejects order when inventory is insufficient]
Explain the specific behavior and mechanics being built here, the testing dimension it covers (Normal Path, Boundary, Error Path, or Core Invariant), any linked requirement (`REQ-XXX`), and the files involved (`tests/...`, `src/...`).

- [ ] Task 1.1a (Red): Write failing test for [behavior]
  Commit: `test(scope): add failing test for [behavior]`
  Verify: `npm test path/to/test.ts` (expected to fail)

- [ ] Task 1.1b (Green): Implement minimal logic for [behavior]
  Commit: `feat(scope): implement minimal logic for [behavior]`
  Verify: `npm test path/to/test.ts` (expected to pass)

### Task 1.2: [UI / Design task description, e.g. Implement responsive checkout summary component]
Explain the UI component, layout, or styling being implemented, how it reflects `docs/design/brand.md`, and target viewports. Note that UI tasks are verified visually without TDD unit tests.

- [ ] Task 1.2: Implement [component/layout/styling]
  Commit: `feat(ui): implement [component/layout description]`
  Verify: Build/typecheck succeeds, and `/design` visual audit via `UI Visual Auditor` subagent returns PASS & CERTIFIED across mobile (360px) and desktop (1280px) Playwright screenshots.
```

Once you create or update the plan, add or update its entry in `docs/README.md`, walk me through the phases and scenario coverage in chat, and ask if I want to execute it via `/implement` phase by phase or all the way through to completion.
