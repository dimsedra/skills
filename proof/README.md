# Proof Skill

The author demonstration ritual: presenting completed work directly in conversation through tangible evidence, contract verification, directives self-defense, and radical transparency on any gaps.

## Install

```bash
npx skills add dimsedra/skills --skill proof
```

## Features

- **Conversational, Not a Document**: Delivers proof directly through spoken dialogue, live commands, and real terminal output in the conversation.
- **Contract-by-Contract Evidence**: Proves every `BP-[MODULE]-[INDEX]` contract with test outputs, inputs, and returned results through public boundaries.
- **Engineering Directives Self-Defense**: The agent defends its own code (max 2 indentation levels, no boolean flags, boundary parsing, AHA) before the human has to review it.
- **Observable Live Demonstration**: Runs the real software against sample data and displays unmocked output in chat.
- **Dual Responsibility (Inward & Outward)**: Challenges its own beliefs and re-verifies as many times as needed, treating muddy explanations as a warning sign that the code or mental model has a hidden gap.
- **Radical Transparency on Gaps**: Prizes honesty above all else by explicitly highlighting unimplemented contracts, known limitations, and edge-case boundaries.

## Usage

Trigger via `/proof` after completing an implementation:

```text
/proof
```
