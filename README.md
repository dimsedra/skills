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
npx skills add dimsedra/skills --skill align
npx skills add dimsedra/skills --skill audit
npx skills add dimsedra/skills --skill design
npx skills add dimsedra/skills --skill document
npx skills add dimsedra/skills --skill issue
npx skills add dimsedra/skills --skill report
npx skills add dimsedra/skills --skill research
npx skills add dimsedra/skills --skill slides
```

## Available Skills

### `align`
Ensures the AI agent genuinely understands user intent, architecture, and requirements before executing, eliminating guesswork through explicit verification.

### `audit`
Enforces uncompromising, production-grade Pull/Merge Request reviews via neutral subagents with battle-tested fixes, CodeRabbit/Copilot reviewer stance, and explicit mergeability verdicts.

### `design`
Enforces restrained aesthetics, brand-centered identity, visual comfort, and zero component clutter when designing or building front-end user interfaces.

### `document`
Transforms design discussions, architectural models, decisions, and technical workflows into clean, modular, and traceable markdown documents inside `docs/`.

### `issue`
Converts debugging sessions, bug investigations, and architectural discussions into clean, durable tracking issues with problem-first framing and stable symbol pointers.

### `report`
Generates standalone, markdown-like HTML reports with console typography, deep black theme, Mermaid diagrams, Chart.js visualizations, and modular layout components.

### `research`
Conducts outward-facing technical research grounded in authoritative documentation, installed dependencies, and proven real-world codebases rather than static training data.

### `slides`
Builds modular, responsive HTML presentation decks with full-bleed viewport fitting (16:9), keyboard navigation, background live preview server, and high-fidelity PDF print export.

## Structure

```text
skills/
├── align/
│   ├── SKILL.md
│   └── README.md
├── audit/
│   ├── SKILL.md
│   └── README.md
├── design/
│   ├── SKILL.md
│   └── README.md
├── document/
│   ├── SKILL.md
│   └── README.md
├── issue/
│   ├── SKILL.md
│   ├── ISSUE-FORMAT.md
│   └── README.md
├── report/
│   ├── SKILL.md
│   ├── REPORT-TEMPLATE.html
│   ├── report.css
│   └── README.md
├── research/
│   ├── SKILL.md
│   └── README.md
└── slides/
    ├── SKILL.md
    ├── ALIGNMENT.md
    ├── ARCHITECTURE.md
    ├── EXTENSIONS.md
    ├── SCRIPTS.md
    └── SLIDE-FORMAT.md
```

## License

MIT
