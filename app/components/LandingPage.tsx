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
          <article className="rhythm-card rhythm-main"><span className="step-number">01</span><div><h3>Engage with AI</h3><p>Recognise AI in the apps, search tools, and platforms you already use.</p></div></article>
          <article className="rhythm-card"><span className="step-number">02</span><div><h3>Create with AI</h3><p>Learn how AI-generated content is created and why it can be misleading or biased.</p></div></article>
          <article className="rhythm-card"><span className="step-number">03</span><div><h3>Manage AI</h3><p>Understand how AI affects privacy, work, and the choices we make online.</p></div></article>
          <article className="rhythm-card"><span className="step-number">04</span><div><h3>Wrapping Up</h3><p>Review what you have learned and build habits for safer, smarter AI use.</p></div></article>
        </div>
      </section>
      <section className="section why-section shell" id="why">
        <div className="section-heading"><div><p className="eyebrow">WHY ARE WE DOING THIS?</p><h2>AI is already<br /><span>part of everyday life.</span></h2></div><p>SikaiAI helps learners ask better questions, protect their information, and make confident choices as AI becomes more common.</p></div>
      </section>
      <section className="section references-section shell" id="references">
        <div className="section-heading"><div><p className="eyebrow">REFERENCES</p><h2>Learn from<br /><span>trusted guidance.</span></h2></div><p>The course draws on established guidance about AI, digital literacy, online safety, and responsible technology use.</p></div>
        <div className="rhythm-grid references-grid">
          <article className="rhythm-card rhythm-main"><span className="step-number">01</span><div><h3>UNESCO</h3><p>Guidance for generative AI in education and research.</p><a href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" target="_blank" rel="noreferrer">View reference →</a></div></article>
          <article className="rhythm-card"><span className="step-number">02</span><div><h3>UNICEF</h3><p>Policy guidance on AI for children and their rights.</p><a href="https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children" target="_blank" rel="noreferrer">View reference →</a></div></article>
          <article className="rhythm-card"><span className="step-number">03</span><div><h3>OECD</h3><p>Principles for trustworthy and human-centred AI.</p><a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noreferrer">View reference →</a></div></article>
          <article className="rhythm-card"><span className="step-number">04</span><div><h3>UNESCO</h3><p>Media and information literacy resources for navigating digital life.</p><a href="https://www.unesco.org/en/media-information-literacy" target="_blank" rel="noreferrer">View reference →</a></div></article>
        </div>
      </section>
      <footer className="site-footer landing-footer shell"><p>© 2026 SikaiAI</p><p><a href="#references">References</a> · Learn AI. One small lesson at a time.</p></footer>
    </main>
  );
}
