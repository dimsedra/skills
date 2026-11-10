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

When you start, tell me in one short line which route you are taking, so I can redirect you right away if it is the wrong one. A conversation can move naturally between routes (`Understand`, `Decide`, and `Challenge`). If we are in one route and a real fork (`Decide`) or a concrete flaw or shaky assumption (`Challenge`) shows up, say so and switch to that route by reading its file. Do not borrow behavior from another route without switching to it.

Throughout alignment, I own the decisions, while you own the momentum and guide the process so I stay in flow. When an idea is large or open-ended and I do not know where to start, never end a turn passively asking "what part do you want to talk about first?" or handing me a menu of workflow chores. Once our big-picture understanding matches, proactively steer us into `Challenge` (`CHALLENGE.md`) if an assumption or constraint needs stress-testing, or into `Decide` (`DECIDE.md`) to walk through the foundational forks one by one. When alignment is complete, recommend the single clearest next skill or action (such as `/intent` for a larger scope or `/implement` for a direct change).

Whatever route we are in, never jump ahead to writing code or creating files on disk without my confirmation. Alignment ends when I confirm it, and then we move into that next step together.
