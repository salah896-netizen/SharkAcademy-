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
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); state.voice=true;" + LOG)
        ids = await pg.evaluate("sharkBook.map(s=>s.id)")
        for sid in ids:
            await pg.evaluate(f"location.hash='museum/{sid}'"); await pg.wait_for_timeout(700)
            n = await pg.evaluate("document.querySelectorAll('.screen-pager').length ? +document.querySelector('.screen-pager span').textContent.split('/')[1] : 1")
            for i in range(n-1):
                await pg.evaluate("document.querySelector('.screen-pager button:last-child').click()"); await pg.wait_for_timeout(150)
            # Shark of the day, race fact and the welcome card for this shark.
            await pg.evaluate(f"const s=sharkBook.find(x=>x.id=='{sid}'); s.facts.forEach(f=>{{speak(s.name+'. '+f[1],{{speaker:'gizmo'}}); speak('Here’s today’s shark! '+s.name+'. '+f[1],{{speaker:'gizmo'}})}}); speak('Let’s meet '+s.name+'. '+s.intro,{{speaker:'gizmo'}}); 0;")
        for tid in await pg.evaluate("oceanTopics.map(t=>t.id)"):
            await pg.evaluate(f"location.hash='museum/topic-{tid}'"); await pg.wait_for_timeout(500)
            await pg.evaluate("document.querySelectorAll('.tap-to-hear').forEach(p=>p.click()); 0;")
        await pg.evaluate("sharkWords.forEach(w=>speak(w.join('. '),{speaker:'gizmo'})); speak('Welcome to your shark encyclopedia, Haytham! Pick a shark picture, visit shark school, or tap a treasure word. I will read everything to you.',{speaker:'gizmo'}); 0;")
        miss = await pg.evaluate('__miss')
        json.dump(miss, open('/home/claude/voicegen/museum-misses.json','w'), indent=1)
        print('missing', len(miss), 'chars', sum(len(k.split('|',1)[1]) for k in miss), 'errors', errs[:5])
        await b.close()
asyncio.run(main())
