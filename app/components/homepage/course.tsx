import Image from "next/image";
import { getTranslations } from "next-intl/server";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const steps = [
  { n: 1, key: "learn", icon: "/graphics/elements/book.png" },
  { n: 2, key: "practise", icon: "/graphics/elements/pencil.png" },
  { n: 3, key: "mcq", icon: "/graphics/elements/check.png" },
  { n: 4, key: "reflect", icon: "/graphics/elements/reflect.png" },
] as const;

export default async function Course() {
  const t = await getTranslations("Approach");

  return (
    <>
      <section
        id="approach"
        className="border-y border-border bg-(--crimson-pale)/45 py-20 sm:py-18"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`${h2} mt-4`}>{t("title")}</h2>
            <p className={`${lede} mt-5`}>{t("lede")}</p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {steps.map(({ n, key, icon }, i) => (
              <li
                key={n}
                className="group relative rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="grid place-items-center rounded-xl bg-(--saffron) px-3 py-1 text-sm font-extrabold text-[#2d2422]">
                    {t("stepLabel", { n })}
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
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-(--muted)">
                  {t(`steps.${key}.description`)}
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
    </>
  );
}