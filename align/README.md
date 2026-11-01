# Align Skill

Makes sure the AI agent and the user share the same understanding before or during any technical work. Acts as a router: one `/align` entry point that picks the simplest kind of alignment the moment needs, instead of doing everything at once.

## Install

```bash
npx skills add dimsedra/skills --skill align
```

## Routes

- **Understand** (`UNDERSTAND.md`, default): The agent plays back what it thinks you mean and corrects until it matches. No options, critique, or code reading unless the understanding depends on it.
- **Decide** (`DECIDE.md`): For real forks. Lays out 2 or 3 options with practical trade-offs so the choice is made together, not silently by the agent.
- **Challenge** (`CHALLENGE.md`): Stress-tests an idea, plan, or assumption and brings the few concerns that matter most, ordered by impact.

## Features

- **Simple by Default**: Most alignment only needs a quick playback, so that is the default route.
- **Only Loads What Is Needed**: Route instructions live in separate files and are read only when that route is taken, so the agent does not over-apply tools it was not asked to use.
- **Visible Routing**: The agent states which route it is taking in one line, so you can redirect it immediately.
- **Switchable Mid-Conversation**: Moves between routes as the discussion changes shape.
- **Collaborative Green Light**: Never jumps ahead to execution until you confirm.

## Usage

```text
/align
/align decide
/align challenge
```
