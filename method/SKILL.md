---
name: method
description: Use whenever the user invokes /method, names a method directly (e.g. "fix this using TDD"), builds or fixes something directly without a Blueprint, chooses a contract method during /blueprint planning, or executes a Blueprint contract. Routes to the concrete workflow for TDD, characterization, test-after, design by contract, integration/e2e, or visual testing.
---

# Method

Naming a method is only useful if you actually follow its discipline when building. Without a clear workflow, `TDD` turns into writing tests and code in one big batch, `test-after` turns into circular tests that only prove the code does what it already does, and refactoring breaks behavior because tests were rewritten alongside the code.

This skill is a router that serves three moments in our workflow:

1. **Direct implementation without a Blueprint:** When I ask you to build, fix, or refactor something directly without an Intent or Blueprint (or when I invoke `/method` or name a method like "fix this using TDD"), pick the route that fits the work, read that route's file, and follow it step by step. If I name a route myself (for example `/method tdd`), take that route without second-guessing it.
2. **During Blueprint planning (`/blueprint`):** Read this file to pick the method that genuinely fits each contract, and shape the contract's `Verification` check and atomic `Commit` sequence around how that method works. Never default to `tdd` for every contract out of habit.
3. **During Blueprint implementation:** Before you write code or tests for a contract, read the route file for that contract's `Method` and follow it step by step.

The route files live in the same directory as this `SKILL.md`, so resolve their path from where this skill is installed rather than guessing. Pick the route that matches the work:

TDD (`TDD.md`) is for new behavior where the public interface, inputs, and expected outputs are clear upfront. You start with a failing public-API test (Red), write the minimal code to pass it (Green), and clean up internals while staying green (Refactor).

Characterization (`CHARACTERIZATION.md`) is for refactoring, migrating, or restructuring existing code where external behavior must stay identical. Before touching production code, you write and pass tests that lock down what the code actually does today, and then change the internals while keeping those tests untouched and green.

Test-After (`TEST_AFTER.md`) is for glue code, wiring, or exploratory logic where the module shape and data flow only become clear as you write the implementation. You build the working flow first, then lock it down with public-API tests and verify those tests actually fail when the production logic is broken.

Design by Contract (`DESIGN_BY_CONTRACT.md`) is for system entry boundaries and core domain invariants where untrusted data enters (API payloads, CLI inputs, environment variables, external responses). You parse raw data into strict types or schemas right at the boundary ("Parse, don't validate"), fail fast and loud on violations, and test both valid parsing and explicit rejection of malformed inputs.

Integration / E2E (`INTEGRATION_E2E.md`) is for behavior that crosses module seams or real external input/output boundaries (databases, file systems, network protocols, subprocesses, or full user journeys) where mocking the boundary would hide the real bugs. You exercise the real wired components and assert on actual persisted state, responses, or output.

Visual Testing (`VISUAL_TESTING.md`) is for front-end UI, layout, styling, and interactive component states. You never write unit tests for UI rendering or layout; instead, you build against `docs/design/brand.md` and spawn an isolated Visual QA subagent to walk through the user flows in a real browser, taking screenshots at every step across mobile and desktop viewports to evaluate UI/UX and brand adherence.

If a single contract genuinely needs two methods working together (for example `design by contract` at the entry parser and `integration/e2e` for the database write), either split it into two focused contracts in the Blueprint or name the primary method and read both route files before building.

If you start implementing a contract and discover that the method chosen in the Blueprint does not fit reality, do not quietly switch methods or fake the steps. Stop, explain what changed, align with me, and update the Blueprint before continuing.
