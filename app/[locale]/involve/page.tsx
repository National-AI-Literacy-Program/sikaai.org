"use client"
import { Link } from "@/i18n/navigation";
import Involve from "@/app/components/involvepage/Involve";

export default function InvolvePage() {
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