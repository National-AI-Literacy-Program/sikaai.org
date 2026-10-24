import { LOCALE_PREFIX } from "@/i18n/routing";

export const LEARN_ORIGIN =
  process.env.NEXT_PUBLIC_LEARN_ORIGIN ?? "https://learn.sikaai.org";

export const learnUrl = (locale: string, suffix = "") =>
  `${LEARN_ORIGIN}${LOCALE_PREFIX[locale as keyof typeof LOCALE_PREFIX] ?? ""}${suffix}`;