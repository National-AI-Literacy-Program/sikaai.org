"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { use, useMemo, useState } from "react";
import { getLesson, getLessons } from "@/lib/course";
import { useProgress } from "@/lib/progress";
import ThemeToggle from "@/app/components/ThemeToggle";

type Option = { label: string; correct: boolean };
type Mood = "explaining" | "happy" | "thinking" | "winking" | "surprised";
type Screen =
  | { t: "hook" }
  | { t: "learn"; text: string; n: number; of: number }
  | { t: "practice" }
  | { t: "quiz" }
  | { t: "done" };

const fix = (t: string) => String(t).replace(/([.!?])(?=[A-Z])/g, "$1 ");
const frame =
  "rounded-3xl border-2 border-border bg-background shadow-[0_6px_0_0_var(--line)]";
const btn =
  "rounded-2xl bg-primary px-8 py-3.5 text-base font-extrabold text-white shadow-[0_4px_0_0_#7d1f1f] transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary";

function Mascot({ who, mood, size = 150 }: { who: "boy" | "girl"; mood: Mood; size?: number }) {
  // Fixed square box so boy/girl art (different aspect ratios) never changes the layout height.
  return (
    <div className="relative aspect-square shrink-0" style={{ width: `min(${size}px, ${size > 140 ? 16 : 11}dvh)` }}>
      <Image
        key={`${who}-${mood}`}
        src={`/graphics/${who}/${mood}.png`}
        alt=""
        fill
        sizes="180px"
        priority
        className="mascot object-contain object-bottom drop-shadow-sm"
      />
    </div>
  );
}

function Deco({ name, className }: { name: string; className: string }) {
  return (
    <Image src={`/graphics/elements/${name}.png`} alt="" aria-hidden width={80} height={80} className={`pointer-events-none absolute h-auto w-14 sm:w-20 ${className}`} />
  );
}

function Notice({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5 text-center text-foreground">
      <div className={`${frame} max-w-md p-8`}>
        <Mascot who="boy" mood="thinking" />
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-2 text-(--muted)">{text}</p>
        <Link href={href} className={`${btn} mt-6 inline-block`}>{cta}</Link>
      </div>
    </main>
  );
}

function Question({
  title, options, pick, onPick, feedback, graded, locked, mascot,
}: {
  title: string; options: Option[]; pick: number | null; onPick: (i: number) => void;
  feedback?: { correct?: string; incorrect?: string }; graded: boolean; locked: boolean; mascot: React.ReactNode;
}) {
  const right = pick !== null && options[pick]?.correct;
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        {mascot}
        <div className="min-w-0">
          <p className="mb-1 inline-block rounded-full bg-(--crimson-pale) px-3 py-0.5 text-xs font-extrabold">
            {graded ? "Quiz time. This one counts!" : "Warm-up. Just for practice."}
          </p>
          <h2 className="text-lg font-extrabold leading-snug tracking-tight [@media(min-height:800px)]:text-2xl">{title}</h2>
        </div>
      </div>
      <div className="mt-3 grid gap-2 [@media(min-height:800px)]:mt-5 [@media(min-height:800px)]:gap-3">
        {options.map((o, i) => {
          const chosen = pick === i;
          const state = chosen ? (o.correct ? "border-(--success) bg-(--success)/15 pop" : "border-(--error) bg-(--error)/15 shake") : "border-border hover:border-primary hover:bg-(--crimson-pale)";
          return (
            <button
              key={o.label}
              type="button"
              disabled={locked}
              aria-pressed={chosen}
              onClick={() => onPick(i)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2 text-left text-base font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary [@media(min-height:800px)]:py-3.5 ${state}`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-xs font-extrabold text-background">
                {chosen ? (o.correct ? "✓" : "✕") : "ABCD"[i]}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
      <p role="status" className={`mt-2 min-h-10 rounded-xl px-3 py-2 text-sm font-semibold ${pick === null ? "invisible" : right ? "bg-(--success)/15" : "bg-(--error)/15"}`}>
        {pick !== null && (right ? feedback?.correct || "Nice one!" : feedback?.incorrect || "Not quite. Try another answer!")}
      </p>
    </div>
  );
}

export default function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: rawDay } = use(params);
  const day = Number(rawDay);
  const lesson = getLesson(day);
  const lessons = getLessons();
  const { ready, complete, statusOf } = useProgress();
  const [saved, setSaved] = useState(false);
  const [t0] = useState(() => Date.now());
  const [i, setI] = useState(0);
  const [who, setWho] = useState<"boy" | "girl">("boy");
  const [practice, setPractice] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<number | null>(null);
  const [misses, setMisses] = useState(0);

  const screens = useMemo<Screen[]>(() => {
    if (!lesson) return [];
    const sentences = fix(lesson.concept).split(/(?<=[.!?])\s+/).filter(Boolean);
    const chunks: string[] = [];
    for (let k = 0; k < sentences.length; k += 2) chunks.push(sentences.slice(k, k + 2).join(" "));
    return [
      { t: "hook" },
      ...chunks.map((text, n) => ({ t: "learn" as const, text, n: n + 1, of: chunks.length })),
      ...(lesson.action ? [{ t: "practice" as const }] : []),
      ...(lesson.quiz ? [{ t: "quiz" as const }] : []),
      { t: "done" },
    ];
  }, [lesson]);

  if (!ready) return <main className="h-dvh bg-background" />;
  if (!lesson)
    return <Notice title="This lesson isn't ready yet" text="Head back to the course to pick a lesson that's open." href="/course" cta="Back to course" />;
  // "waiting" days are allowed now: the course page shows the "one lesson a day" popup instead.
  if (statusOf(day) === "locked")
    return <Notice title={`Finish Day ${Math.max(1, day - 1)} first`} text="Small steps make it stick. Complete the last lesson to unlock this one." href={`/course/${Math.max(1, day - 1)}`} cta="Go to the last lesson" />;

  const idx = lessons.findIndex((l) => l.day === day);
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;
  const s = screens[i];
  const practiceDone = practice !== null;
  const quizRight = quiz !== null && lesson.quiz?.options[quiz]?.correct;
  const stars = misses === 0 ? 3 : misses === 1 ? 2 : 1;

  const mood: Mood =
    s.t === "hook" ? "surprised"
    : s.t === "learn" ? "explaining"
    : s.t === "practice" ? (practiceDone ? (lesson.action?.options[practice!]?.correct ? "happy" : "surprised") : "thinking")
    : s.t === "quiz" ? (quizRight ? "happy" : quiz !== null ? "surprised" : "thinking")
    : "winking";

  const canGo = s.t === "practice" ? practiceDone : s.t === "quiz" ? Boolean(quizRight) : true;
  const label = s.t === "hook" ? "Let's learn!" : s.t === "learn" && s.n === s.of ? "Got it!" : "Next";
  const bubble = "relative rounded-3xl border-2 border-border bg-(--crimson-pale) p-5 font-semibold";
  // text scales with screen height so it fills the space on any device
  const bubbleStyle = { fontSize: "clamp(1.125rem, 3.8dvh, 1.875rem)", lineHeight: 1.5 };

  return (
    <main className="relative isolate flex h-dvh touch-manipulation select-none flex-col overflow-hidden overscroll-none bg-background pt-[env(safe-area-inset-top)] font-sans text-foreground">
      <style>{`
        @keyframes pop{0%{transform:scale(.96)}50%{transform:scale(1.03)}100%{transform:scale(1)}}
        @keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes bob{50%{transform:translateY(-6px)}}
        .pop{animation:pop .35s}.shake{animation:shake .3s}.enter{animation:rise .35s both}.mascot{animation:bob 3s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.pop,.shake,.enter,.mascot{animation:none}}
      `}</style>

      <header className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 pt-3">
        <Link href="/course" aria-label="Back to course" className="grid size-10 place-items-center rounded-xl border-2 border-border text-lg font-bold hover:bg-(--crimson-pale)">✕</Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuemin={0} aria-valuemax={screens.length - 1} aria-valuenow={i} aria-label="Lesson progress">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(i / (screens.length - 1)) * 100}%` }} />
        </div>
        <button type="button" onClick={() => setWho((w) => (w === "boy" ? "girl" : "boy"))} className="rounded-xl border-2 border-border px-3 py-2 text-xs font-bold hover:bg-(--crimson-pale)" aria-label="Switch guide">
          Switch guide
        </button>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 pb-4 pt-2">

        <section key={i} className={`${frame} enter relative my-auto p-4 [@media(min-height:800px)]:p-8`}>
          {s.t === "hook" && (
            <div className="flex flex-col items-center gap-5 text-center">
              <Mascot who={who} mood={mood} size={170} />
              <p className={bubble} style={bubbleStyle}>{fix(lesson.hook)}</p>
              <Deco name="book" className="-bottom-3 -left-3 rotate-[-8deg]" />
            </div>
          )}

          {s.t === "learn" && (
            <div className="flex flex-col items-center gap-4">
              <Mascot who={who} mood={mood} size={170} />
              <div className="w-full">
                <div className="mb-3 flex gap-1.5" aria-label={`Part ${s.n} of ${s.of}`}>
                  {Array.from({ length: s.of }, (_, k) => (
                    <span key={k} className={`h-2 flex-1 rounded-full ${k < s.n ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
                <p className={bubble} style={bubbleStyle}>{s.text}</p>
              </div>
              <Deco name="pencil" className="-bottom-4 -right-2 rotate-12" />
            </div>
          )}

          {s.t === "practice" && lesson.action && (
            <div>
              <Question mascot={<Mascot who={who} mood={mood} size={110} />} title={lesson.action.title} options={lesson.action.options} pick={practice} onPick={setPractice} feedback={lesson.action.feedback} graded={false} locked={false} />
            </div>
          )}

          {s.t === "quiz" && lesson.quiz && (
            <div>
              <Question mascot={<Mascot who={who} mood={mood} size={110} />}
                title={lesson.quiz.title}
                options={lesson.quiz.options}
                pick={quiz}
                onPick={(n) => {
                  if (quizRight) return;
                  if (!lesson.quiz?.options[n]?.correct) setMisses((m) => m + 1);
                  setQuiz(n);
                }}
                feedback={lesson.quiz.feedback}
                graded
                locked={Boolean(quizRight)}
              />
            
            </div>
          )}

          {s.t === "done" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <Mascot who={who} mood={mood} size={170} />
              <h2 className="text-3xl font-extrabold tracking-tight">{saved ? "Day complete!" : "You did it!"}</h2>
              <p className="text-3xl tracking-widest text-(--gold)" aria-label={`${stars} out of 3 stars`}>
                {"★".repeat(stars)}<span className="text-border">{"★".repeat(3 - stars)}</span>
              </p>
              <p className="max-w-md text-(--muted)">{lesson.reward?.message || "Save your progress to unlock the next lesson."}</p>
              {saved && next ? (
                <>
                  <p className="font-bold">Day {next.day} is ready. Tomorrow is best, but you decide!</p>
                  <Link href="/course" className={`${btn} mt-1`}>Back to course</Link>
                </>
              ) : !saved ? (
                <button type="button" className={`${btn} mt-3`} onClick={async () => {
                  await complete(day, { misses, ms: Date.now() - t0 });
                  setSaved(true);
                }}>Save my progress</button>
              ) : (
                <Link href="/course" className={`${btn} mt-3`}>Back to course</Link>
              )}
              <Deco name="flower" className="-bottom-4 -left-3" />
              <Deco name="flower2" className="-bottom-4 -right-3" />
            </div>
          )}
        </section>
      </div>

      {s.t !== "done" && (
        <footer className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
            <button type="button" onClick={() => setI((v) => v - 1)} disabled={i === 0} aria-label="Previous" className="rounded-2xl border-2 border-border px-5 py-3 text-base font-extrabold hover:bg-(--crimson-pale) disabled:invisible">←</button>
            <button type="button" className={btn} disabled={!canGo} onClick={() => setI((v) => v + 1)}>{label}</button>
        </footer>
      )}

      <Image src="/graphics/elements/hill.png" alt="" aria-hidden width={300} height={150} className="pointer-events-none absolute -bottom-2 left-0 -z-10 h-auto w-20 opacity-30 sm:w-50" />
    </main>
  );
}