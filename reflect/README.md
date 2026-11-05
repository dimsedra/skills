# Reflect Skill

Looks back at your current working session together to surface how you think, communicate, and collaborate, then distills those confirmed traits into the personal section of your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` so every future agent in a fresh thread clicks with you from turn one.

## Install

```bash
npx skills add dimsedra/skills --skill reflect
```

## Features

- **Session-Grounded Reflection**: Recalls real moments from the conversation (where ideas clicked, where you pushed back, and how you framed problems) instead of asking you to fill out an abstract questionnaire on a blank page.
- **The Fresh-Thread Filter**: Surfaces only durable cognitive, communication, and collaboration traits that make a brand-new agent with zero context immediately work better with you.
- **Multiplier for All Other Skills**: Populates and sharpens the personal instructions that `/align`, `/explain`, `/learn`, `/review`, and `/proof` rely on to adapt to your mind and workflow.
- **Safe Personal Updates**: Shows the draft in chat for your approval first and updates only your personal sections while leaving the `/setup` managed engineering block untouched.

## Usage

Run `/reflect` at the end of a productive or revealing session:

```text
/reflect
```
