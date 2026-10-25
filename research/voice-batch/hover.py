import asyncio, json
from playwright.async_api import async_playwright
exec(open('/home/claude/tools/monkey.py').read().split('CLICK =')[0].split('OUT =')[1].join(['OUT =','']) if False else '')
HOOK = open('/home/claude/tools/monkey.py').read().split('HOOK = """')[1].split('"""')[0]
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':1194,'height':834})).new_page()
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); state.voice=true;" + HOOK)
        for r in ['library','library/reading','library/maths','library/writing','library/science','path','expeditions','race','museum/all','collection']:
            await pg.evaluate(f"location.hash='{r}'"); await pg.wait_for_timeout(700); await pg.evaluate(HOOK)
            for _ in range(8):
                els = await pg.query_selector_all('#app button, #app a, #app [tabindex]')
                for e in els:
                    try:
                        bb = await e.bounding_box()
                        if bb and bb['width'] > 5: await pg.mouse.move(bb['x']+bb['width']/2, bb['y']+bb['height']/2); await pg.wait_for_timeout(380)
                    except Exception: pass
                nxt = await pg.query_selector('#shelfNext:not([disabled]), .shelf-pagination button:last-child:not([disabled])')
                if not nxt: break
                await nxt.click(); await pg.wait_for_timeout(300)
        await pg.evaluate("writingAdventures.forEach(w=>speak(w.goal,{speaker:'dash'})); rewards.forEach(r=>speak('Unlock at '+r[2]+' pearls',{speaker:'milo'})); 0;")
        miss = await pg.evaluate('__miss'); await b.close()
    json.dump(miss, open('/home/claude/voicegen/hover-misses.json','w'), indent=1, ensure_ascii=False)
    print(len(miss)); [print(' ', k) for k in miss]
asyncio.run(main())
