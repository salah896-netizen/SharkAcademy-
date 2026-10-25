import asyncio
from playwright.async_api import async_playwright
S='/tmp/claude-0/-home-claude/8a1a6cdc-5ebb-5852-9e7c-646cf95b0d2e/scratchpad/'
STUB="speakWithDevice=(t,o={})=>{window.__said=(window.__said||[]).concat(t);setTimeout(()=>o.end&&o.end(),20)}; playVoiceClips=(f,t,o={})=>{window.__said=(window.__said||[]).concat(t);setTimeout(()=>o.end&&o.end(),20)}; 0;"
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(); pg=await (await b.new_context(viewport={'width':1194,'height':834},has_touch=True,reduced_motion='reduce')).new_page()
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.querySelector('#tapToDive')?.remove(); document.body.classList.remove('intro-running');"+STUB)
        # Reading
        await pg.evaluate("startReadingMission('R-F-JP-02')"); await pg.wait_for_timeout(600)
        n0 = await pg.evaluate('game.items.length')
        wrong = await pg.evaluate("(()=>{const q=game.items[game.index];return [...document.querySelectorAll('[data-quest-choice]')].map(b=>+b.dataset.questChoice).filter(i=>q.options[i]!==q.answer)})()")
        await pg.click(f'[data-quest-choice="{wrong[0]}"]', force=True); await pg.wait_for_timeout(400)
        await pg.click(f'[data-quest-choice="{wrong[1]}"]', force=True); await pg.wait_for_timeout(300)
        await pg.screenshot(path=S+'shown.png')
        await pg.wait_for_timeout(1500)
        print('reading', 'items', n0, '->', await pg.evaluate('game&&game.items.length'), 'answered/advanced', await pg.evaluate('game&&[game.index, game.answered]'), 'said', await pg.evaluate('(window.__said||[]).slice(-2)'))
        # Science
        await pg.evaluate("window.__said=[]; startScienceMission('S-F-01')"); await pg.wait_for_timeout(600)
        wrong = await pg.evaluate("(()=>{const q=game.items[game.index];return [...document.querySelectorAll('[data-science-choice]')].map(b=>+b.dataset.scienceChoice).filter(i=>q.options[i]!==q.answer)})()")
        for w in wrong[:2]: await pg.click(f'[data-science-choice="{w}"]', force=True); await pg.wait_for_timeout(400)
        await pg.wait_for_timeout(1500)
        print('science', await pg.evaluate('game&&[game.index, game.items.length, game.items.at(-1).revisit]'), await pg.evaluate('(window.__said||[]).slice(-1)'))
        # Maths groups
        await pg.evaluate("window.__said=[]; requestedMathsLesson='M-F-08'; start('maths'); game.stage=1"); await pg.wait_for_timeout(700)
        ans = await pg.evaluate("game.items[game.index].answer")
        others = await pg.evaluate("[...document.querySelectorAll('[data-group-choice]')].map(b=>b.dataset.groupChoice)")
        print('maths groups', ans, others)
        w=[o for o in others if o!=ans]
        if w:
            await pg.click(f'[data-group-choice="{w[0]}"]', force=True); await pg.wait_for_timeout(400)
            await pg.click(f'[data-group-choice="{w[0]}"]', force=True); await pg.wait_for_timeout(1700)
            print('maths', await pg.evaluate('game&&[game.index, game.items.length, !!game.items.at(-1).revisit, game.answered]'))
        print('errors', errs); await b.close()
asyncio.run(main())
