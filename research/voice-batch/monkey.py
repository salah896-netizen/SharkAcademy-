"""Play the app at random for a long time and log every line that would use the iPad voice."""
import asyncio, json, random, sys
from playwright.async_api import async_playwright
OUT = '/home/claude/voicegen/monkey-misses.json'
HOOK = """
window.__miss = window.__miss || {};
if (!window.__hooked) {
  window.__hooked = true;
  speakWithDevice = function (t, o = {}) {
    const sp = o.speaker || 'milo';
    for (const s of voiceSentences(String(t))) if (!voiceClipsFor(s, sp)) __miss[sp + '|' + s.trim()] = location.hash;
    setTimeout(() => (o.end || o.onend)?.(), 30);
  };
  playVoiceClips = function (files, text, o = {}) { setTimeout(() => o.end?.(), 30); };
  window.alert = () => {}; window.confirm = () => true;
}
0;"""
CLICK = """(() => {
  const els = [...document.querySelectorAll('button, a[href^="#"], [data-friend-route], [data-quest-choice], [data-topic], [data-photo], .tap-to-hear, .species-card, .shelf-card, [role=button]')]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && !e.disabled && !e.closest('#parent, .parent-area, dialog:not([open])') && getComputedStyle(e).visibility !== 'hidden' && r.bottom > 0 && r.top < innerHeight; });
  if (!els.length) return null;
  const e = els[Math.floor(Math.random() * els.length)];
  const r = e.getBoundingClientRect();
  return [r.x + r.width / 2, r.y + r.height / 2, (e.id || e.className || e.tagName).toString().slice(0, 40)];
})()"""
ROUTES = ['home', 'play', 'library', 'museum', 'museum/all', 'writing', 'draw', 'race', 'path', 'stories', 'collection', 'expeditions', 'legend', 'library/science']
async def run(seed, steps, setup):
    random.seed(seed)
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1194, 'height': 834}, has_touch=False)
        pg = await ctx.new_page()
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:120]))
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1200)
        await pg.evaluate(setup + '; 0;')
        await pg.reload(); await pg.wait_for_timeout(1500)
        await pg.evaluate(HOOK)
        await pg.mouse.click(597, 400); await pg.wait_for_timeout(3000)
        for i in range(steps):
            try:
                await pg.evaluate(HOOK)
                r = random.random()
                if r < 0.06:
                    await pg.evaluate(f"location.hash = '{random.choice(ROUTES)}'")
                elif r < 0.1:
                    c = await pg.query_selector('canvas')
                    if c:
                        bb = await c.bounding_box()
                        if bb:
                            await pg.mouse.move(bb['x'] + bb['width'] * .3, bb['y'] + bb['height'] * .5); await pg.mouse.down()
                            await pg.mouse.move(bb['x'] + bb['width'] * .7, bb['y'] + bb['height'] * .4, steps=6); await pg.mouse.up()
                else:
                    t = await pg.evaluate(CLICK)
                    if t: await pg.mouse.click(t[0], t[1])
                await pg.wait_for_timeout(random.choice([150, 300, 600, 1200]))
                if '#parent' in pg.url: await pg.evaluate("location.hash='home'")
            except Exception as e:
                pass
        miss = await pg.evaluate('window.__miss || {}')
        await b.close()
        return miss, errs
async def main():
    seeds = int(sys.argv[1]) if len(sys.argv) > 1 else 4
    steps = int(sys.argv[2]) if len(sys.argv) > 2 else 400
    setups = [
        "localStorage.clear()",
        "const s=JSON.parse(localStorage.getItem('haytham-v1')||'{}'); s.xp=47; localStorage.setItem('haytham-v1', JSON.stringify(s))",
        "const s=JSON.parse(localStorage.getItem('haytham-v1')||'{}'); s.xp=180; s.completed=Array.from({length:12},()=>({type:'reading-adventure',at:new Date().toISOString()})); localStorage.setItem('haytham-v1', JSON.stringify(s))",
        "0",
    ]
    total = {}
    try: total = json.load(open(OUT))
    except Exception: pass
    results = await asyncio.gather(*[run(s, steps, setups[s % len(setups)]) for s in range(seeds)])
    errs = set()
    for miss, e in results:
        total.update(miss); errs.update(e)
    json.dump(total, open(OUT, 'w'), indent=1, ensure_ascii=False)
    print('missing', len(total), 'chars', sum(len(k.split('|', 1)[1]) for k in total), 'errors', list(errs)[:6])
asyncio.run(main())
