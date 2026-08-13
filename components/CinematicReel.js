"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import useReducedMotion from "@/lib/useReducedMotion";

/**
 * The site's signature interaction: a tall scroll region where each project
 * is a full-bleed video that crossfades into the next as the user scrolls,
 * with a huge kinetic title per project. Built on native scroll (position:
 * sticky + scroll-linked motion values), not scroll-jacking — so it stays
 * smooth, accessible, and works the same on trackpad, wheel, or touch.
 */
export default function CinematicReel({ projects }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = projects.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const scrollToSegment = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const segStart = index / total;
    const target = el.offsetTop + segStart * el.offsetHeight;
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        {projects.map((project, i) => (
          <ReelSlide
            key={project.slug}
            project={project}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
            isActive={active === i}
            reduceMotion={reduceMotion}
          />
        ))}

        {/* Gradient overlay for legibility — sits between the video layer
            (z-0) and each slide's title (z-10), never above the title */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/90 z-[5]" />

        {/* Reel counter */}
        <div className="absolute top-6 left-6 md:left-10 z-20 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        {/* Desktop chapter nav */}
        <div className="hidden md:flex flex-col items-end gap-3 absolute top-1/2 -translate-y-1/2 right-6 md:right-10 z-20">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => scrollToSegment(i)}
              className="group flex items-center gap-3"
              aria-label={`Jump to ${p.title}`}
            >
              <span
                className={`font-mono font-semibold text-[10px] uppercase tracking-[0.15em] transition-colors ${
                  active === i ? "text-signal" : "text-dim group-hover:text-bone"
                }`}
              >
                {p.title}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  active === i ? "w-8 bg-signal" : "w-4 bg-dim group-hover:bg-bone"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Persistent CTA — follows the active slide, avoids click-through
            issues from stacking full-screen absolutely-positioned layers */}
        <div className="absolute bottom-6 left-6 md:left-10 z-20">
          <Link
            href={`/portfolio/${projects[active].slug}`}
            className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-bone hover:text-signal transition-colors inline-flex items-center gap-2"
          >
            View project <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="absolute bottom-6 right-6 md:right-10 z-20 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim">
          Scroll ↓
        </div>
      </div>
    </section>
  );
}

function ReelSlide({ project, index, total, scrollYProgress, isActive, reduceMotion }) {
  const videoRef = useRef(null);
  const step = 1 / total;
  const segStart = index * step;
  const segEnd = (index + 1) * step;
  const edge = step * 0.15;

  const inputRange = [
    segStart,
    index === 0 ? segStart : segStart + edge,
    segEnd - edge,
    segEnd,
  ];
  const opacityOut = [
    index === 0 ? 1 : 0,
    1,
    1,
    index === total - 1 ? 1 : 0,
  ];

  const opacity = useTransform(scrollYProgress, inputRange, opacityOut);
  const titleY = useTransform(scrollYProgress, inputRange, [40, 0, 0, -40]);
  const titleOpacity = useTransform(scrollYProgress, inputRange, [0, 1, 1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  const specLine = [
    project.specs.fps ? `${project.specs.fps}fps` : "",
    project.specs.aperture,
    project.specs.lens ? project.specs.lens.split(" ")[0] : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: reduceMotion ? (isActive ? 1 : 0) : opacity }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload={index === 0 ? "auto" : "metadata"}
        poster={project.poster}
        aria-hidden="true"
      >
        {project.video.map((src) => (
          <source key={src.src} src={src.src} type={src.type} />
        ))}
      </video>

      <motion.div
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-20 md:pr-40"
        style={
          reduceMotion
            ? undefined
            : { y: titleY, opacity: titleOpacity }
        }
      >
        <p className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-signal mb-4">
          {project.category} — {project.year}
        </p>
        <h2 className="font-display font-bold text-[clamp(3rem,10vw,8.5rem)] leading-[0.92] tracking-tightest text-bone max-w-5xl">
          {project.title}
        </h2>
        {specLine && (
          <div className="mt-5 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-bone/80">
            {specLine}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
