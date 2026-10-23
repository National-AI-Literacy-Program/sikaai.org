"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "./ThemeToggle";
import { Download } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (value: boolean) => setOpenAt(value ? pathname : null);
  const headerRef = useRef<HTMLElement>(null);

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenAt(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    setOpen(false);
    if (pathname !== "/") return;

    e.preventDefault();
    const element = document.getElementById(hash.replace("#", ""));

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", hash);
    }
  };

  return (
    <header className="site-nav shell" ref={headerRef}>

      <Link href="/" className="brand">
        Sika<span>AI</span>
      </Link>

      <div className="nav-right">
        <button
          type="button"
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-nav"
          className={`nav-links${open ? " nav-links-open" : ""}`}
          aria-label="Main navigation"
        >
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
          <Link
            href="/curriculum"
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            Curriculum
          </Link>
         
<Link
  href="http://learn.sikaai.org/?install=1"
  className="nav-cta button button-primary gap-2"
  onClick={() => setOpen(false)}
>
  <Download size={18} aria-hidden="true" />
  Install
</Link>

        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}