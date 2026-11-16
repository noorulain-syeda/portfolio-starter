// Yara's full name from Type Garden (Midnight theme), so the letters can follow the page theme.
// It is cut into about fifty pieces, each its own little svg, so the scatter-in animation runs
// on the graphics card instead of repainting hundreds of paths every frame.
import { GARDEN_PIECES, GARDEN_VIEWBOX } from "./gardenPaths";

const [VX, VY, VW, VH] = GARDEN_VIEWBOX.split(" ").map(Number);

export default function YaraGarden({ className = "", title }) {
  return (
    <div
      className={`tg ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ aspectRatio: `${VW} / ${VH}` }}
    >
      {GARDEN_PIECES.map((p, i) => (
        <svg
          key={i}
          className="tg-piece"
          viewBox={`${p.x} ${p.y} ${p.w} ${p.h}`}
          focusable="false"
          style={{
            left: `${((p.x - VX) / VW) * 100}%`,
            top: `${((p.y - VY) / VH) * 100}%`,
            width: `${(p.w / VW) * 100}%`,
            height: `${(p.h / VH) * 100}%`,
            "--x": `${p.sx}px`,
            "--y": `${p.sy}px`,
            "--r": `${p.sr}deg`,
            "--d": `${p.d}ms`,
          }}
          dangerouslySetInnerHTML={{ __html: p.html }}
        />
      ))}
    </div>
  );
}
