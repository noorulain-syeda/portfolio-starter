"use client";

// Her skills as stickers: ten tool logos on white, die-cut tiles. Drag them anywhere
// on the page; tap one to open a card about that skill. "Tidy up" sends them all back.
// Logos are Simple Icons SVGs in /public/stickers (brand names and marks belong to their owners).
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/withBase";

// One sticker per skill group (keys match the group names in data/cv.js).
const LOGOS = {
  "Product Design": [["figma", "Figma"]],
  "Front-End Engineering": [["typescript", "TypeScript"]],
  "User Research": [["maze", "Maze"]],
  Accessibility: [["axe", "axe"]],
  "Back-End and APIs": [["nodedotjs", "Node.js"]],
  Leadership: [["slack", "Slack"]],
  Mobile: [["flutter", "Flutter"]],
  "Cloud and DevOps": [["amazonaws", "AWS"]],
  "Security and Compliance": [["cloudflare", "Cloudflare"]],
  "Data and AI": [["python", "Python"]],
};

// Logos supplied as PNG files; the rest are SVG.
const PNG = ["maze", "axe"];
function Logo({ slug, name, className }) {
  return <img className={className} src={withBase(`/stickers/${slug}.${PNG.includes(slug) ? "png" : "svg"}`)} alt={name} width="48" height="48" draggable="false" />;
}

// Where each sticker lands when the page opens (and after "Tidy up"), as a percentage of the board:
// loose and uneven, one pair for wide screens and one for phones. Plus each one's angle.
// Fixed numbers, so the server and the browser agree.
const SPOT = [
  [8, 22, 17, 12], [24, 62, 52, 18], [40, 20, 84, 10], [57, 58, 30, 36], [75, 20, 70, 40],
  [92, 52, 14, 58], [40, 80, 47, 62], [71, 84, 82, 60], [8, 80, 30, 84], [91, 84, 68, 86],
];
const TILT = [-8, 5, -3, 9, -6, 3, -9, 6, -2, 8];

export default function SkillStickers({ groups, hint, tidy, close }) {
  const boardRef = useRef(null);
  const closeRef = useRef(null);
  const lastRef = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);
  const top = useRef(10);
  const [picked, setPicked] = useState(null); // { group, logo }
  const [showHint, setShowHint] = useState(true);

  const stickers = groups.flatMap((g, gi) => (LOGOS[g.key] || []).map(([slug, name]) => ({ slug, name, gi })));

  function down(ev) {
    if (ev.button !== 0) return;
    const el = ev.currentTarget;
    el.setPointerCapture(ev.pointerId);
    drag.current = {
      el,
      sx: ev.clientX,
      sy: ev.clientY,
      ox: parseFloat(el.style.getPropertyValue("--tx")) || 0,
      oy: parseFloat(el.style.getPropertyValue("--ty")) || 0,
    };
    moved.current = false;
    el.style.zIndex = String(++top.current);
    el.dataset.held = "true";
  }
  function move(ev) {
    const d = drag.current;
    if (!d) return;
    const dx = ev.clientX - d.sx;
    const dy = ev.clientY - d.sy;
    if (!moved.current && Math.hypot(dx, dy) < 6) return;
    moved.current = true;
    d.el.style.setProperty("--tx", `${d.ox + dx}px`);
    d.el.style.setProperty("--ty", `${d.oy + dy}px`);
  }
  function up() {
    if (drag.current) delete drag.current.el.dataset.held;
    drag.current = null;
  }
  function open(ev, s) {
    if (moved.current) {
      moved.current = false;
      return;
    }
    lastRef.current = ev.currentTarget;
    setPicked(s);
  }
  function shut() {
    setPicked(null);
    lastRef.current?.focus();
  }
  function nudge(ev) {
    const step = { ArrowLeft: [-14, 0], ArrowRight: [14, 0], ArrowUp: [0, -14], ArrowDown: [0, 14] }[ev.key];
    if (!step) return;
    ev.preventDefault();
    const el = ev.currentTarget;
    el.style.setProperty("--tx", `${(parseFloat(el.style.getPropertyValue("--tx")) || 0) + step[0]}px`);
    el.style.setProperty("--ty", `${(parseFloat(el.style.getPropertyValue("--ty")) || 0) + step[1]}px`);
  }
  function tidyUp() {
    boardRef.current?.querySelectorAll(".sticker").forEach((el) => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    });
  }

  useEffect(() => {
    if (!picked) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && shut();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picked]);

  const g = picked ? groups[picked.gi] : null;

  return (
    <div className="stickers">
      <div className="stickers-top">
        {showHint ? (
          <div className="sticker-note">
            <button type="button" className="sticker-note-x" aria-label={close} onClick={() => setShowHint(false)}>
              ×
            </button>
            <p>{hint}</p>
          </div>
        ) : (
          <span />
        )}
        <button type="button" className="sticker-tidy" onClick={tidyUp}>
          {tidy}
        </button>
      </div>

      <div className="sticker-board" ref={boardRef}>
        {stickers.map((s, i) => (
          <button
            key={`${s.gi}-${s.slug}`}
            type="button"
            className="sticker"
            style={{ "--rot": `${TILT[i % TILT.length]}deg`, "--x": SPOT[i % SPOT.length][0], "--y": SPOT[i % SPOT.length][1], "--mx": SPOT[i % SPOT.length][2], "--my": SPOT[i % SPOT.length][3] }}
            title={`${s.name}: ${groups[s.gi].title}`}
            aria-label={`${s.name}: ${groups[s.gi].title}`}
            aria-haspopup="dialog"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={nudge}
            onClick={(ev) => open(ev, s)}
          >
            <Logo slug={s.slug} name={s.name} className="sticker-logo" />
          </button>
        ))}
      </div>

      {g ? (
        <div className="sticker-modal" onClick={shut}>
          <div className="sticker-card" role="dialog" aria-modal="true" aria-labelledby="sticker-card-h" onClick={(e) => e.stopPropagation()}>
            <button ref={closeRef} type="button" className="sticker-card-x" aria-label={close} onClick={shut}>
              ×
            </button>
            <div className="sticker-card-head">
              <span className="sticker-badge">
                <Logo slug={picked.slug} name={picked.name} className="sticker-logo" />
              </span>
              <div>
                <h3 id="sticker-card-h">{g.title}</h3>
                <p className="sticker-meta">{g.meta}</p>
              </div>
            </div>
            <p className="sticker-text">{g.text}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
