"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Frame-accurate-feeling timecode readout — HH:MM:SS:FF at 24fps.
// Purely decorative/atmospheric, ties the footer back to a DOP's on-set vocabulary.
function useTimecode(fps = 24) {
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = () => {
      const elapsedMs = performance.now() - start;
      const totalFrames = Math.floor((elapsedMs / 1000) * fps);
      const ff = totalFrames % fps;
      const totalSeconds = Math.floor(totalFrames / fps);
      const ss = totalSeconds % 60;
      const mm = Math.floor(totalSeconds / 60) % 60;
      const hh = Math.floor(totalSeconds / 3600);
      const pad = (n) => String(n).padStart(2, "0");
      setTc(`${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return tc;
}

export default function Footer() {
  const tc = useTimecode(24);

  return (
    <footer className="border-t border-hairline mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display italic text-xl mb-2">Muhzin Mohammed</p>
          <p className="text-dim text-sm max-w-xs">
            Cinematographer working across commercial, narrative, and music video
            production.
          </p>
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.15em] text-dim space-y-2">
          <p>Email</p>
          <a href="mailto:muhzinmo@gmail.com" className="block text-bone normal-case tracking-normal font-body hover:text-signal transition-colors">
            muhzinmo@gmail.com
          </a>
          <p className="pt-3">Phone</p>
          {/* Placeholder — the number provided was incomplete, replace with the full number */}
          <a href="tel:+91XXXXXXXXXX" className="block text-bone normal-case tracking-normal font-body hover:text-signal transition-colors">
            +91 97XXXXXXXX <span className="text-dim">(add full number)</span>
          </a>
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.15em] text-dim space-y-2">
          <p>Elsewhere</p>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block text-bone normal-case tracking-normal font-body hover:text-signal transition-colors">
            Instagram
          </a>
          <a href="https://vimeo.com/" target="_blank" rel="noreferrer" className="block text-bone normal-case tracking-normal font-body hover:text-signal transition-colors">
            Vimeo
          </a>
          <Link href="/contact" className="inline-block mt-4 text-bone normal-case tracking-normal font-body underline underline-offset-4 hover:text-signal transition-colors">
            Get in touch →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 border-t border-hairline flex items-center justify-between">
        <p className="font-mono text-[10px] text-dim uppercase tracking-[0.15em]">
          © {new Date().getFullYear()} Muhzin Mohammed
        </p>
        <p className="font-mono text-[10px] text-dim tabular-nums" suppressHydrationWarning>
          {tc}
        </p>
      </div>
    </footer>
  );
}
