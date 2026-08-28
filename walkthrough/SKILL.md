---
name: walkthrough
description: "Use when reporting completed implementation work, verifying delivered changes, or presenting an interactive walkthrough of new features, bugfixes, or refactors to the user."
---

# Walkthrough Report

Generate a structured post-implementation walkthrough report that transparently communicates code changes, architectural decisions, and empirical verification evidence to the user.

**REQUIRED SUB-SKILL:** Use `report-in-html` for generating and serving the standalone HTML report deliverable.

---

## Core Invariants

1. **Adaptive Depth & Length**: Scale the depth, detail, and sections dynamically based on the magnitude of the changes:
   - **Small**: 1–2 files (bugfixes, typos, minor tweaks). Compact summary, files table, test proof.
   - **Medium**: 3–8 files (standard features, isolated refactors). Mermaid diagram, component breakdown, key diffs, automated test evidence.
   - **Large**: 8+ files (major subsystems, architecture overhauls). Macro architecture, deep dive per module, detailed diff highlights, edge cases, benchmarks, rollback plan.
2. **Evidence-First Verification**: Every claim of success must be backed by real test execution logs in the terminal section. Never assert that something works without running the verification command.
3. **Auto-Launch Live Server & Localhost Delivery**: Always auto-launch a local HTTP server in the background and deliver a live `http://localhost:<port>/<filename>.html` link. Never force the user to navigate raw `file:///` paths.
4. **Delegated HTML Generation**: Use the templates, stylesheets (`report.css`), and components from `report-in-html` to generate the HTML report.
5. **Chat Bloat Prevention**: Write the HTML file directly to disk rather than dumping large HTML documents into the chat transcript.
6. **Diligent Reporter Posture**: Act as a diligent engineering partner reporting to the user. Explain *why* choices were made, *what* files changed, and *how* it was verified.

---

## Workflow

```
[/walkthrough Invoked] ──► [Inspect Git Tree & Changes] ──► [Classify Scope (Small / Med / Large)]
                                                                      │
                                                                      ▼
                                                          [Gather Real Test Evidence]
                                                                      │
                                                                      ▼
                                                      [Generate HTML via report-in-html]
                                                                      │
                                                                      ▼
                                                      [Auto-Launch Background Live Server]
                                                                      │
                                                                      ▼
                                                      [Deliver Live Localhost Link]
```

### Step 1: Inspect Changes & Classify Scope
Run `git status` or inspect recent file modifications to determine the scope tier:
- **Small Scope**: 1–2 files modified, minimal logic changes.
- **Medium Scope**: 3–8 files modified, new services/components added.
- **Large Scope**: 8+ files modified, breaking changes, or cross-cutting subsystems.

### Step 2: Gather Test Evidence
Execute automated tests or build verification commands. Capture the real terminal stdout/stderr to include in the Verification section of the report.

### Step 3: Construct Report via `report-in-html`
- Use the boilerplate and stylesheet from `report-in-html`.
- Assemble components matching the classified scope tier.
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
| **Raw File Path Link** | Providing `file:///` links that trigger browser security/CORS restrictions. | Auto-launch local HTTP server and share `http://localhost:<port>/<filename>.html`. |
| **Hallucinated Verification** | Writing "All tests pass" without actually running the test suite. | Run verification commands and paste the exact terminal output into `.terminal-output`. |
| **One-Size-Fits-All Bloat** | Writing a 500-line report for a 1-line typo fix, or writing 3 sentences for a 20-file refactor. | Apply Adaptive Depth: Small changes get compact reports, large changes get comprehensive deep dives. |
| **Inline Style Pollution** | Adding `style="..."` directly in HTML tags. | Strictly rely on `report.css` from `report-in-html`. |
| **Chat Dump Bloat** | Printing the entire HTML source code in chat. | Write the file to disk directly, serve via HTTP, and share the link with a short executive summary. |

---

## Disclosed References

- [SCHEMA.md](SCHEMA.md): Scope section requirements and content mapping.
- `report-in-html`: Reusable HTML report generator skill and stylesheet.
