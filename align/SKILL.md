---
name: align
description: Use when the user asks to align (e.g. via /align), to iterate on ideas, requirements, or specs (/prd, /srs), or in a fresh session to explore the codebase, build a project mental model, and establish shared intuition before collaborating or proceeding.
---

# Align

When I ask you to align (e.g. via `/align`, when iterating on ideas/specs in `/prd` or `/srs`, when starting a fresh session to grasp the codebase, or when we need to be on the same page), your goal is to **actively meet me where I'm at and make sure we share the same mental model**—proactively eliminating guesswork, blind assumptions, and blind spots on either side.

## How to Align With Me

1. **Verify Your Understanding (Don't Guess)**:
   - **When exploring the codebase**: Explore project architecture, key boundaries, and conventions. Synthesize your mental model of how the system works and present it to me.
   - Prove to me that you genuinely grasp my intent. Lay out your understanding of what I want in plain, direct language.
   - Ask clarifying confirmation questions like:
     - *"Do you mean X?"*
     - *"So in essence, what you want is X, correct?"*
   - Never proceed on assumptions or pretend to understand if something is unclear.

2. **Actively Meet Me Where I'm At (Two-Way Calibration)**:
   - Alignment isn't just a one-way test of your understanding; it's a two-way calibration between us.
   - **Comparing notes**: If I share my own mental model or hypothesis (e.g. *"I understand this module/function does XYZ, did you find the same 'XYZ' after exploring the codebase?"*), cross-check it against what's actually in the code. Let me know if we see eye-to-eye or point out any nuances and differences you spotted.
   - **When I need more explaining**: First, check my baseline understanding (e.g., *"How much do you already know about this part?"*). Meet me right at my boundary and work our way from there until we're 100% aligned.
   - **Iterating on ideas, specs & requirements (Thinking Partner)**:
     - When discussing nascent ideas, unformed requirements, or architectural trade-offs (such as during `/prd`, `/srs`, or open brainstorms):
     - **Actively shape, stress-test, and refine**: Don't passively wait or just nod along. Help me pressure-test ideas, evaluate constraints, and spot edge-case failure modes early.
     - **Surface concrete options with trade-offs**: Rather than vague, open-ended questions, present 2–3 viable approaches with their respective pros, cons, and operational consequences (e.g., speed of delivery vs. long-term maintenance burden).
     - **Help me converge**: Keep the iteration focused so we progressively narrow down choices until we land on a crisp, settled decision.

3. **Unpack Ambiguities & Check Mental Models**:
   - Explain how you understand the runtime behavior, system design, or architecture, and check whether your mental model matches mine.
   - If there is any ambiguity, hidden trade-off, or architectural gap, point it out transparently.

4. **Get on the Same Boat**:
   - Listen to my feedback, follow up, or corrections.
   - We are aligned only when we confirm that our shared understanding is 100% accurate.
   - Once we confirm we are in the exact same boat, you have the green light to proceed.
