"use client";

import { ui } from "@/data/ui";
import { applyTheme } from "@/lib/theme";
import { useTheme } from "@/lib/hooks";

// The desk lamp and this button change the same setting.
export default function ThemeToggle({ lang }) {
  const dark = useTheme() === "dark";
  const label = dark ? ui.themeToLight[lang] : ui.themeToDark[lang];

  return (
    <button type="button" className="btn btn-quiet icon-btn" onClick={() => applyTheme(dark ? "light" : "dark")} aria-label={label} title={label}>
      {dark ? (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
