// Small helpers for the two languages. No library needed.

export const LANGS = ["en", "ar"];
export const isLang = (x) => LANGS.includes(x);
export const dirOf = (lang) => (lang === "ar" ? "rtl" : "ltr");
export const otherLang = (lang) => (lang === "ar" ? "en" : "ar");

// Pick the right language from a { en, ar } value. Plain strings (tech names) pass through.
export function tr(value, lang) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return value;
  return value[lang] ?? value.en;
}

// Fill "{name}" placeholders.
export function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

// Arabic pages use Arabic-Indic digits and the Gregorian calendar.
const locale = (lang) => (lang === "ar" ? "ar-u-nu-arab" : "en-GB");

export function fmtNumber(n, lang, opts = {}) {
  return new Intl.NumberFormat(locale(lang), opts).format(n);
}

export function fmtMetric(value, unit, lang) {
  switch (unit) {
    case "percent":
      return fmtNumber(value / 100, lang, { style: "percent", maximumFractionDigits: 0 });
    case "deltaPercent":
      return fmtNumber(value / 100, lang, { style: "percent", maximumFractionDigits: 0, signDisplay: "always" }).replace("-", "−");
    default:
      return fmtNumber(value, lang);
  }
}

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

// "2023-09" -> "Sep 2023" / "سبتمبر ٢٠٢٣"; "2020" -> "2020"
export function fmtMonth(ym, lang) {
  if (!ym) return "";
  const [y, m] = String(ym).split("-");
  const year = lang === "ar" ? fmtNumber(Number(y), lang, { useGrouping: false }) : y;
  return m ? `${MONTHS[lang][Number(m) - 1]} ${year}` : year;
}

export function fmtYear(y, lang) {
  return lang === "ar" ? fmtNumber(y, lang, { useGrouping: false }) : String(y);
}

// Counted nouns. Arabic changes the noun with the number:
// 3–10 take the plural, 11–99 a singular accusative, 100+ a singular.
const AR_RULES = new Intl.PluralRules("ar");
const WORDS = {
  years: { en: ["year", "years"], ar: { one: "سنة", two: "سنتان", few: "سنوات", many: "سنة", other: "سنة" } },
  people: { en: ["person", "people"], ar: { one: "شخص", two: "شخصان", few: "أشخاص", many: "شخصاً", other: "شخص" } },
  contributors: { en: ["contributor", "contributors"], ar: { one: "مساهم", two: "مساهمان", few: "مساهمين", many: "مساهماً", other: "مساهم" } },
};

export function countOf(n, noun, lang) {
  const w = WORDS[noun];
  if (lang === "ar") return `${fmtNumber(n, lang)} ${w.ar[AR_RULES.select(n)] ?? w.ar.other}`;
  return `${fmtNumber(n, lang)} ${n === 1 ? w.en[0] : w.en[1]}`;
}

export function fmtRange(start, end, lang, presentLabel) {
  return `${fmtMonth(start, lang)} – ${end ? fmtMonth(end, lang) : presentLabel}`;
}
