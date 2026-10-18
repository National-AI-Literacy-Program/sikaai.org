import React from 'react'
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
export default function Footer() {
  return (
    <>
      <footer className="border-t border-border">
        <div
          className={`${wrap} flex flex-col gap-3 py-7 text-xs text-(--muted) sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>© 2026 SikaAI</p>
        </div>
      </footer>
    </>
  )
}
