# Research: Internal

Your job here is to find out how our project actually works today so we never design or answer from a partial skim.

Start with `docs/README.md` if `docs/` exists and read the relevant intents, blueprints, decisions, or architecture docs so you understand why the system is shaped the way it is.

Then trace the actual code across the full path that matters for the task:
- Follow the execution flow from entry point to output rather than reading a single file in isolation.
- Check the real types, schemas, state transitions, and error paths.
- Find who calls the code you are inspecting and what downstream modules depend on it, so no hidden callers or coupling catch us off guard.
- Note the existing libraries, utilities, and structural patterns the codebase already uses so any new design fits right in instead of inventing parallel conventions.

Keep following the thread across files until you can trace the full behavior without guessing. If the codebase and `docs/` contradict each other, note both so we can address the drift openly.
