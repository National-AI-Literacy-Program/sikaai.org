import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const eyebrow =
  "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const weeks = [
  { step: 1, key: "engage" },
  { step: 2, key: "create" },
  { step: 3, key: "manage" },
  { step: 4, key: "shape" },
] as const;

export default async function Content() {
  const t = await getTranslations("CourseStructure");
  const format = await getFormatter();

  return (
    <>
      <section id="course-structure" className="border-b border-border">
        <div className={`${wrap} py-8 sm:py-16 lg:py-28 `}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-26">
            {/* Left Sticky Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <p className={eyebrow}>{t("eyebrow")}</p>
              <h2 className={`${h2} mt-4`}>
                {t.rich("title", {
                  br: () => <br />,
                  hl: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h2>
              <p className={`${lede} mt-6 max-w-md`}>{t("lede")}</p>

              <Link
                href="/curriculum"
                className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75"
              >
                {t("explore")}
              </Link>
            </div>

            {/* Right Modules Timeline */}
            <div className="relative lg:col-span-7">
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-9 top-6 w-px bg-border sm:left-10"
              />

              <div className="space-y-3">
                {weeks.map(({ step, key }) => {
                  const weekNum = step;

                  return (
                    <Link
                      key={step}
                      href={`/curriculum?week=${weekNum}`}
                      className="group relative flex items-center gap-4 rounded-xl border border-border bg-background p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10 sm:p-4"
                    >
                      <div className="relative z-10 shrink-0">
                        <span className="grid size-10 place-items-center rounded-lg bg-(--saffron) text-xs font-extrabold text-[#2d2422] transition-colors group-hover:bg-white/15 group-hover:text-white">
                          {format.number(step, { minimumIntegerDigits: 2 })}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 pr-6">
                        <p className="text-[9px] font-extrabold tracking-[0.18em] uppercase text-(--blue-deep) transition-colors group-hover:text-white/70">
                          {t("weekTag", { n: weekNum })}
                        </p>
                        <h3 className="mt-0.5 text-lg sm:text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-white">
                          {t(`weeks.${key}.title`)}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-(--muted) transition-colors group-hover:text-white/85">
                          {t(`weeks.${key}.description`)}
                        </p>
                      </div>

                      <span className="absolute right-4 top-4 text-sm text-(--muted) transition-all group-hover:translate-x-1 group-hover:text-white/70">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}