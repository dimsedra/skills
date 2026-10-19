---
name: report
description: Use when creating standalone, interactive HTML reports for code audits, deep dives, test summaries, architectural analyses, performance metrics, or project compendiums.
---

# Report

When I ask you to create an HTML report (for example, to present test results, code audits, benchmarks, or architectural deep dives), build a standalone, readable HTML page rather than dumping giant walls of text or raw HTML blocks into our chat.

## What I Expect from the Report

The report should feel like a clean, well-typeset Markdown document rendered in the browser, with a spacious layout, clear typographic hierarchy, and the console monospace aesthetic provided by `report.css` (true `#050505` deep black in dark mode, with clean light mode support via the theme toggle).

You are not locked into a rigid template. Use `REPORT-TEMPLATE.html` as your starting shell, then pick and combine whatever layout elements best fit the data we are presenting:

- Metric cards, stat callouts, and responsive grids (`.grid`, `.grid-2`, `.grid-3`, `.card`)
- Clean data tables (`<table>`) and well-formatted code blocks (`<pre><code>`)
- Collapsible sections (`<details><summary>...`) for deeper technical details
- Status badges and contextual callouts (`.badge`, `.callout`)
- Mermaid diagrams (`<div class="mermaid">...`) for architecture flows, sequences, or state transitions
- Chart.js canvases (`<canvas>`) or inline SVGs for benchmarks, test breakdowns, or quantitative metrics

## File Placement, Indexing, and Serving

Always tell me the target file path before creating or updating a report. Save reports under `docs/report/YYYYMMDD_<report_slug>.html` in snake_case, following our `docs/` boundary rules in `GEMINI.md` / `AGENTS.md`. Make sure `report.css` from this skill folder is present at `docs/report/report.css` so all reports in that folder share the same stylesheet, and compose the report using `REPORT-TEMPLATE.html` as the base.

Whenever you create or update a report, add or update its entry in `docs/README.md` so it stays discoverable alongside our other documentation. Then start a lightweight background HTTP server (such as `python3 -m http.server 8000 --directory docs/report`) and give me the clickable link (`http://localhost:8000/YYYYMMDD_<report_slug>.html`) in chat along with a short summary of the findings.
