import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <>
      <header className="site-nav shell">
        <Link href="/" className="brand">
          Sikaai<span>AI</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about" className="nav-cta">
            About us
          </a>
          <a href="#course-structure" className="nav-cta">
            Course Structure
          </a>
          <a href="#approach" className="nav-cta">
            Content
          </a>
          <a href="#why" className="nav-cta">
            Reference
          </a>
          <Link href="/involve" className="nav-cta nav-cta-solid button button-primary">
            Start Learning
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
