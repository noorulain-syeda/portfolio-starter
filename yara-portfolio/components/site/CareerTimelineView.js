"use client";

// The interactive half of the career timeline. Bars are toggle buttons; the chosen
// entry opens underneath. Every entry is in the page from the start (hidden until
// chosen), so print, search engines and the browser's find-in-page still see it all.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ui } from "@/data/ui";

export default function CareerTimelineView({ lang, lanes, entries, years, present, first }) {
  const [sel, setSel] = useState(first);
  const boxRef = useRef(null);
  const T = ui.timeline;
  const i = entries.findIndex((e) => e.key === sel);
  const newer = entries[i - 1];
  const older = entries[i + 1];

  const show = useCallback((key, scroll) => {
    setSel(key);
    if (!scroll) return;
    requestAnimationFrame(() => {
      const el = boxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      // Bring the details into view without losing sight of the timeline above them.
      if (r.top > window.innerHeight - 160) window.scrollBy({ top: r.top - window.innerHeight * 0.45, behavior });
      else if (r.top < 70) el.scrollIntoView({ block: "start", behavior });
    });
  }, []);

  // Links like /en/#x-edu-phd (from the room) open that entry.
  useEffect(() => {
    const fromHash = () => {
      const key = decodeURIComponent(location.hash.replace(/^#x-/, ""));
      if (key && entries.some((e) => e.key === key)) show(key, true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [entries, show]);

  // Entries that aren't open can still be found with the browser's find-in-page.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    box.querySelectorAll("article[hidden]").forEach((a) => a.setAttribute("hidden", "until-found"));
    const onMatch = (ev) => {
      const key = ev.target.closest("article")?.dataset.key;
      if (key) setSel(key);
    };
    box.addEventListener("beforematch", onMatch);
    return () => box.removeEventListener("beforematch", onMatch);
  }, [sel]);

  return (
    <div className="ctl">
      <p className="ctl-cap" id="ctl-cap">
        {T.caption[lang]} <span className="ctl-scroll-hint">{T.scroll[lang]}</span>
      </p>
      <div className="ctl-scroll" tabIndex={0} role="region" aria-label={T.region[lang]}>
        <div className="ctl-inner">
          <div className="ctl-years" aria-hidden="true">
            {years.map((y) => (
              <span key={y.y} style={{ insetInlineStart: `${y.at}%` }}>
                {y.label}
              </span>
            ))}
          </div>
          {lanes.map((lane) => (
            <div className="ctl-lane" key={lane.name}>
              <p className="ctl-lane-name">{lane.name}</p>
              <ul className="ctl-rows">
                {lane.bars.map((b) => (
                  <li key={b.key} className="ctl-item" style={{ insetInlineStart: `${b.left}%`, width: `${b.width}%`, top: `${b.top}px` }}>
                    <button
                      type="button"
                      className={`ctl-bar${b.dashed ? " is-break" : ""}${b.now ? " is-now" : ""}`}
                      aria-pressed={sel === b.key}
                      aria-controls="ctl-detail"
                      aria-label={b.label}
                      title={b.label}
                      onClick={() => show(b.key, true)}
                    >
                      {b.tiny ? null : <span>{b.short}</span>}
                    </button>
                  </li>
                ))}
              </ul>
              <div style={{ height: `${lane.height}px` }} aria-hidden="true" />
            </div>
          ))}
          <span className="ctl-now" style={{ insetInlineStart: "100%" }} aria-hidden="true">
            {present}
          </span>
        </div>
      </div>

      <div className="ctl-detail" id="ctl-detail" ref={boxRef}>
        {entries.map((e) => (
          <article key={e.key} id={`x-${e.key}`} data-key={e.key} hidden={e.key !== sel} aria-labelledby={`h-${e.key}`}>
            <h3 id={`h-${e.key}`}>
              {e.title}
              {e.org ? (
                <span className="muted">
                  {lang === "ar" ? "، " : ", "}
                  {e.org}
                </span>
              ) : null}
            </h3>
            <p className="when">{e.meta.filter(Boolean).join(lang === "ar" ? "، " : ", ")}</p>
            {e.points.length ? (
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
            {e.tech?.length ? (
              <p className="ctl-tech">
                {T.builtWith[lang]} <span dir="ltr">{e.tech.join(", ")}</span>
              </p>
            ) : null}
            {e.link ? (
              <p className="ctl-link">
                <Link href={e.link.href}>{e.link.label}</Link>
              </p>
            ) : null}
          </article>
        ))}
        <nav className="ctl-steps" aria-label={T.steps[lang]}>
          {newer ? (
            <button type="button" className="link-btn" onClick={() => show(newer.key, false)}>
              {T.later[lang]}: {newer.title}
            </button>
          ) : (
            <span />
          )}
          {older ? (
            <button type="button" className="link-btn" onClick={() => show(older.key, false)}>
              {T.earlier[lang]}: {older.title}
            </button>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
