import asyncio
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); window.__said=[]; speak=(t,o={})=>__said.push((o.speaker||'milo')+': '+t); location.hash='writing'; 0;")
        await pg.wait_for_timeout(800)
        await pg.click('#drawSharkLink'); await pg.wait_for_timeout(800)
        n = await pg.evaluate('sharkDrawSteps.length')
        for i in range(n):
            pts = await pg.evaluate("""(()=>{const p=document.querySelector('.draw-next');const m=p.getScreenCTM();const L=p.getTotalLength();return Array.from({length:20},(_,k)=>{const q=p.getPointAtLength(L*k/19);return [q.x*m.a+m.e,q.y*m.d+m.f]})})()""")
            await pg.mouse.move(*pts[0]); await pg.mouse.down()
            for x,y in pts[1:]: await pg.mouse.move(x,y,steps=2)
            await pg.mouse.up()
            if i==2:
                await pg.screenshot(path=S+'draw-mid.png')
            await pg.evaluate('__said=[]')
            await pg.click('#drawNext', force=True); await pg.wait_for_timeout(200)
            said = await pg.evaluate('__said')
            nxt = await pg.evaluate('sharkDrawSteps[sharkDraw.step]?.say || "colour"')
            ok = (said and (nxt in said[-1] or nxt=='colour'))
            print(i, 'OK' if ok else 'WRONG', said[-1][:70] if said else None)
        await pg.click('#drawEraser')
        await pg.mouse.move(500,400); await pg.mouse.down(); await pg.mouse.move(700,420,steps=8); await pg.mouse.up()
        await pg.click('[data-crayon="#2f7fc0"]')
        await pg.mouse.move(450,450); await pg.mouse.down(); await pg.mouse.move(650,450, steps=8); await pg.mouse.up()
        await pg.screenshot(path=S+'draw-end.png')
        await pg.click('#drawDone', force=True); await pg.wait_for_timeout(300)
        print('saved', await pg.evaluate('state.drawings.length'), 'errors', errs)
        await b.close()
asyncio.run(main())
