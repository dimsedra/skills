---
name: master-it
description: "Use when the user wants to deeply learn, understand, or master a codebase module, function, architectural pattern, or external engineering concept through a senior-developer lens."
---

# Master It

Transform any codebase module, subsystem, design pattern, or external software engineering topic into a deep, durable, senior-level interactive HTML lesson. Bridges concrete code mechanics with foundational computer science paradigms, supported by grounded external research citations.

**REQUIRED SUB-SKILL:** Use `report-in-html` for generating and serving the standalone HTML lesson deliverable.

---

## When to Use

- When the user asks to "understand", "learn", "study", or "master" a specific file, function, module, or architecture in the codebase.
- When explaining complex distributed systems, concurrency models, state machines, algorithms, or API design patterns.
- When conducting an architectural deep-dive to build transferable mental models for junior/mid-level developers.
- When exploring external libraries, protocols, RFCs, or computer science concepts.

### When NOT to Use
- For simple post-implementation change reports or verification summaries (use `walkthrough` instead).
- For quick 1-line syntax lookups or trivial debugging questions (answer directly in chat).
- For writing tracking issues or bug tickets (use `issue-it` instead).

---

## Core Invariants

1. **Uncompromised Technical Depth Over Brevity**: Never artificially truncate or oversimplify lessons to save token length. This lesson serves as long-term reference documentation that must remain actionable and comprehensive when revisited weeks later. Prioritize exhaustive depth, explicit mechanics, and mental models over quick summaries.
2. **Senior Developer Perspective & Systems Thinking**: Frame lessons through the lens of a Senior Engineer:
   - *Why* was this pattern chosen over alternatives?
   - *What* are the trade-offs, operational bottlenecks, and hidden failure modes?
   - *How* does this component behave under high concurrency, scale, or failure?
3. **Mandatory Grounded Research & External Citations**: Never rely solely on internal LLM training memory for theoretical claims. Conduct live research to fetch, verify, and cite authoritative external references (Official RFCs, framework documentation, IEEE/ACM papers, architectural blueprints).
4. **Hybrid Bridging for Codebase Topics**: When analyzing internal code, always bridge local implementation details to foundational Computer Science principles (e.g. mapping an in-memory batch queue to the *Leaky Bucket Algorithm* or *Actor Model*). Ensure the knowledge gained is portable and transferable across projects.
5. **Strictly No Naked Code Diffs or Snippets**: Every single code snippet MUST include an explicit **Logic & Mechanics Breakdown** using `.code-annotation` (Input -> Process / Cause & Effect -> Output) with line-by-line rationale for critical logic.
6. **Delegated HTML Deliverable**: Deliver the lesson via a standalone, monochromatic HTML document using `report-in-html` with dark/light theme toggle, Mermaid architecture flows, and responsive layouts.
7. **Auto-Launch Local Live Server**: Automatically start a lightweight background HTTP server and deliver an active `http://localhost:<port>/<filename>.html` link. Never provide raw `file:///` URLs.
8. **In-Chat Socratic Dialogue (Post-Delivery Only)**: Keep the HTML file dedicated purely to documentation. After delivering the live URL, offer an optional in-chat Socratic dialogue with 2–3 thought-provoking scenario/what-if questions to test mental models.

---

## Execution Lifecycle (Phase Gates)

```
[/master-it Invoked] ──► [Gate 1: Scope & Mode Resolution]
                                    │
                                    ▼
                         [Gate 2: Grounded Research & External Citations]
                                    │
                                    ▼
                         [Gate 3: Deep HTML Lesson Assembly]
                                    │
                                    ▼
                         [Gate 4: Live Server Delivery & In-Chat Socratic Dialogue]
```

### Gate 1: Scope & Mode Resolution
Identify the learning mode:
- **Mode A: Pure External Concept** (e.g., *Raft Consensus Algorithm*, *Database WAL*, *OAuth 2.1 PKCE Flow*).
- **Mode B: Internal / Hybrid Codebase Deep-Dive** (e.g., *Auth Session Pipeline in `src/auth/`*, *Real-time WebSocket Handler*).

Identify the target components, interfaces, and primary mental models to teach.

### Gate 2: Grounded Research & External Citations
1. Conduct live web/documentation search for the core concepts, standards, RFCs, and industry benchmarks.
2. Extract authoritative URLs, official diagrams, or theoretical definitions.
3. For codebase topics, link the internal code patterns to established software engineering design patterns and computer science fundamentals.

### Gate 3: Deep HTML Lesson Assembly
Generate a standalone HTML file using the styling from `report-in-html` and structured according to [LESSON-FORMAT.md](LESSON-FORMAT.md):
1. **Mental Model & Big Picture**: High-level framing, analogies, and governing invariant.
2. **Theoretical Foundations & External References**: Deep dive into core CS concepts with direct citation links.
3. **Architectural Topology (Mermaid.js)**: Component hierarchy, state transitions, or sequence flows.
4. **Code Mechanics & Line-by-Line Breakdown**: Code highlights with mandatory `.code-annotation` containers detailing Input, Process (line-by-line), and Output.
5. **Trade-offs, Failure Modes & Production Edge Cases**: Concurrency issues, memory leaks, latency impacts, and boundary conditions.
6. **Transferable Senior Takeaways**: Portable engineering rules of thumb.

### Gate 4: Local Live Server Delivery & In-Chat Socratic Dialogue
1. Save the file to disk (e.g. `docs/lessons/lesson-<topic>.html` or `lesson-<topic>.html`).
2. Auto-launch background HTTP server if not already running.
3. Share the clickable live localhost URL in chat: `Open Lesson: http://localhost:<port>/<filename>.html`.
4. Provide a 2-sentence executive overview in chat, and offer the optional in-chat Socratic challenge:
   > *"Would you like to test your understanding with a quick 2-question Socratic challenge on [Topic] right here in chat?"*
5. If the user accepts, present 2–3 practical *what-if* edge case scenarios directly in chat and discuss interactively.

---

## Failure Modes & Rationalization Counters

| Excuse / Failure Mode | Root Cause | Guardrail / Fix |
|---|---|---|
| **Naked Code Snippets** | Pasting code blocks without line-by-line mechanics. | Every code block must have `.code-annotation` with Input-Process-Output breakdown. |
| **Artificial Truncation** | Trying to keep the lesson under 50 lines. | Depth is mandatory; provide exhaustive coverage of system mechanics and edge cases. |
| **Unverified Memory / Hallucination** | Explaining theories purely from LLM internal knowledge. | Perform live research and cite authoritative external sources (RFCs, official docs). |
| **Syntax-Level Superficiality** | Explaining *what* syntax does without *why* or *systems impact*. | Adopt Senior POV: analyze lifecycle, memory, concurrency, trade-offs, and failure modes. |
| **Putting Quiz in HTML** | Hardcoding questionnaire into the HTML report. | Keep HTML as clean durable documentation; deliver Socratic inquiry interactively in chat. |
| **Raw File Link Delivery** | Providing `file:///` URLs. | Auto-launch local HTTP server and share `http://localhost:<port>/<filename>.html`. |

---

## Red Flags - STOP and Reset

- 🚩 Code blocks without `.code-annotation` or without Input-Process-Output breakdown
- 🚩 Zero external citations or lack of live-searched reference links
- 🚩 Superficial, 2-paragraph lessons that skip architectural trade-offs or failure modes
- 🚩 Hardcoding interactive quizzes or buttons into the static HTML report
- 🚩 Delivering `file:///` URLs instead of an active `http://localhost:<port>` link

**If any red flag occurs: STOP. Reset the lesson generation to follow [LESSON-FORMAT.md](LESSON-FORMAT.md) with deep annotations and external references.**

---

## Disclosed References

- [LESSON-FORMAT.md](LESSON-FORMAT.md): Detailed HTML lesson layout specification, section schemas, and Socratic question prompts.
- `report-in-html`: Reusable HTML report generator skill and stylesheet.
