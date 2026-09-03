"use client";

import Link from "next/link";
import { getCourseTitle, getLessonStatus, type Lesson } from "@/lib/course";

export default function CourseSidebar({
  lessons,
  currentDay,
  completed,
  activeSection = 0,
  onSectionChange,
}: {
  lessons: Lesson[];
  currentDay: number;
  completed: number[];
  activeSection?: number;
  onSectionChange?: (section: number) => void;
}) {
  const lesson = lessons.find((item) => item.day === currentDay);
  const sections = [
    "The big idea",
    ...(lesson?.action ? ["Try it"] : []),
    ...(lesson?.quiz ? ["Quick check"] : []),
    "Finish",
  ];
  const currentIndex = lessons.findIndex((item) => item.day === currentDay);
  const progress = completed.length / Math.max(lessons.length, 1);
  const progressPct = Math.round(progress * 100);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  const upNext = lessons.filter((item) => item.day > currentDay).slice(0, 3);

  return (
    <aside className="course-sidebar" aria-label="Course navigation">
      <div className="sidebar-heading">
        <p className="eyebrow">Your path</p>
        <strong>
          {completed.length}/{lessons.length}
        </strong>
      </div>

      <div className="sidebar-progress">
        <svg
          className="sidebar-progress-ring"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          role="img"
          aria-label={`${progressPct}% of the course complete`}
        >
          <circle
            className="sidebar-progress-track"
            cx="26"
            cy="26"
            r={radius}
          />
          <circle
            className="sidebar-progress-fill"
            cx="26"
            cy="26"
            r={radius}
            strokeDasharray={`${dash} ${circumference}`}
          />
          <text
            x="26"
            y="31"
            textAnchor="middle"
            className="sidebar-progress-label"
          >
            {progressPct}%
          </text>
        </svg>
        <div className="sidebar-progress-copy">
          <strong>Small steps, real confidence.</strong>
        </div>
      </div>

      <div className="sidebar-current">
        <small>Day {currentDay}</small>
        <b>{getCourseTitle(lesson!)}</b>
        <small>
          Lesson {currentIndex + 1} of {lessons.length}
        </small>
      </div>

      <nav className="sidebar-sections" aria-label="Lesson sections">
        {sections.map((section, index) => (
          <button
            className={index === activeSection ? "is-active" : ""}
            type="button"
            onClick={() => onSectionChange?.(index)}
            key={section}
          >
            <span>
              {index === activeSection
                ? "●"
                : index < activeSection
                  ? "✓"
                  : "○"}
            </span>
            {section}
          </button>
        ))}
      </nav>

      <div className="sidebar-more">
        <p className="eyebrow">Up next</p>
        {upNext.map((item) => {
          const locked = getLessonStatus(item.day, completed) === "locked";
          return locked ? (
            <div className="sidebar-locked" key={item.day}>
              <span>
                Day {item.day} · {getCourseTitle(item)}
              </span>
              <em>Locked</em>
            </div>
          ) : (
            <Link
              className="sidebar-locked sidebar-locked-open"
              href={`/course/${item.day}`}
              key={item.day}
            >
              <span>
                Day {item.day} · {getCourseTitle(item)}
              </span>
              <em>Open →</em>
            </Link>
          );
        })}
        {upNext.length === 0 && (
          <div className="sidebar-locked">
            <span>That&apos;s the last lesson — nice work.</span>
          </div>
        )}
      </div>
    </aside>
  );
}
