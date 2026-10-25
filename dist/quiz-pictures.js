/* Real pictures in the shark quizzes (26 October 2026). The parent: "the images on the shark
 * quizzes (gills, cartilage, which is the whale shark) are very poor. They need to be real
 * sharks or drawn with detail."
 *
 * The encyclopedia's quiz answers, fact cards and Shark School pages used simple outline icons
 * (one shark outline for nearly everything), so a child who can't read couldn't tell the answers
 * apart. Now:
 *  - every quiz answer has its own picture: a real photo from the shark library for real things
 *    (fossil teeth, gill slits, a hammerhead school, an egg case…), or a detailed full-colour
 *    picture (Apple's emoji artwork on the iPad) for the silly options (a snorkel, a kitten, boots);
 *  - fact cards show photos of that shark instead of the outline icon;
 *  - Shark School pages and their shelf cards show a real photo of the topic.
 * The answer's words stay underneath, small, and are still read aloud.
 */
const sharkPic = (id, n = 0) => {
  const p = typeof sharkPhotoData !== 'undefined' ? sharkPhotoData[id]?.[n] : null;
  return p ? { photo: 'assets/' + p.file } : null;
};
const extraPic = name => ({ photo: 'assets/quiz/' + name + '.webp', extra: name });
const emojiPic = (emoji, badge) => ({ emoji, badge });
const swatchPic = colour => ({ swatch: colour });

// Answer text → picture. Wrong answers are deliberately silly, so they're easy to picture.
const answerPictures = {
  'Fossil teeth': () => sharkPic('megalodon', 0),
  'Photos of living ones': () => emojiPic('📷'),
  'A fish': () => emojiPic('🐟'),
  'A whale': () => emojiPic('🐋'),
  'Its tail': () => sharkPic('thresher', 0),
  'Its nose': () => emojiPic('👃'),
  School: () => ({ photo: 'assets/hammerhead.jpg' }),
  Forest: () => emojiPic('🌲'),
  'Its stripes': () => sharkPic('tiger', 0),
  'Its fur': () => emojiPic('🧸'),
  'Shoot forwards to catch food': () => sharkPic('goblin', 1),
  'Turn into a fishing net': () => emojiPic('🎣'),
  'A streamlined body': () => sharkPic('mako', 0),
  'A big square body': () => emojiPic('📦'),
  'Tiny drifting animals': () => sharkPic('basking', 0),
  Surfboards: () => emojiPic('🏄'),
  'Its fins': () => sharkPic('epaulette', 0),
  'A pair of boots': () => emojiPic('🥾'),
  'A twisty screw': () => sharkPic('portjackson', 2),
  'A round ball': () => emojiPic('⚽'),
  'It hides and waits': () => sharkPic('wobbegong', 0),
  'It chases them for hours': () => emojiPic('🏃'),
  'It gulps air': () => sharkPic('greynurse', 1),
  'It holds on to rocks': () => emojiPic('🪨'),
  'In the sea and in rivers': () => sharkPic('bull', 1),
  'Only in the deep sea': () => emojiPic('🌑'),
  Black: () => swatchPic('#151a1d'),
  Pink: () => swatchPic('#f49ac1'),
  'To stun fish': () => sharkPic('thresher', 0),
  'To dig holes': () => emojiPic('⛏️'),
  'In icy Arctic water': () => emojiPic('🧊'),
  'On warm coral reefs': () => emojiPic('🪸'),
  Spots: () => sharkPic('zebra', 0),
  Stripes: () => sharkPic('zebra', 1),
  // Shark School
  'Side to side': () => ({ ...sharkPic('white', 0), badge: '↔️' }),
  'Up and down like a whale': () => emojiPic('🐋', '↕️'),
  Gills: () => sharkPic('greynurse', 2),
  'A snorkel': () => emojiPic('🤿'),
  'Another tooth from a row behind': () => sharkPic('white', 2),
  'A seashell': () => emojiPic('🐚'),
  'Tiny scales called denticles': () => extraPic('skin') ,
  'Fluffy fur': () => emojiPic('🧸'),
  Smelling: () => emojiPic('👃'),
  'Breathing air': () => emojiPic('🫁'),
  'Weak electrical signals': () => emojiPic('⚡'),
  'Someone’s thoughts': () => emojiPic('💭'),
  'A pup': () => sharkPic('zebra', 1),
  'A kitten': () => emojiPic('🐱'),
  'No, some filter very small food': () => sharkPic('whale', 2),
  'Yes, always': () => emojiPic('🍖'),
  'Deep in the sea': () => sharkPic('goblin', 0),
  'In a tree': () => emojiPic('🌳'),
  'A journey between places': () => emojiPic('🗺️'),
  'Growing a new tooth': () => emojiPic('🦷'),
  'No, it is extinct': () => sharkPic('megalodon', 0),
  'Yes, it hides behind every reef': () => emojiPic('🙈'),
  'Keep rubbish out of the sea': () => emojiPic('🗑️'),
  'Throw plastic into the water': () => emojiPic('🥤'),
  // Shark School, harder questions (medium and hard)
  Cartilage: () => emojiPic('👃', '〰️'), // "the bendy material in your nose"
  'The same hard bone as yours': () => emojiPic('🦴'),
  'No, some can pump water while resting': () => sharkPic('wobbegong', 0),
  'Yes, every kind must': () => emojiPic('🏊'),
  'They eat different kinds of food': () => sharkPic('white', 2),
  'Every shark eats the same food': () => emojiPic('🍕'),
  'No, their shapes can differ': () => sharkPic('megalodon', 0),
  'Yes, they are all identical': () => emojiPic('👯'),
  'Water movements and vibrations': () => emojiPic('🌊'),
  'Words written on paper': () => emojiPic('📝'),
  'It spreads sensors over a wide area': () => sharkPic('hammerhead', 0),
  'It has a built-in torch': () => emojiPic('🔦'),
  'No, some give birth to live pups': () => sharkPic('zebra', 1),
  'Yes, all sharks do': () => emojiPic('🥚'),
  'Who eats what': () => sharkPic('whale', 2),
  'Their names': () => emojiPic('🏷️'),
  'The place and conditions where an animal lives': () => sharkPic('blacktip', 0),
  'Only the animal’s food': () => emojiPic('🍔'),
  'No, we need evidence from more sharks': () => emojiPic('🔍'),
  'Yes, all sharks take the same route': () => emojiPic('🛣️'),
  'No, that detail is unknown': () => emojiPic('❓'),
  'Yes, every colour is preserved': () => emojiPic('🎨'),
  'Young sharks use them while growing': () => sharkPic('blacktip', 0),
  'They are places for toy sharks only': () => emojiPic('🧸')
};
// Shark School topic → a real photo of that idea.
const topicPictures = {
  body: () => sharkPic('white', 0),
  gills: () => sharkPic('greynurse', 2),
  teeth: () => sharkPic('white', 2),
  skin: () => extraPic('skin'),
  senses: () => sharkPic('hammerhead', 0),
  electric: () => extraPic('pores'),
  babies: () => sharkPic('portjackson', 2),
  food: () => sharkPic('basking', 0),
  homes: () => sharkPic('goblin', 0),
  journeys: () => sharkPic('whale', 0),
  fossils: () => sharkPic('megalodon', 0),
  care: () => sharkPic('blacktip', 0)
};
// Photos that may not have arrived yet fall back to a library photo.
const pictureFallbacks = { skin: () => sharkPic('zebra', 0), pores: () => sharkPic('hammerhead', 1), care: () => sharkPic('blacktip', 0) };

function pictureHTML(pic, className = 'quiz-pic') {
  if (!pic) return '';
  if (pic.photo) {
    const fallback = pic.photo.match(/assets\/quiz\/(\w+)\.webp$/)?.[1];
    const alt = fallback && pictureFallbacks[fallback]?.()?.photo;
    return `<span class="${className} quiz-photo"><span class="quiz-photo-fill" style="background-image:url('${pic.photo}')"></span><img src="${pic.photo}" alt="" ${alt ? `onerror="this.onerror=null;this.src='${alt}';this.previousElementSibling.style.backgroundImage='url(${alt})'"` : ''}>${pic.badge ? `<b class="quiz-badge">${pic.badge}</b>` : ''}</span>`;
  }
  if (pic.swatch) return `<span class="${className} quiz-swatch" style="--swatch:${pic.swatch}"></span>`;
  return `<span class="${className} quiz-emoji">${pic.emoji}${pic.badge ? `<b class="quiz-badge">${pic.badge}</b>` : ''}</span>`;
}

function upgradeQuizPictures() {
  const hash = location.hash;
  if (!hash.startsWith('#museum')) return;
  const id = hash.split('/')[1] || '',
    topicId = id.startsWith('topic-') ? id.slice(6) : null,
    shark = !topicId && typeof sharkBook !== 'undefined' ? sharkBook.find(s => s.id === id) : null;

  // Answers: their own picture, the words small underneath.
  document.querySelectorAll('.shark-question [data-book-answer]:not([data-quiz-pic])').forEach(b => {
    const label = (b.getAttribute('aria-label') || b.querySelector('.answer-caption')?.textContent || b.textContent).trim();
    const pic = answerPictures[label]?.();
    b.dataset.quizPic = pic ? '1' : '0';
    b.setAttribute('aria-label', label);
    b.querySelector('.museum-pictogram')?.remove();
    b.querySelector('.answer-number')?.remove();
    if (pic) b.insertAdjacentHTML('afterbegin', pictureHTML(pic));
    if (!b.querySelector('.answer-caption'))
      b.insertAdjacentHTML('beforeend', `<span class="answer-caption">${label}</span>`);
    b.classList.add(pic ? 'has-quiz-pic' : 'text-answer');
  });

  // Fact cards and the question panel: real photos of this shark (or the topic) instead of icons.
  const photos = shark && typeof photosFor === 'function' ? photosFor(shark) : [];
  document
    .querySelectorAll('.shark-article .fact-grid > section, .shark-article > section, .shark-question')
    .forEach((panel, i) => {
      const icon = panel.querySelector(':scope > .museum-pictogram');
      if (!icon || panel.dataset.quizPic) return;
      panel.dataset.quizPic = '1';
      let pic = null;
      if (photos.length) pic = { photo: 'assets/' + photos[(i + 1) % photos.length].file };
      else if (topicId && panel.matches('.shark-question')) {
        icon.remove(); // the answers carry the pictures; a photo here would give the answer away
        return;
      } else if (topicId) pic = topicPictures[topicId]?.();
      if (pic) icon.outerHTML = pictureHTML(pic, 'quiz-panel-pic');
    });

  // Shark School page heading: a real photo of the topic.
  if (topicId) {
    const icon = document.querySelector('.school-heading .school-icon');
    const pic = topicPictures[topicId]?.();
    if (icon && pic && !icon.dataset.quizPic) {
      icon.dataset.quizPic = '1';
      icon.innerHTML = pictureHTML(pic, 'quiz-topic-pic');
      icon.classList.add('school-photo');
    }
  }
  // Credits for any extra photos on this page (grown-ups' sources).
  const sources = document.querySelector('.school-page .science-sources');
  if (sources && !sources.dataset.quizCredits && typeof quizPhotoData !== 'undefined') {
    const used = new Set(
      [...document.querySelectorAll('.school-page .quiz-photo img')]
        .map(img => img.getAttribute('src').match(/assets\/quiz\/(\w+)\.webp/)?.[1])
        .filter(Boolean)
    );
    const lines = [...used]
      .map(k => quizPhotoData[k])
      .filter(Boolean)
      .map(c => `Photo: ${c.credit}. <a href="${c.page}" target="_blank" rel="noopener">Original and licence</a> (${c.license}). Resized for this app.`);
    if (lines.length) {
      sources.dataset.quizCredits = '1';
      sources.insertAdjacentHTML('beforeend', `<p>${lines.join('<br>')}</p>`);
    }
  }
  // Shelf cards for Shark School topics.
  document.querySelectorAll('[data-topic] .school-icon:not([data-quiz-pic])').forEach(icon => {
    const pic = topicPictures[icon.closest('[data-topic]').dataset.topic]?.();
    icon.dataset.quizPic = '1';
    if (pic) {
      icon.innerHTML = pictureHTML(pic, 'quiz-topic-pic');
      icon.classList.add('school-photo');
    }
  });
}
new MutationObserver(() => requestAnimationFrame(upgradeQuizPictures)).observe(app, {
  childList: true,
  subtree: true
});
window.addEventListener('hashchange', () => setTimeout(upgradeQuizPictures, 60));

/* Science: real photos of the other sea animals (tuna, clownfish, turtle… from Wikimedia Commons)
 * replace the flat drawings, once each photo has been added to quizPhotoData. */
const seaAnimalPhotoKeys = { turtle: 'seaturtle' };
const preQuizSciencePicture = sciencePicture;
sciencePicture = function (key) {
  const p = typeof quizPhotoData !== 'undefined' ? quizPhotoData[seaAnimalPhotoKeys[key] || key] : null;
  if (p && !scienceArt[key])
    return `<span class="science-photo-frame"><span class="science-photo-fill" style="background-image:url('assets/${p.file}')"></span><img class="science-photo contain" src="assets/${p.file}" alt=""></span>`;
  return preQuizSciencePicture(key);
};
