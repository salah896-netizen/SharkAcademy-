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

## Roles

Milo is Haytham's companion on every screen. Willa leads reading and stories, Tiggy maths, Gizmo shark science, and Dash writing.
