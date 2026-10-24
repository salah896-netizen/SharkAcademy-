"""Generate the voice batch from lines.json. Resumable: existing files are skipped.
Never prints the API key."""
import hashlib, json, os, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

KEY = open('/home/claude/.secrets/el').read().strip()
VOICES = {k: v['voice_id'] for k, v in json.load(open('/home/claude/voicegen/voice-map.json'))['voices'].items()}
OUT = '/home/claude/shark-academy/dist/audio/voice'
lines = json.load(open('/home/claude/voicegen/lines.json'))
limit = int(sys.argv[1]) if len(sys.argv) > 1 else len(lines)


def target(line):
    if line.get('sound'):
        return f"{OUT}/sounds/{line['sound']}.mp3"
    slug = hashlib.sha1((line['speaker'] + '|' + line['text']).encode()).hexdigest()[:10]
    return f"{OUT}/{line['speaker']}/{slug}.mp3"


def generate(line):
    path = target(line)
    line['file'] = path.split('/dist/')[1]
    if os.path.exists(path) and os.path.getsize(path) > 2000:
        return 'skip', line
    os.makedirs(os.path.dirname(path), exist_ok=True)
    body = {'text': line['text'], 'model_id': 'eleven_v4'}
    if line.get('sound') == 'm':  # the approved "Mmmm!" used steadier settings
        body['voice_settings'] = {'stability': 0.9, 'similarity_boost': 0.75, 'style': 0}
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICES[line['speaker']]}?output_format=mp3_44100_128",
        data=json.dumps(body).encode(), headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            open(path, 'wb').write(data)
            return 'ok', line
        except urllib.error.HTTPError as e:
            msg = e.read()[:300].decode(errors='replace')
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(4 * (attempt + 1))
                continue
            return f'error {e.code}: {msg}', line
        except Exception as e:  # network hiccup
            if attempt < 3:
                time.sleep(4)
                continue
            return f'error {e}', line


results = {'ok': 0, 'skip': 0, 'error': 0}
with ThreadPoolExecutor(max_workers=2) as pool:
    for status, line in pool.map(generate, lines[:limit]):
        key = status if status in results else 'error'
        results[key] += 1
        if key == 'error':
            print('FAILED', line['speaker'], repr(line['text'][:60]), status)
json.dump(lines, open('/home/claude/voicegen/lines.json', 'w'), indent=1)
print(results)
