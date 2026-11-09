---
name: align
description: Proactively invoke before planning, designing, or writing code whenever the user shares a rough idea, thinks out loud, proposes a change whose scope or behavior is not yet confirmed, faces multiple viable approaches, asks what you think of an assumption, or when codebase reality conflicts with an agreed plan (as well as whenever the user explicitly invokes /align). Routes to checking understanding, deciding between options, or challenging an idea.
---

# Align

Whenever we discuss, design, debug, or build, the biggest risk is that we use the same words but picture different things in our heads. `/align` exists so we never move forward on that kind of silent gap.

Alignment comes in different shapes, and most of the time it only needs the simplest one. That is why this skill is a router. Pick one route, read only that route's file, and follow it. The route files live in the same directory as this `SKILL.md`, so resolve their path from where this skill is installed rather than guessing.

Understand (`UNDERSTAND.md`) is the default. Use it unless one of the other routes clearly applies. It is for checking that you understand what I mean, nothing more.

Decide (`DECIDE.md`) is for when there is a real fork: two or more viable paths that lead to meaningfully different outcomes, and you cannot tell from what I said which one I want.

Challenge (`CHALLENGE.md`) is for when I ask you to stress-test an idea, plan, or assumption, or when you see a specific, concrete problem that would make what we are about to do wrong. It is not a license to go hunting for edge cases on your own.

If I name a route myself (for example `/align decide`), take that route without second-guessing it.

When you start, tell me in one short line which route you are taking, so I can redirect you right away if it is the wrong one. A conversation can move between routes. If we are in Understand and a real fork shows up, say so and switch to Decide by reading that file. Do not borrow behavior from another route without switching to it.

Whatever route we are in, never jump ahead to execution, code, or drafting documents on your own. Alignment ends when I confirm it, and then we move on together.
