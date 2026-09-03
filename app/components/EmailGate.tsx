"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    window.localStorage.setItem("Sikaai-email", email);
    router.push("/course");
  }
  return (
    <form className="email-gate" onSubmit={submit} noValidate>
      <label htmlFor="course-email">Your email, then let&apos;s learn</label>
      <div className="email-row">
        <input
          id="course-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <button className="button button-primary" type="submit">
          Get involved <span aria-hidden="true">→</span>
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <small>No account or password. Your progress stays on this device.</small>
    </form>
  );
}
