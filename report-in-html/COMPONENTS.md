# HTML Report Component Catalog

Plug-and-play semantic HTML components for constructing reports with `report.css`.

All components use semantic HTML classes and require **zero inline styles**.

---

## 1. Badges & Indicators

```html
<!-- Scope / Neutral Badge -->
<span class="badge"><span class="badge-dot"></span>Scope: Medium</span>

<!-- Passed / Success Status Badge -->
<span class="badge badge-pass"><span class="badge-dot"></span>18 / 18 Passed</span>

<!-- Failed / Danger Status Badge -->
<span class="badge badge-fail"><span class="badge-dot"></span>2 Regressions Detected</span>

<!-- Warning / In-Progress Status Badge -->
<span class="badge badge-warn"><span class="badge-dot"></span>Review Required</span>
```

---

## 2. Summary & Content Cards

```html
<!-- Executive Summary Card (with left border accent) -->
<article class="card card-summary">
  <h3>Core Objective</h3>
  <p>Description of the task or problem statement.</p>
  
  <h3>Implemented Solution</h3>
  <p>Summary of what was changed and the architectural outcome.</p>
</article>

<!-- Standard Clean Card -->
<article class="card">
  <h3>Subsystem Note</h3>
  <p>Detailed notes, architectural implications, or considerations.</p>
</article>
```

---

## 3. Two-Column & Three-Column Grids

```html
<!-- Two-Column Balanced Grid -->
<div class="grid-2">
  <article class="card">
    <h3>Edge Cases Handled</h3>
    <ul class="list-secondary">
      <li>Clock skew tolerance during HMAC validation.</li>
      <li>Automatic memory eviction for stale sessions.</li>
    </ul>
  </article>
  
  <article class="card">
    <h3>Guardrails & Tradeoffs</h3>
    <ul class="list-secondary">
      <li>Stateless tokens eliminate database round-trips.</li>
      <li>Constant-time HMAC comparison prevents timing attacks.</li>
    </ul>
  </article>
</div>
```

---

## 4. Structured Inventory Table

```html
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
      <td><code>src/security/rate-limiter.ts</code></td>
      <td>Token bucket algorithm implementation for per-IP burst protection.</td>
    </tr>
    <tr>
      <td><span class="file-action-modify">[MODIFY]</span></td>
      <td><code>src/middleware/auth.ts</code></td>
      <td>Integrated session verification and automatic token rotation.</td>
    </tr>
    <tr>
      <td><span class="file-action-delete">[DELETE]</span></td>
      <td><code>src/legacy/session.js</code></td>
      <td>Removed deprecated cookie-based session handler.</td>
    </tr>
  </tbody>
</table>
```

---

## 5. Color-Coded Code Diffs & Highlights

```html
<details open>
  <summary><code>src/security/rate-limiter.ts</code> — Token Consumption Logic</summary>
  <pre><code>export class TokenBucketRateLimiter {
  private buckets = new Map&lt;string, { tokens: number; lastRefill: number }&gt;();

<span class="diff-line-add">+ public tryConsume(ip: string, cost = 1): boolean {</span>
<span class="diff-line-add">+   const now = Date.now();</span>
<span class="diff-line-add">+   const bucket = this.getOrInitBucket(ip, now);</span>
<span class="diff-line-add">+   this.refill(bucket, now);</span>
<span class="diff-line-add">+   </span>
<span class="diff-line-add">+   if (bucket.tokens &gt;= cost) {</span>
<span class="diff-line-add">+     bucket.tokens -= cost;</span>
<span class="diff-line-add">+     return true;</span>
<span class="diff-line-add">+   }</span>
<span class="diff-line-add">+   return false;</span>
<span class="diff-line-add">+ }</span>
}</code></pre>
</details>

<details>
  <summary><code>src/middleware/auth.ts</code> — Legacy Cleanup</summary>
  <pre><code>export async function requireAuth(req: Request, res: Response, next: NextFunction) {
<span class="diff-line-del">- const legacyToken = req.headers['x-legacy-token'];</span>
<span class="diff-line-del">- if (!legacyToken) return res.status(401).json({ error: 'Unauthorized' });</span>
<span class="diff-line-add">+ const token = req.cookies['__Secure-session'];</span>
<span class="diff-line-add">+ if (!token) return res.status(401).json({ error: 'Missing session token' });</span>
  next();
}</code></pre>
</details>
```

---

## 6. High-Contrast Mermaid Diagram Container

```html
<div class="diagram-container">
  <div class="mermaid">
sequenceDiagram
  autonumber
  actor User as Client Browser
  participant Gateway as API Gateway
  participant Auth as Session Service
  
  User->>Gateway: POST /api/login
  Gateway->>Auth: Validate Credentials
  Auth-->>Gateway: 200 OK (Issued Signed Token)
  Gateway-->>User: Set-Cookie: __Secure-session
  </div>
</div>
```

---

## 7. Terminal Verification Evidence Box

```html
<div class="test-summary-bar">
  <span class="badge badge-pass"><span class="badge-dot"></span>18 Passed</span>
  <span class="badge">0 Failed</span>
  <span class="badge">100% Seam Coverage</span>
  <span>Execution Time: 840ms</span>
</div>

<div class="terminal-output">PASS tests/security/rate-limiter.test.ts (6 tests) 180ms
  ✓ allows requests within capacity (25ms)
  ✓ rejects bursts exceeding max capacity (32ms)
  ✓ refills tokens at configured interval (54ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Time:        0.840 s
Ran all test suites.</div>
```
