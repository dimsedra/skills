# Explain Skill

Explains code, bugs, architecture, or technical concepts in the specific way the user thinks and learns, rather than dumping a generic textbook summary.

## Install

```bash
npx skills add dimsedra/skills --skill explain
```

## Features

- **Tailored to How You Think**: Reads the user's instruction files (`GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`) for communication, language, and cognitive framing rules before explaining.
- **Asks Instead of Guessing**: If no communication preferences are defined, or if a previous explanation did not click, asks how the user wants it broken down before diving in.
- **Grounded in Actual Code**: Reads the real codebase before explaining project behavior, and states plainly when something is uncertain.
- **Pure Understanding Mode**: Pauses editing, refactoring, and planning until the user confirms the explanation clicked.

## Usage

Trigger via `/explain` with a concept, flow, or file:

```text
/explain how the token refresh queue avoids race conditions
```
