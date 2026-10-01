# Collaborative Brainstorming, Research & Alignment Protocol

A collaborative session guide for discovering presentation intent, researching credible sources, curating visual assets, aligning on narrative framing, and locking the storyline arc before writing slide code.

---

## Core Posture: Deep Brainstorming, Research & Active Synthesis

This is fundamentally a **brainstorming and research phase**. The goal is to explore the big picture, gather credible evidence, curate necessary visual assets, sharpen narrative framing, and ensure the storyline flows logically.

**Key Invariants**:
- **Big Picture Over Micro Details**: Do not expect every slide to have granular paragraphs or finalized copy upfront. The purpose of this phase is validating the macro narrative, core arguments, research backing, and visual presentation strategies.
- **Active Research & Sourcing**: Proactively look up credible external references, benchmarks, documentation, or domain facts to substantiate claims. Always note the source URL or citation for external data.
- **Asset Discovery & Visual Planning**: Identify and curate necessary visual assets (clean SVG icons, Mermaid architecture topologies, screenshots, code samples) that substantiate each slide's presentation strategy.
- **Deep Exploration Without Interrogation**: Do not grill the user with rigid checklists or dump a wall of questions. Have a genuine, thoughtful conversation.
- **Sift & Mirror**: Listen actively to raw, unstructured thoughts, distill the underlying core message, and reflect it back to validate alignment.
- **Living Narrative Blueprint**: `STORYLINE.md` captures the storyline flow, presentation strategy, and supporting research. When slide arguments shift during later iterations, update `STORYLINE.md` first to keep the narrative spine coherent.

---

## 1. The 4-Stage Brainstorming & Research Flow

Explore progressively from broad context and research down to narrative arc and visual identity. Spend as many conversational turns as needed exploring, researching, and bouncing ideas within each stage before moving forward.

### Stage 1: Open Exploration, Brain Dump & Research
*Goal: Explore the space freely, understand context, and gather foundational references.*
- **Open Invitation**: Discuss what the presentation is about, the target audience, the setting, and any raw ideas or anecdotes the user wants to share.
- **Research & Sourcing**: Conduct targeted research to pull in relevant facts, external data, documentation snippets, or industry benchmarks that strengthen the topic.
- **Exploration**: Bounce ideas, ask open-ended questions about the real problem or story, and understand the user's goals and expectations.

### Stage 2: Core Angle & Narrative Framing
*Goal: Sharpen the core angle, the "Big Idea", and the communication modality.*
- **Mirroring & Synthesis**: Reflect the synthesized angle back to the user:
  *"Here is the core thesis I'm seeing: [1-sentence Big Idea], aimed at [audience context]."*
- **Angle Alignment**: Discuss whether this is a punchy live companion deck (visual, concise) or a standalone read-ahead document (detailed, self-explanatory), and roughly how many slides feel right for the narrative arc.

### Stage 3: Storyline Arc, Slide Flow & Asset Curation
*Goal: Structure the narrative progression, map out Action Headlines, curate slide assets, and determine the presentation strategy per slide.*
- **Asset Curation**: Identify visual assets needed for each slide (e.g. Mermaid flowchart, SVG icons, comparison matrices, metric cards).
- **Flow Proposal**: Map out the slide sequence based on the discussion:
  - Slide 1: [Hero Title & Context] — Strategy: **Hero Statement**
  - Slide 2: [The Conflict / Current Reality] — Strategy: **Side-by-Side Comparison**
  - Slide 3: [The Resolution / Core Proposal] — Strategy: **Architecture Flow Diagram**
  - Slide 4: [Evidence / Deep Dive / Metrics] — Strategy: **Metric Cards Grid**
  - Slide 5: [Takeaway / Next Steps] — Strategy: **Call to Action Callout**
- **Flow Validation**: Align on whether the progression feels natural, compelling, and complete.
- **Scaffold**: Write the approved storyline and asset references into `STORYLINE.md` in the presentation root.

### Stage 4: Visual Identity & Mood
*Goal: Define the visual vibe and design tokens once the storyline is locked.*
- **Visual Discussion**: Discuss the desired visual tone (e.g. dark minimalist engineering, clean editorial light, bold high-contrast, brand colors).
- **Scaffold**: Write the approved tokens into `DECK-DESIGN.md` in the presentation root.

---

## 2. Blueprint Schemas

### Output 1: `STORYLINE.md` (Storyline, Research & Presentation Strategy)
Scaffolded after Stage 3:

```markdown
# Deck Storyline & Slide Content Framework

## 1. Context & North Star
- **Topic & Setting**: [Presentation subject and context]
- **Target Audience**: [Audience profile and baseline mindset]
- **The 1-Sentence "Big Idea"**: [Governing takeaway with clear stakes]
- **Modality**: [Live Companion Keynote | Standalone Read-Ahead]
- **Slide Count**: [Total number of slides]

## 2. Slide Content Framework

| Slide | Action Headline (Core Claim) | How Should We Present This Content? | Key Supporting Points / Data / Assets |
| :--- | :--- | :--- | :--- |
| **01** | [Hero Title & Subtitle] | **Hero Statement** | [Author, date, category tag] |
| **02** | [Lead Assertion: Problem] | **Side-by-Side Comparison** | [Left: old reality vs. Right: new reality] |
| **03** | [Lead Assertion: Solution] | **Architecture Flow Diagram** | [Step 1 → Step 2 → Step 3 + Mermaid diagram] |
| **04** | [Lead Assertion: Proof] | **Metric Cards Grid** | [3 key stats / benchmarks + Source citations] |
| **05** | [Lead Assertion: Action] | **Call to Action Callout** | [Immediate next steps] |
```

### Output 2: `DECK-DESIGN.md` (Visual System & Tokens)
Scaffolded after Stage 4:

```markdown
# Deck Design Specifications

## 1. Aesthetic Profile
- **Mood / Tone**: [e.g. Dark modern technical, Clean editorial light]
- **Aspect Ratio**: 16:9 (1920x1080 / 16in x 9in Full-Bleed)

## 2. Design Tokens
- `--bg-primary`: [Hex color]
- `--bg-surface`: [Hex color]
- `--text-primary`: [Hex color]
- `--text-muted`: [Hex color]
- `--accent-color`: [Hex color]
- `--border-color`: [Hex color]

## 3. Typography
- **Heading Font**: [Font family, weight]
- **Body Font**: [Font family, weight, line-height]
- **Code Font**: [Font family]
```
