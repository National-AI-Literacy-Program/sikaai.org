"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Involve from "@/app/components/involvepage/Involve";
import { getEmail } from "@/lib/progress";

export default function InvolvePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getEmail()
      .then((e) => {
        if (e) router.replace("/course");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  // Blank (not the header, not the form) until we know the user is new
  if (checking) return <div className="h-dvh" aria-hidden />;

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="site-nav shell">
        <Link className="brand" href="/">Sika<span>AI</span></Link>
        <Link className="back-link nav-cta" href="/">← Back home</Link>
      </header>
      <Involve />
    </div>
  );
}