// Light/dark theme, remembered between visits. The boot script in app/layout.js
// applies the saved choice before the first paint.

export function currentTheme() {
  if (typeof document === "undefined") return "light";
  const set = document.documentElement.dataset.theme;
  if (set === "dark" || set === "light") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(next) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode: the choice just isn't remembered.
  }
}
