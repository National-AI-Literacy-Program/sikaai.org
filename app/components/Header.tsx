import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <>
      <header className="site-nav shell">
        <Link href="/" className="brand">
          Sika<span>AI</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/#aboutus" className="nav-cta ">
            About 
          </Link>
          <Link href="/#course-structure" className="nav-cta">
            Course Structure
          </Link>
          <Link href="/#approach" className="nav-cta">
            Content
          </Link>
          <Link href="/curriculum" className="nav-cta">
            Curriculum
          </Link>
          <Link href="/involve" className="nav-cta button button-primary">
            Start Learning
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
