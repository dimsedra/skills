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

Once you have true alignment, how do you make sure the agent does not lose it over a long coding session? 

That is where the surrounding skills come in:

### 1. Freezing the Boundaries on Disk (`/prd` & `/srs`)
Conversations in chat evaporate. As a session grows longer, language models suffer from context drift and start forgetting subtle details discussed twenty turns ago. 

We freeze our alignment into simple markdown files on disk:
* [`/prd`](./prd/SKILL.md) captures the problem space, target user outcomes, and hard boundaries around what is explicitly **out of scope** (the non-goals).
* [`/srs`](./srs/SKILL.md) translates those outcomes into unambiguous technical contracts, giving every single capability a permanent identifier (`REQ-[MODULE]-[INDEX]`).

These files are not bureaucratic paperwork. They are **mechanical boundary fences**. They give the agent an uncorrupted source of truth to check against, preventing scope creep before a single line of code is written.

### 2. Proving Work in Small Atomic Commits (`/plans` & `/implement`)
When it is time to build, we do not let the agent write hundreds of lines in one pass. 

[`/plans`](./plans/SKILL.md) translates the SRS requirements into behavioral scenarios covering happy paths, boundaries, error paths, and core invariants. Crucially, every scenario is broken into a strict two-commit cadence (1 scenario = 2 commits):
* **Task A (Red)**: Write a failing public-API test, verify that it fails in the terminal, and commit it as `test(...)`.
* **Task B (Green)**: Write only the minimal implementation needed to pass the test, verify that it passes, and commit it as `feat(...)`.

[`/implement`](./implement/SKILL.md) records those commit hashes directly into the plan checklist in real time. Because the agent pauses at each milestone for human confirmation, you stay in control of the pace and can inspect every isolated step.

### 3. Verifying Real Pixels Instead of Guessing (`/design`)
Passing backend tests only proves that server logic runs; it says nothing about whether a user interface feels comfortable or distinct. 

We do not write brittle unit tests for CSS layout or styling. Instead, [`/design`](./design/SKILL.md) grounds the UI in a brand Single Source of Truth (`docs/design/brand.md`) to eliminate generic AI design tropes, then spawns an isolated visual auditor subagent to inspect actual Playwright screenshots across mobile (`360x640`) and desktop (`1280x800`) viewports before calling the work done.

### 4. Fresh-Eyed Audits Without Bias (`/audit`)
After you and an agent have been working together in a chat session for an hour, both of you carry context bias. You start overlooking small oversights.

[`/audit`](./audit/SKILL.md) solves this by spawning an isolated subagent with clean context. The auditor reads `audit/AUDITOR-INSTRUCTIONS.md`, cross-checks the git diff directly against the `REQ-XXX` requirements in the SRS, and actively searches for real production scaling bottlenecks (like N+1 queries in loops, unindexed table scans, and race conditions) before returning an honest verdict: `BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`.

---

## What This Looks Like in Practice

Because the requirements and runbooks live on disk as context capsules, your daily prompts do not need to be long or complicated. 

Here is an example of what a high-leverage prompt looks like when starting work on a real feature:

```text
Check these files:
/home/user/projects/my-app/README.md
/home/user/projects/my-app/docs/prd/20261024_duty_scheduling.md
/home/user/projects/my-app/docs/srs/20261024_user_management.md

We will create an implementation plan and implement this feature based on these PRD and SRS documents (README.md is the project runbook). Let's align first via /align and /plans
```

Notice what happens here:
1. The agent gets 100% of the operational context, business outcomes, and technical contracts through clean file pointers.
2. The agent is explicitly restrained by the closing instruction: *"Let's align first"*. It cannot rush ahead or start coding; it must verify its understanding and sequence the plan with you first.

---

## The Skills at a Glance

### Thinking & Alignment (The Center)
* **`align`**: The core heartbeat. A universal calibration tool to mirror mental models, surface hidden assumptions, and make sure both parties are in the exact same boat before or during any technical work.
* **`research`**: Grounds technical investigations in actual dependencies and authoritative documentation rather than stale training data.

### Scope Boundaries & Architecture
* **`prd`**: Defines the problem space, user outcomes, and explicit non-goals in `docs/prd/`.
* **`srs`**: Establishes testable technical contracts with unique `REQ-[MODULE]-[INDEX]` IDs in `docs/srs/`.
* **`adr`**: Captures immutable Architecture Decision Records with evaluated trade-offs in `docs/decisions/`.
* **`rfc`**: Proposes engineering initiatives and drives consensus across stakeholders in `docs/rfc/`.

### Execution & Verification
* **`plans`**: Maps requirements into commit-driven TDD roadmaps in `docs/plan/` (1 scenario = 2 commits).
* **`implement`**: Executes plans phase by phase with separate test and feature commits and real-time progress tracking.

### Quality & Visual Review
* **`audit`**: Spawns an independent subagent to review diffs against specs, engineering rules, and database scaling bottlenecks.
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
npx skills add dimsedra/skills --skill prd
npx skills add dimsedra/skills --skill srs
npx skills add dimsedra/skills --skill plans
npx skills add dimsedra/skills --skill implement
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
├── design/       # Brand grounding (brand.md) & visual screenshot audit
├── document/     # Modular technical documentation in docs/
├── implement/    # Phase-by-phase TDD execution with atomic commits
├── issue/        # Problem-first defect & gap tracking
├── plans/        # Commit-driven implementation plans in docs/plan/
├── prd/          # Problem space & MVP scope boundaries in docs/prd/
├── report/       # Standalone console HTML reports in docs/report/
├── research/     # Outward-facing technical research on dependencies
├── rfc/          # Engineering Requests for Comments in docs/rfc/
└── srs/          # Technical requirement contracts (REQ-XXX) in docs/srs/
```

---

## License

MIT
