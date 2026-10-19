# How We Write Skills

A skill is not a corporate SOP, a textbook manual, or a rigid specification document. A skill is an extension of my prompt—an extension of me and how I naturally talk to you. When a skill is loaded into context, you end up mirroring its tone and structure. If a skill is written like a stiff, over-engineered template, you will respond to me in that same robotic way.

When we write or refine any `SKILL.md`, follow how I naturally prompt:

## Voice and Tone

Write from my first-person perspective ("I", "my", "we") talking directly to you ("you"). It should read like a real person giving clear, practical expectations across a desk, not an instruction manual shouting rules from above. Avoid academic or prompt-engineering buzzwords like "Context Spectrum", "Decision Tree Traversal", "Rigor Gate", "Zero Stealth Writing", or "Anti-Rot Indexing". Just say what needs to happen in plain, everyday English.

## Structure and Formatting

Keep formatting minimal and purposeful. I rarely use heavy formatting when I prompt—mostly just simple headings, numbers, and bullet lists (`-`).

When an explanation involves a thought process, workflow, rationale, or nuance, write it in natural, flowing paragraphs. Do not chop continuous thoughts into fragmented bullet points with bold labels in front of every line (`- **Bold Label**: long explanation...`), and do not nest sub-bullets like `- *Scenario*:` and `- *Role*:`.

Only use numbered lists or bullet points (`-`) when listing short, punchy items where a list genuinely makes it easier to scan. Never use horizontal rules (`---`), GitHub alert boxes (`> [!IMPORTANT]`), or Mermaid flowcharts inside a skill prompt just to explain how a workflow operates.

## Substance and Templates

Stripping away SOP formatting does not mean losing substance. Every core behavior, boundary, alignment check (`/align`), and quality expectation must remain intact—just expressed through clear prose and direct cause-and-effect logic.

When a skill produces a document in `docs/` (such as an ADR, PRD, SRS, RFC, or Plan), keep the YAML frontmatter block so metadata stays consistent across files, and keep the document template clean, human-readable, and free of rigid form-like checklists.
