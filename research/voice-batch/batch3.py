import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page()
        await pg.goto('http://127.0.0.1:5180/#home'); await pg.wait_for_timeout(1200)
        data = await pg.evaluate("""(() => {
          const story = new Set(), words = new Set();
          for (const s of stories) {
            story.add(s.title + '.');
            for (const page of s.pages) for (const t of page) {
              for (const m of t.matchAll(/[^.!?]+[.!?]?/g)) if (m[0].trim()) story.add(m[0].trim());
              for (const w of t.split(/\\s+/)) { const c = w.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g,''); if (c) words.add(c); }
            }
          }
          const animals = new Set();
          for (let n = 0; n < 40; n++) try { patternKinds(n).forEach(k => animals.add(k.replace('-', ' '))) } catch (e) {}
          ['octopus','dolphin','hammerhead'].forEach(a => animals.add(a));
          return { story: [...story], words: [...words], animals: [...animals] };
        })()""")
        await b.close()
    json.dump(data, open('/home/claude/voicegen/batch3-src.json', 'w'), indent=1, ensure_ascii=False)
    print(len(data['story']), sum(map(len, data['story'])), len(data['words']), data['animals'])
asyncio.run(main())
