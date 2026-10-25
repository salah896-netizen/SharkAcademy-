import asyncio
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True)).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running'); 0;")
        await pg.evaluate("startReadingMission('R-F-JP-02')"); await pg.wait_for_timeout(800)
        idx = await pg.evaluate("game.items[game.index].options.findIndex(o=>o!==game.items[game.index].answer)")
        await pg.tap(f'[data-quest-choice="{idx}"]'); await pg.wait_for_timeout(350)
        await pg.screenshot(path=S+'kid-wrong.png')
        await pg.evaluate("game.index=game.items.length-1; readingMission()"); await pg.wait_for_timeout(300)
        i = await pg.evaluate("game.items[game.index].options.indexOf(game.items[game.index].answer)")
        await pg.tap(f'[data-quest-choice="{i}"]'); await pg.wait_for_timeout(5000)
        await pg.screenshot(path=S+'kid-finish.png')
        print(await pg.evaluate("[...document.querySelectorAll('.kid-btn')].map(b=>b.className+' '+b.getAttribute('aria-label'))"), errs)
        await b.close()
asyncio.run(main())
