"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import {
  getCourseTitle,
  getLesson,
  getLessons,
  getLessonStatus,
  getQuestionProfile,
  type QuestionProfile,
} from "@/lib/course";
import { useCourseProgress } from "@/app/components/CourseProgress";
import CourseSidebar from "@/app/components/CourseSidebar";
import ThemeToggle from "@/app/components/ThemeToggle";

type Option = { label: string; correct: boolean };

export default function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day: rawDay } = use(params);
  const day = Number(rawDay);
  const lesson = getLesson(day);
  const lessons = getLessons();
  const { completed, complete } = useCourseProgress();
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [actionAnswer, setActionAnswer] = useState<number | null>(null);

  if (!lesson)
    return (
      <main className="lesson-page">
        <nav className="site-nav shell">
          <Link className="brand" href="/">
            Sikaai<span>AI</span>
          </Link>
          <Link className="back-link" href="/course">
            ← Back to course
          </Link>
        </nav>
        <div className="locked-lesson">
          <p className="eyebrow">NOT AVAILABLE YET</p>
          <h1>This lesson is not ready.</h1>
          <p>
            Return to the course overview to continue with the lessons currently
            available.
          </p>
          <Link className="button button-primary" href="/course">
            Back to course →
          </Link>
        </div>
      </main>
    );

  const index = lessons.findIndex((item) => item.day === day);
  const status = getLessonStatus(day, completed);
  const locked = status === "locked";
  if (locked)
    return (
      <main className="lesson-page">
        <nav className="site-nav shell">
          <Link className="brand" href="/">
            Sikaai<span>AI</span>
          </Link>
          <Link className="back-link" href="/course">
            ← Back to course
          </Link>
        </nav>
        <div className="locked-lesson">
          <p className="eyebrow">NEXT STEP LOCKED</p>
          <h1>Finish Day {Math.max(1, day - 1)} first.</h1>
          <p>
            Complete the previous lesson to unlock this one. Small steps make
            the course stick.
          </p>
          <Link
            className="button button-primary"
            href={`/course/${Math.max(1, day - 1)}`}
          >
            Go to previous lesson →
          </Link>
        </div>
      </main>
    );

  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const sections = [
    "The big idea",
    ...(lesson.action ? ["Try it"] : []),
    ...(lesson.quiz ? ["Quick check"] : []),
    "Finish",
  ];
  const finalStep = sections.length - 1;
  const quizCorrect = lesson.quiz
    ? answer !== null && lesson.quiz.options[answer]?.correct
    : false;
  const actionCorrect = lesson.action
    ? actionAnswer !== null && lesson.action.options[actionAnswer]?.correct
    : false;
  const hasCorrectAnswer = quizCorrect || actionCorrect;

  return (
    <main className="lesson-page">
      <nav className="site-nav shell">
        <Link className="brand" href="/">
          Sikaai<span>AI</span>
        </Link>
        <div className="lesson-nav-actions">
          <Link className="back-link" href="/course">
            ← Course overview
          </Link>
          <ThemeToggle />
        </div>
      </nav>
      <div className="lesson-layout">
        <CourseSidebar
          lessons={lessons}
          currentDay={day}
          completed={completed}
          activeSection={step}
          onSectionChange={(section) => {
            setAnswer(null);
            setActionAnswer(null);
            setStep(section);
          }}
        />
        <article className="lesson-shell">
          <div className="lesson-meta">
            <span>
              LESSON {String(index + 1).padStart(2, "0")} / {lessons.length}
            </span>
            <span>{sections[step].toUpperCase()}</span>
          </div>
          <div className="lesson-reader">
            <header className="lesson-heading">
              <div className="lesson-heading-row">
                <p className="eyebrow">AI FOUNDATIONS · DAY {day}</p>
                {lesson.ksa && (
                  <div
                    className="lesson-ksa"
                    aria-label="Knowledge, skills, and attitude focus"
                  >
                    <span className="ksa-label">KSA</span>
                    {lesson.ksa.knowledge?.map((item) => (
                      <span
                        className="ksa-chip ksa-knowledge"
                        key={`k-${item}`}
                      >
                        K: {item}
                      </span>
                    ))}
                    {lesson.ksa.skills?.map((item) => (
                      <span className="ksa-chip ksa-skills" key={`s-${item}`}>
                        S: {item}
                      </span>
                    ))}
                    {lesson.ksa.attitude?.map((item) => (
                      <span className="ksa-chip ksa-attitude" key={`a-${item}`}>
                        A: {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h1>{getCourseTitle(lesson)}</h1>
              <p className="lesson-hook">{lesson.hook}</p>
            </header>
            <div
              className={`lesson-card-art ${hasCorrectAnswer ? "lesson-card-art-success" : ""}`}
            >
              <Image
                src={
                  hasCorrectAnswer
                    ? "/lesson-art/happy_boy.svg"
                    : "/lesson-art/thinking_boy.svg"
                }
                alt={
                  hasCorrectAnswer
                    ? "Namaste illustration celebrating a correct answer"
                    : "A student thinking through the lesson"
                }
                width={150}
                height={150}
              />
            </div>
            {step === 0 && (
              <section className="reader-section">
                <p className="eyebrow">THE BIG IDEA</p>
                <p className="reader-copy">{lesson.concept}</p>
              </section>
            )}
            {step === 1 && lesson.action && (
              <Question
                title={lesson.action.title}
                options={lesson.action.options}
                answer={actionAnswer}
                setAnswer={setActionAnswer}
                feedback={lesson.action.feedback}
                profile={getQuestionProfile(day, "action")}
                label="TRY IT"
              />
            )}
            {step === (lesson.action ? 2 : 1) && lesson.quiz && (
              <Question
                title={lesson.quiz.title}
                options={lesson.quiz.options}
                answer={answer}
                setAnswer={setAnswer}
                feedback={lesson.quiz.feedback}
                profile={getQuestionProfile(day, "quiz")}
                label="QUICK CHECK"
              />
            )}
            {step === finalStep && (
              <section className="reader-section finish-section">
                <p className="eyebrow">
                  {quizCorrect || completed.includes(day)
                    ? "YOU DID IT"
                    : "FINISH"}
                </p>
                <p className="reader-copy">
                  {lesson.reward?.message ||
                    "You have reached the end of this lesson."}
                </p>
              </section>
            )}
            <div className="reader-actions">
              {step > 0 && (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setStep((value) => value - 1)}
                >
                  ← Previous
                </button>
              )}
              {step < finalStep ? (
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => {
                    setAnswer(null);
                    setActionAnswer(null);
                    setStep((value) => value + 1);
                  }}
                >
                  Next topic <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => complete(day)}
                >
                  {completed.includes(day)
                    ? "Progress saved"
                    : "Complete lesson"}{" "}
                  <span aria-hidden="true">✓</span>
                </button>
              )}
            </div>
          </div>
          <nav className="lesson-navigation" aria-label="Lesson navigation">
            {next ? (
              <Link href={`/course/${next.day}`}>Next lesson →</Link>
            ) : (
              <Link href="/course">Back to course →</Link>
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}

function Question({
  title,
  options,
  answer,
  setAnswer,
  feedback,
  profile,
  label,
}: {
  title: string;
  options: Option[];
  answer: number | null;
  setAnswer: (value: number) => void;
  feedback?: { correct?: string; incorrect?: string };
  profile: QuestionProfile;
  label: string;
}) {
  const correct = answer !== null && options[answer]?.correct;
  return (
    <section className="reader-section question-panel">
      <div className="question-topline">
        <p className="eyebrow">{label}</p>
        <div
          className="question-profile"
          aria-label={`Question profile: ${profile.level}, ${profile.type}, ${profile.demand}`}
        >
          <span className={`profile-code profile-${profile.code}`}>
            {profile.code}
          </span>
          <span>{profile.level}</span>
          <span>{profile.type}</span>
          <span>{profile.demand === "Higher ability" ? "HA" : "F"}</span>
        </div>
      </div>
      <h2>{title}</h2>
      <div className="choices">
        {options.map((option, index) => (
          <button
            type="button"
            className={`choice ${answer === index ? (option.correct ? "choice-correct" : "choice-wrong") : ""}`}
            key={option.label}
            onClick={() => setAnswer(index)}
            aria-pressed={answer === index}
          >
            {option.label}
            <span aria-hidden="true">
              {answer === index ? (option.correct ? "✓" : "×") : "→"}
            </span>
          </button>
        ))}
      </div>
      {answer !== null && (
        <p className={`feedback ${correct ? "feedback-good" : ""}`}>
          {correct ? feedback?.correct : feedback?.incorrect}
        </p>
      )}
    </section>
  );
}
