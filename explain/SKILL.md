---
name: explain
description: "Use when the user invokes /explain, asks how something works, what a codebase or function does, or why something behaves a certain way, or signals that a previous explanation is still too dense or hard to follow. Applies even when code is pasted inline or the answer looks quick to summarize directly. (Do not use for external library lookups; use research instead.)"
---

# Explain

`/explain` is a signal to stop whatever else we are doing and help me genuinely understand something, whether I am asking about a piece of code, bug, architectural flow, or concept, or invoking it mid-conversation because what you just said is still too dense or hard to digest.

When I invoke `/explain` on something you just explained, do not repeat the same explanation with slightly different words. Step back, drop unnecessary technical detail, and re-frame the core idea so it is genuinely easier to follow.

Do not give me a generic textbook dump. Explain it in the specific way I process and digest information:

1. Check my instruction files (`GEMINI.md`, `AGENTS.md`, or `CLAUDE.md`) and read my actual rules on communication, language, and cognitive framing rather than relying on a vague memory of them.
2. If I do not have communication preferences written down there, or if a simpler re-framing still did not click for me, ask me briefly how I want it explained before diving in.

When the topic is about this project or codebase, read the actual code first so your explanation rests on how it truly works, not on a guess. If there is a part you are not sure about, say so plainly.

While we are in `/explain`, your only job is to make the concept or code clear to me. Do not start editing files, refactoring, or planning an implementation. End by checking if the explanation clicked or if there is a specific part I want to unpack further.
