import Image from "next/image";
import { getTranslations } from "next-intl/server";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

export default async function About() {
  const t = await getTranslations("About");

  return (
    <>
      <section
        id="about"
        className="relative border-b border-border bg-background py-12 sm:py-16 lg:py-20"
      >
        <div className={wrap}>
          <div className="flex items-center justify-between gap-6">
            <h2
              className={`${h2} text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight`}
            >
              {t.rich("title", {
                br: () => <br />,
                ai: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h2>

            <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 lg:mr-24 rounded-full bg-primary/10">
              <Image
                src="/graphics/girl/explaining.png"
                alt={t("imageAlt")}
                fill
                priority
                className="object-contain p-3"
                sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
              />
            </div>
          </div>

          <div
            className={`${lede} mt-6 space-y-3 text-base text-muted-foreground leading-7`}
          >
            <p>
              {t.rich("intro", {
                b: (chunks) => (
                  <strong className="text-foreground font-semibold">
                    {chunks}
                  </strong>
                ),
                br: () => <br />,
              })}
            </p>

            <p className="font-semibold text-foreground text-lg sm:text-xl pt-1">
              {t("tagline")}
            </p>

            <p>{t("program")}</p>

            <p className="font-medium text-foreground italic pt-1">
              {t("closing")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}