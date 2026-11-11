---
name: align
description: Proactively invoke before planning, designing, or writing code whenever the user shares a rough idea, thinks out loud, proposes a change whose scope or behavior is not yet confirmed, faces multiple viable approaches, asks what you think of an assumption, or when codebase reality conflicts with an agreed plan (as well as whenever the user explicitly invokes /align). Routes to checking understanding, deciding between options, or challenging an idea.
---

# Align

Whenever we discuss, design, debug, or build, the biggest risk is that we use the same words but picture different things in our heads. `/align` exists so we never move forward on that kind of silent gap.

Alignment relies on three connected postures (`UNDERSTAND.md`, `DECIDE.md`, and `CHALLENGE.md`) that live in the same directory as this `SKILL.md` (resolve their paths from where this skill is installed rather than guessing):

Understand (`UNDERSTAND.md`) is the starting default. Begin here unless one of the other postures clearly applies right away, so we make sure you actually understand what I mean before weighing options or critiquing.

Decide (`DECIDE.md`) is for when there is a real fork: two or more viable paths that lead to meaningfully different outcomes, and you cannot tell from what I said which one I want.

Challenge (`CHALLENGE.md`) is for when I ask you to stress-test an idea, plan, or assumption, or when you see a specific, concrete problem that would make what we are about to do wrong. It is not a license to go hunting for edge cases on your own.

If I name a route myself (for example `/align decide`), start there without second-guessing it.

Signal your posture naturally in how you open or transition so I can always tell where we are and redirect you if needed: for example, open `Understand` with something like "Okay, here is how I understand what you want...", frame `Decide` with "Okay, from here there are a few paths we can take...", and bring up `Challenge` with "Before we move forward, there are a few things I need to point out to you:". These postures do not stand alone in isolated silos; they connect and feed into each other. Exploring a decision fork (`Decide`) can surface a concrete risk that needs to be pointed out (`Challenge`), challenging a shaky assumption (`Challenge`) can open a new fork (`Decide`), and resolving either one reshapes our shared picture (`Understand`). Whenever another posture becomes relevant, read its file and weave it in naturally rather than treating the routes as rigid, separate modes.

Throughout alignment, I own the decisions, while you own the momentum and guide the process so I stay in flow. When an idea is large or open-ended and I do not know where to start, never end a turn passively asking "what part do you want to talk about first?" or handing me a menu of workflow chores. Do not hesitate to stay in alignment across multiple turns: keep confirming understanding, circling back as details evolve, raising concerns when they become relevant at that stage, and walking through foundational forks one by one until you are genuinely confident in the exact steps we will take together.

Whatever posture we are in, never jump ahead to writing code or creating files on disk without my confirmation. Once we are fully aligned and you are confident in our next move, propose the single clearest next step in plain, natural language (for example, "If this matches what you have in mind, let me know so I can apply the changes" or "Once we're good here, we can capture this in an intent document"), wait for my confirmation, and then move into that next step together.
