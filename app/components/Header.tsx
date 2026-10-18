"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const targetId = hash.replace("#", "");
    const element = document.getElementById(targetId);

    if (pathname === "/") {
    
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", hash);
      }
    } else {
 
      router.push(`/${hash}`);
    }
  };

  return (
    <>
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
    </>
  );
}