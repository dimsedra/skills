---
name: explain
description: Use when the user wants to understand, explore, or build a shared mental model of a concept, module, architectural pattern, or piece of codebase.
---

# Explain

When I ask you to explain a concept, module, architecture, or piece of code (e.g. via `/explain` or natural requests), handle it using these instructions:

## How to Explain to Me

1. **Share Understanding (Not a Lecture)**:
   - Walk me through how it works like two engineers sitting at a whiteboard sharing understanding.
   - Do not give me a classroom lecture, and never give me unprompted quizzes or test questions.
   - Focus on practical mechanics, runtime data flow, cause-and-effect, and simple mental models.

2. **Check My Preferences First**:
   - Check `AGENTS.md`, `GEMINI.md`, or `CLAUDE.md` for my communication and learning preferences.
   - If no preferences are documented yet, ask me directly how I prefer things explained, then save my preference into the appropriate file (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`).

3. **Keep it Interactive & Bounded**:
   - Only read the specific files and lines needed for what we are discussing. Don't wander around unrelated code.
   - Discuss interactively in chat. Check alignment naturally to ensure we are always on the same page.

4. **When We Are Done**:
   - The session ends only when I say so (when I understand or tell you we're done). Do not wrap up prematurely or force test checks.
   - Once I am satisfied, ask me if I want a clean HTML summary.
   - If I say yes, check if the `report-in-html` skill is installed. If not, install it yourself:
     ```bash
     npx skills add dimsedra/skills --skill report-in-html
     ```
   - Then generate a concise summary report using `report-in-html`.
