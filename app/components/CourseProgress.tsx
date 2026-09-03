"use client";

import { useEffect, useState } from "react";

const KEY = "sikai-course-progress";

export function useCourseProgress() {
  const [completed, setCompleted] = useState<number[]>([]);
  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved) setCompleted(JSON.parse(saved));
  }, []);
  const complete = (day: number) => {
    setCompleted((current) => {
      const next = [...new Set([...current, day])].sort((a, b) => a - b);
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };
  return { completed, complete };
}

export function CourseProgress({
  completed,
  total,
}: {
  completed: number[];
  total: number;
}) {
  const percent = total ? Math.round((completed.length / total) * 100) : 0;
  return (
    <div
      className="course-progress"
      aria-label={`${completed.length} of ${total} lessons complete`}
    >
      <div>
        <span>COURSE PROGRESS</span>
        <strong>
          {completed.length} of {total} lessons
        </strong>
      </div>
      <div className="progress wide">
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
