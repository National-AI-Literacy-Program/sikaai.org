import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import rawCourse from "@/data/course.json";
import rawCourseNe from "@/data/course.ne.json";

export type Choice = { label: string; correct: boolean };
export type QuestionProfile = {
  level: "Knowledge" | "Skill" | "Attitude";
  type: "Recall" | "Application" | "Critical analysis" | "Reflection";
  demand: "Foundational" | "Higher ability";
  code: "K" | "S" | "A";
};
export type Lesson = {
  day: number;
  hook: string;
  concept: string;
  ksa?: { knowledge?: string[]; skills?: string[]; attitude?: string[] };
  action?: {
    title: string;
    options: Choice[];
    feedback?: { correct: string; incorrect: string };
  };
  quiz?: {
    title: string;
    options: Choice[];
    feedback?: { correct: string; incorrect: string };
  };
  reward?: { message: string };
};

/* ---------- Nepali text laid over the English lessons ---------- */

type Block = NonNullable<Lesson["action"]>;
type BlockText = {
  title?: string;
  options?: { label?: string }[];
  feedback?: { correct?: string; incorrect?: string };
};
type LessonText = {
  day: number;
  hook?: string;
  concept?: string;
  ksa?: { knowledge?: string[]; skills?: string[]; attitude?: string[] };
  action?: BlockText;
  quiz?: BlockText;
  reward?: { message?: string };
};

const neLessons = rawCourseNe as unknown as LessonText[];

// Text comes from ne; structure, order and the `correct` flags always come from en.
function mergeBlock(base: Block | undefined, over?: BlockText): Block | undefined {
  if (!base || !over) return base;
  return {
    ...base,
    title: over.title ?? base.title,
    options: base.options.map((o, i) => ({
      ...o,
      label: over.options?.[i]?.label ?? o.label,
    })),
    feedback: base.feedback && {
      correct: over.feedback?.correct ?? base.feedback.correct,
      incorrect: over.feedback?.incorrect ?? base.feedback.incorrect,
    },
  };
}

function localise(base: Lesson, over?: LessonText): Lesson {
  if (!over) return base;
  return {
    ...base,
    hook: over.hook ?? base.hook,
    concept: over.concept ?? base.concept,
    ksa: base.ksa && {
      knowledge: over.ksa?.knowledge ?? base.ksa.knowledge,
      skills: over.ksa?.skills ?? base.ksa.skills,
      attitude: over.ksa?.attitude ?? base.ksa.attitude,
    },
    action: mergeBlock(base.action, over.action),
    quiz: mergeBlock(base.quiz, over.quiz),
    reward: base.reward && {
      ...base.reward,
      message: over.reward?.message ?? base.reward.message,
    },
  };
}

export function getLessons(locale: string = "en"): Lesson[] {
  const sorted = (rawCourse as Lesson[]).slice().sort((a, b) => a.day - b.day);
  if (locale !== "ne") return sorted;
  return sorted.map((l) => localise(l, neLessons.find((n) => n.day === l.day)));
}

export function getLesson(day: number, locale: string = "en") {
  return getLessons(locale).find((lesson) => lesson.day === day);
}

export function getLessonStatus(day: number, completed: number[]) {
  if (completed.includes(day)) return "completed" as const;
  const lessons = getLessons();
  const currentDay = lessons.find(
    (lesson) => !completed.includes(lesson.day),
  )?.day;
  return day === currentDay ? ("current" as const) : ("locked" as const);
}

export function getCourseTotal() {
  return getLessons().length;
}

// Pass a translated label, e.g. (day) => t("day", { day }). Defaults to English.
export function getCourseTitle(
  lesson: Lesson,
  dayLabel: (day: number) => string = (day) => `Day ${day}`,
) {
  return dayLabel(lesson.day);
}

export function getQuestionProfile(
  day: number,
  kind: "action" | "quiz",
): QuestionProfile {
  const index = Math.max(0, day - 1);
  if (kind === "action")
    return {
      level: "Skill",
      type: "Application",
      demand: index % 3 === 0 ? "Higher ability" : "Foundational",
      code: "S",
    };
  if (index % 4 === 3)
    return {
      level: "Attitude",
      type: "Reflection",
      demand: "Higher ability",
      code: "A",
    };
  if (index % 3 === 2)
    return {
      level: "Skill",
      type: "Critical analysis",
      demand: "Higher ability",
      code: "S",
    };
  return {
    level: "Knowledge",
    type: index % 2 === 0 ? "Recall" : "Application",
    demand: index % 2 === 0 ? "Foundational" : "Higher ability",
    code: "K",
  };
}

export const courseSource = "data/course.json";