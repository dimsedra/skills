# Design Skill

Enforces restrained aesthetics, brand-centered identity, visual comfort, and zero component clutter when designing or building front-end user interfaces.

## Install

```bash
npx skills add dimsedra/skills --skill design
```

## Features

- **Brand-Centered Design**: Eliminates generic, cookie-cutter interfaces using the Brand Swap Test.
- **Easy on the Eyes**: Prioritizes visual comfort, balanced contrast, and effortless legibility so interfaces feel calm and restful.
- **Zero Component Clutter**: Prevents unnecessary cards, dividers, nested wrappers, and visual noise ("Less is More").
- **Micro-Details Over Macro-Gimmicks**: Emphasizes deliberate typography, restrained palettes, disciplined radius, and intentional spacing tokens.
- **Strict Anti-Bloat**: Enforces zero unsolicited interactions or feature bloat beyond what the user requested.
- **Isolated UI Visual Auditor Subagent**: Dispatches a dedicated, adversarial subagent (`UI Visual Auditor`) reading `UI-AUDITOR-INSTRUCTIONS.md` to verify rendered pixels across the 4 Dimensions of Visual Testing (Core, Boundaries, Errors, Invariants) across viewports before declaring any UI task done.

## Usage

Invoke when building, styling, or reviewing UI components:

```text
Tolong styling komponen dashboard ini /design
```

Or trigger via `/design` whenever working on front-end interfaces.
