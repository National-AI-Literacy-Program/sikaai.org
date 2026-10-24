import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Typewriter from "../Typewriter";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const format = await getFormatter();

  const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
  const lede =
    "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

  const phrases = t.raw("phrases") as string[];
  const fixedFirst = t("fixedPosition") === "before";

  const stats = [
    { value: format.number(4), label: t("stats.domains") },
    { value: format.number(28), label: t("stats.lessons") },
    { value: format.number(2), label: t("stats.minsPerDay") },
  ];

  const typed = (
    <span className="block whitespace-nowrap text-primary ne:whitespace-normal">
      <Typewriter
        strings={phrases}
        typeSpeed={70}
        deleteSpeed={35}
        pauseDuration={2000}
      />
    </span>
  );
  const fixed = <span className="block">{t("fixed")}</span>;

  return (
    <section id="hero" className="relative">
      <div className={`${wrap} pb-20 pt-12 sm:pb-28 lg:pb-32`}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-30 md:grid-cols-2 md:gap-20">
          {/* Left column */}
          <div className="order-2 self-center text-center sm:order-1 md:text-left">
            <h1 className="text-[length:calc(clamp(40px,7.5vw,65px)*var(--ne-h1,1))] font-extrabold leading-[0.94] tracking-[-0.06em]">
              {fixedFirst ? (
                <>
                  {fixed}
                  {typed}
                </>
              ) : (
                <>
                  {typed}
                  {fixed}
                </>
              )}
            </h1>

            <p className={`${lede} mx-auto mt-7 max-w-2xl md:mx-0`}>
              {t.rich("lede", {
                keep: (chunks) => (
                  <span className="whitespace-nowrap">{chunks}</span>
                ),
                hl: (chunks) => (
                  <span className="relative isolate inline-block text-foreground">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 280 40"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute left-[-0.3em] top-[calc(50%-0.475em)] -z-10 h-[1.05em] w-[calc(100%+0.6em)] origin-left fill-primary/35 animate-[swipe_0.7s_0.6s_ease-out_both] motion-reduce:animate-none"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 10C55 5 105 9 155 6C200 3 238 7 262 9C270 9.5 276 11 280 13.5C272 14.5 266 14.8 258 15C268 16.5 275 18.5 279 21C271 22 264 22.2 256 22.5C265 24 270 26 273 28.5C267 29.5 260 30 253 30.5C215 32 175 36 130 34C85 32.5 45 36 18 33C8 32 3 27 4 21C5 15 7 12 10 10ZM188 13.2C208 12.4 230 13.4 248 14.2C230 16.8 208 15.6 188 13.2ZM212 22C228 21.3 242 22.2 250 22.6C240 24.6 226 24 212 22Z"
                      />
                    </svg>
                    {chunks}
                  </span>
                ),
              })}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/course"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_4px_0_0_#9a1c1c] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_6px_0_0_#9a1c1c] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--saffron) active:translate-y-0.5 active:shadow-[0_2px_0_0_#9a1c1c]"
              >
                {t("start")}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#course-structure"
                className="inline-flex items-center rounded-xl px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-(--crimson-pale)"
              >
                {t("howItWorks")}
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="order-1 flex flex-col items-center sm:order-2">
            <div className="relative mb-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm font-bold text-foreground shadow-sm sm:text-base">
              {t("namaste")}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background"
              />
            </div>

            <Image
              className="mb-5 h-auto w-1/2 max-w-36 drop-shadow-sm sm:w-1/3"
              src="/graphics/namaste.png"
              alt={t("imageAlt")}
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
  );
}