import { defineRouting } from 'next-intl/routing';

// URL prefix per locale: the locale is "ne", the URL is /np
export const LOCALE_PREFIX = { en: '/en', ne: '/np' } as const;

export const routing = defineRouting({
  locales: ['en', 'ne'],
  defaultLocale: 'en',
  localePrefix: { mode: 'always', prefixes: LOCALE_PREFIX },
});