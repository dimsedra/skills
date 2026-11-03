# Learn: Saving the Lesson (`docs/lesson/<topic_slug>/<topic_slug>.md`)

Read and follow this file **only at the end of a lesson** when I explicitly ask or agree to save it. Never create `<topic_slug>.md` upfront or at the same time as an example script, because the document must capture how our actual learning conversation unfolded.

## Ground Strictly in How Our Chat Went

Do not write `<topic_slug>.md` as a generic textbook article or an idealized lecture. Both parts of the file must reflect what actually happened in our conversation:
- Use the exact mental model, framing, and cause-and-effect path that made the concept click for me.
- Record the real questions I asked, the parts where I hesitated or got stuck, and the explanation or script output that cleared them up.
- If we wrote and tweaked a runnable script in `docs/lesson/<topic_slug>/`, anchor the walkthrough in what we actually ran and observed together.

## File Placement

Save the lesson at `docs/lesson/<topic_slug>/<topic_slug>.md` (in `snake_case`), alongside any runnable example script(s) we created in `docs/lesson/<topic_slug>/`.

Always tell me the target path before creating or updating the file, and catalog it in `docs/README.md` once written.

## Structure of `<topic_slug>.md`

Write `docs/lesson/<topic_slug>/<topic_slug>.md` in two distinct parts: one for me to read and review on my own, and one for any future agent in a new thread to reproduce the lesson the exact same way we experienced it.

```markdown
---
title: "Lesson: [Concept or Pattern Name]"
type: lesson
topic: <topic_slug>
scripts:
  - docs/lesson/<topic_slug>/<script_name>.<ext>
last_updated: YYYY-MM-DD
---

# Lesson: [Concept or Pattern Name]

## Part 1: For You (The Concept & Mental Model)

[Write this section in my preferred communication and cognitive style, reflecting the exact explanation and mental model from our chat so I can read it cold months from now and immediately recall how it works.]

### The Core Idea
What the universal concept or mechanism is, and what class of problem it solves across software engineering.

### How It Works (Cause and Effect)
The underlying system mechanics step by step, distilled from our conversation. If this lesson started from a real bug or feature in our repo, briefly note that origin before focusing on the general principle.

### Trade-Offs & When Not to Use It
What this approach costs, where it breaks down, and when a simpler alternative is better.

### How to Spot It in Other Projects
The concrete symptoms or architectural signals that tell you this exact pattern or failure mode is happening in another stack or codebase.

### Walking Through the Example Script (if applicable)
How to run `docs/lesson/<topic_slug>/<script_name>.<ext>`, what we used it to prove in our chat, and what to look for in the output.

---

## Part 2: For the Agent (Reproducible Teaching Playbook)

[Write this section as direct instructions to a future agent in a new thread who is asked to re-deliver this lesson to me the exact same way.]

### What Clicked & Stuck Points from Our Session
- The exact framing, pacing, and mental model that made this concept click for me.
- Specific questions I asked, misconceptions that surfaced, or places where I got stuck during our chat, and how the agent resolved them.

### Step-by-Step Teaching Flow
1. How we opened the lesson and anchored the problem.
2. How and when to run the companion script(s) in `docs/lesson/<topic_slug>/`, including the exact output or code tweak that demonstrated the point.
3. The sequence of steps to walk me through so the lesson unfolds the same way it did when it first clicked.

### Verification Question
The practical question or scenario to ask me at the end to confirm the intuition still holds.
```
