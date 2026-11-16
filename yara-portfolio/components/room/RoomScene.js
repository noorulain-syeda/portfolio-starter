"use client";

// Yara's room in first person. One renderer for the life of the page.
// You stand where she stands: drag (or use the arrow keys) to turn your head,
// tap something to step closer, and the monitor takes you into the portfolio.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildRoom } from "./buildRoom";
import { createIdleScreen } from "@/components/desk/idleScreen";

const DOOR = { pos: new THREE.Vector3(1.2, 1.56, 2.15), yaw: 0.38, pitch: -0.03 };
const SCREEN = new THREE.Vector3(0, 1.01, -0.922);
const PITCH_MIN = -1.05;
const PITCH_MAX = 0.8;

const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const lerp = (a, b, k) => a + (b - a) * k;

// Yaw/pitch that look from `pos` at `target`. Yaw 0 faces the desk (-z); positive turns left.
function aim(pos, target) {
  const d = new THREE.Vector3().subVectors(target, pos).normalize();
  return { yaw: Math.atan2(-d.x, -d.z), pitch: Math.asin(THREE.MathUtils.clamp(d.y, -1, 1)) };
}
function forward(yaw, pitch, out = new THREE.Vector3()) {
  const c = Math.cos(pitch);
  return out.set(-Math.sin(yaw) * c, Math.sin(pitch), -Math.cos(yaw) * c);
}

// Piecewise-linear keyframes: [[k, value], ...].
function keyed(frames, k) {
  for (let i = 1; i < frames.length; i++) {
    const [k1, v1] = frames[i];
    const [k0, v0] = frames[i - 1];
    if (k <= k1) return lerp(v0, v1, ease((k - k0) / (k1 - k0)));
  }
  return frames[frames.length - 1][1];
}


export default function RoomScene({ reduced, theme, fonts, lite, active, playing, start, layerRef, tagRef, labels, onSpot, onEmpty, onEscape, onLooked, onReady }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);
  const handlers = useRef({ onSpot, onEmpty, onEscape, onLooked, onReady, labels });
  const activeRef = useRef(active);
  const playingRef = useRef(playing);

  useEffect(() => {
    handlers.current = { onSpot, onEmpty, onEscape, onLooked, onReady, labels };
    activeRef.current = active;
    playingRef.current = playing;
  });

  useEffect(() => {
    const mount = mountRef.current;
    let raf = 0;
    let frame = 0;

    // ---------- Renderer, sized for the device ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: lite ? "default" : "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = !lite;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor("#dfe7f4");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(58, 1, 0.04, 30);

    // ---------- Lights ----------
    const hemi = new THREE.HemisphereLight("#ffffff", "#7f95bd", 1.1);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight("#ffffff", 2.2);
    sun.position.set(-4.2, 3.4, -0.2);
    sun.target.position.set(0.6, 0.5, -0.6);
    sun.castShadow = !lite;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 10 });
    sun.shadow.bias = -0.0004;
    sun.shadow.radius = 3;
    scene.add(sun, sun.target);
    const ceilingLight = new THREE.PointLight("#dbe6ff", 0, 7, 1.6);
    ceilingLight.position.set(0, 2.45, 0.4);
    scene.add(ceilingLight);

    // ---------- The room ----------
    const room = buildRoom({ fonts, shadows: !lite });
    scene.add(room.root);
    room.lamp.light.castShadow = !lite;

    const idle = createIdleScreen({ monoFont: fonts.mono, arabicFont: fonts.arabic, reduced });
    room.screen.material.map = idle.texture;
    room.screen.material.needsUpdate = true;
    let fontsReady = false;
    Promise.all([
      document.fonts.load(`500 40px ${fonts.mono}`),
      document.fonts.load(`600 48px ${fonts.arabic}`, "يارا"),
      document.fonts.load(`600 24px ${fonts.sans}`),
      document.fonts.load(`400 24px ${fonts.sans}`),
      document.fonts.load(`400 120px ${fonts.ruqaa}`, "خط قلم"),
    ])
      .catch(() => {})
      .finally(() => {
        fontsReady = true;
        room.repaint.forEach((r) => r());
        idle.restart();
      });

    function applyTheme(next) {
      const night = next === "dark";
      hemi.intensity = night ? 0.22 : 1.1;
      hemi.color.set(night ? "#9fb4ff" : "#ffffff");
      sun.intensity = night ? 0.35 : 2.2;
      sun.color.set(night ? "#8fb0ff" : "#ffffff");
      ceilingLight.intensity = night ? 2.6 : 0;
      scene.environmentIntensity = night ? 0.12 : 0.45;
      room.lamp.light.intensity = night ? 6 : 0;
      room.lamp.bulb.emissiveIntensity = night ? 2.2 : 0;
      room.setNight(night);
    }
    applyTheme(theme);

    // ---------- Where you stand and where you look ----------
    const home = { pos: new THREE.Vector3(), yaw: 0, pitch: 0 };
    const eye = { pos: new THREE.Vector3(), yaw: 0, pitch: 0 };
    let tween = null;
    let focused = null;

    function setHome(aspect) {
      // On a tall phone screen, stand a step further back so more of the desk fits.
      home.pos.set(0, 1.52, aspect < 1 ? 1.55 : 0.95);
      const a = aim(home.pos, new THREE.Vector3(0, 1.2, -1.5));
      home.yaw = a.yaw;
      home.pitch = a.pitch;
    }

    function fit() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect >= 1.3 ? 56 : camera.aspect >= 1 ? 62 : 74;
      camera.updateProjectionMatrix();
      const before = home.pos.z;
      setHome(camera.aspect);
      if (!focused && !tween && before !== home.pos.z && started) eye.pos.copy(home.pos);
    }
    let started = false;
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    function moveTo(pos, yaw, pitch, ms, { curve = ease, path } = {}) {
      return new Promise((resolve) => {
        const from = { pos: eye.pos.clone(), yaw: eye.yaw, pitch: eye.pitch };
        const dYaw = wrapAngle(yaw - from.yaw);
        if (reduced || ms === 0) {
          eye.pos.copy(pos);
          eye.yaw = from.yaw + dYaw;
          eye.pitch = pitch;
          tween = null;
          resolve();
          return;
        }
        const t0 = performance.now();
        tween = (now) => {
          const k = Math.min(1, (now - t0) / ms);
          if (path) path(k, from);
          else {
            const e = curve(k);
            eye.pos.lerpVectors(from.pos, pos, e);
            eye.yaw = from.yaw + dYaw * e;
            eye.pitch = lerp(from.pitch, pitch, e);
          }
          if (k === 1) {
            tween = null;
            resolve();
          }
        };
      });
    }

    function lookAt(pos, target, ms) {
      const a = aim(pos, target);
      return moveTo(pos, a.yaw, a.pitch, ms);
    }

    // Walking in from the door, glancing at the shelves on the way to the desk.
    function walkIn() {
      started = true;
      const to = home.pos.clone();
      return moveTo(to, home.yaw, home.pitch, 1800, {
        path: (k, from) => {
          const e = ease(k);
          eye.pos.lerpVectors(from.pos, to, e);
          const steps = Math.sin(e * Math.PI * 6);
          eye.pos.y += Math.abs(steps) * 0.022 * (1 - e);
          eye.pos.x += steps * 0.008 * (1 - e);
          eye.yaw = keyed([[0, from.yaw], [0.42, -0.62], [0.7, -0.4], [1, home.yaw]], k);
          eye.pitch = keyed([[0, from.pitch], [0.42, 0.04], [0.75, 0.1], [1, home.pitch]], k);
        },
      });
    }

    // ---------- Start pose ----------
    if (start === "return") {
      started = true;
      eye.pos.set(0, 1.01, -0.6);
      Object.assign(eye, aim(eye.pos, SCREEN));
      setTimeout(() => moveTo(home.pos.clone(), home.yaw, home.pitch, 900), 60);
    } else if (start === "room") {
      started = true;
      eye.pos.copy(home.pos);
      eye.yaw = home.yaw;
      eye.pitch = home.pitch;
    } else {
      eye.pos.copy(DOOR.pos);
      eye.yaw = DOOR.yaw;
      eye.pitch = DOOR.pitch;
    }

    // ---------- Pointer: drag to look, tap to pick ----------
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const el = renderer.domElement;
    let drag = null;
    let vel = { yaw: 0, pitch: 0 };
    let looked = false;
    const keys = new Set();

    function pick(ev) {
      const r = el.getBoundingClientRect();
      ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(room.pickables, true)[0];
      if (!hit) return null;
      let obj = hit.object;
      while (obj && !obj.userData.spot) obj = obj.parent;
      if (!obj) return null;
      const spot = obj.userData.spot;
      const half = spot === "monitor" && hit.uv ? (hit.uv.x < 0.5 ? "en" : "ar") : null;
      return { spot, half, group: obj };
    }

    // ---------- Glow: what's under the pointer lights up ----------
    // Each thing you can touch gets its own copies of its materials, so it can glow alone.
    // (Nested things, like the plant on the record cabinet, keep their own.)
    const glow = new Map();
    const eachMesh = (g, fn) => {
      if (g.isMesh) fn(g);
      for (const c of g.children) {
        if (c.userData.spot) continue;
        eachMesh(c, fn);
      }
    };
    for (const g of room.pickables) {
      const clones = new Map();
      const list = [];
      const swap = (m) => {
        if (!m.emissive || m === room.lamp.bulb) return m;
        if (!clones.has(m)) {
          const c = m.clone();
          clones.set(m, c);
          list.push({ m: c, color: c.emissive.clone(), intensity: c.emissiveIntensity });
        }
        return clones.get(m);
      };
      eachMesh(g, (o) => {
        o.material = Array.isArray(o.material) ? o.material.map(swap) : swap(o.material);
      });
      glow.set(g, list);
    }
    const GLOW = new THREE.Color("#5b86ff");
    const lit = new Map();
    function setGlow(g, a) {
      const v = Math.round(a * 50) / 50;
      if ((lit.get(g) || 0) === v) return;
      lit.set(g, v);
      for (const { m, color, intensity } of glow.get(g) || []) {
        if (v === 0) {
          m.emissive.copy(color);
          m.emissiveIntensity = intensity;
        } else {
          m.emissive.copy(color).lerp(GLOW, 0.85);
          m.emissiveIntensity = intensity + v;
        }
      }
    }
    let hovered = null;
    function hover(hit, ev) {
      const g = hit?.group || null;
      if (g !== hovered) {
        if (hovered) setGlow(hovered, 0);
        hovered = g;
        if (g) setGlow(g, 0.45);
      }
      const tag = tagRef?.current;
      if (!tag) return;
      if (hit && ev && hit.spot !== "monitor") {
        const r = mount.getBoundingClientRect();
        tag.textContent = handlers.current.labels?.[hit.spot] || "";
        tag.style.transform = `translate3d(${ev.clientX - r.left + 16}px, ${ev.clientY - r.top + 18}px, 0)`;
        tag.hidden = false;
      } else tag.hidden = true;
    }

    function turnRate() {
      // Same feel on any screen: a full-width drag turns about one field of view.
      return THREE.MathUtils.degToRad(camera.fov * camera.aspect) / Math.max(320, el.clientWidth);
    }

    function onDown(ev) {
      if (!activeRef.current || tween) return;
      drag = { x: ev.clientX, y: ev.clientY, x0: ev.clientX, y0: ev.clientY, t: performance.now() };
      vel = { yaw: 0, pitch: 0 };
      el.setPointerCapture?.(ev.pointerId);
      el.style.cursor = "grabbing";
    }
    function onMove(ev) {
      if (!activeRef.current) return;
      if (drag) {
        const r = turnRate();
        const dx = ev.clientX - drag.x;
        const dy = ev.clientY - drag.y;
        drag.x = ev.clientX;
        drag.y = ev.clientY;
        eye.yaw += dx * r;
        eye.pitch = THREE.MathUtils.clamp(eye.pitch + dy * r, PITCH_MIN, PITCH_MAX);
        vel = { yaw: dx * r, pitch: dy * r };
        if (!looked && Math.hypot(ev.clientX - drag.x0, ev.clientY - drag.y0) > 30) {
          looked = true;
          handlers.current.onLooked?.();
        }
        return;
      }
      if (ev.pointerType === "mouse" && !tween) {
        const hit = pick(ev);
        idle.setHover(hit?.half ?? null);
        hover(hit, ev);
        el.style.cursor = hit ? "pointer" : "grab";
      }
    }
    function onUp(ev) {
      if (!drag) return;
      const moved = Math.hypot(ev.clientX - drag.x0, ev.clientY - drag.y0);
      const quick = performance.now() - drag.t < 600;
      drag = null;
      el.style.cursor = "grab";
      if (moved < 7 && quick) {
        vel = { yaw: 0, pitch: 0 };
        const hit = pick(ev);
        hover(null);
        // Tap a thing to see it; tap anywhere else to step back.
        if (hit) handlers.current.onSpot(hit.spot, hit.half);
        else handlers.current.onEmpty?.();
      }
      if (reduced) vel = { yaw: 0, pitch: 0 };
    }
    function onLeave() {
      idle.setHover(null);
      hover(null);
    }
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);
    el.style.cursor = "grab";
    el.style.touchAction = "none";

    // Arrow keys turn your head; Esc steps back.
    function onKey(ev) {
      if (!activeRef.current) return;
      if (ev.key === "Escape") {
        // Only on key down: by key up an open dialog has already closed itself.
        if (ev.type === "keydown") handlers.current.onEscape?.();
        return;
      }
      if (!ev.key.startsWith("Arrow")) return;
      const t = ev.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (ev.type === "keydown") {
        keys.add(ev.key);
        ev.preventDefault();
        if (!looked) {
          looked = true;
          handlers.current.onLooked?.();
        }
      } else keys.delete(ev.key);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    const clearKeys = () => keys.clear();
    window.addEventListener("blur", clearKeys);

    // ---------- Dots that follow the objects ----------
    const proj = new THREE.Vector3();
    const toAnchor = new THREE.Vector3();
    const fwd = new THREE.Vector3();
    let dots = [];
    let yous = [];
    let rtl = false;
    function placeDots() {
      const layer = layerRef?.current;
      if (!layer) return;
      if (frame % 30 === 0 || dots.length === 0) {
        dots = [...layer.querySelectorAll(".spots [data-spot]")];
        yous = [...layer.querySelectorAll(".plan-you")];
        rtl = layer.dir === "rtl";
      }
      // The "you are here" marker on the floor-plan map.
      if (frame % 3 === 0) {
        const tr = `translate(${eye.pos.x.toFixed(2)} ${eye.pos.z.toFixed(2)}) rotate(${((-eye.yaw * 180) / Math.PI).toFixed(1)})`;
        for (const y of yous) y.setAttribute("transform", tr);
      }
      const w = el.clientWidth;
      const h = el.clientHeight;
      const hideAll = !activeRef.current || !!tween || !!focused;
      forward(eye.yaw, eye.pitch, fwd);
      for (const d of dots) {
        const a = room.anchors[d.dataset.spot];
        if (!a) continue;
        toAnchor.subVectors(a, camera.position);
        proj.copy(a).project(camera);
        const show = !hideAll && toAnchor.dot(fwd) > 0.15 && Math.abs(proj.x) < 0.96 && Math.abs(proj.y) < 0.92;
        const state = show ? "true" : "false";
        if (d.dataset.visible !== state) d.dataset.visible = state;
        if (show) {
          const x = ((proj.x + 1) / 2) * w;
          d.style.transform = `translate3d(${x}px, ${((1 - proj.y) / 2) * h}px, 0)`;
          const flip = (rtl ? x < 170 : x > w - 170) ? "true" : "false";
          if (d.dataset.flip !== flip) d.dataset.flip = flip;
        }
      }
    }

    // ---------- Loop ----------
    const clock = { last: performance.now() };
    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      frame++;
      const dt = Math.min(0.05, (now - clock.last) / 1000);
      clock.last = now;
      // Behind the intro card, a few frames a second is enough.
      if (!activeRef.current && !tween && frame % 4 !== 0) return;
      room.turntable.update(dt, playingRef.current);

      if (tween) tween(now);
      else if (!drag && (vel.yaw || vel.pitch)) {
        eye.yaw += vel.yaw;
        eye.pitch = THREE.MathUtils.clamp(eye.pitch + vel.pitch, PITCH_MIN, PITCH_MAX);
        vel.yaw *= 0.9;
        vel.pitch *= 0.9;
        if (Math.abs(vel.yaw) < 1e-4 && Math.abs(vel.pitch) < 1e-4) vel = { yaw: 0, pitch: 0 };
      }
      if (keys.size && !tween) {
        const s = 1.6 * dt;
        if (keys.has("ArrowLeft")) eye.yaw += s;
        if (keys.has("ArrowRight")) eye.yaw -= s;
        if (keys.has("ArrowUp")) eye.pitch = Math.min(PITCH_MAX, eye.pitch + s);
        if (keys.has("ArrowDown")) eye.pitch = Math.max(PITCH_MIN, eye.pitch - s);
      }

      // A person never stands perfectly still: a slow breath in the view.
      const t = now / 1000;
      const breathe = reduced ? 0 : 1;
      camera.position.copy(eye.pos);
      camera.position.y += Math.sin(t * 1.3) * 0.004 * breathe;
      const yaw = eye.yaw + Math.sin(t * 0.37) * 0.004 * breathe;
      const pitch = eye.pitch + Math.sin(t * 0.53) * 0.003 * breathe;
      camera.lookAt(forward(yaw, pitch, fwd).add(camera.position));

      if (fontsReady) idle.draw(now);
      renderer.render(scene, camera);
      placeDots();
    }
    raf = requestAnimationFrame(loop);

    // ---------- What the page can ask the room to do ----------
    const api = {
      walkIn: () => (started ? Promise.resolve() : walkIn()),
      focus: (id) => {
        const vw = room.views[id];
        if (!vw) return Promise.resolve();
        focused = id;
        const a = aim(vw.pos, vw.target);
        // On tall screens Yara's words cover the lower half, so look a little lower
        // and the object sits in the visible top half.
        const tilt = camera.aspect < 0.9 ? 0.32 : 0;
        hover(null);
        room.pickables.forEach((g) => setGlow(g, 0));
        return moveTo(vw.pos, a.yaw, Math.max(PITCH_MIN, a.pitch - tilt), 650);
      },
      back: () => {
        focused = null;
        return moveTo(home.pos.clone(), home.yaw, home.pitch, 550);
      },
      flyIntoScreen: () => {
        focused = "monitor";
        const close = new THREE.Vector3(0, 1.01, -0.6);
        const a = aim(close, SCREEN);
        return moveTo(close, a.yaw, a.pitch, 800);
      },
    };
    stateRef.current = { applyTheme };
    handlers.current.onReady?.(api);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", clearKeys);
      idle.dispose();
      envTex.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const m = o.material;
        const mats = Array.isArray(m) ? m : m ? [m] : [];
        for (const x of mats) {
          x.map?.dispose();
          x.dispose();
        }
      });
      renderer.dispose();
      el.remove();
      stateRef.current = null;
    };
    // The room is built once; theme changes are applied below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stateRef.current?.applyTheme(theme);
  }, [theme]);

  return <div ref={mountRef} className="room-canvas" aria-hidden="true" />;
}
