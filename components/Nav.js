"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Showreel" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm border-b border-hairline" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display italic text-lg tracking-tightest text-bone hover:text-signal transition-colors"
        >
          Muhzin Mohammed
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-mono text-xs uppercase tracking-[0.15em] text-dim hover:text-bone transition-colors py-1"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        {/* Mobile nav kept intentionally simple — links stack, no hamburger animation gimmick */}
        <nav aria-label="Primary mobile" className="flex md:hidden items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim hover:text-bone transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
