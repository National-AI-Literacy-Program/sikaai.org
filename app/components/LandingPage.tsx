import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Typewriter from "./Typewriter";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const eyebrow =
  "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const stats = [
  { value: "4", label: "Domains" },
  { value: "28", label: "Lessons" },
  { value: "2.5", label: "mins/day" },
];

const steps = [
  {
    step: "Step 1",
    title: "Learn",
    description: "Simple explanations introduce each idea.",
    icon: "/graphics/elements/book.png",
  },
  {
    step: "Step 2",
    title: "Practise",
    description: "Apply the idea to familiar situations.",
    icon: "/graphics/elements/pencil.png",
  },
  {
    step: "Step 3",
    title: "Take an MCQ",
    description: "Answer a short quiz to check your understanding.",
    icon: "/graphics/elements/check.png",
  },
  {
    step: "Step 4",
    title: "Reflect",
    description: "Take one useful habit into everyday life.",
    icon: "/graphics/elements/reflect.png",
  },
];

const weeks = [
  {
    step: "01",
    title: "Engage with AI",
    description:
      "Become a critical and responsible participant in a world marked by AI.",
    tag: "Week 1",
  },
  {
    step: "02",
    title: "Create with AI",
    description:
      "Use AI as a creative partner while maintaining human agency.",
    tag: "Week 2",
  },
  {
    step: "03",
    title: "Manage AI",
    description:
      "Divide work intentionally between humans and AI.",
    tag: "Week 3",
  },
  {
    step: "04",
    title: "Shape AI",
    description:
      "Improve AI systems to reflect human values.",
    tag: "Week 4",
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
        <div className={`${wrap} pb-20 pt-12 sm:pb-28 lg:pb-32`}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
            {/* Left column: Hero content */}
            <div className="text-center md:text-left">
              <h1 className="text-[clamp(40px,7.5vw,88px)] font-extrabold leading-[0.94] tracking-[-0.06em]">
                <span className="block whitespace-nowrap text-primary">
                  <Typewriter
                    strings={["Engage with", "Create with", "Manage", "Shape"]}
                    typeSpeed={70}
                    deleteSpeed={35}
                    pauseDuration={2000}
                  />
                </span>
                <span className="block">AI.</span>
              </h1>

              <p className={`${lede} mx-auto mt-7 max-w-2xl md:mx-0`}>
                SikaiAI is a four-week AI literacy program that helps you
                identify AI, understand how it is used, and make more informed
                choices online.
              </p>

              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
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
            </div>

            {/* Right column: Illustration and statistics */}
            <div className="flex flex-col items-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-bold shadow-sm backdrop-blur">
                <span className="size-2 rounded-full bg-primary" />A four-week
                AI literacy course
              </div>
              <Image
                className="mb-5 h-auto w-1/2 max-w-36 drop-shadow-sm sm:w-1/3"
                src="/graphics/namaste.png"
                alt="Namaste illustration welcoming learners"
                width={144}
                height={144}
                priority
              />

              <div className="mt-8 grid w-full max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/75 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur sm:mt-10">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="px-3 py-5 text-center sm:px-6 sm:py-6"
                  >
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
        </div>
      </section>

      {/* Course structure */}
      <section
        id="course-structure"
        className="border-y border-border bg-(--blue-pale)/45 py-20 sm:py-18"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            {/* <p className={eyebrow}>A SIMPLE LEARNING LOOP</p> */}
            <h2 className={`${h2} mt-4`}>
              Learn something. Use it. Remember it.
            </h2>
            <p className={`${lede} mt-5`}>
              Each week combines short lessons, everyday examples, and
              multiple-choice questions so learning never feels like a lecture.
            </p>
          </div>

         <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
  {steps.map(({ step, title, description, icon }, i) => (
    <li
      key={step}
      className="group relative rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <span className="grid place-items-center rounded-xl bg-(--saffron) px-3 py-1 text-sm font-extrabold text-[#2d2422]">
          {step}
        </span>
        <span className="text-xl text-(--blue-deep) transition-transform group-hover:rotate-12">
          <Image
            src={icon}
            alt=""
            width={56}
            height={56}
            className="object-contain"
          />
        </span>
      </div>
      <h3 className="mt-8 text-xl font-extrabold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-(color:--muted)">
        {description}
      </p>

      {/* Enhanced Step Connector Arrow */}
      {i < steps.length - 1 && (
        <div
          aria-hidden="true"
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md font-bold text-lg"
        >
          →
        </div>
      )}
    </li>
  ))}
</ol>
        </div>
      </section>

      {/* Four-week journey */}
     <section  id="approach" className={`${wrap} py-8 sm:py-16 lg:py-28`}>
      <div  className="grid gap-12 lg:grid-cols-12 lg:gap-26">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <p className={eyebrow}>FOUR-WEEK JOURNEY</p>
          <h2 className={`${h2} mt-4`}>
            Progress step by step,
            <br />
            <span className="text-primary">one domain each week.</span>
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

        {/* Right Modules Timeline */}
        <div className="relative lg:col-span-7">
          {/* Vertical Connector Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-9 top-8 w-px bg-border sm:left-10"
          />

          <div className="space-y-4">
            {weeks.map(({ step, title, description, tag }, i) => (
              <article
                key={step}
                className={`group relative flex items-start gap-5 rounded-2xl border p-5 transition duration-200 sm:p-6 ${
                  i === 0
                    ? "border-primary bg-primary text-white shadow-xl shadow-primary/10"
                    : "border-border bg-background hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                {/* Step Number Badge */}
                <div className="relative z-10 shrink-0">
                  <span
                    className={`grid size-12 place-items-center rounded-xl text-sm font-extrabold ${
                      i === 0
                        ? "bg-white/15 text-white"
                        : "bg-(--saffron) text-[#2d2422]"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pr-6">
                  <p
                    className={`text-[10px] font-extrabold tracking-[0.18em] uppercase ${
                      i === 0 ? "text-white/70" : "text-(--blue-deep)"
                    }`}
                  >
                    {tag}
                  </p>
                  <h3
                    className={`mt-1 text-xl sm:text-2xl font-extrabold tracking-tight ${
                      i === 0 ? "text-white" : "text-foreground"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed ${
                      i === 0 ? "text-white/85" : "text-(color:--muted)"
                    }`}
                  >
                    {description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <span
                  className={`absolute right-5 top-5 text-base transition-transform group-hover:translate-x-1 ${
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
