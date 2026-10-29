"""Subject backdrops (29 Oct 2026): Willa's reading cove, Tiggy's counting reef and the story cove.
Writes dist/assets/reading-bg.svg, maths-bg.svg, stories-bg.svg (1200 x 840, used with
`center bottom / cover`, so scenery sits at the edges and along the bottom and the middle stays calm).
Same painted helpers as the race tiles (make.py). Run: python3 research/race-scenes/backdrops.py
"""
import math, os
from make import Svg, kelp, shell, star, rock, bubbles, branch_coral, brain_coral, anemone, glow, far_fish, light, dark

OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'dist', 'assets')
W, H = 1200, 840

def base(s, top, mid, bot, sand_top, sand_bot, back, rays=.5):
    s.lingrad('water', [(0, top), (.6, mid), (1, bot)])
    s.lingrad('ray', [(0, '#ffffff'), (1, '#ffffff00')])
    s.lingrad('sand', [(0, sand_top), (1, sand_bot)])
    s.raw(f'<rect width="{W}" height="{H}" fill="url(#water)"/>')
    s.raw(f'<path d="M170 0H260L120 840H-20Z M520 0H570L470 840H380Z M840 0H930L900 840H760Z" fill="url(#ray)" opacity="{rays}"/>')
    s.raw('<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"><path d="M80 70Q110 54 140 70T200 70"/><path d="M980 100Q1010 84 1040 100T1100 100"/></g>')
    s.raw(f'<path d="M0 660Q200 630 420 650T840 640T1200 630V840H0Z" fill="{back}"/>')
    s.raw('<path d="M0 730Q240 700 520 722T1000 716T1200 708V840H0Z" fill="url(#sand)"/>')
    s.raw(f'<g fill="{dark(sand_bot, .12)}" opacity=".45"><ellipse cx="360" cy="790" rx="30" ry="4"/><ellipse cx="760" cy="800" rx="36" ry="4"/></g>')

def letter_stone(s, x, y, ch, col, ink):
    s.e(x, y, 30, 22, col)
    s.raw(f'<text x="{x}" y="{y + 9}" text-anchor="middle" font-family="ui-rounded,Andika,system-ui,sans-serif" font-size="30" font-weight="800" fill="{ink}">{ch}</text>')
    s.line(f'M{x - 18} {y - 10}Q{x - 10} {y - 18} {x + 2} {y - 18}', '#ffffff', 3, .6)

def reading():
    s = Svg(W, H)
    base(s, '#e6f4f8', '#d3e9f1', '#bcdbe8', '#f1e3c4', '#dfc89a', '#c9dfe6')
    # letters drifting up in bubbles (top corners)
    # No letters in the scenery: a reading question must never find its answer in the background.
    bubbles(s, [(1080, 120, 14), (1110, 170, 9), (1092, 206, 6), (120, 160, 12), (140, 200, 7)])
    # left: seagrass and the giant clam-shell reading nook with a glowing pearl lamp
    for x, h, col in [(40, 300, '#6cb256'), (70, 220, '#8bc98f'), (100, 260, '#6cb256')]:
        kelp(s, x, 770, h, col)
    s.raw('<ellipse cx="270" cy="782" rx="120" ry="12" fill="#234a62" opacity=".14"/>')
    s.p('M160 770Q150 650 270 630Q390 650 380 770Z', '#f6c8d6')     # open upper shell
    for i in range(-3, 4):
        s.line(f'M270 768L{270 + i * 34} {640 + abs(i) * 6}', '#d98aa6', 2.4, .7)
    s.p('M150 770Q270 812 390 770Q380 790 270 798Q160 790 150 770Z', '#efb3c7')  # lower shell
    s.raw('<circle cx="270" cy="742" r="34" fill="#fff6c8" opacity=".35"/>')
    s.c(270, 748, 20, '#f6eefa')
    s.line('M262 740Q266 734 274 734', '#ffffff', 3, .9)
    # right: a message in a bottle half in the sand, letter stones, a starfish
    s.raw('<g transform="translate(1000 748) rotate(-24)">')
    s.p('M-60 -16H24Q40 -16 46 -8H62V8H46Q40 16 24 16H-60Q-72 16 -72 0Q-72 -16 -60 -16Z', '#bfe8dc', op=.92)
    s.raw('<rect x="62" y="-10" width="14" height="20" rx="3" fill="#b9824e" stroke="#7a4f2a" stroke-width="2"/>')
    s.raw('<rect x="-48" y="-9" width="62" height="18" rx="3" fill="#f3e7c9" stroke="#c9b58c" stroke-width="1.6"/>')
    s.line('M-40 -2H6M-40 4H-6', '#9eb4bd', 2)
    s.line('M-56 -10Q-30 -14 14 -12', '#ffffff', 3, .7)
    s.raw('</g>')
    for x, y, col in [(560, 784, '#d8cfc2'), (628, 792, '#cfd9d2'), (690, 786, '#d9cfd9')]:
        s.e(x, y, 24, 14, col)
        s.line(f'M{x - 14} {y - 6}Q{x - 6} {y - 12} {x + 4} {y - 12}', '#ffffff', 3, .6)
    star(s, 860, 790, 1.4, '#f39a62')
    for x, h, col in [(1130, 280, '#6cb256'), (1165, 200, '#8bc98f')]:
        kelp(s, x, 770, h, col, flip=-1)
    shell(s, 450, 792, 1.6, '#fbe3d8')
    bubbles(s, [(300, 560, 7), (316, 520, 4.5), (296, 486, 3.5), (1040, 560, 6), (1052, 528, 4)])
    s.save_to(os.path.join(OUT, 'reading-bg.svg'))

def maths():
    s = Svg(W, H)
    base(s, '#e8f6ef', '#d3ece1', '#bfe0d1', '#efe3c2', '#dac795', '#c4e0d3')
    # numbered buoys hanging from the surface (top corners)
    # Plain floats, no numbers: a counting question must never find its answer in the background.
    for x, y, col in [(60, 250, '#e0473d'), (1110, 220, '#3e8fd6'), (1160, 290, '#f5c63c')]:
        s.line(f'M{x} 0V{y - 18}', '#8fb3a5', 2.4)
        s.e(x, y, 22, 16, col)
        s.line(f'M{x - 12} {y - 6}Q{x - 6} {y - 12} {x + 4} {y - 12}', '#ffffff', 3, .8)
    # left: kelp with bead-like bubbles (an abacus of the sea), branching coral
    for x, h, col in [(40, 300, '#5f9e74'), (78, 230, '#7fbf93')]:
        kelp(s, x, 770, h, col)
    for i, y in enumerate(range(500, 700, 40)):
        s.c(130, y, 9, ['#f39039', '#f5c63c', '#e0473d', '#3e8fd6', '#5c9e6a'][i % 5])
    s.line('M130 480V720', '#8fb3a5', 2.2, .7)
    branch_coral(s, 230, 776, 110, '#ee8a76')
    brain_coral(s, 320, 778, 30, '#f5c63c')
    # middle: five shells in a row, ready to count
    for i in range(5):
        shell(s, 500 + i * 50, 790, 1.5, ['#fbe3d8', '#f6c8d6', '#fbe3d8', '#f6c8d6', '#fbe3d8'][i])
    # right: a five-armed starfish, a turtle rock and kelp
    star(s, 860, 782, 2.2, '#f39a62')
    rock(s, 990, 776, 60, 46, '#9cb8ae')
    for x, h, col in [(1130, 290, '#5f9e74'), (1165, 210, '#7fbf93')]:
        kelp(s, x, 770, h, col, flip=-1)
    bubbles(s, [(330, 560, 7), (346, 520, 4.5), (1020, 520, 6), (1032, 488, 4)])
    s.save_to(os.path.join(OUT, 'maths-bg.svg'))

def stories():
    s = Svg(W, H)
    base(s, '#ebe7f6', '#dcd6ee', '#c9c2e2', '#e9dfcc', '#d3c4a6', '#cfc8e3', rays=.35)
    # moonlight through the surface
    s.raw('<circle cx="960" cy="40" r="120" fill="#ffffff" opacity=".35"/><circle cx="960" cy="40" r="46" fill="#fffaf0" opacity=".8"/>')
    # distant shipwreck silhouette (right)
    # glowing jellyfish (top left)
    for x, y, k, col in [(140, 170, 1, '#e3b6f0'), (210, 260, .7, '#b6e3f0'), (1060, 420, .8, '#f0d0b6')]:
        s.raw(f'<g transform="translate({x} {y}) scale({k})"><circle r="60" fill="{col}" opacity=".25"/>'
              f'<path d="M-22 6Q-28 30 -18 56M-8 8Q-12 36 -2 62M8 8Q12 36 2 62M22 6Q28 30 18 56" fill="none" stroke="{dark(col, .2)}" stroke-width="4" stroke-linecap="round" opacity=".8"/>'
              f'<path d="M-38 8Q-38 -34 0 -34Q38 -34 38 8Q28 4 18 8Q8 3 0 8Q-8 3 -18 8Q-28 4 -38 8Z" fill="{col}" stroke="{dark(col, .35)}" stroke-width="2.4"/>'
              f'<path d="M-26 -12Q-20 -26 -6 -27" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/></g>')
    # left: kelp and an open storybook resting on a rock
    for x, h, col in [(40, 280, '#8d7fb8'), (78, 210, '#a99bd0')]:
        kelp(s, x, 770, h, col)
    rock(s, 260, 776, 90, 56, '#a9a2c4')
    s.p('M190 724Q225 708 260 718Q295 708 330 724L326 744Q295 732 260 742Q225 732 194 744Z', '#fbf6ea')
    s.line('M260 718V742', '#c9b58c', 1.6)
    s.line('M206 724Q230 718 250 724M270 724Q290 718 314 724', '#9eb4bd', 2)
    s.raw('<g fill="#fff6c8"><path d="M240 690l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="M290 676l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>')
    # right: anemones that glow softly, shells
    anemone(s, 1060, 780, 34, '#c77dd0', '#fbe0ff')
    for x, h, col in [(1140, 290, '#8d7fb8'), (1170, 200, '#a99bd0')]:
        kelp(s, x, 770, h, col, flip=-1)
    shell(s, 600, 792, 1.6, '#fbe3d8'); star(s, 720, 786, 1.4, '#f3a6a0')
    bubbles(s, [(330, 560, 7), (346, 520, 4.5), (1000, 520, 6), (1012, 488, 4)])
    s.save_to(os.path.join(OUT, 'stories-bg.svg'))

def save_to(self, path):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" preserveAspectRatio="xMidYMax slice">'
           f'<defs>{"".join(self.defs)}</defs>{"".join(self.body)}</svg>\n')
    with open(path, 'w') as f: f.write(svg)
Svg.save_to = save_to

for f in (reading, maths, stories): f()
print('ok')
