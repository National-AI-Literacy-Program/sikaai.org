"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { saveEmail } from "@/lib/progress";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";

export default function Involve() {
  const t = useTranslations("Involve");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  
  async function submit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError(t("errorInvalid"));
      return;
    }

    try {
      await saveEmail(value); // must finish before navigating
    } catch {
      setError(t("errorSave"));
      return;
    }

    // Best-effort: register with the backend, never block the learner
    if (navigator.onLine) {
      fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      }).catch(() => {});
    }

    router.push("/course");
  }

  return (
    // Fills whatever height is left under the header, never scrolls
    <main className="relative flex min-h-[calc(100dvh-100px)] flex-1 items-center justify-center overflow-hidden px-5 pb-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* Two greeters in tilted circular bubbles, overlapping slightly */}
        <div className="relative mb-8 flex items-end justify-center">
          {/* Speech bubble */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-1/2 z-10 -translate-x-1/2 rotate-[-4deg] rounded-2xl border border-border bg-background px-4 py-1.5 text-sm font-extrabold tracking-[-0.02em] shadow-sm sm:-top-6 sm:text-base"
          >
            {t("greeting")}
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
          </div>

          <div className="size-28 -rotate-6 overflow-hidden rounded-full border-4 border-background bg-(--crimson-pale) shadow-[0_6px_0_0_#9a1c1c] transition-transform duration-300 hover:-rotate-12 hover:scale-105 motion-reduce:transition-none sm:size-36">
            <Image
              className="h-full w-full object-contain p-1.5"
              src="/graphics/girl/happy.png"
              alt={t("girlAlt")}
              width={288}
              height={288}
              priority
            />
          </div>

          <div className="-ml-5 -mb-2.5 size-28 rotate-6 overflow-hidden rounded-full border-4 border-background bg-(--saffron)/25 shadow-[0_6px_0_0_#9a1c1c] transition-transform duration-300 hover:rotate-12 hover:scale-105 motion-reduce:transition-none sm:size-36">
            <Image
              className="h-full w-full object-contain p-1.5"
              src="/graphics/boy/happy.png"
              alt={t("boyAlt")}
              width={288}
              height={288}
              priority
            />
          </div>
        </div>

        <h1 className="text-[clamp(34px,7vw,56px)] font-extrabold leading-[0.96] tracking-[-0.06em]">
          {t.rich("headline", {
            ai: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>

        <form
          onSubmit={submit}
          noValidate
          className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="w-full text-left">
            <label htmlFor="course-email" className="sr-only">
              {t("emailLabel")}
            </label>
            <input
              id="course-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder={t("emailPlaceholder")}
              aria-invalid={!!error}
              aria-describedby={error ? "email-error" : undefined}
              className={`w-full rounded-xl border bg-background/80 px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition placeholder:font-medium placeholder:text-(--muted) ${
                error ? "border-primary" : "border-border"
              }`}
            />
            {error && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 pl-1 text-xs font-semibold text-primary sm:text-sm"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_4px_0_0_#9a1c1c] transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_6px_0_0_#9a1c1c] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--saffron) active:translate-y-0.5 active:shadow-[0_2px_0_0_#9a1c1c] sm:w-auto"
          >
            {t("submit")}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>

        <p className="mt-5 text-xs font-semibold text-(--muted) sm:text-sm">
          {t("freeNote")}
        </p>
      </div>
    </main>
  );
}