---
name: html-presentation
description: "Use when the user asks to create HTML slides, build a presentation deck, convert slides to HTML, generate slide presentations, or export HTML slides to PDF."
---

# HTML Presentation

Build modular, responsive HTML presentation slide decks with full-bleed viewport fitting and high-fidelity PDF print export.

---

## Core Invariants

1. **Collaborative Brainstorming, Research & Asset Curation**: Gate 1 is a deep collaborative brainstorming and research session per [ALIGNMENT.md](ALIGNMENT.md). Explore intent, search for credible external data/sources, curate visual assets (SVGs, Mermaid diagrams), and align on narrative flow without expecting every slide to have granular micro-details upfront. Lock `STORYLINE.md` and `DECK-DESIGN.md` before coding.
2. **Direct Parent-Driven Generation**: The parent agent directly writes all slide fragments and project files to disk. Do NOT delegate file generation to subagents to preserve full conversational context and enable rapid real-time iteration.
3. **Full-Bleed Viewport Fitting**: The presentation viewport and slide canvas must fit 100% edge-to-edge (100vw/100vh) with zero outer card margins, rounded borders, or drop shadows on `.slide`. Content breathing room belongs strictly inside slide padding.
4. **Modular Multi-File Architecture**: Isolate slides into zero-padded semantic HTML fragments (`slides/slide-01.html` ... `slides/slide-NN.html`); orchestrate viewer state in `index.html` and export in `export_pdf.html`.
5. **Pure Presentation Hygiene**: Enforce strict semantic HTML without inline `style="..."` attributes or leaked Markdown syntax in slide fragments.
6. **Auto-Launch Local Live Server**: Automatically start a lightweight background HTTP server and deliver a live `http://localhost:<port>/index.html` link. Never provide raw `file:///` URLs.
7. **Exact PDF Export Engine**: `export_pdf.html` fetches all fragments dynamically, mounts them into physical 16in x 9in `@page` containers, waits for fonts/diagrams to settle, and triggers `window.print()`.

---

## Deterministic Phase Gates

### Gate 1: Collaborative Brainstorming, Research & Alignment
Execute the collaborative session per [ALIGNMENT.md](ALIGNMENT.md):
- **Stage 1 (Open Exploration, Brain Dump & Research)**: Deeply explore the presentation topic, audience mindset, and proactively search for credible external facts, documentation, or benchmark citations.
- **Stage 2 (Core Angle & Narrative Framing)**: Synthesize the Big Idea, governing message, and communication angle (live companion vs standalone read-ahead).
- **Stage 3 (Storyline Arc, Slide Flow & Asset Curation)**: Map out the narrative flow, Action Headlines sequence, curate required visual assets (Mermaid topologies, SVG icons, metric cards), and lock `STORYLINE.md`.
- **Stage 4 (Visual Identity & Mood)**: Define visual tone, color palette tokens, and typography, locking `DECK-DESIGN.md`.
Scaffold `STORYLINE.md` and `DECK-DESIGN.md` in the presentation root as the dual sources of truth before building.

### Gate 2: Direct Deck Generation (Parent Agent)
Write all project files directly to disk in the following sequence:
1. Shell: `index.html` matching [SCRIPTS.md](SCRIPTS.md).
2. Stylesheet: `css/styles.css` implementing tokens from `DECK-DESIGN.md` and full-bleed viewport rules from [ARCHITECTURE.md](ARCHITECTURE.md).
3. JavaScript Controller: `js/slide-loader.js` and `js/main.js` per [SCRIPTS.md](SCRIPTS.md) with `totalSlides` matching the exact slide count.
4. Slide Fragments: `slides/slide-01.html` through `slides/slide-NN.html` matching the Action Headlines in `STORYLINE.md` and layouts in [SLIDE-FORMAT.md](SLIDE-FORMAT.md).
5. PDF Export Root: `export_pdf.html` matching [SCRIPTS.md](SCRIPTS.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

### Gate 3: Verification, Live Server & Delivery
1. **Verification**: Verify slide fragment count matches `totalSlides`, check hash navigation, and inspect slide markup for pure HTML hygiene.
2. **Auto-Launch Local Live Server**:
   - Automatically launch a lightweight local HTTP server in the presentation directory as a background daemon process using cascading auto-fallback (`python -m http.server 8000` / `python3 -m http.server 8000`, falling back to `npx serve -p 8000`).
   - Keep the server alive in the background throughout the session so dynamic slide fragment `fetch()` calls work seamlessly without browser CORS errors.
3. **Deliver Live Link**:
   - Output the clickable link `Open Presentation: http://localhost:8000` (or active port) along with a 2-sentence summary.

### Gate 4: Rapid In-Session Revision (User-Triggered Only)
When the user requests edits, slide additions/cuts, or narrative pivots:
- **Micro Polish**: Directly update text or CSS in target slide files or `css/styles.css`.
- **Slide-Level Claim Shifts**: Update `STORYLINE.md` and rewrite `slides/slide-NN.html`.
- **Slide Addition / Deletion**: Update `STORYLINE.md`, re-index filenames (`slide-01.html` ... `slide-NN.html`), and update `totalSlides` in `js/slide-loader.js` and `export_pdf.html`.

---

## Failure Modes & Guardrails

| Failure Mode | Root Cause | Guardrail / Fix |
|---|---|---|
| **Interrogation Rush** | Interrogating the user with rapid-fire questions instead of deep conversational brainstorming. | Take time to explore the big picture, bounce ideas, and validate narrative framing before rushing to code. |
| **Ungrounded Claims** | Stating arbitrary claims without data or research backing. | Conduct targeted research during Stage 1 and cite credible sources in `STORYLINE.md`. |
| **Subagent Context Amnesia** | Delegating deck generation to subagents who lack conversational context. | The parent agent directly writes all slide files and edits in-session. |
| **Raw File URL Delivery** | Providing a raw `file:///` link instead of launching a live server. | Auto-launch a background HTTP server and deliver `http://localhost:<port>/index.html`. |
| **Floating Card Slide Drift** | Adding outer margins, rounded borders, or drop shadows to `.slide`. | Enforce 100vw/100vh full-bleed viewport CSS with internal content padding only. |
| **Markdown Leakage** | Leaving unparsed Markdown syntax (`**bold**`, ` `code` `) in slide HTML. | Convert all content to semantic HTML tags (`<strong>`, `<code>`, `<ul>`). |
| **Inline Style Pollution** | Adding `style="..."` attributes inside slide fragments. | Centralize all styles in `css/styles.css`. |
| **Unground Deck Generation** | Writing slide files before locking `STORYLINE.md` and `DECK-DESIGN.md`. | Complete Gate 1 brainstorming and lock markdown sources of truth first. |
| **Stale TotalSlides Index** | Adding/cutting slides without updating loader count. | Always update `totalSlides` in `js/slide-loader.js` and `export_pdf.html` when slide count changes. |

---

## Disclosed References

- [ALIGNMENT.md](ALIGNMENT.md): Collaborative brainstorming and research protocol, storyline blueprints, and output schemas.
- [ARCHITECTURE.md](ARCHITECTURE.md): Multi-file shell architecture, full-bleed viewport CSS, and PDF export engine.
- [SLIDE-FORMAT.md](SLIDE-FORMAT.md): Semantic slide fragment schemas, layout patterns, and pure HTML hygiene.
- [EXTENSIONS.md](EXTENSIONS.md): Visual cookbook for Prism.js code blocks, Mermaid diagrams, MathJax formulas, and SVGs.
- [SCRIPTS.md](SCRIPTS.md): JS controller, slide loader lifecycle, and PDF export assembly engine.
