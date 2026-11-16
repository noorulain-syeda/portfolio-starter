"use client";

// The first thing you see: Yara says hello, with her full name in both scripts, and
// her badge swings on its lanyard. The badge is the way in: tap it to walk into her
// room. Keyboard users also get a skip link that shows up only when focused.
import { cv } from "@/data/cv";
import { badge, intro } from "@/data/room";
import { dirOf, otherLang } from "@/lib/i18n";
import Lanyard from "./Lanyard";
import Mashq from "@/components/site/Mashq";
import YaraGarden from "./YaraGarden";

// The team behind the portfolio, in small type under the badge.
const TEAM = ["Noor Ul Ain Syeda", "Nusaybah Farheen", "Hiba Ahmer", "Yosr BelFalah"];

export default function Intro({ lang, reduced, leaving, onExplore, onSkip, onLang }) {
  const other = otherLang(lang);
  return (
    <section className="intro" data-leaving={leaving} lang={lang} dir={dirOf(lang)} aria-labelledby="intro-h">
      <Mashq variant="intro" />
      <button type="button" className="skip-link intro-skip" onClick={onSkip}>
        {intro.skip[lang]}
      </button>
      <button type="button" className="link-btn intro-lang" lang={other} dir={dirOf(other)} onClick={onLang} aria-label={intro.langSwitchLabel[lang]}>
        {intro.langSwitch[lang]}
      </button>

      <div className="intro-text">
        {/* Her full name in both scripts: the Latin one grown in Type Garden, the Arabic in calligraphy. */}
        <h1 id="intro-h" className="intro-h" data-lead={lang}>
          <span className="intro-hello">{intro.hello[lang]}</span>
          <span className="intro-latin" lang="en" dir="ltr">
            <YaraGarden className="intro-garden" />
            <span className="sr-only">Yara Al-Mansouri</span>
          </span>
          <span className="intro-arabic" lang="ar" dir="rtl">
            {intro.name.ar}
          </span>
        </h1>
        <p className="intro-lede">{intro.lede[lang]}</p>
      </div>

      <div className="intro-hang">
        <Lanyard strapText={badge.strap} reduced={reduced} onTap={onExplore} label={`${intro.explore[lang]}: ${cv.shortName[lang]}, ${badge.role[lang]}`}>
          <span className="badge-clip" aria-hidden="true" />
          <span className="badge-slot" aria-hidden="true" />
          <span className="badge-org">{badge.org[lang]}</span>
          <span className="badge-photo" lang="ar" dir="rtl">
            يارا
          </span>
          <span className="badge-name">{cv.shortName[lang]}</span>
          <span className="badge-name-other" lang={other} dir={dirOf(other)}>
            {cv.shortName[other]}
          </span>
          <span className="badge-role">{badge.role[lang]}</span>
          <span className="badge-meta">{badge.degree[lang]}</span>
          <span className="badge-tap">{intro.badgeTap[lang]}</span>
          <span className="badge-code" aria-hidden="true" />
        </Lanyard>
        <p className="intro-team" lang="en" dir="ltr">
          {TEAM.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
