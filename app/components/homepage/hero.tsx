import Typewriter from "../Typewriter";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
export default function Hero() {
  const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
  const lede =
    "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

  const stats = [
    { value: "4", label: "Domains" },
    { value: "28", label: "Lessons" },
    { value: "2", label: "mins/day" },
  ];

  return (
    <>
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
                SikaAI is a four-week AI literacy program made for school
                students and open to everyone. Learn to spot AI, understand how
                it’s used, and use it wisely, even without internet. Install it
                once, then learn offline.
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
                alt="image"
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
                    <p className="mt-1 text-xs font-semibold text-(--muted) sm:text-sm">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
