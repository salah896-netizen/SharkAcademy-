/* Painted icons (29 October 2026): the small pictures on every lesson screen, in the same soft
 * painted style as the lesson pictures and sea animals. They replace the emoji 💡 (Help me), 🔊 (hear
 * the question again), 🐚 / ○ (the progress trail), ♫ (music) and the picture buttons' 🏠 🗺️ 🏁.
 *
 * paintedIcon(name) returns an inline <svg class="p-icon"> sized 1em, so it follows the font size of
 * the button it sits in. Names: bulb, speaker, speaker-blue (for pale buttons), shell, spot, note,
 * note-off, home, map, flag, star, trophy, tooth, coral, lock, medal-1, medal-2, medal-3. */
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
  // ---------------------------------------------------------------- rewards and race (29 Oct, v111)
  const medal = (g, a, b, c, edge, n) =>
    `<defs>${grad(g + 'm', a, b, c)}</defs>` +
    `<path d="M15 3H23L27 17H19Z" fill="#3e8fd6" stroke="#2a6aa6" stroke-width="1.5" stroke-linejoin="round"/>` +
    `<path d="M33 3H25L21 17H29Z" fill="#e0473d" stroke="#a83429" stroke-width="1.5" stroke-linejoin="round"/>` +
    `<circle cx="24" cy="30" r="14" fill="url(#${g}m)" stroke="${edge}" stroke-width="2.2"/>` +
    `<circle cx="24" cy="30" r="10" fill="none" stroke="${edge}" stroke-width="1.4" opacity=".55"/>` +
    `<text x="24" y="35.5" text-anchor="middle" font-family="ui-rounded,system-ui,sans-serif" font-size="15" font-weight="800" fill="${edge}">${n}</text>` +
    `<path d="M15 24Q18 19 23 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>`;
  Object.assign(I, {
    'speaker-blue': g =>
      `<defs>${grad(g + 'a', '#7fd0e6', '#2f8fbf', '#1d6a93')}</defs>` +
      `<path d="M7 19H14L25 9V39L14 29H7Q5 29 5 27V21Q5 19 7 19Z" fill="url(#${g}a)" stroke="#185b7e" stroke-width="1.8" stroke-linejoin="round"/>` +
      `<path d="M31 18Q35 24 31 30M36 13Q43 24 36 35" fill="none" stroke="#2f8fbf" stroke-width="3.6" stroke-linecap="round"/>` +
      `<path d="M9 21Q12 20 14 20" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>`,
    star: g =>
      `<defs>${grad(g + 'a', '#fff6c8', '#ffd24a', '#e8a21a')}</defs>` +
      `<path d="M24 4L29.6 16.6L43 18L32.8 27.2L35.8 40.6L24 33.6L12.2 40.6L15.2 27.2L5 18L18.4 16.6Z" fill="url(#${g}a)" stroke="#b9801a" stroke-width="2" stroke-linejoin="round"/>` +
      `<circle cx="20" cy="22" r="1.8" fill="#22313b"/><circle cx="28" cy="22" r="1.8" fill="#22313b"/>` +
      `<path d="M20.5 27Q24 30 27.5 27" fill="none" stroke="#22313b" stroke-width="1.6" stroke-linecap="round"/>` +
      `<path d="M15 19Q19 17 21 13" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>`,
    trophy: g =>
      `<defs>${grad(g + 'a', '#fff3b8', '#f2c14e', '#c98f22')}</defs>` +
      `<path d="M14 10H6Q5 22 16 24M34 10H42Q43 22 32 24" fill="none" stroke="#c98f22" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M13 6H35V16Q35 29 24 31Q13 29 13 16Z" fill="url(#${g}a)" stroke="#a87418" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M21 31H27V36H21Z" fill="url(#${g}a)" stroke="#a87418" stroke-width="1.8"/>` +
      `<rect x="14" y="36" width="20" height="7" rx="2" fill="#8a5a3a" stroke="#5e3c25" stroke-width="1.6"/>` +
      `<path d="M24 11L25.8 15H30L26.6 17.6L27.8 21.6L24 19.2L20.2 21.6L21.4 17.6L18 15H22.2Z" fill="#fff6d8" opacity=".9"/>` +
      `<path d="M16 9Q16 18 19 23" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`,
    tooth: g =>
      `<defs>${grad(g + 'a', '#fbf4e4', '#e3cfa2', '#b99a62')}</defs>` +
      `<ellipse cx="24" cy="44" rx="13" ry="2.4" fill="#0b2d3a" opacity=".14"/>` +
      `<path d="M8 10Q24 4 40 10Q38 14 36 16L26 42Q24 45 22 42L12 16Q10 14 8 10Z" fill="url(#${g}a)" stroke="#8d7444" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M9 10Q24 15 39 10Q24 9 9 10Z" fill="#7d6646" opacity=".75"/>` +
      `<path d="M13 17L16 15M18 25L20.5 23M27 23L29.5 25M32 15L35 17" stroke="#8d7444" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>` +
      `<path d="M16 16Q19 25 22 32" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`,
    coral: g =>
      `<defs>${grad(g + 'a', '#ffc7b8', '#f08068', '#c95a46')}${grad(g + 'b', '#ffe6a6', '#f5c24c', '#cf972a')}</defs>` +
      `<ellipse cx="24" cy="43" rx="17" ry="3" fill="#0b2d3a" opacity=".14"/>` +
      `<path d="M20 43Q18 32 12 26Q8 22 9 14Q14 14 15 22Q17 16 16 8Q22 9 20 20Q22 26 24 30Q24 22 28 16Q32 18 28 26Q27 32 28 43Z" fill="url(#${g}a)" stroke="#a5452f" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M30 43Q30 34 34 30Q32 24 37 20Q42 22 38 30Q41 30 42 34Q38 36 36 43Z" fill="url(#${g}b)" stroke="#a87418" stroke-width="2" stroke-linejoin="round"/>` +
      `<circle cx="11" cy="40" r="3.4" fill="#f6c8d6" stroke="#c97f98" stroke-width="1.4"/>` +
      `<path d="M13 16Q14 19 15 21" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>`,
    lock: g =>
      `<defs>${grad(g + 'a', '#fff3b8', '#e9b949', '#b98420')}</defs>` +
      `<path d="M15 21V15Q15 6 24 6Q33 6 33 15V21" fill="none" stroke="#8796a3" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M15 21V15Q15 6 24 6Q33 6 33 15V21" fill="none" stroke="#c6d0d7" stroke-width="1.6" stroke-linecap="round"/>` +
      `<rect x="10" y="20" width="28" height="22" rx="6" fill="url(#${g}a)" stroke="#9a6d18" stroke-width="2"/>` +
      `<circle cx="24" cy="29" r="3.4" fill="#5d4e37"/><path d="M22.6 30.5L21.6 36H26.4L25.4 30.5Z" fill="#5d4e37"/>` +
      `<path d="M14 24Q16 22 20 22" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>`,
    'medal-1': g => medal(g, '#fff3b8', '#f2c14e', '#c98f22', '#8a5f10', 1),
    'medal-2': g => medal(g, '#ffffff', '#d5dde3', '#9fadb8', '#5c6a75', 2),
    'medal-3': g => medal(g, '#ffd9b8', '#d98d52', '#a8612e', '#6e3c18', 3),
    // ---------------------------------------------------------------- encyclopaedia tabs (29 Oct, v116)
    shark: g =>
      `<defs>${grad(g + 'a', '#cfe0ea', '#8aa9bb', '#5f7f92')}</defs>` +
      `<path d="M38 24L46 14Q44 24 46 34Z" fill="#6f8fa2" stroke="#46616f" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M20 16L26 5Q30 12 30 17Z" fill="#6f8fa2" stroke="#46616f" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M2 26Q10 15 26 16Q36 17 41 24Q37 32 26 34Q10 36 2 26Z" fill="url(#${g}a)" stroke="#46616f" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M4 28Q20 35 37 28Q29 34 20 34Q10 34 4 28Z" fill="#f2efe6"/>` +
      `<path d="M19 31L14 39Q20 37 24 32Z" fill="#6f8fa2" stroke="#46616f" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<circle cx="10" cy="23" r="1.8" fill="#22313b"/><circle cx="9.5" cy="22.4" r=".6" fill="#fff"/>` +
      `<path d="M4 28Q8 30 13 28" fill="none" stroke="#22313b" stroke-width="1.4" stroke-linecap="round"/>` +
      `<path d="M14 19Q20 17 26 17.5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`,
    kangaroo: g =>
      `<defs>${grad(g + 'a', '#f2c597', '#d68f55', '#a8612e')}</defs>` +
      `<ellipse cx="24" cy="44" rx="16" ry="2.4" fill="#0b2d3a" opacity=".14"/>` +
      `<path d="M30 8L32 2L35 9Q40 10 41 14Q41 17 37 17L33 18Q34 24 32 29Q36 34 36 40L40 42Q42 44 38 44H28Q24 44 24 40Q18 40 14 36Q6 40 2 42Q8 34 14 30Q16 20 24 18Q26 12 30 8Z" fill="url(#${g}a)" stroke="#8a4f24" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M30 22L34 26" stroke="#8a4f24" stroke-width="2" stroke-linecap="round"/>` +
      `<circle cx="36" cy="12.5" r="1.6" fill="#22313b"/>` +
      `<path d="M22 22Q24 30 28 34" fill="none" stroke="#f6dcc0" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
    magnifier: g =>
      `<defs>${grad(g + 'a', '#ffffff', '#d8f1f6', '#9fd3e0')}${grad(g + 'w', '#d9a877', '#b9824e', '#8f5f34')}</defs>` +
      `<path d="M29 29L42 42" stroke="#6b4426" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M29 29L42 42" stroke="url(#${g}w)" stroke-width="5.4" stroke-linecap="round"/>` +
      `<circle cx="19" cy="19" r="14" fill="url(#${g}a)" fill-opacity=".8" stroke="#5c6a78" stroke-width="4"/>` +
      `<path d="M11 15Q13 10 18 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
    chest: g =>
      `<defs>${grad(g + 'a', '#d9a877', '#a8733f', '#7a4f2a')}${grad(g + 'b', '#fff3b8', '#f2c14e', '#c98f22')}</defs>` +
      `<path d="M6 20Q6 8 24 8Q42 8 42 20Z" fill="url(#${g}a)" stroke="#5e3c25" stroke-width="2" stroke-linejoin="round"/>` +
      `<rect x="6" y="20" width="36" height="20" rx="3" fill="url(#${g}a)" stroke="#5e3c25" stroke-width="2"/>` +
      `<path d="M6 21H42M14 9V40M34 9V40" stroke="#e6c574" stroke-width="3"/>` +
      `<rect x="20" y="17" width="8" height="10" rx="2" fill="url(#${g}b)" stroke="#8a5f10" stroke-width="1.4"/>` +
      `<circle cx="24" cy="21" r="1.4" fill="#5d4e37"/>` +
      `<circle cx="39" cy="8" r="3.6" fill="#f6f2fb" stroke="#b7b4d6" stroke-width="1.2"/><circle cx="38" cy="7" r="1" fill="#fff"/>`,
    octopus: g =>
      `<defs>${grad(g + 'a', '#f1d2f6', '#d79ce0', '#a86ab4')}</defs>` +
      `<path d="M12 28Q4 38 8 44M18 31Q14 40 18 46M24 32V46M30 31Q34 40 30 46M36 28Q44 38 40 44" fill="none" stroke="#b77bc4" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M10 24Q10 4 24 4Q38 4 38 24Q38 33 24 33Q10 33 10 24Z" fill="url(#${g}a)" stroke="#7a3f86" stroke-width="2"/>` +
      `<circle cx="19" cy="20" r="2.6" fill="#22313b"/><circle cx="29" cy="20" r="2.6" fill="#22313b"/>` +
      `<circle cx="18.2" cy="19.2" r=".9" fill="#fff"/><circle cx="28.2" cy="19.2" r=".9" fill="#fff"/>` +
      `<path d="M21 26Q24 28.5 27 26" fill="none" stroke="#7a3f86" stroke-width="1.6" stroke-linecap="round"/>` +
      `<path d="M15 10Q18 7 23 7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`
  });

  return function paintedIcon(name) {
    const draw = I[name];
    if (!draw) return '';
    return `<svg class="p-icon p-icon-${name}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${draw('pi' + ++uid)}</svg>`;
  };
})();
