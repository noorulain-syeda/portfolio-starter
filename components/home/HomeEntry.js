"use client";

// The home route: Yara's hello with her lanyard, then her room in first person.
// The room loads behind the hello, so tapping the badge walks you straight in.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { cv } from "@/data/cv";
import { withBase } from "@/lib/withBase";
import { dirOf, otherLang } from "@/lib/i18n";
import { applyTheme, currentTheme } from "@/lib/theme";
import { forgetReturning, useLiteDevice, useReducedMotion, useReturning, useRoomMode, useTheme } from "@/lib/hooks";
import { arefRuqaa, plexArabic, plexMono, plexSans } from "@/lib/fonts";
import { roomUi, spots } from "@/data/room";
import Intro from "./Intro";
import PortfolioWindow from "./PortfolioWindow";
import RoomUI from "@/components/room/RoomUI";
import { createMusic } from "@/components/room/music";

// three.js is only downloaded in the browser, once we know WebGL works.
const RoomScene = dynamic(() => import("@/components/room/RoomScene"), { ssr: false });

const fonts = {
  sans: plexSans.style.fontFamily,
  arabic: plexArabic.style.fontFamily,
  ruqaa: arefRuqaa.style.fontFamily,
  mono: plexMono.style.fontFamily,
};

export default function HomeEntry() {
  const router = useRouter();
  const mode = useRoomMode();
  const lite = useLiteDevice();
  const reduced = useReducedMotion();
  const theme = useTheme();
  const returning = useReturning();
  const [lang, setLang] = useState("en");
  const [entered, setEntered] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const [focused, setFocused] = useState(null);
  const [hint, setHint] = useState(false);
  const [veil, setVeil] = useState(false);
  const api = useRef(null);
  const layerRef = useRef(null);
  const tagRef = useRef(null);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const leaving = useRef(false);
  const walkPending = useRef(false);
  const musicRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(null); // { lang, n }: the portfolio window, if it is open

  // The record player's music is made on first use (browsers allow sound only after a tap).
  const music = useCallback(() => {
    if (!musicRef.current) {
      musicRef.current = createMusic();
      musicRef.current.subscribe(setPlaying);
    }
    return musicRef.current;
  }, []);
  useEffect(() => () => musicRef.current?.dispose(), []);

  const inRoom = returning || entered;
  // The room is heavy to build, so it waits until her name has finished arriving (or until you
  // tap the badge) instead of fighting the animation for the processor.
  const [roomReady, setRoomReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setRoomReady(true), 1800);
    return () => clearTimeout(id);
  }, []);
  const showIntro = !returning && !introGone;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
  }, [lang]);

  useEffect(() => {
    delete document.documentElement.dataset.return;
    router.prefetch("/en/");
    router.prefetch("/ar/");
    return () => forgetReturning();
  }, [router]);

  const startWalk = useCallback(() => {
    if (!api.current) {
      walkPending.current = true;
      return;
    }
    api.current.walkIn().then(() => setHint(true));
  }, []);

  const explore = useCallback(() => {
    setEntered(true);
    setTimeout(() => setIntroGone(true), reduced ? 0 : 300);
    startWalk();
  }, [reduced, startWalk]);

  const go = useCallback(
    async (l, hash = "", fly = true) => {
      if (leaving.current) return;
      leaving.current = true;
      musicRef.current?.stop();
      sessionStorage.setItem("desk:return", l);
      if (fly && !hash && api.current && inRoom) await api.current.flyIntoScreen();
      setVeil(true);
      setTimeout(() => router.push(`/${l}/${hash}`), reduced ? 0 : 220);
    },
    [router, reduced, inRoom]
  );

  // Opening the portfolio puts it in a window over the room (opening it again brings it back).
  const openWin = useCallback((l) => {
    setHint(false);
    setWin((w) => ({ lang: l, n: (w?.n || 0) + 1 }));
  }, []);

  const downloadCv = useCallback(() => {
    const a = document.createElement("a");
    a.href = withBase(cv.cvFile);
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  const back = useCallback(() => {
    if (!focused) return;
    setFocused(null);
    api.current?.back();
  }, [focused]);

  const onSpot = useCallback(
    (id, half) => {
      if (id === "lamp") {
        applyTheme(currentTheme() === "dark" ? "light" : "dark");
        return;
      }
      if (id === "monitor" && half) {
        openWin(half);
        return;
      }
      setHint(false);
      // Things that do something do it straight away, with no button in between.
      if (id === "records") {
        const m = music();
        if (m.playing && focused === "records") {
          m.stop();
          return;
        }
        if (!m.playing) m.start();
      }
      if (id === "drive" && focused !== "drive") downloadCv();
      if (id === "diary") setDiaryOpen(true);
      if (id === focused) return;
      setFocused(id);
      api.current?.focus(id);
    },
    [openWin, music, focused, downloadCv]
  );

  // Tap anywhere that isn't a thing: step back (or just put the welcome line away).
  const onEmpty = useCallback(() => {
    if (focused) {
      setFocused(null);
      api.current?.back();
    } else setHint(false);
  }, [focused]);

  const closeDiary = useCallback(() => {
    setDiaryOpen(false);
    if (focused === "diary") {
      setFocused(null);
      api.current?.back();
    }
  }, [focused]);

  const labels = useMemo(() => Object.fromEntries(spots.map((s) => [s.id, s.label[lang]])), [lang]);

  const onAction = useCallback(
    (a) => {
      if (a.enter) openWin(a.enter);
      else if (a.go) go(lang, `#${a.go}`);
      else if (a.download) downloadCv();
      else if (a.music) music().toggle();
      else if (a.diary) setDiaryOpen(true);
    },
    [go, openWin, lang, downloadCv, music]
  );

  const onEscape = useCallback(() => {
    if (document.querySelector("dialog[open]")) return;
    back();
  }, [back]);

  const toggleLang = useCallback(() => setLang((l) => otherLang(l)), []);

  return (
    <div className="home" data-in-room={inRoom}>
      {mode === "3d" && (roomReady || inRoom) && (
        <RoomScene
          reduced={reduced}
          theme={theme}
          fonts={fonts}
          lite={lite}
          active={inRoom}
          playing={playing}
          start={returning ? "return" : "door"}
          layerRef={layerRef}
          tagRef={tagRef}
          labels={labels}
          onSpot={onSpot}
          onEmpty={onEmpty}
          onEscape={onEscape}
          onLooked={() => setHint(false)}
          onReady={(a) => {
            api.current = a;
            if (walkPending.current) {
              walkPending.current = false;
              a.walkIn().then(() => setHint(true));
            }
          }}
        />
      )}
      {mode === "loading" && (
        <p className="room-loading" aria-hidden="true">
          {roomUi.loading[lang]}
        </p>
      )}

      {inRoom && (
        <RoomUI
          lang={lang}
          mode={mode === "html" ? "html" : "3d"}
          focused={focused}
          hint={hint}
          layerRef={layerRef}
          tagRef={tagRef}
          reduced={reduced}
          diaryOpen={diaryOpen}
          onDiaryClose={closeDiary}
          onSpot={onSpot}
          onAction={onAction}
          onLang={toggleLang}
          playing={playing}
          onStopMusic={() => musicRef.current?.stop()}
        />
      )}

      {showIntro && (
        <Intro lang={lang} reduced={reduced} leaving={entered} onExplore={explore} onSkip={() => go(lang, "", false)} onLang={toggleLang} />
      )}

      {win && <PortfolioWindow key={win.n} lang={win.lang} onClose={() => setWin(null)} />}

      <div className="desk-veil" data-on={veil} aria-hidden="true" />
    </div>
  );
}
