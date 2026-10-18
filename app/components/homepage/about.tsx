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
              ! <br /> As AI rapidly advances, the gap between the digital-savvy
              and the left-behind is widening at an alarming rate. Those who
              know how to leverage AI are boosting their productivity and
              knowledge, while underprivileged communities risk being left
              further behind.
            </p>

            <p className="font-semibold text-foreground text-lg sm:text-xl pt-1">
              SikaAI was built to pull everyone forward.
            </p>

            <p>
              At its core, SikaAI is an AI literacy initiative designed to help
              bridge the digital divide starting with youth and older community
              members in Nepal. We empower learners to understand AI-generated
              content, use AI safely, and build practical skills. While rooted
              in Nepali culture with simple, accessible language, SikaAI has no
              age limits; anyone, from anywhere can learn from it.
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
