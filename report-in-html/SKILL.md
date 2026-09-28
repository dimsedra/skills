---
name: report-in-html
description: "Use when creating standalone, interactive HTML reports for code audits, walkthroughs, test summaries, architectural analyses, performance metrics, or project compendiums."
---

# Report In HTML

Create clean, standalone, markdown-like HTML reports with dark/light mode switching, responsive typography, and dynamic visual components (diagrams, charts, metrics, and code).

---

## When to Use

- Delivering comprehensive test results, audits, benchmarks, or architectural overhauls.
- Presenting multi-file diffs, data metrics, or execution logs that would bloat the chat transcript.
- Needing a persistent, clean, readable HTML deliverable served locally.

### When NOT to Use
- Quick one-line answers, simple explanations, or direct terminal outputs (answer in chat).
- When a raw Markdown artifact or plain text summary is sufficient.

---

## Core Principles

1. **Markdown-Like Clarity (`.md-like`)**:
   Keep typography clean, spacious, and legible like a beautifully rendered Markdown document. Focus on readability first.
2. **Creative Freedom (No Component Lock-in)**:
   You are not bound to rigid templates. Select and compose whichever HTML structures best suit the report:
   - Metric cards & flexible grids (`.grid`, `.grid-2`, `.grid-3`, `.card`)
   - Interactive accordions (`<details><summary>...`)
   - Structured comparison tables (`<table>`)
   - Callouts and status badges (`.callout`, `.badge`)
   - Clean preformatted code blocks (`<pre><code>`)
3. **Rich Visuals: Charts & Diagrams**:
   - **Diagrams**: Use Mermaid.js (`<div class="mermaid">...`) for workflows, sequence flows, and architecture maps.
   - **Charts & Graphs**: Use Chart.js (`<canvas id="myChart">` + `<script>new Chart(...)</script>`) or inline SVGs for benchmarks, code metrics, test distributions, and quantitative data.
4. **Theme Persistence**:
   Use `report.css` variables and include the lightweight Dark/Light toggle script with `localStorage` memory.
5. **Chat Bloat Prevention**:
   Write the full report directly to disk in `.report/` and share a concise 2–3 bullet summary with the local HTTP link. Never dump hundreds of lines of HTML into chat.

---

## Workflow

### 1. Scaffold Local Directory & Exclude from Git
Keep generated reports local without polluting repository status:
```bash
# Ensure .report/ is ignored locally without modifying shared .gitignore
Add-Content -Path ".git/info/exclude" -Value ".report/" -ErrorAction SilentlyContinue

# Create target directory and copy stylesheet
New-Item -ItemType Directory -Force -Path ".report/<category>/<topic>"
Copy-Item -Path "<path-to-skill>/report.css" -Destination ".report/<category>/<topic>/report.css"
```

### 2. Compose the Report HTML
Use `REPORT-TEMPLATE.html` as the base shell. Compose content creatively:
- **Header**: Title, timestamp, badges, and context tags.
- **Body**: Combine prose, tables, diffs, diagrams, and charts as needed.
- **Charts / Visuals**: If charts are needed, instantiate Chart.js inside a `<script>` tag or render SVG inline.

### 3. Launch Local Server & Deliver
Launch a background HTTP server and deliver the clickable link in chat:
```bash
# Launch lightweight server in background
python -m http.server 8000 --directory .report/<category>/<topic>
```
Deliver the link: `http://localhost:8000/index.html` along with key takeaway bullets.

---

## Reference Files

- [report.css](report.css): Lightweight, responsive, markdown-like stylesheet with dark/light themes, tables, callouts, and chart containers.
- [REPORT-TEMPLATE.html](REPORT-TEMPLATE.html): Clean boilerplate with theme switcher, Mermaid.js, and Chart.js integration.
