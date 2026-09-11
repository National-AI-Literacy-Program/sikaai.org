import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import rawCourse from "@/data/course.json";

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

export function getLessons(): Lesson[] {
  return (rawCourse as Lesson[]).slice().sort((a, b) => a.day - b.day);
}

export function getLesson(day: number) {
  return getLessons().find((lesson) => lesson.day === day);
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

export function getCourseTitle(lesson: Lesson) {
  return `Day ${lesson.day}`;
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
