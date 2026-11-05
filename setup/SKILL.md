---
name: setup
description: "MANDATORY prerequisite that must never be skipped. Invoke whenever the user runs /setup, or automatically before running any other skill (/align, /intent, /blueprint, /method, /implement, /ship, /proof, /audit, /document, /learn, /explain, /report, /adr, /rfc, /review, /issue) if the user's AGENTS.md, CLAUDE.md, or GEMINI.md is missing the 'Engineering Rules & Directives' section."
---

# Setup

Our skills (`/blueprint`, `/method`, `/implement`, `/ship`, `/proof`, `/audit`, `/report`, `/document`, `/intent`, `/adr`, `/rfc`, and `/learn`) rely on a shared set of engineering rules, UI verification rules, `docs/` tracking rules, and subagent boundaries living in your instruction file (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`). Your job in `/setup` is to inject or update that exact shared block in the file(s) the user chooses without touching any of their existing personal or project instructions.

## Step 1: Ask Scope and Target File(s)

Before creating or editing any file, ask me two questions and wait for my answer:

1. **Scope:** Do you want to install these rules at the **project level** (inside the current repository root) or at the **global level** (in your user config folder, such as `~/.gemini/GEMINI.md`, `~/.claude/CLAUDE.md`, or `~/.config/opencode/AGENTS.md`)?
2. **Target file(s):** Which instruction file(s) do you want to set up (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or multiple)?

Never guess or modify files before I confirm both choices.

## Step 2: Run the Script

The shared block lives in `RULES.md`, and `scripts/inject-rules.mjs` writes it into the target file. Both sit in this skill's own directory, so resolve their paths from where this skill is installed rather than guessing. The script exists so every agent makes the exact same edit: never write, edit, or paraphrase the block text yourself.

Once I confirm the scope and target file(s):

1. Resolve the absolute path of each target file (expand `~` yourself). If the target's folder does not exist yet, tell me and create it only after I confirm.
2. Run the script once per target file:

   ```bash
   node <setup skill directory>/scripts/inject-rules.mjs <absolute path to target file>
   ```

3. The script wraps the block between a `BEGIN` and an `END` marker comment. It creates the file if it is missing, appends the block if the file has no markers, replaces only what sits between the markers if they exist, and changes nothing if the block is already up to date. Everything outside the markers stays untouched.
4. If the script exits with an error about the markers, show me the error and stop. Do not fix the markers yourself unless I ask you to.
5. Read the file afterwards. If it still contains `## Engineering Rules & Directives` outside the markers, it is an old unmarked copy from an earlier `/setup`. Tell me, and remove those old sections only after I confirm.

## Step 3: Fallback When the Script Cannot Run

If the script cannot run (for example Node is not installed, or you are not allowed to run commands), do not install anything and do not work around the restriction. Instead, tell me which file you plan to change and that you will make the edit by hand, then wait for my confirmation.

Once I confirm, make the same edit the script would: read `RULES.md` and copy its content verbatim between these exact markers, replacing the content between existing markers or appending the block if there are none:

```markdown
<!-- BEGIN dimsedra/skills setup: managed block, edits inside are overwritten by /setup -->
(content of RULES.md)
<!-- END dimsedra/skills setup -->
```

Using the same markers means a later run of the script finds and updates this block instead of adding a second copy.

Once the target file(s) are updated, tell me the exact file path(s) you modified so I can verify them.
