"""Download chosen Commons photos at 1280px and save as WebP with credits in photos.json."""
import json, sys, io, re
sys.argv = sys.argv[:1] + sys.argv[1:]
exec(open('/home/claude/photos/find.py').read().split("if __name__")[0])
from PIL import Image, ImageEnhance, ImageOps
picks = json.load(open('/home/claude/photos/picks.json'))
out = json.load(open('/home/claude/photos/photos.json')) if __import__('os').path.exists('/home/claude/photos/photos.json') else {}
D = '/home/claude/shark-academy/dist/assets/sharks/'
for key, idxs in picks.items():
    if key in out and [p['index'] for p in out[key]] == idxs: continue
    cands = json.load(open(f'/home/claude/photos/cand-{key}.json'))
    out[key] = []
    for n, i in enumerate(idxs):
        c = cands[i]
        url = re.sub(r'/(\d+)px-', '/1280px-', c['thumb']) if c['w'] > 1280 else c['url']
        im = Image.open(io.BytesIO(get(url))).convert('RGB')
        im.thumbnail((1280, 1280))
        im = ImageOps.autocontrast(im, cutoff=1, preserve_tone=True)  # lift dim underwater shots so the shark is clear
        name = f'{key}-{n + 1}.webp'
        im.save(D + name, 'WEBP', quality=80)
        out[key].append({'index': i, 'file': name, 'credit': c['artist'] or 'Wikimedia Commons contributor',
                         'page': c['page'], 'license': c['license'], 'title': c['title']})
        print(key, name, im.size)
    json.dump(out, open('/home/claude/photos/photos.json', 'w'), indent=1)
