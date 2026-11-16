"use client";

import { useState } from "react";
import { ui } from "@/data/ui";
import { fill, fmtNumber, fmtYear } from "@/lib/i18n";

const FILTERS = ["all", "active", "lifetime", "expired", "inProgress"];

export default function CertList({ certs, lang }) {
  const [filter, setFilter] = useState("all");
  const count = (f) => (f === "all" ? certs.length : certs.filter((c) => c.status === f).length);
  const shown = filter === "all" ? certs : certs.filter((c) => c.status === filter);

  return (
    <>
      <div className="filter" role="group" aria-label={ui.certFilter[lang]}>
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {ui.certStatus[f][lang]} ({fmtNumber(count(f), lang)})
          </button>
        ))}
      </div>
      <ul className="rows" aria-live="polite">
        {shown.map((c) => (
          <li key={c.name}>
            <span className="title" lang="en" dir="ltr">
              {c.name}
            </span>
            <span className="side">
              <span className={`status status-${c.status}`}>
                {c.status === "expired" ? fill(ui.expiredIn[lang], { year: fmtYear(c.expired, lang) }) : ui.certStatus[c.status][lang]}
              </span>{" "}
              {c.year ? fmtYear(c.year, lang) : ""}
            </span>
            <span className="detail">
              <span lang="en" dir="ltr">
                {c.issuer}
              </span>
              {c.id ? (
                <>
                  {" · "}
                  {ui.credentialId[lang]}: <span dir="ltr">{c.id}</span>
                </>
              ) : null}
              {c.note ? <> · {c.note[lang]}</> : null}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
