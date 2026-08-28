---
name: report-in-html
description: "Use when creating standalone, interactive HTML reports for code audits, walkthroughs, test summaries, architectural analyses, or project compendiums."
---

# Report In HTML

Generate clean, standalone, minimalist, monochromatic HTML reports with integrated dark/light theme switching, high-contrast Mermaid diagrams, color-coded diff blocks, and terminal evidence containers.

This skill is a plug-and-play report generator for any orchestrator skill or ad-hoc reporting task.

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

1. **Pure Semantic HTML & Zero Inline Styles**: All styling belongs strictly in `report.css`. HTML tags MUST NOT contain `style="..."` attributes or `<style>` blocks.
2. **Auto-Launch Live HTTP Server**: Never rely on raw `file:///` URLs. Automatically launch a lightweight local HTTP server as a background daemon process (e.g. `python -m http.server <port>` or `npx serve`) and serve the report over `http://localhost:<port>/<filename>.html`.
3. **Theme Switcher & LocalStorage Memory**: Every generated HTML file must include the lightweight theme toggle script from `REPORT-TEMPLATE.html` to support seamless Dark/Light switching with user preference persistence.
4. **No Leaked Markdown**: Convert all text, bullets, bolding, and code snippets into proper HTML tags (`<p>`, `<ul>`, `<li>`, `<strong>`, `<code>`, `<pre>`). Never leave raw `**bold**` or ` `backticks` ` unparsed.
5. **Chat Bloat Prevention**: Write the complete HTML report directly to disk and deliver the live HTTP URL alongside a concise 2–3 bullet summary.
6. **High-Contrast Diagramming**: Any embedded Mermaid diagram must use the container classes and theme initialization defined in `REPORT-TEMPLATE.html` to guarantee legibility across both dark and light modes.

---

## Workflow

```
[Report Requested / Invoked] ──► [Copy or Link report.css] ──► [Assemble Components from COMPONENTS.md]
                                                                        │
                                                                        ▼
                                                             [Audit Pure HTML Hygiene]
                                                                        │
                                                                        ▼
                                                             [Auto-Launch Live Server]
                                                                        │
                                                                        ▼
                                                             [Deliver Live Localhost Link]
```

### Step 1: Scaffold Assets
Ensure `report.css` is present in the output directory or referenced via a valid relative path.

### Step 2: Select & Assemble Components
1. Copy [REPORT-TEMPLATE.html](REPORT-TEMPLATE.html) as the base document shell.
2. Populate the header with `<span class="badge">` status pills and metadata items.
3. Assemble the main body using pre-styled components from [COMPONENTS.md](COMPONENTS.md):
   - **Executive Summaries**: `<article class="card card-summary">`
   - **Diff Highlights**: `<details><summary>...</summary><pre><code>...<span class="diff-line-add">...`
   - **Verification Evidence**: `<div class="test-summary-bar">` and `<div class="terminal-output">`
   - **Architecture Diagrams**: `<div class="diagram-container"><div class="mermaid">...`
   - **Edge Cases & Guardrails**: `<div class="grid-2"><article class="card">...`

### Step 3: Validate HTML Hygiene
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
| **Raw File URL Delivery** | Giving the user a `file:///` link which has CORS/browser restrictions. | Auto-launch a background HTTP server and deliver `http://localhost:<port>/<filename>.html`. |
| **Inline Style Pollution** | Adding `style="..."` directly on tags. | Use semantic classes from `report.css` (`.badge-pass`, `.diff-line-add`, `.card-summary`). |
| **Markdown Leakage** | Pasting raw markdown text inside HTML elements. | Convert all text to semantic HTML (`<strong>`, `<code>`, `<ol>`, `<li>`). |
| **Low Diagram Contrast** | Relying on default Mermaid dark styles. | Use the high-contrast `themeVariables` configured in `REPORT-TEMPLATE.html`. |
| **Chat Output Flooding** | Printing 500 lines of raw HTML into the chat. | Write HTML to disk immediately, serve via HTTP, and share the link. |

---

## Disclosed References

- [report.css](report.css): Core monochromatic CSS engine with dark/light themes, colored diffs, and responsive layout.
- [REPORT-TEMPLATE.html](REPORT-TEMPLATE.html): Master HTML boilerplate with theme toggle and Mermaid integration.
- [COMPONENTS.md](COMPONENTS.md): Reusable component snippet catalog for rapid report assembly.
