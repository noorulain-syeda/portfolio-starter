// Her whole career on one time axis, in lanes: work, startups, study, teaching.
// This is the only place the dated entries appear. Select a bar and its details
// open underneath, so nothing is listed twice. In Arabic, time runs from right to
// left (inset-inline-start), like the rest of the page.
import { cv, byId } from "@/data/cv";
import { ui } from "@/data/ui";
import { fmtRange, fmtYear } from "@/lib/i18n";
import CareerTimelineView from "./CareerTimelineView";

const t = (en, ar) => ({ en, ar });
const START = "2006-09";
const ROW = 34;
const months = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};
const comma = (lang) => (lang === "ar" ? "، " : ", ");

function buildLanes(lang, present) {
  const range = (s, e) => fmtRange(s, e, lang, present);
  const exp = (id, short) => {
    const x = byId(cv.experience, id);
    return {
      key: id,
      start: x.start,
      end: x.end,
      short,
      full: x.org ? `${x.role[lang]}${comma(lang)}${x.org[lang]}` : x.role[lang],
      dashed: id === "career-break",
      detail: {
        title: x.role[lang],
        org: x.org?.[lang],
        meta: [range(x.start, x.end), x.place[lang]],
        points: x.points.map((p) => p[lang]),
        tech: x.tech,
      },
    };
  };
  const edu = (i, key, short) => {
    const e = cv.education[i];
    return {
      key,
      start: e.start,
      end: e.end,
      short,
      full: `${e.degree[lang]}${comma(lang)}${e.school[lang]}`,
      detail: { title: e.degree[lang], org: e.school[lang], meta: [range(e.start, e.end), e.mode[lang]], points: e.details.map((d) => d[lang]) },
    };
  };
  const give = (i, key, short) => {
    const g = cv.givingBack[i];
    return {
      key,
      start: g.start,
      end: g.end,
      short,
      full: `${g.role[lang]}${comma(lang)}${g.org[lang]}`,
      detail: { title: g.role[lang], org: g.org[lang], meta: [range(g.start, g.end), cv.givingBackNote[lang]], points: [g.detail[lang]] },
    };
  };
  const bsc = cv.education[3];
  const hirfa = cv.projects.find((p) => p.slug === "hirfa-ui");
  return [
    {
      name: t("Work", "العمل"),
      items: [
        exp("mirqab-junior", t("Mirqab", "مرقاب")),
        exp("brightwell-ux", t("Brightwell", "برايتويل")),
        exp("brightwell-senior", t("Senior", "أولى")),
        exp("career-break", t("Break", "استراحة")),
        exp("zayna-senior-fe", t("Zayna", "زينة")),
        exp("zayna-manager", t("Manager", "مديرة فريق")),
        exp("zayna-director", t("Director", "مديرة")),
        exp("faseela-principal", t("Faseela: Principal", "فسيلة: رئيسية")),
      ],
    },
    {
      name: t("Startups and side projects", "الشركات الناشئة والمشاريع الجانبية"),
      items: [
        exp("freelance", t("Freelance", "عمل حر")),
        exp("rafeeq-cto", t("Rafeeq", "رفيق")),
        exp("qalam-cofounder", t("Qalam: Co-founder", "قلم: شريكة مؤسِّسة")),
        {
          key: "hirfa-ui",
          start: hirfa.start,
          end: hirfa.end,
          short: t("Hirfa UI", "حرفة"),
          full: hirfa.name[lang],
          detail: {
            title: hirfa.name[lang],
            org: hirfa.org[lang],
            meta: [range(hirfa.start, hirfa.end), hirfa.role[lang]],
            points: [hirfa.result[lang]],
            tech: hirfa.tech,
            link: { href: `/${lang}/work/hirfa-ui/`, label: ui.timeline.caseStudy[lang] },
          },
        },
      ],
    },
    {
      name: t("Study and research", "الدراسة والبحث"),
      items: [
        edu(3, "edu-bsc", t("BSc", "بكالوريوس")),
        {
          key: "edu-exchange",
          start: "2009-02",
          end: "2009-07",
          short: t("Exchange", "تبادل"),
          full: lang === "ar" ? "فصل تبادل، جامعة ليندنهول، ألمانيا" : "Exchange semester, Lindenhall University, Germany",
          detail: {
            title: lang === "ar" ? "فصل تبادل" : "Exchange semester",
            org: lang === "ar" ? "جامعة ليندنهول، ألمانيا" : "Lindenhall University, Germany",
            meta: [range("2009-02", "2009-07")],
            points: [lang === "ar" ? `ضمن ${bsc.degree.ar}، ${bsc.school.ar}` : `Part of the ${bsc.degree.en}, ${bsc.school.en}`],
          },
        },
        edu(2, "edu-msc", t("MSc", "ماجستير")),
        exp("northbridge-ra", t("Research assistant", "مساعدة باحث")),
        edu(0, "edu-phd", t("PhD", "دكتوراه")),
        edu(1, "edu-exec", t("Executive certificate", "شهادة تنفيذية")),
      ],
    },
    {
      name: t("Teaching and giving back", "التدريس والعطاء"),
      items: [
        give(5, "give-volunteer", t("Volunteer", "متطوعة")),
        give(4, "give-judge", t("Hackathon judge", "محكّمة")),
        give(0, "give-lecturer", t("Lecturer", "محاضرة")),
        give(3, "give-mentor", t("Mentor", "مرشدة")),
        give(1, "give-board", t("Advisory board", "المجلس الاستشاري")),
        give(2, "give-advisor", t("Advisor", "مستشارة")),
      ],
    },
  ];
}

// Put bars on as few rows as possible without overlapping.
function pack(items, now) {
  const rows = [];
  const sorted = [...items].sort((a, b) => months(a.start) - months(b.start));
  for (const it of sorted) {
    const s = months(it.start);
    const row = rows.find((r) => r.end < s);
    if (row) {
      row.items.push(it);
      row.end = months(it.end || now);
    } else rows.push({ end: months(it.end || now), items: [it] });
  }
  return rows.map((r) => r.items);
}

export default function CareerTimeline({ lang }) {
  const nowDate = new Date();
  const now = `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, "0")}`;
  const present = ui.present[lang];
  const total = months(now) - months(START);
  const at = (ym) => ((months(ym) - months(START)) / total) * 100;

  const lanes = buildLanes(lang, present).map((lane) => {
    const rows = pack(lane.items, now);
    return {
      name: lane.name[lang],
      height: rows.length * ROW,
      bars: rows.flatMap((row, ri) =>
        row.map((it) => ({
          key: it.key,
          short: it.short[lang],
          label: `${it.full}: ${fmtRange(it.start, it.end, lang, present)}`,
          left: at(it.start),
          width: Math.max(0.6, at(it.end || now) - at(it.start)),
          top: ri * ROW,
          // Bars shorter than ten months are too narrow for a label; the button still names them.
          tiny: months(it.end || now) - months(it.start) < 10,
          dashed: !!it.dashed,
          now: !it.end,
        }))
      ),
    };
  });

  // Every entry, newest first, for the "earlier" and "later" steps under the details.
  const entries = buildLanes(lang, present)
    .flatMap((lane) => lane.items)
    .sort((a, b) => months(b.start) - months(a.start) || months(b.end || now) - months(a.end || now))
    .map((it) => ({ key: it.key, full: it.full, ...it.detail }));

  const years = [];
  for (let y = 2008; y <= nowDate.getFullYear(); y += 2) years.push({ y, label: fmtYear(y, lang), at: at(`${y}-01`) });

  return <CareerTimelineView lang={lang} lanes={lanes} entries={entries} years={years} present={present} first="faseela-principal" />;
}
