"""Walk the app and list every spoken line that would fall back to the device voice."""
import asyncio, json
from playwright.async_api import async_playwright
LOG = """
window.__miss = window.__miss || {};
speak = function (t, o = {}) {
  const sp = o.speaker || 'milo';
  if (!t || voiceClipsFor(t, sp)) return;
  for (const s of voiceSentences(t)) if (!voiceClipsFor(s, sp)) __miss[sp + '|' + s] = (__miss[sp + '|' + s] || 0) + 1;
}; 0;"""
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        pg = await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True,reduced_motion='reduce')).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); state.voice=true;")
        await pg.evaluate(LOG)
        ev = lambda js: pg.evaluate(js + '; 0;')
        # Every helper hello, tip and fun tap line, everywhere.
        for route in ['home','library','race','path','writing','museum','stories','library/science']:
            await ev(f"location.hash='{route}'"); await pg.wait_for_timeout(500); await pg.evaluate(LOG)
            await ev("for (const k of ['willa','tiggy','gizmo','dash']) { try{greetCrew(k)}catch(e){}; try{crewHelp(k)}catch(e){} } try{touchMilo()}catch(e){}")
        await ev("for (const [k,l] of Object.entries(sharkTapLines)) l.forEach(t=>speak(t,{speaker:k}))")
        await ev("for (const k of ['milo','willa','tiggy','gizmo','dash']) speak('Paused. Have a think, then tap Keep swimming!',{speaker:k})")
        await ev("for (const k of Object.keys(reefCrew)) { const c=reefCrew[k]; [c.intro,c.tip].forEach(t=>t&&speak(t,{speaker:k})) }")
        # Reading missions: every clue, its hint and its reveal.
        ids = await pg.evaluate("readingMissionLibrary.map(l=>l.id)")
        for lid in ids:
            n = await pg.evaluate(f"(startReadingMission('{lid}'), game.items.length)")
            for i in range(n):
                await pg.evaluate(LOG)
                await ev(f"game.index={i}; readingMission(); const q=game.items[{i}]; [q.prompt,q.hint,q.reveal].forEach(t=>t&&speak(t,{{speaker:'willa'}}))")
            await ev("finishReadingMission && finishReadingMission()") if False else None
        # Science.
        for lid in await pg.evaluate("scienceLessons.map(l=>l.id)"):
            n = await pg.evaluate(f"(startScienceMission('{lid}'), game.items.length)")
            await ev(f"const L=scienceLessons.find(l=>l.id=='{lid}'); [L.intro,L.outro].forEach(t=>t&&speak(t,{{speaker:'gizmo'}}))")
            for i in range(n):
                await pg.evaluate(LOG)
                await ev(f"game.index={i}; scienceMission(); const q=game.items[{i}]; [q.prompt,q.hint,q.reveal,q.say].forEach(t=>t&&speak(t,{{speaker:'gizmo'}}))")
        # Maths lessons (both packs).
        mids = await pg.evaluate("[...new Set([...(typeof schoolMathsLessons!=='undefined'?schoolMathsLessons:[]), ...(typeof mathsLessons!=='undefined'?mathsLessons:[])].map(l=>l.id))]")
        for lid in mids:
            await ev(f"location.hash='home'"); await pg.wait_for_timeout(200); await pg.evaluate(LOG)
            n = await pg.evaluate(f"(requestedMathsLesson='{lid}', start('maths'), game.items.length)")
            for i in range(n):
                await pg.evaluate(LOG)
                await ev(f"game.index={i}; render(); const q=game.items[{i}]; [q.prompt,q.hint,q.say,q.reveal].forEach(t=>t&&speak(t,{{speaker:'tiggy'}})); crewHelp('tiggy')")
        miss = await pg.evaluate('__miss')
        json.dump(miss, open('/home/claude/voicegen/misses.json','w'), indent=1)
        print('lessons', len(ids), len(mids), 'missing', len(miss), 'chars', sum(len(k.split('|',1)[1]) for k in miss), 'errors', errs[:5])
        await b.close()
asyncio.run(main())
