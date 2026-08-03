"use client";

import { motion } from "framer-motion";
import useReducedMotion from "@/lib/useReducedMotion";

/**
 * Shared fade/slide-up-on-scroll wrapper — used across the about, project
 * detail, and gallery sections so every "reveal on scroll" moment shares
 * the same easing and timing instead of each page reinventing it.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
