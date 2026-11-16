// The CRT idle screen, drawn on a 2D canvas and used as a three.js texture.
// Left half: "Yara Al-Mansouri" types left to right. Right half: "يارا المنصوري"
// types right to left, at the same time. The half under the pointer lights up.
import * as THREE from "three";

const W = 1024;
const H = 768;
const PAD = 56;
const COLORS = { glass: "#071631", hover: "#0b1f42", text: "#b8d3ff", dim: "#6f93cc", rule: "#2a4a80" };

const EN = "Yara Al-Mansouri";
const AR = "يارا المنصوري";

export function createIdleScreen({ monoFont, arabicFont, reduced }) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  let start = performance.now();
  let hover = null;
  let lastKey = "";

  // Not a button: a line of text. The whole half of the screen is what you tap,
  // and the half under the pointer lights up and underlines its line.
  function prompt(label, x, y, align, active, font) {
    ctx.font = font;
    const w = ctx.measureText(label).width;
    const left = align === "left" ? x : x - w;
    ctx.fillStyle = active ? "#ffffff" : COLORS.text;
    ctx.fillText(label, x, y);
    ctx.fillRect(left, y + 14, w, active ? 4 : 2);
  }

  function draw(now) {
    const p = reduced ? 1 : Math.min(1, Math.max(0, (now - start - 500) / 2200));
    const nEn = Math.round(p * EN.length);
    const nAr = Math.round(p * AR.length);
    const blinkOn = reduced || p < 1 || Math.floor(now / 530) % 2 === 0;
    const key = `${nEn}|${nAr}|${blinkOn}|${hover}`;
    if (key === lastKey) return;
    lastKey = key;

    ctx.fillStyle = COLORS.glass;
    ctx.fillRect(0, 0, W, H);
    if (hover === "en") {
      ctx.fillStyle = COLORS.hover;
      ctx.fillRect(0, 0, W / 2, H);
    }
    if (hover === "ar") {
      ctx.fillStyle = COLORS.hover;
      ctx.fillRect(W / 2, 0, W / 2, H);
    }
    ctx.fillStyle = COLORS.rule;
    ctx.fillRect(W / 2 - 1, 80, 2, H - 160);

    // English, left to right.
    ctx.direction = "ltr";
    ctx.textAlign = "left";
    ctx.fillStyle = COLORS.dim;
    ctx.font = `400 22px ${monoFont}`;
    ctx.fillText("> hello", PAD, 118);
    ctx.fillStyle = COLORS.text;
    ctx.font = `500 40px ${monoFont}`;
    const sEn = EN.slice(0, nEn);
    ctx.fillText(sEn, PAD, 372);
    if (blinkOn) ctx.fillRect(PAD + ctx.measureText(sEn).width + 8, 340, 20, 40);
    ctx.fillStyle = COLORS.dim;
    ctx.font = `400 22px ${monoFont}`;
    ctx.fillText("Principal Product Engineer", PAD, 428);
    ctx.fillText("HCI researcher in Riyadh", PAD, 462);
    prompt("Read in English", PAD, 640, "left", hover === "en", `500 26px ${monoFont}`);

    // Arabic, right to left.
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    const R = W - PAD;
    ctx.fillStyle = COLORS.dim;
    ctx.font = `400 24px ${arabicFont}`;
    ctx.fillText("مرحباً", R, 118);
    ctx.fillStyle = COLORS.text;
    ctx.font = `600 48px ${arabicFont}`;
    const sAr = AR.slice(0, nAr);
    ctx.fillText(sAr, R, 376);
    if (blinkOn) ctx.fillRect(R - ctx.measureText(sAr).width - 28, 338, 20, 40);
    ctx.fillStyle = COLORS.dim;
    ctx.font = `400 24px ${arabicFont}`;
    ctx.fillText("مهندسة منتجات رئيسية", R, 430);
    ctx.fillText("باحثة في التفاعل بين الإنسان والحاسوب", R, 466);
    prompt("اقرأ بالعربية", R, 640, "right", hover === "ar", `500 28px ${arabicFont}`);

    // Scanlines.
    ctx.fillStyle = "rgba(184, 211, 255, 0.05)";
    for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);

    texture.needsUpdate = true;
  }

  return {
    texture,
    draw,
    restart() {
      start = performance.now();
      lastKey = "";
    },
    setHover(next) {
      hover = next;
    },
    dispose() {
      texture.dispose();
    },
  };
}
