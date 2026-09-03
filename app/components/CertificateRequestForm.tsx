"use client";

import { FormEvent, useState } from "react";

export default function CertificateRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  if (submitted) return <section className="certificate-success" role="status"><span className="success-mark">✓</span><p className="eyebrow">REQUEST RECEIVED</p><h2>Your certificate is on its way.</h2><p>We&apos;ll verify your course completion and send your certificate to your email within one day.</p></section>;
  return <form className="certificate-form" onSubmit={submit}><div className="form-grid"><label>Full name<input name="name" required placeholder="Your name as it should appear" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label></div><label>What did you take away from SikaiAI?<textarea name="note" rows={4} placeholder="A sentence or two is perfect." /></label><button className="button button-primary" type="submit">Send request <span aria-hidden="true">→</span></button><p className="form-note">Your details are only used to verify and issue your certificate.</p></form>;
}
