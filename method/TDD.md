# Method: TDD

Your job here is to build new behavior through a strict Red-Green-Refactor loop against the module's public API, using tests to drive the design and verify behavior before the implementation exists.

## How to Plan in the Blueprint

When a contract uses `tdd`, its inputs, expected outputs, failure modes, and public interface must be clear enough to write a test before writing code. Shape the contract's `Verification` around running the public-API test suite across the four dimensions (normal path, boundaries/edge cases, error paths, and core invariants), and plan atomic `Commit` steps that reflect incremental delivery.

## How to Execute

Work one scenario at a time through three steps, and never batch all tests and all production code together:

1. **Red (Write a failing test first):** Write a test that calls the module's public entry point (exported function, HTTP endpoint, or domain contract) for a concrete user or business scenario (for example, "rejects checkout when cart exceeds credit limit"). Run the test runner and watch the test fail for the exact reason you expect. If the test passes immediately or fails because of a broken import or syntax typo, fix the test until it fails on the missing behavior.
2. **Green (Make the test pass with minimal code):** Write the simplest, most direct production code that makes the failing test pass. Do not add speculative abstractions, extra configuration flags, or future-proofing for scenarios you have not tested yet. Run the test runner to confirm it turns green.
3. **Refactor (Clean up while staying green):** With the test passing, clean up duplication, flatten control flow with guard clauses (max 2 levels of indentation), and make variable and function names clear. Run the tests again after every change to prove the external behavior stayed intact.

Repeat this loop across the four dimensions that matter for the contract: the normal happy path, boundary conditions, explicit error paths, and core domain invariants.

## Guardrails

- Test strictly through the public API. Never export private helpers or internal state just to test them, and never assert on internal call sequences (`toHaveBeenCalledWith`) unless firing an external side effect is the business requirement itself.
- Write sociable tests: use real instances of internal domain collaborators and only stub or mock external I/O boundaries (databases, third-party APIs, network calls, or the system clock).
- Keep test setup explicit and local to the test file rather than hiding context inside shared, magical fixtures.
