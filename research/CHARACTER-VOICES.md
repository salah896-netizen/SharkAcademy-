# Recorded character voices

Family-supplied ElevenLabs exports added 22 October 2026. Original recordings copied without changing the audio.

- Milo: `dist/audio/milo-welcome.mp3`, 8.672625 seconds, mono MP3 44.1 kHz / 128 kbps. Supplied filename identifies “Odd Todd - Nervous Professor”, sp105 / s12 / sb75 / v4. These are filename labels, not verified API voice IDs or request parameters.
- Willa: `dist/audio/willa-welcome.mp3`, 9.404063 seconds, mono MP3 44.1 kHz / 128 kbps. Supplied filename identifies “Ruby B - Authentic Cockney London Female”, sp100 / s50 / sb75 / v4. Same caveat about filename labels.

- Gizmo: `dist/audio/gizmo-welcome.mp3`, 9.168938 seconds, mono MP3 44.1 kHz / 128 kbps. Supplied filename identifies “Goofy - Nasal, Fast-Paced and Energetic”, sp100 / s50 / sb75 / v4; labels are not verified API parameters.

- Tiggy: `dist/audio/tiggy-welcome.mp3`, mono MP3 44.1 kHz / 128 kbps. Supplied filename identifies “Jimbo - Thick Australian Accent”, sp100 / s49 / sb58 / v4; labels are not verified API parameters.

- Dash: `dist/audio/dash-welcome.mp3`, mono MP3 44.1 kHz / 128 kbps. Supplied filename identifies “mike”, sp104 / s50 / sb75 / v4; labels are not verified API parameters. Added 23 October 2026.

Tap Milo, Willa, Gizmo, Tiggy or Dash on the home reef to play their own greeting. The helpers’ section greetings also uses her recording. Parents offers a preview button for each supplied recording. No automatic playback on page load. Voice off blocks playback; muting, starting another voice, navigating or closing Parents stops it. Music ducks and the correct character’s talking animation runs only during playback. This is playback-timed mouth animation, not phoneme-level lip sync. Visible status is a playback label, not a transcript.

Other dialogue, story reading and lesson narration retain device text-to-speech. An MP3 does not supply a reusable speech model. More matching exported clips, or an authenticated ElevenLabs integration with the exact voice IDs, would be needed for consistent new dialogue. No ElevenLabs API credentials, calls, cloning or paid generation were introduced.

All five MP3s and recorded-voices.js are in offline cache v36. The service worker handles cached audio byte ranges for Safari. Existing progress is unchanged.
