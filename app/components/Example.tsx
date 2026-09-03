"use client";

import { useState } from "react";

export default function Example() {
  const [show, setShow] = useState(false);
  return (
    <section className="example-card" aria-labelledby="example-title">
      <div className="example-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> DAILY AI LESSON</p>
        <h2 id="example-title">AI made <span>simple.</span></h2>
        <p className="example-description">One small lesson a day. Build your AI literacy without the overwhelm.</p>
        <button type="button" className="example-action" onClick={() => setShow((value) => !value)}>{show ? "Hide example" : "See an example"} <span aria-hidden="true">→</span></button>
      </div>
      <div className="example-result" aria-live="polite">
        <p className="example-label">{show ? "A SIMPLE WAY TO THINK" : "THE RHYTHM"}</p>
        <code>{show ? "Ask → notice → try → reflect" : "AI → understand → practice → apply"}</code>
        {show && <p className="example-result-copy">Start with one question from your everyday life. That is enough for today.</p>}
      </div>
    </section>
  );
}
