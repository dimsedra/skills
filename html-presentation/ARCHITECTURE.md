# Presentation Architecture & Engine

Specifications for modular shell architecture, full-bleed viewport CSS, and high-fidelity PDF print export.

---

## 1. Modular Multi-File Architecture

Every slide deck uses a modular multi-file structure separating presentation shell, styles, scripts, slide content, and print assembly.

### File Tree Layout

```
presentation/
  index.html              # Viewer shell: viewport, controls bar, CDN libs, loader
  css/styles.css          # Design tokens (:root) + layout and component styles
  js/slide-loader.js      # Slide loader: fragment fetcher, hash sync, dynamic re-rendering
  js/main.js              # Keyboard navigation, dropdown, and UI event controller
  slides/slide-01.html    # Zero-padded standalone slide fragments
  slides/slide-02.html
  ...
  export_pdf.html         # Dedicated print assembly root for PDF generation
  STORYLINE.md            # Narrative blueprint & slide content framework (Pass 3)
  DECK-DESIGN.md          # Visual design tokens & typography specification (Pass 4)
```

### Separation of Concerns
- **Storyline (`STORYLINE.md`)**: Defines topic, audience, takeaway, and slide-by-slide Action Headlines with presentation strategies.
- **Design Tokens (`DECK-DESIGN.md`)**: Defines color roles, typography, and theme styling tokens.
- **Shell (`index.html`)**: Mounts the presentation application, provides the slide viewport (`#slide-container`), and hosts navigation controls.
- **Styles (`css/styles.css`)**: Implements CSS custom properties from `DECK-DESIGN.md` and reusable layout classes.
- **Fragments (`slides/slide-NN.html`)**: Pure semantic HTML containing slide content only, implementing the strategy from `STORYLINE.md`. Zero inline styles or script tags.
- **Export Root (`export_pdf.html`)**: Assembles all fragments at runtime into a multi-page printable document.

---

## 2. Dynamic Token Construction & Full-Bleed Viewport

### Dynamic Token Construction
All values in `css/styles.css` derive directly from `DECK-DESIGN.md` (scaffolded via [ALIGNMENT.md](ALIGNMENT.md)). Avoid arbitrary hardcoded color hexes or ad-hoc margins across slide components.

### Full-Bleed Viewport Architecture (Zero Floating Cards)
To ensure slides render as a true full-bleed presentation on screen and in fullscreen:

1. **Root & Viewport Invariants**:
   ```css
   html, body {
       margin: 0;
       padding: 0;
       width: 100vw;
       height: 100vh;
       overflow: hidden;
       background: var(--bg-primary);
   }

   #slide-container, .slide {
       width: 100vw;
       height: 100vh;
       margin: 0;
       box-sizing: border-box;
       overflow: hidden;
       position: relative;
   }
   ```
2. **Prohibited Card Effects on Slide Frame**:
   - **No Outer Margins**: Never add `margin: 2rem auto` or `max-width: 1200px` to `#slide-container` or `.slide`.
   - **No Frame Shadows or Rounded Corners**: Never apply `border-radius` or `box-shadow` to the root `.slide` element.
3. **Internal Content Padding**: Content breathing room is achieved purely through internal slide padding (e.g. `padding: 4rem 6rem;` on `.slide` or `.slide-content`), ensuring the slide background always touches every display edge.

---

## 3. High-Fidelity PDF & Print Export Engine (`export_pdf.html`)

### Dedicated Runtime Assembly
To prevent stale duplicate markup, `export_pdf.html` dynamically fetches every slide fragment sequentially at runtime and mounts them into physical 16:9 page containers (`.print-slide-page`).

### Exact CSS Print Rules

```css
@page {
  size: 16in 9in; /* Exact 16:9 presentation aspect ratio */
  margin: 0;
}

html, body {
  width: 100%;
  height: auto !important;
  overflow-x: hidden !important;
  overflow-y: visible !important;
  background: #ffffff !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

#pdf-print-deck {
  width: 16in;
  margin: 0 auto;
  display: block;
}

.print-slide-page {
  width: 16in !important;
  height: 9in !important;
  page-break-after: always !important;
  page-break-inside: avoid !important;
  break-after: page !important;
  break-inside: avoid !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  position: relative !important;
  display: block !important;
  background: #ffffff !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.print-slide-page .slide {
  position: relative !important;
  inset: auto !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  box-sizing: border-box !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

@media print {
  .print-loading-notice, #loading-status {
    display: none !important;
  }
}
```

### Critical Print Invariants
- **No Overflow Locking**: Never apply `overflow: hidden` or `height: 100vh` to `html`/`body` in print mode (would clip output to page 1).
- **Physical Print Units**: Use explicit inch units (`16in 9in`) matching `@page` to prevent interstitial blank pages.
- **Exact Color Preservation**: Always declare `-webkit-print-color-adjust: exact !important` and `print-color-adjust: exact !important`.
- **Settlement Pause**: Wait for all `<img>` elements, MathJax, Mermaid, and Prism to finish rendering, followed by an 800ms settlement pause before calling `window.print()`.

---

## 4. Local Live Server & CORS Hygiene

Slide decks dynamically fetch HTML fragments (`slides/slide-NN.html`) via JavaScript `fetch()`. Browsers block local `fetch()` requests when opened via raw `file:///` protocols.

### Background Daemon Execution
The agent automatically starts a lightweight local HTTP server as a background daemon process in the presentation root using cascading auto-fallback:

1. **Primary Choice (Python)**:
   ```bash
   python -m http.server 8000
   ```
   *(or `python3 -m http.server 8000`)*

2. **Cascading Fallback (Node / NPX)**:
   If Python is not available in PATH, fallback automatically to zero-install Node tooling:
   ```bash
   npx serve -p 8000
   ```
   *(or `npx http-server -p 8000`)*

3. **Port & Persistence**: If port 8000 is occupied, increment to 8001 or 3000+. Keep the server daemon alive throughout the conversation session so the user can interactively test and view slides at `http://localhost:8000`.
