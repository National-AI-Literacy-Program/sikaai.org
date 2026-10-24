import React from 'react'
import { getFormatter, getTranslations } from 'next-intl/server'
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
export default async function Footer() {
  const t = await getTranslations('Footer')
  const format = await getFormatter()
  return (
    <>
      <footer className="border-t border-border">
        <div
          className={`${wrap} flex flex-col gap-3 py-7 text-xs text-(--muted) sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>{t('copyright', { year: format.number(2026, { useGrouping: false }) })}</p>
        </div>
      </footer>
    </>
  )
}