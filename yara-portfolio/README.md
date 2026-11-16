# Yara Al-Mansouri · Portfolio Summit 2026

Yara says hello, and her lanyard badge swings at the top of the screen. **Tap the badge
and you walk into her room**, seeing it the way she does: the desk, the wall of
certificates and degrees behind it, the shelves of awards and half-marathon medals, her
film cameras, a chess game in progress and her own calligraphy. Drag to look around, or tap a dot and
she tells you about it. The old monitor on her desk is the portfolio: **left half in
English, right half in Arabic**.

Built on the workshop starter: **Next.js 16 (App Router), JavaScript, three.js**, exported
as a static site for **GitHub Pages**. Works on desktops, iPads and phones (iOS and
Android), in portrait and landscape.

## Run it

You need Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check:cv   # every CV section present, in both languages; no invented numbers
npm run build      # static site in ./out (runs check:cv first)
```

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repo (or replace the files in your starter fork).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to
   `https://<username>.github.io/<repo-name>/`.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>`. Every link to a file in
`public/` (like the CV PDF) goes through `withBase()` so it keeps working there.

## Where things live

| Path | What it is |
| --- | --- |
| `data/cv.js` | Yara's whole CV. Every visible text is `{ en, ar }`. Edit CV content here only. |
| `data/room.js` | The hello screen, the badge, and what Yara says about each thing in her room |
| `data/diary.js` | "What went wrong": one diary page per project, plus her own diary |
| `data/ui.js` | Interface words in both languages |
| `scripts/check-cv.mjs` | Fails the build if a CV section is short, a translation is missing, or a room caption or diary page uses a number that is not in the CV |
| `components/home/` | The hello screen: `Intro.js`, the lanyard physics (`Lanyard.js`), her name from Type Garden (`YaraGarden.js`, `gardenPaths.js`) |
| `components/room/music.js` | The record player's music, composed in code (see below) |
| `components/room/` | The room: `layout.js` (where everything is, in metres), `buildRoom.js` (the 3D objects), `textures.js` (certificates, diplomas, window, pinboard), `RoomScene.js` (first-person camera), `RoomUI.js` and `RoomMap.js` (dots, Yara's captions, the floor-plan map) |
| `components/desk/` | The desk and the monitor's idle screen, reused inside the room |
| `components/site/Contact.js` | "Contact me": an envelope that opens into stamps for Gmail, Outlook, Outlook for work, Yahoo Mail and the visitor's own mail app |
| `components/site/Diary.js` | The "What went wrong" notebook |
| `components/site/CareerTimeline.js` | Twenty years in lanes: work, startups, study, teaching, awards |
| `app/[lang]/page.js` | The portfolio inside the monitor, `/en/` and `/ar/` |
| `app/[lang]/work/[slug]/page.js` | One case study per project, each with its diary page |
| `app/globals.css` | All styles. Logical properties (`inline-start`) mirror Arabic without separate CSS |

## The portfolio page

Each fact appears once. From top to bottom: her name in both languages with the CV floppy
and a letter to write to her; Work (8 case studies); Experience, a timeline of work,
startups, study and teaching where tapping a bar opens that entry underneath (Earlier and
Later step through them, and links like `/en/#x-edu-phd` open one directly); Skills;
Research (patents and publications); Recognition (awards, talks, media); Certifications;
About (summary, off the clock, languages). The footer names our team.

## The room

There are no buttons over the scene. Things glow when you point at them (and a soft glint
passes over them now and then), a tap shows them straight away, and Yara answers in
game-style subtitles. Tap anywhere else to step back.

| Thing | What happens |
| --- | --- |
| Badge on the hello screen | Tap it to walk in (dragging swings it) |
| Monitor, left / right half | Fly into the portfolio in English / Arabic |
| Floppy disk drive | Downloads the CV (PDF) straight away |
| Letter on the desk | Write to Yara: the stamps for Gmail, Outlook or your mail app appear in her subtitle; her address is filled in |
| Lamp | Day or night (light or dark mode) |
| Notebook on the desk | Opens her diary of what went wrong |
| Record player (on the desk) | Plays the record; tap it again, or "Stop the record", to stop |
| Certificates, degrees, awards, medals, patents, cameras, chess, calligraphy, pinboard, books, plant (on the record cabinet) | Step closer; she tells you about it |
| Map in the corner | A live floor plan (your position and view), and a list of every spot |

The wall behind the desk is a mashq (calligraphy practice sheet) in a second shade of blue.

Keyboard: Tab reaches every thing in the room (its name shows where it is) and the map;
arrow keys turn your head; Esc steps back.
Without WebGL the room becomes a list of the same spots. Phones and tablets get a lighter
render (no shadows, lower pixel ratio). With `prefers-reduced-motion` there is no walk, no
camera glide, no swinging badge and no growing name.

**Her name** was grown in [Type Garden](https://type-garden.vercel.app/) by Akshat Agarwal
(credited in the portfolio footer), exported as SVG and simplified. The roses are recoloured
blue to match the site. Type Garden cannot shape Arabic, so the Arabic name is set in our
own fonts.

**The record**: `components/room/music.js` is an original loop made live in the browser
with the Web Audio API, so there is no audio file and nothing to license. It is a 96 BPM
tech groove in maqam Hijaz on D: darbuka in the maqsum rhythm with tech hi-hats, a sub
bass, a soft pad, an arpeggio through an echo, and an oud-like plucked line (Karplus–Strong)
tuned with Hijaz intonation (the E-flat a little high, the F-sharp a little low), plus a
needle drop and vinyl crackle. It only starts on a tap, a "Now playing" chip with a stop
button stays on screen while it plays, and it fades out when you leave the room. On
iPhone it asks Safari to play through the speaker even when the ring switch is on silent
(Safari 17+); on older iPhones the silent switch mutes it.

**What went wrong**: every project page has a diary page (a constraint, a failed prototype
or a pivot), and Yara keeps her own diary on the desk in her room. Pages built only from
CV facts are unmarked; pages where our team added a story are marked ✎ with a note. They
never change a CV fact, and `check:cv` fails if they mention a number that is not in the CV.

## Quality checks

- `npm run check:cv`: every CV section and count, both languages, no unknown numbers.
- axe-core (WCAG 2.2 AA): portfolio pages, case studies, the hello screen and the room UI.
- Screens tested: 1440×900, 1366×860, iPad 820×1180 and 1180×820, iPhone 390×844 and
  844×390, Android 412×915.

The CV and every name in it are fictional (Portfolio Summit 2026), including the email
address, so the emails open correctly but will not be delivered.

## Team

Noor Tahir Akmal Syeda, Nusaybah Farheen, Hiba Ahmer, Yosr BelFalah.
