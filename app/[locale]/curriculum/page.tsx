"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "../../components/Header";
import {
  getCurriculum,
  indexFramework,
  domainKey,
  levelKey,
  meta,
  pdfAt,
  type Day,
  type Framework,
} from "@/lib/curriculum";

/* ---------- helpers ---------- */

const KIND_TAGS = ["project", "capstone", "extension"];

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const muted = "text-(color:--muted)";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Week titles and taglines already exist under CourseStructure, so reuse them
function useDomainText() {
  const cs = useTranslations("CourseStructure");
  return {
    name: (domain: string) => {
      const k = domainKey(domain);
      return k ? cs(`weeks.${k}.title`) : domain;
    },
    tagline: (domain: string, fallback: string) => {
      const k = domainKey(domain);
      return k ? cs(`weeks.${k}.description`) : fallback;
    },
  };
}

/* ---------- small components ---------- */

function Chip({
  href,
  children,
  label,
  tone,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
  tone: "k" | "s" | "a";
}) {
  const t = useTranslations("Curriculum");
  const tones = {
    k: "border-primary/40 text-primary hover:bg-primary/10",
    s: "border-foreground/25 text-foreground hover:bg-foreground/10",
    a: "border-border text-(color:--muted) hover:bg-foreground/10 hover:text-foreground",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("chipAria", { label })}
      title={label}
      className={`rounded-md border px-2 py-0.5 text-xs font-bold transition-colors ${tones[tone]} ${focusRing}`}
    >
      {children}
    </a>
  );
}

function Row({
  letter,
  word,
  tone,
  children,
}: {
  letter: string;
  word: string;
  tone: "k" | "s" | "a";
  children: React.ReactNode;
}) {
  const badge = {
    k: "bg-primary text-white",
    s: "bg-foreground text-background",
    a: "border border-foreground text-foreground",
  };
  return (
    <div className="flex items-start gap-3">
      <dt
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md text-xs font-extrabold ${badge[tone]}`}
      >
        <span aria-hidden="true">{letter}</span>
        <span className="sr-only">{word}</span>
      </dt>
      <dd className="flex flex-wrap gap-1.5">{children}</dd>
    </div>
  );
}

function DayItem({ d, fw }: { d: Day; fw: Framework }) {
  const t = useTranslations("Curriculum");
  const format = useFormatter();
  const domain = useDomainText();

  const tags = [
    KIND_TAGS.includes(d.kind) ? t(`kinds.${d.kind}`) : null,
    d.review ? t("reviewTag") : null,
  ].filter(Boolean) as string[];

  const hasKsa = d.knowledge.length + d.skills.length + d.attitudes.length > 0;

  const lk = d.competence ? levelKey(d.competence.level) : undefined;

  return (
    <li
      id={`day-${d.day}`}
      className="grid scroll-mt-24 gap-4 border-t border-border py-6 first:border-t-0 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 print:break-inside-avoid"
    >
      <div className="flex items-baseline gap-2 md:block">
        <p className={`text-xs font-bold ${muted}`}>{t("day")}</p>
        <p className="text-3xl font-extrabold leading-none tracking-[-0.04em]">
          {format.number(d.day)}
        </p>
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-extrabold leading-snug tracking-tight">
          {d.title}
        </h3>
        <p className={`mt-1.5 max-w-prose text-sm leading-6 ${muted}`}>
          {d.summary}
        </p>

        {tags.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </p>
        )}

        <p className="mt-3 text-sm">
          {d.competence ? (
            <a
              href={pdfAt(d.competence.page)}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold text-primary underline decoration-2 underline-offset-4 hover:opacity-75 ${focusRing}`}
            >
              {t("competenceLink", {
                domain: domain.name(d.competence.domain),
                number: d.competence.number,
              })}
              <span className="sr-only">{t("opensPdfSr")}</span>
            </a>
          ) : (
            <span className={muted}>{d.basis}</span>
          )}
          {d.competence && (
            <span className={muted}>
              {t("levelSuffix", {
                level: lk ? t(`levels.${lk}`) : d.competence.level,
              })}
            </span>
          )}
        </p>
      </div>

      {hasKsa && (
        <dl className="space-y-2.5 md:pt-1">
          {d.knowledge.length > 0 && (
            <Row letter={t("ksa.knowledge.letter")} word={t("ksa.knowledge.name")} tone="k">
              {d.knowledge.map((id) => (
                <Chip
                  key={id}
                  tone="k"
                  href={pdfAt(fw.knowledge[id].page)}
                  label={t("chipKnowledge", { id, label: fw.knowledge[id].label })}
                >
                  {id}
                </Chip>
              ))}
            </Row>
          )}
          {d.skills.length > 0 && (
            <Row letter={t("ksa.skills.letter")} word={t("ksa.skills.name")} tone="s">
              {d.skills.map((id) => (
                <Chip
                  key={id}
                  tone="s"
                  href={pdfAt(fw.skills[id].page)}
                  label={t("chipSkill", {
                    name: fw.skills[id].name,
                    description: fw.skills[id].description,
                  })}
                >
                  {fw.skills[id].name}
                </Chip>
              ))}
            </Row>
          )}
          {d.attitudes.length > 0 && (
            <Row letter={t("ksa.attitudes.letter")} word={t("ksa.attitudes.name")} tone="a">
              {d.attitudes.map((id) => (
                <Chip
                  key={id}
                  tone="a"
                  href={pdfAt(fw.attitudes[id].page)}
                  label={t("chipAttitude", {
                    name: fw.attitudes[id].name,
                    description: fw.attitudes[id].description,
                  })}
                >
                  {fw.attitudes[id].name}
                </Chip>
              ))}
            </Row>
          )}
        </dl>
      )}
    </li>
  );
}

/* ---------- main content component ---------- */

function CurriculumContent() {
  const t = useTranslations("Curriculum");
  const tf = useTranslations("Footer");
  const format = useFormatter();
  const locale = useLocale();
  const domain = useDomainText();

  const { framework, weeks } = useMemo(() => getCurriculum(locale), [locale]);
  const fw = useMemo(() => indexFramework(framework), [framework]);

  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week");

  // Read initial week from URL query parameter, fallback to week 1
  const initialWeek = weekParam ? parseInt(weekParam, 10) : 1;
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);

  // Sync state if query parameter changes dynamically
  useEffect(() => {
    if (weekParam) {
      const parsedWeek = parseInt(weekParam, 10);
      if (!isNaN(parsedWeek) && parsedWeek >= 1 && parsedWeek <= 4) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedWeek(parsedWeek);
      }
    }
  }, [weekParam]);

  return (
    <main className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <Header />

      {/* Intro */}
      <section className={`${wrap} pb-5`}>
        {/* Week selection buttons */}
        <nav aria-label={t("selectWeek")} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {weeks.map((w) => (
              <li key={w.week}>
                <button
                  type="button"
                  onClick={() => setSelectedWeek(w.week)}
                  className={`inline-grid h-9 place-items-center rounded-full border px-4 text-sm font-bold leading-none transition-colors ${focusRing} ${
                    selectedWeek === w.week
                      ? "border-primary bg-primary text-white"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {t("weekButton", { week: w.week, domain: domain.name(w.domain) })}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Weeks */}
      {weeks.map((w) => (
        w.week === selectedWeek && (
          <section
            key={w.week}
            id={`week-${w.week}`}
            aria-labelledby={`week-${w.week}-title`}
            className={`${wrap} scroll-mt-8 py-5 sm:py-7`}
          >
            <header className="max-w-2xl">
              <p className={`text-sm font-bold ${muted}`}>
                {t("weekRange", {
                  week: w.week,
                  from: w.days[0].day,
                  to: w.days[w.days.length - 1].day,
                })}
              </p>
              <h2
                id={`week-${w.week}-title`}
                className="mt-1 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl"
              >
                {domain.name(w.domain)}
              </h2>
              <p className={`mt-3 text-base leading-7 ${muted}`}>
                {domain.tagline(w.domain, w.tagline)}
              </p>
            </header>

            <ol className="mt-8 rounded-2xl border border-border px-5 sm:px-8">
              {w.days.map((d) => (
                <DayItem key={d.day} d={d} fw={fw} />
              ))}
            </ol>
          </section>
        )
      ))}

      {/* Source and attribution */}
      <section className={`${wrap} pb-16 grid gap-20`}>
        <div className="mt-10 rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="text-base font-extrabold tracking-tight">
            {t("howToRead")}
          </h2>
          <p className={`mt-1 text-sm leading-6 ${muted}`}>
            {t("howToReadLede")}
          </p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md bg-primary text-xs text-white">
                  {t("ksa.knowledge.letter")}
                </span>
                {t("ksa.knowledge.name")}
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                {t("ksa.knowledge.legend")}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md bg-foreground text-xs text-background">
                  {t("ksa.skills.letter")}
                </span>
                {t("ksa.skills.name")}
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                {t("ksa.skills.legend")}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md border border-foreground text-xs">
                  {t("ksa.attitudes.letter")}
                </span>
                {t("ksa.attitudes.name")}
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                {t("ksa.attitudes.legend")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-lg font-extrabold tracking-tight">
            {t("sourceTitle")}
          </h2>
          <p className={`mt-2 max-w-3xl text-sm leading-6 ${muted}`}>
            {t.rich("sourceBody", {
              name: meta.frameworkName,
              fullName: meta.frameworkFullName,
              publisher: meta.frameworkPublisher,
              em: (chunks) => <em>{chunks}</em>,
            })}
          </p>
          <Link
            href={meta.frameworkPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75 ${focusRing}`}
          >
            {t("sourceLink")}
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className={`${wrap} py-7 text-xs ${muted}`}>
          <p>{tf("copyright", { year: format.number(2026, { useGrouping: false }) })}</p>
        </div>
      </footer>
    </main>
  );
}

/* ---------- page wrapper with suspense boundary ---------- */

export default function CurriculumPage() {
  const t = useTranslations("Curriculum");
  return (
    <Suspense fallback={<div className="min-h-dvh grid place-items-center text-sm font-bold">{t("loading")}</div>}>
      <CurriculumContent />
    </Suspense>
  );
}