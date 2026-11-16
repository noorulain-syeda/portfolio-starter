// Checks data/cv.js against the counts in Yara's PDF CV, and that every
// { en, ar } field has both languages filled in. Run: npm run check:cv
import { cv } from "../data/cv.js";
import { ui } from "../data/ui.js";

const expected = {
  "contact links": [cv.contact.links.length, 8],
  "career highlights": [cv.highlights.length, 8],
  "skill groups": [cv.skills.length, 10],
  "experience entries": [cv.experience.length, 12],
  "selected projects": [cv.projects.length, 8],
  education: [cv.education.length, 4],
  "certifications (19 earned + 1 in progress)": [cv.certifications.length, 20],
  awards: [cv.awards.length, 10],
  patents: [cv.patents.length, 2],
  "publications listed": [cv.publications.length, 6],
  "talks listed": [cv.talks.length, 8],
  media: [cv.media.length, 4],
  "leadership, teaching, volunteering": [cv.givingBack.length, 6],
  languages: [cv.languages.length, 5],
  interests: [cv.interests.length, 4],
};

let failures = 0;
for (const [label, [got, want]] of Object.entries(expected)) {
  const ok = got === want;
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"}  ${label}: ${got}${ok ? "" : ` (CV has ${want})`}`);
}

const certCounts = cv.certifications.reduce((acc, c) => ((acc[c.status] = (acc[c.status] || 0) + 1), acc), {});
console.log(`      certification status: ${JSON.stringify(certCounts)}`);
if (certCounts.inProgress !== 1 || certCounts.expired !== 3) {
  failures++;
  console.log("FAIL  expected 1 in progress and 3 expired certifications");
}

// Every bilingual value needs both languages.
const missing = [];
function walk(node, path) {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`));
  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    if (keys.includes("en") || keys.includes("ar")) {
      if (!node.en?.trim()) missing.push(`${path}.en`);
      if (!node.ar?.trim()) missing.push(`${path}.ar`);
      return;
    }
    for (const k of keys) walk(node[k], path ? `${path}.${k}` : k);
  }
}
walk(cv, "cv");
walk(ui, "ui");
if (missing.length) {
  failures++;
  console.log(`FAIL  ${missing.length} missing translations:\n  ${missing.join("\n  ")}`);
} else {
  console.log("ok    every bilingual field has English and Arabic");
}

// Cross-links from projects must point at real items.
const lists = { awards: cv.awards, talks: cv.talks, patents: cv.patents, publications: cv.publications, media: cv.media };
for (const p of cv.projects) {
  for (const [kind, ids] of Object.entries(p.related || {})) {
    for (const id of ids) {
      if (!lists[kind]?.some((x) => x.id === id)) {
        failures++;
        console.log(`FAIL  project ${p.slug} links to unknown ${kind} "${id}"`);
      }
    }
  }
}

// Yara's room and her diary may add a personal voice, but never a new number:
// every figure they mention must already appear somewhere in the CV.
const { spots, intro, badge } = await import("../data/room.js");
const { projectDiary, lifeDiary } = await import("../data/diary.js");
const cvText = JSON.stringify(cv);
const numbersIn = (text) => (text.match(/\d[\d,.]*\d|\d/g) || []).map((n) => n.replace(/[.,]$/, ""));
const texts = [
  ...spots.flatMap((s) => [[`room spot "${s.id}"`, s.says.en], [`room spot "${s.id}" friend line`, s.friend.en]]),
  ...Object.entries(projectDiary).flatMap(([k, e]) => [[`diary ${k}`, e.body.en], [`diary ${k}`, e.then.en]]),
  ...lifeDiary.flatMap((e) => [[`life diary ${e.date}`, e.body.en], [`life diary ${e.date}`, e.then.en]]),
];
let unknown = 0;
for (const [where, text] of texts) {
  for (const n of numbersIn(text)) {
    if (!cvText.includes(n)) {
      unknown++;
      console.log(`FAIL  ${where} mentions ${n}, which is not in the CV`);
    }
  }
}
for (const id of Object.keys(projectDiary)) {
  if (!cv.projects.some((p) => p.slug === id)) {
    unknown++;
    console.log(`FAIL  diary page for unknown project "${id}"`);
  }
}
const missingDiary = cv.projects.filter((p) => !projectDiary[p.slug]).map((p) => p.slug);
if (missingDiary.length) {
  unknown++;
  console.log(`FAIL  projects without a "What went wrong" page: ${missingDiary.join(", ")}`);
}
const before = missing.length;
walk({ intro, badge, spots, projectDiary, lifeDiary }, "room");
if (missing.length > before) {
  unknown++;
  console.log(`FAIL  missing translations in the room or diary:\n  ${missing.slice(before).join("\n  ")}`);
}
failures += unknown;
if (!unknown) console.log("ok    room captions and diary pages only use numbers from the CV");

console.log(failures ? `\n${failures} problem(s) found.` : "\nAll CV sections are present.");
process.exit(failures ? 1 : 0);
