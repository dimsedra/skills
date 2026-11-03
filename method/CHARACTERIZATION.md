# Method: Characterization

Your job here is to lock down what existing code actually does today with passing tests before you refactor, restructure, or migrate its internals. Unlike `TDD`, where you start with a failing test for new behavior, characterization testing starts by building a green safety net on top of the untouched code so you can change the inside without breaking the outside.

## How to Plan in the Blueprint

Use `characterization` when a contract restructures modules, simplifies control flow, extracts or inlines logic, or migrates an implementation while keeping external behavior identical. Plan the contract's `Commit` sequence into at least two distinct steps: first a `test: ...` commit that adds or completes the passing characterization tests against the existing code, followed by the `refactor: ...` commit that changes the implementation without modifying those test assertions.

## How to Execute

1. **Leave production code untouched first:** Do not edit the implementation yet. Put the existing public entry point under a test harness using real internal collaborators, stubbing only true external I/O boundaries if needed to run deterministically.
2. **Capture actual behavior across all four dimensions:** Write scenario-based tests against the public API covering normal inputs, boundary values, error cases, and state invariants. If you are not 100% sure what the existing code returns or throws for a tricky case, write a deliberate dummy assertion first, run the test to let the failure output show you the real behavior, and update the assertion to lock that real behavior in. If you uncover something that looks like an existing bug, do not silently "fix" it inside a refactor. Flag it to me so we decide whether callers depend on it.
3. **Commit the green baseline:** Run the test suite and make sure every characterization test passes against the old code. Commit the tests on their own before touching production logic.
4. **Refactor the internals:** Rewrite, move, or simplify the internal implementation while keeping the characterization tests untouched and green after each small change. If a characterization test breaks during your refactor, your refactor changed external behavior or your test was coupled to private implementation details, so fix the regression rather than weakening the test.

## Guardrails

- Never change the test assertions and the production implementation in the same step when doing a behavior-preserving refactor. If both change at once, you have lost your proof that behavior stayed identical.
- Test strictly via the public contract so you remain free to delete or reshape private functions, internal classes, and data structures inside the module.
