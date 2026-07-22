#!/usr/bin/env node
// Run all tests for plane-game-h5.
// Usage: node tests/run.js  (from project root)

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const testsDir = path.join(__dirname);
const testFiles = fs.readdirSync(testsDir)
  .filter((f) => f.endsWith('.test.js'))
  .sort();

let allPassed = true;

console.log('========================================');
console.log('  plane-game-h5 test suite');
console.log('========================================');

for (const file of testFiles) {
  const filePath = path.join(testsDir, file);
  console.log(`\n>>> Running: ${file}`);
  try {
    execSync(`node "${filePath}"`, { stdio: 'inherit', cwd: path.join(testsDir, '..') });
  } catch (e) {
    allPassed = false;
  }
}

console.log('\n========================================');
if (allPassed) {
  console.log('  ALL TESTS PASSED');
} else {
  console.log('  SOME TESTS FAILED');
  process.exit(1);
}
console.log('========================================');
