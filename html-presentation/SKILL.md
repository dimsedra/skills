---
name: html-presentation
description: "Use when the user asks to create HTML slides, build a presentation deck, convert slides to HTML, generate slide presentations, or export HTML slides to PDF."
---

# HTML Presentation

When I ask you to build an HTML presentation deck or convert slides to HTML, handle it using these instructions:

## How I Want Slide Decks Built

1. **Collaborative Brainstorming First**:
   - Do not jump straight to generating slide files.
   - First, explore the topic and audience with me, search for credible external data/sources, curate visual assets, and align on narrative flow.
   - Lock `STORYLINE.md` and `DECK-DESIGN.md` in the presentation folder before writing any HTML code.

2. **Full-Bleed Viewport Fitting (100vw / 100vh)**:
   - Ensure the slide canvas fits edge-to-edge (100vw / 100vh) without outer card margins, rounded borders, or drop shadows on `.slide`.
   - Content spacing belongs strictly inside the slide padding.

3. **Modular File Architecture**:
   - Break slides into individual zero-padded HTML fragments (`slides/slide-01.html`, `slides/slide-02.html`, etc.).
   - Orchestrate state and viewer navigation via `index.html` and export via `export_pdf.html`.

4. **Direct Generation (Parent Agent Only)**:
   - Write all slide fragments and project files directly yourself. Do not delegate slide generation to subagents so we keep our active context and iterate quickly.

5. **Pure HTML Hygiene**:
   - Use clean semantic HTML. No inline `style="..."` attributes and no unparsed Markdown syntax inside slide fragments.

6. **Auto-Launch Local Live Server**:
   - Automatically launch a lightweight background HTTP server (`python -m http.server 8000`) so dynamic slide fragment `fetch()` works without CORS issues.
   - Deliver the clickable link (`http://localhost:8000`) with a brief summary.

7. **Exact PDF Export Engine**:
   - Maintain `export_pdf.html` to assemble all slide fragments into 16in x 9in `@page` containers and trigger `window.print()` cleanly.

## Execution Sequence

1. **Alignment & Narrative**: Brainstorm narrative arc, research data points, curate diagrams, and lock `STORYLINE.md` and `DECK-DESIGN.md`.
2. **Deck Generation**: Build `index.html`, `css/styles.css`, `js/slide-loader.js`, the individual `slides/slide-NN.html` fragments, and `export_pdf.html`.
3. **Verification & Delivery**: Verify `totalSlides` matches the fragment count, launch the background HTTP server, and share the live localhost link.
4. **Revisions**: When I request changes, directly update the target slide fragments or stylesheet. If slides are added or removed, re-index filenames and update `totalSlides`.
