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
            aria-label="Go to previous lesson"
          >
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </main>
    );

  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const sections = [
    "Question",
    "Explanation",
    ...(lesson.action ? ["Practice"] : []),
    ...(lesson.quiz ? ["Quiz"] : []),
    "Complete",
  ];
  const finalStep = sections.length - 1;
  const quizStep = 2 + (lesson.action ? 1 : 0);
  const quizCorrect = lesson.quiz
    ? answer !== null && lesson.quiz.options[answer]?.correct
    : false;
  const actionCorrect = lesson.action
    ? actionAnswer !== null && lesson.action.options[actionAnswer]?.correct
    : false;
  const questionStep = lesson.action ? 2 : quizStep;
  const isQuestionStep =
    (Boolean(lesson.action) && step === questionStep) ||
    (Boolean(lesson.quiz) && step === quizStep);
  const currentQuestionCorrect =
    Boolean(lesson.action) && step === questionStep
      ? actionCorrect
      : Boolean(lesson.quiz) && step === quizStep
        ? quizCorrect
        : true;
  const hasCorrectAnswer = quizCorrect || actionCorrect;

  return (
    <main className="lesson-page">
      <nav className="site-nav shell">
        <Link className="brand" href="/">
          Sikaai<span>AI</span>
        </Link>
        <div className="lesson-nav-actions">
          <Link
            className="back-link lesson-back-arrow"
            href="/course"
            aria-label="Back to course overview"
          >
            <span aria-hidden="true">←</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
      <div className="lesson-layout lesson-layout-clean">
        <article className="lesson-shell">
          <div className="lesson-meta">
            <span>
              LESSON {String(index + 1).padStart(2, "0")} / {lessons.length}
            </span>
          </div>
          <div className="lesson-reader">
            <header className="lesson-heading">
              <div className="lesson-heading-row">
                {lesson.ksa && (
                  <div
                    className="lesson-ksa"
                    aria-label="Knowledge, skills, and attitude focus"
                  >
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
              <h1 className="sr-only">Lesson {day}</h1>
            </header>
            <div
              className={`lesson-card-art ${hasCorrectAnswer ? "lesson-card-art-success" : ""}`}
            >
              <Image
                src={
                  hasCorrectAnswer
                    ? "/lesson-art/happy_boy.png"
                    : "/lesson-art/thinking_boy.png"
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
              <section className="reader-section lesson-hook-screen">
                <p className="reader-copy">{lesson.hook}</p>
              </section>
            )}
            {step === 1 && (
              <section className="reader-section">
                <p className="reader-copy">{lesson.concept}</p>
              </section>
            )}
            {step === 2 && lesson.action && (
              <Question
                title={lesson.action.title}
                options={lesson.action.options}
                answer={actionAnswer}
                setAnswer={setActionAnswer}
                feedback={lesson.action.feedback}
                profile={getQuestionProfile(day, "action")}
              />
            )}
            {step === quizStep && lesson.quiz && (
              <Question
                title={lesson.quiz.title}
                options={lesson.quiz.options}
                answer={answer}
                setAnswer={setAnswer}
                feedback={lesson.quiz.feedback}
                profile={getQuestionProfile(day, "quiz")}
              />
            )}
            {step === finalStep && (
              <section
                className={`reader-section finish-section ${completed.includes(day) ? "finish-section-success" : ""}`}
              >
                {completed.includes(day) ? (
                  <>
                    <p className="eyebrow">COMPLETED</p>
                    <h2>Congratulations.</h2>
                    <p className="reader-copy">
                      You&apos;ve successfully completed Day {day}.
                    </p>
                    {next && (
                      <Link
                        className="button button-primary finish-next-link"
                        href={`/course/${next.day}`}
                      >
                        Continue to Day {next.day}{" "}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </>
                ) : (
                  <p className="reader-copy">
                    {lesson.reward?.message ||
                      "Complete this lesson to save your progress."}
                  </p>
                )}
              </section>
            )}
            <div className="reader-actions">
              {step > 0 && (
                <button
                  className="button button-secondary arrow-control arrow-back"
                  type="button"
                  onClick={() => setStep((value) => value - 1)}
                >
                  <span aria-hidden="true">←</span>
                  <span className="sr-only">Previous</span>
                </button>
              )}
              {step < finalStep ? (
                <div className="next-topic-slot">
                  <button
                    className={`button button-primary arrow-control arrow-next ${isQuestionStep && currentQuestionCorrect ? "button-ready" : ""}`}
                    type="button"
                    disabled={isQuestionStep && !currentQuestionCorrect}
                    onClick={() => {
                      if (isQuestionStep && !currentQuestionCorrect) return;
                      setAnswer(null);
                      setActionAnswer(null);
                      setStep((value) => value + 1);
                    }}
                  >
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">
                      {day === 1 ? "Next" : "Next topic"}
                    </span>
                  </button>
                  <p
                    className={`quiz-lock-hint ${isQuestionStep && !currentQuestionCorrect ? "is-visible" : ""}`}
                    role="status"
                  >
                    {isQuestionStep && !currentQuestionCorrect
                      ? "Choose the correct answer to continue."
                      : ""}
                  </p>
                </div>
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
}: {
  title: string;
  options: Option[];
  answer: number | null;
  setAnswer: (value: number) => void;
  feedback?: { correct?: string; incorrect?: string };
  profile: QuestionProfile;
}) {
  const correct = answer !== null && options[answer]?.correct;
  return (
    <section className="reader-section question-panel">
      <div className="question-topline question-topline-right">
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
