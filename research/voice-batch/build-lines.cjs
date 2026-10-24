// Builds the exact list of lines to record, from the app's own source.
const fs = require('fs'), vm = require('vm'), D = '/home/claude/shark-academy/dist/';
const ctx = { state: { history: [], completed: [], discoveries: [], readingAdventures: [], xp: 0 }, location: { hash: '' }, render() {}, Date, stageFor: () => 1, makeQuestions: () => [], play() {}, finish() {}, writing() {}, advanceLearning() {}, libraryPage() {}, crewForRoute() {}, oceanSpecies: ['tuna'], seaAnimal: () => '', shuffled: x => x, sharkBook: [], save() {}, learningState: () => ({ maths: { baseline: 0 } }), app: {} };
vm.createContext(ctx);
for (const f of ['reading-adventure.js', 'lesson-pack.js', 'school-pack.js']) vm.runInContext(fs.readFileSync(D + f, 'utf8'), ctx);
const lines = [], seen = new Set();
const add = (speaker, text, group, settings = 'line') => {
  text = text.trim(); const k = speaker + '|' + text;
  if (!text || seen.has(k)) return; seen.add(k); lines.push({ speaker, text, group, settings });
};
for (const l of vm.runInContext('readingMissionLibrary', ctx).filter(l => l.school))
  for (const q of l.items) {
    add('willa', q.prompt, 'prompt'); add('willa', q.reveal, 'reveal'); add('willa', q.hint, 'hint');
    if (['rhyme', 'first', 'blend'].includes(q.kind)) q.options.forEach(o => add('willa', o.replace(/^(red|blue|yellow|big|small)-/, ''), 'picture name'));
  }
// Lesson-level lines that surround the clues.
add('willa', 'Good try, Haytham. Look at the letters again. Tap the light if you want a little help.', 'retry');
for (const [k, t] of Object.entries({ willa: 'Let’s go, Haytham! Let’s read together!', tiggy: 'Let’s go, Haytham! Let’s go counting!', gizmo: 'Let’s go, Haytham! Let’s discover sharks!', dash: 'Let’s go, Haytham! Let’s make sandy letters!', milo: 'Let’s go, Haytham!' })) add(k, t, 'tap line');
for (const sp of ['willa', 'milo']) for (const t of ['Chomp-tastic!', 'Speedy selection!', 'Wonderful work!', 'Great trick!', 'Awesome work, dude!']) add(sp, t, 'celebration');
// Race.
const racers = ['milo', 'willa', 'tiggy', 'gizmo', 'dash'], names = { milo: 'Milo', willa: 'Willa', tiggy: 'Tiggy', gizmo: 'Gizmo', dash: 'Dash' };
add('milo', 'Shark race! Choose a race track, Haytham.', 'race');
for (const t of ['Sunny Lagoon', 'Coral Reef', 'Open Ocean', 'Deep Trench']) add('milo', 'Who will race in ' + t + '?', 'race');
for (const r of racers) {
  add('milo', names[r] + ' is ready. Tap Go!', 'race');
  for (const t of ['3', '2', '1', 'Go!', 'Zoom!', 'Super speed!', 'Whoosh!', 'Fin-tastic!']) add(r, t, 'race');
}
for (const h of ['willa', 'tiggy']) for (const t of ['Nice try! Look for the next shell.', 'Good try! Look for the next shell.', 'Keep swimming! Look for the next shell.']) add(h, t, 'race');
add('tiggy', 'How many? Find the number!', 'race');
const race = fs.readFileSync(D + 'race.js', 'utf8');
const bank = name => race.slice(race.indexOf(name)).split('\n  ]')[0];
for (const m of bank("'first-sound': [").matchAll(/\['(\w+)', '(\w+)'/g)) add('willa', m[1] + '! Find the first sound.', 'race');
for (const m of bank('digraph: [').matchAll(/\['(\w+)', '(\w+)'/g)) add('willa', m[1] + '! Find the sound in ' + m[1] + '.', 'race');
for (const m of bank('tricky: [').matchAll(/\['(\w+)', \[/g)) add('willa', 'Find the word ' + m[1] + '!', 'race');
// The 42 Jolly Phonics sounds, written the way the class practises them.
const sounds = [['s','sssss'],['a','a, a, ant'],['t','t, t, t'],['i','i, i, insect'],['p','p, p, p'],['n','nnnnn'],['ck','c, c, c'],['e','e, e, egg'],['h','h, h, h'],['r','rrrrr'],['m','Mmmm!'],['d','d, d, d'],['g','g, g, g'],['o','o, o, on'],['u','u, u, up'],['l','lllll'],['f','fffff'],['b','b, b, b'],['ai','ay, ay, rain'],['j','j, j, jelly'],['oa','oh, oh, boat'],['ie','eye, eye, pie'],['ee','eeeee'],['or','or, or, fork'],['z','zzzzz'],['w','w, w, wet'],['ng','ng, ng, ring'],['v','vvvvv'],['oo-short','oo, oo, book'],['oo-long','oo, oo, moon'],['y','y, y, yes'],['x','ks, ks, fox'],['ch','ch, ch, ch'],['sh','shhhhh'],['th-voiced','th, th, this'],['th','th, th, thumb'],['qu','kw, kw, queen'],['ou','ow, ow, out'],['oi','oy, oy, coin'],['ue','you, you, cue'],['er','er, er, her'],['ar','ar, ar, shark']];
for (const [id, t] of sounds) lines.push({ speaker: 'willa', text: t, group: 'jolly sound', settings: 'sound', sound: id });
fs.writeFileSync('/home/claude/voicegen/lines.json', JSON.stringify(lines, null, 1));
const by = {}; lines.forEach(l => { by[l.group] = by[l.group] || [0, 0]; by[l.group][0]++; by[l.group][1] += l.text.length; });
console.log(by, 'TOTAL', lines.length, lines.reduce((a, l) => a + l.text.length, 0));
