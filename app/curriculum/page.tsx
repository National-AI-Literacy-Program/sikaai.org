"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import data from "@/data/curriculum.json"
/* ---------- types ---------- */

type Competence = {
  domain: string;
  number: number;
  level: string;
  page: number;
};

type Day = {
  day: number;
  title: string;
  summary: string;
  kind: string;           // lesson | project | capstone | extension
  review: boolean;
  competence: Competence | null;
  basis?: string;
  knowledge: string[];
  skills: string[];
  attitudes: string[];
};

type Week = { week: number; domain: string; tagline: string; days: Day[] };

type Curriculum = {
  meta: {
    title: string;
    frameworkName: string;
    frameworkFullName: string;
    frameworkPublisher: string;
    frameworkPdf: string;
  };
  framework: {
    knowledge: { id: string; label: string; page: number }[];
    skills: { id: string; name: string; description: string; page: number }[];
    attitudes: { id: string; name: string; description: string; page: number }[];
  };
  weeks: Week[];
};

const curriculum = data as unknown as Curriculum;
const { meta, framework, weeks } = curriculum;

/* ---------- helpers ---------- */

const pdfAt = (page: number) => `${meta.frameworkPdf}#page=${page}`;

const knowledgeById = Object.fromEntries(framework.knowledge.map((k) => [k.id, k]));
const skillById = Object.fromEntries(framework.skills.map((s) => [s.id, s]));
const attitudeById = Object.fromEntries(framework.attitudes.map((a) => [a.id, a]));

const kindLabel: Record<string, string> = {
  project: "Mini-project",
  capstone: "Capstone",
  extension: "SikaAI addition",
};

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const muted = "text-(color:--muted)";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

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
      aria-label={`${label}. Opens the framework PDF in a new tab.`}
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

function DayItem({ d }: { d: Day }) {
  const tags = [
    kindLabel[d.kind],
    d.review ? "Includes quiz review" : null,
  ].filter(Boolean) as string[];

  const hasKsa = d.knowledge.length + d.skills.length + d.attitudes.length > 0;

  return (
    <li
      id={`day-${d.day}`}
      className="grid scroll-mt-24 gap-4 border-t border-border py-6 first:border-t-0 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 print:break-inside-avoid"
    >
      <div className="flex items-baseline gap-2 md:block">
        <p className={`text-xs font-bold ${muted}`}>Day</p>
        <p className="text-3xl font-extrabold leading-none tracking-[-0.04em]">
          {d.day}
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
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold"
              >
                {t}
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
              {d.competence.domain} {d.competence.number}
              <span className="sr-only">. Opens the framework PDF in a new tab.</span>
            </a>
          ) : (
            <span className={muted}>{d.basis}</span>
          )}
          {d.competence && (
            <span className={muted}>, {d.competence.level}</span>
          )}
        </p>
      </div>

      {hasKsa && (
        <dl className="space-y-2.5 md:pt-1">
          {d.knowledge.length > 0 && (
            <Row letter="K" word="Knowledge" tone="k">
              {d.knowledge.map((id) => (
                <Chip
                  key={id}
                  tone="k"
                  href={pdfAt(knowledgeById[id].page)}
                  label={`Knowledge ${id}: ${knowledgeById[id].label}`}
                >
                  {id}
                </Chip>
              ))}
            </Row>
          )}
          {d.skills.length > 0 && (
            <Row letter="S" word="Skills" tone="s">
              {d.skills.map((id) => (
                <Chip
                  key={id}
                  tone="s"
                  href={pdfAt(skillById[id].page)}
                  label={`Skill: ${skillById[id].name}. ${skillById[id].description}`}
                >
                  {skillById[id].name}
                </Chip>
              ))}
            </Row>
          )}
          {d.attitudes.length > 0 && (
            <Row letter="A" word="Attitudes" tone="a">
              {d.attitudes.map((id) => (
                <Chip
                  key={id}
                  tone="a"
                  href={pdfAt(attitudeById[id].page)}
                  label={`Attitude: ${attitudeById[id].name}. ${attitudeById[id].description}`}
                >
                  {attitudeById[id].name}
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
        <nav aria-label="Select a week" className="mt-8">
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
                  Week {w.week}: {w.domain}
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
                Week {w.week}, days {w.days[0].day} to {w.days[w.days.length - 1].day}
              </p>
              <h2
                id={`week-${w.week}-title`}
                className="mt-1 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl"
              >
                {w.domain}
              </h2>
              <p className={`mt-3 text-base leading-7 ${muted}`}>{w.tagline}</p>
            </header>

            <ol className="mt-8 rounded-2xl border border-border px-5 sm:px-8">
              {w.days.map((d) => (
                <DayItem key={d.day} d={d} />
              ))}
            </ol>
          </section>
        )
      ))}

      {/* Source and attribution */}
      <section className={`${wrap} pb-16 grid gap-20`}>
        <div className="mt-10 rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="text-base font-extrabold tracking-tight">
            How to read each lesson
          </h2>
          <p className={`mt-1 text-sm leading-6 ${muted}`}>
            Every tag opens the matching page of the framework PDF.
          </p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md bg-primary text-xs text-white">
                  K
                </span>
                Knowledge
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                What learners understand about AI. 
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md bg-foreground text-xs text-background">
                  S
                </span>
                Skills
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                What learners can do.
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-extrabold">
                <span className="grid size-6 place-items-center rounded-md border border-foreground text-xs">
                  A
                </span>
                Attitudes
              </dt>
              <dd className={`mt-1.5 text-sm leading-6 ${muted}`}>
                The mindset learners bring.
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-lg font-extrabold tracking-tight">
            Source framework
          </h2>
          <p className={`mt-2 max-w-3xl text-sm leading-6 ${muted}`}>
            This curriculum is mapped to the {meta.frameworkName}:{" "}
            <em>{meta.frameworkFullName}</em> ({meta.frameworkPublisher}),
            licensed under CC BY 4.0. This is an adaptation of an original work
            by the OECD and the European Union. The opinions expressed and
            arguments employed in this adaptation should not be reported as
            representing the official views of the OECD, its Member countries or
            the European Union.
          </p>
          <Link
            href={meta.frameworkPdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75 ${focusRing}`}
          >
            Open the framework PDF ↗
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className={`${wrap} py-7 text-xs ${muted}`}>
          <p>© 2026 SikaAI</p>
        </div>
      </footer>
    </main>
  );
}

/* ---------- page wrapper with suspense boundary ---------- */

export default function CurriculumPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh grid place-items-center text-sm font-bold">Loading curriculum...</div>}>
      <CurriculumContent />
    </Suspense>
  );
}