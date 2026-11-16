// A calligrapher's practice sheet (mashq), used as background art.
// The words are the Arabic names of Yara's own projects, and the alif stands
// beside the column of rhombic dots calligraphers use to measure letter height.
// Purely decorative: hidden from screen readers and never clickable.

const WALL = [
  { word: "خط", size: "clamp(180px, 22vw, 330px)", top: "-4%", end: "3%", rotate: -6, opacity: 0.13 },
  { word: "ميزان", size: "clamp(70px, 8vw, 130px)", top: "5%", start: "5%", rotate: 4, opacity: 0.12 },
  { word: "قلم", size: "clamp(54px, 6vw, 96px)", top: "1%", start: "30%", rotate: -9, opacity: 0.1 },
  { word: "حرفة", size: "clamp(60px, 7vw, 110px)", top: "34%", start: "2%", rotate: 3, opacity: 0.11 },
  { word: "دليل", size: "clamp(40px, 4.5vw, 72px)", top: "21%", start: "37%", rotate: -3, opacity: 0.1 },
  { word: "رفيق", size: "clamp(44px, 5vw, 80px)", top: "3%", end: "36%", rotate: 7, opacity: 0.09 },
  { word: "كتبته يارا", size: "clamp(18px, 1.6vw, 24px)", top: "56%", end: "5%", rotate: 0, opacity: 0.32 },
];

// Behind the hello screen: the same practice sheet, spread over the whole screen.
const INTRO = [
  { word: "خط", size: "clamp(200px, 26vw, 420px)", bottom: "-8%", end: "-2%", rotate: -6, opacity: 0.09 },
  { word: "ميزان", size: "clamp(64px, 7vw, 120px)", top: "4%", start: "38%", rotate: 4, opacity: 0.1 },
  { word: "قلم", size: "clamp(54px, 6vw, 96px)", top: "62%", start: "46%", rotate: -9, opacity: 0.08 },
  { word: "حرفة", size: "clamp(60px, 7vw, 110px)", bottom: "3%", start: "2%", rotate: 3, opacity: 0.09 },
  { word: "دليل", size: "clamp(40px, 4.5vw, 72px)", top: "30%", end: "3%", rotate: -3, opacity: 0.1 },
  { word: "رفيق", size: "clamp(44px, 5vw, 80px)", top: "12%", end: "30%", rotate: 7, opacity: 0.08 },
];

const HERO = [
  { word: "خط", size: "clamp(110px, 14vw, 210px)", bottom: "4%", end: "0%", rotate: -6, opacity: 0.08 },
];

function Alif({ style }) {
  return (
    <span className="mashq-alif" style={style}>
      <span className="mashq-dots">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <span dir="rtl">ا</span>
    </span>
  );
}

export default function Mashq({ variant = "hero" }) {
  const pieces = variant === "wall" ? WALL : variant === "intro" ? INTRO : HERO;
  return (
    <div className={`mashq mashq-${variant}`} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.word}
          className="mashq-word"
          style={{
            fontSize: p.size,
            top: p.top,
            bottom: p.bottom,
            insetInlineStart: p.start,
            insetInlineEnd: p.end,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <span dir="rtl">{p.word}</span>
        </span>
      ))}
      {variant === "wall" ? (
        <Alif style={{ top: "6%", insetInlineStart: "21%", fontSize: "clamp(110px, 12vw, 180px)", opacity: 0.12 }} />
      ) : variant === "intro" ? (
        <Alif style={{ top: "3%", insetInlineStart: "2%", fontSize: "clamp(90px, 10vw, 160px)", opacity: 0.1 }} />
      ) : (
        <Alif style={{ bottom: "8%", insetInlineEnd: "25%", fontSize: "clamp(90px, 9vw, 140px)", opacity: 0.09 }} />
      )}
    </div>
  );
}
