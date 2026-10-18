import Image from "next/image";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 =
  "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";
const lede = "text-base leading-7 text-(color:--muted) sm:text-lg sm:leading-8";

const steps = [
  {
    step: "Step 1",
    title: "Learn",
    description: "Simple explanations introduce each idea.",
    icon: "/graphics/elements/book.png",
  },
  {
    step: "Step 2",
    title: "Practise",
    description: "Apply the idea to familiar situations.",
    icon: "/graphics/elements/pencil.png",
  },
  {
    step: "Step 3",
    title: "Take an MCQ",
    description: "Answer a short quiz to check your understanding.",
    icon: "/graphics/elements/check.png",
  },
  {
    step: "Step 4",
    title: "Reflect",
    description: "Take one useful habit into everyday life.",
    icon: "/graphics/elements/reflect.png",
  },
];

export default function Course() {
  return (
    <>
      <section
        id="approach"
        className="border-y border-border bg-(--crimson-pale)/45 py-20 sm:py-18"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`${h2} mt-4`}>Learn it. Use it. Test it.</h2>
            <p className={`${lede} mt-5`}>
              Each lesson combines everyday examples and intreactive tests so
              learning never feels like a lecture.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {steps.map(({ step, title, description, icon }, i) => (
              <li
                key={step}
                className="group relative rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="grid place-items-center rounded-xl bg-(--saffron) px-3 py-1 text-sm font-extrabold text-[#2d2422]">
                    {step}
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
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-(--muted)">
                  {description}
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
