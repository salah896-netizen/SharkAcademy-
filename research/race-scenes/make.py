"""Race scenery tiles (29 Oct 2026). Writes dist/assets/race/<track>-far.svg and <track>-floor.svg.

Each tile repeats seamlessly sideways: every shape sits inside the tile, and the ground line is a
wave whose period divides the tile width, so the left and right edges meet at the same height.
The far tile is a slow parallax layer (distant scenery); the floor tile scrolls with the race.
Painted style: soft radial shading, outline in a darker shade of the fill, soft shadows.
Run: python3 research/race-scenes/make.py
"""
import math, os, random

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'dist', 'assets', 'race')

def hx(h): return [int(h[i:i + 2], 16) for i in (1, 3, 5)]
def mix(a, b, k): return '#' + ''.join(f'{round(x + (y - x) * k):02x}' for x, y in zip(hx(a), hx(b)))
def light(c, k=.34): return mix(c, '#ffffff', k)
def dark(c, k=.3): return mix(c, '#000000', k)

class Svg:
    def __init__(s, w, h):
        s.w, s.h, s.defs, s.body, s.g = w, h, [], [], {}
    def fill(s, col):
        if col not in s.g:
            gid = f'g{len(s.g)}'
            s.g[col] = gid
            s.defs.append(f'<radialGradient id="{gid}" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="{light(col)}"/>'
                          f'<stop offset=".55" stop-color="{col}"/><stop offset="1" stop-color="{dark(col, .2)}"/></radialGradient>')
        return f'url(#{s.g[col]})'
    def shape(s, tag, attrs, col, flat=False, op=None, w=2.2):
        a = ' '.join(f'{k}="{v}"' for k, v in attrs.items())
        o = f' opacity="{op}"' if op is not None else ''
        if flat:
            s.body.append(f'<{tag} {a} fill="{col}"{o}/>')
        else:
            s.body.append(f'<{tag} {a} fill="{s.fill(col)}" stroke="{dark(col, .42)}" stroke-width="{w}" stroke-linejoin="round"{o}/>')
    def p(s, d, col, **k): s.shape('path', {'d': d}, col, **k)
    def c(s, x, y, r, col, **k): s.shape('circle', {'cx': x, 'cy': y, 'r': r}, col, **k)
    def e(s, x, y, rx, ry, col, **k): s.shape('ellipse', {'cx': x, 'cy': y, 'rx': rx, 'ry': ry}, col, **k)
    def line(s, d, col, w=2, op=None):
        o = f' opacity="{op}"' if op is not None else ''
        s.body.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"{o}/>')
    def raw(s, t): s.body.append(t)
    def lingrad(s, gid, stops):
        s.defs.append(f'<linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1">' +
                      ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops) + '</linearGradient>')
    def save(s, name):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{s.w}" height="{s.h}" viewBox="0 0 {s.w} {s.h}">'
               f'<defs>{"".join(s.defs)}</defs>{"".join(s.body)}</svg>\n')
        with open(os.path.join(OUT, name), 'w') as f: f.write(svg)

def wave(w, y, amp, period, top=0):
    """A closed ground shape: a smooth wave along y (repeating every `period`), filled down to the bottom."""
    pts, n = [], int(w / period)
    d = f'M0 {y}'
    for i in range(n):
        x0 = i * period
        d += f' Q{x0 + period / 4} {y - amp} {x0 + period / 2} {y} T{x0 + period} {y}'
    return d

# ------------------------------------------------------------------ pieces
def kelp(s, x, base, h, col, flip=1, wobble=10):
    d = (f'M{x} {base}Q{x - wobble * flip} {base - h * .35} {x + 3 * flip} {base - h * .6}'
         f'Q{x + wobble * 1.3 * flip} {base - h * .85} {x + 1 * flip} {base - h}'
         f'Q{x + 16 * flip} {base - h * .8} {x + 13 * flip} {base - h * .55}Q{x + 9 * flip} {base - h * .3} {x + 14 * flip} {base}Z')
    s.p(d, col)

def shell(s, x, y, k, col='#f3c9b4'):
    s.p(f'M{x - 9 * k} {y + 4 * k}Q{x - 10 * k} {y - 8 * k} {x} {y - 9 * k}Q{x + 10 * k} {y - 8 * k} {x + 9 * k} {y + 4 * k}Z', col)
    s.line(f'M{x - 5 * k} {y + 3 * k}L{x - 3 * k} {y - 6 * k}M{x} {y + 3 * k}V{y - 8 * k}M{x + 5 * k} {y + 3 * k}L{x + 3 * k} {y - 6 * k}', dark(col, .3), 1.2 * k)

def star(s, x, y, k, col='#f39a62'):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        r = (4.6 if i % 2 else 11) * k
        pts.append(f'{x + math.cos(a) * r:.1f} {y + math.sin(a) * r:.1f}')
    s.p('M' + 'L'.join(pts) + 'Z', col)

def branch_coral(s, x, base, h, col):
    w = h * .14
    d = (f'M{x - w} {base}Q{x - w} {base - h * .5} {x - h * .32} {base - h * .7}Q{x - h * .42} {base - h * .78} {x - h * .36} {base - h * .9}'
         f'Q{x - h * .26} {base - h * .86} {x - h * .2} {base - h * .7}Q{x - w * .5} {base - h * .55} {x - w * .4} {base - h * .78}'
         f'Q{x - w} {base - h * 1.02} {x + w * .4} {base - h}Q{x + w} {base - h * .8} {x + w * .6} {base - h * .6}'
         f'Q{x + h * .2} {base - h * .66} {x + h * .3} {base - h * .84}Q{x + h * .42} {base - h * .82} {x + h * .38} {base - h * .66}'
         f'Q{x + h * .3} {base - h * .5} {x + w} {base - h * .36}Q{x + w} {base - h * .2} {x + w} {base}Z')
    s.p(d, col)

def brain_coral(s, x, base, r, col):
    s.p(f'M{x - r} {base}Q{x - r} {base - r * 1.2} {x} {base - r * 1.2}Q{x + r} {base - r * 1.2} {x + r} {base}Z', col)
    for i in range(3):
        yy = base - r * (.3 + i * .28)
        s.line(f'M{x - r * .7} {yy}Q{x - r * .35} {yy - 6} {x} {yy}T{x + r * .7} {yy}', dark(col, .25), 1.6, .8)

def anemone(s, x, base, h, col, tip):
    for i in range(7):
        a = (i - 3) * .28
        tx, ty = x + math.sin(a) * h, base - math.cos(a) * h
        s.line(f'M{x} {base - h * .25}Q{x + math.sin(a) * h * .4} {base - h * .7} {tx:.1f} {ty:.1f}', col, 5)
        s.c(round(tx, 1), round(ty, 1), 3.2, tip, flat=True)
    s.e(x, base - 2, h * .32, h * .18, dark(col, .1))

def rock(s, x, base, w, h, col):
    s.p(f'M{x - w} {base}Q{x - w * 1.05} {base - h * .6} {x - w * .5} {base - h * .9}Q{x - w * .1} {base - h * 1.1} {x + w * .4} {base - h * .9}'
        f'Q{x + w * 1.05} {base - h * .65} {x + w} {base}Z', col)
    s.line(f'M{x - w * .5} {base - h * .7}Q{x - w * .2} {base - h * .88} {x + w * .2} {base - h * .86}', '#ffffff', 2.4, .35)

def glow(s, x, y, r, col):
    s.raw(f'<circle cx="{x}" cy="{y}" r="{r * 2.6}" fill="{col}" opacity=".16"/><circle cx="{x}" cy="{y}" r="{r}" fill="{col}" opacity=".95"/>')

def bubbles(s, pts, col='#ffffff', op=.3):
    for x, y, r in pts:
        s.raw(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{col}" fill-opacity="{op}" stroke="{col}" stroke-opacity=".7" stroke-width="1.2"/>'
              f'<circle cx="{x - r * .35:.1f}" cy="{y - r * .35:.1f}" r="{r * .28:.1f}" fill="#fff" fill-opacity=".8"/>')

def far_fish(s, x, y, k, col, op=.35, flip=False):
    sx = -k if flip else k
    s.raw(f'<g transform="translate({x} {y}) scale({sx} {k})" opacity="{op}"><path d="M-14 0Q-4 -9 10 -5Q15 -2 15 0Q15 2 10 5Q-4 9 -14 0Z M-12 0L-21 -7Q-19 0 -21 7Z" fill="{col}"/></g>')

# ------------------------------------------------------------------ tracks
W = 1200
random.seed(29)

def lagoon():
    far = Svg(W, 300)
    far.p(wave(W, 230, 18, 400) + f' V300 H0 Z', '#7fcad3', flat=True, op=.55)
    for x, h in [(70, 120), (300, 90), (520, 140), (790, 100), (1010, 130)]:
        kelp(far, x, 300, h, '#8cc9a4', flip=1 if x % 2 else -1)
    for x, r in [(180, 34), (660, 28), (930, 40)]:
        brain_coral(far, x, 300, r, '#e7b9a6')
    for x, y in [(240, 120), (262, 132), (250, 146), (870, 90), (890, 102)]:
        far_fish(far, x, y, 1.2, '#2f7f92', .3)
    bubbles(far, [(420, 140, 5), (430, 112, 3.5), (1100, 160, 6), (1112, 128, 4)])
    far.save('lagoon-far.svg')

    fl = Svg(W, 120)
    fl.lingrad('sand', [(0, '#f6e6bb'), (1, '#e3cb92')])
    fl.raw(f'<path d="{wave(W, 34, 8, 300)} V120 H0 Z" fill="url(#sand)"/>')
    fl.line(wave(W, 34, 8, 300), '#fff6dc', 3, .7)
    for x in range(40, W, 120):
        fl.raw(f'<ellipse cx="{x + random.randint(-20, 20)}" cy="{random.randint(70, 105)}" rx="{random.randint(14, 30)}" ry="3" fill="#cdb27a" opacity=".45"/>')
    for x, h, col in [(60, 70, '#6cb256'), (78, 48, '#8bc98f'), (520, 64, '#6cb256'), (940, 76, '#6cb256'), (958, 52, '#8bc98f')]:
        kelp(fl, x, 44, h, col, flip=-1 if x % 3 else 1)
    for x in (230, 690, 1120): shell(fl, x, 52, 1.4, random.choice(['#f3c9b4', '#f6c8d6', '#fbe3d8']))
    for x in (380, 820): star(fl, x, 60, 1.3, '#f39a62')
    for x in (150, 610, 1060): fl.e(x, 54, 9, 5, '#c9b9a6')
    fl.save('lagoon-floor.svg')

def reef():
    far = Svg(W, 300)
    far.p(wave(W, 220, 22, 400) + ' V300 H0 Z', '#3f9bb4', flat=True, op=.5)
    for x, h, col in [(90, 150, '#d98aa0'), (330, 120, '#e3a46e'), (610, 160, '#b88ad2'), (880, 130, '#d98aa0'), (1080, 110, '#e3a46e')]:
        branch_coral(far, x, 300, h, col)
    for x, r, col in [(220, 40, '#e9c271'), (470, 32, '#e78a76'), (760, 44, '#e9c271'), (1000, 30, '#e78a76')]:
        brain_coral(far, x, 300, r, col)
    for i, (x, y) in enumerate([(160, 70), (178, 82), (196, 66), (700, 100), (718, 112), (1140, 60)]):
        far_fish(far, x, y, 1.1, ['#f39039', '#f5c63c', '#ffffff'][i % 3], .45)
    bubbles(far, [(540, 120, 5), (552, 92, 3.5), (40, 150, 5)])
    far.save('reef-far.svg')

    fl = Svg(W, 120)
    fl.lingrad('sand', [(0, '#f1d0a6'), (1, '#d9ad7c')])
    fl.raw(f'<path d="{wave(W, 40, 9, 300)} V120 H0 Z" fill="url(#sand)"/>')
    fl.line(wave(W, 40, 9, 300), '#ffeacd', 3, .6)
    branch_coral(fl, 80, 54, 80, '#ee8a76')
    brain_coral(fl, 190, 56, 26, '#f5c63c')
    anemone(fl, 330, 58, 34, '#c77dd0', '#fbe0ff')
    branch_coral(fl, 520, 54, 70, '#f39a62')
    brain_coral(fl, 640, 56, 22, '#ee8a76')
    anemone(fl, 790, 58, 30, '#6fc3b0', '#e6fff7')
    branch_coral(fl, 960, 54, 84, '#c77dd0')
    brain_coral(fl, 1090, 56, 28, '#f5c63c')
    for x in (430, 880): star(fl, x, 74, 1.2, '#e9603f')
    for x in (260, 720, 1150): shell(fl, x, 78, 1.2, '#fbe3d8')
    fl.save('reef-floor.svg')

def ocean():
    far = Svg(W, 300)
    # a distant whale and shoals, very soft
    far.raw('<g opacity=".22"><path d="M280 120Q330 88 420 98Q470 104 492 92L506 76Q514 102 500 112Q430 140 330 134Q290 132 280 120Z" fill="#d6ecf6"/></g>')
    for cx, cy in [(760, 80), (980, 150)]:
        for i in range(14):
            far_fish(far, cx + random.randint(-60, 60), cy + random.randint(-26, 26), .8, '#cfe9f6', .3, flip=True)
    far.p(wave(W, 250, 14, 600) + ' V300 H0 Z', '#16507a', flat=True, op=.6)
    for x in (140, 640, 1060):
        rock(far, x, 300, 70, 70, '#2a6386')
    bubbles(far, [(560, 200, 5), (572, 170, 3.5), (100, 60, 4)], '#cfe9f6', .25)
    far.save('ocean-far.svg')

    fl = Svg(W, 120)
    fl.lingrad('sea', [(0, '#2f6f96'), (1, '#173f62')])
    fl.raw(f'<path d="{wave(W, 44, 7, 400)} V120 H0 Z" fill="url(#sea)"/>')
    fl.line(wave(W, 44, 7, 400), '#7fb6d4', 2.4, .5)
    for x, w, h in [(110, 46, 40), (470, 34, 28), (760, 54, 44), (1080, 38, 32)]:
        rock(fl, x, 60, w, h, '#4a7896')
    for x, h in [(260, 50), (620, 60), (920, 46)]:
        kelp(fl, x, 54, h, '#3f8f8a')
    for x in (360, 860): shell(fl, x, 74, 1.1, '#cfe0ea')
    fl.save('ocean-floor.svg')

def trench():
    far = Svg(W, 300)
    # rounded rock spires, shaded, with a faint rim of light on one side
    for x, w, h in [(120, 70, 210), (420, 90, 160), (720, 60, 230), (1000, 100, 180)]:
        far.p(f'M{x - w} 300Q{x - w * .8} {300 - h * .45} {x - w * .35} {300 - h * .7}Q{x - w * .2} {300 - h * 1.02} {x + w * .05} {300 - h}'
              f'Q{x + w * .3} {300 - h * .92} {x + w * .35} {300 - h * .62}Q{x + w * .8} {300 - h * .4} {x + w} 300Z', '#1c3c55', op=.9)
        far.line(f'M{x - w * .3} {300 - h * .66}Q{x - w * .12} {300 - h * .96} {x + w * .02} {300 - h * .97}', '#4f8aa6', 2.4, .45)
    for x, y, col in [(60, 60, '#7ff3e1'), (300, 30, '#fbe48a'), (560, 90, '#7ff3e1'), (860, 40, '#c78be0'), (1130, 110, '#7ff3e1')]:
        glow(far, x, y, 2.6, col)
    # a far-off anglerfish lure
    far.raw('<g opacity=".55"><path d="M600 170Q612 150 630 148" fill="none" stroke="#5f7f92" stroke-width="2"/>'
            '<circle cx="632" cy="147" r="10" fill="#fbe48a" opacity=".2"/><circle cx="632" cy="147" r="4" fill="#fbe48a"/></g>')
    far.save('trench-far.svg')

    fl = Svg(W, 120)
    fl.lingrad('rock', [(0, '#1d3446'), (1, '#0a1622')])
    fl.raw(f'<path d="{wave(W, 42, 10, 300)} V120 H0 Z" fill="url(#rock)"/>')
    fl.line(wave(W, 42, 10, 300), '#3b6a7e', 2, .6)
    for x, w, h in [(90, 40, 34), (560, 52, 40), (1010, 44, 30)]:
        rock(fl, x, 58, w, h, '#2c4658')
    for x, col, tip in [(260, '#2b8f88', '#7ff3e1'), (720, '#6d4a8f', '#e3b6ff'), (860, '#2b8f88', '#7ff3e1')]:
        anemone(fl, x, 60, 28, col, tip)
    for x, y, col in [(180, 70, '#7ff3e1'), (400, 84, '#fbe48a'), (640, 76, '#7ff3e1'), (1130, 86, '#c78be0')]:
        glow(fl, x, y, 3, col)
    fl.save('trench-floor.svg')

for f in (lagoon, reef, ocean, trench): f()
print('wrote', sorted(os.listdir(OUT)))
