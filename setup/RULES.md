## Engineering Rules & Directives

### Primary Directive

Write code that I can 100% defend, easily understand, and completely own. I must be able to read, trace, and justify every line of code you generate during a strict peer code review in under 30 seconds. Prioritize cognitive simplicity, explicit execution flows, and ease of deletion over textbook dogma or cleverness. Anchor all skill invocations (such as `/align`, `/reflect`, `/explain`, `/learn`, `/document`, `/adr`, `/rfc`, `/intent`, `/blueprint`, `/method`, `/implement`, `/ship`, `/proof`, `/review`, or `/audit`) in this exact mindset.

Never rely on a vague recollection of what I want. Before proposing architecture, generating code, or structuring tests, verify your approach directly against the exact constraints in this document (such as the AHA 3-repetition rule, no boolean flags in signatures, max 2 levels of indentation, and testing strictly via public APIs).

### 1. Architecture & Abstraction (AHA > DRY)

Prefer duplication over premature abstraction. Do not extract shared helpers, base classes, or generic wrappers until a pattern is repeated at least 3 times in my codebase and its future variation is certain. Solve only my immediate problem (YAGNI): do not add configuration parameters, plugin architectures, or extensible hooks "just in case" I need them later. Stop creating unnecessary interfaces or abstract classes when there is only one implementation, unless I explicitly ask you to mock an external I/O boundary like a database or third-party API.

If an abstraction genuinely helps, pause and invoke `/align` to discuss it with me first. Once I approve it, proactively recommend documenting it via `/document`.

### 2. Structure & Modularity (Deep Modules & Locality)

Keep code that changes together in the same file or directory (Locality of Behavior). Let me read a feature's entire execution flow from top to bottom in one file rather than forcing me to jump across 6 different folders. Build deep modules rather than shallow ones: write functions and modules with simple, minimal signatures (few parameters, clear return types) that encapsulate substantial work inside.

Do not fragment sequential logic into micro-functions. Do not split a sequential 40-line business flow into five 8-line private functions just to make functions look short; extract a function only when it represents a distinct, reusable domain concept or significantly reduces my cognitive load. Isolate feature logic so I can delete a feature by removing a single file or folder rather than surgically editing 15 shared files.

### 3. Data Integrity & Error Handling (Parse, Don't Validate)

Validate and parse untrusted data (API payloads, user input, env vars) strictly at the entry boundary using schemas or strict types. Once inside the core business logic, trust the data types and do not clutter core logic with defensive `if (x !== null)` checks.

Fail fast and loud. Never write silent fallbacks (such as `const price = input.price ?? 0` or empty `catch (e) {}` blocks) that hide underlying bugs or corrupted state. Throw a descriptive, context-rich error immediately when an invariant is violated. Catch an error only if you have enough context to recover from it or add meaningful context before re-throwing; otherwise, let it bubble up to my boundary error handler.

### 4. Code Style & Readability (Boring is Good)

Write boring, obvious code. Avoid complex regexes, bitwise hacks, nested ternary operators, or obscure language features; write code as if I will be debugging it at 2:00 AM during an outage. Flatten control flow by using guard clauses (early returns) at the top of functions to handle edge cases and errors, keeping the happy path unindented at the main level and never nesting blocks more than 2 levels deep. When fixing a bug or handling a newly discovered edge case, treat it as if it were known from day one: rethink the underlying data representation or universal logic so the case is handled naturally by the main flow, rather than bolting on additive special-case `if` patches (symptom patching).

Do not use boolean flags in function signatures (e.g., `processUser(user, true, false)`); pass a named options object or split it into distinct, explicitly named functions. Name variables after what data they hold and functions after what they actually do, avoiding vague, overlapping names (`data`, `info`, `handler`, `manager`, `temp`) and overly clever jargon. Comment the "why", never the "what": do not write comments that narrate what the code is doing, only why a non-obvious decision, trade-off, or workaround was necessary.

### 5. Testing (Behavior-Driven via Public API)

Write tests strictly against the module's public API (entry points, exported functions, HTTP endpoints, or domain contracts), never against implementation details. Do not create test cases for frontend UI files such as component rendering, layout, styling, or visual interaction (focus UI verification on `method/VISUAL_TESTING.md` via `/method`), and do not export or expose private functions or internal state just to test them. My tests must be resilient to refactoring and pass without modification if I completely rewrite the internal implementation of a module while keeping its external behavior identical.

Minimize mocking by mocking only at architectural boundaries. Do not mock internal collaborators, private methods, or domain classes; use real instances for core domain logic and only mock or stub external I/O boundaries (such as third-party APIs, payment gateways, system clock, or network calls). Assert on outcomes (returned values, state mutations, or observable side effects) rather than brittle internal call sequences (e.g., `expect(internalHelper).toHaveBeenCalledWith(...)`), unless firing that specific external side effect is the core business requirement.

Structure and name tests around user or business scenarios (Given / When / Then, e.g., "rejects checkout when cart exceeds credit limit"), not method names. Keep test setup explicit and local to the test file rather than hiding critical context in shared, magical test fixtures, and produce clean, readable test logs that I can easily understand across 4 dimensions: normal path, boundaries/edge cases, error paths, and core invariants.

### 6. Workflow & Collaboration Rules

Only start writing or editing code when I explicitly ask you to build or change something, and make progress in small, bite-sized increments rather than huge code changes all at once. Check the surrounding files before writing code so you match my existing libraries, utilities, and architectural patterns instead of inventing new ones. Keep diffs minimal and focused by modifying only the lines necessary to fulfill my request; do not perform unrequested drive-by refactoring, formatting changes, or variable renaming in unrelated parts of the file.

If my prompt asks for an implementation that introduces security flaws, race conditions, or severe anti-patterns, push back early: warn me briefly, explain the problem clearly, and propose a safer, simpler alternative before generating code. For approved blueprints or multi-step changes, build against the Blueprint contracts, verify each capability according to its agreed verification strategy, and prove completion via `/proof` with radical transparency.

## UI Design & Front-End Philosophy

For any front-end UI, styling, layout, or component work, strictly invoke and follow `/method` (`method/VISUAL_TESTING.md`): enforce brand grounding and obtain approval on `docs/design/brand.md` (SOT) before coding, and verify the user flows in a real browser with screenshots at every step across mobile and desktop viewports (inline for quick UI fixes, or by dispatching an isolated Visual QA subagent reading the full path to `VISUAL_TESTING.md` for new screens, multi-step flows, and Blueprint contracts) to evaluate UI/UX, brand adherence, and visual slop before declaring work done.

## Technical Documentation, Specifications & Planning

Treat `docs/` as our project's shared memory on disk, indexed by `docs/README.md`. Before designing, building, debugging, or answering questions about the project, check `docs/README.md` and read the relevant files in `docs/` so you understand our existing intents, blueprints, architectural decisions, domain concepts, and lessons instead of guessing from code alone.

When creating or updating anything inside `docs/`, never make unilateral assumptions on high-level decisions (calibrate with me via `/align` first), catalog every new or updated file in `docs/README.md`, and strictly follow the matching skill:
- `/intent` (`docs/intent/`): Shared alignment, goals, rationale, and boundaries.
- `/blueprint` (`docs/blueprint/`): Technical architecture, module boundaries, contracts, verification methods, and planned commits.
- `/adr` (`docs/decisions/`): Architectural Decision Records and trade-offs.
- `/rfc` (`docs/rfc/`): Technical proposals and Requests for Comments.
- `/document` (`docs/architecture/`, `docs/concepts/`, `docs/guides/`, `docs/reference/`): General project documentation and references.
- `/learn` (`docs/lesson/`): Transferable engineering lessons and runnable example scripts.
- `/report` (`docs/report/`): Standalone interactive HTML reports.
- `/method` (`docs/design/brand.md` via `method/VISUAL_TESTING.md`): Brand and UI design source of truth.

Respect how `docs/` is tracked in version control:
- If `docs/` is in `.gitignore` (or otherwise excluded from VCS), treat that as intentional. Do not remove it from `.gitignore`, change ignore rules to track it, or use `git add -f`.
- If `docs/` has its own `.git` (nested repo or submodule), treat it as a separate repository. Run all git commands for it from inside it (e.g. `git -C docs ...`) and push only to its own remote.
- If `docs/` is in a nested separate repository, never reference, mention, or write links to it inside the parent codebase (e.g. in source files, docstrings, code comments, or codebase READMEs).
- In both cases, never stage or commit `docs/` files as part of the parent project's commits.
- If `docs/` is a normal tracked folder in the project repo (not ignored, no `.git` of its own), handle it like any other directory.
- If it is unclear whether `docs/` should be tracked, or where it should be committed, ask me before changing anything.

## Subagent Behavior & Delegation

Subagents must strictly read only the files or line ranges explicitly instructed by you (the parent agent) or me, or those strictly necessary to accomplish the scoped task. Never speculatively wander across the repository, inspect unrelated files, or overread broad context. Keep file exploration tightly bounded, clear-cut, and disciplined at all times.
