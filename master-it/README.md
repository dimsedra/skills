# Master It Skill

Transform codebase modules, subsystems, algorithms, and universal software engineering concepts into deep, durable, senior-level interactive HTML courses backed by grounded external research and bite-sized evolutionary code mechanics.

## Install

```bash
npx skills add dimsedra/skills --skill master-it
```

## Features

- **Pre-Flight Context & Jargon Alignment (Gate 0)**: Conducts an in-chat alignment session before generating documentation, proactively defining critical terms in plain language.
- **Universal 4-Tier Pedagogical Ladder**:
  1. *Tier 1: Fundamental Conceptual Intuition* — Origin in computer science, core invariant, and universal analogy.
  2. *Tier 2: Fundamental Technical Implementation* — Minimal working code (10–20 lines) demonstrating pure protocol/API mechanics.
  3. *Tier 3: Case-Specific Abstraction Understanding* — Real-world problem domain, failure dynamics of the naive code, and topology flows.
  4. *Tier 4: Case-Specific Technical Implementation* — Evolutionary, bite-sized code snippets (10–25 lines) isolating individual responsibilities.
- **Bite-Sized Code Mechanics (Strictly No Monolithic Dumps)**: Splits complex systems into clean, digestible modules paired with line-by-line Input-Process-Output annotations.
- **Senior Developer Lens & Systems Thinking**: Analyzes operational boundaries, clock drift, race conditions, memory overhead, and architectural trade-offs.
- **Grounded Research & External Citations**: Researches and cites authoritative sources (RFCs, official docs, engineering blogs).
- **Standalone Interactive HTML Lesson**: Generates styled monochromatic deliverables using `report-in-html` with dark/light themes and background live server delivery.
- **Post-Delivery In-Chat Socratic Dialogue**: Offers optional 2–3 question scenario-based inquiry in chat to lock in mental models.

## Files Reference

- `SKILL.md`: Core invariants, execution phase gates, failure modes, and red flags.
- `LESSON-FORMAT.md`: Full HTML lesson schema, 4-tier pedagogical blueprints, and Socratic question guidelines.
- `examples/kds-websocket/`: Comprehensive throwable example lesson demonstrating WebSocket architecture in a Restaurant Kitchen Display System.
- Dependency: Uses `report-in-html` for HTML generation and styling.
