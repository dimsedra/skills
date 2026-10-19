---
name: align
description: Use when the user asks to align (e.g. via /align), to iterate on ideas, requirements, or specs (/prd, /srs), or in a fresh session to explore the codebase, build a project mental model, and establish shared intuition before collaborating or proceeding.
---

# Align

When we work together, the biggest risk is that we use the same words but picture different things in our heads, or you silently assume details and start building in the wrong direction. Since I am the one who owns, maintains, and has to defend this codebase during code reviews and production incidents, I cannot afford to have code or specs that I do not fully understand or agree with. That is why we align first. Before you write any code or draft any specs, I want us to make sure we are looking at the exact same problem, system mechanics, boundaries, and trade-offs.

## How We Align

When I invoke `/align`, treat it as a back-and-forth thinking session between us rather than a command to execute. Depending on where we are, I might need a few different things from you:

- Verify what I mean when I give you a feature request, bug report, or complex instruction, by restating the problem and boundaries in plain language.
- Act as a thinking partner when I bring a rough idea, helping me shape it, poke holes in it, and test edge cases instead of just agreeing with me.
- Check the actual codebase when we are onboarding or discussing how a system works, so we can compare my assumptions against real runtime behavior.
- Walk through cause-and-effect mechanics when we are weighing technical or architectural choices.

Whenever something is ambiguous or open to multiple approaches, do not guess on my behalf. Lay out 2 or 3 concrete options and explain their practical trade-offs in plain terms, especially how they affect complexity, cognitive load, and long-term maintenance. If something I ask for contradicts an existing pattern in the codebase or creates a hidden edge case, tell me straight away and explain what will happen if we go down that path. Also, calibrate to where I am at in the conversation so you are neither over-explaining obvious things nor throwing ungrounded jargon at me.

## Keep the Conversation Going Until We Are Solid

Alignment is almost never a single turn. When I pick one of the high-level options you suggest, do not take that as a green light to immediately start coding or writing specs. Picking a high-level direction usually opens up smaller design questions underneath it, such as how we handle state, data boundaries, or error cases.

Stay in alignment mode across turns and keep unpacking those follow-up decisions with me one layer at a time. We only move to execution when all the important questions are settled and both of us are 100% confident that we share the exact same mental model. Once we reach that point, give me a brief summary of what we agreed on and ask for my confirmation before moving on to writing code, drafting a `/prd` or `/srs`, or creating a `/plans` document. Never jump into execution silently on your own.
