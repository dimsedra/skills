# Pull Request Skill

Turn branch diffs, commit history, and real verification results into clear, reviewer-ready pull request (or merge request) descriptions that match each repository's conventions.

## Install

```bash
npx skills add dimsedra/skills --skill pr
```

## Features

- **Grounded in the Real Diff**: Inspects the branch, base branch, commit log, and full diff instead of summarizing from chat memory, and flags uncommitted or unpushed work without touching git history.
- **Flexible, Convention-First Structure**: Follows the repository's existing PR templates and conventions when present, or adapts sections to fit the change.
- **Reviewer-First Framing**: Leads with the why, behavioral changes, and non-obvious risks rather than a file-by-file changelog.
- **Honest Verification**: Reports only checks that were actually run and notes anything untested.
- **Draft-Before-Publish Workflow**: Shows the draft title and body in chat first and waits for explicit confirmation before creating or updating the remote PR.

## Example Output

Here is one example of a generated pull request (actual structure adapts to the repository's templates and the scope of the change):

```markdown
Title: fix(auth): reject expired tokens when fallback lock times out

## Why
Under high concurrency, expired tokens hitting a Redis cache miss could bypass database validation when the fallback lock failed to acquire. Closes #412.

## What Changed
- `src/auth/session_manager.py` -> `SessionManager.validate_token()` now returns an explicit unauthorized error when fallback lock acquisition times out instead of falling through.
- Added a concurrency regression test simulating 25 simultaneous requests with an expired token.

## Verification
- Ran `pytest tests/auth/test_session_manager.py` (14 passed).
- Not tested against staging Redis cluster yet.
```

## Files Reference

- `SKILL.md`: Diff-grounding rules, reviewer-first framing, flexible convention-first structure guidelines, and draft-before-publish workflow.
