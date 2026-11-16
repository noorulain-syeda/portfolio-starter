"use client";

import { useEffect } from "react";
import { dirOf } from "@/lib/i18n";

// Keeps <html lang dir> right when moving between /en and /ar without a reload.
export default function HtmlLangSync({ lang }) {
  useEffect(() => {
    const d = document.documentElement;
    d.lang = lang;
    d.dir = dirOf(lang);
  }, [lang]);
  return null;
}
