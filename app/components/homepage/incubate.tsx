import Image from "next/image";
import Link from "next/link";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const eyebrow =
  "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";

const incubator = {
  name: "Institute for Rural Development",
  description:
    "SikaAI is proudly incubated and supported by the Institute for Rural Development, a non-profit working in education, agriculture, heritage conservation, tourism, entrepreneurship, etc. to foster sustainable development in Nepal.",
  logo: "/IRD_logo.png",
  website: "https://ird.com.np",
};
export default function Incubator() {
  return (
    <>
      <section id="incubator" className={`${wrap} py-10 sm:py-18`}>
        <div className="rounded-2xl border border-border bg-background p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-(--crimson-pale) flex items-center justify-center p-3 border border-border">
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
    </>
  );
}
