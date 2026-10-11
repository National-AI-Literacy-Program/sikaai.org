import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Typewriter from "./Typewriter";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const eyebrow =
  "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede =
  "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const stats = [
  { value: "28", label: "Lessons" },
  { value: "30", label: "Days" },
  { value: "30+", label: "MCQs" },
];

const steps = [
  {
    step: "01",
    title: "Learn",
    description: "Simple explanations introduce each idea.",
    icon: "↗",
  },
  {
    step: "02",
    title: "Practise",
    description: "Apply the idea to familiar situations.",
    icon: "✦",
  },
  {
    step: "03",
    title: "Take an MCQ",
    description: "Answer a short quiz to check your understanding.",
    icon: "✓",
  },
  {
    step: "04",
    title: "Reflect",
    description: "Take one useful habit into everyday life.",
    icon: "↺",
  },
];

const weeks = [
  {
    step: "01",
    title: "Engage with AI",
    description:
      "Recognise AI in the apps, search tools, and platforms you already use.",
    tag: "START HERE",
  },
  {
    step: "02",
    title: "Create with AI",
    description:
      "Learn how AI-generated content is created and why it can be misleading or biased.",
    tag: "MODULE 02",
  },
  {
    step: "03",
    title: "Manage AI",
    description:
      "Understand how AI affects privacy, work, and the choices we make online.",
    tag: "MODULE 03",
  },
  {
    step: "04",
    title: "Wrapping Up",
    description:
      "Review what you have learned and build habits for safer, smarter AI use.",
    tag: "FINISH",
  },
];

const references = [
  {
    publisher: "UNESCO",
    description: "Guidance for generative AI in education and research.",
    href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
  },
  {
    publisher: "UNICEF",
    description: "Policy guidance on AI for children and their rights.",
    href: "https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children",
  },
  {
    publisher: "OECD",
    description: "Principles for trustworthy and human-centred AI.",
    href: "https://oecd.ai/en/ai-principles",
  },
  {
    publisher: "UNESCO",
    description:
      "Media and information literacy resources for navigating digital life.",
    href: "https://www.unesco.org/en/media-information-literacy",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background font-sans text-foreground antialiased">
      <Header />

      {/* Hero */}
      <section id="about" className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-180px] size-[560px] -translate-x-1/2 rounded-full bg-(--blue-pale) opacity-80 blur-3xl" />
          <div className="absolute right-[-180px] top-40 size-80 rounded-full bg-(--saffron) opacity-15 blur-3xl" />
        </div>

        <div className={`${wrap} pb-20 pt-12 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24`}>
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-bold shadow-sm backdrop-blur">
              <span className="size-2 rounded-full bg-primary" />
              A four-week AI literacy course
            </div>

            <Image
              className="mb-5 h-auto w-20 drop-shadow-sm sm:w-24"
              src="/lesson-art/namaste.svg"
              alt="Namaste illustration welcoming learners"
              width={144}
              height={144}
              priority
            />

            <h1 className="max-w-4xl text-[clamp(48px,9vw,88px)] font-extrabold leading-[0.94] tracking-[-0.06em]">
              <span className="block text-primary">
                <Typewriter
                  strings={["Engage with", "Create with", "Manage", "Shape"]}
                  typeSpeed={70}
                  deleteSpeed={35}
                  pauseDuration={2000}
                />
              </span>
              <span className="block">AI.</span>
            </h1>

            <p className={`${lede} mt-7 max-w-2xl`}>
              SikaiAI is a four-week AI literacy program that helps you identify
              AI, understand how it is used, and make more informed choices
              online.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/course"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_4px_0_0_#9a1c1c] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_6px_0_0_#9a1c1c] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--saffron) active:translate-y-0.5 active:shadow-[0_2px_0_0_#9a1c1c]"
              >
                Start learning
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="#course-structure"
                className="inline-flex items-center rounded-xl px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-(--blue-pale)"
              >
                See how it works
              </a>
            </div>

            <div className="mt-14 grid w-full max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/75 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur sm:mt-16">
              {stats.map(({ value, label }) => (
                <div key={label} className="px-3 py-5 sm:px-6 sm:py-6">
                  <p className="text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-(color:--muted) sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course structure */}
      <section
        id="course-structure"
        className="border-y border-border bg-(--blue-pale)/45 py-20 sm:py-28"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={eyebrow}>A SIMPLE LEARNING LOOP</p>
            <h2 className={`${h2} mt-4`}>Learn something. Use it. Remember it.</h2>
            <p className={`${lede} mt-5`}>
              Each week combines short lessons, everyday examples, and
              multiple-choice questions so learning never feels like a lecture.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {steps.map(({ step, title, description, icon }, i) => (
              <li
                key={step}
                className="group relative rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-(--saffron) text-sm font-extrabold text-[#2d2422]">
                    {step}
                  </span>
                  <span className="text-xl text-(--blue-deep) transition-transform group-hover:rotate-12">
                    {icon}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-extrabold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-(color:--muted)">
                  {description}
                </p>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-11 z-10 hidden text-xl text-(--muted) lg:block"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Four-week journey */}
      <section id="approach" className={`${wrap} py-20 sm:py-28 lg:py-32`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className={eyebrow}>FOUR-WEEK JOURNEY</p>
            <h2 className={`${h2} mt-4`}>
              Build confidence
              <br />
              <span className="text-primary">one module at a time.</span>
            </h2>
            <p className={`${lede} mt-6 max-w-md`}>
              Move from recognising AI to making thoughtful, responsible
              choices. Start small, build context, and finish with habits you
              can actually use.
            </p>

            <Link
              href="/course"
              className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75"
            >
              Explore the curriculum →
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-6 top-8 w-px bg-border sm:left-7"
            />

            <div className="space-y-4">
              {weeks.map(({ step, title, description, tag }, i) => (
                <article
                  key={step}
                  className={`group relative ml-0 grid gap-5 rounded-3xl border p-6 transition duration-200 sm:grid-cols-[58px_1fr] sm:p-7 ${
                    i === 0
                      ? "border-primary bg-primary text-white shadow-[0_16px_50px_rgba(154,28,28,0.16)]"
                      : "border-border bg-background hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                >
                  <div className="relative z-10">
                    <span
                      className={`grid size-12 place-items-center rounded-2xl text-sm font-extrabold ${
                        i === 0
                          ? "bg-white/15 text-white"
                          : "bg-(--saffron) text-[#2d2422]"
                      }`}
                    >
                      {step}
                    </span>
                  </div>

                  <div>
                    <p
                      className={`text-[10px] font-extrabold tracking-[0.18em] ${
                        i === 0 ? "text-white/65" : "text-(--blue-deep)"
                      }`}
                    >
                      {tag}
                    </p>
                    <h3
                      className={`mt-2 text-2xl font-extrabold tracking-tight ${
                        i === 0 ? "text-white" : "text-foreground"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-2 max-w-xl text-sm leading-6 sm:text-base ${
                        i === 0 ? "text-white/80" : "text-(color:--muted)"
                      }`}
                    >
                      {description}
                    </p>
                  </div>

                  <span
                    className={`absolute right-6 top-6 text-lg transition-transform group-hover:translate-x-1 ${
                      i === 0 ? "text-white/70" : "text-(--muted)"
                    }`}
                  >
                    →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className={`${wrap} pb-20 sm:pb-28`}>
        <div className="relative overflow-hidden rounded-[2rem] bg-(--blue-pale) px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full border-[40px] border-white/40"
          />
          <div className="relative grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className={eyebrow}>WHY ARE WE DOING THIS?</p>
              <h2 className={`${h2} mt-4`}>
                AI is already
                <br />
                <span className="text-primary">part of everyday life.</span>
              </h2>
            </div>
            <p className={lede}>
              SikaAI helps learners ask better questions, protect their
              information, and make confident choices as AI becomes more common.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section
        id="references"
        className="border-t border-border py-20 sm:py-28"
      >
        <div className={wrap}>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className={eyebrow}>REFERENCES</p>
              <h2 className={`${h2} mt-4`}>
                Learn from
                <br />
                <span className="text-primary">trusted guidance.</span>
              </h2>
            </div>
            <p className={`${lede} max-w-lg md:justify-self-end`}>
              The course draws on established guidance about AI, digital
              literacy, online safety, and responsible technology use.
            </p>
          </div>

          <ul className="mt-12 overflow-hidden rounded-2xl border border-border">
            {references.map(({ publisher, description, href }) => (
              <li key={href} className="border-b border-border last:border-b-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-3 px-5 py-5 transition hover:bg-(--blue-pale)/45 sm:grid-cols-[130px_1fr_auto] sm:items-center sm:gap-8 sm:px-7"
                >
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {publisher}
                  </h3>
                  <p className="text-sm leading-6 text-(color:--muted)">
                    {description}
                  </p>
                  <span className="text-sm font-extrabold text-(--blue-deep) transition-transform group-hover:translate-x-1">
                    View →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div
          className={`${wrap} flex flex-col gap-3 py-7 text-xs text-(color:--muted) sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>© 2026 SikaAI</p>
          <p>
            <a
              href="#references"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              References
            </a>{" "}
            · Learn AI. One small lesson at a time.
          </p>
        </div>
      </footer>
    </main>
  );
}
