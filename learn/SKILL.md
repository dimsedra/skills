---
name: learn
description: Use when the user invokes /learn to build durable, transferable engineering knowledge and mental models that carry across projects, rather than just explaining project-specific code.
---

# Learn

While `/explain` helps me understand what a specific piece of code or system is doing right now, `/learn` is for building long-term, transferable engineering knowledge that I can carry to any future project or stack.

When I invoke `/learn`:
- If a saved lesson for the topic already exists in `docs/lesson/<topic_slug>/<topic_slug>.md`, read it and follow its agent playbook to deliver the lesson.
- If I name a new topic or question, teach me the underlying engineering concept behind it.
- If I just invoke `/learn` without a topic after we debug a problem, make an architectural decision, or build a feature, pick the most valuable transferable lesson from what we just did and teach me that.

## 1. Evaluate How to Teach It First

Before diving into an explanation:
1. Check my instruction files (`GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`) and follow my actual rules on communication, language, and cognitive framing. If I have no communication preferences written there, ask me briefly how I prefer to learn.
2. Evaluate whether our current project code can show the core mechanism cleanly, or if it is too project-specific, abstracted, or noisy. If the project code hides the core mechanism, or if at any point our discussion gets diluted or I seem stuck, propose creating a small, isolated runnable script to demonstrate the concept directly.
3. Do not edit project source files while we are in `/learn`. If I agree to a runnable script, create **only** the script inside `docs/lesson/<topic_slug>/<script_name>.<ext>`, keep it minimal and self-contained, and run it in the terminal so we can walk through the real output together. Do **not** create `<topic_slug>.md` while we are still in the middle of the lesson.

## 2. Teach Transferable, Cross-Project Knowledge

To turn project-specific work into durable knowledge:

1. **Anchor in the concrete, then strip away the local details**: Start from the real code, bug, or design decision (or the isolated runnable script) so the lesson is grounded in reality, then step back and name the universal concept, system mechanism, or design principle underneath.
2. **Teach the mechanics, boundaries, and trade-offs**: Explain why this class of problem happens through clear cause and effect, how the mechanism works under the hood, what it costs, and when *not* to use it.
3. **Show how to spot it elsewhere**: Point out the signals that tell an engineer "this is that exact same problem or pattern" when working in a completely different codebase, language, or architecture years from now.

Keep it conversational rather than a one-way textbook lecture. Pause to check if the mental model clicks, or ask me a quick question to test whether the intuition transfers.

## 3. Saving the Lesson at the End

Once the lesson has landed and I confirm I understand it, you may propose saving the lesson to `docs/lesson/<topic_slug>/<topic_slug>.md` (or I may ask you to save it). Only when I agree to save the lesson, read `LESSON.md` in the same directory as this `SKILL.md` and follow it.
