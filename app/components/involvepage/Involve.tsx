"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Involve() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError("Enter a valid email address, like name@example.com.");
      return;
    }

    try {
      window.localStorage.setItem("Sikaai-email", value);
    } catch {
      // storage can be blocked (private mode); continue anyway
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
            Namaste!
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
          </div>

          <div className="size-28 -rotate-6 overflow-hidden rounded-full border-4 border-background bg-(--crimson-pale) shadow-[0_6px_0_0_#9a1c1c] transition-transform duration-300 hover:-rotate-12 hover:scale-105 motion-reduce:transition-none sm:size-36">
            <Image
              className="h-full w-full object-contain p-1.5"
              src="/graphics/girl/happy.png"
              alt="Smiling girl in traditional dress waving hello"
              width={288}
              height={288}
              priority
            />
          </div>

          <div className="-ml-5 mb-[-10px] size-28 rotate-6 overflow-hidden rounded-full border-4 border-background bg-(--saffron)/25 shadow-[0_6px_0_0_#9a1c1c] transition-transform duration-300 hover:rotate-12 hover:scale-105 motion-reduce:transition-none sm:size-36">
            <Image
              className="h-full w-full object-contain p-1.5"
              src="/graphics/boy/happy.png"
              alt="Smiling boy in a dhaka topi waving hello"
              width={288}
              height={288}
              priority
            />
          </div>
        </div>

        <h1 className="text-[clamp(34px,7vw,56px)] font-extrabold leading-[0.96] tracking-[-0.06em]">
          Start learning <span className="text-primary">AI</span> today.
        </h1>

       
        <form
          onSubmit={submit}
          noValidate
          className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="w-full text-left">
            <label htmlFor="course-email" className="sr-only">
              Email address
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
              placeholder="Enter your email address"
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
            Start
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>

        <p className="mt-5 text-xs font-semibold text-(--muted) sm:text-sm">
          Free to join. No password needed.
        </p>
      </div>
    </main>
  );
}