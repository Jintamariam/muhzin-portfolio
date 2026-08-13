"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "highlights", label: "Highlights" },
  { key: "stills", label: "Still Frames" },
  { key: "bts", label: "Behind the Scenes" },
];

/**
 * gallery: [{ type: "image" | "video", category: "highlights" | "stills" | "bts",
 *             src, poster?, thumb?, alt? }]
 *
 * "thumb" is what renders in the grid (a lightweight still). For video items,
 * pass a still frame as `thumb`/`poster` so the grid never has to load actual
 * video just to render a preview tile — the real video only loads once the
 * user opens it in the lightbox.
 */
export default function Gallery({ gallery = [] }) {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [gallery, filter]
  );

  if (!gallery.length) return null;

  return (
    <Reveal as="section" className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">Gallery</h2>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative font-mono font-semibold text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
                filter === f.key
                  ? "border-transparent text-signal"
                  : "border-hairline text-dim hover:text-bone hover:border-bone"
              }`}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="gallery-filter-active"
                  className="absolute inset-0 border border-signal"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenIndex(i)}
              data-cursor-text={item.type === "video" ? "Play" : "Open"}
              className="group relative aspect-[4/3] overflow-hidden bg-ink2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumb || item.poster}
                alt={item.alt || ""}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/10 transition-colors">
                  <div className="h-9 w-9 rounded-full bg-ink/70 flex items-center justify-center text-bone text-sm">
                    ▶
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Reveal>
  );
}
