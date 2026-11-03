# Method: Design by Contract

Your job here is to enforce strict boundaries where untrusted data enters the system or where core domain invariants must hold, following "Parse, don't validate" so that invalid states cannot enter core business logic.

## How to Plan in the Blueprint

Use `design by contract` when a contract focuses on entry boundaries (HTTP payloads, CLI arguments, environment variables, file imports, or third-party API responses) or strict domain invariants (such as account balances, state machine transitions, or permission gates). In the Blueprint contract, explicitly state:
- **Preconditions (`Input`):** What raw untrusted input arrives, where it gets parsed, and what structured domain type or schema comes out.
- **Postconditions (`Output`) & Invariants (`Behavior`):** What is guaranteed to be true after parsing or execution, so downstream functions can trust the types without defensive `if (x !== null)` checks.
- **Violations (`Failure`):** What descriptive, context-rich error is thrown or returned immediately when an input or invariant fails.

## How to Execute

1. **Define the boundary schema or domain type first:** Model the target data structure or parser at the entry boundary so that valid data is transformed into a trusted type and invalid data is rejected outright. Do not write boolean validator helpers (`isValidX(raw)`) that inspect data and leave it as an untyped raw string or object, because that forces defensive re-checking throughout the codebase (shotgun parsing).
2. **Fail fast and loud on violations:** At the boundary and on core state invariants, never write silent fallbacks (`input.price ?? 0` or empty `catch {}` blocks) that hide corrupted data. Throw or return an explicit, context-rich error immediately when a precondition or invariant is violated.
3. **Keep core logic free of defensive clutter:** Once data has passed the boundary parser, trust the parsed type inside the core business flow.
4. **Verify every boundary guarantee:** Write automated tests against the boundary entry point that prove:
   - Valid inputs (normal and boundary edge cases) parse cleanly into the expected structured output (postconditions).
   - Malformed, missing, out-of-range, or corrupted inputs fail immediately with the exact descriptive error promised by the contract (preconditions and invariants).

## Guardrails

- Never scatter validation checks for raw input deep inside internal functions; push parsing all the way to the entry boundary.
- Never coerce invalid or missing required data into silent default values unless the Blueprint contract explicitly defines that default as a business rule.
