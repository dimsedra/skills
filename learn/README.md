# Learn Skill

Builds durable, transferable engineering knowledge and mental models that carry across projects, rather than just explaining project-specific code.

## Install

```bash
npx skills add dimsedra/skills --skill learn
```

## Features

- **Transferable Over Project-Specific**: Uses current work as a concrete starting point, then strips away local details to teach the universal engineering concept, cause-and-effect mechanics, trade-offs, and cross-project signals.
- **Evaluates How to Teach First**: Checks the user's communication rules (`GEMINI.md`, `AGENTS.md`, `CLAUDE.md`) and evaluates whether project code is too noisy or abstracted, proposing an isolated runnable example script when needed.
- **Self-Contained Lesson Capsules (`docs/lesson/<topic_slug>/`)**: Stores runnable example scripts alongside `<topic_slug>.md` and catalogs them in `docs/README.md` so lessons stay runnable and accessible over time.
- **Dual-Purpose Lesson Document**: `<topic_slug>.md` is split into **Part 1 (For You)** for human review and **Part 2 (For the Agent)** as a reproducible teaching playbook so any agent in a new thread can deliver the lesson the exact same way.

## Usage

Trigger via `/learn` with a topic, or without arguments right after debugging or building to extract the most valuable lesson from what was just done:

```text
/learn
/learn optimistic concurrency control
```
