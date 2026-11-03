// Tests run the script exactly as an agent would (a child process with a file path),
// so they keep passing no matter how the script is implemented internally.
// Run with: node --test setup/scripts/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_PATH = fileURLToPath(new URL('./inject-rules.mjs', import.meta.url));
const RULES = readFileSync(fileURLToPath(new URL('../RULES.md', import.meta.url)), 'utf8').trimEnd();
const BEGIN = '<!-- BEGIN dimsedra/skills setup: managed block, edits inside are overwritten by /setup -->';
const END = '<!-- END dimsedra/skills setup -->';
const CURRENT_BLOCK = `${BEGIN}\n${RULES}\n${END}`;

function runScript(...args) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...args], { encoding: 'utf8' });
}

function makeTempDir() {
  return mkdtempSync(join(tmpdir(), 'inject-rules-'));
}

// Normal path

test('creates the instruction file with only the rules block when it does not exist yet', () => {
  const target = join(makeTempDir(), 'AGENTS.md');

  const result = runScript(target);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, 'utf8'), `${CURRENT_BLOCK}\n`);
  assert.match(result.stdout, /^Created: /);
});

test('appends the rules block below personal notes and keeps the notes untouched', () => {
  const target = join(makeTempDir(), 'CLAUDE.md');
  const personalNotes = '# How to Work With Me\n\nCall me Eds.\n';
  writeFileSync(target, personalNotes);

  const result = runScript(target);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, 'utf8'), `${personalNotes}\n${CURRENT_BLOCK}\n`);
  assert.match(result.stdout, /^Appended rules block to: /);
});

test('replaces an outdated rules block and keeps the sections before and after it', () => {
  const target = join(makeTempDir(), 'GEMINI.md');
  const before = '# How to Work With Me\n\n## Who I Am\n\nSystemic thinker.\n\n';
  const after = '\n\n## External Documentation (Context7)\n\nUse Context7 for library docs.\n';
  writeFileSync(target, `${before}${BEGIN}\n## Engineering Rules & Directives\n\nOld rules.\n${END}${after}`);

  const result = runScript(target);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, 'utf8'), `${before}${CURRENT_BLOCK}${after}`);
  assert.match(result.stdout, /^Updated rules block in: /);
});

test('resolves a relative target path against the current working directory', () => {
  const dir = makeTempDir();

  const result = spawnSync(process.execPath, [SCRIPT_PATH, 'AGENTS.md'], { cwd: dir, encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), `${CURRENT_BLOCK}\n`);
});

// Boundaries and edge cases

test('treats an existing empty file the same as a missing one', () => {
  const target = join(makeTempDir(), 'AGENTS.md');
  writeFileSync(target, '\n\n');

  const result = runScript(target);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, 'utf8'), `${CURRENT_BLOCK}\n`);
});

test('leaves an old unmarked copy of the rules alone and appends a marked block after it', () => {
  // Early installs have no markers. The script must not guess where they end;
  // the user deletes the old unmarked sections by hand once.
  const target = join(makeTempDir(), 'GEMINI.md');
  const unmarkedOldCopy = '## Engineering Rules & Directives\n\nOld unmarked rules.\n';
  writeFileSync(target, unmarkedOldCopy);

  const result = runScript(target);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(target, 'utf8'), `${unmarkedOldCopy}\n${CURRENT_BLOCK}\n`);
});

// Error paths

test('refuses a BEGIN marker without an END marker and leaves the file untouched', () => {
  const target = join(makeTempDir(), 'AGENTS.md');
  const broken = `# Notes\n\n${BEGIN}\nhalf a block\n`;
  writeFileSync(target, broken);

  const result = runScript(target);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Found 1 BEGIN and 0 END markers/);
  assert.equal(readFileSync(target, 'utf8'), broken);
});

test('refuses two rules blocks in one file and leaves the file untouched', () => {
  const target = join(makeTempDir(), 'AGENTS.md');
  const duplicated = `${BEGIN}\nA\n${END}\n\n${BEGIN}\nB\n${END}\n`;
  writeFileSync(target, duplicated);

  const result = runScript(target);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Found 2 BEGIN and 2 END markers/);
  assert.equal(readFileSync(target, 'utf8'), duplicated);
});

test('refuses an END marker that comes before the BEGIN marker', () => {
  const target = join(makeTempDir(), 'AGENTS.md');
  const reversed = `${END}\nstuff\n${BEGIN}\n`;
  writeFileSync(target, reversed);

  const result = runScript(target);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Expected exactly one of each, with BEGIN first/);
  assert.equal(readFileSync(target, 'utf8'), reversed);
});

test('fails when the target folder does not exist instead of creating folders on a guessed path', () => {
  const target = join(makeTempDir(), 'missing-folder', 'AGENTS.md');

  const result = runScript(target);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /ENOENT/);
  assert.equal(existsSync(target), false);
});

test('fails with usage help when no target path is given', () => {
  const result = runScript();

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage: node inject-rules\.mjs/);
});

// Core invariants

test('running twice changes nothing the second time', () => {
  const target = join(makeTempDir(), 'AGENTS.md');
  writeFileSync(target, '# Notes\n');
  runScript(target);
  const afterFirstRun = readFileSync(target, 'utf8');

  const secondRun = runScript(target);

  assert.equal(secondRun.status, 0, secondRun.stderr);
  assert.match(secondRun.stdout, /^Already up to date: /);
  assert.equal(readFileSync(target, 'utf8'), afterFirstRun);
});

test('inserts RULES.md byte for byte, with exactly one marker pair', () => {
  const target = join(makeTempDir(), 'AGENTS.md');

  runScript(target);
  const written = readFileSync(target, 'utf8');

  assert.ok(written.includes(RULES));
  assert.equal(written.split(BEGIN).length - 1, 1);
  assert.equal(written.split(END).length - 1, 1);
});
