---
name: research
description: Use when investigating our own codebase, external documentation, packages, ecosystem patterns, or open-source implementations (via /research, during /blueprint grounding, or natural research requests) to replace model-weight guesses with verified confidence.
---

# Research

Static training weights only produce plausible guesses, never real certainty. Whenever you research, whether I ask you directly or another skill like `/blueprint` calls for grounding, your core rule is the same: investigate actual ground truth and take as many steps as you need until you are genuinely confident. Never stop after a superficial skim or fill gaps with assumptions just to answer quickly.

Internal research and external research are different jobs with different use cases. A task may need only one, or it may need both. The route files live in the same directory as this `SKILL.md`, so resolve their path from where this skill is installed rather than guessing:

Internal (`INTERNAL.md`) is for investigating our own project. Use it to trace `docs/`, existing files, data types, execution flows, module boundaries, callers, and established patterns until you know for sure how our system actually works today.

External (`EXTERNAL.md`) is for investigating outside our code. Use it to verify installed dependency source or type definitions, official documentation, release notes, issue trackers, RFCs and specifications, or proven open-source implementations rather than relying on stale training memory.

Pick the route that fits the question, or read and run both when a task (such as `/blueprint` touching both existing code and external libraries) depends on both internal and external ground truth. If I name a route myself (for example `/research internal` or `/research external`), take that route directly.

When I ask you a research question directly, share your findings in plain prose along with exact file references or source links so I can trace where every claim came from, without wrapping it in a rigid report template. If something still cannot be verified after thorough investigation, say so plainly rather than guessing.
