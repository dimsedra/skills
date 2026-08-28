# Agent Skills

[![skills.sh](https://skills.sh/b/dimsedra/skills)](https://skills.sh/dimsedra/skills)

A personal collection of modular, harness-agnostic skills for AI coding agents. Designed to enforce strict deliverables, prevent chat bloat, and produce evidence-backed results.

## Installation

Install all skills in this repository:

```bash
npx skills add dimsedra/skills
```

Or install a specific skill:

```bash
npx skills add dimsedra/skills --skill html-presentation
npx skills add dimsedra/skills --skill issue-it
npx skills add dimsedra/skills --skill report-in-html
npx skills add dimsedra/skills --skill walkthrough
```

## Available Skills

### `html-presentation`
Builds modular, responsive HTML presentation decks with full-bleed viewport fitting (16:9), keyboard navigation, background live preview server, and high-fidelity PDF print export.

### `issue-it`
Converts debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues with problem-first framing and stable symbol pointers.

### `report-in-html`
Generates standalone, interactive HTML reports with light/dark theme toggle, high-contrast Mermaid diagrams, color-coded diff views, and terminal execution logs.

### `walkthrough`
Generates structured post-implementation walkthrough reports. Adapts depth based on change size (Small, Medium, Large) and enforces empirical verification proof before claiming task completion.

## Structure

```text
skills/
├── html-presentation/
│   ├── SKILL.md
│   ├── ALIGNMENT.md
│   ├── ARCHITECTURE.md
│   ├── EXTENSIONS.md
│   ├── SCRIPTS.md
│   └── SLIDE-FORMAT.md
├── issue-it/
│   ├── SKILL.md
│   ├── ISSUE-FORMAT.md
│   └── README.md
├── report-in-html/
│   ├── SKILL.md
│   ├── COMPONENTS.md
│   ├── REPORT-TEMPLATE.html
│   └── report.css
└── walkthrough/
    ├── SKILL.md
    └── SCHEMA.md
```

## License

MIT
