"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { use, useEffect, useState } from "react";
import { getCertificate, type Certificate } from "@/lib/progress";

const btn =
  "rounded-2xl px-6 py-3 text-sm font-extrabold transition active:translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [c, setC] = useState<Certificate | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      // 1) the learner's own copy works offline; 2) anyone else verifies via the server
      const local = await getCertificate().catch(() => undefined);
      if (local?.id === id) return setC(local);
      try {
        const r = await fetch(`/api/certificate/${id}`);
        setC(r.ok ? await r.json() : null);
      } catch {
        setC(null);
      }
    })();
  }, [id]);

  if (c === undefined) return <main className="grid min-h-dvh place-items-center bg-background text-sm font-bold">Loading certificate…</main>;
  if (c === null)
    return (
      <main className="grid min-h-dvh place-items-center bg-background px-5 text-center text-foreground">
        <div>
          <h1 className="text-2xl font-extrabold">We can&apos;t find this certificate</h1>
          <p className="mt-2 text-(--muted)">Check the link, or connect to the internet and try again.</p>
          <Link href="/course" className={`${btn} mt-5 inline-block bg-primary text-white`}>Back to course</Link>
        </div>
      </main>
    );

  const date = new Date(c.issuedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const nameSize = c.name.length > 22 ? "text-[5cqw]" : "text-[7cqw]";
  const stats = [
    { v: `${c.stats.days}`, l: "lessons completed" },
    { v: `${c.stats.firstTryPct}%`, l: "right on the first try" },
    { v: `${c.stats.minutes}`, l: "minutes of learning" },
  ];

  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground print:p-0">
      <style>{`
        @page{size:A4 landscape;margin:0}
        @media print{
          :root{--background:#f7f3ee!important;--foreground:#2d2422!important;--muted:#6f625d!important;--line:#ded3c9!important}
          *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
          html,body{width:297mm;height:209mm;margin:0;overflow:hidden;background:#f7f3ee}
          main{min-height:0!important;height:209mm;padding:0!important;overflow:hidden;display:grid;place-items:center}
          .no-print{display:none!important}
          .cert{width:289mm!important;max-width:none!important}
          .cert>div{box-shadow:none!important}
        }
      `}</style>

      <div className="@container mx-auto w-full max-w-4xl cert">
        <div className="relative aspect-[1.414/1] overflow-hidden rounded-3xl border-[1.2cqw] border-primary bg-background shadow-[0_8px_0_0_var(--line)]">
          <div className="absolute inset-[1.6cqw] flex flex-col items-center justify-between rounded-2xl border-[0.3cqw] border-(--gold) px-[6cqw] py-[3cqw] text-center">
            <Image src="/graphics/elements/flower.png" alt="" aria-hidden width={80} height={80} className="absolute left-[1.5cqw] top-[1.5cqw] h-auto w-[8cqw]" />
            <Image src="/graphics/elements/flower2.png" alt="" aria-hidden width={80} height={80} className="absolute right-[1.5cqw] top-[1.5cqw] h-auto w-[8cqw]" />

            <div>
            <p className="text-[2.4cqw] font-extrabold text-primary">SikaiAI</p>
            <h1 className="mt-[0.6cqw] text-[5cqw] font-extrabold leading-none tracking-[-0.04em]">Certificate of Completion</h1>
            </div>
            <div className="flex w-full flex-col items-center">
            <p className="mt-[2cqw] text-[2.2cqw] font-semibold text-(--muted)">This proudly certifies that</p>
            <p className={`mt-[1cqw] w-full wrap-break-word border-b-[0.3cqw] border-border pb-[0.8cqw] font-extrabold leading-tight text-primary ${nameSize}`}>{c.name}</p>
            <p className="mt-[1.6cqw] max-w-[70cqw] text-[2.4cqw] font-semibold leading-snug">
              completed the four-week SikaiAI course on how to spot AI, understand how it works, and make smart choices online.
            </p>

            <div className="mt-[2.4cqw] grid w-full max-w-[72cqw] grid-cols-3 divide-x-[0.2cqw] divide-border">
              {stats.map((s) => (
                <div key={s.l}>
                  <p className="font-extrabold leading-none" style={{ fontSize: "4.6cqw" }}>{s.v}</p>
                  <p className="mt-[0.5cqw] text-[1.8cqw] font-semibold text-(--muted)">{s.l}</p>
                </div>
              ))}
            </div>

            </div>
            <div className="flex w-full items-end justify-between text-left text-[1.7cqw] font-semibold text-(--muted)">
              <Image src="/graphics/boy/happy.png" alt="" aria-hidden width={120} height={120} className="h-auto w-[11cqw]" />
              <div className="text-center">
                <div className="mx-auto mb-[0.8cqw] grid size-[6cqw] place-items-center rounded-full border-[0.4cqw] border-(--gold) text-[3cqw] leading-none text-(--gold)">★</div>
                <p className="text-[2cqw] font-extrabold text-foreground">{date}</p>
                <p>Certificate ID: {c.id}</p>
                <p>Verify at {new URL(c.url, "https://sikaiai.com").host}</p>
              </div>
              <Image src="/graphics/girl/happy.png" alt="" aria-hidden width={120} height={120} className="h-auto w-[11cqw]" />
            </div>
          </div>
        </div>
      </div>

      <div className="no-print mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">
        <button type="button" onClick={() => window.print()} className={`${btn} bg-primary text-white shadow-[0_4px_0_0_#7d1f1f]`}>Download as PDF</button>
        <button
          type="button"
          className={`${btn} border-2 border-border hover:bg-(--crimson-pale)`}
          onClick={async () => {
            if (navigator.share) return navigator.share({ title: "My SikaiAI certificate", url: c.url }).catch(() => {});
            await navigator.clipboard.writeText(c.url);
            setCopied(true);
          }}
        >
          {copied ? "Link copied" : "Share"}
        </button>
        <Link href="/course" className={`${btn} border-2 border-border hover:bg-(--crimson-pale)`}>Back to course</Link>
      </div>
    </main>
  );
}