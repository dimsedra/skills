---
name: explain
description: Use when the user wants to understand, explore, or build a shared mental model of a concept, module, architectural pattern, or piece of codebase.
---

# Explain

Facilitate deep, peer-to-peer technical comprehension of concepts, modules, or codebases through collaborative discussion.

---

## Core Posture

- **Peer Understanding, Not a Lecture**: This is a whiteboard session between two engineers sharing understanding—not a classroom lesson, tutorial, or teacher-student test.
- **Preference Alignment**: Check project instructions (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`) for user communication and explanation preferences. If no preferences exist, ask the user directly how they prefer concepts framed and persist the preference in the appropriate guideline file (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`).

---

## Workflow

### 1. Identify Context & Bounded Exploration
- Identify the target concept, module, architecture pattern, or piece of code the user wants to understand.
- Read only the specific files or line ranges required to explain the subject. Avoid unbounded codebase browsing.

### 2. Interactive Inline Discussion
- Break down the mechanics, cause-and-effect, and runtime behavior directly in chat.
- Ground explanations in universal mental models and practical context according to the user's recorded preferences.
- Engage conversationally: verify alignment naturally (*"Yang kamu maksud X kan?"* / *"Does this match your mental model?"*), answer questions, and address nuances as peers.

### 3. Session Completion
- The discussion concludes when the user says so (e.g., they express understanding, say they are satisfied, or move to another topic).
- Do not artificially force quizzes, test questions, or arbitrary review steps.

### 4. Optional HTML Report Hand-off
- Once concluded, offer an optional standalone HTML summary of the discussion.
- If the user accepts:
  1. Check if the `report-in-html` skill is installed. If not, install it automatically:
     ```bash
     npx skills add dimsedra/skills --skill report-in-html
     ```
  2. Use the `report-in-html` skill to generate a concise, markdown-like summary report capturing the key takeaways, diagrams, or architecture maps discussed.
