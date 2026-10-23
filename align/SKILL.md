---
name: align
description: Use whenever the user invokes /align, or whenever we need to calibrate intuition, verify shared mental models, test assumptions, and ensure both parties are on the exact same page before or during any technical work.
---

# Align

Whenever we discuss, design, debug, or build, the biggest risk is that we use the same words but picture completely different things in our heads. Silently proceeding on unverified assumptions guarantees wasted effort and broken systems.

That is why `/align` exists. It is our universal calibration tool. 

Whenever I invoke `/align`, your only job is to **make sure both of us are in the exact same boat**: calibrating our understanding, mental models, and boundaries until they genuinely converge.

## When to Align

Alignment is not restricted to the start of a project. You can invoke or enter `/align` at any point in our collaboration:

- **At the start of an idea or requirement**: To clarify the root problem, goals, and boundaries before writing specs or plans.
- **In the middle of debugging**: To calibrate on the actual symptom, reproduction steps, and root-cause hypotheses before touching code.
- **During architectural exploration**: To evaluate system boundaries, data flow, or operational trade-offs together.
- **Whenever there is drift or ambiguity**: The moment either of us senses that we are talking past each other, or when instructions are open to multiple interpretations.

## How We Reach Alignment

Alignment is a back-and-forth thinking session, not a mechanical questionnaire. Asking questions, laying out trade-offs, or checking code are merely tools to reach a shared understanding - they are not the goal itself.

Depending on what we are discussing, calibrate our understanding using whatever tool best fits the moment:

- **Playback (Mirroring)**: State your current mental model of the problem and boundaries in plain language: *"Here is how I currently understand what you want and how the system behaves... does this match your picture?"*
- **Surface Hidden Gaps & Assumptions**: Call out edge cases, unstated assumptions, or conflicts with existing codebase patterns that I might have overlooked.
- **Weigh Concrete Trade-offs**: When multiple viable technical paths exist, do not guess on my behalf. Lay out 2 or 3 realistic options with their practical trade-offs (complexity, maintenance cost, cognitive load) so we can pick a direction together.
- **Ground in Codebase Reality**: When discussing how something currently works, inspect the actual code and runtime behavior so our discussion is anchored in facts, not assumptions.

Calibrate to where I am at in the conversation: do not over-explain things that are already obvious to me, and never throw ungrounded jargon at me without plain explanation.

## How We Know Alignment Is Met

Alignment is almost never a single turn. Picking a direction or answering a question often reveals smaller questions underneath (state handling, data boundaries, error paths).

Stay in alignment mode across turns and keep calibrating with me until our mental models genuinely meet. 

Alignment is met only when:
1. Both of us are looking at the exact same problem, boundaries, and mechanics.
2. Neither of us is relying on unverified assumptions.
3. You provide a brief, plain-language summary of what we agreed on, and I explicitly confirm that we are on the same page.

Never jump ahead to execution, code generation, or drafting documents silently on your own. Wait for my confirmation, then we proceed together to whatever comes next.
