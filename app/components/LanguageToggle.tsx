"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname, useRouter } from "@/i18n/navigation";

const OPTIONS = [
  { locale: "en", label: "EN", name: "English" },
  { locale: "ne", label: "NP", name: "नेपाली" },
] as const;

export default function LanguageToggle() {
  const t = useTranslations("Header");
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex items-center rounded-full border border-border bg-background p-0.5 text-[12px] font-extrabold"
    >
      {OPTIONS.map(({ locale, label, name }) => {
        const on = locale === active;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-label={name}
            aria-pressed={on}
            disabled={pending}
            onClick={() => {
              if (on) return;
              // Offline: skip the client-side fetch that can only fail and open the cached page directly
              if (!navigator.onLine) {
                window.location.assign(getPathname({ href: pathname, locale }));
                return;
              }
              startTransition(() => router.replace(pathname, { locale }));
            }}
            className={`rounded-full px-2.5 py-1.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              on ? "bg-primary text-white" : "text-(--muted) hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}