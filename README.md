# Agent Skills

[![skills.sh](https://skills.sh/b/dimsedra/skills)](https://skills.sh/dimsedra/skills)

A personal collection of modular, harness-agnostic skills for AI coding agents, built around a single conviction: **alignment must come before execution**.

---

## Why This Exists

If you have spent real time building software with AI coding agents, you have probably lived through this scenario:

You give the agent a prompt. You think you were clear. The agent sounds confident, replies enthusiastically, and immediately starts editing files. Ten minutes later, you are staring at 400 lines of code across seven different files that you cannot fully trace, do not completely understand, and definitely cannot defend in a peer code review.

The code might run, but you do not truly own it. And when it breaks in production at 2:00 AM, the agent will not be the one on call: you will.

The biggest failure mode in AI engineering is almost never basic syntax or lack of intelligence. It is **assumed intent**. We use the same words as the agent, but we picture completely different systems in our heads. When an agent silently assumes details and rushes to write code, the gap between what you wanted and what got built widens with every turn.

I built this collection of skills to fix that specific problem.

---

## The Core Principle: Alignment as the Center

At the heart of this entire system is one skill: [`align`](./align/SKILL.md).

`align` is not just another slash command in a toolbox. It is the gravitational center of how I work with an agent. 

The principle is simple: **we never let the agent guess**.

Whenever we discuss, design, debug, or build, `align` is our universal calibration tool. Its only job is to **make sure both of us are in the exact same boat**: calibrating our understanding, mental models, and boundaries until they genuinely converge.

It can be invoked at any point: at the start of an idea, in the middle of a thorny debugging session, during architectural exploration, or whenever either of us senses drift or ambiguity.

Alignment is a collaborative thinking session, not a mechanical questionnaire. Asking questions, weighing trade-offs, or inspecting code are merely tools to reach a shared understanding:
* **Playback (Mirroring)**: The agent states its current mental model in plain terms: *"Here is how I currently understand what you want and how the system behaves... does this match your picture?"*
* **Surfacing Hidden Gaps**: The agent calls out edge cases, unstated assumptions, or pattern conflicts that might have been overlooked.
* **Weighing Concrete Trade-offs**: When multiple viable technical paths exist, the agent lays out 2 or 3 realistic options with their practical trade-offs (complexity, maintenance cost, cognitive load) so we decide together.
* **Grounding in Codebase Reality**: When discussing how something currently works, the agent inspects actual runtime code so discussion is anchored in facts, not guesswork.

We stay in alignment mode across turns until our mental models genuinely meet. Every other skill in this repository is designed to fall back to `align`. The moment a specification is ambiguous, the moment a test plan reveals an unexpected edge case, or the moment an architectural trade-off emerges, the agent is instructed to stop and say: *"Let's align on this first."*

---

## How the System Works Around That Center

Once you have true alignment, how do you turn that shared mental model into working, defendable software without bureaucratic overhead or context drift?

That is where the surrounding skills come in:

### 1. Freezing the Human Story on Disk (`/intent`)
Conversations in chat evaporate. As a session grows longer, language models suffer from context drift and start forgetting subtle details discussed twenty turns ago.

Instead of writing a dry corporate requirements document, [`/intent`](./intent/SKILL.md) captures our alignment session into a permanent, readable narrative on disk (`docs/intent/`). It records:
* The human experience and chronological story of what we want to create.
* How the codebase actually behaves today and why it falls short (grounded in real files and data structures).
* The non-negotiable guiding principles and mental models agreed upon.
* Hard guardrails and non-goals to stop scope creep early.

This is your domain: you define what you want and verify that the intent matches your vision.

### 2. The Agent's Technical Translation (`/blueprint`)
While `intent` belongs to you, [`/blueprint`](./blueprint/SKILL.md) belongs to the agent.

The agent inspects the codebase, applies our strict engineering directives (AHA over DRY, deep modules, locality of behavior, parse-don't-validate, fail-fast error handling, max 2 levels of indentation, and no boolean flags), and translates the intent into a concrete technical blueprint (`docs/blueprint/`):
* Architecture and deep module boundaries.
* Concrete public API contracts with unique identifiers (`BP-[MODULE]-[INDEX]`).
* Fit-for-purpose verification strategies for each contract—avoiding dogmatic TDD when other verification methods (tests written after, manual live runs, contract checks, visual audits) are more appropriate.

The agent presents the Blueprint to you in chat: *"Here is how I grasp your intent based on codebase reality, technically. Here is how we can implement it, strictly applying our engineering directives. Here are the contracts, and the expected endpoint."* You review and approve it in under 30 seconds.

### 3. Explaining by Proof in Conversation (`/proof`)
Once implementation is complete, words are cheap. An agent saying "I am done" requires blind trust, which violates our primary rule: you must be able to 100% defend and own the code.

[`/proof`](./proof/SKILL.md) is the author's demonstration ritual. **Its output is NOT a document—it is delivered directly through words and live evidence in the conversation.**

The agent puts itself on the witness stand and answers: *"Did I really build what the Blueprint contracted, and can I prove it to Eds right now?"*
* **Contract-by-Contract Proof**: Executes verification commands in the terminal and shows actual inputs, state changes, and returned data for each `BP-XXX` contract.
* **Unhappy Paths**: Triggers edge cases and invalid inputs to prove the system fails fast with zero silent fallbacks (`?? 0`).
* **Directives Self-Defense**: Defends the implementation against our engineering rules before you have to review it.
* **Observable Demonstration**: Runs the actual feature against real sample data and displays unmocked output in chat.
* **Radical Transparency Above All**: Calls out any unfinished contracts, deferred work, or unhandled edge cases in the open. Transparency is prized over false completion.

### 4. Verifying Real Pixels Instead of Guessing (`/design`)
Passing backend tests only proves that server logic runs; it says nothing about whether a user interface feels comfortable or distinct. 

We do not write brittle unit tests for CSS layout or styling. Instead, [`/design`](./design/SKILL.md) grounds the UI in a brand Single Source of Truth (`docs/design/brand.md`) to eliminate generic AI design tropes, then spawns an isolated visual auditor subagent to inspect actual Playwright screenshots across mobile (`360x640`) and desktop (`1280x800`) viewports before calling the work done.

### 5. Fresh-Eyed Audits Without Bias (`/audit`)
After you and an agent have been working together in a chat session for an hour, both of you carry context bias. You start overlooking small oversights.

[`/audit`](./audit/SKILL.md) solves this by spawning isolated subagents with clean context across three focused stages—either sequentially or selectively on demand:
1. **`Spec Auditor`** (`audit/SPEC-AUDITOR.md`): Cross-checks the diff against Intent, Blueprint (`BP-XXX`), and ADRs to catch missing requirements or unapproved scope creep.
2. **`Resilience Auditor`** (`audit/RESILIENCE-AUDITOR.md`): Hunts for unhandled edge cases, broken invariants, race conditions, security flaws, and scaling bottlenecks like N+1 queries.
3. **`Quality Auditor`** (`audit/QUALITY-AUDITOR.md`): Holds both the code and the test suite to our engineering rules and verification discipline before returning an honest verdict: `BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`.

---

## What This Looks Like in Practice

Because the requirements and runbooks live on disk as context capsules, your daily prompts do not need to be long or complicated. 

Here is an example of what a high-leverage prompt looks like when starting work on a real feature:

```text
Check these files:
/home/user/projects/my-app/README.md
/home/user/projects/my-app/docs/intent/20261024_duty_scheduling.md
/home/user/projects/my-app/docs/blueprint/20261024_duty_scheduler.md

We will implement this feature based on this Intent and Blueprint (README.md is the project runbook). Let's align first via /align
```

Notice what happens here:
1. The agent gets 100% of the operational context, human outcomes, and technical contracts through clean file pointers.
2. The agent is explicitly restrained by the closing instruction: *"Let's align first"*. It cannot rush ahead or start coding; it must verify its understanding with you first.

---

## The Skills at a Glance

### Thinking & Alignment (The Center)
* **`align`**: The core heartbeat. A universal calibration tool to mirror mental models, surface hidden assumptions, and make sure both parties are in the exact same boat before or during any technical work.
* **`research`**: Grounds technical investigations in actual dependencies and authoritative documentation rather than stale training data.

### Scope Boundaries & Architecture
* **`intent`**: Captures human narrative, codebase reality, and explicit non-goals in `docs/intent/`.
* **`blueprint`**: Establishes testable technical contracts with unique `BP-[MODULE]-[INDEX]` IDs in `docs/blueprint/`.
* **`adr`**: Captures immutable Architecture Decision Records with evaluated trade-offs in `docs/decisions/`.
* **`rfc`**: Proposes engineering initiatives and drives consensus across stakeholders in `docs/rfc/`.

### Verification & Demonstration
* **`proof`**: The author's demonstration ritual—proving work in conversation through live commands, directives self-defense, and radical transparency on gaps.
* **`audit`**: Spawns independent subagents to review diffs against Intent, Blueprint, and engineering rules.
* **`design`**: Enforces brand grounding (`brand.md`) and verifies rendered pixels via dual-viewport visual screenshot audits.

### Tracking & Documentation
* **`issue`**: Converts bugs and architectural gaps into problem-first tracking issues with stable symbol pointers.
* **`document`**: Maintains a clean, modular technical documentation tree cataloged in `docs/README.md`.
* **`report`**: Generates standalone console-themed HTML reports with Chart.js and Mermaid diagrams in `docs/report/`.

---

## Installation

You can install all skills in this repository into your project using `skills.sh`:

```bash
npx skills add dimsedra/skills
```

Or install individual skills as you need them:

```bash
npx skills add dimsedra/skills --skill align
npx skills add dimsedra/skills --skill intent
npx skills add dimsedra/skills --skill blueprint
npx skills add dimsedra/skills --skill proof
npx skills add dimsedra/skills --skill audit
npx skills add dimsedra/skills --skill design
```

---

## Structure

```text
skills/
├── adr/          # Architecture Decision Records in docs/decisions/
├── align/        # Universal mental model calibration (The Center)
├── audit/        # Isolated subagent diff auditing & scaling checks
├── blueprint/    # Technical architecture & public contracts in docs/blueprint/
├── design/       # Brand grounding (brand.md) & visual screenshot audit
├── document/     # Modular technical documentation in docs/
├── intent/       # Human narrative, codebase reality & intent in docs/intent/
├── issue/        # Problem-first defect & gap tracking
├── proof/        # Author demonstration & defense ritual in conversation
├── report/       # Standalone console HTML reports in docs/report/
├── research/     # Outward-facing technical research on dependencies
└── rfc/          # Engineering Requests for Comments in docs/rfc/
```

---

## License

MIT
