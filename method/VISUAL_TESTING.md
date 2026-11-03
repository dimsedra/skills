# Method: Visual Testing

Your job here is to build front-end user interfaces that genuinely fit my brand and serve my user, follow our engineering rules while coding, and verify the live interface by having an isolated subagent explore the user flow step by step with Playwright (MCP or CLI) and screenshots before calling the work done.

## How to Plan in the Blueprint

Use `visual testing` for any contract that creates or modifies front-end UI, styling, layout, or visual interaction. Never plan unit tests (such as DOM snapshot tests or component rendering assertions) for UI layout or styling. In the contract's `Verification`, specify the live preview URL or route, the user flows to walk through (including error, empty, and interactive states), and the viewports (`360x640` mobile and `1280x800` desktop) that the subagent will explore and screenshot.

## 1. Grounding in the Brand First (`docs/design/brand.md`)

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

## 2. Coding the Interface & Avoiding Visual Slop

Keep the interface easy to read and navigate with a low cognitive barrier. Unless our approved `docs/design/brand.md` explicitly calls for them with a clear reason, avoid common AI design clichés:

- Centered hero text over a gradient blob, three equal feature cards, or turning every piece of content into a card.
- Purple-blue AI gradients, acid-green on black, cream-and-terracotta serif editorial tropes, or glassmorphism everywhere.
- Eyebrow labels above every heading, unnecessary subtitles that just repeat the heading, or decorative `01 / 02 / 03` numbers when content is not sequential.
- Hiding the native cursor, scroll-jacking, using a horizontal-scroll gallery as the only layout idea, or adding multi-second loaders without need.
- Overly rounded components, weak visual hierarchy with competing focal points, or cramped, tightly packed layouts with no breathing room.

When writing the front-end code, stick to our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`): keep markup, styling, and UI logic co-located in deep component files, do not extract micro-components until a pattern repeats at least 3 times, keep control flow flat without boolean prop traps, and do not write unit tests for UI rendering, layout, or styling.

## 3. Visual QA via Playwright & an Isolated Subagent

Do not verify your own rendered UI in our main conversation thread, because inspecting your own work leads to confirmation bias. Instead, make sure the app is running on a dev server or preview URL, then spawn an isolated Visual QA subagent to explore it like a new user. If no browser tool (Playwright MCP or CLI) is available in your environment, tell me plainly that the visual check could not run and fall back to a code review. Never pretend a visual check happened.

Give the subagent full absolute paths (never relative paths) to this `VISUAL_TESTING.md` file, `docs/design/brand.md`, the relevant Intent and Blueprint files, and the live preview URL.

The subagent's job is to walk through the user flows via the public interface using Playwright (MCP or CLI) across both mobile (`360x640`) and desktop (`1280x800`) viewports, taking a screenshot at every step of the flow (initial state, clicking, typing, opening modals or menus, and triggering empty, loading, or error states). Stick strictly to bounded file reading and never wander into unrelated backend files. From those step-by-step screenshots, the subagent answers two questions:

1. Does the flow work cleanly at every step from a UI/UX perspective without clipped text, broken layouts, overlapping layers, or confusing transitions?
2. Do the rendered pixels at every step follow `docs/design/brand.md` and avoid the visual slop listed in Section 2?

If the subagent finds UX friction, layout breaks, or brand/slop violations in any screenshot, fix the code and have the subagent re-run the flow until every step holds up cleanly, then share the result and screenshots with me in chat.
