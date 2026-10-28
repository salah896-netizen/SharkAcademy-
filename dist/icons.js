/* Painted icons (29 October 2026): the small pictures on every lesson screen, in the same soft
 * painted style as the lesson pictures and sea animals. They replace the emoji 💡 (Help me), 🔊 (hear
 * the question again), 🐚 / ○ (the progress trail), ♫ (music) and the picture buttons' 🏠 🗺️ 🏁.
 *
 * paintedIcon(name) returns an inline <svg class="p-icon"> sized 1em, so it follows the font size of
 * the button it sits in. Names: bulb, speaker, shell, spot, note, note-off, home, map, flag. */
const paintedIcon = (function () {
  let uid = 0;
  const grad = (id, a, b, c) =>
    `<radialGradient id="${id}" cx=".36" cy=".3" r=".9"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
  const I = {
    bulb: g =>
      `<defs>${grad(g + 'a', '#fff8cf', '#ffd84d', '#e9a91c')}${grad(g + 'b', '#ffffff', '#fff3b0', '#fff3b000')}</defs>` +
      `<circle cx="24" cy="20" r="19" fill="url(#${g}b)" opacity=".7"/>` +
      `<path d="M24 5Q37 5 37 18Q37 25 31 30Q29 32 29 35H19Q19 32 17 30Q11 25 11 18Q11 5 24 5Z" fill="url(#${g}a)" stroke="#b9821a" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M20 34Q20 24 24 20Q28 24 28 34" fill="none" stroke="#e79a1a" stroke-width="1.8" stroke-linecap="round"/>` +
      `<rect x="18" y="35" width="12" height="4.5" rx="2" fill="#a9b6bf" stroke="#6f7f8a" stroke-width="1.4"/>` +
      `<rect x="19" y="39.5" width="10" height="4" rx="2" fill="#93a2ad" stroke="#6f7f8a" stroke-width="1.4"/>` +
      `<path d="M16 13Q19 9 24 8.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>`,
    speaker: g =>
      `<defs>${grad(g + 'a', '#ffffff', '#f2f8fb', '#cfe2ea')}</defs>` +
      `<path d="M7 19H14L25 9V39L14 29H7Q5 29 5 27V21Q5 19 7 19Z" fill="url(#${g}a)" stroke="#d7eaf1" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<path d="M31 18Q35 24 31 30M36 13Q43 24 36 35" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>`,
    shell: g =>
      `<defs>${grad(g + 'a', '#ffe9dc', '#f7b99d', '#e48f6f')}</defs>` +
      `<ellipse cx="24" cy="43" rx="14" ry="2.5" fill="#0b2d3a" opacity=".14"/>` +
      `<path d="M24 41L8 22Q6 10 16 9Q20 4 24 8Q28 4 32 9Q42 10 40 22Z" fill="url(#${g}a)" stroke="#c46f52" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M24 40V10M24 40L15 12M24 40L33 12M24 40L10 20M24 40L38 20" fill="none" stroke="#d98466" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>` +
      `<path d="M14 13Q18 10 22 11" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>`,
    spot: () =>
      `<circle cx="24" cy="26" r="14" fill="#ffffff" fill-opacity=".55" stroke="currentColor" stroke-opacity=".6" stroke-width="3" stroke-dasharray="5 4" stroke-linecap="round"/>`,
    note: g =>
      `<defs>${grad(g + 'a', '#7fd0e6', '#2f8fbf', '#1d6a93')}</defs>` +
      `<path d="M18 34V12L38 7V29" fill="none" stroke="#1d6a93" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<ellipse cx="13.5" cy="35" rx="6.5" ry="5" transform="rotate(-18 13.5 35)" fill="url(#${g}a)" stroke="#185b7e" stroke-width="1.6"/>` +
      `<ellipse cx="33.5" cy="30" rx="6.5" ry="5" transform="rotate(-18 33.5 30)" fill="url(#${g}a)" stroke="#185b7e" stroke-width="1.6"/>` +
      `<path d="M18 16L38 11" stroke="#1d6a93" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M10 33Q11 30.5 14 30" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>`,
    'note-off': g =>
      `<g opacity=".5">${I.note(g)}</g><path d="M8 8L40 40" stroke="#c4553f" stroke-width="3.6" stroke-linecap="round"/>`,
    home: g =>
      `<defs>${grad(g + 'a', '#ffffff', '#f6efe0', '#dccdb0')}${grad(g + 'b', '#ff9a86', '#e8604a', '#b8432f')}</defs>` +
      `<path d="M10 22V40H38V22" fill="url(#${g}a)" stroke="#a88f68" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M5 24L24 7L43 24Q44 26 42 27L24 12L6 27Q4 26 5 24Z" fill="url(#${g}b)" stroke="#9e3a28" stroke-width="2" stroke-linejoin="round"/>` +
      `<rect x="20" y="28" width="8" height="12" rx="2.5" fill="#8a5a3a" stroke="#5e3c25" stroke-width="1.6"/>`,
    map: g =>
      `<defs>${grad(g + 'a', '#fffaf0', '#f3e2bd', '#d9c08c')}</defs>` +
      `<path d="M6 12L17 8L31 12L42 8V36L31 40L17 36L6 40Z" fill="url(#${g}a)" stroke="#a88a55" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M17 8V36M31 12V40" stroke="#c9ad75" stroke-width="1.6"/>` +
      `<path d="M11 30Q16 22 22 26Q28 30 33 20" fill="none" stroke="#b5683c" stroke-width="2.2" stroke-dasharray="1 4" stroke-linecap="round"/>` +
      `<path d="M33 15L37 19M37 15L33 19" stroke="#e0473d" stroke-width="2.6" stroke-linecap="round"/>` +
      `<circle cx="11" cy="31" r="2.6" fill="#5c9e6a"/>`,
    flag: g =>
      `<defs>${grad(g + 'a', '#ffffff', '#f4f4f4', '#d6d6d6')}</defs>` +
      `<path d="M11 6V44" stroke="#6b4a2f" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M12 8Q22 4 28 8Q34 12 42 8V26Q34 30 28 26Q22 22 12 26Z" fill="url(#${g}a)" stroke="#5b6670" stroke-width="1.8" stroke-linejoin="round"/>` +
      `<g fill="#26323a"><path d="M12 8Q17 6 20 6.4V15Q16 14.6 12 16.6Z"/><path d="M28 8Q31 10 34 10V18.6Q31 18.6 28 16.6Z"/><path d="M20 15Q24 15 28 16.6V26Q24 23.4 20 23.4Z"/><path d="M34 18.6Q38 18.4 42 17V26Q38 27.6 34 27.4Z"/></g>`
  };
  return function paintedIcon(name) {
    const draw = I[name];
    if (!draw) return '';
    return `<svg class="p-icon p-icon-${name}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${draw('pi' + ++uid)}</svg>`;
  };
})();
