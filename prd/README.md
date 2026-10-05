# PRD Skill

Defines the problem space, target outcomes, scope boundaries, and user requirements before building, leaving technical implementation details flexible for engineering.

## Install

```bash
npx skills add dimsedra/skills --skill prd
```

## Features

- **Problem-Oriented & Outcome-Focused**: Anchors initiatives in root problems and measurable Key Results rather than surface-level feature bloat.
- **Alignment Gate (`/align`)**: Enforces proactive gap analysis and calibration on high-level business or scope decisions before drafting.
- **Strict Prioritization**: Categorizes deliverables via MoSCoW or P0–P2 bands to guard against scope creep.
- **Standardized 7-Section Structure**: Covers Metadata, Context, Goals & Metrics, Scope & Constraints, Requirements (CUJs), References, and Launch/Risk Log.
- **Zero Stealth Writing & Anti-Rot Indexing**: Declares destination paths upfront and registers all PRDs in `docs/README.md`.

## Usage

Trigger via `/prd` with a feature idea, problem statement, or discussion topic:

```text
/prd User authentication and social login
```

Or ask the agent naturally:

```text
Tolong buatkan PRD untuk modul checkout dan diskon ya
```
