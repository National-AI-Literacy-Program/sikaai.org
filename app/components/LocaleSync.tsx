"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { LOCALE_PREFIX } from "@/i18n/routing";

// Tells the service worker which language is active, so the installed app can reopen
// in that language even when it starts offline (the toggle never makes a page request
// the service worker could observe).
export default function LocaleSync() {
  const locale = useLocale() as keyof typeof LOCALE_PREFIX;

  useEffect(() => {
    const prefix = LOCALE_PREFIX[locale];
    if (!prefix || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready
      .then((reg) => reg.active?.postMessage({ type: "SET_LOCALE", prefix }))
      .catch(() => {});
  }, [locale]);

  return null;
}