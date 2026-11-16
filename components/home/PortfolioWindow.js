"use client";

// The portfolio, opened as a window over her room: a title bar with close, minimise and zoom
// buttons, drag it by the bar, and the whole CV page inside. Minimise tucks it to a small tab
// at the bottom; zoom fills the screen and back.
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/withBase";
import { ui } from "@/data/ui";

export default function PortfolioWindow({ lang, onClose }) {
  const [min, setMin] = useState(false);
  const [max, setMax] = useState(false);
  const [dragging, setDragging] = useState(false);
  const winRef = useRef(null);
  const drag = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  // Phones: the window starts full screen.
  useEffect(() => {
    if (window.matchMedia("(max-width: 700px)").matches) setMax(true);
  }, []);

  function setPos(x, y) {
    pos.current = { x, y };
    winRef.current?.style.setProperty("--wx", `${x}px`);
    winRef.current?.style.setProperty("--wy", `${y}px`);
  }
  function down(ev) {
    if (max || ev.button !== 0 || ev.target.closest("button")) return;
    ev.currentTarget.setPointerCapture(ev.pointerId);
    drag.current = { sx: ev.clientX, sy: ev.clientY, ox: pos.current.x, oy: pos.current.y };
    setDragging(true);
  }
  function move(ev) {
    const d = drag.current;
    if (!d) return;
    const r = winRef.current.getBoundingClientRect();
    // Keep the three buttons and the title bar on screen so the window can always be grabbed again.
    const nx = d.ox + ev.clientX - d.sx;
    const ny = d.oy + ev.clientY - d.sy;
    const dx = Math.min(Math.max(nx - pos.current.x, -r.left), window.innerWidth - 120 - r.left);
    const dy = Math.min(Math.max(ny - pos.current.y, -r.top), window.innerHeight - 48 - r.top);
    setPos(pos.current.x + dx, pos.current.y + dy);
  }
  function up() {
    drag.current = null;
    setDragging(false);
  }

  const title = ui.siteTitle[lang];

  return (
    <>
      <div className="pwin-backdrop" aria-hidden="true" data-min={min} />
      <div
        ref={winRef}
        className="pwin"
        role="dialog"
        aria-label={title}
        data-min={min}
        data-max={max}
        data-dragging={dragging}
      >
        <div className="pwin-bar" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onDoubleClick={() => setMax((m) => !m)}>
          <div className="pwin-lights">
            <button type="button" className="pwin-light pwin-close" aria-label={ui.windowClose[lang]} onClick={onClose}>
              <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" /></svg>
            </button>
            <button type="button" className="pwin-light pwin-min" aria-label={ui.windowMinimize[lang]} onClick={() => setMin(true)}>
              <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 5h6" /></svg>
            </button>
            <button type="button" className="pwin-light pwin-zoom" aria-label={max ? ui.windowRestore[lang] : ui.windowZoom[lang]} onClick={() => setMax((m) => !m)}>
              <svg viewBox="0 0 10 10" aria-hidden="true">{max ? <path d="M2 6.5l2.5 0M3.5 8l0-2.5M8 3.5l-2.5 0M6.5 2l0 2.5" /> : <path d="M2.5 7.5l5-5M3.5 2.5h4v4" />}</svg>
            </button>
          </div>
          <span className="pwin-title">{title}</span>
        </div>
        <iframe className="pwin-frame" title={title} src={withBase(`/${lang}/`)} />
      </div>
      {min && (
        <button type="button" className="pwin-tab" onClick={() => setMin(false)}>
          <span className="pwin-tab-dot" aria-hidden="true" />
          {title}
        </button>
      )}
    </>
  );
}
