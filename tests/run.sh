#!/bin/bash
# Run all tests for plane-game-h5.
# Usage: ./tests/run.sh  (from project root)

cd "$(dirname "$0")/.." || exit 1

FAILED=0

echo "========================================"
echo "  plane-game-h5 test suite"
echo "========================================"

for test_file in tests/*.test.js; do
  echo ""
  echo ">>> Running: $test_file"
  if ! node "$test_file"; then
    FAILED=1
  fi
done

echo ""
echo "========================================"
if [ "$FAILED" -eq 0 ]; then
  echo "  ALL TESTS PASSED"
else
  echo "  SOME TESTS FAILED"
fi
echo "========================================"

exit "$FAILED"
