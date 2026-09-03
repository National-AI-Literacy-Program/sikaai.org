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
          <a href="#approach" className="nav-cta">
            Our approach
          </a>
          <Link href="/involve" className="nav-cta nav-cta-solid">
            Get involved
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
