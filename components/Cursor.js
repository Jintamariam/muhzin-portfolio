"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Camera-viewfinder-style cursor: a bracket square that tracks the pointer
 * and snaps into a rotated, larger "focused" state over interactive
 * elements. Desktop (fine-pointer) only, and only enabled once we've
 * confirmed via matchMedia that it won't fight a touch device or a user
 * who asked for reduced motion — real cursor stays untouched otherwise.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: hovering ? 1.9 : 1, rotate: hovering ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-6 w-6"
      >
        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-bone" />
        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-bone" />
        <span className="absolute left-0 bottom-0 h-2 w-2 border-l border-b border-bone" />
        <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-bone" />
      </motion.div>
    </motion.div>
  );
}
