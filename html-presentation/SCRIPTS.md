# Presentation Scripts & Runtime Controller

Specifications and exact implementations for the presentation shell, slide loader engine, keyboard controller, and the PDF export assembly engine.

---

## 1. Presentation Shell (`index.html`)

The viewer shell establishes the viewport container, navigation bar, and third-party rendering libraries.

### Core DOM Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentation Deck</title>
  <link rel="stylesheet" href="css/styles.css">
  <!-- CDN Libraries (MathJax, Mermaid, Prism) -->
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" id="MathJax-script" async></script>
</head>
<body>
  <div id="presentation-app" data-total-slides="1">
    <main class="slide-viewport">
      <div id="slide-container"></div>
    </main>

    <nav class="controls-bar">
      <button id="btn-prev" aria-label="Previous Slide">‹ Prev</button>
      <span id="slide-counter-display">1 / 1</span>
      <select id="slide-select-dropdown" aria-label="Jump to Slide"></select>
      <button id="btn-next" aria-label="Next Slide">Next ›</button>
      <button id="btn-fullscreen" aria-label="Toggle Fullscreen">Fullscreen</button>
      <button id="btn-export-pdf" aria-label="Export to PDF">Export PDF</button>
    </nav>
  </div>

  <script src="js/slide-loader.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

---

## 2. Slide Loader Engine (`js/slide-loader.js`)

Maintains presentation state in `window.SlideLoader` with dynamic fragment fetching, active class handling, UI updates, and dynamic re-rendering passes.

### Complete Implementation

```javascript
/**
 * Slide Loader Engine
 * Maintains presentation state in window.SlideLoader with dynamic fragment loading
 * and rendering passes.
 */

class SlideLoaderEngine {
  constructor() {
    this.totalSlides = 1;
    this.currentSlide = 1;
  }

  get container() {
    return document.getElementById('slide-container');
  }

  get counterDisplay() {
    return document.getElementById('slide-counter-display');
  }

  get dropdown() {
    return document.getElementById('slide-select-dropdown');
  }

  /**
   * Set total slides count dynamically
   */
  setTotalSlides(count) {
    this.totalSlides = count;
  }

  /**
   * Format slide index to zero-padded number (e.g. 1 -> "01")
   */
  padZero(num) {
    return String(num).padStart(2, '0');
  }

  /**
   * Load specific slide by 1-based index
   */
  async loadSlide(index) {
    if (index < 1) index = 1;
    if (index > this.totalSlides) index = this.totalSlides;

    this.currentSlide = index;
    const slidePath = `slides/slide-${this.padZero(index)}.html`;

    try {
      const response = await fetch(slidePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${slidePath}: ${response.statusText}`);
      }
      const html = await response.text();

      const container = this.container;
      if (container) {
        container.innerHTML = html.trim();

        // Slide within fragment needs active class for proper display
        const slideEl = container.querySelector('.slide');
        if (slideEl) {
          slideEl.classList.add('active');
        }

        // Dynamic Re-rendering Passes
        if (window.MathJax?.typesetPromise) {
          window.MathJax.typesetPromise([container]).catch(console.error);
        }
        if (window.mermaid) {
          window.mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
        }
        if (window.Prism) {
          window.Prism.highlightAllUnder(container);
        }
      }

      // Update UI displays
      if (this.counterDisplay) {
        this.counterDisplay.textContent = `${this.currentSlide} / ${this.totalSlides}`;
      }
      if (this.dropdown) {
        this.dropdown.value = String(this.currentSlide);
      }

      // Update URL hash
      window.location.hash = `slide-${this.currentSlide}`;

      // Update button disabled states if elements exist
      const prevBtn = document.getElementById('btn-prev');
      const nextBtn = document.getElementById('btn-next');
      if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
      if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    } catch (err) {
      console.error(err);
      if (this.container) {
        this.container.innerHTML = `
          <section class="slide active">
            <div class="slide-body">
              <h2 style="color:#e63946;">Failed to Load Slide ${this.currentSlide}</h2>
              <p style="color:#64748b; font-size:18px;">${err.message}</p>
            </div>
          </section>
        `;
      }
    }
  }

  /**
   * Bounds-checked next slide method
   */
  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.loadSlide(this.currentSlide + 1);
    }
  }

  /**
   * Bounds-checked previous slide method
   */
  prevSlide() {
    if (this.currentSlide > 1) {
      this.loadSlide(this.currentSlide - 1);
    }
  }
}

// Instantiate globally
window.SlideLoader = new SlideLoaderEngine();
```

---

## 3. Keyboard & Event Controller (`js/main.js`)

Initializes controls, binds keyboard navigation, manages auto-scaling, and synchronizes window hash states.

### Complete Implementation

```javascript
/**
 * Keyboard & Event Controller
 * Initializes controls, binds keyboard triggers, and manages window state.
 */

document.addEventListener('DOMContentLoaded', () => {
  const appEl = document.getElementById('presentation-app');
  const loader = window.SlideLoader;
  if (!loader) return;

  if (appEl) {
    const parsedTotal = parseInt(appEl.getAttribute('data-total-slides'), 10);
    if (!isNaN(parsedTotal) && parsedTotal > 0) {
      loader.setTotalSlides(parsedTotal);
    }
  }

  const dropdown = document.getElementById('slide-select-dropdown');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const exportPdfBtn = document.getElementById('btn-export-pdf');
  const container = document.getElementById('slide-container');

  // 1. Populate #slide-select-dropdown dynamically from 1 to totalSlides
  if (dropdown) {
    dropdown.innerHTML = '';
    for (let i = 1; i <= loader.totalSlides; i++) {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = `Slide ${String(i).padStart(2, '0')}`;
      dropdown.appendChild(option);
    }

    dropdown.addEventListener('change', (e) => {
      const targetIndex = parseInt(e.target.value, 10);
      if (!isNaN(targetIndex)) {
        loader.loadSlide(targetIndex);
      }
    });
  }

  // 2. Viewport Auto-Scaling to fit 16:9 canvas cleanly edge-to-edge
  function scaleSlideStage() {
    if (!container) return;
    const baseWidth = 1920;
    const baseHeight = 1080;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // True edge-to-edge full bleed scaling based on exact viewport dimensions
    const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);

    container.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', scaleSlideStage);

  // 3. Bind Button Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => loader.prevSlide());
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => loader.nextSlide());
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Fullscreen error: ${err.message}`);
        });
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => {
      const search = window.location.search;
      window.open('export_pdf.html' + search, '_blank');
    });
  }

  // 4. Bind Keyboard Listeners (ignoring input/select/textarea focus)
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        loader.nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        loader.prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        loader.loadSlide(1);
        break;

      case 'End':
        e.preventDefault();
        loader.loadSlide(loader.totalSlides);
        break;

      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        break;
    }
  });

  // 5. Read initial hash on load (window.location.hash.match(/slide-(\d+)/))
  let initialSlide = 1;
  const hashMatch = window.location.hash.match(/slide-(\d+)/);
  if (hashMatch && hashMatch[1]) {
    const parsed = parseInt(hashMatch[1], 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= loader.totalSlides) {
      initialSlide = parsed;
    }
  }

  // Support direct hash modification
  window.addEventListener('hashchange', () => {
    const changeMatch = window.location.hash.match(/slide-(\d+)/);
    if (changeMatch && changeMatch[1]) {
      const idx = parseInt(changeMatch[1], 10);
      if (!isNaN(idx) && idx !== loader.currentSlide) {
        loader.loadSlide(idx);
      }
    }
  });

  // Initial load
  loader.loadSlide(initialSlide).then(() => {
    scaleSlideStage();
  });
});
```

---

## 4. PDF Export Assembly Engine (`export_pdf.html`)

Fetches all slide fragments dynamically at runtime, mounts them into individual `.print-slide-page` containers inside `#pdf-print-deck`, waits for images/fonts/diagrams to settle, and automatically triggers `window.print()`.

### Complete Implementation Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Export PDF - Presentation Deck</title>
  <link rel="stylesheet" href="css/styles.css">

  <!-- CDN Libraries (MathJax, Mermaid, Prism) -->
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" id="MathJax-script" async></script>

  <style>
    @page {
      size: 16in 9in;
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

    #loading-status {
      max-width: 600px;
      margin: 40px auto;
      padding: 24px 32px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .btn-print-now {
      margin-top: 16px;
      padding: 12px 28px;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      background-color: #0f172a;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: background-color 0.2s;
    }

    .btn-print-now:hover {
      background-color: #334155;
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
  </style>
</head>
<body>

  <!-- Loading Status & Print Trigger -->
  <div id="loading-status" class="print-loading-notice">
    <h3 id="status-title" style="color: #0f172a; margin-bottom: 8px; font-size: 20px;">Assembling Slides for PDF Export...</h3>
    <p id="status-desc" style="color: #64748b; font-size: 15px;">Please wait while slides, graphics, and formulas load.</p>
    <div id="action-area" style="display: none;">
      <button class="btn-print-now" onclick="window.print()">Save as PDF (Ctrl + P)</button>
    </div>
  </div>

  <!-- Multi-Page Print Assembly Deck -->
  <div id="pdf-print-deck"></div>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const appEl = document.getElementById('presentation-app');
      let totalSlides = 1;
      
      const searchParams = new URLSearchParams(window.location.search);
      const totalFromParam = parseInt(searchParams.get('total'), 10);
      if (!isNaN(totalFromParam) && totalFromParam > 0) {
        totalSlides = totalFromParam;
      }

      const deckContainer = document.getElementById('pdf-print-deck');
      const statusTitle = document.getElementById('status-title');
      const statusDesc = document.getElementById('status-desc');
      const actionArea = document.getElementById('action-area');

      // 1. Fetch every slide fragment sequentially
      for (let i = 1; i <= totalSlides; i++) {
        const paddedNum = String(i).padStart(2, '0');
        const slidePath = `slides/slide-${paddedNum}.html`;

        try {
          const res = await fetch(slidePath);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const html = await res.text();

          const pageDiv = document.createElement('div');
          pageDiv.className = 'print-slide-page';

          const wrapper = document.createElement('div');
          wrapper.innerHTML = html.trim();
          const slideEl = wrapper.firstElementChild;
          if (slideEl) {
            slideEl.classList.add('active');
            pageDiv.appendChild(slideEl);
          }
          deckContainer.appendChild(pageDiv);
        } catch (err) {
          console.error(`Failed to load ${slidePath} for PDF:`, err);
        }
      }

      // 2. Wait for all images to complete loading
      const images = Array.from(deckContainer.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // 3. Render libraries passes
      if (window.MathJax?.typesetPromise) {
        await window.MathJax.typesetPromise([deckContainer]).catch(() => {});
      }
      if (window.mermaid) {
        await window.mermaid.run({ nodes: deckContainer.querySelectorAll('.mermaid') }).catch(() => {});
      }
      if (window.Prism) {
        window.Prism.highlightAllUnder(deckContainer);
      }

      // 4. Mandatory graphics settlement pause
      await new Promise(r => setTimeout(r, 800));

      // 5. Ready state update & auto-trigger print
      if (statusTitle) statusTitle.textContent = 'All Slides Ready for PDF Print';
      if (statusDesc) statusDesc.textContent = 'If the print dialog did not open automatically, click the button below.';
      if (actionArea) actionArea.style.display = 'block';

      // Auto trigger print dialog
      setTimeout(() => {
        window.print();
      }, 300);
    });
  </script>
</body>
</html>
```
