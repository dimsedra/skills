## Engineering Rules & Directives

### Primary Directive

Write code I can read, trace, and defend in a peer review in under 30 seconds. Prioritize cognitive simplicity, explicit execution flows, and ease of deletion over cleverness or dogma, and apply this mindset across all skills. Before proposing architecture, writing code, or structuring tests, check your plan directly against the exact constraints below rather than a vague gist.

### 1. Architecture & Abstraction (AHA > DRY)

Prefer duplication over premature abstraction. Do not extract shared helpers, base classes, or generic wrappers until a pattern repeats at least 3 times and its future variation is certain. Solve only the immediate problem (YAGNI): no speculative config parameters, plugin architectures, or hooks. Do not create interfaces or abstract classes for a single implementation unless mocking an external I/O boundary (database, third-party API). If an abstraction genuinely helps, invoke `/align` first; once approved, recommend `/document`.

### 2. Structure & Modularity (Deep Modules & Locality)

Keep code that changes together in the same file or folder so a feature reads top to bottom and can be deleted cleanly (Locality of Behavior). Build deep modules with minimal signatures that encapsulate substantial work. Do not split sequential logic into micro-functions just for shortness; extract a function only for a distinct domain concept or real cognitive relief.

### 3. Data Integrity & Error Handling (Parse, Don't Validate)

Parse untrusted data (API payloads, user input, env vars) strictly at the entry boundary using schemas or strict types, then trust those types inside core logic without defensive `if (x !== null)` clutter. Fail fast and loud: never write silent fallbacks (`?? 0`, empty `catch` blocks). Throw descriptive errors when invariants break, and catch errors only to recover or add context before re-throwing.

### 4. Code Style & Readability (Boring is Good)

Write boring, obvious code ready for a 2:00 AM outage: no complex regexes, bitwise hacks, nested ternaries, or obscure tricks. Flatten control flow with top-level guard clauses (early returns) and never nest blocks more than 2 levels deep. Fix bugs and newly discovered edge cases by rethinking the data representation or main logic, never by bolting on special-case `if` patches. Do not use boolean flags in function signatures; pass a named options object or split into distinct functions. Name variables for what they hold and functions for what they do (avoid `data`, `info`, `handler`, `manager`, `temp`). Comment the "why", never the "what".

### 5. Testing (Behavior-Driven via Public API)

Test strictly through the module's public API, never implementation details, and never export internals just to test them. Do not write unit tests for frontend UI rendering, layout, styling, or interaction (use `method/VISUAL_TESTING.md` via `/method`). Mock only external I/O boundaries (third-party APIs, network, system clock) and use real instances for core domain logic. Assert on outcomes (return values, state changes, observable side effects), not internal call sequences unless that external side effect is the requirement. Name tests by business scenario (Given / When / Then), keep setup local and explicit, and produce readable logs covering normal paths, boundaries/edge cases, error paths, and core invariants.

### 6. Workflow & Collaboration Rules

Before your first reply, file read, or tool call, scan available skills and read the matching `SKILL.md` first, even for quick requests or inline code.

Run skills behind the scenes as one system so conversation stays in flow: I own decisions and approvals, you own momentum. Never end a turn with an open-ended menu; propose the single clearest next step in plain language.
- Think, align, and ground first via `/align`, `/research`, `/explain`, and `/learn` until we share the exact picture.
- Write or edit code only after I explicitly confirm. Use `/implement` with `/method` for small changes, or freeze large work in `/intent` and `/blueprint` before `/implement` or `/ship` + `/audit`. If codebase reality conflicts with our plan, stop immediately and return to `/align`.
- Prove completed work with real evidence in `/proof`, walk through incoming diffs with `/review`, and compound session lessons via `/reflect`.

Before writing code, match surrounding libraries and patterns. Keep diffs minimal and focused with no unrequested drive-by refactoring. If a request introduces security flaws, race conditions, or severe anti-patterns, push back early with a brief explanation and a simpler, safer alternative.

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
