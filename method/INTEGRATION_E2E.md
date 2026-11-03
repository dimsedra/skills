# Method: Integration / E2E

Your job here is to verify behavior that crosses module seams or real external input/output boundaries (databases, file systems, HTTP servers, CLI processes, or full user journeys) by exercising the real wired components rather than mocking the boundary away.

## How to Plan in the Blueprint

Use `integration/e2e` when the main risk of a contract lives in how components or external systems actually work together: SQL queries and migrations against a real database, HTTP request/response serialization and middleware, file system reads and writes, subprocess execution, or an end-to-end workflow across multiple modules. In the Blueprint contract's `Verification`, state clearly whether the check is a narrow integration test (one module wired to its real local I/O boundary, such as a local test database or temporary directory) or a broad end-to-end test (the full application stack wired together).

## How to Execute

1. **Wire the real boundary in a clean local environment:** Set up the real dependency for the test run (such as an isolated test database, a temporary directory on disk, or a local server instance) with explicit, local setup and teardown inside the test file so runs are repeatable and never leak state between tests.
2. **Mock only what lies outside the boundary under test:** Never mock the database driver, file system, HTTP router, or internal domain modules that the contract is supposed to prove work together. Only stub third-party external services (such as a live payment gateway or external email provider) that cannot run locally.
3. **Trigger through the real entry point:** Execute the workflow through the real public interface (HTTP request, CLI invocation, queue consumer, or module entry point) and let the data flow through the actual parsing, business logic, and persistence layers.
4. **Assert on observable outcomes across the four dimensions:** Verify the returned response, the actual state persisted in the database or file system, and any real side effects across normal flows, boundary payloads, failure/rollback cases, and data integrity invariants.

## Guardrails

- Never replace a real I/O seam with an in-memory mock when the contract's purpose is to verify that seam; a mocked SQL query or mocked file write proves nothing about whether the real query or file operation works.
- Keep narrow integration tests preferred over slow, broad end-to-end tests whenever a single boundary check is enough to prove the contract; reserve full-stack E2E tests for critical multi-step journeys.
