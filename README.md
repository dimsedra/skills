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

Alignment comes in different shapes, and most of the time it only needs the simplest one. Doing everything at once (playing back, critiquing, listing options, reading code) makes a quick check heavier than it needs to be. So `align` works as a router: one entry point that picks a single route and loads only that route's instructions:
* **Understand** (default): The agent plays back its understanding in plain terms: *"Here is how I currently understand what you want... does this match your picture?"* It corrects until it matches, and does nothing more.
* **Decide**: When there is a real fork, the agent lays out 2 or 3 realistic options with their practical trade-offs (complexity, maintenance cost, cognitive load) so we decide together.
* **Challenge**: When asked to stress-test an idea, or when the agent sees a concrete problem, it brings the few concerns that matter most, ordered by impact.

The agent states which route it is taking in one line so you can redirect it, and it can switch routes as the conversation changes shape. Every other skill in this repository is designed to fall back to `align`. The moment a specification is ambiguous, the moment a test plan reveals an unexpected edge case, or the moment an architectural trade-off emerges, the agent is instructed to stop and say: *"Let's align on this first."*

Beside `align` sit [`explain`](./explain/SKILL.md) and [`learn`](./learn/SKILL.md). While `align` makes sure the agent understands you, `explain` makes sure you genuinely understand the code, bug, or concept in front of you (reading your communication and cognitive framing rules from `GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`, or asking how you want it broken down). And when you want to go beyond project-specific code so your own engineering foundation keeps growing, `learn` extracts durable, cross-project mental models, walks you through heavily commented runnable example scripts line by line alongside their output, and saves reproducible lesson playbooks (`docs/lesson/<topic_slug>/`) at the end of the session based on how the actual conversation unfolded.

---

## How the System Works Around That Center

Once you have true alignment, how do you turn that shared mental model into working, defendable software without bureaucratic overhead or context drift?

That is where the surrounding skills come in:

### 1. Freezing Your Intent on Disk (`/intent`)
Conversations in chat evaporate. As a session grows longer, language models suffer from context drift and start forgetting subtle details discussed twenty turns ago.

Instead of writing a dry corporate requirements document with rigid sections, [`/intent`](./intent/SKILL.md) captures our alignment session into a lightweight, flexible record on disk (`docs/intent/`). It is stupidly simple:
* What you want to achieve (the goal or human experience).
* Why we are doing it (the rationale or current codebase friction).
* What we want vs what we explicitly do NOT want (boundaries and non-goals).
* Any key invariants or guiding rules of thumb you mentioned.

There are no rigid templates or mandatory pillars: it captures whatever was actually discussed so neither of us forgets or drifts. This is your domain: you define what you want and verify that it matches your vision.

### 2. The Agent's Technical Translation (`/blueprint`)
While `intent` belongs to you, [`/blueprint`](./blueprint/SKILL.md) belongs to the agent.

The agent reads the approved intent, inspects the codebase, applies the engineering rules from your global instructions where design decides them, and translates the intent into a technical blueprint (`docs/blueprint/`) that the implementing agent follows together with the intent:
* Contracts with unique identifiers (`BP-[MODULE]-[INDEX]`), each naming the part of the intent it serves.
* The intent's non-goals carried forward, so the implementing agent knows what not to build.
* Fit-for-purpose `Method` (`TDD`, `characterization`, `test-after`, `visual testing`, `design by contract`, `integration/e2e`) selected and executed via [`/method`](./method/SKILL.md), paired with the concrete `Verification` check that will be demonstrated in `/proof`.
* Planned atomic `Commit` sequences per contract (such as `test: ...`, `feat: ...`), so the agent commits incrementally as each step is finished instead of piling everything into one giant commit at the end.

If implementation later shows a contract does not hold, the agent stops, aligns with you, and updates the blueprint before continuing, so the document and the code never drift apart.

The agent presents the Blueprint to you in chat: how it understood your intent technically, the key design decisions and why, and which part of the intent each contract covers. You review and approve it in under 30 seconds.

### 3. Proving the Work & Holding Up Under Questioning (`/proof`)
Once implementation is complete, words are cheap. An agent saying "I am done" or handing you a list of modified files requires blind trust, which violates our primary rule: you must be able to 100% defend and own the code.

[`/proof`](./proof/SKILL.md) is where the agent shows its work and you verify whether it truly did what you asked, the way you wanted it. There is no rigid report template here. Instead, both when presenting work and whenever you ask a verification question, the agent must ask itself two questions:
1. *Did I actually do what was asked, the way it was wanted?*
2. *Can I prove it right now?*

If the agent cannot prove it, it must ask itself the first question again and check the actual code and runtime output rather than answering from memory or wishful thinking:
* **Fit-for-Purpose Evidence**: Proves the work using whatever actually fits: running tests, executing the code in the terminal, showing real output, or walking through the exact code path.
* **Interactive Verification**: As you poke at specific parts, question choices, and hold the work up against your intent and rules, the agent backs up its answers with real evidence.
* **Plain Honesty When Something Was Missed**: When you ask about a part the agent forgot, misunderstood, or has not tested yet, it does not get defensive, make excuses, or quietly edit files on its own. It owns up to it plainly (*"I missed that part"* or *"I haven't actually tested that yet"*) so both of you see the real state of the work.

### 4. Executing the Right Method & Verifying Real Pixels (`/method`)
A one-word method label in a Blueprint is not enough to keep implementation disciplined. [`/method`](./method/SKILL.md) acts as a router that directs the agent to the exact step-by-step workflow for each contract (`TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, or `visual testing`).

For front-end work (`visual testing`), we do not write brittle unit tests for CSS layout or styling. Instead, [`method/VISUAL_TESTING.md`](./method/VISUAL_TESTING.md) grounds the UI in a brand Single Source of Truth (`docs/design/brand.md`) to eliminate generic AI design tropes, then spawns an isolated visual auditor subagent to inspect actual Playwright screenshots across mobile (`360x640`) and desktop (`1280x800`) viewports before calling the work done.

### 5. Fresh-Eyed Audits Without Bias (`/audit`)
After you and an agent have been working together in a chat session for an hour, both of you carry context bias. You start overlooking small oversights.

[`/audit`](./audit/SKILL.md) solves this by spawning isolated subagents with clean context across three focused stages, either sequentially or selectively on demand:
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

### Thinking, Alignment & Understanding (The Center)
* **`align`**: The core heartbeat. A router that picks the simplest kind of alignment the moment needs (understand, decide, or challenge) so both parties are in the exact same boat before or during any technical work.
* **`explain`**: Explains code, bugs, architecture, or technical concepts in the specific way the user thinks and learns (reading `GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`, or asking first).
* **`learn`**: Builds durable, transferable engineering knowledge across projects through cause-and-effect mechanics, trade-offs, isolated runnable scripts, and reproducible lesson playbooks in `docs/lesson/`.
* **`research`**: Grounds technical investigations in actual dependencies and authoritative documentation rather than stale training data.

### Scope Boundaries & Architecture
* **`intent`**: Captures user goals, rationale, and explicit boundaries in a fluid, template-free record in `docs/intent/`.
* **`blueprint`**: Translates intent into technical contracts (`BP-[MODULE]-[INDEX]`), verification methods, and planned atomic commits in `docs/blueprint/`.
* **`adr`**: Captures immutable Architecture Decision Records with evaluated trade-offs in `docs/decisions/`.
* **`rfc`**: Proposes engineering initiatives and drives consensus across stakeholders in `docs/rfc/`.

### Verification & Demonstration
* **`method`**: Router that guides contract implementation and verification across `TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, and `visual testing` (including brand grounding in `docs/design/brand.md` and dual-viewport Playwright visual audits).
* **`proof`**: Interactive verification review in conversation where the agent proves its work with real evidence, answers your questions against your intent, and owns up plainly when something was missed.
* **`audit`**: Spawns independent subagents to review diffs against Intent, Blueprint, and engineering rules.
* **`review`**: Explains incoming pull requests and branch diffs directly in conversation through execution tracing, behavioral shifts, and risk assessment.

### Tracking & Documentation
* **`setup`**: Injects the shared engineering rules, UI verification rules, `docs/` conventions, and subagent boundaries into `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` at the project or global level without overwriting existing personal instructions.
* **`issue`**: Converts bugs and architectural gaps into problem-first tracking issues with stable symbol pointers.
* **`document`**: Maintains a clean, modular technical documentation tree cataloged in `docs/README.md`.
* **`report`**: Generates standalone console-themed HTML reports with Chart.js and Mermaid diagrams in `docs/report/`.

---

## Installation

You can install all skills in this repository into your project using `skills.sh`:

```bash
npx skills add dimsedra/skills
```

Then run `/setup` so your agent injects the shared engineering and `docs/` rules into your project or global `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.

Or install individual skills as you need them:

```bash
npx skills add dimsedra/skills --skill setup
npx skills add dimsedra/skills --skill align
npx skills add dimsedra/skills --skill explain
npx skills add dimsedra/skills --skill learn
npx skills add dimsedra/skills --skill intent
npx skills add dimsedra/skills --skill blueprint
npx skills add dimsedra/skills --skill method
npx skills add dimsedra/skills --skill proof
npx skills add dimsedra/skills --skill audit
npx skills add dimsedra/skills --skill review
```

---

## Structure

```text
skills/
├── adr/          # Architecture Decision Records in docs/decisions/
├── align/        # Alignment router: understand, decide, challenge (The Center)
├── audit/        # Isolated subagent diff auditing & scaling checks
├── blueprint/    # Technical architecture, contracts & planned commits in docs/blueprint/
├── document/     # Modular technical documentation in docs/
├── explain/      # User-tailored explanations of code, bugs & concepts
├── intent/       # Fluid user goals, rationale & boundaries in docs/intent/
├── issue/        # Problem-first defect & gap tracking
├── learn/        # Transferable cross-project lessons & runnable scripts in docs/lesson/
├── method/       # Implementation & verification router (TDD, characterization, visual testing, etc.)
├── proof/        # Interactive verification & honesty check in conversation
├── report/       # Standalone console HTML reports in docs/report/
├── research/     # Outward-facing technical research on dependencies
├── review/       # Conversational incoming PR & diff explanations
├── rfc/          # Engineering Requests for Comments in docs/rfc/
└── setup/        # Non-destructive installer for shared rules in AGENTS.md / CLAUDE.md / GEMINI.md
```

---

## License

MIT
