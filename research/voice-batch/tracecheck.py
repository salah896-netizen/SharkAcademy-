import asyncio
from playwright.async_api import async_playwright
STUB="window.__said=[]; speak=(t,o={})=>__said.push(t); 0;"
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        async def setup(step, mode=None):
            await pg.evaluate("document.querySelector('#tapToDive')?.remove(); location.hash='home'"); await pg.wait_for_timeout(300)
            await pg.evaluate(f"guidedWriting={{lesson:writingAdventures[0],step:{step},samples:[],session:'x'+Date.now()}}; location.hash='writing'; 0;"); await pg.wait_for_timeout(900)
            await pg.evaluate(STUB)
        async def scribble():
            c = await pg.locator('#writingCanvas').bounding_box()
            await pg.mouse.move(c['x']+c['width']*.15, c['y']+c['height']*.85); await pg.mouse.down(); await pg.mouse.move(c['x']+c['width']*.2, c['y']+c['height']*.9, steps=4); await pg.mouse.up()
        async def trace():
            paths = await pg.evaluate("""(()=>[...document.querySelectorAll('#writingGuide path[stroke="#a4c6c8"]')].map(p=>{const m=p.getScreenCTM(),L=p.getTotalLength();return Array.from({length:24},(_,k)=>{const q=p.getPointAtLength(L*k/23);return [q.x*m.a+q.y*m.c+m.e,q.x*m.b+q.y*m.d+m.f]})}))()""")
            for pts in paths:
                await pg.mouse.move(*pts[0]); await pg.mouse.down()
                for x,y in pts[1:]: await pg.mouse.move(x,y,steps=2)
                await pg.mouse.up()
        async def press():
            n0 = await pg.evaluate("(state.writingHistory||[]).length")
            await pg.click('#finishWriting', force=True); await pg.wait_for_timeout(400)
            return (await pg.evaluate("(state.writingHistory||[]).length")) > n0, await pg.evaluate('__said.slice(-1)')
        await setup(0); await scribble(); print('trace step, scribble ->', await press())
        await setup(0); await trace(); print('trace step, real trace ->', await press())
        await setup(1); await scribble(); print('copy step, tiny mark ->', await press())
        await setup(1)
        # write a c-like curve freehand in the board middle
        c = await pg.locator('#writingCanvas').bounding_box()
        import math
        pts=[(c['x']+c['width']*(0.5+0.12*math.cos(a)), c['y']+c['height']*(0.55+0.2*math.sin(a))) for a in [i*0.2+0.6 for i in range(25)]]
        await pg.mouse.move(*pts[0]); await pg.mouse.down()
        for p in pts[1:]: await pg.mouse.move(*p, steps=2)
        await pg.mouse.up(); print('copy step, real letter ->', await press())
        print('errors', errs); await b.close()
asyncio.run(main())
