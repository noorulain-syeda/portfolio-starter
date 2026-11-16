import { notFound } from "next/navigation";
import { LANGS, dirOf, isLang } from "@/lib/i18n";
import HtmlLangSync from "@/components/site/HtmlLangSync";

// Builds /en/... and /ar/... at export time. Any other first segment is a 404.
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <div lang={lang} dir={dirOf(lang)}>
      <HtmlLangSync lang={lang} />
      {children}
    </div>
  );
}
