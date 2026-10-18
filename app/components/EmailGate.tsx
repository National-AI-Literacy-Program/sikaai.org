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
      
      <div className="email-row">
        <input
          id="course-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="Enter email address"
          autoComplete="email"
        />
        <button className="button button-primary" type="submit">
        Start →
        </button>
      </div>
      {error? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : ( <small>ss</small>)}
     
    </form>
  );
}
