"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Logo already links home, so the nav itself mirrors the reference site's
// four tabs (Work/Studio/Capabilities/Contact) rather than duplicating a
// "home" entry — "Work" renamed to "Gallery" per direction given.
const LINKS = [
  { href: "/portfolio", label: "Gallery" },
  { href: "/about", label: "Studio" },
  { href: "/about#focus", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and always close it on
  // navigation so it never lingers into the next page.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-ink/90 backdrop-blur-sm border-b border-hairline" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo text hidden on mobile — the tight header row was congested
            alongside the hero's own content; the mobile menu's "Home" entry
            below covers the same navigation need without the clutter. */}
        <Link
          href="/"
          className="hidden md:inline-block font-display font-bold italic text-lg tracking-tightest text-bone hover:text-signal transition-colors"
        >
          Muhzin Mohammed
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 rounded-full border border-hairline p-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-cursor-hover
              className={`rounded-full px-4 py-1.5 font-mono font-semibold text-xs uppercase tracking-[0.15em] transition-colors ${
                isActive(link.href)
                  ? "bg-signal/15 border border-signal text-signal"
                  : "border border-transparent text-dim hover:text-bone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            data-cursor-text="Let's talk"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-bone px-5 py-2 font-mono font-bold text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ember hover:text-ink"
          >
            Hire Me <span aria-hidden="true">↗</span>
          </Link>

          {/* Mobile: hamburger toggles a full-screen overlay menu — replaces
              cramming all four links into the header row, which clipped on
              narrow viewports. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-ink border-t border-hairline px-6 py-6 flex flex-col gap-1"
          >
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`font-display font-bold text-2xl py-3 border-b border-hairline transition-colors ${
                pathname === "/" ? "text-signal" : "text-bone hover:text-signal"
              }`}
            >
              Home
            </Link>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-display font-bold text-2xl py-3 border-b border-hairline transition-colors ${
                  isActive(link.href) ? "text-signal" : "text-bone hover:text-signal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-bone px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-[0.15em] text-ink"
            >
              Hire Me <span aria-hidden="true">↗</span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
