import Link from "next/link";
import { ui } from "@/data/ui";

export default function NotFound() {
  return (
    <main className="crt" style={{ gridTemplateRows: "1fr auto 1fr" }}>
      <div className="crt-half" lang="en" dir="ltr">
        <span className="crt-role">&gt; 404</span>
        <span className="crt-name">{ui.notFound.title.en}</span>
        <span className="crt-role">{ui.notFound.body.en}</span>
        <Link className="crt-enter" href="/">
          {ui.notFound.home.en}
        </Link>
      </div>
      <div className="crt-rule" aria-hidden="true" />
      <div className="crt-half" lang="ar" dir="rtl">
        <span className="crt-role">٤٠٤</span>
        <span className="crt-name">{ui.notFound.title.ar}</span>
        <span className="crt-role">{ui.notFound.body.ar}</span>
        <Link className="crt-enter" href="/">
          {ui.notFound.home.ar}
        </Link>
      </div>
    </main>
  );
}
