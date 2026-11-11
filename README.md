# Agent Skills

[![skills.sh](https://skills.sh/b/dimsedra/skills)](https://skills.sh/b/dimsedra/skills)

Most AI coding setups force you into one of two positions. Either you treat the chat like a vending machine: you type a prompt, receive 400 lines of misunderstood code, and spend the next hour untangling something you cannot defend at 2:00 AM. Or you install a heavyweight framework that pulls you out of your flow and into someone else's rigid bureaucracy, where you spend your energy feeding their templates instead of thinking. If either of those sounds familiar, you already know the cost.

This collection is built on a different premise: **the discussion is the engineering.** You do not step into a rigid process or bend your habits to fit a template. Your working thoughts are the framework. Talking things through with the agent feels like the main event, and the barrier between thinking out loud and shipping clean, defendable code dissolves.

## What a Skill Actually Is

So here is the part most collections skip: what a skill actually is. A skill is not a plugin with special powers. It is plain text that gets loaded into the same input as your words. From the agent's side there is no separate configuration channel and no separate conversation channel: the skill text and your chat arrive as one stream, and the agent reads it all in one voice.

That fact is the load-bearing design decision. If skills are written like a corporate SOP, the agent starts performing compliance at you instead of talking with you, the same way a person stops being present the moment someone hands them a script for how to act in front of another person. So every skill here is written in my own first-person voice, as the standing half of a dialogue rather than a rulebook the agent executes. The agent never meets a stranger. `personal/WRITING.md` documents exactly how this voice is maintained.

The same mechanism sets the one structural split you will see in the sections below. Where the work is thinking together, the skills are written to keep the agent present as a conversation partner. Where the work is verification, the skills deliberately keep a procedural register, because proof should be mechanical and checkable, not improvised in conversation.

## A Partner That Actually Knows You (`align`, `reflect`, `explain`, `learn`, `research`)

Every prompt without a shared picture is a gamble on whether the agent understood what was in your head, and every new thread resets the relationship back to zero. These skills change the entire feel of that collaboration.

At the center is [`align`](./align/SKILL.md). You never have to write defensive 500-word prompts to keep the agent from rushing ahead, and you do not have to remember slash commands either. You throw out a rough, two-sentence thought as it forms, and the agent recognizes when the picture is not shared yet and meets you where you are: playing back its understanding in plain words until your mental models match (`UNDERSTAND.md`), laying out the real options and trade-offs when there is a fork (`DECIDE.md`), or stress-testing an assumption when you ask it to push back (`CHALLENGE.md`). Thinking out loud together becomes the primary way you design software.

Because every session teaches both of you how to work together better, [`reflect`](./reflect/SKILL.md) makes sure that chemistry compounds instead of disappearing when the chat window closes. At the end of a session, the agent walks back through the story of your conversation, recalls where you hit a rhythm and where it got in your way, and writes those confirmed takeaways into the personal section of your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. With each session, you have less and less friction, because tomorrow you pick up right where you left off.

And because true collaboration goes both ways, [`explain`](./explain/SKILL.md) and [`learn`](./learn/SKILL.md) make sure you never become a passive bystander in your own codebase. `explain` reads how your mind processes information from your instruction file and breaks down code, bugs, or architecture in the exact way that clicks for you. When you want to go deeper than today's ticket, `learn` extracts durable, cross-project mental models and saves reproducible lesson playbooks in `docs/lesson/`. Whenever a question depends on external libraries or fast-moving APIs, [`research`](./research/SKILL.md) grounds the conversation in your actual dependency versions and official documentation rather than stale training data.

## Turning Shared Understanding into Code (`method`, `intent`, `blueprint`, `implement`, `ship`, `audit`)

Once you and the agent see the exact same picture in conversation, building it is procedural by design, and that is a feature, not a betrayal of the premise. For everyday fixes and small changes, you just finish aligning and say `/implement` (or name a specific [`method`](./method/SKILL.md)). The agent takes what you just agreed on in chat, picks the engineering discipline that fits the task (`TDD` for clear domain logic, `characterization` tests to lock down legacy code before refactoring, `test-after` for exploratory work, `design by contract` for strict boundary parsing, `integration/e2e` for real I/O seams, or `visual testing` in a real browser against `docs/design/brand.md`), and builds it in small, verified increments.

When a feature is large enough that a long chat would lose the thread, [`intent`](./intent/SKILL.md) and [`blueprint`](./blueprint/SKILL.md) simply freeze your conversation onto disk so neither of you forgets. `intent` writes down what you want, why you want it, and what you explicitly want to avoid in `docs/intent/` with no rigid templates. `blueprint` translates that intent into concrete technical contracts, verification checks, and planned atomic commits in `docs/blueprint/` that you can review in 30 seconds.

From there, you choose how hands-on you want to be. [`implement`](./implement/SKILL.md) steps through the contracts directly with you via `/method`. Or if you want to hand the wheel over completely, [`ship`](./ship/SKILL.md) walks through the alignment gate with you upfront and then runs the entire build and [`audit`](./audit/SKILL.md) loop autonomously, spawning three fresh-eyed auditor subagents to catch and self-heal defects. In both paths, the moment real codebase constraints conflict with what you agreed on, a circuit breaker trips and the agent comes right back to you in `/align` instead of silently improvising around your thoughts.

## Owning Every Line in Conversation (`proof`, `review`, `setup`)

An agent saying *"I am done"* requires blind trust, and you cannot defend code you took on faith. So the verification skills deliberately keep a strict, procedural register here: the agent must prove, not assert.

In [`proof`](./proof/SKILL.md), you and the agent verify the work together in chat using real terminal output, test runs, and code paths. As you poke at specific choices, the agent answers with real evidence, and if you ask about something it missed or forgot to test, it owns up plainly (*"I missed that part"* or *"I haven't actually tested that yet"*) instead of making excuses or quietly editing files behind your back. [`review`](./review/SKILL.md) brings that same evidence-first clarity when you are looking at an incoming pull request or branch diff from a teammate.

Underneath it all, [`setup`](./setup/SKILL.md) deterministically injects the shared engineering baseline into your `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` via `setup/scripts/inject-rules.mjs` without touching the personal guide you build through `/reflect`. And whenever you want to record broader project knowledge on disk, [`document`](./document/SKILL.md), [`adr`](./adr/SKILL.md), [`rfc`](./rfc/SKILL.md), [`issue`](./issue/SKILL.md), and [`report`](./report/SKILL.md) keep your `docs/` tree clean and indexed in `docs/README.md`.

## Where the Real Differentiation Lives

Let me be honest about what is and is not special here. The engineering content in these skills is not secret. TDD, ADRs, RFCs, contract-first design, audit loops: that is industry-wide software development lifecycle knowledge, and anyone can assemble it. What differentiates this collection is the collaboration half. Knowledge about how a specific person wants to be worked with does not exist until a relationship exists, so it cannot be authored from theory, only accumulated from real sessions. The engineering skills are downstream of that stance: `implement` and `ship` route through `align`, the circuit breaker lands back in `align`, and `intent` and `blueprint` freeze what `align` produced. Copy only the engineering half and the dependency graph is broken at its root. Use the collection the way it is designed, and the collaboration half compounds with every session through `reflect`.

## Installation

Install all skills in this repository using `skills.sh`:

```bash
npx skills add dimsedra/skills
```

Then run `/setup` in your agent to add the shared engineering baseline to your project or global `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, and run `/reflect` after your sessions so the agent keeps learning how you think and work.

To install individual skills one by one, pass `--skill <name>` (for example `npx skills add dimsedra/skills --skill align`).

## License

MIT
