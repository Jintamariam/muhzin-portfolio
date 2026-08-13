"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Single-page site: these are section ids on "/", not separate routes.
// next/link natively handles "/#id" from any page — navigates home then
// scrolls to the element, or just scrolls if already there.
const LINKS = [
  { id: "work", label: "Gallery" },
  { id: "studio", label: "Studio" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  // Scroll-spy: highlight whichever section is currently in view. Only
  // meaningful on the homepage — project detail pages aren't part of this
  // taxonomy, so no pill lights up there.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (id) => activeSection === id;

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
              key={link.id}
              href={`/#${link.id}`}
              aria-current={isActive(link.id) ? "page" : undefined}
              data-cursor-hover
              className={`rounded-full px-4 py-1.5 font-mono font-semibold text-xs uppercase tracking-[0.15em] transition-colors ${
                isActive(link.id)
                  ? "bg-signal/15 border border-signal text-signal"
                  : "border border-transparent text-bone hover:text-signal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            data-cursor-text="Let's talk"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-bone px-5 py-2 font-mono font-bold text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ember hover:text-ink"
          >
            Start a Project <span aria-hidden="true">↗</span>
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
                key={link.id}
                href={`/#${link.id}`}
                aria-current={isActive(link.id) ? "page" : undefined}
                className={`font-display font-bold text-2xl py-3 border-b border-hairline transition-colors ${
                  isActive(link.id) ? "text-signal" : "text-bone hover:text-signal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-bone px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-[0.15em] text-ink"
            >
              Start a Project <span aria-hidden="true">↗</span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
