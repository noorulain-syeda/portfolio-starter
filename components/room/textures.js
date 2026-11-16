// Everything printed or painted in the room is drawn on 2D canvases, so the scene
// needs no image files. Colours stay in the site's single blue family.
import * as THREE from "three";

export const INK = {
  paper: "#f6f8fd",
  ink: "#0e2240",
  midad: "#2347c5",
  quiet: "#4b5e7e",
  rule: "#c2cfe6",
  pale: "#dbe6ff",
  wash: "#e3eaf6",
  night: "#071631",
};

// A canvas plus its texture. `paint(ctx, w, h)` runs now and again on redraw()
// (after the web fonts arrive).
export function canvasTexture(w, h, paint, { srgb = true, repeat } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (repeat) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat[0], repeat[1]);
  }
  const redraw = () => {
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    paint(ctx, w, h);
    ctx.restore();
    texture.needsUpdate = true;
  };
  redraw();
  return { texture, redraw };
}

// Split text into lines that fit `max` pixels with the current font.
function wrap(ctx, text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

// Fit text into at most `maxLines`, shrinking the font if needed. Returns the lines and size.
function fitLines(ctx, text, max, size, maxLines, weight, family) {
  let s = size;
  let lines;
  do {
    ctx.font = `${weight} ${s}px ${family}`;
    lines = wrap(ctx, text, max);
    s -= 1;
  } while (lines.length > maxLines && s > 10);
  return { lines, size: s + 1 };
}

function seal(ctx, x, y, r, filled) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 2 ? r : r * 1.12;
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  if (filled) {
    ctx.fillStyle = INK.midad;
    ctx.fill();
    ctx.strokeStyle = INK.pale;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.strokeStyle = INK.quiet;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}

function border(ctx, w, h, color = INK.midad) {
  ctx.fillStyle = INK.paper;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = INK.rule;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, 20, w - 40, h - 40);
}

// A professional certificate. Expired ones keep their place on the wall, marked as such.
export function paintCert(cert, fonts) {
  return (ctx, w, h) => {
    if (cert.status === "inProgress") {
      // The empty frame, with a note pinned inside.
      ctx.fillStyle = INK.wash;
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-0.06);
      ctx.fillStyle = "#c7d6f6";
      ctx.fillRect(-110, -78, 220, 156);
      ctx.fillStyle = INK.ink;
      ctx.textAlign = "center";
      ctx.font = `600 26px ${fonts.sans}`;
      ctx.fillText("CSAP", 0, -26);
      ctx.font = `400 21px ${fonts.sans}`;
      ctx.fillText("exam booked", 0, 10);
      ctx.fillText("Dec 2026", 0, 40);
      ctx.restore();
      return;
    }
    border(ctx, w, h, cert.status === "expired" ? INK.quiet : INK.midad);
    ctx.textAlign = "center";
    ctx.fillStyle = INK.quiet;
    const issuer = fitLines(ctx, cert.issuer, w - 60, 21, 2, 600, fonts.sans);
    issuer.lines.forEach((l, i) => ctx.fillText(l, w / 2, 52 + i * (issuer.size + 3)));
    ctx.fillStyle = INK.ink;
    const name = fitLines(ctx, cert.name, w - 52, 34, 3, 700, fonts.sans);
    const top = 132 - (name.lines.length - 1) * 10;
    name.lines.forEach((l, i) => ctx.fillText(l, w / 2, top + i * (name.size + 4)));
    ctx.textAlign = "left";
    ctx.font = `600 22px ${fonts.mono}`;
    ctx.fillStyle = INK.quiet;
    ctx.fillText(String(cert.year), 34, h - 34);
    if (cert.status === "expired") {
      ctx.textAlign = "center";
      ctx.font = `600 20px ${fonts.sans}`;
      ctx.fillText(`Expired ${cert.expired}`, w / 2, h - 34);
    }
    seal(ctx, w - 58, h - 52, 22, cert.status !== "expired");
  };
}

// A university diploma.
export function paintDegree(edu, fonts) {
  return (ctx, w, h) => {
    border(ctx, w, h, INK.ink);
    ctx.textAlign = "center";
    let y = 66;
    if (edu.school.en === "Najd Valley University") {
      ctx.direction = "rtl";
      ctx.font = `600 24px ${fonts.arabic}`;
      ctx.fillStyle = INK.ink;
      ctx.fillText(edu.school.ar, w / 2, y);
      ctx.direction = "ltr";
      y += 32;
    }
    ctx.fillStyle = INK.ink;
    ctx.font = `600 26px ${fonts.sans}`;
    ctx.fillText(edu.school.en, w / 2, y);
    ctx.fillStyle = INK.quiet;
    ctx.font = `400 19px ${fonts.sans}`;
    ctx.fillText("This is to certify that", w / 2, y + 40);
    ctx.fillStyle = INK.ink;
    ctx.font = `700 31px ${fonts.sans}`;
    ctx.fillText("Yara Saud Al-Mansouri", w / 2, y + 82);
    ctx.fillStyle = INK.quiet;
    ctx.font = `400 19px ${fonts.sans}`;
    ctx.fillText("has been awarded", w / 2, y + 116);
    ctx.fillStyle = INK.midad;
    const deg = fitLines(ctx, edu.degree.en, w - 80, 29, 2, 700, fonts.sans);
    deg.lines.forEach((l, i) => ctx.fillText(l, w / 2, y + 156 + i * (deg.size + 6)));
    ctx.textAlign = "left";
    ctx.fillStyle = INK.quiet;
    ctx.font = `500 18px ${fonts.mono}`;
    ctx.fillText(edu.end.slice(0, 4), 44, h - 42);
    seal(ctx, w - 74, h - 66, 30, true);
  };
}

export function paintPatent(p, fonts) {
  return (ctx, w, h) => {
    border(ctx, w, h, INK.midad);
    ctx.textAlign = "center";
    ctx.fillStyle = INK.quiet;
    ctx.font = `500 15px ${fonts.sans}`;
    ctx.fillText(p.number.en.replace(" (fictional)", ""), w / 2, 52);
    ctx.fillStyle = INK.ink;
    const title = fitLines(ctx, p.title.en, w - 56, 21, 5, 600, fonts.sans);
    title.lines.forEach((l, i) => ctx.fillText(l, w / 2, 100 + i * (title.size + 6)));
    ctx.fillStyle = INK.midad;
    ctx.font = `600 16px ${fonts.sans}`;
    ctx.fillText(p.status.en, w / 2, h - 46);
  };
}

// Her calligraphy: one word, large, with the rhombus dots calligraphers use to measure.
export function paintCalligraphy(word, fonts) {
  return (ctx, w, h) => {
    ctx.fillStyle = INK.paper;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = INK.ink;
    ctx.textAlign = "center";
    ctx.direction = "rtl";
    ctx.font = `400 ${Math.round(w * 0.46)}px ${fonts.ruqaa}`;
    ctx.fillText(word, w / 2, h * 0.6);
    ctx.fillStyle = INK.midad;
    for (let i = 0; i < 5; i++) {
      const x = w * 0.2;
      const y = h * 0.2 + i * 18;
      ctx.beginPath();
      ctx.moveTo(x, y - 7);
      ctx.lineTo(x + 7, y);
      ctx.lineTo(x, y + 7);
      ctx.lineTo(x - 7, y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.font = `500 22px ${fonts.arabic}`;
    ctx.fillStyle = INK.quiet;
    ctx.textAlign = "left";
    ctx.fillText("يارا", 34, h - 34);
  };
}

// Seeded random, so the stars and skyline are the same on every visit.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function paintWindow(night) {
  return (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    if (night) {
      g.addColorStop(0, "#050f24");
      g.addColorStop(1, "#1b3566");
    } else {
      g.addColorStop(0, "#9fbcf2");
      g.addColorStop(1, "#e8f0ff");
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const r = rng(7);
    if (night) {
      ctx.fillStyle = "#cfdcff";
      for (let i = 0; i < 70; i++) ctx.fillRect(r() * w, r() * h * 0.6, 2, 2);
      ctx.beginPath();
      ctx.arc(w * 0.72, h * 0.2, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#050f24";
      ctx.beginPath();
      ctx.arc(w * 0.72 + 11, h * 0.2 - 6, 24, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(w * 0.3, h * 0.22, 40, 0, Math.PI * 2);
      ctx.fill();
    }
    // A low skyline of flat roofs, with one tall tower.
    const sky = rng(3);
    let x = 0;
    while (x < w) {
      const bw = 30 + sky() * 60;
      const bh = 50 + sky() * 110;
      ctx.fillStyle = night ? "#0b1a33" : "#8fa6cf";
      ctx.fillRect(x, h - bh, bw, bh);
      if (night) {
        ctx.fillStyle = "#8fb0ff";
        for (let wy = h - bh + 10; wy < h - 8; wy += 16)
          for (let wx = x + 6; wx < x + bw - 8; wx += 12) if (sky() > 0.62) ctx.fillRect(wx, wy, 4, 6);
      }
      x += bw + 4;
    }
    ctx.fillStyle = night ? "#0e2240" : "#7f97c9";
    ctx.fillRect(w * 0.58, h - 260, 26, 260);
    ctx.beginPath();
    ctx.moveTo(w * 0.58, h - 260);
    ctx.lineTo(w * 0.58 + 13, h - 300);
    ctx.lineTo(w * 0.58 + 26, h - 260);
    ctx.fill();
  };
}

// Pinboard by the door: three notes, all from the CV.
export function paintBoard(fonts) {
  return (ctx, w, h) => {
    ctx.fillStyle = "#b9c9e8";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#8fa6cf";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);
    const notes = [
      { x: 92, y: 120, r: -0.08, c: "#f6f8fd", lines: ["CSAP exam", "Dec 2026"] },
      { x: 262, y: 104, r: 0.06, c: "#dbe6ff", lines: ["Turkish: A1", "Merhaba!"] },
      { x: 420, y: 130, r: -0.04, c: "#eef3ff", lines: ["Mentorship", "60 designers"] },
      { x: 186, y: 250, r: 0.05, c: "#e3eaf6", lines: ["Half marathon", "medals: 3"] },
      { x: 360, y: 262, r: -0.07, c: "#f6f8fd", lines: ["Chess", "1,850"] },
    ];
    for (const n of notes) {
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.r);
      ctx.fillStyle = "rgba(14,34,64,0.18)";
      ctx.fillRect(-64, -56, 132, 120);
      ctx.fillStyle = n.c;
      ctx.fillRect(-68, -60, 132, 120);
      ctx.fillStyle = INK.midad;
      ctx.beginPath();
      ctx.arc(-2, -48, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK.ink;
      ctx.textAlign = "center";
      ctx.font = `600 19px ${fonts.sans}`;
      ctx.fillText(n.lines[0], -2, -6);
      ctx.font = `400 19px ${fonts.sans}`;
      ctx.fillText(n.lines[1], -2, 24);
      ctx.restore();
    }
  };
}

export function paintChess(ctx, w, h) {
  const s = w / 8;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      ctx.fillStyle = (r + c) % 2 ? "#3d63b3" : "#dbe6ff";
      ctx.fillRect(c * s, r * s, s, s);
    }
}

export function paintFloor(ctx, w, h) {
  const r = rng(11);
  const rows = 8;
  const ph = h / rows;
  for (let i = 0; i < rows; i++) {
    let x = -r() * 200;
    while (x < w) {
      const pw = 220 + r() * 180;
      const shade = 168 + Math.floor(r() * 14);
      ctx.fillStyle = `rgb(${shade - 22}, ${shade - 6}, ${shade + 40})`;
      ctx.fillRect(x, i * ph, pw, ph);
      ctx.fillStyle = "rgba(14,34,64,0.18)";
      ctx.fillRect(x, i * ph, 2, ph);
      x += pw;
    }
    ctx.fillStyle = "rgba(14,34,64,0.22)";
    ctx.fillRect(0, i * ph, w, 2);
  }
}

export function paintRug(ctx, w, h) {
  ctx.fillStyle = INK.midad;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = INK.pale;
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  ctx.lineWidth = 2;
  ctx.strokeRect(38, 38, w - 76, h - 76);
  ctx.fillStyle = "#3d63b3";
  ctx.fillRect(56, 56, w - 112, h - 112);
  // Rows of small rhombuses.
  ctx.fillStyle = INK.pale;
  for (let y = 90; y < h - 70; y += 48)
    for (let x = 90; x < w - 70; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, y - 9);
      ctx.lineTo(x + 9, y);
      ctx.lineTo(x, y + 9);
      ctx.lineTo(x - 9, y);
      ctx.closePath();
      ctx.fill();
    }
}

// The record on the turntable: grooves, and a label with the maqam's name.
export function paintRecord(fonts) {
  return (ctx, w, h) => {
    const c = w / 2;
    ctx.fillStyle = "#0b1a33";
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    for (let r = c * 0.4; r < c * 0.97; r += 3.2) {
      ctx.strokeStyle = r % 9 < 3 ? "rgba(159,180,255,0.16)" : "rgba(159,180,255,0.07)";
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // A sheen across the grooves.
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0.3, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(219,230,255,0.12)");
    g.addColorStop(0.7, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c, c, c * 0.97, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK.midad;
    ctx.beginPath();
    ctx.arc(c, c, c * 0.36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK.paper;
    ctx.textAlign = "center";
    ctx.direction = "rtl";
    ctx.font = `400 ${Math.round(w * 0.11)}px ${fonts.ruqaa}`;
    ctx.fillText("حجاز", c, c - w * 0.01);
    ctx.direction = "ltr";
    ctx.font = `600 ${Math.round(w * 0.035)}px ${fonts.sans}`;
    ctx.fillText("Hijaz · 33⅓", c, c + w * 0.09);
    ctx.fillStyle = "#0b1a33";
    ctx.beginPath();
    ctx.arc(c, c, w * 0.012, 0, Math.PI * 2);
    ctx.fill();
  };
}

// The wall behind the desk: a calligrapher's practice sheet (mashq), painted a shade
// darker than the wall. Rows of her project names, each row started by the column of
// rhombus dots that measures the letters, with two large words in the corners.
export function paintMashqWall(fonts) {
  const words = ["ميزان", "خط", "حرفة", "قلم", "دليل", "رفيق", "يارا"];
  return (ctx, w, h) => {
    ctx.fillStyle = "#b9c9ec";
    ctx.fillRect(0, 0, w, h);
    const ink = "#a9bbe6";
    const rows = 7;
    const rowH = h / rows;
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    for (let r = 0; r < rows; r++) {
      const base = rowH * (r + 0.72);
      ctx.strokeStyle = "#b3c4eb";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, base + 6);
      ctx.lineTo(w, base + 6);
      ctx.stroke();
      ctx.fillStyle = ink;
      ctx.font = `400 ${Math.round(rowH * 0.62)}px ${fonts.ruqaa}`;
      const word = words[r % words.length];
      const step = ctx.measureText(word).width + rowH * 0.9;
      let x = w - ((r * 97) % 180) - 40;
      while (x > -step) {
        // the column of dots that opens each repetition
        for (let k = 0; k < 4; k++) {
          const dx = x + 26;
          const dy = base - rowH * 0.12 - k * 15;
          ctx.beginPath();
          ctx.moveTo(dx, dy - 6);
          ctx.lineTo(dx + 6, dy);
          ctx.lineTo(dx, dy + 6);
          ctx.lineTo(dx - 6, dy);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillText(word, x, base);
        x -= step;
      }
    }
    // Two large words, very faint, in the corners the frames leave open.
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#9db1e2";
    ctx.font = `400 ${Math.round(h * 0.42)}px ${fonts.ruqaa}`;
    ctx.fillText("خط", w * 0.17, h * 0.5);
    ctx.textAlign = "left";
    ctx.fillText("يارا", w * 0.8, h * 0.98);
    ctx.globalAlpha = 1;
  };
}
