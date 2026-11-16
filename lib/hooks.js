// Client-side hooks that read the browser without setState-in-effect.
// The server snapshot is what the static HTML is built with; React swaps in
// the real value right after hydration.
import { useSyncExternalStore } from "react";
import { currentTheme } from "./theme";

function subscribeTheme(cb) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, currentTheme, () => "light");
}

function mediaStore(query) {
  return {
    subscribe(cb) {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(query).matches,
  };
}

const reducedStore = mediaStore("(prefers-reduced-motion: reduce)");
export function useReducedMotion() {
  return useSyncExternalStore(reducedStore.subscribe, reducedStore.get, () => false);
}

let webgl;
function hasWebGL() {
  if (webgl === undefined) {
    try {
      const c = document.createElement("canvas");
      webgl = !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

// "3d" wherever WebGL works (phones too), "html" without it, "loading" in the static HTML.
export function useRoomMode() {
  return useSyncExternalStore(
    noop,
    () => (hasWebGL() ? "3d" : "html"),
    () => "loading"
  );
}

// Phones and tablets get a lighter room: no shadows and a lower pixel ratio.
const liteStore = mediaStore("(pointer: coarse), (max-width: 900px)");
export function useLiteDevice() {
  return useSyncExternalStore(liteStore.subscribe, liteStore.get, () => false);
}

// Coming back from the portfolio? Read once per visit to the home page.
let returning;
export function useReturning() {
  return useSyncExternalStore(
    noop,
    () => {
      if (returning === undefined) {
        returning = !!sessionStorage.getItem("desk:return");
        sessionStorage.removeItem("desk:return");
      }
      return returning;
    },
    () => false
  );
}
export function forgetReturning() {
  returning = undefined;
}

function noop() {
  return () => {};
}
