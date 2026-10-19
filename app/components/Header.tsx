"use client";

import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {

  const pathname = usePathname();

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
   
    if (pathname !== "/") return;

    
    e.preventDefault();
    const element = document.getElementById(hash.replace("#", ""));

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", hash);
    }
  };

  return (
    <header className="site-nav shell">
      <Link href="/" className="brand">
        Sika<span>AI</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link
          href="/#about"
          onClick={(e) => handleHashClick(e, "#about")}
          className="nav-cta"
        >
          About
        </Link>
        <Link
          href="/#course-structure"
          onClick={(e) => handleHashClick(e, "#course-structure")}
          className="nav-cta"
        >
          Course Structure
        </Link>
        <Link
          href="/#approach"
          onClick={(e) => handleHashClick(e, "#approach")}
          className="nav-cta"
        >
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
  );
}