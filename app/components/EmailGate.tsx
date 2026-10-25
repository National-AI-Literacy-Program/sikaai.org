"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveEmail } from "@/lib/progress";

export default function EmailGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
  event.preventDefault();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }
  await saveEmail(email);
  window.localStorage.setItem("Sikaai-email", email); // keep until nothing else reads it
  router.push("/course");
}
}
