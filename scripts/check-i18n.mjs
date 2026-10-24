import { readFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
let problems = 0;
const fail = (m) => { problems++; console.error('FAIL ' + m); };
const warn = (m) => console.warn('warn ' + m);

const holes = (s) => s.split('{').slice(1).map((p) => p.split(/[,} ]/)[0]).sort().join();
const tags = (s) => s.split('<').slice(1).map((p) => p.split('>')[0].replace('/', '')).sort().join();
const deva = /[\u0900-\u097F]/;
const apos = String.fromCharCode(39);

/* ---------- 1. messages/en.json vs messages/ne.json ---------- */

function walk(a, b, path) {
  for (const key of Object.keys(a)) {
    const p = path ? path + '.' + key : key;
    const x = a[key];
    const y = b ? b[key] : undefined;
    if (y === undefined) { fail('missing in ne: ' + p); continue; }
    if (typeof x === 'string') {
      if (typeof y !== 'string') { fail('type differs: ' + p); continue; }
      if (holes(x) !== holes(y)) fail('variables differ: ' + p);
      if (tags(x) !== tags(y)) fail('rich-text tags differ: ' + p);
      if (x.includes(apos) || y.includes(apos)) fail('ASCII apostrophe, use ’: ' + p);
      if (!deva.test(y)) warn('no Devanagari (untranslated?): ' + p);
      if (/[0-9]/.test(y)) warn('digits in Nepali text, use {n, number}: ' + p);
    } else if (Array.isArray(x)) {
      if (!Array.isArray(y) || x.length !== y.length) fail('array length differs: ' + p);
    } else if (typeof x === 'object') walk(x, y, p);
  }
  for (const key of Object.keys(b || {})) {
    if (!(key in a)) fail('in ne but not en: ' + (path ? path + '.' : '') + key);
  }
}

walk(read('messages/en.json'), read('messages/ne.json'), '');

/* ---------- 2. data/course.json vs data/course.ne.json ---------- */

let neCourse = [];
try { neCourse = read('data/course.ne.json'); } catch {}
let enCourse = [];
try { enCourse = read('data/course.json'); } catch {}
for (const l of neCourse) {
  const base = enCourse.find((x) => x.day === l.day);
  if (!base) { fail('course.ne: day ' + l.day + ' not in course.json'); continue; }
  for (const k of ['action', 'quiz']) {
    const a = base[k] && base[k].options;
    const b = l[k] && l[k].options;
    if (!a !== !b) { fail('day ' + l.day + ': ' + k + ' presence differs'); continue; }
    if (!a) continue;
    if (a.length !== b.length) { fail('day ' + l.day + ': ' + k + ' option count differs'); continue; }
    a.forEach((o, i) => {
      if (o.correct !== b[i].correct) fail('day ' + l.day + ': ' + k + ' option ' + (i + 1) + ' correct flag differs');
    });
  }
}

/* ---------- 3. data/curriculum.json vs data/curriculum.ne.json ---------- */

let enCur = null;
let neCur = null;
try { enCur = read('data/curriculum.json'); neCur = read('data/curriculum.ne.json'); } catch {}

function checkText(s, path) {
  if (typeof s !== 'string') { fail('curriculum.ne: not a string: ' + path); return; }
  if (s.includes(apos)) fail('curriculum.ne: ASCII apostrophe: ' + path);
  if (!deva.test(s)) warn('curriculum.ne: no Devanagari (untranslated?): ' + path);
}

if (enCur && neCur) {
  const fw = neCur.framework || {};

  // Framework labels: every key must exist in English. Missing ones only warn (they fall back to English).
  for (const kind of ['knowledge', 'skills', 'attitudes']) {
    const ids = enCur.framework[kind].map((x) => x.id);
    const given = fw[kind] || {};
    for (const id of Object.keys(given)) {
      const p = 'framework.' + kind + '.' + id;
      if (!ids.includes(id)) { fail('curriculum.ne: unknown id ' + p); continue; }
      if (kind === 'knowledge') checkText(given[id], p);
      else {
        for (const field of Object.keys(given[id])) {
          if (!['name', 'description'].includes(field)) fail('curriculum.ne: unexpected field ' + p + '.' + field);
          else checkText(given[id][field], p + '.' + field);
        }
      }
    }
    for (const id of ids) if (!(id in given)) warn('curriculum.ne: not translated: framework.' + kind + '.' + id);
  }

  // Days: day numbers must exist in English, only text fields allowed, basis only where English has one.
  const enDays = {};
  for (const w of enCur.weeks) for (const d of w.days) enDays[String(d.day)] = d;
  const neDays = neCur.days || {};
  for (const n of Object.keys(neDays)) {
    const base = enDays[n];
    if (!base) { fail('curriculum.ne: day ' + n + ' not in curriculum.json'); continue; }
    for (const field of Object.keys(neDays[n])) {
      const p = 'days.' + n + '.' + field;
      if (!['title', 'summary', 'basis'].includes(field)) { fail('curriculum.ne: unexpected field ' + p); continue; }
      if (field === 'basis' && !base.basis) { fail('curriculum.ne: English day ' + n + ' has no basis: ' + p); continue; }
      checkText(neDays[n][field], p);
    }
    if (base.basis && !neDays[n].basis) warn('curriculum.ne: day ' + n + ' has no basis translation');
    if (!neDays[n].title) warn('curriculum.ne: day ' + n + ' has no title');
    if (!neDays[n].summary) warn('curriculum.ne: day ' + n + ' has no summary');
  }
  for (const n of Object.keys(enDays)) if (!(n in neDays)) warn('curriculum.ne: day ' + n + ' not translated');
}

console.log(problems ? '\n' + problems + ' problem(s)' : 'i18n check passed');
process.exit(problems ? 1 : 0);