# HTML Presentation Skill

Build modular, responsive HTML presentation slide decks with full-bleed viewport fitting (16:9), live preview server, and high-fidelity PDF print export.

## Install

```bash
npx skills add dimsedra/skills --skill html-presentation
```

## Features

- **Phase-Gated Workflow**: Collaborative brainstorming, storyline locking (`STORYLINE.md`), design token definition (`DECK-DESIGN.md`), deck generation, and verification.
- **Full-Bleed 16:9 Viewport**: 100vw/100vh edge-to-edge slide container with internal padding only.
- **Modular Fragment Architecture**: Zero-padded HTML fragments (`slides/slide-01.html` ... `slides/slide-NN.html`) loaded dynamically into `index.html`.
- **Keyboard Navigation & Controls**: Arrow keys, Space, Home, End, and on-screen controls for seamless presentation delivery.
- **Exact PDF Export Engine**: `export_pdf.html` mounts all fragments into physical 16in x 9in `@page` containers and triggers `window.print()`.
- **Auto-Launch Local Live Server**: Serves slides over `http://localhost:<port>` to prevent CORS errors during fragment fetching.

## Files Reference

- `SKILL.md`: Main instructions, invariants, deterministic phase gates, and guardrails.
- `ALIGNMENT.md`: Brainstorming protocol, storyline structure, and design token blueprints.
- `ARCHITECTURE.md`: Shell layout, full-bleed CSS engine, and PDF print stylesheets.
- `SLIDE-FORMAT.md`: Semantic HTML slide fragment templates and layout classes.
- `SCRIPTS.md`: Slide controller (`main.js`), loader (`slide-loader.js`), and export engine.
- `EXTENSIONS.md`: Integration recipes for Prism.js code syntax, Mermaid diagrams, MathJax, and SVG icons.
