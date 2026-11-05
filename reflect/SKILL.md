---
name: reflect
description: "Use when the user invokes /reflect to look back at the current session together, surface high-signal observations about how they think, communicate, and collaborate, and distill those traits into the personal section of their AGENTS.md, CLAUDE.md, or GEMINI.md so future agents click with them immediately."
---

# Reflect

Our skills work best when `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` captures not just engineering rules (which `/setup` handles), but **who I am, how I think, and how to talk and work with me**. Writing that personal guide from scratch on a blank page is hard. `/reflect` turns our real working session into a mirror so we can build or sharpen that personal guide from actual moments we just lived through together.

## Step 1: Read Existing Personal Instructions First

Before reflecting on the session, check my existing `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` (at both the project and global level if present) and read the personal sections outside the `/setup` managed block. This tells you what is already captured so you do not repeat what is already written, and helps you notice new traits or sharper boundaries that showed up in this session.

## Step 2: Look Back at the Session Together

Walk back through our conversation from start to finish. Do not hand me a clinical personality profile or generic flattery. Talk to me like a colleague looking back at the session we just had together:

1. **Recall specific moments from our thread:** Point to real interactions we had (moments where an idea or explanation immediately clicked, places where I pushed back or redirected you, habits in how I framed problems, or small corrections I made along the way).
2. **Share what you noticed about me:** From those moments, tell me what stood out across the dimensions that matter most when working together:
   - **How I think and process problems:** Do I look for systemic mental models first, concrete code examples, cause-and-effect mechanics, or visual flows? How do I weigh trade-offs?
   - **How I like to communicate:** What tone, cadence, language, or formatting feels natural to me? What annoys me (such as over-formatting, analogies, fluff, or specific punctuation)?
   - **How I like to collaborate:** When do I want you to pause, show a draft in chat first, or push back on my ideas? What builds or breaks my trust?
3. **Filter for the "fresh thread" test:** Only surface observations where you can confidently say: *"If a brand-new agent with zero context read this tomorrow, it would immediately click with you on turn one."* Leave out one-off details that only applied to today's task.

Stop after sharing your reflection and ask me:
- Which of these observations ring true, and is there anything you want to adjust or drop?
- Which instruction file(s) (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, project or global) should we update?

## Step 3: Draft and Update the Personal Section

Once I confirm which points to keep and which file(s) to target:

1. If my file has almost no personal content yet, organize the traits into a clean, first-person guide (such as `## Who I Am` and `## How to Talk to Me`). If I already have a personal guide, weave the new traits or refinements into my existing sections without duplicating rules.
2. Show me the exact draft in chat first and wait for my approval before editing the file.
3. Write the approved changes into the target file(s), keeping the `/setup` managed block (`<!-- BEGIN dimsedra/skills setup ... -->` to `<!-- END dimsedra/skills setup -->`) and any project-specific runbooks completely untouched.
