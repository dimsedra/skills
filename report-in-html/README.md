# Report in HTML Skill

Generate standalone, interactive, monochromatic HTML reports with integrated dark/light theme switching, high-contrast Mermaid diagrams, annotated code diffs with logic breakdowns, and terminal execution containers.

## Install

```bash
npx skills add dimsedra/skills --skill report-in-html
```

## Features

- **Adaptive Design System**: Modular component toolkit that adapts dynamically to the reporting domain without rigid 1:1 template copying.
- **Annotated Code Highlights**: Every code diff is paired with an explicit Input-Process-Output and line-by-line mechanics breakdown.
- **Pure Semantic HTML**: All styles centralized in `report.css`; no inline `style="..."` attributes or unparsed Markdown syntax.
- **Theme Persistence**: Light and dark mode support with `localStorage` memory.
- **High-Contrast Diagramming**: Pre-configured Mermaid.js styling that stays readable in both themes.
- **Visual Evidence & Logs**: Collapsible diff blocks and dedicated terminal evidence containers.
- **Chat Bloat Prevention**: Writes directly to disk and delivers a live `http://localhost:<port>/<filename>.html` link.

## Files Reference

- `SKILL.md`: Core invariants, report generation workflow, and error guardrails.
- `report.css`: Monochromatic responsive CSS design system with annotation containers.
- `REPORT-TEMPLATE.html`: Master HTML shell with theme toggle script and Mermaid initializer.
- `COMPONENTS.md`: Catalog of ready-to-use HTML component snippets (metric bars, annotated diffs, terminal blocks, callouts).
