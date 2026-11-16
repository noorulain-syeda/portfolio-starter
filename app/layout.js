import { plexSans, plexArabic, plexMono, arefRuqaa } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
  title: "Yara Al-Mansouri | Portfolio",
  description:
    "Principal Product Engineer, Design Technology Lead and HCI researcher in Riyadh. Sixteen years building bilingual digital products.",
};

export const viewport = {
  themeColor: "#071631",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before the first paint: applies the saved light/dark choice, sets
// lang="ar" dir="rtl" on Arabic pages, and (when coming back from the portfolio)
// hides the hello screen so the room appears without a flash.
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");if(t==="dark"||t==="light")d.dataset.theme=t;if(/\\/ar(\\/|$)/.test(location.pathname)){d.lang="ar";d.dir="rtl";}if(sessionStorage.getItem("desk:return"))d.dataset.return="1";if(window.self!==window.top)d.dataset.inwin="1";}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable} ${arefRuqaa.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
