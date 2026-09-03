import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

const benefits = [
  ["01", "Short by design", "One idea, one example, one small win in about 2.5 minutes."],
  ["02", "Made for real life", "Learn through the apps, questions, and decisions you already make."],
  ["03", "Always human", "Build confidence with clear language and thoughtful practice."],
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <Header />
      <section className="hero shell" id="about">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> A calmer way to learn AI</p>
          <h1>AI, made <span>friendly.</span></h1>
          <p className="hero-text">SikaiAI is a bite-sized course for understanding the technology already shaping your everyday life.</p>
          <div className="hero-actions">
            <Link href="/course" className="button button-primary">Start learning <span aria-hidden="true">→</span></Link>
            <a href="#approach" className="text-link">See how it works <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note">No account. No jargon. Just one useful idea at a time.</p>
        </div>
        <div className="hero-visual" aria-label="A preview of a SikaiAI lesson">
          <div className="lesson-card">
            <div className="lesson-top"><span>DAY 01 / 07</span><span className="lesson-time">2.5 MIN</span></div>
            <Image className="namaste-art" src="/lesson-art/namaste.svg" alt="Namaste illustration welcoming learners" width={120} height={120} />
            <p className="lesson-kicker">A WARM WELCOME</p>
            <h2>Learn with curiosity.</h2>
            <p>A friendly starting point for a very big topic.</p>
            <div className="lesson-question">What is AI, really?</div>
            <div className="progress"><span /></div>
            <span className="progress-label">A small step counts.</span>
          </div>
          <div className="floating-note note-top"><span>✓</span><p>Clear enough<br />to remember</p></div>
          <div className="floating-note note-bottom"><span>↗</span><p>Learn at<br />your own pace</p></div>
        </div>
      </section>
      <section id="approach" className="section approach shell">
        <div className="section-heading"><div><p className="eyebrow">THE SIKAAI METHOD</p><h2>Small lessons.<br /><span>Real momentum.</span></h2></div><p>Learning something new should feel possible, not like another tab you need to keep open.</p></div>
        <div className="rhythm-grid">{benefits.map(([number, title, copy], index) => <article className={`rhythm-card ${index === 0 ? "rhythm-main" : ""}`} key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><span className="card-arrow" aria-hidden="true">{index === 0 ? "↗" : "+"}</span></article>)}</div>
      </section>
      <section className="landing-invite shell"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Start with a hello.<br /><span>Then start learning.</span></h2><Link href="/involve" className="button button-primary">Get involved first <span aria-hidden="true">→</span></Link></section>
      <footer className="site-footer landing-footer shell"><p>© 2026 SikaiAI</p><p>Learn AI. One small lesson at a time.</p></footer>
    </main>
  );
}
