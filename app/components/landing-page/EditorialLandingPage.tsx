import styles from "./EditorialLandingPage.module.css";

const stats = [
  { value: "4 Weeks", label: "Practical learning" },
  { value: "28 Lessons", label: "Build real confidence" },
  { value: "Interactive", label: "Hands-on format" },
];

const curriculum = [
  {
    title: "AI foundations",
    detail: "Understand what AI is, how it learns from patterns, and why it can still make mistakes.",
  },
  {
    title: "Daily-life impact",
    detail: "See how AI shapes search, recommendations, translation, and the tools people use every day.",
  },
  {
    title: "Responsible use",
    detail: "Build critical thinking around privacy, fairness, trust, and safer decision-making.",
  },
  {
    title: "Creative AI",
    detail: "Explore writing, images, and media generation while learning how to question outputs carefully.",
  },
  {
    title: "Digital citizenship",
    detail: "Learn how to protect data, verify information, and use AI as a helpful support—not a replacement.",
  },
  {
    title: "Next steps",
    detail: "Leave with practical habits, confidence, and a stronger sense of how to participate responsibly.",
  },
];

const activities = [
  {
    title: "Take a look",
    text: "Explore how AI already appears in everyday systems, from apps and search tools to translations and recommendations.",
  },
  {
    title: "Learn it",
    text: "Move from curiosity to understanding through short lessons, examples, and practical explanations designed for beginners.",
  },
  {
    title: "Test it",
    text: "Check understanding with activities, reflection prompts, and quick challenges that show what you have learned.",
  },
  {
    title: "Get certified",
    text: "Complete the programme and leave with a recognised milestone in AI literacy and responsible digital use.",
  },
];

const teamMembers = [
  {
    name: "Komalhari Shrestha",
    role: "Educational designer",
    icon: "AK",
    bio: "Creates accessible learning experiences that make complex ideas feel clear and human.",
  },
  {
    name: "Mandeep Bhandari",
    role: "AI educator",
    icon: "BS",
    bio: "Turns technical concepts into practical lessons grounded in real life and community context.",
  },
  {
    name: "Mandip Sapkota",
    role: "Community mentor",
    icon: "NR",
    bio: "Connects learning to local realities, values, and responsible digital participation.",
  },
];

const references = [
  ["UNESCO", "AI in education and research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
  ["UNICEF", "AI, children, and their rights", "https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children"],
  ["OECD", "Human-centred AI principles", "https://oecd.ai/en/ai-principles"],
];

export default function EditorialLandingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}>Sikai<span>AI</span></div>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#loop">Method</a>
            <a href="#references">References</a>
          </nav>
          <a href="#course" className={styles.buttonGhost}>Start course</a>
        </header>

        <section className={styles.hero} id="about">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>National AI Literacy Programme</p>
            <h1>
              Understand AI.<br />
              <span>Use it wisely.</span>
            </h1>
            <p className={styles.heroText}>
              A free four-week programme to help everyone recognise, understand, and use AI responsibly in everyday life.
            </p>
            <div className={styles.heroActions}>
              <a href="#course" className={styles.primaryButton}>Start the course</a>
              <a href="#loop" className={styles.secondaryButton}>How we teach</a>
            </div>
            <p className={styles.heroMeta}>Made in Nepal · Free, practical, and for everyone</p>
          </div>

          <div className={styles.heroVisual} aria-label="AI lesson preview">
            <div className={styles.codeWindow}>
              <div className={styles.windowControls}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.codeBlock}>
                <span className={styles.comment}># AI literacy</span>
                <span>data = learn_from_everyday_life()</span>
                <span>patterns = detect_relevance()</span>
                <span>decision = act_responsibly()</span>
                <span className={styles.strong}>print("Use AI with care")</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.metricsSection}>
        <div className={styles.shell}>
          <div className={styles.metricsGrid}>
            {stats.map((item) => (
              <article className={styles.metricCard} key={item.value}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.curriculumSection} id="curriculum">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Curriculum built for mastery</p>
            <h2>Learn by doing, one lesson at a time.</h2>
          </div>

          <div className={styles.curriculumGrid}>
            {curriculum.map((item, index) => (
              <article className={styles.curriculumCard} key={item.title}>
                <div className={styles.cardTopline}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.cardGlyph} aria-hidden="true">◎</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.loopSection} id="loop">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>The active learning loop</p>
            <h2>Practical learning that feels clear and human.</h2>
          </div>

          <div className={styles.loopGrid}>
            {activities.map((item, index) => (
              <article className={styles.loopCard} key={item.title}>
                <div className={styles.loopNumber}>{String(index + 1).padStart(2, "0")}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.outcomeSection} id="course">
        <div className={styles.shell}>
          <div className={styles.outcomeGrid}>
            <article className={styles.outcomeCard}>
              <div className={styles.outcomeLabel}>Test it</div>
              <h3>Build confidence through practice.</h3>
              <p>Check understanding with short, meaningful activities designed to reinforce real knowledge.</p>
            </article>
            <article className={styles.outcomeCardAccent}>
              <div className={styles.outcomeLabel}>Get certified</div>
              <h3>Finish with a clear milestone.</h3>
              <p>Complete the programme and leave with practical AI literacy you can apply with confidence.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.darkBanner}>
        <div className={styles.shell}>
          <div className={styles.darkBannerInner}>
            <p className={styles.bannerEyebrow}>Democratizing AI literacy</p>
            <h2>Build confidence with technology, not fear.</h2>
            <p>
              We help communities understand what AI is, what it is not, and how to use it responsibly in daily life.
            </p>
            <div className={styles.bannerActions}>
              <a href="#course" className={styles.primaryButton}>Start learning</a>
              <a href="#references" className={styles.secondaryButtonLight}>Read references</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeadingCenter}>
            <p className={styles.kicker}>Learn directly from veterans</p>
            <h2>People guiding the journey</h2>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <article className={styles.teamCard} key={member.name}>
                <div className={styles.avatar}>{member.icon}</div>
                <span className={styles.role}>{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.referencesSection} id="references">
        <div className={styles.shell}>
          <div className={styles.sectionHeadingCenter}>
            <p className={styles.kicker}>Trusted references</p>
            <h2>Stay curious, stay careful.</h2>
          </div>

          <div className={styles.referenceList}>
            {references.map(([name, title, url], index) => (
              <a className={styles.referenceItem} href={url} target="_blank" rel="noreferrer" key={name}>
                <span className={styles.refIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{title}</small>
                </div>
                <span className={styles.refArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <span>© 2026 SikaiAI · AI literacy for everyone</span>
          <a href="#about">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
