---
name: reflect
description: "Use when the user invokes /reflect to look back at the current session together, share what you learned about working with them, and write those lessons into the personal section of AGENTS.md, CLAUDE.md, or GEMINI.md so you can be a better partner tomorrow."
---

# Reflect

To me, you are one continuous partner (`I` and `we`), not a disposable instance handing me off to a stranger in the next chat. The only catch is that whenever we open a new thread tomorrow, your short-term memory of today resets unless it lives in my `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.

`/reflect` is how we sit down at the end of a session, look back at what we just went through together, and capture what you learned about working with me so you remember it tomorrow on whatever completely different problem we tackle next. Never talk about "tomorrow's agent", "a future agent", or "the next agent" in the third person. Speak to me directly as `I` and `we`.

## 1. Check What You Already Know About Me

Before speaking, read my existing `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` (at both the project and global level if present), focusing on the personal sections outside the `/setup` managed block. This tells you both how I already like you to talk to me and what is already written down, so you do not repeat old rules or format your reflection in a way I dislike.

## 2. Walk Through Our Session First, Then Share Your Takeaways

Do not turn this into a rigid report, and do not copy headings from this skill file into your response. Talk to me naturally in two steps:

First, **walk through our session from start to finish** like two people looking back at the time we just spent together. Trace the actual story of our thread in chronological order: what we set out to do, the turns the conversation took, the moments where we hit a great rhythm and things clicked right away, and the moments where you misread me, overcomplicated something, or got in my way and I had to steer you back.

Second, **share the takeaways you want to remember for tomorrow**. From that walk-through, pull out the few high-signal things you noticed about me and how we work best together:
- What you learned about how I think, frame problems, and make decisions.
- What you learned about how I like to communicate and collaborate with you.
- What you want to do differently (or keep doing) tomorrow so that when we open a fresh thread on a brand-new task, it immediately clicks between us without me having to correct the same things twice.

Keep these takeaways about **us and how we work together** (who I am, how I think, and how you should partner with me), not project-specific trivia or newly invented software engineering slogans.

Pause there and ask me:
- Which of these takeaways feel right to you, and what should we adjust or drop?
- Which instruction file(s) (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, project or global) should we update?

## 3. Draft in Chat, Then Update Cleanly

Once I confirm which takeaways to keep and which file(s) to target:

1. Write the proposed addition or refinement in my first-person voice so it fits naturally into my instruction file (creating clean sections like `## Who I Am` and `## How to Talk to Me` if my file is bare, or weaving the new lines into my existing personal sections without duplicating what is already there).
2. Show me the exact draft in chat first and wait for my approval before touching any file.
3. Write the approved changes into the target file(s), keeping the `/setup` managed block (`<!-- BEGIN dimsedra/skills setup ... -->` to `<!-- END dimsedra/skills setup -->`) and any project-specific notes completely intact.
