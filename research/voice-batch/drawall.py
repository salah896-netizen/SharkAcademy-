import asyncio
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); window.__said=[]; speak=(t,o={})=>__said.push(t); location.hash='draw'; 0;"); await pg.wait_for_timeout(800)
        for kind in ['fish','starfish','turtle','crab','octopus','whale']:
            await pg.click(f'[data-draw-pick={kind}]'); await pg.wait_for_timeout(300)
            n = await pg.evaluate('currentDrawing().steps.length')
            for i in range(n):
                pts = await pg.evaluate("""(()=>{const p=document.querySelector('.draw-next');const m=p.getScreenCTM();const L=p.getTotalLength();return Array.from({length:16},(_,k)=>{const q=p.getPointAtLength(L*k/15);return [q.x*m.a+m.e,q.y*m.d+m.f]})})()""")
                await pg.mouse.move(*pts[0]); await pg.mouse.down()
                for x,y in pts[1:]: await pg.mouse.move(x,y,steps=2)
                await pg.mouse.up()
                await pg.click('#drawNext', force=True); await pg.wait_for_timeout(100)
            await pg.screenshot(path=S+f'draw-{kind}.png')
            await pg.click('#drawDone', force=True); await pg.wait_for_timeout(100)
        print('saved', await pg.evaluate("state.drawings.map(d=>d.subject)"), 'last said', await pg.evaluate('__said.slice(-2)'), errs)
        await pg.screenshot(path=S+'draw-picks.png')
        await b.close()
asyncio.run(main())
