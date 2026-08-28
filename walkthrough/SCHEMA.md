# Walkthrough HTML Report Schema

This schema defines the structural layout and semantic HTML components for generating post-implementation walkthrough reports.

All walkthrough HTML files MUST:
1. Link to `report.css` (from `report-in-html`).
2. Use pure semantic HTML tags and predefined CSS classes.
3. NEVER contain inline `style="..."` attributes or raw Markdown formatting syntax.

---

## 1. Adaptive Scope Classification

| Scope | Trigger Threshold | Required Report Sections |
|---|---|---|
| **Small** | 1–2 files modified, simple bugfix, typo, minor config | Header, Executive Summary, Modified Files Table, Verification Proof, Manual Check |
| **Medium** | 3–8 files modified, standard feature, isolated refactor | Header, Executive Summary, Architecture / Flow Diagram, Component Breakdown, Key Code Diffs, Automated Test Evidence, Edge Cases Handled |
| **Large** | 8+ files modified, subsystem overhaul, data migration | Header, Executive Summary, Macro Architecture Diagram, Subsystem Deep-Dive, Key Code Diffs with Annotations, Full Test Evidence & Benchmarks, Tradeoffs & Edge Cases, Rollback & Maintenance Plan |

---

## 2. Semantic Component Taxonomy

### Header & Metadata Bar
```html
<header>
  <div class="header-top">
    <div class="badge-group">
      <span class="badge badge-scope-medium">Scope: Medium</span>
      <span class="badge badge-pass">Tests: Passed</span>
    </div>
    <span class="badge">Walkthrough Report</span>
  </div>
  <h1>Feature Title or Implementation Name</h1>
  <div class="meta-bar">
    <span class="meta-item"><strong>Date:</strong> 2026-08-28</span>
    <span class="meta-item"><strong>Reporter:</strong> AI Agent</span>
    <span class="meta-item"><strong>Target Files:</strong> 4 modified, 2 new</span>
  </div>
</header>
```

### Executive Summary Card
```html
<section>
  <h2>Executive Summary</h2>
  <article class="card card-summary">
    <h3>Problem & Goal</h3>
    <p>Brief explanation of what was requested and why this change was needed.</p>
    
    <h3>Implemented Solution</h3>
    <p>Concise summary of the core mechanism implemented.</p>
  </article>
</section>
```

### Visual Architecture / Flow (Mermaid.js)
```html
<section>
  <h2>Architecture & Data Flow</h2>
  <div class="diagram-container">
    <div class="mermaid">
graph TD
  A[User Action] --> B[Controller]
  B --> C[Service Layer]
  C --> D[Database / Storage]
    </div>
  </div>
</section>
```

### File Changes Inventory
```html
<section>
  <h2>File Changes Inventory</h2>
  <table>
    <thead>
      <tr>
        <th>Action</th>
        <th>File Path</th>
        <th>Purpose of Change</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="file-action-new">[NEW]</span></td>
        <td><code>src/services/auth.ts</code></td>
        <td>Implements token generation and session validation.</td>
      </tr>
      <tr>
        <td><span class="file-action-modify">[MODIFY]</span></td>
        <td><code>src/routes/api.ts</code></td>
        <td>Attaches auth middleware to protected endpoints.</td>
      </tr>
      <tr>
        <td><span class="file-action-delete">[DELETE]</span></td>
        <td><code>src/legacy/auth.js</code></td>
        <td>Removes deprecated authentication helpers.</td>
      </tr>
    </tbody>
  </table>
</section>
```

### Key Code Highlights & Diffs (Split-View Side-by-Side)
For medium and large diffs, use the two-column split layout with sticky annotation cards, interactive hover synchronization, and independent horizontal scrollbars:

```html
<section>
  <h2>Key Implementation Diffs</h2>
  
  <details open>
    <summary><code>src/services/auth.ts</code> — Token Verification Hook</summary>
    
    <div class="split-code-layout">
      <!-- Left Pane: Code with Horizontal Scroll -->
      <div class="split-code-pane">
        <pre><code class="language-typescript"><span class="code-line-highlight" data-step="step-1"><span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">verifyToken</span>(token: <span class="token type">string</span>): <span class="token class-name">Promise</span>&lt;<span class="token type">Session</span>&gt; {
  <span class="token keyword">const</span> decoded = <span class="token keyword">await</span> jwt.<span class="token function">verify</span>(token, process.env.JWT_SECRET);</span>
<span class="code-line-highlight" data-step="step-2">  <span class="token keyword">return</span> sessionStore.<span class="token function">get</span>(decoded.id);
}</span></code></pre>
      </div>

      <!-- Right Pane: Sticky Annotations with Vertical Scroll -->
      <div class="split-annotation-pane">
        <article class="annotation-step" data-target="step-1">
          <h4>① Cryptographic Signature Verification</h4>
          <p><strong>Input:</strong> Raw JWT token string from authorization cookie. Validates signature and rejects tampered tokens.</p>
        </article>

        <article class="annotation-step" data-target="step-2">
          <h4>② Active Session Lookup</h4>
          <p><strong>Output:</strong> Resolves and returns the live active <code>Session</code> entity from in-memory session reservoir.</p>
        </article>
      </div>
    </div>
  </details>
</section>
```

### Verification & Test Evidence
```html
<section>
  <h2>Verification & Test Evidence</h2>
  <div class="test-summary-bar">
    <span class="badge badge-pass">14 Passed</span>
    <span class="badge">0 Failed</span>
    <span>Duration: 1.42s</span>
  </div>
  
  <div class="terminal-output">
✓ src/tests/auth.test.ts (8 tests) 420ms
  ✓ should create session token (45ms)
  ✓ should reject expired token (32ms)
✓ src/tests/api.test.ts (6 tests) 310ms

Test Suites: 2 passed, 2 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        1.42 s
  </div>
</section>
```

### Edge Cases, Tradeoffs & Failure Modes
```html
<section>
  <h2>Edge Cases & Failure Guardrails</h2>
  <div class="grid-2">
    <article class="card card-warning">
      <h3>Edge Cases Handled</h3>
      <ul class="list-secondary">
        <li>Expired token throws <code>TokenExpiredError</code> instead of silent rejection.</li>
        <li>Missing auth header defaults to anonymous guest session without crashing.</li>
      </ul>
    </article>
    <article class="card card-success">
      <h3>Guardrails & Tradeoffs</h3>
      <ul class="list-secondary">
        <li>Optimized for in-memory token lookup speed over distributed Redis cache.</li>
        <li>Auto-cleanup cron removes stale sessions every 15 minutes.</li>
      </ul>
    </article>
  </div>
</section>
```

### Manual Verification Steps
```html
<section>
  <h2>Manual Verification Steps</h2>
  <article class="card">
    <ol class="list-secondary">
      <li>Run <code>npm run dev</code> to start the local server.</li>
      <li>Send a POST request to <code>/api/login</code> with test credentials.</li>
      <li>Verify the response headers include <code>Set-Cookie: auth_token=...</code>.</li>
    </ol>
  </article>
</section>
```
