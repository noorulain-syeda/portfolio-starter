"use client";

// Drag from "before" to "after" and watch the project's numbers change.
import { useId, useState } from "react";
import { ui } from "@/data/ui";
import { fmtMetric, tr } from "@/lib/i18n";

export default function BeforeAfter({ metrics, lang }) {
  const [pos, setPos] = useState(100);
  const id = useId();
  const p = pos / 100;
  const L = ui.caseStudy;

  return (
    <section className="panel" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} style={{ margin: "0 0 12px", fontSize: "var(--step-2)", fontWeight: 600 }}>
        {L.slider[lang]}
      </h2>
      <label htmlFor={`${id}-r`} className="sr-only">
        {L.sliderLabel[lang]}
      </label>
      <input id={`${id}-r`} className="ba-range" type="range" min="0" max="100" step="1" value={pos} onChange={(e) => setPos(Number(e.target.value))} />
      <div className="ba-ends" aria-hidden="true">
        <span>{L.before[lang]}</span>
        <span>{L.after[lang]}</span>
      </div>
      <div className="ba-figures">
        {metrics.map((m) => {
          const value = Math.round(m.from + (m.to - m.from) * p);
          const width = Math.round((value / Math.max(m.from, m.to)) * 100);
          return (
            <div key={tr(m.label, "en")} className="ba-figure">
              <span className="muted">{tr(m.label, lang)}</span>
              <span className="ba-value" aria-live="polite">
                {fmtMetric(value, m.unit, lang)}
              </span>
              <div className="ba-track" aria-hidden="true">
                <div className="ba-fill" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
