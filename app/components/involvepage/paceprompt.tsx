"use client";

import { useEffect, useRef } from "react";

const TIPS = [
  {
    emoji: "🌱",
    title: "Seeds need a night's sleep",
    body: "You plant a seed and water it today. Digging it up tomorrow to check won't make it grow faster. Your brain is the same: it grows what you learned while you sleep.",
  },
  {
    emoji: "🥟",
    title: "Don't eat all the momos at once!",
    body: "You could eat 30 momos in one go, but you'd get a tummy ache and forget how good they were. 3 momos a day is much happier. Lessons work the same way.",
  },
  {
    emoji: "🏏",
    title: "Champions practise a little every day",
    body: "A cricket player who practises 30 minutes every day gets better than one who plays 7 hours on Saturday only. Small and daily beats big and rare.",
  },
  {
    emoji: "🎒",
    title: "Your brain is a backpack",
    body: "Sleep is when your brain packs today's lessons neatly into the backpack. If you keep stuffing things in, they get messy and fall out.",
  },
  {
    emoji: "🎸",
    title: "Like learning a song",
    body: "Play a new song 20 times in one night and your fingers forget it by morning. Play it a little each day and soon you know it by heart.",
  },
];

type Props = {
  day: number;
  when: string; // e.g. "tomorrow" or "in 5h"
  onClose: () => void;
  onContinue: () => void;
};

export default function PacePrompt({ day, when, onClose, onContinue }: Props) {
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
          {tip.title}
        </h2>

        <p className="text-sm font-semibold leading-relaxed text-(--muted)">
          {tip.body}
        </p>

        <p className="rounded-xl bg-(--saffron)/20 px-3 py-2 text-xs font-bold sm:text-sm">
          We recommend 1 lesson a day. Day {day} will be best {when}.
        </p>

        <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
          <button
            onClick={() => ref.current?.close()}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_0_#9a1c1c] transition active:translate-y-0.5 active:shadow-[0_2px_0_0_#9a1c1c]"
          >
            Okay, see you {when}!
          </button>
          <button
            onClick={onContinue}
            className="w-full rounded-xl border border-border px-5 py-3 text-sm font-extrabold transition hover:bg-black/5"
          >
            Start anyway
          </button>
        </div>
      </div>
    </dialog>
  );
}