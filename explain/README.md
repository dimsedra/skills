# Explain Skill

Explains code, bugs, architecture, or technical concepts in the specific way the user thinks and learns, and simplifies dense mid-conversation explanations into something genuinely digestible.

## Install

```bash
npx skills add dimsedra/skills --skill explain
```

## Features

- **Tailored to How You Think**: Reads the user's instruction files (`GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`) for communication, language, and cognitive framing rules before explaining.
- **Digestible Re-Framing**: Works both for new questions and as a mid-conversation signal (`/explain`) to step back, strip jargon, and make a previous explanation easier to follow.
- **Asks Instead of Guessing**: If no communication preferences are defined, or if a simpler re-framing still did not click, asks how the user wants it broken down before diving in.
- **Grounded in Actual Code**: Reads the real codebase before explaining project behavior, and states plainly when something is uncertain.
- **Pure Understanding Mode**: Pauses editing, refactoring, and planning until the user confirms the explanation clicked.

## Usage

Trigger via `/explain` with a concept, flow, or file, or invoke `/explain` on its own when a previous answer was too hard to follow:

```text
/explain how the token refresh queue avoids race conditions
/explain
```
