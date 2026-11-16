"use client";

// Yara's lanyard: a strap hanging from the top of the screen with her badge on the end.
// The strap is a small verlet rope. It hangs straight and still when the page opens (no
// drop-in, nothing running); drag the badge and let go to swing it, and the physics goes
// back to sleep once it stops. With reduced motion it simply hangs still.
import { useEffect, useId, useRef } from "react";

const N = 16; // rope points
const GRAVITY = 2400; // px/s²
const DAMPING = 0.978;
const ITERATIONS = 18;

export default function Lanyard({ strapText, reduced, children, label, onTap }) {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const badgeRef = useRef(null);
  const strapId = `strap${useId().replace(/:/g, "")}`;
  const movedRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const badge = badgeRef.current;
    const path = pathRef.current;
    let raf = 0;
    let anchor = { x: 0, y: -30 };
    let rest = 14;
    const p = Array.from({ length: N }, () => ({ x: 0, y: 0, px: 0, py: 0 }));
    const inv = p.map((_, i) => (i === 0 ? 0 : i === N - 1 ? 0.35 : 1));
    let grab = null;
    let angle = 0;

    function layout() {
      const r = wrap.getBoundingClientRect();
      anchor = { x: r.width / 2, y: -30 };
      const room = r.height - badge.offsetHeight - 24;
      const len = Math.max(70, Math.min(room, r.height * 0.42, 300));
      rest = len / (N - 1);
      // Hangs straight down, at rest, from the first frame.
      p.forEach((pt, i) => {
        pt.x = pt.px = anchor.x;
        pt.y = pt.py = anchor.y + rest * i;
      });
    }

    function solve() {
      for (let it = 0; it < ITERATIONS; it++) {
        for (let i = 0; i < N - 1; i++) {
          const a = p[i];
          const b = p[i + 1];
          const wa = inv[i];
          const wb = grab && i + 1 === N - 1 ? 0 : inv[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - rest) / d;
          const sum = wa + wb;
          if (!sum) continue;
          a.x += dx * diff * (wa / sum);
          a.y += dy * diff * (wa / sum);
          b.x -= dx * diff * (wb / sum);
          b.y -= dy * diff * (wb / sum);
        }
        p[0].x = anchor.x;
        p[0].y = anchor.y;
      }
    }

    function step(dt) {
      for (let i = 1; i < N; i++) {
        const pt = p[i];
        if (grab && i === N - 1) continue;
        const vx = (pt.x - pt.px) * DAMPING;
        const vy = (pt.y - pt.py) * DAMPING;
        pt.px = pt.x;
        pt.py = pt.y;
        pt.x += vx;
        pt.y += vy + GRAVITY * dt * dt;
      }
      solve();
    }

    function draw() {
      // A smooth strap through the rope points.
      let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
      for (let i = 1; i < N - 1; i++) {
        const mx = (p[i].x + p[i + 1].x) / 2;
        const my = (p[i].y + p[i + 1].y) / 2;
        d += ` Q${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
      }
      const end = p[N - 1];
      d += ` L${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
      path.setAttribute("d", d);
      // The badge hangs along the last bit of strap.
      const prev = p[N - 3];
      const target = Math.atan2(prev.x - end.x, end.y - prev.y);
      angle += (target - angle) * 0.35;
      badge.style.transform = `translate(${end.x.toFixed(1)}px, ${end.y.toFixed(1)}px) translate(-50%, 0) rotate(${angle.toFixed(4)}rad)`;
      return target;
    }

    // Is anything still moving? Checked after every frame so the loop can sleep.
    function moving(target) {
      let fastest = 0;
      for (let i = 1; i < N; i++) fastest = Math.max(fastest, Math.hypot(p[i].x - p[i].px, p[i].y - p[i].py));
      return fastest > 0.01 || Math.abs(target - angle) > 0.0005;
    }

    layout();
    solve();
    draw();

    let last = performance.now();
    let acc = 0;
    let calm = 0;
    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        last = now;
        return;
      }
      acc += Math.min(0.05, (now - last) / 1000);
      last = now;
      const dt = 1 / 120;
      while (acc >= dt) {
        step(dt);
        acc -= dt;
      }
      const target = draw();
      // Once it has hung still for half a second, stop the loop until the next drag.
      if (!grab && !moving(target)) {
        if (++calm > 30) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else {
        calm = 0;
      }
    }
    function wake() {
      if (raf || reduced) return;
      last = performance.now();
      acc = 0;
      calm = 0;
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      const old = anchor.x;
      const r = wrap.getBoundingClientRect();
      if (Math.abs(r.width / 2 - old) > 1 || reduced) {
        layout();
        solve();
        draw();
      }
    });
    ro.observe(wrap);

    // Drag the badge.
    function toLocal(ev) {
      const r = wrap.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    }
    function onDown(ev) {
      movedRef.current = 0;
      if (reduced) return;
      const q = toLocal(ev);
      const end = p[N - 1];
      grab = { dx: end.x - q.x, dy: end.y - q.y };
      badge.setPointerCapture(ev.pointerId);
      badge.dataset.grabbed = "true";
      wake();
    }
    function onMove(ev) {
      if (!grab) return;
      const q = toLocal(ev);
      movedRef.current += Math.abs(ev.movementX || 0) + Math.abs(ev.movementY || 0);
      let x = q.x + grab.dx;
      let y = q.y + grab.dy;
      // Keep the strap from stretching more than a little.
      const max = rest * (N - 1) * 1.08;
      const dx = x - anchor.x;
      const dy = y - anchor.y;
      const dist = Math.hypot(dx, dy);
      if (dist > max) {
        x = anchor.x + (dx / dist) * max;
        y = anchor.y + (dy / dist) * max;
      }
      const end = p[N - 1];
      end.x = x;
      end.y = y;
    }
    function onUp() {
      if (!grab) return;
      grab = null;
      badge.dataset.grabbed = "false";
    }
    badge.addEventListener("pointerdown", onDown);
    badge.addEventListener("pointermove", onMove);
    badge.addEventListener("pointerup", onUp);
    badge.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      badge.removeEventListener("pointerdown", onDown);
      badge.removeEventListener("pointermove", onMove);
      badge.removeEventListener("pointerup", onUp);
      badge.removeEventListener("pointercancel", onUp);
    };
  }, [reduced]);

  const strap = Array.from({ length: 6 }, () => strapText).join("   ·   ");

  return (
    <div className="lanyard" ref={wrapRef}>
      <svg className="lanyard-strap" aria-hidden="true" dir="ltr">
        <path id={strapId} ref={pathRef} className="lanyard-band" />
        <text className="lanyard-print" dy="4" direction="ltr">
          <textPath href={`#${strapId}`} startOffset="6">
            {strap}
          </textPath>
        </text>
      </svg>
      {/* The badge is the way in: a tap (not a drag) walks you into the room. */}
      <button
        type="button"
        className="badge"
        ref={badgeRef}
        data-grabbed="false"
        aria-label={label}
        onClick={() => {
          if (movedRef.current > 8) return;
          onTap?.();
        }}
      >
        {children}
      </button>
    </div>
  );
}
