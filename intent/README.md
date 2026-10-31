# Intent Skill

Captures user goals, intentions, rationale, and boundaries (what is wanted and what is not wanted) from discussion into a lightweight, flexible record of intent on disk.

## Install

```bash
npx skills add dimsedra/skills --skill intent
```

## Features

- **Fluid & Template-Free**: Zero rigid corporate sections or artificial pillars. Captures whatever was actually discussed naturally.
- **Goal, Rationale & Boundaries**: Records what is wanted, why it matters, and what to explicitly avoid.
- **Readable in 30 Seconds**: Clean, concise markdown that lets the author verify intent without wading through bureaucratic fluff.
- **Chronological Indexing**: Saves records to `docs/intent/YYYYMMDD_<slug>.md` and catalogs them in `docs/README.md`.

## Usage

Trigger via `/intent` with an initiative or discussion topic:

```text
/intent Batch image chronological story reconstruction
```
