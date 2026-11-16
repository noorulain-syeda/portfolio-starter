// Self-hosted IBM Plex fonts (from @fontsource), loaded with next/font so there is
// no flash on load and no request to Google at build time.
// Plex Sans and Plex Sans Arabic were drawn as one family for both scripts.
import localFont from "next/font/local";

export const plexSans = localFont({
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-latin",
  display: "swap",
});

export const plexArabic = localFont({
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-arabic",
  display: "swap",
});

// Aref Ruqaa: a Ruq'ah calligraphy face, used only for the background practice sheet.
// "block" keeps the decoration invisible until the real letterforms arrive.
export const arefRuqaa = localFont({
  src: [{ path: "../node_modules/@fontsource/aref-ruqaa/files/aref-ruqaa-arabic-700-normal.woff2", weight: "700" }],
  variable: "--font-calligraphy",
  display: "block",
});

export const plexMono = localFont({
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
