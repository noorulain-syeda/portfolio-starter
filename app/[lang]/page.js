// Inside the monitor: the whole CV on one page, in English or Arabic.
import Link from "next/link";
import { cv } from "@/data/cv";
import { ui } from "@/data/ui";
import { countOf, dirOf, fmtMetric, fmtMonth, fmtYear, otherLang, tr } from "@/lib/i18n";
import { withBase } from "@/lib/withBase";
import TopBar from "@/components/site/TopBar";
import CertList from "@/components/site/CertList";
import SiteFooter from "@/components/site/SiteFooter";
import Mashq from "@/components/site/Mashq";
import CareerTimeline from "@/components/site/CareerTimeline";
import { ContactEnvelope } from "@/components/site/Contact";
import YaraGarden from "@/components/home/YaraGarden";
import SkillStickers from "@/components/site/SkillStickers";

// Small line drawings for her four interests, in the order of the CV.
const INTEREST_ICONS = [
  // Calligraphy: a reed pen and a dot.
  <path key="c" d="M8 40 L30 12 L36 17 L14 44 Z M30 12 L34 7 L41 13 L36 17 M10 46 h8 M40 34 l4 4 l-4 4 l-4 -4 Z" />,
  // Running: a medal on a ribbon.
  <path key="r" d="M16 6 L24 22 L32 6 M12 6 h8 M28 6 h8 M24 22 m-11 11 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0 M20 33 l3 3 l6 -7" />,
  // Film camera.
  <path key="f" d="M6 16 h10 l3 -5 h10 l3 5 h10 v24 h-36 Z M24 28 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M24 28 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M36 20 h3" />,
  // Chess knight.
  <path key="k" d="M14 42 h22 M16 38 h18 M18 38 c0 -8 6 -10 4 -16 l-6 4 l-3 -4 l9 -12 c8 0 13 6 13 14 c0 6 -3 10 -4 14" />,
];

// CEFR level from the CV's wording: native counts as the top of the scale.
function cefr(level) {
  const m = level.match(/\b([ABC][12])\b/);
  const steps = ["A1", "A2", "B1", "B2", "C1", "C2"];
  return m ? steps.indexOf(m[1]) + 1 : 6;
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: ui.siteTitle[lang],
    description: cv.summary[lang].split(/(?<=\.)\s/)[0],
    alternates: { languages: { en: "/en/", ar: "/ar/" } },
  };
}

function Section({ id, title, sub, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <div className="section-head">
        <h2 id={`${id}-h`}>{title}</h2>
        {sub ? <p>{sub}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default async function PortfolioPage({ params }) {
  const { lang } = await params;
  const other = otherLang(lang);
  const S = ui.sections;
  const present = ui.present[lang];
  const arrow = lang === "ar" ? "←" : "→";
  const to = lang === "ar" ? "إلى" : "to";
  const q = (text) => (lang === "ar" ? `«${text}»` : `“${text}”`);

  return (
    <>
      <a className="skip-link" href="#work">
        {S.work[lang]}
      </a>
      <TopBar lang={lang} />

      <main className="wrap">
        {/* Hero: both names, facing each other. The page's language comes first. */}
        <section className="hero" aria-labelledby="name-h">
          <Mashq variant="hero" />
          <h1 id="name-h" className="names">
            {lang === "en" ? (
              <span className="names-garden" lang="en" dir="ltr">
                <YaraGarden className="hero-garden" title={cv.shortName.en} />
              </span>
            ) : (
              <span>{cv.shortName[lang]}</span>
            )}
            <span className="names-line" aria-hidden="true" />
            {lang === "en" ? (
              <span className="other" lang={other} dir={dirOf(other)}>
                {cv.shortName[other]}
              </span>
            ) : (
              <span className="names-garden" lang="en" dir="ltr">
                <YaraGarden className="hero-garden" title={cv.shortName.en} />
              </span>
            )}
          </h1>
          <p className="hero-role">{cv.title[lang].replaceAll(" | ", lang === "ar" ? "، " : ", ")}</p>
          <p className="hero-lede">{ui.heroLede[lang]}</p>
          {/* Two objects from her desk instead of two buttons: the floppy with her CV, and a letter to her. */}
          <div className="hero-objects">
            <a className="floppy" href={withBase(cv.cvFile)} download>
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path className="floppy-body" d="M6 4 h30 l6 6 v32 a2 2 0 0 1 -2 2 h-34 a2 2 0 0 1 -2 -2 v-36 a2 2 0 0 1 2 -2 Z" />
                <rect className="floppy-shutter" x="14" y="4" width="18" height="12" rx="1.5" />
                <rect className="floppy-label" x="10" y="24" width="28" height="16" rx="2" />
                <path className="floppy-lines" d="M14 30 h20 M14 35 h14" />
              </svg>
              <span>{ui.downloadCv[lang]}</span>
            </a>
            <ContactEnvelope lang={lang} />
          </div>
        </section>

        <Section id="work" title={S.work[lang]} sub={S.workSub[lang]}>
          <ol className="ledger">
            {cv.projects.map((p) => {
              const m = p.metrics[0];
              return (
                <li key={p.slug}>
                  <Link href={`/${lang}/work/${p.slug}/`}>
                    <span>
                      <span className="ledger-name">{p.name[lang]}</span>
                      <span className="ledger-org">
                        {p.org[lang]}, {fmtYear(Number(p.start.slice(0, 4)), lang)}
                      </span>
                    </span>
                    <span className="ledger-label">{m.label[lang]}</span>
                    <span className="ledger-figure">
                      {m.from != null ? (
                        <>
                          <span className="ledger-from">{fmtMetric(m.from, m.unit, lang)}</span>
                          <span aria-hidden="true" className="ledger-from">
                            {arrow}
                          </span>
                          <span className="sr-only">{to}</span>
                        </>
                      ) : null}
                      <span className="ledger-to">{fmtMetric(m.to, m.unit, lang)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section id="experience" title={S.experience[lang]} sub={S.experienceSub[lang]}>
          <CareerTimeline lang={lang} />
        </Section>

        <Section id="skills" title={S.skills[lang]}>
          <SkillStickers
            hint={ui.skillsHint[lang]}
            tidy={ui.skillsTidy[lang]}
            close={ui.skillsClose[lang]}
            groups={cv.skills.map((s) => ({
              key: s.group.en,
              title: s.group[lang],
              meta: `${ui.levels[s.level][lang]}, ${countOf(s.years, "years", lang)}`,
              text: s.items.map((i) => tr(i, lang)).join(lang === "ar" ? "، " : ", "),
            }))}
          />
        </Section>

        <Section id="research" title={S.research[lang]}>
          <h3 className="sub-h" style={{ marginTop: 0 }}>
            {S.patents[lang]}
          </h3>
          <ul className="rows">
            {cv.patents.map((p) => (
              <li key={p.id}>
                <span className="title">{p.title[lang]}</span>
                <span className="side">{p.status[lang]}</span>
                <span className="detail">{p.number[lang]}</span>
              </li>
            ))}
          </ul>
          <h3 className="sub-h">{S.publications[lang]}</h3>
          <ol className="citations" lang="en" dir="ltr">
            {cv.publications.map((p) => (
              <li key={p.id}>{p.citation}</li>
            ))}
          </ol>
        </Section>

        <Section id="recognition" title={S.recognition[lang]}>
          <h3 className="sub-h" style={{ marginTop: 0 }}>
            {S.awards[lang]}
          </h3>
          <ul className="rows">
            {cv.awards.map((a) => (
              <li key={a.id}>
                <span className="title">{a.name[lang]}</span>
                <span className="side">{fmtYear(a.year, lang)}</span>
                <span className="detail">
                  {a.by[lang]}. {a.for[lang]}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="sub-h">{S.talks[lang]}</h3>
          <ul className="rows">
            {cv.talks.map((t) => (
              <li key={t.id}>
                <span className="title">
                  {ui.talkKinds[t.kind][lang]}: {q(t.title[lang])}
                </span>
                <span className="side">{fmtYear(t.year, lang)}</span>
                <span className="detail">
                  <span dir="ltr">{t.event}</span>, {t.city[lang]}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="sub-h">{S.media[lang]}</h3>
          <ul className="rows">
            {cv.media.map((m) => (
              <li key={m.id}>
                <span className="title">
                  {m.kind[lang]}: {q(m.title[lang])}
                </span>
                <span className="side">{m.ongoing ? `${fmtMonth(m.date, lang)} – ${present}` : fmtMonth(m.date, lang)}</span>
                <span className="detail">
                  <span dir="ltr">{m.outlet}</span>
                  {m.detail ? <>. {m.detail[lang]}</> : null}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="credentials" title={S.certifications[lang]}>
          <p className="muted" style={{ margin: "0 0 12px" }}>
            {cv.certificationsNote[lang]}
          </p>
          <CertList certs={cv.certifications} lang={lang} />
        </Section>

        <Section id="about" title={S.about[lang]}>
          <p className="prose">{cv.summary[lang]}</p>

          <h3 className="sub-h">{S.interests[lang]}</h3>
          <ul className="offclock">
            {cv.interests.map((i, n) => (
              <li key={i.en}>
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  {INTEREST_ICONS[n]}
                </svg>
                <span>{i[lang]}</span>
              </li>
            ))}
          </ul>

          <h3 className="sub-h">{S.languages[lang]}</h3>
          <ul className="langs">
            {cv.languages.map((l) => {
              const n = cefr(l.level.en);
              return (
                <li key={l.name.en}>
                  <span className="langs-name">{l.name[lang]}</span>
                  <span className="langs-bar" role="img" aria-label={`${l.level[lang]}. ${ui.cefr[lang]}`}>
                    {[1, 2, 3, 4, 5, 6].map((k) => (
                      <i key={k} data-on={k <= n} />
                    ))}
                  </span>
                  <span className="langs-level">{l.level[lang]}</span>
                </li>
              );
            })}
          </ul>

        </Section>

      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
