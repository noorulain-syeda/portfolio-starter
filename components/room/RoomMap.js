"use client";

// A floor plan of the room. The small one in the corner shows where you stand and
// which way you are looking; open it to see every spot and jump to one.
import { useRef, useState } from "react";
import { spots, roomUi, intro } from "@/data/room";
import { dirOf, otherLang } from "@/lib/i18n";
import { ANCHORS, PLAN, ROOM } from "./layout";

const PAD = 0.18;
const VB = { x: ROOM.x0 - PAD, y: ROOM.z0 - PAD, w: ROOM.x1 - ROOM.x0 + PAD * 2, h: ROOM.z1 - ROOM.z0 + PAD * 2 };

function Plan({ hot }) {
  const { rug, desk, chair, table, shelves, records, walls, door } = PLAN;
  const seg = (pts, cls) =>
    pts.reduce((acc, p, i) => (i % 2 ? [...acc, <line key={`${cls}${i}`} className={cls} x1={pts[i - 1][0]} y1={pts[i - 1][1]} x2={p[0]} y2={p[1]} />] : acc), []);
  return (
    <svg className="plan" viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true" dir="ltr">
      <rect className="plan-room" x={ROOM.x0} y={ROOM.z0} width={ROOM.x1 - ROOM.x0} height={ROOM.z1 - ROOM.z0} rx="0.08" />
      <rect className="plan-rug" x={rug[0]} y={rug[1]} width={rug[2]} height={rug[3]} rx="0.05" />
      <rect className="plan-thing" x={desk[0]} y={desk[1]} width={desk[2]} height={desk[3]} rx="0.04" />
      <circle className="plan-thing" cx={chair[0]} cy={chair[1]} r={chair[2]} />
      <rect className="plan-thing" x={table[0]} y={table[1]} width={table[2]} height={table[3]} rx="0.04" />
      <rect className="plan-thing" x={shelves[0]} y={shelves[1]} width={shelves[2]} height={shelves[3]} />
      <rect className="plan-thing" x={records[0]} y={records[1]} width={records[2]} height={records[3]} rx="0.04" />
      {seg(walls.certificates, "plan-wall-art")}
      {seg(walls.window, "plan-window")}
      {seg(walls.calligraphy, "plan-wall-art")}
      {seg(walls.board, "plan-wall-art")}
      {seg(walls.garden, "plan-wall-art")}
      <line className="plan-door-gap" x1={door[0]} y1={door[1]} x2={door[0] + door[2]} y2={door[1]} />
      <path className="plan-door" d={`M${door[0]} ${door[1]} L${door[0]} ${door[1] - door[2]} A${door[2]} ${door[2]} 0 0 1 ${door[0] + door[2]} ${door[1]}`} />
      {spots.map((s) => {
        const a = ANCHORS[s.id];
        return <circle key={s.id} className="plan-spot" data-hot={hot === s.id} cx={a[0]} cy={a[2]} r={hot === s.id ? 0.13 : 0.075} />;
      })}
      <g className="plan-you">
        <path className="plan-cone" d="M0 0 L-0.58 -0.95 A1.1 1.1 0 0 1 0.58 -0.95 Z" />
        <circle r="0.11" />
      </g>
    </svg>
  );
}

export default function RoomMap({ lang, focused, onSpot, onLang }) {
  const ref = useRef(null);
  const [hot, setHot] = useState(null);
  const other = otherLang(lang);

  function go(id) {
    ref.current?.close();
    onSpot(id);
  }

  return (
    <>
      <button type="button" className="map-thumb" onClick={() => ref.current?.showModal()} aria-label={roomUi.mapOpen[lang]} aria-haspopup="dialog">
        <Plan hot={focused} />
        <span className="map-thumb-label">{roomUi.map[lang]}</span>
      </button>

      <dialog ref={ref} className="map-panel" aria-labelledby="map-h" lang={lang} dir={dirOf(lang)}>
        <div className="map-head">
          <h2 id="map-h">{roomUi.map[lang]}</h2>
          <button type="button" className="link-btn" lang={other} dir={dirOf(other)} onClick={onLang} aria-label={intro.langSwitchLabel[lang]}>
            {intro.langSwitch[lang]}
          </button>
        </div>
        <div className="map-body">
          <div className="map-plan">
            <Plan hot={hot ?? focused} />
          </div>
          <p className="map-legend">
            <svg viewBox="-1 -1.2 2 1.5" aria-hidden="true">
              <path className="plan-cone" d="M0 0 L-0.58 -0.95 A1.1 1.1 0 0 1 0.58 -0.95 Z" />
              <circle r="0.2" />
            </svg>
            {roomUi.youAreHere[lang]}
          </p>
          <ul className="map-list">
            {spots.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  onMouseEnter={() => setHot(s.id)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(s.id)}
                  onBlur={() => setHot(null)}
                >
                  {s.label[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="map-foot">
          <button className="btn btn-quiet">{roomUi.mapClose[lang]}</button>
        </form>
      </dialog>
    </>
  );
}
