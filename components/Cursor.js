"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";
const TEAL = "#4F8A82";
const EMBER = "#C9824D";
const IDLE_SIZE = 26;
const PAD = 10;

/**
 * Camera autofocus reticle — extends the corner-bracket viewfinder motif
 * already used on the About page portrait placeholder, rather than a stock
 * dot/ring. At rest it's a small bracket square with a tally dot at its
 * center, tracking the pointer. Hovering a link/button/card makes it snap
 * and expand to frame that element exactly (like an AF box locking onto a
 * subject), switch from teal to ember, and surface an optional contextual
 * label read from that element's `data-cursor-text` attribute.
 *
 * Desktop (fine-pointer) only, and only enabled once matchMedia confirms it
 * won't fight a touch device or a user who asked for reduced motion — the
 * real cursor stays untouched otherwise.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.15 });
  const dotY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.15 });

  const frameLeft = useSpring(0, { damping: 28, stiffness: 380, mass: 0.6 });
  const frameTop = useSpring(0, { damping: 28, stiffness: 380, mass: 0.6 });
  const frameW = useSpring(IDLE_SIZE, { damping: 28, stiffness: 380, mass: 0.6 });
  const frameH = useSpring(IDLE_SIZE, { damping: 28, stiffness: 380, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest(HOVER_SELECTOR);

      if (target) {
        const rect = target.getBoundingClientRect();
        frameLeft.set(rect.left - PAD);
        frameTop.set(rect.top - PAD);
        frameW.set(rect.width + PAD * 2);
        frameH.set(rect.height + PAD * 2);
        setHovering(true);
        setLabel(target.dataset.cursorText || "");
      } else {
        frameLeft.set(e.clientX - IDLE_SIZE / 2);
        frameTop.set(e.clientY - IDLE_SIZE / 2);
        frameW.set(IDLE_SIZE);
        frameH.set(IDLE_SIZE);
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [x, y, frameLeft, frameTop, frameW, frameH]);

  if (!enabled) return null;

  const bracketColor = hovering ? EMBER : TEAL;
  const armSize = hovering ? 10 : 6;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70]"
        style={{ left: frameLeft, top: frameTop, width: frameW, height: frameH }}
      >
        <div className="relative h-full w-full">
          <motion.span
            animate={{ borderColor: bracketColor, width: armSize, height: armSize }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 border-l border-t"
          />
          <motion.span
            animate={{ borderColor: bracketColor, width: armSize, height: armSize }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-0 border-r border-t"
          />
          <motion.span
            animate={{ borderColor: bracketColor, width: armSize, height: armSize }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-0 border-l border-b"
          />
          <motion.span
            animate={{ borderColor: bracketColor, width: armSize, height: armSize }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-0 border-r border-b"
          />

          {label && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 -bottom-7 whitespace-nowrap font-mono font-semibold text-[9px] uppercase tracking-[0.2em]"
              style={{ color: EMBER }}
            >
              {label}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Tally dot — precise pointer position, idle state only */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: TEAL }}
        />
      </motion.div>
    </>
  );
}
