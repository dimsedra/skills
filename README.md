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
npx skills add dimsedra/skills --skill explain
npx skills add dimsedra/skills --skill html-presentation
npx skills add dimsedra/skills --skill issue-it
npx skills add dimsedra/skills --skill pr-gatekeeper
npx skills add dimsedra/skills --skill report-in-html
```

## Available Skills

### `explain`
Facilitates deep, peer-to-peer technical comprehension of concepts, modules, or codebases through collaborative whiteboard-style discussion with optional HTML report hand-off.

### `html-presentation`
Builds modular, responsive HTML presentation decks with full-bleed viewport fitting (16:9), keyboard navigation, background live preview server, and high-fidelity PDF print export.

### `issue-it`
Converts debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues with problem-first framing and stable symbol pointers.

### `pr-gatekeeper`
Enforces uncompromising, production-grade Pull/Merge Request reviews via neutral subagents with battle-tested fixes, CodeRabbit/Copilot reviewer stance, and explicit mergeability verdicts.

### `report-in-html`
Generates standalone, markdown-like HTML reports with console typography, deep black theme, Mermaid diagrams, Chart.js visualizations, and modular layout components.

## Structure

```text
skills/
├── explain/
│   ├── SKILL.md
│   └── README.md
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
├── pr-gatekeeper/
│   ├── SKILL.md
│   └── README.md
└── report-in-html/
    ├── SKILL.md
    ├── REPORT-TEMPLATE.html
    ├── report.css
    └── README.md
```

## License

MIT
