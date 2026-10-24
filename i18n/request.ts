import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Messages = { [key: string]: unknown };

const isPlainObject = (v: unknown): v is Messages =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = out[key];
    out[key] = isPlainObject(value) && isPlainObject(existing)
      ? deepMerge(existing, value)
      : value; // arrays and strings replace, never merge
  }
  return out;
}

const formatsFor = (locale: string) => {
  const digits = locale === 'ne' ? { numberingSystem: 'deva' } : {};
  return {
    number: {
      digits: { ...digits },
      year: { useGrouping: false, ...digits },
    },
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const formats = formatsFor(locale);

  const en = (await import('../messages/en.json')).default as Messages;
  if (locale === 'en') return { locale, messages: en, formats };

  const local = (await import(`../messages/${locale}.json`)).default as Messages;
  return { locale, messages: deepMerge(en, local) as typeof en, formats };
});