#!/bin/sh
# Runs every automated check. Needs only Node.js (no npm install).
set -e
cd "$(dirname "$0")"
for f in dist/*.js; do node --check "$f"; done
node research/lesson-pack/verify.cjs
node research/lesson-pack/verify-sharing.cjs
node research/lesson-pack/verify-pacing.cjs
node research/lesson-pack/verify-calm-scenes.cjs
node research/lesson-pack/verify-school-pack.cjs
node research/lesson-pack/verify-race.cjs
node research/lesson-pack/verify-path.cjs
node research/lesson-pack/verify-science.cjs
node research/architecture/check-offline-list.cjs
echo "All checks passed."
