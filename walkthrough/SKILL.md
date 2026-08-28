---
name: walkthrough
description: "Use when reporting completed implementation work, verifying delivered changes, or presenting an interactive walkthrough of new features, bugfixes, or refactors to the user."
---

# Walkthrough Report

Generate a structured post-implementation walkthrough report that transparently communicates code changes, architectural decisions, and empirical verification evidence to the user.

**REQUIRED SUB-SKILL:** Use `report-in-html` for generating and serving the standalone HTML report deliverable.

---

## Core Invariants

1. **Context-Driven Structural Composition**: Scale depth and composition dynamically based on what actually changed. Never copy templates blindly or include filler sections. Tailor diagrams, tables, diffs, and notes to the specific domain (e.g., backend logic, API routes, database schemas, UI components).
2. **Annotated Code Highlights (No Naked Diffs)**: Every code highlight or diff block must include an explicit **Logic & Mechanics Breakdown** using `.code-annotation` (Input -> Process / Cause & Effect -> Output) explaining line-by-line rationale for critical logic.
3. **Adaptive Depth & Length**: Scale detail dynamically based on change magnitude:
   - **Small**: 1–2 files (bugfixes, typos, minor tweaks). Compact summary, files table, test proof.
   - **Medium**: 3–8 files (standard features, isolated refactors). Focused diagram if helpful, component breakdown, annotated key diffs, automated test evidence.
   - **Large**: 8+ files (major subsystems, architecture overhauls). Macro architecture, deep dive per module, annotated diff highlights, edge cases, benchmarks, rollback plan.
4. **Evidence-First Verification**: Every claim of success must be backed by real test execution logs in the terminal section. Never assert that something works without running the verification command.
5. **Auto-Launch Live Server & Localhost Delivery**: Always auto-launch a local HTTP server in the background and deliver a live `http://localhost:<port>/<filename>.html` link. Never force the user to navigate raw `file:///` paths.
6. **Delegated HTML Generation**: Use the stylesheets (`report.css`) and modular components from `report-in-html` to generate the HTML report.
7. **Chat Bloat Prevention**: Write the HTML file directly to disk rather than dumping large HTML documents into the chat transcript.
8. **Diligent Reporter Posture**: Act as a diligent engineering partner reporting to the user. Explain *why* choices were made, *what* files changed, *how* the code functions, and *how* it was verified.
9. **Conversational Language Alignment**: Write all explanations, analysis, titles, and annotations in the active language of the conversation with the user (e.g. Indonesian if the conversation is conducted in Indonesian). Keep code identifiers and syntax in their original language.
10. **Continuous Preference Memory Hook**: Prior to composing the walkthrough, check if `.reporting-preferences.md` exists in the workspace root. If found, strictly adhere to the recorded preferences (e.g. test evidence placement, diff granularity). If absent, use standard defaults—do not create empty files speculatively. If the user provides feedback on walkthrough delivery, record it into `.reporting-preferences.md`.

---

## Workflow

```
[/walkthrough Invoked] ──► [Check Preferences & Inspect Changes] ──► [Classify Scope (Small / Med / Large)]
                                                                               │
                                                                               ▼
                                                                   [Gather Real Test Evidence]
                                                                               │
                                                                               ▼
                                                               [Compose Tailored HTML via report-in-html]
                                                                               │
                                                                               ▼
                                                               [Auto-Launch Background Live Server]
                                                                               │
                                                                               ▼
                                                               [Deliver Live Localhost Link]
```

### Step 1: Check Preferences & Inspect Changes
1. **Check Preference Memory:** Inspect `./.reporting-preferences.md` in workspace root. If present, load user preferences for walkthrough formatting and evidence placement.
2. **Inspect Changes & Classify Scope:** Run `git status` or inspect recent file modifications to determine scope:
- **Small Scope**: 1–2 files modified, minimal logic changes.
- **Medium Scope**: 3–8 files modified, new services/components added.
- **Large Scope**: 8+ files modified, breaking changes, or cross-cutting subsystems.

### Step 2: Gather Test Evidence
Execute automated tests or build verification commands. Capture the real terminal stdout/stderr to include in the Verification section of the report.

### Step 3: Construct Tailored Report via `report-in-html`
- Use the boilerplate and stylesheet from `report-in-html`.
- Assemble components matching the classified scope tier and specific problem domain.
- Add `.code-annotation` to all code highlights detailing Input, Key Lines / Mechanics, and Output.
- Ensure pure HTML hygiene (zero inline styles, no leaked markdown).

### Step 4: Auto-Launch Live Server & Deliver Link
1. Save the file to the target location (e.g. `walkthrough.html` or `docs/walkthroughs/walkthrough-<feature>.html`).
2. Auto-launch background HTTP server if not already running.
3. Output the clickable live localhost URL: `Open Walkthrough: http://localhost:<port>/<filename>.html`.
4. Provide a brief 2–3 bullet conversational overview in the chat.

---

## Failure Modes & Guardrails

| Failure Mode | Root Cause | Guardrail / Fix |
|---|---|---|
| **Naked Code Diffs** | Pasting code diffs with zero explanation. | Always attach `.code-annotation` with Input-Process-Output and line-by-line mechanics. |
| **Cookie-Cutter Bloat** | Copying a fixed template 1:1 regardless of task needs. | Adapt sections dynamically; omit irrelevant diagrams or filler cards. |
| **Raw File Path Link** | Providing `file:///` links that trigger browser security/CORS restrictions. | Auto-launch local HTTP server and share `http://localhost:<port>/<filename>.html`. |
| **Hallucinated Verification** | Writing "All tests pass" without actually running the test suite. | Run verification commands and paste the exact terminal output into `.terminal-output`. |
| **Inline Style Pollution** | Adding `style="..."` directly in HTML tags. | Strictly rely on `report.css` from `report-in-html`. |
| **Chat Dump Bloat** | Printing the entire HTML source code in chat. | Write the file to disk directly, serve via HTTP, and share the link with a short executive summary. |

---

## Disclosed References

- [SCHEMA.md](SCHEMA.md): Scope section requirements, component catalog, and annotated code diff blueprints.
- `report-in-html`: Reusable HTML report generator skill and stylesheet.
