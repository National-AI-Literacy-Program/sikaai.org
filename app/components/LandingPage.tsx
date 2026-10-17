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
    description: "Use AI as a creative partner while maintaining human agency.",
    tag: "Week 2",
  },
  {
    step: "03",
    title: "Manage AI",
    description: "Divide work intentionally between humans and AI.",
    tag: "Week 3",
  },
  {
    step: "04",
    title: "Shape AI",
    description: "Improve AI systems to reflect human values.",
    tag: "Week 4",
  },
];

const team = [
  {
    name: "Komalhari Shrestha",
    role: "FOUNDER | PROGRAM DIRECTOR",
    skills: "Project Management, Frontend Dev, Curriculum Structure",
    image: "/team/komal.png",
  },
  {
    name: "Mandeep Bhandari",
    role: "BACKEND Research | API SYSTEMS",
    skills: "Backend Architecture & Testing",
    image: "/team/mandeep-b.png",
  },
  {
    name: "Mandeep Sapkota",
    role: "System ARCHITECT | BACKEND DEV",
    skills: "UI Design & Backend Development",
    image: "/team/mandeep-s.png",
  },
  {
    name: "Pranjal Panthi",
    role: "UI/UX DESIGN | Frontend DEV",
    skills: "Frontend Development & UI Integration",
    image: "/team/pranjal.jpg",
  },

  {
    name: "Himalhari Shrestha",
    role: "CURRICULUM DEV",
    skills: "Curriculum Design & Revision",
    image: "/team/himal.png",
  },
];

const incubator = {
  name: "Institute for Rural Development",
  description:
    "SikaAI is proudly incubated and supported by the Institute for Rural Development, a non-profit working in education, agriculture, heritage conservation, tourism, entrepreneurship, etc. to foster sustainable development in Nepal.",
  logo: "/IRD_logo.png",
  website: "https://ird.com.np",
};

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background font-sans text-foreground antialiased">
      <Header />

      {/* Hero */}
      <section id="hero" className="relative">
        <div className={`${wrap} pb-20 pt-12 sm:pb-28 lg:pb-32`}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-30 md:grid-cols-2 md:gap-20">
            {/* Left column: Hero content */}
            <div className="text-center md:text-left self-center order-2 sm:order-1">
              <h1 className="text-[clamp(40px,7.5vw,65px)] font-extrabold leading-[0.94] tracking-[-0.06em]">
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
                  className="inline-flex items-center rounded-xl px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-(--crimson-pale)"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Right column: Illustration and statistics */}
            <div className="flex flex-col items-center order-1 sm:order-2">
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
        id="approach"
        className="border-y border-border bg-(--crimson-pale)/45 py-20 sm:py-18"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`${h2} mt-4`}>Learn it. Use it. Test it.</h2>
            <p className={`${lede} mt-5`}>
              Each lesson combines everyday examples and intreactive tests so
              learning never feels like a lecture.
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
      <section
        id="course-structure"
        className={`${wrap} py-8 sm:py-16 lg:py-28`}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-26">
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
              href="/curriculum"
              className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75"
            >
              Explore the curriculum →
            </Link>
          </div>

          {/* Right Modules Timeline */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-9 top-6 w-px bg-border sm:left-10"
            />

            <div className="space-y-3">
              {weeks.map(({ step, title, description, tag }) => (
                <article
                  key={step}
                  className="group relative flex items-center gap-4 rounded-xl border border-border bg-background p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10 sm:p-4"
                >
                  <div className="relative z-10 shrink-0">
                    <span className="grid size-10 place-items-center rounded-lg bg-(--saffron) text-xs font-extrabold text-[#2d2422] transition-colors group-hover:bg-white/15 group-hover:text-white">
                      {step}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 pr-6">
                    <p className="text-[9px] font-extrabold tracking-[0.18em] uppercase text-(--blue-deep) transition-colors group-hover:text-white/70">
                      {tag}
                    </p>
                    <h3 className="mt-0.5 text-lg sm:text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-white">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-(color:--muted) transition-colors group-hover:text-white/85">
                      {description}
                    </p>
                  </div>

                  <span className="absolute right-4 top-4 text-sm text-(--muted) transition-all group-hover:translate-x-1 group-hover:text-white/70">
                    →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="reference" className={`${wrap} py-20 sm:py-28`}>
        <div className="relative overflow-hidden rounded-4xl bg-(--crimson-pale) px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full border-[40px] border-white/40"
          />
          <div className="relative grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className={`${h2} mt-4`}>
                Based on
                <br />
                <span className="text-primary">
                  AILit <br /> Framework
                </span>
              </h2>
            </div>
            <div>
              <p className={lede}>
                SikaAI is built on the AILit Framework. Its 28 lessons are
                meticulously designed to align with the framework guidelines
                while being tailored to Nepal’s unique cultural context.
              </p>
              <Link
                target="_blank"
                href="https://ailiteracyframework.org/pdfs/framework_pdf/AILF_en.pdf"
                className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75"
              >
                Explore AILit ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="#about" className="relative border-b border-border bg-background py-16 sm:py-24">
        <div className={wrap}>
          {/* Header Block */}
          <div className="max-w-3xl">
            <h2 className={`${h2} mt-3`}>
              What&apos;s & Why <br /> Sika{" "}
              <span className="text-primary">AI</span>
            </h2>
            <p className={`${lede} mt-4`}>
              We want to stop <strong>educational polarization</strong>! <br />
              As AI rapidly advances, the gap between the digital-savvy and the
              left-behind is widening at an alarming rate. Those who know how to
              leverage AI are boosting their productivity and knowledge, while
              underprivileged communities risk being left further behind.
              <br />
              <br />
              <strong>SikaAI was built to pull everyone forward.</strong>
              <br />
              <br />
              At its core, SikaAI is an AI literacy initiative designed to help
              bridge the digital divide starting with youth and older community
              members in Nepal. We empower learners to understand AI-generated
              content, use AI safely, and build practical skills. While rooted
              in Nepali culture with simple, accessible language, SikaAI has no
              age limits; anyone, from anywhere can learn from it.
              <br />
              <br />
              Grounded in internationally recognized AI Literacy Frameworks
              (OECD / EU), our curriculum provides hands-on, contextualized
              learning tailored for real-world impact.
              <br />
              <br />
              We can&apos;t stop the rise of AI, but together, we can bridge the
              gap.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="aboutus" className={`${wrap} py-20 sm:py-28`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>THE PEOPLE BEHIND SIKAAI</p>
          <h2 className={`${h2} mt-4`}>Our core team</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative flex flex-col rounded-2xl border border-border bg-background p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto relative size-20 overflow-hidden rounded-full bg-(--crimson-pale) mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-bold tracking-tight text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                {member.role}
              </p>
           
            </div>
          ))}
        </div>
      </section>

      {/* Incubated By Section */}
      <section id="incubator" className={`${wrap} py-10 sm:py-18`}>
        <div className="rounded-2xl border border-border bg-background p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-(--crimson-pale) flex items-center justify-center p-3 border border-border">
              <Image
                src={incubator.logo}
                alt={incubator.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <p className={eyebrow}>INCUBATED BY</p>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
                {incubator.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--muted) max-w-xl">
                {incubator.description}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={incubator.website}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:bg-(--crimson-pale)"
            >
              Visit Website ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div
          className={`${wrap} flex flex-col gap-3 py-7 text-xs text-(--muted) sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>© 2026 SikaAI</p>
        </div>
      </footer>
    </main>
  );
}
