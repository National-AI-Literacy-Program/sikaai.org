import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import rawCourse from "@/data/course.json";

export type Choice = { label: string; correct: boolean };
export type Lesson = {
  day: number;
  hook: string;
  concept: string;
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

export const courseSource = "data/course.json";
