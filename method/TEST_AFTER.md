# Method: Test-After

Your job here is to build the working implementation first when wiring glue code or exploring an unfamiliar flow whose shape is not clear upfront, and then immediately lock down its public behavior with tests that are proven to catch real failures.

## How to Plan in the Blueprint

Use `test-after` only when a contract involves glue code, orchestration wiring, or exploratory logic where writing tests first would mean guessing at internal shapes that will change as soon as you touch the real code. Never use `test-after` as a shortcut to skip testing discipline on straightforward domain logic. In the contract's `Verification`, specify the public-API test suite you will add once the flow works.

## How to Execute

1. **Build the simplest working flow:** Write the production code first, keeping logic local (Locality of Behavior), control flow flat (guard clauses at the top, max 2 levels of nesting), and signatures minimal. Run or exercise the code to confirm the core path works.
2. **Step back to the caller's perspective:** Before writing tests, stop looking at your internal lines of code and look only at the module's public entry point and the Blueprint contract. The biggest trap in `test-after` is writing tautological tests (circular tests that simply copy your implementation logic or encode whatever mistakes you just wrote as "expected behavior").
3. **Write behavioral tests across the four dimensions:** Write tests strictly against the public API using business scenario names (Given / When / Then) covering the normal path, boundaries/edge cases, error paths, and core invariants. Keep test setup explicit and local to the test file, and only mock external I/O boundaries.
4. **Prove the tests can actually fail:** Because you never saw these tests fail in a Red phase before the code existed, you must verify they are not tautological. Temporarily break or comment out the key condition or return path in your production code and run the tests to watch them fail for the right reason, then restore the production code and confirm the suite returns to green.

## Guardrails

- Never finish a `test-after` contract without running the fault check in Step 4. A test that has never been seen to fail is an unverified assumption, not proof.
- Do not write tests that mirror internal helper calls or private branches you created while exploring; test only the observable outcomes promised by the contract.
