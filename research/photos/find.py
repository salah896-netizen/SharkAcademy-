import json, sys, urllib.request, urllib.parse, re, io, os
from PIL import Image, ImageDraw
UA = {'User-Agent': 'SharkAcademyFamilyApp/1.0 (personal children\'s education app)'}
OUT = '/home/claude/photos'
import time
def fetch(url):
    for attempt in range(30):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code != 429: raise
            time.sleep(int(e.headers.get('retry-after') or 20) + 2)
    raise RuntimeError('rate limited')
def api(params):
    return json.loads(fetch('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({**params, 'format': 'json'})))
def get(url):
    time.sleep(0.5); return fetch(url)
OK = re.compile(r'^(CC BY(-SA)? [0-9.]+( [a-z]+)?|CC0|Public domain|PD.*)$', re.I)
def candidates(term, n=12):
    r = api({'action': 'query', 'generator': 'search', 'gsrnamespace': 6, 'gsrlimit': 40,
             'gsrsearch': term + ' filetype:bitmap', 'prop': 'imageinfo',
             'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 400})
    out = []
    for p in sorted(r.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0)):
        ii = p['imageinfo'][0]; m = ii.get('extmetadata', {})
        lic = m.get('LicenseShortName', {}).get('value', '')
        if ii['mime'] != 'image/jpeg' or ii['width'] < 1200 or not OK.match(lic.strip()): continue
        artist = re.sub('<[^>]+>', '', m.get('Artist', {}).get('value', '')).strip()
        out.append({'title': p['title'], 'thumb': ii['thumburl'].replace('thumb.wikimedia.org','upload.wikimedia.org').split('?')[0], 'url': ii['url'], 'w': ii['width'], 'h': ii['height'],
                    'license': lic, 'artist': artist[:120], 'page': ii['descriptionurl']})
        if len(out) >= n: break
    return out
def sheet(key, items):
    tiles = []
    for i, c in enumerate(items):
        try:
            im = Image.open(io.BytesIO(get(c['thumb']))).convert('RGB'); im.thumbnail((400, 280))
        except Exception: im = Image.new('RGB', (400, 280), 'grey')
        t = Image.new('RGB', (400, 300), 'white'); t.paste(im, (0, 0))
        ImageDraw.Draw(t).text((5, 283), f"{i} {c['w']}x{c['h']} {c['license']}", fill='black'); tiles.append(t)
    cols = 4; rows = (len(tiles) + cols - 1) // cols
    s = Image.new('RGB', (cols * 400, max(rows, 1) * 300), 'white')
    for i, t in enumerate(tiles): s.paste(t, ((i % cols) * 400, (i // cols) * 300))
    s.save(f'{OUT}/sheet-{key}.jpg', quality=70)
if __name__ == '__main__':
    key, term = sys.argv[1], sys.argv[2]
    items = candidates(term)
    json.dump(items, open(f'{OUT}/cand-{key}.json', 'w'), indent=1)
    sheet(key, items); print(key, len(items))
