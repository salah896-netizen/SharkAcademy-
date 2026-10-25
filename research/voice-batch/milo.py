import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); window.__said=[]; const os=speak; speak=(t,o={})=>{__said.push((o.speaker||'milo')+': '+String(t).slice(0,50)); }; 0;")
        for route in ['home','library','museum/all','museum/tiger','play','writing','race','path','stories']:
            if route=='play': await pg.evaluate("startReadingMission('R-F-JP-02')")
            else: await pg.evaluate(f"location.hash='{route}'")
            await pg.wait_for_timeout(900)
            res=[]
            for i in range(4):
                r = await pg.evaluate("(()=>{const m=document.querySelector('#miloCompanion .companion-actor');if(!m)return null;const r=m.getBoundingClientRect();return [r.x+r.width*0.45,r.y+r.height*0.55, r.width]})()")
                if not r: res.append('NO MILO'); break
                top = await pg.evaluate(f"(()=>{{const e=document.elementFromPoint({r[0]},{r[1]});return e?(e.closest('button')?.className||e.className?.baseVal||e.className||e.tagName):'none'}})()")
                await pg.evaluate("__said=[]")
                await pg.tap(f"body", position={'x':r[0],'y':r[1]}) if False else await pg.touchscreen.tap(r[0], r[1])
                await pg.wait_for_timeout(400)
                said = await pg.evaluate('__said')
                res.append(('OK' if said else 'SILENT')+' top='+str(top)[:30])
            print(route, res)
        print(errs); await b.close()
asyncio.run(main())
