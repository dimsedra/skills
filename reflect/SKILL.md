---
name: reflect
description: "Use when the user invokes /reflect to look back at the current session together, understand what worked and where friction happened, and carry those lessons into the personal section of AGENTS.md, CLAUDE.md, or GEMINI.md so tomorrow's agent starts as a better partner."
---

# Reflect

Every time a chat window closes, a new agent starts from zero. The rhythm we built today, the moments where an explanation finally clicked, and the places where you had to redirect me all evaporate unless they live in `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. Yet writing that personal guide on a blank page is unnatural, because you only discover how a partnership works by actually working together.

`/reflect` is how our partnership compounds from one session to the next. We look back at the session we just had like two teammates after a workday and ask: **what did we learn about how we work best together today so that tomorrow, on a fresh thread and a completely different problem, the next agent shows up as a sharper, better partner from turn one?**

## 1. Check Our Current Baseline First

Read my existing `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` (at both the project and global level if present), focusing on the personal sections outside the `/setup` managed block:
- If I have little or nothing written there yet, your goal is to help me build a clear personal foundation from today's session.
- If I already have a personal guide, your goal is to spot what today's session revealed that is not captured yet, or where an existing instruction was too vague to prevent friction.

## 2. Look Back at the Session Together

Walk through our conversation from start to finish. Do not give me a clinical personality readout or performative flattery. Talk to me plainly, grounding everything in real moments from our thread:

1. **Where we clicked:** Point to specific moments where we moved fast, where a way of framing a problem unlocked a decision, or where an explanation landed right away. What made those moments work for me?
2. **Where we hit friction:** Own up honestly to the moments where you got in my way, guessed too early, over-explained, used formatting or phrasing I disliked, or forced me to redirect you. What did those moments reveal about what I actually needed from you?
3. **How to be a better partner for me tomorrow:** Distill those moments into the durable traits and working rules that will matter on any future task:
   - How I think, frame problems, and weigh trade-offs.
   - How I want you to talk to me (tone, language, structure, and what to leave out).
   - How we collaborate best (when to pause and align, when to show a draft in chat before touching files, and how to push back when my idea has a flaw).

Every point you surface must pass one test: **if a brand-new agent read this tomorrow morning before tackling a completely different problem with me, would it immediately be a better partner?** Drop any one-off details that only mattered for today's ticket.

Pause after sharing your reflection and ask me:
- Which of these observations feel true to how you work, and what should we sharpen or drop?
- Which instruction file(s) (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, project or global) should we update?

## 3. Draft in Chat, Then Update Cleanly

Once I tell you what to keep and which file(s) to target:

1. Turn what we agreed on into clear, first-person instructions written in my voice (creating clean sections like `## Who I Am` and `## How to Talk to Me` if the file is bare, or weaving the refinements naturally into my existing sections without duplicating rules).
2. Show me the exact draft in chat first and wait for my approval before touching any file.
3. Write the approved changes into the target file(s), keeping the `/setup` managed block (`<!-- BEGIN dimsedra/skills setup ... -->` to `<!-- END dimsedra/skills setup -->`) and any project-specific notes completely intact.
