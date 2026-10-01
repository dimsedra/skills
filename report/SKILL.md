---
name: report
description: Use when creating standalone, interactive HTML reports for code audits, walkthroughs, test summaries, architectural analyses, performance metrics, or project compendiums.
---

# Report

When I ask you to create an HTML report (e.g. via `/report`, or when presenting test results, code audits, benchmarks, or architectural summaries), handle it using these instructions:

## What I Expect from the Report

1. **Markdown-Like Clarity (`.md-like`)**:
   - The report must feel like a clean, well-typeset Markdown document rendered in HTML.
   - Prioritize high readability, spacious layouts, and clean typographic hierarchy.

2. **Creative Component Freedom (No Rigid Templates)**:
   - You are not constrained by fixed UI components. Pick and craft whatever layout elements best convey the data:
     - Metric cards, stat callouts, or flexible responsive grids (`.grid`, `.grid-2`, `.grid-3`, `.card`)
     - Clean data tables (`<table>`)
     - Collapsible deep dives (`<details><summary>...`)
     - Status badges and contextual alerts (`.badge`, `.callout`)
     - Well-formatted code snippets (`<pre><code>`)

3. **Rich Visuals: Charts & Diagrams**:
   - Use Mermaid.js (`<div class="mermaid">...`) for architecture flows, sequence interactions, or state transitions.
   - Use Chart.js (`<canvas>` + Chart.js script) or inline SVGs for performance benchmarks, test breakdowns, or quantitative metrics.

4. **Console Monospace & Deep Black Aesthetic**:
   - Keep the look technical, sleek, and developer-focused using `report.css`.
   - Dark mode is true deep black (`#050505`), not tinted blue. Light mode is cleanly supported via the theme toggle.

5. **Chat Bloat Prevention**:
   - Never print raw HTML blocks in chat. Write the report directly to disk and share a local server link.

## How to Build & Serve It

1. **Scaffold & Exclude**:
   - Keep the output local under `.report/<category>/<topic>/`.
   - Ensure `.report/` is appended to `.git/info/exclude` so it never touches git status:
     ```bash
     Add-Content -Path ".git/info/exclude" -Value ".report/" -ErrorAction SilentlyContinue
     New-Item -ItemType Directory -Force -Path ".report/<category>/<topic>"
     Copy-Item -Path "<path-to-skill>/report.css" -Destination ".report/<category>/<topic>/report.css"
     ```

2. **Compose the File**:
   - Use `REPORT-TEMPLATE.html` as your starter shell.
   - Populate content creatively according to the task.

3. **Serve Locally & Share**:
   - Launch a lightweight background HTTP server:
     ```bash
     python -m http.server 8000 --directory .report/<category>/<topic>
     ```
   - Give me the clickable link (`http://localhost:8000/index.html`) alongside a concise 2–3 bullet summary.
