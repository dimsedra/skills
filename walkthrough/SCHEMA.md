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

### Key Code Highlights & Diffs (With Annotated Logic Breakdown)
```html
<section>
  <h2>Key Implementation Diffs</h2>
  
  <details open>
    <summary><code>src/services/auth.ts</code> — Token Verification Hook</summary>
    <pre><code>// Added secure token validation with expiration checks
<span class="diff-line-add">+ export async function verifyToken(token: string): Promise&lt;Session&gt; {</span>
<span class="diff-line-add">+   const decoded = await jwt.verify(token, process.env.JWT_SECRET);</span>
<span class="diff-line-add">+   return sessionStore.get(decoded.id);</span>
<span class="diff-line-add">+ }</span></code></pre>

    <div class="code-annotation">
      <h4>Logic & Mechanics</h4>
      <ul class="logic-breakdown">
        <li><strong>Input:</strong> Raw JWT token string from HTTP request authorization cookie/header.</li>
        <li><strong>Verification (Line 114):</strong> Cryptographically validates signature and expiration against server secret; rejects tampered payloads immediately.</li>
        <li><strong>Session Retrieval (Line 115):</strong> Fetches live active session instance from cache/store using the decoded user ID.</li>
        <li><strong>Output:</strong> Returns resolved <code>Session</code> entity or throws <code>JsonWebTokenError</code> on failure.</li>
      </ul>
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
