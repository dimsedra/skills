# Agent Skills

[![skills.sh](https://skills.sh/b/dimsedra/skills)](https://skills.sh/dimsedra/skills)

A collection of modular, harness-agnostic skills for AI coding agents that **makes your agent a significantly better listener, a more versatile engineer, and a cleaner collaborator in your own codebase.**

---

## Why This Exists

If you have spent real time building software with AI coding agents, you have probably hit one of two walls.

The first is **assumed intent**. You give the agent a prompt. You think you were clear. The agent sounds confident, replies enthusiastically, and immediately starts editing files. Ten minutes later, you are staring at 400 lines of code across seven different files that you cannot fully trace, do not completely understand, and definitely cannot defend in a peer code review. The code might run, but you do not truly own it. And when it breaks in production at 2:00 AM, the agent will not be the one on call: you will.

The second is **process bloat**. To stop agents from guessing, many workflows turn AI development into a heavyweight administrative process or a police interrogation: forcing one-size-fits-all dogma onto every task, spinning up a committee of specialist personas for a simple change, or requiring Git worktree gymnastics and duplicate dependency builds just to stay safe. That drains your momentum.

Real engineering is collaborative and fluid. It adapts to your existing workflow rather than forcing you to adopt someone else's.

I built this collection of skills around a simpler conviction: **friction belongs in problem formulation, not in bureaucratic overhead.** It gives you shared understanding upfront, the right engineering technique for the task at hand, and empirical proof at the end, without leaving a mess in your repository.

---

## 1. A Significantly Better Listener

The biggest failure mode in AI engineering is almost never syntax or raw intelligence. We use the same words as the agent, but we picture completely different systems in our heads.

At the center of this system is [`align`](./align/SKILL.md). It is not just another slash command in a toolbox; it is the gravitational center of how you and the agent work together. Its only job is to **make sure both of you are in the exact same boat** before a single file is touched.

Alignment comes in different shapes, and most of the time it only needs the simplest one. Doing everything at once makes a quick check heavier than it needs to be, so `align` works as a lightweight router that picks one route and loads only that route's instructions:
* **Understand** (default): The agent plays back its understanding in plain terms (what you want and how it pictures it working) and corrects until it matches your mental model. Nothing more.
* **Decide**: When there is a real fork, the agent lays out 2 or 3 realistic options with their practical trade-offs (complexity, maintenance cost, cognitive load) so you decide together.
* **Challenge**: When asked to stress-test an idea, or when the agent sees a concrete problem that would make the plan wrong, it brings the few concerns that matter most, ordered by impact.

The agent tells you which route it is taking in one line so you can redirect it immediately, and every other skill in this repository is wired to fall back to `align` the moment a requirement is ambiguous or reality conflicts with a plan.

When an alignment conversation is worth keeping so context never drifts across a long session, [`intent`](./intent/SKILL.md) freezes your goals, rationale, and explicit non-goals into a template-free record on disk (`docs/intent/`).

And because listening goes both ways, [`reflect`](./reflect/SKILL.md), [`explain`](./explain/SKILL.md), [`learn`](./learn/SKILL.md), and [`research`](./research/SKILL.md) make sure the agent learns how you work and *you* never lose your grip on the system:
* **`reflect`** looks back at the moments of your current session together to surface how you think, communicate, and collaborate, distilling those durable traits into the personal section of your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` so any fresh agent clicks with you on turn one.
* **`explain`** breaks down code, bugs, or architecture in the exact way you think and learn (reading your communication preferences from `GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`, or asking first).
* **`learn`** goes beyond project-specific code to build durable, cross-project mental models through cause-and-effect mechanics, heavily commented runnable scripts, and reproducible lesson playbooks (`docs/lesson/`).
* **`research`** grounds technical investigations in your actual dependency versions and authoritative external documentation rather than stale training data.

---

## 2. A More Versatile Engineer

One-size-fits-all engineering rules fail on contact with real codebases. A strict rule that works for a brand-new domain module becomes a straitjacket when you are untangling untested legacy code, spiking an exploratory prototype, or polishing a UI layout.

Instead of forcing a single rigid dogma, these skills adapt to the work in front of you:

### Translating Intent into Contracts (`/blueprint`)
While `intent` belongs to you, [`blueprint`](./blueprint/SKILL.md) belongs to the agent. It reads your approved intent, inspects the codebase, and translates the goal into concrete technical contracts (`BP-[MODULE]-[INDEX]`), carrying your non-goals forward and pairing each contract with a fit-for-purpose implementation method, a verification check, and planned atomic commits. You can review and approve it in under 30 seconds.

### Pragmatism Over Dogma (`/method`)
[`method`](./method/SKILL.md) lets you or the blueprint pick the right construction technique for the job:
* **`TDD`**: Red-green-refactor against public APIs when building well-understood domain logic or fixing reproducible bugs.
* **`Characterization`**: Locking down existing behavior with golden-master or approval tests before touching messy, untested legacy code.
* **`Test-After`**: Exploring uncertain shapes or prototypes first, then locking in behavior tests once the design settles.
* **`Design by Contract`**: Enforcing explicit entry/exit invariants and boundary parsing (`Parse, Don't Validate`).
* **`Integration / E2E`**: Verifying real boundary wiring across databases, queues, and HTTP endpoints.
* **`Visual Testing`**: For front-end UI, we do not write brittle unit tests for CSS layout. [`method/VISUAL_TESTING.md`](./method/VISUAL_TESTING.md) grounds the UI in a brand Single Source of Truth (`docs/design/brand.md`) and dispatches an isolated visual auditor subagent to inspect real browser screenshots across mobile (`360x640`) and desktop (`1280x800`) viewports.

### Direct Execution or Full Autonomous Loop (`/implement`, `/ship` & `/audit`)
Once you have aligned or approved a Blueprint, you choose how much automation you want:
* **[`implement`](./implement/SKILL.md)**: Direct, step-by-step execution without the multi-subagent audit loop. It executes each contract or agreed change via `/method`, verifies it, and commits atomically while respecting the `/align` circuit breaker.
* **[`ship`](./ship/SKILL.md)**: When you want the full loop, `/ship` walks through the interactive gate (`/align` -> `/intent` -> `/blueprint`) until you approve the plan, and then takes the wheel. It executes each contract via `/method`, commits atomically, and runs [`audit`](./audit/SKILL.md), spawning isolated, fresh-eyed subagents across three sequential stages:
  1. **`Spec Auditor`** (`audit/SPEC-AUDITOR.md`): Cross-checks the diff against your Intent, Blueprint (`BP-XXX`), and ADRs to catch missing requirements or unapproved scope creep.
  2. **`Resilience Auditor`** (`audit/RESILIENCE-AUDITOR.md`): Hunts for unhandled edge cases, broken invariants, race conditions, security flaws, and scaling bottlenecks like N+1 queries.
  3. **`Quality Auditor`** (`audit/QUALITY-AUDITOR.md`): Holds both the code and the test suite to your engineering rules before returning an honest verdict: `BLOCKED`, `NEEDS POLISH`, or `CLEAN & MERGEABLE`.

If an auditor finds a code or test defect, `/ship` fixes it and re-audits automatically. But if the agent hits a real conflict between the codebase and the approved plan during `/implement` or `/ship`, a circuit breaker trips: it stops immediately and brings you back into `/align` rather than silently improvising around your design.

---

## 3. A Cleaner Collaborator in Your Own Codebase

You should not need Git worktree gymnastics, duplicate dependency builds, or temporary scratch files cluttering your repository just to collaborate with an agent. Everything happens cleanly in your live thread and your existing workspace.

### Empirical Verification & Plain Honesty (`/proof` & `/review`)
When implementation finishes, an agent saying *"I am done"* requires blind trust, which violates our core rule: you must be able to 100% defend and own every line of code in under 30 seconds.

In [`proof`](./proof/SKILL.md), there is no rigid report template. Both when presenting work and whenever you poke at specific choices, the agent must ask itself two questions:
1. *Did I actually do what was asked, the way it was wanted?*
2. *Can I prove it right now?*

It backs up its answers with real terminal output, passing tests, and exact code paths. And if you ask about a part the agent forgot, misunderstood, or has not tested yet, it does not get defensive, make excuses, or quietly edit files behind your back. It owns up plainly (*"I missed that part"* or *"I haven't actually tested that yet"*) so both of you see the real state of the work.

When you are looking at an incoming pull request or branch diff from a teammate, [`review`](./review/SKILL.md) brings that same clarity directly into conversation: tracing end-to-end execution flows, surfacing behavioral shifts, and separating real blocking risks from subjective style nits.

### Deterministic Guardrails & Clean Project Memory (`/setup`, `/document`, `/adr`, `/rfc`, `/issue`, `/report`)
* **`setup`** injects the shared engineering rules (AHA > DRY, deep modules, parse don't validate, behavior-driven public API testing, and bounded subagent exploration) into your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` via a deterministic Node.js script (`setup/scripts/inject-rules.mjs`) between `BEGIN`/`END` markers, preserving all of your personal instructions verbatim.
* **`document`**, **`adr`**, **`rfc`**, **`issue`**, and **`report`** maintain a clean, modular `docs/` tree indexed by `docs/README.md` (with full respect for whether you track `docs/` in git, ignore it, or keep it in a nested repository).

---

## What This Looks Like in Practice

You do not need to run a heavyweight process for a five-line fix, and you do not need to manually paste file paths into chat. Once `/setup` has added the shared rules to your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, the workflow scales up or down to match the task in front of you.

### 1. Everyday Changes & Exploration (Zero Ceremony)

For day-to-day bugs, refactors, or design questions, you just talk to the agent naturally and end with `/align`:

```text
Users are getting logged out when their browser tab sleeps in the background. I think we should refresh the session token on visibilitychange, what do you think?
/align
```

What happens next:
1. The agent does not rush to edit files. It picks the right alignment route (`Understand`, `Decide`, or `Challenge`), checks the relevant code if needed, and calibrates with you in plain language.
2. Once you confirm the approach, you run `/implement` (or invoke a specific `/method` like TDD or characterization), and verify the result together via `/proof`. No markdown specs required.

### 2. Full Features & Multi-Step Builds (`/ship` or `/implement`)

When you are building a larger feature where context drift and edge cases are real risks, you invoke `/ship` (or step through `/align` -> `/intent` -> `/blueprint` -> `/implement` at your own pace):

```text
We need to add role-based duty scheduling so team leads can assign shifts without double-booking someone across overlapping timezones.
/ship
```

What happens next is split into two distinct phases:
1. **The Interactive Gate (You + Agent)**: The agent aligns with you via `/align`, freezes your goals and non-goals into `docs/intent/` via `/intent`, and translates them into concrete contracts (`BP-[MODULE]-[INDEX]`), verification methods, and planned commits in `docs/blueprint/` via `/blueprint`. It pauses until you review and approve the Blueprint.
2. **The Autonomous Loop (Agent)**: Once you approve the Blueprint, the agent takes the wheel. It executes each contract using its assigned `/method`, commits atomically, and runs the 3-stage `/audit` loop (`Spec` -> `Resilience` -> `Quality`), fixing any code or test defects automatically. If a real codebase constraint conflicts with the Blueprint, the circuit breaker trips and brings you back into `/align`. When every contract and audit passes, it lands at `/proof` with real terminal and test evidence.

---

## The Skills at a Glance

### Listening, Alignment & Understanding
* **`align`**: The core heartbeat. A router that picks the simplest kind of alignment the moment needs (understand, decide, or challenge) so both parties are in the exact same boat before or during any technical work.
* **`reflect`**: Looks back at the current session together to surface how you think, communicate, and collaborate, and distills those confirmed traits into the personal section of your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.
* **`intent`**: Captures user goals, rationale, and explicit boundaries in a fluid, template-free record in `docs/intent/`.
* **`explain`**: Explains code, bugs, architecture, or technical concepts in the specific way the user thinks and learns (reading `GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`, or asking first).
* **`learn`**: Builds durable, transferable engineering knowledge across projects through cause-and-effect mechanics, trade-offs, isolated runnable scripts, and reproducible lesson playbooks in `docs/lesson/`.
* **`research`**: Grounds technical investigations in actual dependencies and authoritative documentation rather than stale training data.

### Versatile Engineering & Execution
* **`blueprint`**: Translates intent into technical contracts (`BP-[MODULE]-[INDEX]`), verification methods, and planned atomic commits in `docs/blueprint/`.
* **`method`**: Router that guides contract implementation and verification across `TDD`, `characterization`, `test-after`, `design by contract`, `integration/e2e`, and `visual testing` (including brand grounding in `docs/design/brand.md` and dual-viewport browser visual audits).
* **`implement`**: Executes an approved Blueprint or aligned change step by step via `/method`, verifying each step and committing atomically without running the full `/ship` audit loop.
* **`ship`**: End-to-end orchestrator that walks through the interactive gate (`/align` -> `/intent` -> `/blueprint`) and then runs an autonomous execution and self-healing loop (`/method` per contract -> `/audit` subagent loop) with an alignment circuit breaker until landing at `/proof`.
* **`audit`**: Spawns independent subagents across Spec, Resilience, and Quality stages to review diffs against Intent, Blueprint, and engineering rules.

### Clean Collaboration, Verification & Documentation
* **`proof`**: Interactive verification review in conversation where the agent proves its work with real evidence, answers your questions against your intent, and owns up plainly when something was missed.
* **`review`**: Explains incoming pull requests and branch diffs directly in conversation through execution tracing, behavioral shifts, and risk assessment.
* **`setup`**: Deterministically injects the shared engineering rules, UI verification rules, `docs/` conventions, and subagent boundaries into `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` at the project or global level without overwriting existing personal instructions.
* **`adr`**: Captures Architecture Decision Records with evaluated trade-offs in `docs/decisions/`.
* **`rfc`**: Proposes engineering initiatives and drives consensus across stakeholders in `docs/rfc/`.
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
npx skills add dimsedra/skills --skill reflect
npx skills add dimsedra/skills --skill explain
npx skills add dimsedra/skills --skill learn
npx skills add dimsedra/skills --skill intent
npx skills add dimsedra/skills --skill blueprint
npx skills add dimsedra/skills --skill method
npx skills add dimsedra/skills --skill implement
npx skills add dimsedra/skills --skill ship
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
├── implement/    # Direct contract or change execution via /method without the /ship audit loop
├── intent/       # Fluid user goals, rationale & boundaries in docs/intent/
├── issue/        # Problem-first defect & gap tracking
├── learn/        # Transferable cross-project lessons & runnable scripts in docs/lesson/
├── method/       # Implementation & verification router (TDD, characterization, visual testing, etc.)
├── proof/        # Interactive verification & honesty check in conversation
├── reflect/      # Session reflection to build/sharpen personal instructions in AGENTS.md / CLAUDE.md / GEMINI.md
├── report/       # Standalone console HTML reports in docs/report/
├── research/     # Outward-facing technical research on dependencies
├── review/       # Conversational incoming PR & diff explanations
├── rfc/          # Engineering Requests for Comments in docs/rfc/
├── setup/        # Deterministic installer for shared rules in AGENTS.md / CLAUDE.md / GEMINI.md
└── ship/         # End-to-end orchestrator & autonomous execution/audit loop
```

---

## License

MIT
