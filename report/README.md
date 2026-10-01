# Report Skill

Generate clean, standalone, markdown-like HTML reports with dark/light theme switching, responsive typography, Mermaid diagrams, Chart.js visualizations, and modular layout components.

## Install

```bash
npx skills add dimsedra/skills --skill report
```

## Features

- **Markdown-Like Clarity**: Clean, readable typography and spacious layout that feels like rendered Markdown.
- **Creative Freedom**: No rigid component restrictions—use flexible cards, grids, tables, callouts, or collapsibles suited to the task.
- **Rich Visuals**: Built-in support for Mermaid.js diagrams and Chart.js graphics/charts.
- **Theme Persistence**: Light and dark mode support with `localStorage` memory.
- **Dedicated Local Output (.report/)**: Standardizes output placement into `.report/<category>/<topic>/` and excludes it via `.git/info/exclude` to keep deliverables strictly local.
- **Chat Bloat Prevention**: Writes deliverables directly to disk and provides a local HTTP server link.

## Files

- `SKILL.md`: Core principles, workflow, and instructions.
- `report.css`: Lightweight, responsive stylesheet with dark/light themes and container utilities.
- `REPORT-TEMPLATE.html`: Starter HTML shell with theme toggle, Mermaid.js, and Chart.js.
