#!/bin/sh
# Runs every automated check. Needs only Node.js (no npm install).
set -e
cd "$(dirname "$0")"
for f in dist/*.js; do node --check "$f"; done
node research/lesson-pack/verify.cjs
node research/lesson-pack/verify-sharing.cjs
node research/lesson-pack/verify-pacing.cjs
node research/lesson-pack/verify-calm-scenes.cjs
echo "All checks passed."
