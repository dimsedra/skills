---
name: design
description: Use when creating, modifying, or reviewing front-end UI/UX, styling, components, or layout to enforce restrained aesthetics, brand-centered identity, visual comfort, and zero component clutter.
---

# Design

When designing, building, or styling front-end interfaces, components, or layouts (e.g. via `/design`, natural UI requests, or frontend styling tasks), follow these non-negotiable design directives:

## Core Design Directives

### 1. Brand-Centered Design (Anti-Generic)
- Design must strictly serve the brand, its personality, and its domain context.
- **The Brand Swap Test**: If the front-end logo or brand identifier can be replaced with a generic or competitor brand and the interface still looks completely normal, the design is generic and has failed.
- The interface must feel deliberately crafted for this specific product—uniquely tailored in its tone, typography, and visual language.

### 2. Easy on the User's Eyes (Visual Comfort First)
- All design choices—both macro (layouts, page hierarchy) and micro (colors, borders, fonts)—must strictly submit to visual comfort.
- Prioritize restful, calm, and glare-free aesthetics. Contrast must be balanced and legible without being harsh or straining.
- The interface should feel peaceful and effortless to absorb over long sessions.

### 3. Clean & Minimalist Over Maximalist ("Less is More")
- Strongly avoid dense, busy, maximalist layouts where "too much is going on".
- Maintain disciplined whitespace, intentional margins, balanced padding, and clear typographic hierarchy at all times.
- **Zero Component Clutter**: Never clutter the view with redundant cards, nested containers, unnecessary dividers, decorative badges, or visual noise. Every element must earn its place.

### 4. Distinctiveness Through Micro-Details (Not Macro-Gimmicks)
- Distinctiveness and craft are not achieved through loud macro-design gimmicks, heavy gradients, or gratuitous novelties.
- Craft emerges from deliberate precision in the micro-details:
  - Curated, intentional typography and font pairings.
  - A restrained, cohesive color palette (monochrome base with purposeful accent hits).
  - Subtle, disciplined border radius, delicate borders, and balanced spacing tokens.

### 5. Strictly No Feature Bloat & Unsolicited Interactions
- Stick 100% to the requested core user functionality.
- Do NOT build unrequested interactive features, decorative widgets, unsolicited animations, or gimmicky state transitions unless explicitly asked.
- Avoid solving problems the user didn't ask you to solve.

### 6. Prioritize Refinement Over Addition
- Always prioritize refining, aligning, and polishing existing elements before even considering adding new ones.
- When an interface feels off, the solution is almost always to **subtract, space out, or refine typography**, not to add more UI elements.

---

## Pre-Completion Design Checklist

Before declaring any front-end UI or component task complete, audit the screen against these 4 questions:

1. **Brand Test**: Does this feel unique and tailor-made for this product, or does it look like an off-the-shelf AI template?
2. **Eye Comfort Test**: Is the screen calm, restful, and easy on the eyes, with balanced contrast and generous breathing room?
3. **Clutter Audit**: Can any card, divider, icon, or text element be removed without losing clarity? (If yes, remove it).
4. **Scope Discipline**: Did we implement strictly what was requested without adding decorative or interactive bloat?
