import { ui } from "@/data/ui";

// The real people behind the fictional CV.
const TEAM = ["Noor Tahir Akmal Syeda", "Nusaybah Farheen", "Hiba Ahmer", "Yosr BelFalah"];

export default function SiteFooter({ lang }) {
  return (
    <footer className="footer">
      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
        <p>{ui.footerNote[lang]}</p>
      </div>
      <div className="wrap footer-team">
        <p>
          {ui.madeBy[lang]}{" "}
          <span dir="ltr" lang="en">
            {TEAM.join(", ")}
          </span>
        </p>
      </div>
    </footer>
  );
}
