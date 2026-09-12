---
name: master-it
description: Use when the user wants to deeply learn, understand, or master a codebase module, function, architectural pattern, or external engineering concept through a senior-developer lens.
---

# Master It

Transform any codebase module, subsystem, design pattern, or external software engineering topic into a structured, durable, senior-level interactive HTML coding course. Enforces a universal 4-tier pedagogical progression from fundamental computer science concepts and minimal working code to domain-specific abstractions and evolutionary bite-sized implementations, supported by grounded external research citations.

**REQUIRED SUB-SKILL:** Use `report-in-html` for generating and serving the standalone HTML lesson deliverable.

---

## When to Use

- When the user asks to "understand", "learn", "study", or "master" a specific file, function, module, architectural subsystem, or engineering pattern.
- When exploring external protocols, distributed systems, concurrency models, database internals, or computer science concepts (e.g. WebSockets, Raft, LSM-Trees, OAuth PKCE, Actor Model).
- When conducting an architectural deep-dive to build permanent, transferable mental models rather than fleeting surface familiarity.

### When NOT to Use
- For simple post-implementation change reports or verification summaries (use `walkthrough` instead).
- For quick 1-line syntax lookups or trivial debugging questions (answer directly in chat).
- For writing tracking issues or bug tickets (use `issue-it` instead).

---

## Core Invariants

1. **Pre-Flight Context & Jargon Alignment (Gate 0)**: Before generating any HTML or lesson content, conduct an in-chat alignment session. Proactively define 2–3 core technical terms in plain, conversational language and calibrate the baseline mental model with the user. Never leap into generating documentation without this handshake.
2. **Universal 4-Tier Pedagogical Ladder**: Every lesson must progress strictly through the 4 universal learning tiers:
   - **Tier 1: Fundamental Conceptual Intuition**: Explore the universal CS origin. Why does this paradigm exist? What universal problem does it solve? Provide a real-world analogy completely detached from the specific case study.
   - **Tier 2: Fundamental Technical Implementation (Minimal Working Code)**: Provide a clean, minimal code snippet (10–20 lines) demonstrating the raw protocol or API mechanics in its purest form without architectural bloat.
   - **Tier 3: Case-Specific Abstraction Understanding**: Introduce the concrete problem domain (e.g. high-concurrency order pipeline, unreliable network environment). Detail the system challenges and explicitly demonstrate where and why the naive Tier 2 code breaks (*the breaking point*).
   - **Tier 4: Case-Specific Technical Implementation (Evolutionary Bite-Sized Snippets)**: Build the production-grade, hardened solution step-by-step through sequential, bite-sized code blocks.
3. **Mandatory Bite-Sized Code Blocks (Strictly No Monolithic Code Dumps)**: Never dump monolithic classes or 50+ line files that interleave multiple concerns. Isolate each discrete responsibility into its own bite-sized snippet (10–25 lines) paired with an explicit `.code-annotation` (Input -> Process / Cause & Effect -> Output) explaining line-by-line mechanics.
4. **Uncompromised Technical Depth Over Brevity**: Never artificially truncate or oversimplify lessons to save token length. This lesson serves as long-term reference documentation that must remain actionable and comprehensive when revisited months later.
5. **Senior Developer Perspective & Systems Thinking**: Dissect trade-offs, operational bottlenecks, edge cases, memory overhead, and hidden failure modes under high load or network partitions.
6. **Mandatory Grounded Research & External Citations**: Never rely solely on internal LLM training memory for theoretical claims. Conduct live research to fetch, verify, and cite authoritative external references (Official RFCs, framework documentation, IEEE/ACM papers, architectural blueprints).
7. **Hybrid Bridging for Codebase Topics**: When analyzing internal code, bridge local implementation details to foundational Computer Science principles (e.g. mapping an in-memory queue to the *Leaky Bucket Algorithm* or *Actor Model*).
8. **Dedicated Local Directory & Git Exclusion**: Save every generated lesson specifically into `.report/master-it/<topic-name>/index.html` alongside `report.css`. Before creating the directory, ensure `.report/` is added to `.git/info/exclude` (if working in a git repository) so that local reports remain strictly local, never touch project `.gitignore`, and are never committed or pushed to remote.
9. **Delegated HTML Deliverable**: Deliver the lesson via a standalone, monochromatic HTML document using `report-in-html` with dark/light theme toggle, Mermaid architecture flows, and responsive split-view code layouts.
10. **Auto-Launch Local Live Server**: Automatically start a lightweight background HTTP server inside `.report/master-it/<topic-name>/` and deliver an active `http://localhost:<port>/index.html` link. Never provide raw `file:///` URLs.
11. **In-Chat Socratic Dialogue (Post-Delivery Only)**: Keep the HTML file dedicated purely to durable documentation. After delivering the live URL, offer an optional in-chat Socratic dialogue with 2–3 thought-provoking scenario/what-if questions to test mental models.
12. **Conversational Language Alignment**: The language used in the HTML lesson (headings, prose, annotations, analogies, and trade-offs) must automatically match the primary conversational language used by the user (e.g. Indonesian if the user communicates in Indonesian, English if in English). Technical terms, code symbols, and syntax remain in standard technical form.
13. **Continuous Pedagogical Preference Memory & Override Authority**: Before generating a lesson, inspect the workspace root for `.reporting-preferences.md`. If found, apply all learned pedagogical preferences (analogy styles, code focus areas, diagram types). Never create a blank preference file beforehand.

---

## Execution Lifecycle (Phase Gates)

```
[/master-it Invoked] ──► [Gate 0: Pre-Flight Context & Jargon Alignment (In Chat)]
                                    │
                                    ▼
                         [Gate 1: Scope & Pedagogical Plan Resolution]
                                    │
                                    ▼
                         [Gate 2: Grounded Research & External Citations]
                                    │
                                    ▼
                         [Gate 3: 4-Tier Interactive HTML Course Assembly]
                                    │
                                    ▼
                         [Gate 4: Local Isolation & Live Server Delivery]
```

### Gate 0: Pre-Flight Context & Jargon Alignment (In Chat)
Before touching any files or generating HTML:
1. Identify 2–3 core technical terms or paradigms that will form the backbone of the lesson (e.g. *Half-Open Sockets, Monotonic Sequences, Distributed Mutex*).
2. Explain these terms in plain, conversational language directly in chat.
3. Confirm with the user that the scope, prerequisites, and learning objectives are aligned.

### Gate 1: Scope & Pedagogical Plan Resolution
1. **Check Preference Memory:** Inspect `./.reporting-preferences.md` in workspace root. If present, load preferred analogy formats, diagram types, and focus areas.
2. **Identify the learning mode:**
   - **Mode A: Pure External Concept** (e.g., *Raft Consensus Algorithm*, *Database WAL*, *OAuth 2.1 PKCE Flow*).
   - **Mode B: Internal / Hybrid Codebase Deep-Dive** (e.g., *Auth Session Pipeline in `src/auth/`*, *Real-time WebSocket Handler*).
3. Map out the 4 tiers: define the universal concept, the naive code, the breaking point, and the evolutionary solution modules.

### Gate 2: Grounded Research & External Citations
1. Conduct live web/documentation search for the core concepts, standards, RFCs, and industry benchmarks.
2. Extract authoritative URLs, official diagrams, or theoretical definitions.
3. For codebase topics, link internal patterns to established computer science fundamentals.

### Gate 3: 4-Tier Interactive HTML Course Assembly
Generate the lesson HTML using the styling from `report-in-html` and structured strictly according to [LESSON-FORMAT.md](LESSON-FORMAT.md):
1. **Tier 1: Fundamental Conceptual Intuition**: Core CS rationale, governing invariant, and universal real-world analogy.
2. **Tier 2: Fundamental Technical Implementation**: Minimal working code snippet (10–20 lines) showing raw API/protocol mechanics.
3. **Tier 3: Case-Specific Abstraction & System Topology**: Real-world domain context, system failure triggers of the naive code, and Mermaid architecture flow.
4. **Tier 4: Case-Specific Technical Implementation (Bite-Sized Evolution)**: Hardened, production-grade implementation partitioned into sequential, single-responsibility code snippets with `.code-annotation` breakdowns.
5. **Tier 5: Senior Trade-offs & Operational Boundaries**: Edge cases, failure modes, concurrency boundaries, and memory footprints.
6. **Authoritative Reference Citations**: Table of RFCs, official documentation, and engineering blogs.

### Gate 4: Local Isolation, Live Server Delivery & In-Chat Socratic Dialogue
1. **Ensure Local Git Exclusion**: If inside a git repository, inspect `.git/info/exclude`. If `.report/` is not present, append `.report/` to ensure the reports remain strictly local and never pollute project `.gitignore` or git history.
2. **Scaffold Directory**: Create directory `.report/master-it/<topic-name>/` and copy `report.css` from `report-in-html` into it.
3. **Save File**: Write the generated lesson to `.report/master-it/<topic-name>/index.html`.
4. **Auto-Launch Local Live Server**: Launch a background HTTP server in `.report/master-it/<topic-name>/` (e.g. `python -m http.server 8000` or next available port).
5. **Share Link**: Deliver the clickable live URL: `Open Lesson: http://localhost:<port>/index.html`.
6. Provide a 2-sentence executive overview in chat, and offer the optional in-chat Socratic challenge:
   > *"Would you like to test your understanding with a quick 2-question Socratic challenge on [Topic] right here in chat?"*
7. If the user accepts, present 2–3 practical *what-if* edge case scenarios directly in chat and discuss interactively.

---

## Failure Modes & Rationalization Counters

| Excuse / Failure Mode | Root Cause | Guardrail / Fix |
|---|---|---|
| **Dumping Monolithic 100-Line Class** | Assuming a complete class is more comprehensive. | Overloads working memory. Split code into sequential, single-responsibility snippets (10–25 lines each). |
| **Skipping Gate 0 Alignment** | Rushing directly to code generation. | Unaligned jargon creates instant drop-off. Always conduct in-chat jargon alignment before generating HTML. |
| **Jumping Straight to Complex Case** | Treating the topic purely as a specialized feature. | Always establish universal CS fundamentals (Tier 1) and naive minimal code (Tier 2) before domain specifics. |
| **Naked Code Snippets** | Pasting code blocks without line-by-line mechanics. | Every code block must have `.code-annotation` with Input-Process-Output breakdown. |
| **Artificial Truncation** | Trying to keep the lesson under 50 lines. | Depth is mandatory; provide exhaustive coverage of system mechanics and edge cases. |
| **Unverified Memory / Hallucination** | Explaining theories purely from LLM internal knowledge. | Perform live research and cite authoritative external sources (RFCs, official docs). |
| **Putting Quiz in HTML** | Hardcoding questionnaire into the HTML report. | Keep HTML as clean durable documentation; deliver Socratic inquiry interactively in chat. |
| **Raw File Link Delivery** | Providing `file:///` URLs. | Auto-launch local HTTP server and share `http://localhost:<port>/<filename>.html`. |

---

## Red Flags - STOP and Reset

- 🚩 Generating an HTML lesson without conducting Gate 0 in-chat jargon alignment first
- 🚩 Jumping straight into domain-specific architecture without universal Tier 1 concept and Tier 2 minimal code
- 🚩 Presenting a monolithic 50+ line class or file instead of sequential, bite-sized code blocks
- 🚩 Code blocks without `.code-annotation` or without Input-Process-Output breakdown
- 🚩 Zero external citations or lack of live-searched reference links
- 🚩 Superficial lessons that skip architectural trade-offs or failure modes
- 🚩 Hardcoding interactive quizzes or buttons into the static HTML report
- 🚩 Delivering `file:///` URLs instead of an active `http://localhost:<port>` link

**If any red flag occurs: STOP. Reset the lesson generation to follow [LESSON-FORMAT.md](LESSON-FORMAT.md) with the universal 4-tier pedagogical ladder and bite-sized annotations.**

---

## Disclosed References

- [LESSON-FORMAT.md](LESSON-FORMAT.md): Detailed HTML lesson layout specification, 4-tier section schemas, and Socratic question prompts.
- `report-in-html`: Reusable HTML report generator skill and stylesheet.
