---
name: document
description: Use when documenting architecture, decisions, workflows, concepts, or technical specifications into a modular, traceable, and easily maintainable docs/ structure.
---

# Document

When I ask you to document architecture, workflows, domain concepts, or technical references, the goal is to keep our `docs/` folder clean, modular, and useful over time.

Write documentation for someone reading it cold months from now. Synthesize how the system actually works and the mental models behind it—never dump raw chat transcripts or summaries of our back-and-forth conversation. Keep each document focused on a single topic rather than mixing high-level architecture, step-by-step setup guides, and decision records into one giant file. If what I ask you to document spans multiple categories, point that out and suggest how we should split it before writing.

## Where Documents Live

Before creating a new file, check our existing `docs/` tree. If our project already has its own established folder layout, follow that convention, and if a file covering the topic already exists, update that file instead of creating a duplicate. Otherwise, organize files into these folders:

- `docs/architecture/`: How the system works, including component boundaries, data flow, state transitions, and how services talk to each other.
- `docs/guides/`: Practical how-to recipes, local setup, runbooks, migrations, and operational steps.
- `docs/concepts/`: Domain mental models, core entities, terminology, and business rules.
- `docs/reference/`: Formal contracts such as API endpoints, config schemas, CLI flags, and database models.
- Specialized documents have their own skills and folders: use `/prd` for `docs/prd/`, `/srs` for `docs/srs/`, `/plans` for `docs/plan/`, `/rfc` for `docs/rfc/`, and `/adr` for `docs/decisions/`.

## How to Draft and Maintain Docs

Always tell me which category and file path you plan to use before you create or edit a document. Anchor technical explanations to the actual codebase by listing relevant files in the YAML frontmatter and referencing stable symbol names (`path/to/file.ext` -> `ClassName.method()`) in the text rather than line numbers that will quickly go stale.

Use this frontmatter and basic structure so our documentation stays consistent:

```markdown
---
title: "[Descriptive Document Title]"
type: "[architecture | guide | concept | reference]"
status: active
related_code:
  - path/to/file.ts
last_updated: YYYY-MM-DD
---

# [Document Title]

## Overview
Explain the context and purpose of this document in plain language.

## [Core Content Sections]
Walk through the system mechanics, domain concepts, reference details, or step-by-step instructions using clear headings and natural prose.

## Related Documents & Code
Link to related files in `docs/` and key entry points in the codebase.
```

Whenever you create or update a document, make sure it is listed in `docs/README.md` with a relative link and a short one-line summary so no file becomes orphaned, then let me know in chat what you updated.
