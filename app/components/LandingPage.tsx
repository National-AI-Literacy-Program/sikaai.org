import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <Header />
      <section className="hero shell" id="about">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> AI literacy for everyday life in Nepal</p>
          <h1 className="hero-heading">Know AI.<br /><span>Get aware.</span></h1>
          <p className="hero-text">SikaiAI is a four-week AI literacy program that helps you identify AI, understand how it is used, and make more informed choices online.</p>
          <div className="hero-actions">
            <Link href="/course" className="button button-primary">Start the course <span aria-hidden="true">→</span></Link>
          </div>
          <p className="hero-note">Designed to help people in Nepal recognise AI, understand its impact, and use it with confidence.</p>
        </div>
        <div className="hero-visual" aria-label="A preview of a SikaiAI lesson">
          <div className="lesson-card">
            <div className="lesson-top"><span>WEEK 01 / 04</span><span className="lesson-time">WITH TESTS</span></div>
            <Image className="namaste-art" src="/lesson-art/namaste.svg" alt="Namaste illustration welcoming learners" width={120} height={120} />
            <p className="lesson-kicker">WEEK 01 · THE BASICS</p>
            <h2>What is AI, really?</h2>
            <p>Start by learning how to recognise AI in everyday life.</p>
            <div className="lesson-question">Learn · practise · check your understanding</div>
            <div className="progress"><span /></div>
            <span className="progress-label">One week at a time.</span>
          </div>
        </div>
      </section>
      <section className="section course-structure shell" id="course-structure">
        <div className="section-heading"><div><p className="eyebrow">COURSE STRUCTURE</p><h2>Learn it.<br /><span>Practise it. Check it.</span></h2></div><p>Each week combines short lessons, everyday examples, and multiple-choice questions (MCQs) to help you remember what you learn.</p></div>
        <div className="rhythm-grid">
          <article className="rhythm-card rhythm-main"><span className="step-number">01</span><div><h3>Learn</h3><p>Simple explanations introduce each idea.</p></div></article>
          <article className="rhythm-card"><span className="step-number">02</span><div><h3>Practise</h3><p>Apply the idea to familiar situations.</p></div></article>
          <article className="rhythm-card"><span className="step-number">03</span><div><h3>Take an MCQ</h3><p>Answer a short quiz to check your understanding.</p></div></article>
          <article className="rhythm-card"><span className="step-number">04</span><div><h3>Reflect</h3><p>Take one useful habit into everyday life.</p></div></article>
        </div>
      </section>
      <section id="approach" className="section approach shell">
        <div className="section-heading"><div><p className="eyebrow">FOUR-WEEK JOURNEY</p><h2>Build confidence<br /><span>one module at a time.</span></h2></div><p>Move from recognising AI to making thoughtful, responsible choices.</p></div>
        <div className="rhythm-grid">
          <article className="rhythm-card rhythm-main"><span className="step-number">01</span><div><h3>What is AI?</h3><p>Recognise AI in everyday tools and services.</p></div></article>
          <article className="rhythm-card"><span className="step-number">02</span><div><h3>AI and information</h3><p>Understand recommendations, generated content, and misinformation.</p></div></article>
          <article className="rhythm-card"><span className="step-number">03</span><div><h3>AI and decisions</h3><p>See how AI can affect work, privacy, and opportunity.</p></div></article>
          <article className="rhythm-card"><span className="step-number">04</span><div><h3>Use AI responsibly</h3><p>Build safer habits and make informed choices.</p></div></article>
        </div>
      </section>
      <section className="section why-section shell" id="why">
        <div className="section-heading"><div><p className="eyebrow">WHY ARE WE DOING THIS?</p><h2>AI is already<br /><span>part of everyday life.</span></h2></div><p>SikaiAI helps learners ask better questions, protect their information, and make confident choices as AI becomes more common.</p></div>
        <div className="section-heading"><div><p className="eyebrow">REFERENCES</p><h2>Learn from<br /><span>trusted guidance.</span></h2></div><p>This course is informed by digital literacy and responsible AI guidance from UNESCO, UNICEF, and the OECD.</p></div>
      </section>
      <footer className="site-footer landing-footer shell"><p>© 2026 SikaiAI</p><p>Learn AI. One small lesson at a time.</p></footer>
    </main>
  );
}
