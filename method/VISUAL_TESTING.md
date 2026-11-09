# Method: Visual Testing

Writing UI code in the editor is only the first rough draft, because you cannot judge visual rhythm, spacing balance, hierarchy, or interaction feel from JSX and CSS strings alone. Your job here is to build front-end interfaces grounded in my brand, follow our engineering rules while coding, and use the live browser and step-by-step screenshots as an active critique, refinement, and verification loop until the UI is genuinely polished before calling the work done.

## How to Plan in the Blueprint

Use `visual testing` for any contract that creates or modifies front-end UI, styling, layout, or visual interaction. Never plan unit tests (such as DOM snapshot tests or component rendering assertions) for UI layout or styling. In the contract's `Verification`, specify the live preview URL or route, the user flows to walk through (including error, empty, and interactive states), and the viewports (`360x640` mobile and `1280x800` desktop) that will be explored, critiqued, refined, and screenshotted in the browser.

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

## 2. Coding the First Pass & Avoiding Visual Slop

Keep the interface easy to read and navigate with a low cognitive barrier. Unless our approved `docs/design/brand.md` explicitly calls for them with a clear reason, avoid common AI design clichés:

- Centered hero text over a gradient blob, three equal feature cards, or turning every piece of content into a card.
- Purple-blue AI gradients, acid-green on black, cream-and-terracotta serif editorial tropes, or glassmorphism everywhere.
- Eyebrow labels above every heading, unnecessary subtitles that just repeat the heading, or decorative `01 / 02 / 03` numbers when content is not sequential.
- Hiding the native cursor, scroll-jacking, using a horizontal-scroll gallery as the only layout idea, or adding multi-second loaders without need.
- Overly rounded components, weak visual hierarchy with competing focal points, or cramped, tightly packed layouts with no breathing room.

When writing the front-end code, stick to our `Engineering Rules & Directives` (`~/.gemini/GEMINI.md` or `~/.config/opencode/AGENTS.md`): keep markup, styling, and UI logic co-located in deep component files, do not extract micro-components until a pattern repeats at least 3 times, keep control flow flat without boolean prop traps, and do not write unit tests for UI rendering, layout, or styling.

## 3. Live Visual Critique, Refinement & Verification in the Browser

Do not treat the browser walkthrough as a formality just to collect handoff screenshots. Seeing the rendered pixels on screen is where you catch what could not be seen in code and refine the UI from a working first pass into a well-crafted interface.

Make sure the app is running on a dev server or preview URL before starting the browser loop. Choose how to run it based on the size of the change:

- **For quick UI fixes or small, localized tweaks:** You can run the browser loop inline yourself without spawning a subagent. Open the live URL, trigger the affected states across mobile (`360x640`) and desktop (`1280x800`) viewports, take screenshots, and evaluate the three questions below.
- **For new screens, multi-step flows, or Blueprint contracts:** Do not evaluate your own rendered UI in the main thread, because inspecting your own larger work leads to confirmation bias. Spawn an isolated Visual QA subagent to explore and critique the flow like a new user and design reviewer, passing full absolute paths (never relative paths) to this `VISUAL_TESTING.md` file, `docs/design/brand.md`, the relevant Intent and Blueprint files, and the live preview URL.

To run the loop, use headless Chromium (or any available tool that drives a headless browser) to open the live URL, resize to mobile (`360x640`) and desktop (`1280x800`) viewports, interact with elements, and capture screenshots at each step.

If headless Chromium (or a tool to drive it) is not available in your environment, do not silently install anything and do not pretend a visual check happened. Instead:
1. Tell me plainly that no headless browser was found and ask for my permission to install Playwright CLI (`@playwright/cli`).
2. If I approve, consult the official installation guide at `https://playwright.dev/agent-cli/installation` and follow the setup steps that fit our environment and harness.
3. If I decline, or if installation is blocked by the environment, fall back to a code review and state clearly that a live visual check did not run.

Whether running inline or through the isolated subagent (which must stick strictly to bounded file reading and never wander into unrelated backend files), walk through the user flows via the public interface across both mobile (`360x640`) and desktop (`1280x800`) viewports, taking a screenshot at every step of the flow (initial state, clicking, typing, opening modals or menus, and triggering empty, loading, or error states). From those step-by-step screenshots, evaluate three questions:

1. **Functional & UX soundness:** Does the flow work cleanly at every step without clipped text, broken layouts, overlapping layers, dead ends, or confusing transitions?
2. **Brand fidelity & anti-slop:** Do the rendered pixels at every step follow `docs/design/brand.md` and avoid the visual slop listed in Section 2?
3. **Visual craft & refinement:** Now that the interface is rendered on screen, what still looks flat, cramped, unbalanced, or unpolished in spacing rhythm, typographic hierarchy, alignment, contrast, or state feedback?

Treat any layout break, brand violation, or unpolished visual detail found in the screenshots as active feedback to improve the UI. Refine the code and re-run this browser loop as many times as you need until the interface is visually cohesive, well-crafted across every step, and you are genuinely satisfied and confident in handing off polished work to me. Only then share the final result and screenshots in chat.
