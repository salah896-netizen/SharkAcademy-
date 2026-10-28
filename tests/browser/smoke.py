"""Browser smoke test: plays through the main parts of the app like a child would and fails on
any page error or broken behaviour. Runs on every push (GitHub Actions) before publishing.

Needs a local server on 5180 serving dist/ and Python Playwright with Chromium:
  python3 -m http.server 5180 --directory dist &
  python3 tests/browser/smoke.py
"""
import asyncio, math, sys
from playwright.async_api import async_playwright

BASE = 'http://127.0.0.1:5180/'
QUIET = """window.__said = [];
speakWithDevice = (t, o = {}) => { __said.push(String(t)); setTimeout(() => (o.end || o.onend)?.(), 15); };
playVoiceClips = (f, t, o = {}) => { __said.push(String(t)); setTimeout(() => o.end?.(), 15); };
document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); 0;"""
failures = []


def check(ok, label):
    print(('PASS ' if ok else 'FAIL ') + label)
    if not ok:
        failures.append(label)


async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1194, 'height': 834}, has_touch=True, reduced_motion='reduce')
        page = await ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        ev = lambda js: page.evaluate(js)
        await page.goto(BASE + '#home')
        await page.wait_for_timeout(1500)
        await ev(QUIET)

        # Home
        check(await ev("document.querySelectorAll('.friend-badge').length") == 5, 'home: five friend badges')

        # Every route opens without errors
        for route in ['library', 'museum', 'museum/all', 'museum/tiger', 'museum/portjackson', 'writing', 'draw',
                      'race', 'path', 'stories', 'collection', 'library/science', 'home']:
            await ev(f"location.hash = '{route}'")
            await page.wait_for_timeout(400)
        check(not errors, 'all routes open without page errors')

        # Encyclopedia gallery
        await ev("location.hash = 'museum/whale'")
        await page.wait_for_timeout(600)
        check(await ev("document.querySelectorAll('.shark-gallery .gallery-photo').length") == 3, 'encyclopedia: three photos')

        # Reading: two wrong taps show the answer and add a revisit
        await ev("startReadingMission('R-F-JP-02')")
        await page.wait_for_timeout(500)
        before = await ev('game.items.length')
        wrong = await ev("(() => { const q = game.items[game.index]; return [...document.querySelectorAll('[data-quest-choice]')].map(b => +b.dataset.questChoice).filter(i => q.options[i] !== q.answer) })()")
        await page.click(f'[data-quest-choice="{wrong[0]}"]', force=True)
        await page.wait_for_timeout(300)
        check(await ev("!!document.querySelector('.kid-try-again')"), 'reading: first wrong tap shows try again')
        await page.click(f'[data-quest-choice="{wrong[1]}"]', force=True)
        await page.wait_for_timeout(1500)
        check(await ev('game && game.items.length') == before + 1, 'reading: second wrong tap shows answer and revisits')

        # Science photos are the clear encyclopedia ones
        await ev("startScienceMission('S-F-01')")
        await page.wait_for_timeout(600)
        check(await ev("[...document.querySelectorAll('.science-photo')].every(i => i.src.includes('assets/sharks/'))"), 'science: clear photos')
        check(await ev("!!document.getElementById('repeatQuestion')"), 'science: repeat-question button')

        # Maths: every generated question has a recorded voice
        bad = await ev("""(() => { const bad = []; for (let r = 0; r < 6; r++) for (const s of [1, 2, 3]) {
            learningState().maths.stage = s; state.range = [10, 20, 50][s - 1];
            makeQuestions('maths').forEach(q => q.spoken && !voiceClipsForAnyone(q.spoken, 'tiggy') && bad.push(q.spoken)); }
            learningState().maths.stage = 1; return bad })()""")
        check(not bad, f'maths: all generated questions voiced ({bad[:2]})')

        # Drawing: Dash always says the part that's glowing
        await ev("location.hash = 'home'")
        await page.wait_for_timeout(300)
        await ev("sharkDraw = null; location.hash = 'draw'")
        await page.wait_for_timeout(700)
        await ev("window.__said = []; speak = (t, o = {}) => __said.push(t); 0;")
        synced = True
        for i in range(await ev('currentDrawing().steps.length')):
            pts = await ev("""(() => { const p = document.querySelector('.draw-next'), m = p.getScreenCTM(), L = p.getTotalLength();
                return Array.from({ length: 12 }, (_, k) => { const q = p.getPointAtLength(L * k / 11); return [q.x * m.a + m.e, q.y * m.d + m.f] }) })()""")
            await page.mouse.move(*pts[0]); await page.mouse.down()
            for x, y in pts[1:]:
                await page.mouse.move(x, y)
            await page.mouse.up()
            await page.click('#drawNext', force=True)
            await page.wait_for_timeout(80)
            nxt = await ev("currentDrawing().steps[sharkDraw.step]?.say || ''")
            said = await ev('__said.at(-1) || ""')
            synced = synced and (not nxt or nxt in said)
        check(synced, 'drawing: instructions match each part')

        # Every writing lesson opens with its own guide and no errors
        broken = []
        for lid in await ev('writingAdventures.map(l => l.id)'):
            before = len(errors)
            await ev(f"location.hash = 'home'"); await page.wait_for_timeout(150)
            await ev(f"guidedWriting = {{ lesson: writingAdventures.find(l => l.id === '{lid}'), step: 0, samples: [], session: 'w' }}; location.hash = 'writing'")
            await page.wait_for_timeout(300)
            ok = await ev(f"document.querySelector('.writing-mission-prompt strong')?.getAttribute('aria-label') === writingAdventures.find(l => l.id === '{lid}').target && document.querySelectorAll('#writingGuide path').length > 1")
            if len(errors) > before or not ok:
                broken.append(lid)
            del errors[before:]
        check(not broken, f'writing: every lesson opens with its guide ({broken})')

        # Writing: a scribble is not accepted, a real trace is
        await ev("location.hash = 'home'")
        await page.wait_for_timeout(300)
        await ev("guidedWriting = { lesson: writingAdventures[0], step: 0, samples: [], session: 's1' }; location.hash = 'writing'")
        await page.wait_for_timeout(800)
        box = await page.locator('#writingCanvas').bounding_box()
        await page.mouse.move(box['x'] + 20, box['y'] + box['height'] - 20); await page.mouse.down()
        await page.mouse.move(box['x'] + 40, box['y'] + box['height'] - 10); await page.mouse.up()
        n0 = await ev('(state.writingHistory || []).length')
        await page.click('#finishWriting', force=True)
        await page.wait_for_timeout(300)
        check(await ev('(state.writingHistory || []).length') == n0, 'writing: scribble not accepted')
        await page.click('#clearInk', force=True)
        paths = await ev("""(() => [...document.querySelectorAll('#writingGuide path[stroke="#a4c6c8"]')].map(p => { const m = p.getScreenCTM(), L = p.getTotalLength();
            return Array.from({ length: 20 }, (_, k) => { const q = p.getPointAtLength(L * k / 19); return [q.x * m.a + q.y * m.c + m.e, q.x * m.b + q.y * m.d + m.f] }) }))()""")
        for pts in paths:
            await page.mouse.move(*pts[0]); await page.mouse.down()
            for x, y in pts[1:]:
                await page.mouse.move(x, y)
            await page.mouse.up()
        await page.click('#finishWriting', force=True)
        await page.wait_for_timeout(300)
        check(await ev('(state.writingHistory || []).length') == n0 + 1, 'writing: real trace accepted')

        # Every picture any lesson or race asks for is drawn in the one lesson style (pictures.js)
        old_style = await ev("""(() => { const keys = new Set();
            for (const l of readingMissionLibrary) for (const q of l.items) { (q.options || []).forEach(o => keys.add(o)); if (q.target) keys.add(q.target) }
            return [...keys].filter(k => typeof k === 'string' && !k.startsWith('word:') && !/class="pic/.test(readingArt(k))) })()""")
        check(not old_style, f'pictures: every lesson picture in the new style ({old_style[:4]})')

        # Every lesson opens with a picture on every choice, and every line in it is recorded
        await ev("location.hash = 'home'")
        await page.wait_for_timeout(300)
        blank = []
        for lid in await ev('readingMissionLibrary.map(l => l.id)'):
            await ev(f"startReadingMission('{lid}')")
            await page.wait_for_timeout(120)
            ok = await ev("[...document.querySelectorAll('[data-quest-choice]')].length >= 2 && [...document.querySelectorAll('[data-quest-choice]')].every(b => b.querySelector('svg, .emoji-pic, img'))")
            if not ok:
                blank.append(lid)
        check(not blank, f'reading: every lesson shows pictures ({blank[:3]})')
        for lid in await ev('mathsAdventures.map(l => l.id)'):
            await ev(f"requestedMathsLesson = '{lid}'; start('maths')")
            await page.wait_for_timeout(150)
        for lid in await ev('scienceLessons.map(l => l.id)'):
            await ev(f"startScienceMission('{lid}')")
            await page.wait_for_timeout(150)
        check(not errors, f'every maths and science lesson opens ({errors[:1]})')
        unvoiced = await ev("""(() => { const bad = [], say = (t, sp) => t && !voiceClipsForAnyone(t, sp) && bad.push(t);
            for (const l of readingMissionLibrary.filter(l => l.school)) for (const q of l.items) { say(q.prompt, 'willa'); say(q.hint, 'willa'); say(q.reveal, 'willa'); }
            for (const l of scienceLessons) { say(l.intro, 'gizmo'); for (const q of l.items) { say(q.ask, 'gizmo'); say(q.reveal, 'gizmo'); } }
            for (const l of writingAdventures) say(l.goal, 'dash');
            for (const l of mathsAdventures) for (let n = 0; n < 12; n++) {
              state.completed = Array.from({ length: n }, () => ({ type: 'maths' })); requestedMathsLesson = l.id;
              makeQuestions('maths').forEach(q => { say(q.prompt, 'tiggy'); say(q.hint, 'tiggy'); }); }
            state.completed = []; return bad })()""")
        check(not unvoiced, f'every lesson line is recorded ({unvoiced[:3]})')

        # Library and race track cards are all painted scenes (28 Oct)
        await ev("location.hash = 'library'"); await page.wait_for_timeout(300)
        lib = await ev("[...document.querySelectorAll('.library-choices .library-picture')].map(p => !!p.querySelector('svg.painted-scene'))")
        check(len(lib) == 10 and all(lib), f'library: all 10 cards painted ({lib})')
        check(await ev("document.body.dataset.calmScene === 'library-room'"), 'library: painted background')
        await ev("location.hash = 'race'"); await page.wait_for_timeout(300)
        tracks = await ev("[...document.querySelectorAll('.race-track-card')].map(c => !!c.querySelector('svg.painted-scene'))")
        check(len(tracks) == 4 and all(tracks), f'race: all 4 track cards painted ({tracks})')

        # Lesson screens use painted icons and animals, not emoji (29 Oct)
        animals = await ev("['salmon','tuna','squid','crab','barracuda','turtle','blue-tang','clownfish','hammerhead','dolphin','octopus'].filter(k => !/radialGradient/.test(seaAnimal(k)))")
        check(not animals, f'sea animals: all 11 painted ({animals})')
        await ev("start('maths')"); await page.wait_for_timeout(600)
        bad = await ev("""(() => { const t = s => (document.querySelector(s)?.textContent || '');
          return [['help', t('#hint')], ['repeat', t('#repeatQuestion')], ['trail', t('.lesson-progress')], ['voice', t('#oceanVoice')]]
            .filter(([, x]) => /[💡🔊🐚♫○]/u.test(x)).map(([k]) => k) })()""")
        check(not bad, f'maths lesson: painted help, speaker, trail and voice icons ({bad})')
        await ev("location.hash = 'library/reading'"); await page.wait_for_timeout(300)
        await ev("document.querySelector('.lesson-shelf-card')?.click()"); await page.wait_for_timeout(600)
        bad = await ev("""(() => /[💡🐚◌]/u.test((document.querySelector('#questHint')?.textContent || '') + (document.querySelector('.quest-trail')?.textContent || '')) )()""")
        check(not bad, 'reading lesson: painted help and trail')

        # Treasures and race pickers are painted (29 Oct, v111)
        await ev("location.hash = 'collection'"); await page.wait_for_timeout(300)
        bad = await ev("""[...document.querySelectorAll('.collect .treasure-art')].filter(s => !s.querySelector('svg')).length""")
        emo = await ev("""/[🦈🐚🪸🦷🐢🏆🔒]/u.test(document.querySelector('.collection')?.textContent || '')""")
        check(not bad and not emo, f'treasures: painted pictures and locks ({bad} missing, emoji {emo})')
        await ev("location.hash = 'race'"); await page.wait_for_timeout(300)
        check(await ev("document.body.dataset.calmScene === 'race-room' && !/[🔒🏁]/u.test(document.querySelector('.race-picker')?.textContent || '')"), 'race picker: painted backdrop, lock and flag')

        # The race itself: painted scenery tiles on every track, painted obstacles and shells (29 Oct, v112)
        bad = []
        saved_xp = await ev("state.xp"); await ev("state.xp = 400")
        for t in ['lagoon', 'reef', 'ocean', 'trench']:
            await ev(f"location.hash = 'race/{t}/milo'"); await page.wait_for_timeout(250)
            ok = await ev("""(() => { const s = document.querySelector('.race-screen'); if (!s) return false;
              const far = getComputedStyle(s, '::before').backgroundImage, bed = getComputedStyle(s.querySelector('.race-floor')).backgroundImage;
              const shells = [...s.querySelectorAll('.speed-shell svg')].every(v => /radialGradient/.test(v.innerHTML));
              const obst = [...s.querySelectorAll('.race-coral svg, .race-jelly svg, .race-rock svg')].every(v => /radialGradient/.test(v.innerHTML));
              return /assets\\/race\\//.test(far) && /assets\\/race\\//.test(bed) && shells && obst })()""")
            if not ok: bad.append(t)
        check(not bad, f'race: painted scenery, shells and obstacles on every track ({bad})')
        await ev("location.hash = 'race'"); await page.wait_for_timeout(200)
        await ev(f"state.xp = {saved_xp}")

        # Going home from writing clears the sandy backdrop; progress has a spare copy
        await ev("location.hash = 'writing'"); await page.wait_for_timeout(200)
        await ev("goHomeNow()"); await page.wait_for_timeout(400)
        check(await ev("document.getElementById('oceanWorld').style.background === '' && document.body.dataset.calmScene === 'home'"), 'home: no sandy backdrop after writing')
        await ev("state.xp += 1; save(); 0"); await page.wait_for_timeout(500)
        check(await ev("progressDB.get('latest').then(s => !!s && s.state.xp === state.xp)"), 'progress: saved to the spare copy')

        check(not errors, f'no page errors ({errors[:2]})')
        await browser.close()
    if failures:
        print(f'{len(failures)} browser check(s) failed')
        sys.exit(1)
    print('All browser checks passed.')

asyncio.run(main())
