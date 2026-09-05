"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCourseTitle, getLessonStatus, getLessons } from "@/lib/course";
import { useCourseProgress } from "@/app/components/CourseProgress";

const WEEK_COUNT = 4;
const TOPICS_PER_WEEK = 7;

export default function CoursePage() {
  const lessons = getLessons();
  const { completed } = useCourseProgress();
  const total = WEEK_COUNT * TOPICS_PER_WEEK;
  const roadmapLessons = Array.from(
    { length: total },
    (_, index) =>
      lessons[index] ?? {
        day: index + 1,
        hook: "This topic will unlock as you move through the course.",
        concept: "Upcoming topic",
      },
  );
  const nextDay =
    roadmapLessons.find((lesson) => !completed.includes(lesson.day))?.day ??
    total;
  const currentWeek = Math.min(
    WEEK_COUNT,
    Math.max(1, Math.ceil(nextDay / TOPICS_PER_WEEK)),
  );
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const weeks = useMemo(
    () =>
      Array.from({ length: WEEK_COUNT }, (_, index) => {
        const week = index + 1;
        const weekLessons = roadmapLessons.slice(
          index * TOPICS_PER_WEEK,
          (index + 1) * TOPICS_PER_WEEK,
        );
        const done = weekLessons.filter((lesson) =>
          completed.includes(lesson.day),
        ).length;
        return {
          week,
          lessons: weekLessons,
          done,
          complete: done === weekLessons.length && weekLessons.length > 0,
          locked: week > currentWeek,
        };
      }),
    [lessons, completed, currentWeek],
  );
  const selected = weeks[selectedWeek - 1] ?? weeks[0];
  const overallProgress = total
    ? Math.round((completed.length / total) * 100)
    : 0;
  const railProgress = (
    (Math.max(0, Math.min(completed.length, total)) / total) *
    100
  ).toFixed(2);

  return (
    <main className="course-page">
      <nav className="site-nav shell">
        <Link className="brand" href="/">
          Sikaai<span>AI</span>
        </Link>
        <Link className="back-link" href="/">
          ← Back home
        </Link>
      </nav>
      <div className="course-dashboard shell">
        <header className="course-dashboard-hero">
          <div>
            <p className="eyebrow">YOUR 4-WEEK LEARNING PATH</p>
            <h1>
              28 topics.
              <br />
              <span>4 focused weeks.</span>
            </h1>
          </div>
          <div className="course-progress-orb">
            <strong>{overallProgress}%</strong>
            <span>
              {completed.length} of {total}
              <br />
              topics complete
            </span>
          </div>
        </header>
        <section className="week-roadmap" aria-label="Course weeks">
          <div className="week-roadmap-track">
            <span style={{ width: `${railProgress}%` }} />
          </div>
          <div className="week-nodes">
            {weeks.map((item) => (
              <button
                type="button"
                className={`week-node ${selectedWeek === item.week ? "is-selected" : ""} ${item.complete ? "is-complete" : ""} ${item.locked ? "is-locked" : ""}`}
                onClick={() => !item.locked && setSelectedWeek(item.week)}
                aria-current={selectedWeek === item.week ? "step" : undefined}
                disabled={item.locked}
                key={item.week}
              >
                <span className="week-circle">
                  {item.complete ? "✓" : item.week}
                </span>
                <span className="week-node-copy">
                  <b>Week {item.week}</b>
                  <small>
                    {item.complete
                      ? "Complete"
                      : item.locked
                        ? "Locked"
                        : `${item.done}/7 topics`}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="taxonomy-guide" aria-labelledby="taxonomy-title">
          <div>
            <p className="eyebrow">QUESTION DESIGN</p>
            <h2 id="taxonomy-title">What each question builds.</h2>
          </div>
          <div className="taxonomy-legend">
            <div>
              <b>K</b>
              <span>
                <strong>Knowledge</strong> Recall and understand.
              </span>
            </div>
            <div>
              <b>S</b>
              <span>
                <strong>Skills</strong> Apply and analyse.
              </span>
            </div>
            <div>
              <b>A</b>
              <span>
                <strong>Attitude</strong> Reflect and respond.
              </span>
            </div>
          </div>
        </section>
        <section className="week-panel">
          <div className="week-panel-heading">
            <div>
              <p className="eyebrow">
                WEEK {selected.week} ·{" "}
                {selected.complete
                  ? "COMPLETE"
                  : selected.locked
                    ? "LOCKED"
                    : "YOUR CURRENT FOCUS"}
              </p>
              <h2>
                {selected.week === 1
                  ? "Start with the foundations."
                  : selected.week === 2
                    ? "Make AI useful day to day."
                    : selected.week === 3
                      ? "Create with more confidence."
                      : "Put it all into practice."}
              </h2>
            </div>
            <div className="week-score">
              <strong>{selected.done}</strong>
              <span>
                / 7<br />
                done
              </span>
            </div>
          </div>
          <div className="week-progress">
            <span style={{ width: `${(selected.done / 7) * 100}%` }} />
          </div>
          <div className="week-topic-list">
            {selected.lessons.map((lesson) => {
              const status = getLessonStatus(lesson.day, completed);
              const locked = status === "locked";
              const done = status === "completed";
              return locked ? (
                <div className="week-topic week-topic-locked" key={lesson.day}>
                  <span className="topic-number">
                    {String(lesson.day).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow">LOCKED</p>
                    <h3>{getCourseTitle(lesson)}</h3>
                    <p>Complete the previous topic to unlock this lesson.</p>
                  </div>
                  <span className="topic-status">Locked</span>
                </div>
              ) : (
                <Link
                  className={`week-topic ${done ? "week-topic-done" : status === "current" ? "week-topic-current" : ""}`}
                  href={`/course/${lesson.day}`}
                  key={lesson.day}
                >
                  <span className="topic-number">
                    {done ? "✓" : String(lesson.day).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow">
                      {done
                        ? "COMPLETED"
                        : status === "current"
                          ? "CONTINUE · 2.5 MIN"
                          : "UP NEXT"}
                    </p>
                    <h3>{getCourseTitle(lesson)}</h3>
                    <p>{lesson.hook}</p>
                  </div>
                  <span className="topic-status">
                    {done ? "Done" : "Open →"}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
