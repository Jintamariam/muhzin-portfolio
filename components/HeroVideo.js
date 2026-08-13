"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useReducedMotion from "@/lib/useReducedMotion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Fullscreen autoplaying hero video.
 *
 * Autoplay only works cross-browser (esp. iOS Safari) when the video is:
 *   - muted
 *   - has the `playsinline` attribute (prevents iOS from forcing fullscreen)
 *   - autoPlay is set
 *   - loop is set
 * We also call .play() manually on mount as a fallback for browsers that
 * are inconsistent about honoring the autoPlay attribute alone.
 */
export default function HeroVideo({
  sources = [],
  poster = "/images/hero-poster.jpg",
  title = "Muhzin Mohammed",
  tagline = "Cinematographer",
}) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked (rare with muted video) — fail silently,
        // poster image remains visible, which is an acceptable fallback.
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={reduceMotion ? undefined : { scale: videoScale }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
      >
        {sources.map((src) => (
          <source key={src.src} src={src.src} type={src.type} />
        ))}
      </motion.video>

      {/* Gradient overlays for legibility, not decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* Top-left positioning statement — separate from the bottom name
          lockup, gives the hero a reason to read before it gives a name.
          Desktop only: at mobile widths this collided with the location
          tag and the tagline below it, reading as congested. */}
      <motion.div
        className="hidden md:block absolute left-6 md:left-10 top-28 md:top-32 z-10 max-w-xs border-l border-hairline pl-5"
        variants={container}
        initial="hidden"
        animate="show"
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
      >
        <motion.p variants={item} className="text-sm text-dim leading-relaxed">
          Independent cinematographer shaping visual stories for brands,
          weddings, sports, and film.
        </motion.p>
        <motion.a
          variants={item}
          href="#selected-work"
          data-cursor-text="Scroll"
          className="group mt-4 inline-flex items-center gap-2 font-mono font-semibold text-[11px] uppercase tracking-[0.15em] text-bone hover:text-signal transition-colors"
        >
          View Selected Work
          <span className="block h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
        </motion.a>
      </motion.div>

      <motion.div
        className="pointer-events-none relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-20"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-signal mb-4">
          {tagline}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display font-bold text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] tracking-tightest text-bone max-w-4xl"
        >
          {title}
        </motion.h1>
      </motion.div>

      {/* Location tag — coordinate-style, matching the camera-HUD metadata
          language used throughout the rest of the site. Desktop only, same
          congestion reason as the intro block above. */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="hidden md:block absolute top-28 right-6 md:right-10 z-10 text-right font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim"
      >
        <p>Bengaluru, IN</p>
        <p>12.9716&deg; N</p>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="absolute bottom-6 right-6 md:right-10 z-10 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
