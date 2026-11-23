# Reflect Skill

Walks through your full session from start to finish (reading the local session log when available so compaction does not erase early signal), pulls out high-signal lessons, and saves them cleanly into your global or project-level `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` so tomorrow starts with less friction.

## Install

```bash
npx skills add dimsedra/skills --skill reflect
```

## Features

- **Full-Session Grounding**: Reads the harness's local session transcript when available so earlier corrections and turning points survive compaction, and tells you plainly if it has to fall back to the remaining context window.
- **Chronological Session Walk-Through First**: Traces the actual story of the session from start to finish like two teammates looking back at what they just went through together, before pulling out takeaways.
- **Continuous Partnership**: Treats future threads as the same ongoing partnership rather than a separate "future agent", capturing what needs to survive the memory reset between sessions.
- **Clear Global vs. Project Separation**: Routes personal working-style and communication lessons to your global instruction file, and recurring repo conventions, workflows, and gotchas to the project-level instruction file (keeping architecture and long design docs in `docs/`).
- **Safe, Approved Updates**: Drafts exact changes in chat grouped by target file for your approval first, leaving the `/setup` managed engineering block untouched.

## Usage

Run `/reflect` at the end of a session:

```text
/reflect
```
