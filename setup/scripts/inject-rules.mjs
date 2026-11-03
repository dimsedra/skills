#!/usr/bin/env node
// Inserts or replaces the shared rules block from setup/RULES.md in one agent instruction file.
// Usage: node inject-rules.mjs <path to AGENTS.md, CLAUDE.md, or GEMINI.md>
//
// This exists so every agent produces the exact same file edit. Copying a long block "verbatim"
// through a model can silently paraphrase or drop lines, and nobody can test that path.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const BEGIN_MARKER = '<!-- BEGIN dimsedra/skills setup: managed block, edits inside are overwritten by /setup -->';
const END_MARKER = '<!-- END dimsedra/skills setup -->';
const RULES_PATH = fileURLToPath(new URL('../RULES.md', import.meta.url));

function countOccurrences(text, marker) {
  return text.split(marker).length - 1;
}

function injectRules(content, rulesBlock) {
  const beginCount = countOccurrences(content, BEGIN_MARKER);
  const endCount = countOccurrences(content, END_MARKER);

  if (beginCount === 0 && endCount === 0) {
    const existing = content.trimEnd();
    if (existing === '') return `${rulesBlock}\n`;
    return `${existing}\n\n${rulesBlock}\n`;
  }

  const beginIndex = content.indexOf(BEGIN_MARKER);
  const endIndex = content.indexOf(END_MARKER);
  // Guessing where a broken block ends could delete the user's own instructions, so refuse instead.
  if (beginCount !== 1 || endCount !== 1 || endIndex < beginIndex) {
    throw new Error(
      `Found ${beginCount} BEGIN and ${endCount} END markers. Expected exactly one of each, with BEGIN first. ` +
        'Fix the markers by hand, then run this script again.',
    );
  }

  const before = content.slice(0, beginIndex);
  const after = content.slice(endIndex + END_MARKER.length);
  return `${before}${rulesBlock}${after}`;
}

function describeAction({ fileExisted, original }) {
  if (!fileExisted) return 'Created';
  if (original.includes(BEGIN_MARKER)) return 'Updated rules block in';
  return 'Appended rules block to';
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    throw new Error('Usage: node inject-rules.mjs <path to AGENTS.md, CLAUDE.md, or GEMINI.md>');
  }

  const targetPath = resolve(args[0]);
  const fileExisted = existsSync(targetPath);
  const original = fileExisted ? readFileSync(targetPath, 'utf8') : '';
  const rules = readFileSync(RULES_PATH, 'utf8').trimEnd();
  const rulesBlock = `${BEGIN_MARKER}\n${rules}\n${END_MARKER}`;

  const updated = injectRules(original, rulesBlock);
  if (updated === original) {
    console.log(`Already up to date: ${targetPath}`);
    return;
  }

  writeFileSync(targetPath, updated);
  console.log(`${describeAction({ fileExisted, original })}: ${targetPath}`);
}

try {
  main();
} catch (error) {
  console.error(`inject-rules: ${error.message}`);
  process.exit(1);
}
