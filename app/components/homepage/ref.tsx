import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const LESSON_COUNT = 28;

export default async function Ref() {
  const t = await getTranslations("Reference");

  return (
    <>
      <section id="reference" className="border-b border-border bg-(--crimson-pale)/40">
        <div className={`${wrap} py-20 sm:py-28`}>
        <div className="relative overflow-hidden rounded-4xl bg-(--crimson-pale) px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full border-40 border-white/40"
          />
          <div className="relative grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className={`${h2} mt-4`}>
                {t.rich("title", {
                  br: () => <br />,
                  hl: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h2>
            </div>
            <div>
              <p className={lede}>{t("body", { lessons: LESSON_COUNT })}</p>
              <Link
                target="_blank"
                href="https://ailiteracyframework.org/pdfs/framework_pdf/AILF_en.pdf"
                className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary underline decoration-2 underline-offset-4 hover:opacity-75"
              >
                {t("explore")}
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}