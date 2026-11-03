# Method Skill

Routes to the right implementation and verification workflow (`TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, or `visual testing`) both when planning Blueprint contracts via `/blueprint` and when building code or front-end interfaces.

## Install

```bash
npx skills add dimsedra/skills --skill method
```

## Routes

- **TDD** (`TDD.md`): Red-Green-Refactor loop against the module's public API using sociable tests for new behavior with known boundaries.
- **Characterization** (`CHARACTERIZATION.md`): Locks down existing behavior with passing tests and commits the green baseline before refactoring or migrating internals.
- **Test-After** (`TEST_AFTER.md`): Builds glue or exploratory code first, then writes public-API behavioral tests and runs a manual fault check to prove the tests are not circular.
- **Design by Contract** (`DESIGN_BY_CONTRACT.md`): Enforces "Parse, don't validate" at system entry boundaries and fails fast on violated preconditions or domain invariants.
- **Integration / E2E** (`INTEGRATION_E2E.md`): Exercises real module seams and local input/output boundaries (databases, file systems, HTTP, CLI processes) without mocking the boundary under test.
- **Visual Testing** (`VISUAL_TESTING.md`): Grounds front-end UI work in `docs/design/brand.md`, avoids AI design clichés, and spawns an isolated Visual QA subagent to explore user flows in a real browser across mobile (`360x640`) and desktop (`1280x800`) viewports, taking screenshots at every step to evaluate UI/UX and brand adherence.

## Usage

```text
/method
/method tdd
/method characterization
/method visual testing
```
