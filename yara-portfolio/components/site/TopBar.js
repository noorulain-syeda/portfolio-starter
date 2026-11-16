"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ui } from "@/data/ui";
import { otherLang } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

const NAV = ["work", "experience", "research", "recognition", "credentials"];

export default function TopBar({ lang }) {
  const pathname = usePathname() || `/${lang}/`;
  const router = useRouter();
  const other = otherLang(lang);
  const otherHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  const pending = useRef(null);

  // Finish the cross-fade once the other language has rendered.
  useEffect(() => {
    pending.current?.();
    pending.current = null;
  }, [pathname]);

  function switchLanguage(e) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return; // plain navigation
    e.preventDefault();
    document.startViewTransition(
      () =>
        new Promise((resolve) => {
          pending.current = resolve;
          setTimeout(resolve, 1500);
          router.push(otherHref, { scroll: false });
        })
    );
  }

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="btn btn-quiet back-link" onClick={() => sessionStorage.setItem("desk:return", lang)}>
          <svg className="flip-x" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          {ui.backToDesk[lang]}
        </Link>
        <nav aria-label={ui.mainNav[lang]}>
          {NAV.map((id) => (
            <Link key={id} href={`/${lang}/#${id}`}>
              {ui.nav[id][lang]}
            </Link>
          ))}
        </nav>
        <div className="topbar-tools">
          <ThemeToggle lang={lang} />
          <Link href={otherHref} hrefLang={other} lang={other} className="btn btn-quiet" onClick={switchLanguage} title={ui.switchLanguage[lang]}>
            {ui.otherLanguage[lang]}
          </Link>
        </div>
      </div>
    </header>
  );
}
