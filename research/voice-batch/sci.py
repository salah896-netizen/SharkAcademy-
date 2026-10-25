import asyncio, sys
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); startScienceMission('S-F-01'); 0;"); await pg.wait_for_timeout(1500)
        await pg.screenshot(path=S+'sci1.png')
        await pg.evaluate("game.index=3; scienceMission()"); await pg.wait_for_timeout(800)
        await pg.screenshot(path=S+'sci4.png'); print(errs)
        await b.close()
asyncio.run(main())
