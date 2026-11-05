# Reflect Skill

Walks through your current session together from start to finish, pulls out what the agent learned about working with you, and writes those confirmed takeaways into the personal section of your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` so it shows up as a better partner tomorrow.

## Install

```bash
npx skills add dimsedra/skills --skill reflect
```

## Features

- **Chronological Session Walk-Through First**: Traces the actual story of the session from start to finish like two teammates looking back at what they just went through together, before pulling out takeaways.
- **Continuous First-Person Partnership**: Speaks directly as one continuous partner (`I` and `we`) writing notes to itself for tomorrow's thread, rather than talking about "tomorrow's agent" as a third-person stranger.
- **Focused on How You Two Work Together**: Captures how you think, communicate, and collaborate (and what the agent should do differently tomorrow), avoiding project trivia or invented engineering slogans.
- **Safe Personal Updates**: Drafts the changes in chat for your approval first and updates only your personal sections while leaving the `/setup` managed engineering block untouched.

## Usage

Run `/reflect` at the end of a session:

```text
/reflect
```
