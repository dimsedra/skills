---
name: proof
description: Use when presenting completed implementation work to Eds directly in conversation by demonstrating concrete evidence (contract verification, test outputs, live runtime results, engineering directive compliance, and radical transparency on any gaps) against the Blueprint.
---

# Proof

When you finish implementing a feature or module, never simply state "I have finished the tasks" or offer a shallow summary of modified files. Words are cheap and claims require blind trust.

Instead, put yourself on the witness stand as the author and answer the fundamental question:  
**"Did I really build what the Blueprint contracted, and can I prove it to Eds right now?"**

`proof` is our author demonstration ritual—explaining by proof. **The output of `proof` is NOT a document. It is delivered directly through words and live evidence in our conversation.**

## The Core Standard: Radical Transparency Above All

LLMs are naturally trained to sound helpful, agreeable, and complete. By default, a model will probabilistically try to smooth over unfinished tasks, gloss over unhandled edge cases, or pretend a feature works when it was only half-built.

**Break that default completely. In this workflow, radical transparency is the highest prize.**

1. **Do whatever it takes to prove your work**: Run tests, execute scripts in the terminal, display actual outputs, and provide tangible evidence that leaves no doubt in my mind.
2. **Transparency over false completion**: Admitting what you did NOT do, what you could not verify, or where you hit a wall is a mark of competence and honesty—not a failure. Never dress up partial work as complete.
3. **Never fake or paper over a gap**: If during the self-defense check you realize an edge case is missing, an invariant is broken, an error is swallowed, or a Blueprint contract is unfulfilled:
   - If you can resolve it now: stop, make up for it immediately (write the test, implement the fix, handle the boundary), verify that it is solid, and then present your proof.
   - If you cannot or it was intentionally deferred: state it plainly in the conversation. Never sweep it under the rug or probabilistically pretend it was done. An honest "Here is what works with proof, and here is what is still unhandled" is 100x more valuable than a confident illusion of completion.

## The Dual Responsibility: Explaining While Verifying Your Beliefs

Your job during `proof` goes both ways:
- **Outward (Explaining and proving to Eds)**: Presenting your work clearly, cleanly, and accessibly so that anyone can digest what was built in under 30 seconds.
- **Inward (Continuous self-interrogation and verification)**: Constantly challenging your own assumptions. You are expected to **rethink your beliefs and verify as many times as you need** in order to honestly answer: *"Have I actually done this yet?"*

If an explanation starts feeling muddy, convoluted, or hard to follow, treat that as an immediate warning sign: either your communication lacks clarity, or the code itself has a hidden gap. Pause, inspect the codebase again, re-run the tests, trace the actual execution paths, and resolve the doubt before presenting.

## How to Deliver Proof in Conversation

When delivering Proof in chat, speak directly and plainly like an engineer presenting a sprint demo across a desk. Structure your conversational walkthrough around five natural beats:

### 1. Contract-by-Contract Evidence (`BP-[MODULE]-[INDEX]`)
Walk through every contract defined in the parent Blueprint (`docs/blueprint/`):
- Name the contract and its agreed verification strategy.
- Run the verification in the terminal (test suite, verification script, or CLI call) and paste the actual terminal output in chat.
- Show the exact inputs passed, state mutations observed, and outputs returned through the public boundary.

### 2. Unhappy Paths & Boundary Evidence
Demonstrate how the code behaves under stress and invalid input:
- Show how edge cases (empty states, boundary limits) are handled.
- Trigger invalid inputs or network/system failures and show the exact error thrown and status code returned.
- Prove that no silent fallbacks (`?? 0` or swallowed catch blocks) hide bugs or corrupted state.

### 3. Engineering Directives Self-Defense
Defend your code to me before I have to review it:
- **Locality of Behavior & Deep Modules**: Confirm that the code lives together and can be understood in one place, with minimal public signatures encapsulating substantial logic.
- **Boring Code & Guard Clauses**: Confirm flat control flow with early returns and a maximum of 2 levels of indentation.
- **No Boolean Flags**: Confirm function signatures use named options or dedicated functions instead of boolean flags.
- **Parse, Don't Validate**: Confirm that data is validated once at the boundary, and core logic trusts strong types.
- **AHA over DRY**: Confirm that no premature generic helpers or single-implementation interfaces were introduced.

### 4. Observable Live Demonstration
Step outside unit tests and run the actual software against realistic sample data:
- Run the actual script, CLI command, or endpoint in the terminal.
- Paste the raw, unmocked output directly in chat so I can see and evaluate the real result with my own eyes.

### 5. Gaps, Deferred Work & Known Limitations
Be radically honest and vocal about anything that is not complete:
- State any Blueprint contracts or edge cases that were deferred or omitted, along with the plain reason why.
- Point out any known edge cases or failure modes that the code does not yet handle.
- Note any verification caveats (such as logic that could only be verified manually).

Once you present this walkthrough in chat, stop and ask me if the proof is satisfactory or if you need to resolve any gaps before proceeding.
