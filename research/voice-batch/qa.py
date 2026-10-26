"""Checks every generated clip and writes dist/voice-manifest.js from the clips that pass."""
import json, subprocess, re, numpy as np

D = '/home/claude/shark-academy/dist/'
lines = json.load(open('/home/claude/voicegen/lines.json'))


def analyse(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'],
                         capture_output=True).stdout
    x = np.frombuffer(raw, np.int16).astype(float) / 32768
    if len(x) < 1600:
        return None
    fr = 400
    n = len(x) // fr
    frames = x[:n * fr].reshape(n, fr)
    rms = np.sqrt((frames ** 2).mean(1))
    active = rms > max(rms.max() * 0.08, 0.003)
    zcr = (np.abs(np.diff(np.sign(frames), axis=1)) > 0).mean(1)
    voiced = active & (zcr < 0.15)
    hiss = active & (zcr >= 0.25)
    return dict(seconds=len(x) / 16000, active=active.sum() * 0.025, voiced=voiced.sum() * 0.025,
                hiss=hiss.sum() * 0.025, peak=float(np.abs(x).max()),
                tail_cut=bool(active[-2:].any()))


SHORT_OK = {'Pop, pop, pop!', 'sh ch ck'}  # quick sound effects, checked by length
UNVOICED_STRETCH = {'s', 'f', 'sh'}
STOP_STYLE = {'t', 'p', 'ck', 'h', 'ch'}
manifest = {'lines': {}, 'sounds': {}}
problems = []
for line in lines:
    path = D + line['file']
    try:
        a = analyse(path)
    except Exception as e:
        a = None
    if not a:
        problems.append((line, 'missing or empty'))
        continue
    t = line['text']
    issue = None
    if line.get('sound'):
        sid = line['sound']
        if sid in UNVOICED_STRETCH and a['voiced'] > 0.1:
            issue = f"vowel heard in a pure hiss sound ({a['voiced']:.2f}s voiced)"
        if sid in STOP_STYLE and a['voiced'] > 0.35:
            issue = f"long vowel in a quick sound ({a['voiced']:.2f}s voiced)"
    else:
        words = len(re.findall(r"[\w']+", t))
        expected = max(0.5, words / 2.6)
        if a['active'] < expected * 0.35 and words > 2 and t not in SHORT_OK:
            issue = f"too short for the text ({a['active']:.1f}s for {words} words)"
        if a['seconds'] > expected * 3.2 + 1.5:
            issue = f"much longer than expected ({a['seconds']:.1f}s for {words} words)"
    if a['peak'] < 0.05:
        issue = 'nearly silent'
    if a['tail_cut']:
        issue = (issue + '; ' if issue else '') + 'may be cut off at the end'
    if issue:
        problems.append((line, issue))
        continue
    if line.get('sound'):
        manifest['sounds'][line['sound']] = line['file']
    else:
        key = line['speaker'] + '|' + re.sub(r'\s+', ' ', t.replace('‘', "'").replace('’', "'")
                                             .replace('“', '"').replace('”', '"')).strip().lower()
        manifest['lines'][key] = line['file']
        if key.endswith('?.'):
            manifest['lines'][key[:-1]] = line['file']  # voiceKey turns '?.' into '?'

open(D + 'voice-manifest.js', 'w').write(
    '/* Generated from the voice batch by voicegen/qa.py. Maps character + text to a recording. */\n'
    '// eslint-disable-next-line no-unused-vars\nvar voiceManifest = ' + json.dumps(manifest, indent=1, ensure_ascii=False) + ';\n')
print('passed lines', len(manifest['lines']), 'sounds', len(manifest['sounds']), 'problems', len(problems))
for line, issue in problems:
    print(' -', line['speaker'], repr(line['text'][:70]), '->', issue)
