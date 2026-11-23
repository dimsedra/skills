---
name: reflect
description: "Use when the user invokes /reflect or asks to wrap up a session, review what worked or did not work, or save personal or project-specific lessons ('remember this for next time') into global or project-level AGENTS.md, CLAUDE.md, or GEMINI.md."
---

# Reflect

In future threads, the agent working with me is still you, not a different person. Do not talk about "a future agent" or "the next agent" as if it were someone else. The catch is that every new thread wipes your memory of our past conversations, so you will not know what we learned today unless we record it permanently in `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.

`/reflect` is how we sit down at the end of a session, look back at the full arc of what we just went through together, and capture what you need to carry forward into future threads. Some of those lessons are about how we work together across every project, and some are about how to work smoothly inside this specific codebase.

## 1. Ground Yourself Before Speaking

Do two things before you say a word.

First, look for the full local session log or transcript that your harness saves on disk and read it from the start. Long sessions get compacted, and compaction silently drops early corrections, friction, and turning points from your working context. Reading the full local log keeps your reflection faithful to the entire thread instead of just whatever survived at the end. If your harness does not keep a local session log or you cannot access it, use your current context and tell me plainly that earlier compacted parts were not visible to you.

Second, read my existing `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` at both the global and project level if present, focusing on everything outside the `/setup` managed block. This shows you both how I already expect you to talk to me and what is already written down, so you do not repeat old notes or format your reflection in a way I dislike.

## 2. Walk Through Our Session First, Then Share Your Takeaways

Do not turn this into a rigid report, and do not copy headings from this skill file into your response. Talk to me naturally in two steps.

First, walk through our session from start to finish like two people looking back at the time we just spent together. Trace the actual story of our thread in chronological order: what we set out to do, the turns the conversation took, the moments where we hit a great rhythm and things clicked right away, and the moments where you misread me, overcomplicated something, or got in my way and I had to steer you back.

Second, pull out the few high-signal takeaways worth remembering for next time, separated cleanly by where they belong. Only include a side if this session actually surfaced something real for it; do not force both.

For global takeaways (about us across all projects), focus on what you learned about how I think, frame problems, make decisions, and like to communicate, along with what you want to keep doing or do differently so a fresh thread on any future task clicks right away without me correcting the same things twice.

For project-level takeaways (about working in this repo), focus strictly on recurring operational patterns and gotchas that will save us from hitting the same wall next time: unwritten repo conventions, technical traps we ran into, local workflows or commands that matter here, or collaboration habits specific to this codebase. Keep project-level notes lean and operational. Architecture documentation, feature specs, and long design decisions belong in `docs/`, not in `AGENTS.md`, and do not invent generic software engineering slogans.

Pause there and ask me:
- Which of these takeaways feel right to you, and what should we adjust or drop?
- Which instruction file(s) (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, global and/or project-level) should we update?

## 3. Draft in Chat, Then Update Cleanly

Once I confirm which takeaways to keep and which file(s) to target:

1. Show me the exact proposed additions or refinements in chat, clearly grouped by target file, and wait for my approval before touching anything.
2. For global personal notes, write in my first-person voice so they fit naturally into my instruction file (creating clean sections like `## Who I Am` and `## How to Talk to Me` if my file is bare, or weaving them into my existing personal sections without duplicating what is already there).
3. For project-level notes, write concise, direct operational guidance that fits cleanly into the project instruction file without duplicating existing rules or overlapping with `docs/`.
4. Once I approve the draft, write the changes into the target file(s), keeping the `/setup` managed block (`<!-- BEGIN dimsedra/skills setup ... -->` to `<!-- END dimsedra/skills setup -->`) and any unrelated notes completely intact.
