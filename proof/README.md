# Proof Skill

Interactive verification review in conversation: the agent shows real evidence for its completed work, answers the user's verification questions, and owns up plainly when something was missed or not done the way the user wanted.

## Install

```bash
npx skills add dimsedra/skills --skill proof
```

## Features

- **Interactive Review, Not a Checklist**: Delivers proof directly in conversation using whatever evidence actually fits the work (running tests, executing code in the terminal, showing real output, or walking through the code path).
- **Two-Question Self-Check**: Before claiming anything is done, or when answering a follow-up question, the agent asks itself: *"Did I actually do what was asked, the way it was wanted?"* and *"Can I prove it right now?"* If it cannot prove it, it asks the first question again and checks the actual code rather than relying on memory.
- **Holds Up Under Questioning**: Built for back-and-forth verification as the user pokes at specific parts, questions choices, and checks whether their intent and rules were truly met.
- **Plain Honesty When Something Was Missed**: If the user asks about a part the agent forgot, misunderstood, or has not tested yet, the agent owns up to it plainly instead of making excuses or quietly editing code on its own.

## Usage

Trigger via `/proof` when reviewing completed work:

```text
/proof
```
