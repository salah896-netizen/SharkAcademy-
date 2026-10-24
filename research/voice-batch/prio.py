import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page()
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1200)
        core = await pg.evaluate("""(()=>{const out=[];const add=t=>voiceSentences(t).forEach(x=>out.push(x));
          for(const s of sharkBook){add(s.name+'.');add(s.intro);s.facts.forEach(f=>{add(f[0]);add(f[1])});add(s.question);s.answers.forEach(a=>add(a+'.'));add('Let’s meet '+s.name+'.');}
          add('Prehistoric shark.'); add('Here’s today’s shark!'); add('Tap any card, and I’ll read it to you.');
          return out})()""")
        await b.close()
    miss = json.load(open('/home/claude/voicegen/museum-misses.json'))
    coreset = set(core)
    a = [k.split('|',1)[1] for k in miss if k.split('|',1)[1] in coreset]
    rest = [k.split('|',1)[1] for k in miss if k.split('|',1)[1] not in coreset]
    print('core', len(a), sum(map(len,a)), 'rest', len(rest), sum(map(len,rest)))
    json.dump({'core':a,'rest':rest}, open('/home/claude/voicegen/museum-prio.json','w'), indent=1)
asyncio.run(main())
