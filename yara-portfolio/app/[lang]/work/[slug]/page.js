// One page per project, per language: /en/work/mizan/, /ar/work/mizan/ ...
import Link from "next/link";
import { notFound } from "next/navigation";
import { cv, byId, projectBySlug } from "@/data/cv";
import { ui } from "@/data/ui";
import { LANGS, countOf, fmtMetric, fmtMonth, fmtRange, fmtYear } from "@/lib/i18n";
import TopBar from "@/components/site/TopBar";
import BeforeAfter from "@/components/site/BeforeAfter";
import SiteFooter from "@/components/site/SiteFooter";
import Diary from "@/components/site/Diary";
import { diaryUi, projectDiary } from "@/data/diary";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => cv.projects.map((p) => ({ lang, slug: p.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name[lang]} | ${cv.shortName[lang]}`,
    description: p.result[lang],
  };
}

function relatedItems(p, lang) {
  const L = ui.caseStudy;
  const r = p.related || {};
  const items = [];
  for (const id of r.awards || []) {
    const a = byId(cv.awards, id);
    items.push({ kind: `${L.award[lang]}, ${fmtYear(a.year, lang)}`, title: a.name[lang], sub: a.by[lang] });
  }
  for (const id of r.patents || []) {
    const x = byId(cv.patents, id);
    items.push({ kind: L.patent[lang], title: x.title[lang], sub: x.status[lang] });
  }
  for (const id of r.talks || []) {
    const t = byId(cv.talks, id);
    items.push({ kind: `${ui.talkKinds[t.kind][lang]}, ${fmtYear(t.year, lang)}`, title: t.title[lang], sub: t.event, subDir: "ltr" });
  }
  for (const id of r.publications || []) {
    const x = byId(cv.publications, id);
    items.push({ kind: L.paper[lang], title: x.citation, titleDir: "ltr" });
  }
  for (const id of r.media || []) {
    const m = byId(cv.media, id);
    items.push({ kind: `${m.kind[lang]}, ${fmtMonth(m.date, lang)}`, title: m.title[lang], sub: m.outlet, subDir: "ltr" });
  }
  return items;
}

export default async function CaseStudy({ params }) {
  const { lang, slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const L = ui.caseStudy;
  const i = cv.projects.indexOf(p);
  const next = cv.projects[(i + 1) % cv.projects.length];
  const moving = p.metrics.filter((m) => m.from != null);
  const still = p.metrics.filter((m) => m.from == null);
  const related = relatedItems(p, lang);
  const team = p.contributors ? countOf(p.contributors, "contributors", lang) : p.team === 1 ? L.solo[lang] : countOf(p.team, "people", lang);

  return (
    <>
      <TopBar lang={lang} />
      <main className="wrap">
        <header className="cs-head">
          <p className="cs-eyebrow">{L.eyebrow[lang]}</p>
          <h1>{p.name[lang]}</h1>
          <dl className="cs-meta">
            <div>
              <dt>{L.company[lang]}</dt>
              <dd>{p.org[lang]}</dd>
            </div>
            <div>
              <dt>{L.dates[lang]}</dt>
              <dd>{fmtRange(p.start, p.end, lang, ui.present[lang])}</dd>
            </div>
            <div>
              <dt>{L.role[lang]}</dt>
              <dd>{p.role[lang]}</dd>
            </div>
            <div>
              <dt>{L.team[lang]}</dt>
              <dd>{team}</dd>
            </div>
            <div>
              <dt>{L.stack[lang]}</dt>
              <dd dir="ltr" style={{ textAlign: "start" }}>
                {p.tech.join(", ")}
              </dd>
            </div>
          </dl>
          {p.url ? (
            <p style={{ margin: 0 }}>
              <a href={p.url}>{L.openRepo[lang]}</a>
            </p>
          ) : null}
        </header>

        {moving.length ? <BeforeAfter metrics={moving} lang={lang} /> : null}

        {still.length ? (
          <section className="panel" aria-label={L.result[lang]} style={{ marginTop: moving.length ? 16 : 0 }}>
            <div className="ba-figures" style={{ marginTop: 0 }}>
              {still.map((m) => (
                <div key={m.label.en} className="ba-figure">
                  <span className="muted">{m.label[lang]}</span>
                  <span className="ba-value">{fmtMetric(m.to, m.unit, lang)}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="par">
          <article className="panel">
            <h2>{L.problem[lang]}</h2>
            <p>{p.problem[lang]}</p>
          </article>
          <article className="panel">
            <h2>{L.action[lang]}</h2>
            <p>{p.action[lang]}</p>
          </article>
          <article className="panel result">
            <h2>{L.result[lang]}</h2>
            <p>{p.result[lang]}</p>
          </article>
        </div>

        {/* "What went wrong": a small diary page for every project. */}
        {projectDiary[p.slug] ? (
          <section className="cs-diary" aria-labelledby="diary-h">
            <h2 id="diary-h" className="sub-h" style={{ marginTop: 0 }}>
              {diaryUi.title[lang]}
            </h2>
            <Diary entries={[projectDiary[p.slug]]} lang={lang} cover={diaryUi.projectCover[lang]} />
          </section>
        ) : null}

        {related.length ? (
          <section aria-labelledby="rel-h">
            <h2 id="rel-h" className="sub-h" style={{ marginTop: 0 }}>
              {L.connected[lang]}
            </h2>
            <ul className="related">
              {related.map((r) => (
                <li key={r.kind + r.title}>
                  <span className="kind">{r.kind}</span>
                  <span style={{ display: "block", fontWeight: 600 }} dir={r.titleDir}>
                    {r.title}
                  </span>
                  {r.sub ? (
                    <span className="muted" style={{ display: "block", fontSize: 15 }} dir={r.subDir}>
                      {r.sub}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav className="cs-next" aria-label={L.next[lang]}>
          <Link className="btn" href={`/${lang}/#work`}>
            {L.allWork[lang]}
          </Link>
          <Link className="btn btn-primary" href={`/${lang}/work/${next.slug}/`}>
            {L.next[lang]}: {next.name[lang]}
          </Link>
        </nav>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
