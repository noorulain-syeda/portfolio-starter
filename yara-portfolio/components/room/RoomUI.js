"use client";

// Everything drawn over the 3D room. No buttons sit on top of the scene: things in
// the room glow when you point at them, a tap shows them, and Yara talks in subtitles
// like a game character. Tap anywhere else to step back. Keyboard users still get a
// focusable button per spot (shown only while focused) and the floor-plan map.
// Without WebGL, the room becomes a plain list.
import { useEffect, useState } from "react";
import { spots, spotById, roomUi, intro } from "@/data/room";
import { ui } from "@/data/ui";
import { dirOf, otherLang } from "@/lib/i18n";
import ThemeToggle from "@/components/site/ThemeToggle";
import { Stamps } from "@/components/site/Contact";
import { DiarySheet } from "@/components/site/Diary";
import { diaryUi, lifeDiary } from "@/data/diary";
import RoomMap from "./RoomMap";

// A line of dialogue that types itself out. Tap it to finish the line at once.
function Line({ text, reduced }) {
  const [n, setN] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return Math.min(text.length, v + 2);
      });
    }, 26);
    return () => clearInterval(id);
  }, [text, reduced]);
  return (
    <p className="sub-text" onClick={() => setN(text.length)}>
      <span aria-hidden="true">
        {text.slice(0, n)}
        <span className="sub-rest">{text.slice(n)}</span>
      </span>
      <span className="sr-only">{text}</span>
    </p>
  );
}

// The plain-list fallback still uses real buttons.
function Actions({ spot, lang, onAction, playing }) {
  return spot.actions.map((a, i) => {
    if (a.enter) {
      const l = a.enter;
      return (
        <button key={i} type="button" className="btn btn-primary" lang={l} dir={dirOf(l)} onClick={() => onAction(a)}>
          {l === "ar" ? ui.desk.enterAr.ar : ui.desk.enterEn.en}
        </button>
      );
    }
    if (a.theme) return <ThemeToggle key={i} lang={lang} />;
    if (a.contact) return <Stamps key={i} lang={lang} />;
    if (a.diary || a.music || a.download)
      return (
        <button key={i} type="button" className="btn btn-primary" onClick={() => onAction(a)}>
          {a.diary ? a.label[lang] : a.music ? (playing ? roomUi.stop[lang] : roomUi.play[lang]) : ui.downloadCv[lang]}
        </button>
      );
    return (
      <button key={i} type="button" className="btn" onClick={() => onAction(a)}>
        {a.label[lang]}
      </button>
    );
  });
}

export default function RoomUI({
  lang,
  mode,
  focused,
  hint,
  reduced,
  layerRef,
  tagRef,
  onSpot,
  onAction,
  onLang,
  playing,
  onStopMusic,
  diaryOpen,
  onDiaryClose,
}) {
  const other = otherLang(lang);
  const spot = focused ? spotById[focused] : null;
  const line = spot
    ? spot.id === "records" && !playing
      ? roomUi.recordStopped[lang]
      : `${spot.says[lang]} ${spot.friend[lang]}`
    : null;

  return (
    <main className="room-ui" ref={layerRef} lang={lang} dir={dirOf(lang)} aria-labelledby="room-h">
      <h1 className="sr-only" id="room-h">
        {roomUi.title[lang]}
      </h1>

      {mode === "3d" && (
        <>
          <RoomMap lang={lang} focused={focused} onSpot={onSpot} onLang={onLang} />
          <div ref={tagRef} className="room-tag" hidden aria-hidden="true" />
          <div className="spots">
            {spots.map((s) => (
              <button key={s.id} type="button" className="spot" data-spot={s.id} data-visible="false" onClick={() => onSpot(s.id)}>
                <span className="spot-label">{s.label[lang]}</span>
              </button>
            ))}
          </div>

          {/* Yara talking, game style. */}
          {(spot || hint) && (
            <section className="subtitle" aria-live="polite" aria-labelledby="sub-who" data-wide={spot?.id === "contact"}>
              <p className="sub-who" id="sub-who">
                {roomUi.me[lang]}
                {spot ? <span className="sub-what">{spot.label[lang]}</span> : null}
              </p>
              <Line key={`${spot?.id || "hint"}-${lang}-${line ? "s" : "h"}`} text={line || roomUi.hint[lang]} reduced={reduced} />
              {spot?.id === "contact" && <Stamps lang={lang} />}
              <p className="sub-hint">
                <button type="button" className="sub-lang" lang={other} dir={dirOf(other)} onClick={onLang} aria-label={intro.langSwitchLabel[lang]}>
                  {intro.langSwitch[lang]}
                </button>
              </p>
            </section>
          )}

          {/* While the record plays, a way to stop it is always on screen. */}
          {playing && (
            <p className="now-playing">
              <span className="eq" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="now-playing-text">{roomUi.track[lang]}</span>
              <button type="button" className="sub-lang" onClick={onStopMusic}>
                {roomUi.stop[lang]}
              </button>
            </p>
          )}

          <DiarySheet entries={lifeDiary} lang={lang} open={diaryOpen} onClose={onDiaryClose} title={diaryUi.lifeCover[lang]} />
        </>
      )}

      {mode === "html" && (
        <div className="room-list">
          <p className="room-list-note">
            {roomUi.noWebgl[lang]}{" "}
            <button type="button" className="link-btn" lang={other} dir={dirOf(other)} onClick={onLang}>
              {intro.langSwitch[lang]}
            </button>
          </p>
          <ul>
            {spots.map((s) => (
              <li key={s.id}>
                <h2>{s.label[lang]}</h2>
                <p>{s.says[lang]} {s.friend[lang]}</p>
                <div className="say-actions">
                  <Actions spot={s} lang={lang} onAction={onAction} playing={playing} />
                </div>
              </li>
            ))}
          </ul>
          <DiarySheet entries={lifeDiary} lang={lang} open={diaryOpen} onClose={onDiaryClose} title={diaryUi.lifeCover[lang]} />
        </div>
      )}
    </main>
  );
}
