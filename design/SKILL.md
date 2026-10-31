---
name: design
description: Use when creating, modifying, or reviewing front-end UI/UX, styling, components, or layout to enforce brand grounding before coding and visual slop audit after implementation.
---

# Design

When I ask you to design, build, or style a front-end interface, your goal is to build something that genuinely fits my brand and serves my user, follow our engineering rules while coding, and verify the actual rendered pixels through an isolated visual auditor subagent before calling the work done.

## Grounding in the Brand First (`docs/design/brand.md`)

Never jump straight into writing UI code if we do not have an approved brand Single Source of Truth at `docs/design/brand.md` that covers the work. If `docs/design/brand.md` is missing, outdated, or does not cover what we are building, or if the project is still too early to infer these details from the codebase, pause and invoke `/align` with me first.

During that alignment, we need to figure out concrete answers grounded in our project reality:

- What is my brand's personality, tone, and positioning (what it is, and what it is not)?
- Who is the user, what are they trying to get done on this screen, and what constraints do they have (time pressure, device, attention)?
- What does the predictable, generic baseline layout look like for similar products in this category, and what deliberate choices will make our design feel distinct instead of generic? (If someone could swap my logo with a competitor's and nothing feels out of place, the design is still too generic.)
- How will we translate that into layout hierarchy, whitespace, components (both what we include and what we deliberately leave out), typography, color palette, and spacing/border details?

Always tell me the file path before creating or updating `docs/design/brand.md`. On the first pass, present a summary of the brand decisions in chat and wait for my approval before writing any UI code. On later tasks that are already covered by our approved `docs/design/brand.md`, you can go straight to implementation without asking again.

Structure `docs/design/brand.md` cleanly like this:

```markdown
---
title: "Brand Design SOT: [Product or Feature]"
type: reference
status: active
last_updated: YYYY-MM-DD
---

# Brand Design SOT: [Product or Feature]

## Brand & Positioning
Describe the brand's personality, tone, and clear positioning (what it is and what it is not).

## Target User & Context
Describe who uses this interface, the specific job they are trying to get done, and their real-world constraints (device, session length, attention).

## Generic Baseline to Avoid
Note the predictable layout, component clichés, and color tropes common in this category that we are deliberately avoiding.

## Design Decisions
Walk through our concrete choices for composition and layout hierarchy, which components we are keeping or omitting (and why), typography scale and roles, color palette (base, text, and purposeful accent), and micro-details like border radius, borders, and spacing.

## Non-Goals
List what is explicitly out of scope for this interface.
```

## Coding the Interface & Avoiding Visual Slop

Keep the interface easy to read and navigate with a low cognitive barrier. Unless our approved `docs/design/brand.md` explicitly calls for them with a clear reason, avoid common AI design clichés:

- Centered hero text over a gradient blob, three equal feature cards, or turning every piece of content into a card.
- Purple-blue AI gradients, acid-green on black, cream-and-terracotta serif editorial tropes, or glassmorphism everywhere.
- Eyebrow labels above every heading, unnecessary subtitles that just repeat the heading, or decorative `01 / 02 / 03` numbers when content is not sequential.
- Hiding the native cursor, scroll-jacking, using a horizontal-scroll gallery as the only layout idea, or adding multi-second loaders without need.
- Overly rounded components, weak visual hierarchy with competing focal points, or cramped, tightly packed layouts with no breathing room.

When writing the front-end code, stick to our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`): keep markup, styling, and UI logic co-located in deep component files, do not extract micro-components until a pattern repeats at least 3 times, keep control flow flat without boolean prop traps, and do not write unit tests for UI rendering, layout, or styling.

## Visual QA via an Isolated Subagent

Do not audit your own rendered UI in our main conversation thread, because inspecting your own work leads to confirmation bias and superficial checking. Instead, verify the UI by spawning an isolated `UI Visual Auditor` subagent.

First, make sure the UI is running on a dev server or preview URL, and use browser automation (Playwright MCP or CLI) to capture screenshots across at least a mobile viewport (`360x640`) and a desktop viewport (`1280x800`). Capture active interaction states too, such as open modals, expanded menus, or validation error states, rather than just a static initial load. If no browser tool is available in your environment, tell me plainly that the visual audit could not run and fall back to a code review—never pretend a visual audit happened.

Next, spawn the `UI Visual Auditor` subagent. Because a subagent does not know where your skills are installed on disk, always resolve and pass full absolute paths—never relative paths like `design/UI-AUDITOR-INSTRUCTIONS.md`, and never paraphrase the auditor instructions in place of the file:

- The full absolute path to `UI-AUDITOR-INSTRUCTIONS.md` inside the directory where this skill is located (for example, `/home/user/.gemini/config/skills/design/UI-AUDITOR-INSTRUCTIONS.md` or `/home/user/.config/opencode/skills/design/UI-AUDITOR-INSTRUCTIONS.md`), instructing the subagent to read it first.
- The full absolute path to `docs/design/brand.md` (plus any relevant `docs/intent/` or `docs/blueprint/` files) as the brand and requirement reference.
- The exact `git diff` command or commit range, the full absolute paths to the modified UI files and captured screenshots (or preview URL), and a short description of what we built or changed.

If the subagent returns a `BLOCKED` verdict, fix the visual defects in code, take fresh screenshots, and re-run the subagent audit until it passes. Once it is certified, share the result and a clear summary with me in chat.
