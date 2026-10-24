"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { getCourseTitle, getLessons } from "@/lib/course";
import { TOTAL_DAYS, getEmail, useProgress } from "@/lib/progress";
import ThemeToggle from "@/app/components/ThemeToggle";
import PacePrompt from "@/app/components/involvepage/paceprompt";


const WEEK_COUNT = 4;
const PER_WEEK = 7;
const focus =
  "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary";

function Ring({ value, total }: { value: number; total: number }) {
  const t = useTranslations("CoursePage");
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-24 shrink-0" role="img" aria-label={t("ring", { value, total })}>
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--line)" strokeWidth="9" />
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-primary, #a32b2b)" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / total)} className="transition-all duration-700" />
      </svg>
      <p className="absolute inset-0 grid place-items-center text-lg font-extrabold">
        {t("fraction", { done: value, total })}
      </p>
    </div>
  );
}

function CertCard({ P }: { P: ReturnType<typeof useProgress> }) {
  const t = useTranslations("CoursePage");
  const tCommon = useTranslations("Common");
  const [asking, setAsking] = useState(false);
  const [name, setName] = useState("");
  const text = P.certificate
    ? t("certReady")
    : !P.canCertify
      ? t("certLocked", { total: TOTAL_DAYS, done: P.completed.length })
      : !P.online
        ? t("certOffline")
        : t("certSave");
  const cta = `rounded-2xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_0_#7d1f1f] disabled:opacity-40 disabled:shadow-none ${focus}`;
  return (
    <div className={`flex flex-wrap items-center gap-4 rounded-3xl border-2 p-5 ${P.canCertify ? "border-primary bg-(--crimson-pale) shadow-[0_6px_0_0_var(--line)]" : "border-border opacity-80"}`}>
      <span className="text-4xl" aria-hidden>🎓</span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-extrabold">{t("certTitle")}</p>
        <p className="text-sm font-semibold text-(--muted)">{text}</p>
      </div>
      {P.certificate ? (
        <Link href={`/certificate/${P.certificate.id}`} className={cta}>{t("open")}</Link>
      ) : (
        !asking && (
          <button type="button" disabled={!P.canCertify || !P.online} onClick={() => setAsking(true)} className={cta}>
            {t("getCertificate")}
          </button>
        )
      )}
      {asking && !P.certificate && (
        <form
          className="basis-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) P.claim(name.trim());
          }}
        >
          <label htmlFor="cert-name" className="text-sm font-bold">{t("nameLabel")}</label>
          <input
            id="cert-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            autoComplete="name"
            className="mt-1 w-full rounded-xl border-2 border-border bg-background px-3 py-2.5 text-base font-semibold focus-visible:outline-2 focus-visible:outline-primary"
          />
          <p className="mt-1 text-xs font-semibold text-(--muted)">{t("nameNote")}</p>
         {P.error && <p role="alert" className="mt-2 text-sm font-bold text-(--error)">{P.error === "network" ? t("errorNetwork") : P.error}</p>}
          <div className="mt-3 flex gap-3">
            <button type="submit" disabled={!name.trim() || P.busy || !P.online} className={cta}>
              {P.busy ? t("saving") : t("saveAndGet")}
            </button>
            <button type="button" onClick={() => setAsking(false)} disabled={P.busy} className={`rounded-2xl border-2 border-border px-5 py-3 text-sm font-bold ${focus}`}>{tCommon("cancel")}</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function CoursePage() {
  const t = useTranslations("CoursePage");
  const tc = useTranslations("Course");
  const tp = useTranslations("PacePrompt");
  const format = useFormatter();
  const locale = useLocale();
  const weekTitles = tc.raw("weekTitles") as string[];

 const lessons = getLessons(locale);
  const P = useProgress();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [pending, setPending] = useState<number | null>(null); // day whose "one lesson a day" popup is open
  // null until the user manually picks a week; until then we follow the current week
  const [pickedWeek, setPickedWeek] = useState<number | null>(null);

  // Guard: no email saved on this device -> back to the gate
  useEffect(() => {
    getEmail().then((e) => {
      if (e) setAllowed(true);
      else router.replace("/involve");
    });
  }, [router]);

  const { completed } = P;
  const total = WEEK_COUNT * PER_WEEK;

  const roadmap = Array.from({ length: total }, (_, k) => lessons[k] ?? { day: k + 1, hook: "", concept: t("comingSoon") });
  const nextDay = roadmap.find((l) => !completed.includes(l.day))?.day ?? total;
  const currentWeek = Math.min(WEEK_COUNT, Math.max(1, Math.ceil(nextDay / PER_WEEK)));
  // Follows currentWeek automatically (including after progress loads) unless the user picked one
  const selectedWeek = pickedWeek ?? currentWeek;

  const weeks = useMemo(
    () =>
      Array.from({ length: WEEK_COUNT }, (_, k) => {
        const ls = roadmap.slice(k * PER_WEEK, (k + 1) * PER_WEEK);
        const done = ls.filter((l) => completed.includes(l.day)).length;
        return { week: k + 1, lessons: ls, done, complete: done === ls.length, locked: k + 1 > currentWeek };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completed, currentWeek, lessons.length, locale],
  );
  const sel = weeks[selectedWeek - 1];
  const doneCount = Math.min(completed.length, total);

  // "tomorrow" / "in 5h" comes from lib/progress in English; map it to messages
  const whenLabel = (w: ReturnType<typeof P.opensWhen>) =>
    w.kind === "tomorrow" ? tp("whenTomorrow") : tp("whenHours", { hours: w.hours });

  // Must stay AFTER all hooks
  if (!allowed) return null;

  return (
    <main className="min-h-dvh overflow-x-clip bg-background font-sans text-foreground antialiased">
 
  <header className="site-nav shell">
  <Link href="/course" className="brand">
    Sika<span>AI</span>
  </Link>
  <div className="nav-right">
    <ThemeToggle />
  </div>
   
</header>
 

      <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-8">
        {/* Greeting + overall progress */}
        <section className="flex items-center gap-4 rounded-3xl border-2 border-border bg-(--crimson-pale) p-5 shadow-[0_6px_0_0_var(--line)] sm:gap-6 sm:p-6">
          <Image src="/graphics/boy/winking.png" alt="" aria-hidden width={110} height={110} className="h-auto w-20 sm:w-28" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl">
              {doneCount === 0 ? t("greetingStart") : doneCount === total ? t("greetingDone") : t("greetingBack")}
            </h1>
            <p className="mt-1 text-sm font-semibold text-(--muted)">{t("lessonLength", { minutes: 2 })}</p>
          </div>
          <Ring value={doneCount} total={total} />
        </section>

{P.canCertify && !P.certificate && sel.week !== WEEK_COUNT && <div className="mt-5"><CertCard P={P} /></div>}

        {/* Week picker */}
        <nav aria-label={t("weeksNav")} className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {weeks.map((w) => {
            const active = w.week === selectedWeek;
            return (
              <button
                key={w.week}
                type="button"
                aria-current={active ? "step" : undefined}
                onClick={() => setPickedWeek(w.week)}
                className={`rounded-2xl border-2 px-2 py-3 text-center transition ${focus} ${
                  active ? "border-primary bg-primary text-white shadow-[0_4px_0_0_#7d1f1f]" : "border-border hover:border-primary disabled:opacity-50 disabled:hover:border-border"
                }`}
              >
                <span className="block text-base font-extrabold">{w.complete ? "✓" : w.locked ? "🔒" : format.number(w.week, "digits")}</span>
                <span className="block text-xs font-bold">{tc("week", { week: w.week })}</span>
                <span className={`mt-0.5 block text-[11px] font-semibold ${active ? "text-white/80" : "text-(--muted)"}`}>
                  {t("fraction", { done: w.done, total: PER_WEEK })}
                </span>
              </button>
            );
          })}
        </nav>

        <h2 className="mt-8 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">{weekTitles[sel.week - 1]}</h2>

        {/* Winding path of lessons */}
        <ol className="relative mt-6 flex flex-col gap-5 rounded-3xl border-2 border-border px-4 py-8 sm:px-8">
          <Image src="/graphics/elements/flower.png" alt="" aria-hidden width={60} height={60} className="pointer-events-none absolute right-3 top-3 h-auto w-10 opacity-80" />
          <Image src="/graphics/elements/hill.png" alt="" aria-hidden width={300} height={100} className="pointer-events-none absolute bottom-0 right-5 h-auto w-40 opacity-30" />

          {sel.lessons.map((lesson, k) => {
            const status = P.statusOf(lesson.day);
            const waiting = status === "waiting";
            const locked = status === "locked"; // waiting is no longer locked
            const done = status === "completed";
            const current = status === "current";
            const shift = Math.round(Math.sin(k * 1.1) * 36);
            const title = (locked || waiting) && !lesson.hook ? t("comingSoon") : getCourseTitle(lesson, (day) => tc("day", { day }));
            const dayLabel = current
              ? t("dayStartHere", { day: lesson.day })
              : waiting
                ? t("dayBestTomorrow", { day: lesson.day })
                : tc("day", { day: lesson.day });

            const node = (
              <>
                <span
                  className={`relative grid size-16 shrink-0 place-items-center rounded-full border-4 text-xl font-extrabold transition ${
                    done
                      ? "border-(--success) bg-(--success) text-white"
                      : current
                        ? "border-primary bg-primary text-white shadow-[0_5px_0_0_#7d1f1f] group-hover:-translate-y-0.5"
                        : "border-border bg-(--crimson-pale) text-(--muted)"
                  }`}
                >
                  {done ? "✓" : waiting ? "🌙" : locked ? "🔒" : format.number(lesson.day, "digits")}
                  {current && <span className="absolute -inset-2 animate-ping rounded-full border-2 border-primary/40 motion-reduce:hidden" aria-hidden />}
                </span>
                <span className="min-w-0 text-left">
                  <span className={`block text-xs font-bold ${current ? "text-primary" : "text-(--muted)"}`}>
                    {dayLabel}
                  </span>
                  <span className={`block text-base font-extrabold leading-snug ${locked || waiting ? "text-(--muted)" : ""}`}>{title}</span>
                </span>
              </>
            );

            return (
              <li
                key={lesson.day}
                style={{ "--shift": `${shift}px` } as React.CSSProperties}
                className="w-full max-w-sm self-center transform-[translateX(var(--shift))] max-sm:transform-[translateX(calc(var(--shift)*0.25))]"
              >
                {locked ? (
                  <div className="flex items-center gap-4 opacity-70" aria-label={t("dayLocked", { day: lesson.day })}>{node}</div>
                ) : waiting ? (
                  <button type="button" onClick={() => setPending(lesson.day)} className={`group flex w-full items-center gap-4 rounded-2xl text-left ${focus}`}>
                    {node}
                  </button>
                ) : (
                  <Link href={`/course/${lesson.day}`} className={`group flex items-center gap-4 rounded-2xl ${focus}`}>
                    {node}
                    {current && <Image src="/graphics/boy/explaining.png" alt="" aria-hidden width={64} height={64} className="ml-1 h-auto w-14 shrink-0 sm:ml-3 sm:w-16" />}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {sel.week === WEEK_COUNT && <div className="mt-5"><CertCard P={P} /></div>}

        {pending !== null && (
          <PacePrompt
            day={pending}
            when={whenLabel(P.opensWhen(pending))}
            onClose={() => setPending(null)}
            onContinue={() => {
              const d = pending;
              setPending(null);
              router.push(`/course/${d}`);
            }}
          />
        )}

        {sel.locked && (
          <p className="mt-4 text-center text-sm font-semibold text-(--muted)">{t("unlockHint", { week: sel.week - 1 })}</p>
        )}
      </div>
    </main>
  );
}