import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Typewriter from "./Typewriter";
export default function LandingPage() {
  return (
    <main className="landing-page">
      <Header />

      {/* Hero shell, main part  */}
      <section className="hero shell flex flex-col" id="about">

            <Image
              className="h-auto"
              src="/lesson-art/namaste.svg"
              alt="Namaste illustration welcoming learners"
              width={130}
              height={300}
            />

        <div className="hero-copy items-center">

          <h1 className=  "justify-center flex flex-row items-center gap-2">
            <span >
              {" "}
              <Typewriter
                strings={["Engage with", "Create with", "Manage", "Shape"]}
                typeSpeed={70}
                deleteSpeed={35}
                pauseDuration={2000}
              />
            </span>{" "}
            AI
          </h1>

          <p className="hero-text text-center">
            SikaiAI is a four-week AI literacy program that helps you identify
            AI, understand how it is used, and make more informed choices
            online.
          </p>
          <div className="hero-actions justify-center">
            <Link href="/course" className="button button-primary">
              Start the course <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </section>

       {/* Details  */}
       <section className="flex justify-center gap-5">
          <div>
            <span>28</span>
            <p>Lessons</p>
          </div>

          <div>
            <span>30</span>
            <p>Days</p>
          </div>

          <div>
            <span>30+</span>
            <p>MCQs</p>
          </div>
       </section>



      {/* Course Structure  */}
      <section className="section course-structure shell" id="course-structure">


        <div className="seciton-heading justify-center flex flex-col gap-2 items-center text-center mb-3">
          <h2 className="sh-h2">Course Structure</h2>
          <p>
            Each week combines short lessons, everyday examples, and
            multiple-choice questions (MCQs) to help you remember what you
            learn.
          </p>
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Learn",
              description: "Simple explanations introduce each idea.",
            },
            {
              step: "02",
              title: "Practise",
              description: "Apply the idea to familiar situations.",
            },
            {
              step: "03",
              title: "Take an MCQ",
              description: "Answer a short quiz to check your understanding.",
            },
            {
              step: "04",
              title: "Reflect",
              description: "Take one useful habit into everyday life.",
            },
          ].map(({ step, title, description }) => (
            <article
              key={step}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="text-sm font-semibold text-slate-500">{step}</span>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
        
      </section>



      <section id="approach" className="section approach shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FOUR-WEEK JOURNEY</p>
            <h2>
              Build confidence
              <br />
              <span>one module at a time.</span>
            </h2>
          </div>
          <p>
            Move from recognising AI to making thoughtful, responsible choices.
          </p>
        </div>
        <div className="rhythm-grid">
          <article className="rhythm-card rhythm-main">
            <span className="step-number">01</span>
            <div>
              <h3>Engage with AI</h3>
              <p>
                Recognise AI in the apps, search tools, and platforms you
                already use.
              </p>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">02</span>
            <div>
              <h3>Create with AI</h3>
              <p>
                Learn how AI-generated content is created and why it can be
                misleading or biased.
              </p>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">03</span>
            <div>
              <h3>Manage AI</h3>
              <p>
                Understand how AI affects privacy, work, and the choices we make
                online.
              </p>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">04</span>
            <div>
              <h3>Wrapping Up</h3>
              <p>
                Review what you have learned and build habits for safer, smarter
                AI use.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section why-section shell" id="why">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHY ARE WE DOING THIS?</p>
            <h2>
              AI is already
              <br />
              <span>part of everyday life.</span>
            </h2>
          </div>
          <p>
            SikaAI helps learners ask better questions, protect their
            information, and make confident choices as AI becomes more common.
          </p>
        </div>
      </section>
      <section className="section references-section shell" id="references">
        <div className="section-heading">
          <div>
            <p className="eyebrow">REFERENCES</p>
            <h2>
              Learn from
              <br />
              <span>trusted guidance.</span>
            </h2>
          </div>
          <p>
            The course draws on established guidance about AI, digital literacy,
            online safety, and responsible technology use.
          </p>
        </div>
        <div className="rhythm-grid references-grid">
          <article className="rhythm-card rhythm-main">
            <span className="step-number">01</span>
            <div>
              <h3>UNESCO</h3>
              <p>Guidance for generative AI in education and research.</p>
              <a
                href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"
                target="_blank"
                rel="noreferrer"
              >
                View reference →
              </a>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">02</span>
            <div>
              <h3>UNICEF</h3>
              <p>Policy guidance on AI for children and their rights.</p>
              <a
                href="https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children"
                target="_blank"
                rel="noreferrer"
              >
                View reference →
              </a>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">03</span>
            <div>
              <h3>OECD</h3>
              <p>Principles for trustworthy and human-centred AI.</p>
              <a
                href="https://oecd.ai/en/ai-principles"
                target="_blank"
                rel="noreferrer"
              >
                View reference →
              </a>
            </div>
          </article>
          <article className="rhythm-card">
            <span className="step-number">04</span>
            <div>
              <h3>UNESCO</h3>
              <p>
                Media and information literacy resources for navigating digital
                life.
              </p>
              <a
                href="https://www.unesco.org/en/media-information-literacy"
                target="_blank"
                rel="noreferrer"
              >
                View reference →
              </a>
            </div>
          </article>
        </div>
      </section>
      <footer className="site-footer landing-footer shell">
        <p>© 2026 SikaAI</p>
        <p>
          <a href="#references">References</a> · Learn AI. One small lesson at a
          time.
        </p>
      </footer>
    </main>
  );
}
