import Image from "next/image";
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

export default function About() {
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
              What&apos;s &amp; Why <br /> Sika
              <span className="text-primary">AI</span>
            </h2>

            <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 lg:mr-24 rounded-full bg-primary/10">
              <Image
                src="/graphics/girl/explaining.png"
                alt="SikaAI - Bridging the Digital Divide"
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
              We aim to stop{" "}
              <strong className="text-foreground font-semibold">
                educational polarization
              </strong>
              ! <br /> As AI spreads, a gap is opening between people who know how to use it and people who don’t. Those with the skills are learning and working faster, while learners without access or guidance risk falling further behind.
            </p>

            <p className="font-semibold text-foreground text-lg sm:text-xl pt-1">
              SikaAI was built to pull everyone forward.
            </p>

            <p>
              SikaAI is an AI literacy program designed first for school students in Nepal (primary and secondary, K-12), and open to youth, adults, and older community members too. In four weeks, learners build the skills to understand AI-generated content, use AI safely, and apply it in everyday life. Lessons use simple language and examples from Nepali life, and work offline once installed, so there are no age limits and no need for a constant connection. Anyone, from anywhere, can learn from it.
            </p>

            <p className="font-medium text-foreground italic pt-1">
              We can&apos;t stop the rise of AI, but together, we can bridge the
              gap.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
