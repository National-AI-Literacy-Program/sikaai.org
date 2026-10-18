import Link from "next/link";
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

export default function Ref() {
  return (
    <>
      <section id="reference" className={`${wrap} py-20 sm:py-28`}>
        <div className="relative overflow-hidden rounded-4xl bg-(--crimson-pale) px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full border-40 border-white/40"
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
    </>
  );
}
