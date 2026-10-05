---
name: document
description: Use when documenting architecture, decisions, workflows, concepts, or technical specifications into a modular, traceable, and easily maintainable docs/ structure.
---

# Document

When asked to document a system, feature, discussion, architectural decision, or workflow (e.g. via `/document` or natural documentation requests), follow these directives to maintain a clean, modular, and durable documentation repository:

## Core Documentation Directives

### 1. Synthesis Over Transcripts
Documentation captures enduring system architecture and technical truths, not raw conversational histories.
- Synthesize technical reality, architectural decisions, and operational mental models directly from context.
- Never produce conversational logs or raw discussion summaries. Extract durable knowledge that remains valuable for anyone reading the documentation cold.

### 2. Modular Separation of Concerns (Single Responsibility)
Every document addresses exactly one focused technical concern rather than amalgamating unrelated topics into a monolith.
- Enforce strict single-responsibility per document. Avoid monolithic, multi-topic documents.
- Clearly decouple high-level system models from step-by-step implementation recipes and technical decision records.

### 3. Explicit Placement Announcement (Zero Stealth Writing)
File locations and taxonomical classifications must be explicitly declared to the user before writing begins.
- Never create or modify documentation files silently without declaring intent.
- Always explicitly state the determined category and destination file path before or upon generating the file (e.g., *"Categorized as **architecture**: creating `docs/architecture/state-machine.md`"*).
- If the content spans multiple categories (e.g. half architecture, half how-to guide), identify the boundary ambiguity and offer a concise split or placement choice before writing.

### 4. Durable Code Anchors & Traceability
Documentation remains anchored to concrete codebase symbols rather than decaying in an isolated narrative vacuum.
- Bind documentation directly to codebase symbols and files via structured YAML frontmatter.
- Reference durable symbol paths (`path/to/file.ext` -> `ClassName.method()`) rather than volatile line numbers that break on future edits.

### 5. Single Source of Map (Anti-Rot Indexing)
A centralized documentation index maintains complete discoverability and prevents orphaned or forgotten files.
- Never leave orphaned documentation files.
- Every newly created or updated document must be cataloged in `docs/README.md` (or the existing root documentation index) with a one-line summary and relative link.

---

## Taxonomy & Decision Tree

Evaluate the content against this decision tree to determine file placement:

| Category | Target Directory | Content Type & Scope |
| :--- | :--- | :--- |
| **Architecture** | `docs/architecture/` | **How the system works**: Component hierarchy, data lifecycle, runtime state transitions, subsystem boundaries, and inter-service communication. |
| **Decisions (ADR)** | `docs/decisions/` | **Why a technical choice was made**: Architectural Decision Records detailing context, considered alternatives, evaluated trade-offs, and consequences. |
| **Guides** | `docs/guides/` | **How to accomplish a task**: Step-by-step developer recipes, environment setup, runbooks, migration guides, and operational procedures. |
| **Concepts** | `docs/concepts/` | **Domain mental models**: Business domain rules, terminology glossaries, core entities, and conceptual paradigms. |
| **Reference** | `docs/reference/` | **Formal specifications**: API contracts, configuration schemas, command-line arguments, database models, and interface definitions. |

*Existing Project Conventions*: If the project already has an established documentation directory structure, respect and adapt to that layout while enforcing modularity and traceability.

---

## Execution Workflow

1. **Classify & Check Collision**:
   - Map the topic to the appropriate category using the decision tree.
   - Inspect the existing `docs/` tree. If a document covering the topic already exists, update and refine the existing document instead of creating a redundant duplicate.

2. **Announce Placement**:
   - Declare the chosen category and destination path in the chat response.

3. **Draft the Document**:
   Structure every document with consistent frontmatter:
   ```markdown
   ---
   title: [Descriptive Document Title]
   type: [architecture | decision | guide | concept | reference]
   status: [active | draft | superseded]
   related_code:
     - path/to/file.ts
   last_updated: YYYY-MM-DD
   ---

   # [Document Title]

   ## Overview & Purpose
   [High-level context and the problem this document addresses]

   ## [Core Technical Section / System Model / Steps]
   [Technical explanation, diagrams, architectural breakdown, or guide steps]

   ## Related Documents & Code
   [Cross-links to related documents in docs/ and key source files]
   ```

4. **Synchronize Index & Deliver**:
   - Update `docs/README.md` with the new or updated document link and description.
   - Report the generated document path and a concise summary.
