# Learn: Saving & Reproducing Lessons (`docs/lesson/`)

Use this file when we create a runnable example script during `/learn`, when I ask to save a lesson for the long term, or when re-delivering an existing lesson from `docs/lesson/<topic_slug>/`.

## Folder & File Placement

Each lesson lives in its own folder at `docs/lesson/<topic_slug>/` (in `snake_case`) so the explanation and its runnable code stay together:

- `docs/lesson/<topic_slug>/<topic_slug>.md`: The lesson document (both human guide and agent playbook).
- `docs/lesson/<topic_slug>/<script_name>.<ext>`: Self-contained runnable example script(s) that demonstrate the mechanism in isolation, free of project noise.

Always tell me the target path before creating or updating files in `docs/lesson/`. Once written, catalog the lesson in `docs/README.md`.

## Runnable Example Scripts

When I agree to a runnable script:
1. Write it directly inside `docs/lesson/<topic_slug>/` from the start.
2. Keep it minimal, self-contained, and runnable with a single command so I can execute it, see the cause and effect in the terminal, and tinker with it later.
3. Run it during our conversation and use its real output to walk me through the concept.

## Structure of `<topic_slug>.md`

Write `docs/lesson/<topic_slug>/<topic_slug>.md` in two distinct parts: one for me to read and review on my own, and one for any future agent in a new thread to reproduce the lesson accurately.

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

[Write this section in my preferred communication and cognitive style so I can read it cold months from now and immediately recall the mental model.]

### The Core Idea
What the universal concept or mechanism is, and what class of problem it solves across software engineering.

### How It Works (Cause and Effect)
The underlying system mechanics step by step, stripped of project-specific noise. If this lesson came from a real bug or feature in our repo, briefly note the concrete origin before focusing on the general principle.

### Trade-Offs & When Not to Use It
What this approach costs, where it breaks down, and when a simpler alternative is better.

### How to Spot It in Other Projects
The concrete symptoms or architectural signals that tell you this exact pattern or failure mode is happening in another stack or codebase.

### Walking Through the Example Script (if applicable)
How to run `docs/lesson/<topic_slug>/<script_name>.<ext>`, what it simulates, and what to look for in the output.

---

## Part 2: For the Agent (Reproducible Teaching Playbook)

[Write this section as direct instructions to a future agent in a new thread who is asked to teach or revisit this lesson with me.]

### Delivery Framing & Tone
- Which cognitive framing, mental model, or pacing made this concept click for me.
- Any specific misconceptions, confusing terms, or stuck points that came up during our session and how to clear them up immediately.

### Step-by-Step Teaching Flow
1. How to open the lesson and anchor the problem.
2. When and how to run the companion script(s) in `docs/lesson/<topic_slug>/` and what part of the output to highlight.
3. What experiment or small code tweak to invite me to try in the script (if applicable) to see the behavior change live.

### Verification Question
One or two sharp, practical questions the agent should ask me at the end (for example, applying the concept to a different scenario) to confirm the intuition truly transferred.
```
