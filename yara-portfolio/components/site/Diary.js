"use client";

// Yara's "What went wrong" diary: a closed notebook that opens into a lined spread.
// Left page: what went wrong. Right page: what she did next.
import { useEffect, useId, useRef, useState } from "react";
import { diaryUi } from "@/data/diary";
import { dirOf, fill, fmtMonth, fmtNumber } from "@/lib/i18n";

export default function Diary({ entries, lang, cover, startOpen = false }) {
  const [open, setOpen] = useState(startOpen);
  const [i, setI] = useState(0);
  const spreadRef = useRef(null);
  const headId = useId();
  const e = entries[i];
  const many = entries.length > 1;

  // When the book opens or a page turns, keep keyboard focus on the page.
  useEffect(() => {
    if (open && !startOpen) spreadRef.current?.focus({ preventScroll: true });
  }, [open, i, startOpen]);

  if (!open) {
    return (
      <button type="button" className="diary-cover" onClick={() => setOpen(true)} aria-expanded="false">
        <span className="diary-band" aria-hidden="true" />
        <span className="diary-cover-title">{cover}</span>
        <span className="diary-cover-cta">{diaryUi.open[lang]}</span>
      </button>
    );
  }

  return (
    <div className="diary">
      <article className="diary-spread" key={i} ref={spreadRef} tabIndex={-1} aria-labelledby={headId}>
        <div className="diary-page">
          <p className="diary-date">
            <time dateTime={e.date}>{fmtMonth(e.date, lang)}</time>
          </p>
          <h3 className="diary-title" id={headId}>
            {e.title[lang]}
          </h3>
          <p className="diary-text">{e.body[lang]}</p>
        </div>
        <div className="diary-page">
          <p className="diary-then">{diaryUi.then[lang]}</p>
          <p className="diary-text">{e.then[lang]}</p>
          {e.added && (
            <p className="diary-added">
              <span aria-hidden="true">✎ </span>
              {diaryUi.added[lang]}
            </p>
          )}
        </div>
      </article>
      <div className="diary-nav">
        {many && (
          <>
            <button type="button" className="link-btn" disabled={i === 0} onClick={() => setI(i - 1)}>
              {diaryUi.prev[lang]}
            </button>
            <span className="diary-count" aria-live="polite">
              {fill(diaryUi.page[lang], { n: fmtNumber(i + 1, lang), total: fmtNumber(entries.length, lang) })}
            </span>
            <button type="button" className="link-btn" disabled={i === entries.length - 1} onClick={() => setI(i + 1)}>
              {diaryUi.next[lang]}
            </button>
          </>
        )}
        {!startOpen && (
          <button type="button" className="link-btn diary-close" onClick={() => setOpen(false)}>
            {diaryUi.close[lang]}
          </button>
        )}
      </div>
    </div>
  );
}

// The diary from her desk, opened in a sheet over the room.
export function DiarySheet({ entries, lang, open, onClose, title }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="diary-sheet" aria-labelledby={titleId} lang={lang} dir={dirOf(lang)} onClose={onClose}>
      <h2 id={titleId}>{title}</h2>
      {open && <Diary entries={entries} lang={lang} cover={title} startOpen />}
      <form method="dialog" className="diary-sheet-foot">
        <button className="btn btn-quiet">{diaryUi.close[lang]}</button>
      </form>
    </dialog>
  );
}
