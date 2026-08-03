"use client";

import { useEffect, useState } from "react";

/**
 * framer-motion's own useReducedMotion() reads matchMedia synchronously in
 * its useState initializer, which runs during client hydration — before the
 * server (which has no window) ever could. For anyone with OS-level reduced
 * motion on, that mismatches the server-rendered markup and React logs a
 * hydration warning. Defaulting to `false` until a real effect confirms the
 * preference keeps the first client render identical to the server's.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
