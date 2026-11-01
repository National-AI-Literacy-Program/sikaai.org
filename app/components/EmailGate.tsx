"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  connectAccount,
  HttpError,
  isOfflineError,
  saveEmail,
} from "@/lib/progress";

export default function EmailGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const clean = email.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(clean)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // 201 = new account. 409 = already registered, so log in and restore progress.
      await connectAccount(clean);
    } catch (e) {
      if (isOfflineError(e)) {
        // Offline: let them start. Progress syncs, and any saved progress
        // is restored, the next time the app is online.
        await saveEmail(clean);
      } else if (e instanceof HttpError && e.status === 422) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      } else {
        setError("Something went wrong. Try again.");
        setLoading(false);
        return;
      }
    }

    window.localStorage.setItem("Sikaai-email", clean); // keep until nothing else reads it
    router.push("/course");
  }

  // ...your existing return (...) stays exactly as it is
}
