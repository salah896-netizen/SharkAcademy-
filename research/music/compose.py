"""Calm ocean music for Haytham's Shark Academy (25 October 2026).

The parent asked for calm ocean music: soft, gentle and slow, livelier only in the race.
Every track is synthesised here from scratch (no samples, no third-party audio), so the family
owns it outright. Each piece:
  - uses a gentle pentatonic melody over a slow chord loop, so nothing ever clashes;
  - sits on a quiet wash of ocean (filtered noise that swells like waves);
  - is reverberated with circular convolution, so the reverb tail wraps round and the loop
    point is seamless;
  - is mastered quietly (the app sets the final volume and ducks under speech).

Run: python3 compose.py  -> dist/audio/<track>.m4a
"""
import subprocess, os
import numpy as np

SR = 32000
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'dist', 'audio')
NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}


def hz(name):
    """'A4' -> 440 Hz; 'C#5' etc."""
    pitch, octave = name[:-1], int(name[-1])
    return 440.0 * 2 ** ((NOTE[pitch] + 12 * (octave + 1) - 69) / 12)


def env(n, attack, release, total=None):
    total = total or n
    e = np.ones(n)
    a = min(n, int(attack * SR))
    r = min(n, int(release * SR))
    if a:
        e[:a] = np.linspace(0, 1, a) ** 2
    if r:
        e[-r:] *= np.linspace(1, 0, r) ** 2
    return e


def place(buf, sig, start):
    """Add sig into buf at sample `start`, wrapping round the end (loops stay seamless)."""
    n = len(buf)
    start %= n
    end = start + len(sig)
    if end <= n:
        buf[start:end] += sig
    else:
        cut = n - start
        buf[start:] += sig[:cut]
        buf[: end - n] += sig[cut:]


# ------------------------------------------------------------------ instruments
def pad(freqs, dur, level=0.06, bright=0.25):
    """Warm, slow pad: detuned sine stacks with a hint of upper partials."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.11):
            ff = f * 2 ** (det / 12)
            vib = 1 + 0.0015 * np.sin(2 * np.pi * 0.17 * t + f)
            ph = 2 * np.pi * ff * np.cumsum(vib) / SR
            out += np.sin(ph) + bright * 0.5 * np.sin(2 * ph) + bright * 0.18 * np.sin(3 * ph)
    out *= env(n, dur * 0.35, dur * 0.4)
    return level * out / (len(freqs) * 3)


def bell(f, dur=3.2, level=0.09):
    """Celesta / soft kalimba: inharmonic partials with gentle decay."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    parts = [(1, 1.0, 2.4), (2.0, 0.35, 3.5), (3.01, 0.12, 5.0), (4.17, 0.05, 7.0)]
    out = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-d * t) for m, a, d in parts)
    out *= env(n, 0.006, 0.4)
    return level * out


def marimba(f, dur=1.6, level=0.1):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.sin(2 * np.pi * f * t) * np.exp(-4.5 * t) + 0.25 * np.sin(2 * np.pi * f * 3.9 * t) * np.exp(-14 * t)
    return level * out * env(n, 0.004, 0.2)


def musicbox(f, dur=2.4, level=0.07):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.sin(2 * np.pi * f * t) * np.exp(-2.2 * t) + 0.3 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-4 * t)
    out += 0.08 * np.sin(2 * np.pi * f * 5.03 * t) * np.exp(-9 * t)
    return level * out * env(n, 0.003, 0.3)


def pluck_bass(f, dur=0.9, level=0.12):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) * np.exp(-6 * t)
    return level * out * np.exp(-3.2 * t) * env(n, 0.01, 0.15)


def shaker(dur=0.09, level=0.035, rng=None):
    n = int(dur * SR)
    noise = rng.standard_normal(n)
    noise = np.diff(noise, prepend=0)  # brighter
    return level * noise * np.exp(-np.arange(n) / (SR * 0.02))


def whale(f0, dur=4.5, level=0.035):
    """A slow, far-away glide, a hint of whale song (sharks area only)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    glide = f0 * (1 + 0.35 * np.sin(np.pi * t / dur) ** 2)
    vib = 1 + 0.006 * np.sin(2 * np.pi * 5 * t)
    ph = 2 * np.pi * np.cumsum(glide * vib) / SR
    return level * (np.sin(ph) + 0.2 * np.sin(2 * ph)) * env(n, dur * 0.4, dur * 0.45)


def ocean(n, rng, level=0.05, swell=0.09):
    """Waves: brown noise, low-passed, swelling slowly. Circularly smoothed so it loops."""
    white = rng.standard_normal(n)
    spec = np.fft.rfft(white)
    freqs = np.fft.rfftfreq(n, 1 / SR)
    shape = 1 / np.maximum(freqs, 20) ** 0.9
    shape[freqs > 1800] *= np.exp(-(freqs[freqs > 1800] - 1800) / 600)
    noise = np.fft.irfft(spec * shape, n)
    noise /= np.abs(noise).max()
    t = np.arange(n) / SR
    cycles = max(1, round(n / SR * swell))  # whole number of swells across the loop
    wave = 0.55 + 0.45 * np.sin(2 * np.pi * cycles * t / (n / SR)) ** 2
    return level * noise * wave


def bubbles(n, rng, count=6, level=0.03):
    out = np.zeros(n)
    for _ in range(count):
        d = int(0.05 * SR)
        t = np.arange(d) / SR
        f = rng.uniform(500, 900)
        blip = np.sin(2 * np.pi * (f * t + 2500 * t * t)) * np.exp(-t * 60)
        place(out, level * blip, int(rng.uniform(0, n)))
    return out


# ------------------------------------------------------------------ reverb (circular)
def reverb(x, rng, seconds=3.2, wet=0.35):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 6.9 / seconds)
    # Soften the highs of the tail so it sounds like water, not a bathroom.
    spec = np.fft.rfft(ir)
    f = np.fft.rfftfreq(n, 1 / SR)
    spec *= 1 / (1 + (f / 3500) ** 2)
    ir = np.fft.irfft(spec, n)
    ir /= np.sqrt((ir ** 2).sum())
    padded = np.zeros(len(x))
    padded[: min(n, len(x))] = ir[: len(x)]
    tail = np.fft.irfft(np.fft.rfft(x) * np.fft.rfft(padded), len(x))  # circular: wraps the loop
    return (1 - wet) * x + wet * tail * 1.6


# ------------------------------------------------------------------ composition
def melody(rng, scale, bars, beats_per_bar, density, rest_bias=0.35):
    """Gentle stepwise pentatonic line; phrases of 2 bars, the second answering the first."""
    notes = []
    idx = len(scale) // 2
    phrase = []
    for b in range(2):
        for beat in range(beats_per_bar):
            if rng.random() < density and not (beat == 0 and rng.random() < rest_bias):
                idx = int(np.clip(idx + rng.choice([-2, -1, -1, 0, 1, 1, 2]), 0, len(scale) - 1))
                phrase.append((b * beats_per_bar + beat, scale[idx]))
    for rep in range(bars // 2):
        for pos, note in phrase:
            # Every other phrase ends one step lower: a call and a gentle answer.
            if rep % 2 and pos >= 2 * beats_per_bar - 2:
                i = scale.index(note)
                note = scale[max(0, i - 1)]
            notes.append((rep * 2 * beats_per_bar + pos, note))
    return notes


TRACKS = {
    # name: tempo, beats per bar, chords (note names), scale for melody, instrument, extras
    'home': dict(
        bpm=60, beats=4, bars=16, seed=7, voice='bell', density=0.5,
        chords=[['D3', 'A3', 'F#4'], ['B2', 'F#3', 'D4'], ['G2', 'D3', 'B3'], ['A2', 'E3', 'C#4']],
        scale=['A4', 'B4', 'D5', 'E5', 'F#5', 'A5', 'B5'], ocean=0.05, bubbles=5),
    'learning': dict(
        bpm=56, beats=4, bars=16, seed=11, voice='bell', density=0.28,
        chords=[['C3', 'G3', 'E4'], ['A2', 'E3', 'C4'], ['F2', 'C3', 'A3'], ['G2', 'D3', 'B3']],
        scale=['G4', 'A4', 'C5', 'D5', 'E5', 'G5'], ocean=0.035, bubbles=3, level=0.85),
    'sharks': dict(
        bpm=54, beats=4, bars=16, seed=23, voice='bell', density=0.32,
        chords=[['A2', 'E3', 'C4'], ['F2', 'C3', 'A3'], ['D3', 'A3', 'F4'], ['E2', 'B2', 'G3']],
        scale=['E4', 'G4', 'A4', 'C5', 'D5', 'E5'], ocean=0.06, bubbles=4, whale=True),
    'writing': dict(
        bpm=58, beats=4, bars=16, seed=31, voice='marimba', density=0.3,
        chords=[['F2', 'C3', 'A3'], ['D3', 'A3', 'F4'], ['A#2', 'F3', 'D4'], ['C3', 'G3', 'E4']],
        scale=['C5', 'D5', 'F5', 'G5', 'A5', 'C6'], ocean=0.04, bubbles=3, level=0.85),
    'stories': dict(
        bpm=52, beats=3, bars=16, seed=43, voice='musicbox', density=0.55,
        chords=[['G2', 'D3', 'B3'], ['E2', 'B2', 'G3'], ['C3', 'G3', 'E4'], ['D3', 'A3', 'F#4']],
        scale=['D5', 'E5', 'G5', 'A5', 'B5', 'D6'], ocean=0.035, bubbles=2),
    'collection': dict(
        bpm=62, beats=4, bars=16, seed=59, voice='musicbox', density=0.55,
        chords=[['E3', 'B3', 'G#4'], ['C#3', 'G#3', 'E4'], ['A2', 'E3', 'C#4'], ['B2', 'F#3', 'D#4']],
        scale=['B4', 'C#5', 'E5', 'F#5', 'G#5', 'B5'], ocean=0.04, bubbles=6),
    # The race is the one lively piece: brisker, with a soft shaker and bouncing bass.
    'race': dict(
        bpm=100, beats=4, bars=16, seed=71, voice='marimba', density=0.75, rest=0.1,
        chords=[['G2', 'D3', 'B3'], ['E2', 'B2', 'G3'], ['C3', 'G3', 'E4'], ['D3', 'A3', 'F#4']],
        scale=['D5', 'E5', 'G5', 'A5', 'B5', 'D6'], ocean=0.025, bubbles=4, groove=True)
}


def compose(name, p):
    rng = np.random.default_rng(p['seed'])
    beat = 60 / p['bpm']
    bar = beat * p['beats']
    # A whole number of AAC frames (1024 samples), so the encoder adds no silence at the loop.
    n = int(round(bar * p['bars'] * SR / 1024)) * 1024
    mix = np.zeros(n)
    # Chords: one per bar, overlapping so the pad never drops out.
    for b in range(p['bars']):
        chord = [hz(x) for x in p['chords'][b % len(p['chords'])]]
        place(mix, pad(chord, bar * 1.6, level=0.07 if not p.get('groove') else 0.05), int(b * bar * SR))
    # Melody.
    voice = {'bell': bell, 'marimba': marimba, 'musicbox': musicbox}[p['voice']]
    step = beat if not p.get('groove') else beat / 2
    per_bar = p['beats'] if not p.get('groove') else p['beats'] * 2
    for pos, note in melody(rng, p['scale'], p['bars'], per_bar, p['density'], p.get('rest', 0.35)):
        place(mix, voice(hz(note)) * rng.uniform(0.75, 1.0), int(pos * step * SR))
    # Gentle low bass on each bar (lively bounce in the race).
    for b in range(p['bars']):
        root = hz(p['chords'][b % len(p['chords'])][0])
        if p.get('groove'):
            for k, mult in enumerate([1, 1, 2, 1]):
                place(mix, pluck_bass(root * mult, level=0.09), int((b * bar + k * beat) * SR))
            for k in range(8):
                place(mix, shaker(rng=rng, level=0.02 + 0.012 * (k % 2 == 0)), int((b * bar + k * beat / 2) * SR))
        else:
            place(mix, pluck_bass(root, dur=bar * 0.9, level=0.05), int(b * bar * SR))
    if p.get('whale'):
        for k in range(3):
            place(mix, whale(hz('A2') * rng.uniform(0.9, 1.2)), int(rng.uniform(0, n)))
    mix = reverb(mix, rng, seconds=3.6 if not p.get('groove') else 1.8, wet=0.4 if not p.get('groove') else 0.25)
    mix += ocean(n, rng, level=p['ocean'])
    mix += bubbles(n, rng, count=p['bubbles'])
    # Stereo: a little delay and gain difference for width; still mono-safe.
    left = mix
    d = int(0.011 * SR)
    right = np.roll(mix, d) * 0.97
    stereo = np.stack([left, right], axis=1)
    # Master gently: about -17 dBFS RMS (the old tracks were about -15), peaks under -3 dB.
    rms = np.sqrt((stereo ** 2).mean())
    stereo *= (10 ** (-17 / 20)) / rms * p.get('level', 1.0)
    peak = np.abs(stereo).max()
    if peak > 0.7:
        stereo *= 0.7 / peak
    return stereo, n / SR


# The app loops between LOOP_PAD and (end - LOOP_PAD). Wrapping the music round by that much at
# each end keeps the encoder's edge effects outside the loop, so it repeats without a click.
# atmosphere.js uses the same 0.064 s margin (2048 samples at 32 kHz).
LOOP_PAD = 2048


def write(name, stereo):
    stereo = np.concatenate([stereo[-LOOP_PAD:], stereo, stereo[:LOOP_PAD]])
    raw = (np.clip(stereo, -1, 1) * 32767).astype('<i2').tobytes()
    path = os.path.join(OUT, name + '.m4a')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-',
                    '-c:a', 'aac', '-b:a', '80k', '-movflags', '+faststart', path], input=raw, check=True)
    return path


if __name__ == '__main__':
    import sys
    names = sys.argv[1:] or list(TRACKS)
    for name in names:
        stereo, secs = compose(name, TRACKS[name])
        path = write(name, stereo)
        seam = np.abs(stereo[0] - stereo[-1]).max()  # of the loop itself (before padding)
        print(f'{name}: {secs:.1f}s, rms {20*np.log10(np.sqrt((stereo**2).mean())):.1f} dB, '
              f'peak {20*np.log10(np.abs(stereo).max()):.1f} dB, seam jump {seam:.4f}, '
              f'{os.path.getsize(path)//1024} KB')
