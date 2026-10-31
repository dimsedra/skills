---
name: intent
description: Use when capturing user goals, intentions, rationale, and boundaries (what they want and what they do not want) from discussion into a clear, flexible record of intent on disk.
---

# Intent

When I ask you to write or refine an Intent document, your goal is stupidly simple: **write down what I want, why I want it, and what we should stay away from**, so neither of us forgets or drifts.

Conversations in chat evaporate over time. An Intent document is simply our written source of truth on disk (`docs/intent/`) so both of us stay anchored in the same goal.

## Keep It Simple and Fluid (No Rigid Templates)

Do not force the document into rigid corporate sections or artificial "pillars". There is no mandatory template here. Your job is to listen to what I said, inspect relevant code if needed to understand the context, and write it down naturally.

Depending on what we actually discussed, an Intent document simply captures whatever is relevant:
- **The Goal**: What am I trying to achieve, or what should the user experience feel like?
- **The Rationale**: Why are we doing this? What is frustrating, broken, or missing in the current system?
- **What We Want vs What We Do NOT Want**: What are the boundaries? What traps, rabbit holes, or out-of-scope ideas did we explicitly agree to avoid?
- **Key Invariants or Guiding Thoughts**: Any rules of thumb, mental models, or non-negotiables I mentioned (such as "narrative first, technical details optional").

Not everything has to be present in every document. If a feature only has a clear goal and a list of things not to do, just write that. Keep it concise, natural, and readable in under 30 seconds.

## Ground in What Was Actually Said

Never invent intentions, scope, or product rules on my behalf.
- If something is clear from our conversation, write it plainly.
- If you are unsure what I want or senses conflicting goals, do not guess—pause and calibrate with me in `/align` first.

## File Placement and Format

Always tell me the target file path before creating or updating an Intent document. Save files at `docs/intent/YYYYMMDD_<slug>.md` in snake_case.

Keep the structure lightweight and natural:

```markdown
---
title: "Intent: [Feature or Topic Name]"
type: intent
last_updated: YYYY-MM-DD
---

# Intent: [Feature or Topic Name]

[Write the goal, intention, rationale, and boundaries naturally in plain paragraphs or lightweight bullets based on our discussion. Adapt the structure to whatever best represents the intent without forcing rigid headings.]
```

Once you write or update the file, catalog it in `docs/README.md` and confirm with me in chat so I can verify: *"Yes, this is truly what I want."*
