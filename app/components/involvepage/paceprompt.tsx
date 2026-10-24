"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type TipId = "seed" | "momos" | "cricket" | "backpack" | "song";

const TIPS: { emoji: string; id: TipId; values?: Record<string, number> }[] = [
  { emoji: "🌱", id: "seed" },
  { emoji: "🥟", id: "momos", values: { all: 30, daily: 3 } },
  { emoji: "🏏", id: "cricket", values: { minutes: 30, hours: 7 } },
  { emoji: "🎒", id: "backpack" },
  { emoji: "🎸", id: "song", values: { times: 20 } },
];

type Props = {
  day: number;
  when: string; // already translated by the parent, e.g. "tomorrow" or "in 5h"
  onClose: () => void;
  onContinue: () => void;
};

export default function PacePrompt({ day, when, onClose, onContinue }: Props) {
  const t = useTranslations("PacePrompt");
  const ref = useRef<HTMLDialogElement>(null);
  const tip = TIPS[day % TIPS.length]; // stable per day, varied across days
useEffect(() => {
  if (!ref.current?.open) ref.current?.showModal();
}, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="pace-title"
      className="m-auto w-[min(92vw,26rem)] rounded-3xl border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/40"
    >
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <div className="text-5xl" aria-hidden>{tip.emoji}</div>

        <h2 id="pace-title" className="text-xl font-extrabold tracking-[-0.03em]">
          {t(`tips.${tip.id}.title`)}
        </h2>

        <p className="text-sm font-semibold leading-relaxed text-(--muted)">
          {t(`tips.${tip.id}.body`, tip.values ?? {})}
        </p>

        <p className="rounded-xl bg-(--saffron)/20 px-3 py-2 text-xs font-bold sm:text-sm">
          {t("recommendation", { lessons: 1, day, when })}
        </p>

        <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
          <button
            onClick={() => ref.current?.close()}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_0_#9a1c1c] transition active:translate-y-0.5 active:shadow-[0_2px_0_0_#9a1c1c]"
          >
            {t("okay", { when })}
          </button>
          <button
            onClick={onContinue}
            className="w-full rounded-xl border border-border px-5 py-3 text-sm font-extrabold transition hover:bg-black/5"
          >
            {t("startAnyway")}
          </button>
        </div>
      </div>
    </dialog>
  );
}