"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const enabled = () =>
  process.env.NODE_ENV === "production" && "serviceWorker" in navigator;

export default function RegisterSW() {
  const pathname = usePathname();

  // Register once
  useEffect(() => {
    if (!enabled()) return; // avoid stale caches while developing
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
  }, []);

  // After each page load, send the SW the assets this page used
  useEffect(() => {
    if (!enabled()) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (cancelled || !reg.active) return;

        const urls = performance
          .getEntriesByType("resource")
          .map((e) => e.name)
          .filter((u) => u.startsWith(location.origin));

        reg.active.postMessage({ type: "CACHE_ASSETS", urls, page: location.href });
      } catch {}
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}