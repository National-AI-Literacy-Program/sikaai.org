import Link from "next/link";
import Involve from "@/app/components/Involve";

export default function InvolvePage() {
  return (
    <main className="involve-route">
      <nav className="site-nav shell">
        <Link className="brand" href="/">Sikaai<span>AI</span></Link>
        <Link className="back-link" href="/">← Back home</Link>
      </nav>
      <Involve />
    </main>
  );
}
