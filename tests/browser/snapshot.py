"""Behaviour snapshot for refactoring: visits every screen and lesson in a fixed order with a
fixed clock and seeded randomness, and records what the child would see and hear.

Used during the code tidy-up to prove a change is invisible: take a snapshot before, change the
code, take another, and diff them. Any difference is a visible change.

  python3 -m http.server 5180 --directory dist &
  python3 tests/browser/snapshot.py before.json
  ... edit ...
  python3 tests/browser/snapshot.py after.json
  python3 tests/browser/snapshot.py --diff before.json after.json
"""
import asyncio, json, os, re, sys
from playwright.async_api import async_playwright

BASE = f"http://127.0.0.1:{os.environ.get('PORT', '5180')}/"
FIXED = 1793500200000  # Wed 28 Oct 2026, 11:00 local

INIT = """(() => {
  const base = %d, start = performance.now(), RealDate = Date;
  const now = () => base + Math.floor(performance.now() - start);
  class FixedDate extends RealDate { constructor(...a) { a.length ? super(...a) : super(now()) } static now() { return now() } }
  window.Date = FixedDate;
  let seed = 1;
  window.__reseed = s => (seed = s >>> 0 || 1);
  Math.random = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 };
  try { const d = new FixedDate(); const s = JSON.parse(localStorage.getItem('haytham-v1') || 'null');
    if (!s) localStorage.setItem('haytham-v1', JSON.stringify({ xp: 0, voice: true, writingHistory: [], range: 10, history: [], completed: [], discoveries: [],
      lastOpening: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') })) } catch {}
})();""" % FIXED

QUIET = """window.__said = [];
speakWithDevice = (t, o = {}) => { __said.push((o.speaker || 'milo') + ': ' + t); setTimeout(() => (o.end || o.onend)?.(), 15); };
playVoiceClips = (f, t, o = {}) => { __said.push((o.speaker || 'milo') + ': ' + t); setTimeout(() => o.end?.(), 15); };
document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); 0;"""

CAPTURE = """(() => {
  const vis = s => { const e = document.querySelector(s); return e ? !e.hidden && getComputedStyle(e).display !== 'none' : null };
  return {
    app: document.getElementById('app').innerHTML,
    body: document.body.className.split(/\\s+/).filter(c => !/speaking/.test(c)).sort().join(' '),
    route: document.body.dataset.route, scene: document.body.dataset.calmScene || '',
    chrome: ['#screenBack', '#screenHome', '.submarine-library', '#oceanSettings', '#treasureChest'].map(vis),
    modal: document.getElementById('modal')?.open ? document.getElementById('modalContent').innerHTML : null,
    extra: [...document.body.children].filter(e => !['app', 'oceanChrome', 'modal'].includes(e.id) && !/^(SCRIPT|LINK)$/.test(e.tagName))
      .map(e => e.tagName + '#' + e.id + '.' + e.className + (e.hidden ? '[hidden]' : '')).sort(),
    said: window.__said.slice(),
    state: localStorage.getItem('haytham-v1')
  } })()"""


def norm(v):
    s = json.dumps(v, ensure_ascii=False, sort_keys=True)
    s = re.sub(r'\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?Z', 'ISO', s)
    s = re.sub(r'\b1[67]\d{11}\b', 'NOW', s)
    s = re.sub(r'zoom: ?[\d.]+;?', '', s)
    s = re.sub(r'(crew|milo)-\d+-', r'\1-N-', s)  # SVG id counter; depends on how many friends were drawn before
    return json.loads(s)


async def main(out):
    snaps = {}
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1194, 'height': 834}, has_touch=True, reduced_motion='reduce')
        await ctx.add_init_script(INIT)
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        ev = lambda js: page.evaluate(js)
        cov = os.environ.get('COVERAGE')
        if cov:
            cdp = await ctx.new_cdp_session(page)
            await cdp.send('Profiler.enable')
            await cdp.send('Profiler.startPreciseCoverage', {'callCount': True, 'detailed': False})
        # Cold starts: opening the app straight onto each screen, and the first open of the day.
        cold = [('home', True), ('home', False), ('library', True), ('museum', True), ('museum/whale', True), ('museum/all', True),
                ('race', True), ('path', True), ('draw', True), ('writing', True), ('stories', True), ('collection', True), ('play', True)]
        for route, dived in cold:
            c = await browser.new_context(viewport={'width': 1194, 'height': 834}, has_touch=True, reduced_motion='reduce')
            await c.add_init_script(INIT if dived else INIT.replace("lastOpening: ", "notOpened: "))
            cp = await c.new_page()
            cerr = []
            cp.on('pageerror', lambda e: cerr.append(str(e)))
            await cp.goto(BASE + '#' + route)
            await cp.wait_for_timeout(2000)
            shot = norm(await cp.evaluate(CAPTURE.replace('window.__said.slice()', '[]')))
            shot['hash'] = await cp.evaluate('location.hash')
            shot['errors'] = cerr
            snaps[f'000 cold {route}{"" if dived else " (first open today)"}'] = shot
            await c.close()
        await page.goto(BASE + '#home')
        await page.wait_for_timeout(1500)
        await ev(QUIET)
        n = 0

        async def snap(name, js=None, wait=500):
            nonlocal n
            n += 1
            seen = len(errors)
            await ev(f'window.__said = []; __reseed({n}); 0')
            if js:
                try:
                    await ev(js + '; 0')
                except Exception as e:  # a scenario that throws is itself a recorded result
                    errors.append(str(e).splitlines()[0])
            await page.wait_for_timeout(wait)
            snaps[f'{n:03d} {name}'] = norm(await ev(CAPTURE))
            for i in range(seen, len(errors)):
                errors[i] = f'{n:03d} {name}: {errors[i]}'

        await snap('home (initial)')
        for r in ['library', 'museum', 'museum/all', 'expeditions', 'writing', 'draw', 'race', 'path', 'stories',
                  'collection', 'library/science', 'legend', 'cinema', 'home']:
            await snap('route ' + r, f"location.hash = '{r}'")
        for sid in await ev('sharkBook.map(s => s.id)'):
            await snap('shark ' + sid, f"location.hash = 'museum/{sid}'", 700)
        await snap('home', "location.hash = 'home'")
        for tid in await ev('oceanTopics.map(t => t.id)'):
            await snap('topic ' + tid, f"openTopic('{tid}')", 400)
        for tab in ['sharks', 'aussie', 'topics', 'words']:
            await snap('shelf ' + tab, f"location.hash = 'museum/all'", 300)
            await snap('shelf tab ' + tab, f"document.querySelector('[data-shelf-tab=\"{tab}\"]')?.click()", 300)

        # Reading: open each lesson, answer right, then two wrong on the next question
        for lid in await ev('readingMissionLibrary.map(l => l.id)'):
            await snap('reading ' + lid, f"location.hash = 'home'; startReadingMission('{lid}')", 300)
            await snap('reading right ' + lid, """(() => { const q = game.items[game.index];
                const i = q.options ? q.options.indexOf(q.answer) : -1; document.querySelector(`[data-quest-choice="${i}"]`)?.click() })()""", 3200)
            await snap('reading wrong ' + lid, """(() => { if (!game) return; const q = game.items[game.index];
                const w = [...document.querySelectorAll('[data-quest-choice]')].filter(b => q.options[+b.dataset.questChoice] !== q.answer);
                w[0]?.click(); setTimeout(() => w[1]?.click(), 300) })()""", 1800)
            await snap('reading finish ' + lid, "if (game) { game.index = game.items.length; readingMission() }", 600)

        # Maths and the older games
        for lid in await ev('mathsAdventures.map(l => l.id)'):
            await snap('maths ' + lid, f"location.hash = 'home'; requestedMathsLesson = '{lid}'; start('maths')", 400)
            await snap('maths right ' + lid, """(() => { const q = game.items[game.index];
                const b = [...document.querySelectorAll('[data-choice]')].find(b => b.textContent.trim().endsWith(q.answer) || b.dataset.value === q.answer);
                b ? b.click() : answer(q.answer) })()""", 3200)
            await snap('maths wrong ' + lid, """(() => { if (!game || game.mission) return; const q = game.items[game.index];
                const w = (q.choices || []).filter(c => c !== q.answer); w[0] !== undefined && answer(w[0]) })()""", 600)
            await snap('maths finish ' + lid, "if (game && !game.mission) { game.index = game.items.length; play() }", 800)
        for t in ['reading', 'maths', 'fossil']:
            await snap('start ' + t, f"location.hash = 'home'; requestedMathsLesson = null; start('{t}')", 400)

        # Science
        for lid in await ev('scienceLessons.map(l => l.id)'):
            await snap('science ' + lid, f"location.hash = 'home'; startScienceMission('{lid}')", 500)
            await snap('science tap ' + lid, "document.querySelector('[data-science-choice],[data-quest-choice]')?.click()", 2500)

        # Writing adventures
        for i in range(await ev('writingAdventures.length')):
            await snap(f'writing {i}', f"location.hash = 'home'; guidedWriting = {{ lesson: writingAdventures[{i}], step: 0, samples: [], session: 's{i}' }}; location.hash = 'writing'", 600)
        await snap('home after writing', 'goHomeNow()', 500)

        # Path, daily adventure, friend taps
        await snap('path', "location.hash = 'path'", 500)
        await snap('home again', "location.hash = 'home'", 400)
        await snap('daily adventure', 'dailyAdventure()', 800)
        await snap('home 3', 'goHomeNow()', 400)
        for k in ['milo', 'willa', 'tiggy', 'gizmo', 'dash']:
            await snap('tap ' + k, f"document.querySelector('[data-friend-route=\"{k}\"]')?.click()", 600)
            await snap('home after tap ' + k, 'goHomeNow()', 400)

        # Stories
        for i in range(await ev('stories.length')):
            await snap(f'story {i}', f"location.hash = 'stories'; setTimeout(() => {{ storyPage = 0; storyReader(stories[{i}]) }}, 100)", 600)

        # Grown-ups' area, every section
        await snap('home 4', 'goHomeNow()', 300)
        await snap('parents gate', "document.getElementById('parent').click()", 300)
        await snap('parents', "document.getElementById('gate').value = '19'; document.getElementById('unlock').click()", 600)
        for i in range(await ev("document.querySelector('.parent-page-choice select')?.options.length || 0")):
            await snap(f'parents section {i}', f"(s => {{ s.value = '{i}'; s.onchange() }})(document.querySelector('.parent-page-choice select'))", 300)
        await snap('close parents', "document.getElementById('closeModal').click(); location.hash = 'home'", 300)
        await snap('collection end', "location.hash = 'collection'", 400)
        await snap('race end', "location.hash = 'race'", 600)
        await snap('final home', 'goHomeNow()', 400)
        snaps['zz errors'] = errors
        if cov:
            # Top-level functions in dist/ that were never called during the whole walkthrough.
            res = (await cdp.send('Profiler.takePreciseCoverage'))['result']
            never = []
            for script in res:
                url = script['url']
                if '127.0.0.1:5180' not in url or not url.endswith('.js'):
                    continue
                for f in script['functions']:
                    r = f['ranges'][0]
                    if f['functionName'] and r['count'] == 0:
                        never.append([url.rsplit('/', 1)[1], f['functionName'], r['startOffset']])
            json.dump(never, open(cov, 'w'), indent=0)
            print(f'{len(never)} never-called named functions -> {cov}')
        await browser.close()
    json.dump(snaps, open(out, 'w'), ensure_ascii=False, indent=1)
    print(f'{len(snaps)} snapshots, {len(errors)} page errors -> {out}')


def diff(a, b):
    A, B = norm(json.load(open(a))), norm(json.load(open(b)))
    bad = 0
    for k in sorted(set(A) | set(B)):
        if A.get(k) == B.get(k):
            continue
        bad += 1
        print('DIFF', k)
        x, y = A.get(k) or {}, B.get(k) or {}
        if isinstance(x, dict) and isinstance(y, dict):
            for f in sorted(set(x) | set(y)):
                if x.get(f) != y.get(f):
                    sx, sy = json.dumps(x.get(f), ensure_ascii=False), json.dumps(y.get(f), ensure_ascii=False)
                    i = next((j for j in range(min(len(sx), len(sy))) if sx[j] != sy[j]), min(len(sx), len(sy)))
                    print(f'  {f}: ...{sx[max(0, i - 80):i + 120]}\n  {" " * len(f)}  ...{sy[max(0, i - 80):i + 120]}')
        else:
            print('  ', x, '\n  ', y)
    print(f'{bad} snapshot(s) differ out of {len(A)}')
    return bad


if __name__ == '__main__':
    if sys.argv[1] == '--diff':
        sys.exit(1 if diff(sys.argv[2], sys.argv[3]) else 0)
    asyncio.run(main(sys.argv[1]))
