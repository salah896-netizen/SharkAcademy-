# Haytham's Shark Academy

An offline-first learning app for Haytham (Reception, SA), in which his shark friends help him read, write and do maths. It's plain HTML, CSS and JavaScript with no build step. The app itself lives in `dist/`, despite the folder's name.

## Run it locally

```sh
python3 -m http.server 5177 --bind 127.0.0.1 --directory dist
```

Then open http://127.0.0.1:5177/#home. Opening `index.html` directly skips the service worker, so offline behaviour won't work.

## Test

```sh
sh run-tests.sh
```

This needs only Node.js 18 or newer. It checks syntax and runs the lesson, sharing, pacing and calm-scene suites. The same checks run on GitHub for every push. A push to `main` that passes them is published to GitHub Pages.

## Things to know before changing code

- **Script order in `dist/index.html` matters.** Later files wrap or replace functions defined in earlier ones (for example, `ocean-experience.js` replaces the router from `app.js`). Search every file before renaming or changing a global function.
- **Releasing:** bump the cache name (`haytham-sharks-vNN`) in both `dist/app.js` and `dist/sw.js`, and add any new runtime file to the `FILES` list in `sw.js`.
- **Progress** is saved in the browser's localStorage under `haytham-v1`. Never commit real progress exports.
- **Formatting:** Prettier, using the settings in `.prettierrc.json`.
- **Not in the repo** (see `.gitignore`): voice production tooling, audition recordings, the curriculum workbook and parent-review material. Those stay in the family's handover archive.

## Lessons and rewards

- `dist/school-pack.js` holds the lesson batch aligned to Haytham's school:
  - Jolly Phonics digraph lessons and tricky-word lessons.
  - Heggerty-style listening warm-ups.
  - Five new maths adventures, each followed by a "How did you work it out?" step.
- Reading lessons run in the order set by `readingOrder`, and maths by `mathsOrder`.
- Pearls: every learning adventure is worth 13, handed out step by step. Extras (stories, shark profiles, secrets, free writing) are worth 3. Every 50 pearls banks a video. The rule lives in `PEARLS` in `dist/app.js`.

## Science with Gizmo

`dist/science.js` holds five Foundation science adventures built around real sharks:
- Shark spotters, Fish or not a fish?, Sink or float? (predict, then test), How do they move? and Real or pretend?
- They use real encyclopedia photos and sourced facts.
- Predictions are compared with what happened and never marked wrong.
- `verify-science.cjs` checks them.

## Learning path

`dist/path.js` groups the lessons into 14 skills on an island map (`#path`):
- Play, and tapping Willa, Tiggy or Dash, go to the next useful lesson: reviews that are due first, then the next skill that isn't ready yet.
- A skill is ready when 8 of its last 10 answers were right without help, across two days. Reviews follow after about 3, 7 and 21 days.
- A short starting check (`#path/check`) runs the first time Play is pressed.
- Parents can override any skill in the parent area.
- `verify-path.cjs` tests the rules.

## Shark Race

`dist/race.js` holds the race:
- Four tracks: Sunny Lagoon (open from the start), Coral Reef, Open Ocean and Deep Trench. The others open after 2, 5 and 9 finished learning adventures.
- Any of the five friends can race. Tap a lane to swim there.
- Speed shells use the lesson content: first sounds, numbers, digraphs and tricky words.
- A race earns at most 3 pearls. Results facts come from the encyclopedia's sourced entries.
- `verify-race.cjs` simulates whole races without a browser.

## Roles

Milo is Haytham's companion on every screen. Willa leads reading and stories, Tiggy maths, Gizmo shark science, and Dash writing.
