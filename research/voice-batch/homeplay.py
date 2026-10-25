import asyncio
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); window.__said=[]; speak=(t,o={})=>__said.push((o.speaker||'milo')+': '+t); 0;")
        await pg.wait_for_timeout(500)
        for sel in ['.home-fish .animal-turtle','.home-fish .animal-tuna','.home-fish .animal-clownfish','#livingOcean .fish-drift-two','#livingOcean .fish-drift-one']:
            r = await pg.evaluate(f"(()=>{{const r=document.querySelector('{sel}').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2,r.width]}})()")
            await pg.mouse.click(r[0], r[1]); await pg.wait_for_timeout(800)
            print(sel, [round(v) for v in r], (await pg.evaluate('__said.slice(-1)')))
            if 'turtle' in sel: await pg.screenshot(path=S+'reef-turtle.png')
        await pg.mouse.click(1000, 300); await pg.wait_for_timeout(250); await pg.screenshot(path=S+'reef-bubbles.png')
        print('errors', errs); await b.close()
asyncio.run(main())
