// Minimal test runner for Node.js — no external dependencies.

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    failures.push({ name, error: e });
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertDeepEqual(actual, expected, message) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a !== b) {
    throw new Error(message || `Expected ${b}, got ${a}`);
  }
}

function assertThrows(fn, message) {
  try {
    fn();
  } catch (e) {
    return; // expected
  }
  throw new Error(message || 'Expected function to throw');
}

function assertApprox(actual, expected, tolerance, message) {
  const t = tolerance || 0.001;
  if (Math.abs(actual - expected) > t) {
    throw new Error(message || `Expected ~${expected}, got ${actual}`);
  }
}

function summary() {
  console.log(`\n${passed} passed, ${failed} failed`);
  if (failures.length > 0) {
    console.log('\nFailures:');
    failures.forEach(({ name, error }) => {
      console.log(`  ${name}: ${error.message}`);
    });
    process.exit(1);
  }
}

module.exports = { test, assert, assertEqual, assertDeepEqual, assertThrows, assertApprox, summary };
