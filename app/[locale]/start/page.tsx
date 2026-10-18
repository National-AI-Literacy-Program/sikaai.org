"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    window.localStorage.setItem("sikai-email", email.trim());
    router.push("/course");
  }

  return (
    <main className="gate-page">
      <div className="gate-card">
        <a className="brand" href="/">
          Sikaai<span>AI</span>
        </a>
        <p className="eyebrow">READY WHEN YOU ARE</p>
        <h1>Start your AI learning journey.</h1>
        <p>
          Enter your email so we can keep your learning progress connected. No
          account or password needed.
        </p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="email">Your email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button-primary" type="submit">
            Get involved <span aria-hidden="true">→</span>
          </button>
        </form>
        <a className="back-link" href="/">
          ← Back home
        </a>
      </div>
    </main>
  );
}
