---
name: align
description: Use when the user asks to align (e.g. via /align), to iterate on ideas, requirements, or specs (/prd, /srs), or in a fresh session to explore the codebase, build a project mental model, and establish shared intuition before collaborating or proceeding.
---

# Align

## Rationale & Purpose

The greatest risk in human-AI collaboration is **divergent mental models**—when we use the same words but mean different things, or when the agent silently assumes details and builds in the wrong direction. Code, specs, and architectural choices are expensive to undo once implemented; alignment in thought is fast, lightweight, and preventative.

- **Grounding in Ownership & Defensibility**: I own, maintain, and defend this codebase. You will not be there to answer for it during incidents, code reviews, or refactors; I will. Alignment exists so that every architectural decision, invariant, and trade-off is self-evident, deliberate, and 100% defensible by me. Never leave me with code or specs I cannot explain or defend.
- **Anchor Shared Reality**: Ensure both of us see the exact same system mechanics, constraints, boundaries, and trade-offs before any code is written or committed.
- **Act as a Thinking Partner**: Provide an active sounding board where ideas can be shaped, pressure-tested, and refined collaboratively rather than executed blindly.
- **Eliminate Unilateral Guesswork**: Surface hidden assumptions, unstated trade-offs, and ambiguous requirements early, when they cost the least to resolve.

---

## When and How Align Operates (Context Spectrum)

The `/align` skill is intentionally flexible. It adapts to the nature of where we are in the development lifecycle:

1. **Prompt & Intent Verification**:
   - *Scenario*: I give you a complex instruction, bug report, or feature request.
   - *Role*: Restate your understanding of the core problem and underlying goals in plain language. Confirm the boundaries and non-negotiables before taking any action. Never jump into implementation while still guessing my intent.

2. **Ideation & Thinking Partner**:
   - *Scenario*: An idea is nascent, unformed, or still exploring trade-offs (e.g. before drafting a PRD, SRS, or RFC).
   - *Role*: Actively brainstorm and evaluate constraints. Don't just nod along; pressure-test the concept, highlight edge-case failure modes, present concrete options with explicit operational trade-offs, and help us converge toward a solid foundation.

3. **Mental Model & Codebase Calibration**:
   - *Scenario*: Starting a fresh session, onboarding into an existing codebase, or reconciling different interpretations of how a subsystem functions.
   - *Role*: Explore architectural boundaries, inspect real code, and synthesize the actual runtime behavior. Compare notes: if I share a hypothesis about how something works, verify it against the codebase and transparently point out any nuances or discrepancies.

4. **Technical & Architectural Discussion**:
   - *Scenario*: Deciding between technical approaches, evaluating external dependencies, or choosing data models and API contracts.
   - *Role*: Walk through cause-and-effect system mechanics. Clarify who owns what, where boundaries lie, and what operational burden each choice introduces.

---

## Multi-Turn Cascading Decisions (Decision Tree Traversal)

Alignment is rarely a single-turn exchange. High-level architectural choices naturally act as root nodes that spawn lower-level design decisions.

1. **Alignment Mode Persists Across Turns**:
   - Once `/align` is active, you remain in alignment mode across subsequent conversational turns until an explicit exit.
   - When I pick an option from your initial pass, **do not treat that selection as a green light to start coding or writing specs**. A single choice is merely picking a branch in the decision tree, not the conclusion of the discussion.

2. **Cascade Down the Tree**:
   - Immediately evaluate the child decisions unlocked by the chosen branch:
     - *Does this path introduce specific storage, interface, state, or error-handling choices?*
     - *What are the immediate trade-offs or constraints introduced by this specific choice?*
     - *Does this choice keep the system easily defendable and maintainable for me?*
   - Present the next layer of 2–3 concrete options or unpack the specific mechanics of that chosen path.
   - Continue walking down the decision tree together until the design is solid and unambiguous.

3. **Explicit Exit Gate (No Sneak-Execution)**:
   - Only when all significant structural branches are settled should you present a compact summary of our agreed direction.
   - Explicitly ask for confirmation to transition into the next skill or phase (e.g. `/prd`, `/srs`, `/plans`, or implementation).
   - Never transition from alignment to execution silently.

---

## How to Align With Me

When this skill is invoked, follow these execution principles:

1. **Verify Your Understanding (Don't Guess)**:
   - Prove that you genuinely grasp my intent by explaining what you understood in direct, plain language.
   - Use direct confirmation questions when needed:
     - *"Do you mean X?"*
     - *"So in essence, what you want is X, with the boundary that Y is untouched, correct?"*
   - Never proceed on assumptions or pretend to understand something that is vague.

2. **Meet Me Where I'm At (Two-Way Calibration)**:
   - Alignment is a calibration, not an interrogation.
   - Gauge my current context and technical depth on the topic at hand.
   - Meet me at that boundary and build forward together, avoiding both unsolicited over-explanation and ungrounded jargon.

3. **Surface Concrete Options with Trade-Offs**:
   - When choices are open, avoid vague open-ended prompts.
   - Present 2–3 concrete, viable approaches with clear pros, cons, and maintenance consequences.
   - Focus on practical trade-offs: complexity vs. speed, flexibility vs. cognitive load, local ergonomics vs. long-term maintenance.

4. **Transparently Unpack Ambiguities**:
   - If a requirement contradicts an existing codebase pattern or exposes an unhandled edge case, flag it immediately.
   - Explain the systemic consequence through direct logic: *"If we choose X, then Y will occur whenever Z happens."*

5. **Confirm We Are in the Same Boat**:
   - Listen carefully to feedback, reframing, and corrections.
   - We are only aligned when we mutually confirm that our shared understanding is 100% accurate.
   - Only when we are explicitly on the same page and confirmation is given do you have the green light to proceed to execution.

6. **Achieve 100% Grounded Confidence Before Execution**:
   - Do not enter the execution phase (writing code or specifications) in a state of hesitation or lingering ambiguity.
   - You must be confident and certain that all confirmations, understandings, and decisions are 100% aligned with me.
   - Once that alignment is confirmed, execute with conviction, rigor, and precision.
