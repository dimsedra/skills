---
name: report-in-html
description: "Use when creating standalone, interactive HTML reports for code audits, walkthroughs, test summaries, architectural analyses, or project compendiums."
---

# Report In HTML

Generate clean, standalone, minimalist, monochromatic HTML reports with integrated dark/light theme switching, high-contrast Mermaid diagrams, annotated code diff blocks, and terminal evidence containers.

This skill is a modular design system and component toolkit for any orchestrator skill or ad-hoc reporting task.

---

## When to Use

- When delivering comprehensive test results, audit findings, or architecture overhauls to the user.
- When presenting complex multi-file code diffs that would cause massive bloat in the chat transcript.
- When an orchestrator skill needs to compile and render a persistent, styled HTML deliverable.

### When NOT to Use
- For simple one-line answers, conversational queries, or trivial command outputs (respond directly in chat instead).
- When a raw Markdown artifact or summary is sufficient and no rich visual layout is requested.

---

## Core Invariants

1. **Context-Adaptive Composition (No Rigid Template Copying)**: `REPORT-TEMPLATE.html` and `COMPONENTS.md` serve as a reference foundation and UI toolkit. Do NOT clone the template 1:1 blindly. Tailor the sections, visual hierarchy, diagrams, grids, and tables dynamically to fit the specific feature, architecture, or audit context.
2. **Annotated Code Highlights (No Naked Diffs)**: Every code diff or snippet must be paired with an explicit **Logic & Mechanics Breakdown** using `.code-annotation` (Input -> Process / Cause & Effect -> Output) with line-by-line rationale for critical logic.
3. **Pure Semantic HTML & Zero Inline Styles**: All styling belongs strictly in `report.css`. HTML tags MUST NOT contain `style="..."` attributes or `<style>` blocks.
4. **Monochromatic Visual Identity**: Preserve the high-contrast monochromatic design language (dark mode default with light mode toggle) across all custom layouts.
5. **Auto-Launch Live HTTP Server**: Never rely on raw `file:///` URLs. Automatically launch a lightweight local HTTP server as a background daemon process (e.g. `python -m http.server <port>` or `npx serve`) and serve the report over `http://localhost:<port>/<filename>.html`.
6. **Theme Switcher & LocalStorage Memory**: Every generated HTML file must include the lightweight theme toggle script from `REPORT-TEMPLATE.html` to support seamless Dark/Light switching with user preference persistence.
7. **No Leaked Markdown**: Convert all text, bullets, bolding, and code snippets into proper HTML tags (`<p>`, `<ul>`, `<li>`, `<strong>`, `<code>`, `<pre>`). Never leave raw `**bold**` or ` `backticks` ` unparsed.
8. **Chat Bloat Prevention**: Write the complete HTML report directly to disk and deliver the live HTTP URL alongside a concise 2–3 bullet summary.
9. **High-Contrast Diagramming**: Any embedded Mermaid diagram must use the container classes and theme initialization defined in `REPORT-TEMPLATE.html` to guarantee legibility across both dark and light modes.
10. **Conversational Language Alignment**: Generate all document prose, section titles, summaries, diagrams, and annotations in the primary conversational language used by the user (e.g. Indonesian if the user speaks Indonesian, English if in English). Technical code symbols, identifiers, and syntax remain in their native format.
11. **Continuous Preference Memory Hook**: Prior to generating any report, check if `.reporting-preferences.md` exists in the workspace root. If present, load and strictly adhere to its rules (explanation style, diagram choices, verification layout). If absent, proceed with standard defaults—do not create placeholder files speculatively. If the user provides feedback during the session, capture and record it into `.reporting-preferences.md` (see [PREFERENCES-SCHEMA.md](PREFERENCES-SCHEMA.md)).

---

## Workflow

```
[Report Requested / Invoked] ──► [Copy or Link report.css] ──► [Select & Compose Tailored Layout]
                                                                        │
                                                                        ▼
                                                             [Audit HTML & Annotations]
                                                                        │
                                                                        ▼
                                                             [Auto-Launch Live Server]
                                                                        │
                                                                        ▼
                                                             [Deliver Live Localhost Link]
```

### Step 1: Scaffold Assets
Ensure `report.css` is present in the output directory or referenced via a valid relative path.

### Step 2: Dynamically Compose Layout
1. Use [REPORT-TEMPLATE.html](REPORT-TEMPLATE.html) for document boilerplate, `<head>` styles, theme toggle script, and Mermaid initializer.
2. Populate the header with `<span class="badge">` status pills and metadata items.
3. Compose the main body dynamically using components from [COMPONENTS.md](COMPONENTS.md) tailored to the task:
   - **Executive Summaries**: `<article class="card card-summary">` for problem & solution framing.
   - **Annotated Diffs**: `<details><summary>...</summary><pre><code>...</code></pre><div class="code-annotation">...</div></details>` breaking down Input, Key Logic, and Output.
   - **Architecture / Data Flow**: `<div class="diagram-container"><div class="mermaid">...` when visual flows clarify subsystem interactions.
   - **Verification Evidence**: `<div class="test-summary-bar">` and `<div class="terminal-output">` with real test execution logs.
   - **Edge Cases & Guardrails**: `<div class="grid-2">` or custom grids for boundary notes and tradeoffs.

### Step 3: Validate HTML Hygiene & Annotations
- Confirm all code snippets include a `.code-annotation` block detailing Input-Process-Output.
- Confirm zero instances of `style=` in the generated HTML.
- Confirm zero unparsed Markdown symbols (`**`, `##`, `*`, ```` ``` ````).
- Ensure all `<pre><code>` blocks have escaped HTML entities (`&lt;`, `&gt;`, `&amp;`).

### Step 4: Auto-Launch Live Server & Deliver Link
1. Launch background HTTP server (e.g. `python -m http.server 3456` or next available port) if not already running.
2. Deliver the live clickable browser link in chat: `Open Report: http://localhost:<port>/<filename>.html`.
3. Provide a concise 2–3 bullet summary of findings/changes.

---

## Failure Modes & Guardrails

| Failure Mode | Root Cause | Guardrail / Fix |
|---|---|---|
| **Cookie-Cutter Cloning** | Copying `REPORT-TEMPLATE.html` 1:1 regardless of the task context. | Treat templates as a toolkit; select and adapt components strictly based on what is being reported. |
| **Naked Code Diffs** | Dumping code diffs without logic explanations. | Always attach `.code-annotation` with Input-Process-Output and line-by-line mechanics. |
| **Raw File URL Delivery** | Giving the user a `file:///` link which has CORS/browser restrictions. | Auto-launch a background HTTP server and deliver `http://localhost:<port>/<filename>.html`. |
| **Inline Style Pollution** | Adding `style="..."` directly on tags. | Use semantic classes from `report.css` (`.badge-pass`, `.diff-line-add`, `.card-summary`). |
| **Markdown Leakage** | Pasting raw markdown text inside HTML elements. | Convert all text to semantic HTML (`<strong>`, `<code>`, `<ol>`, `<li>`). |
| **Low Diagram Contrast** | Relying on default Mermaid dark styles. | Use the high-contrast `themeVariables` configured in `REPORT-TEMPLATE.html`. |
| **Chat Output Flooding** | Printing 500 lines of raw HTML into the chat. | Write HTML to disk immediately, serve via HTTP, and share the link. |

---

## Disclosed References

- [report.css](report.css): Core monochromatic CSS engine with dark/light themes, annotated diffs, and responsive layout.
- [REPORT-TEMPLATE.html](REPORT-TEMPLATE.html): Master HTML boilerplate with theme toggle and Mermaid integration.
- [COMPONENTS.md](COMPONENTS.md): Reusable component snippet catalog for rapid report assembly.
