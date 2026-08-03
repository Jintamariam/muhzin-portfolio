"use client";

import { useEffect, useCallback, useRef } from "react";

/**
 * Fullscreen lightbox carousel. Supports mixed media — an item can be an
 * image or a video. Videos autoplay (with sound + controls, since the user
 * has deliberately opened this item) and pause automatically when the user
 * navigates to a different slide or closes the lightbox.
 *
 * items: [{ type: "image" | "video", src, poster?, alt? }]
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const videoRef = useRef(null);
  const item = items[index];

  const goTo = useCallback(
    (nextIndex) => {
      const wrapped = (nextIndex + items.length) % items.length;
      onNavigate(wrapped);
    },
    [items.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo, onClose]);

  // Pause video whenever the active slide changes away from a video item
  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, [index]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/97 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-20 shrink-0">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-dim">
          {index + 1} / {items.length}
        </p>
        <button
          onClick={onClose}
          className="font-mono text-xs uppercase tracking-[0.15em] text-bone hover:text-signal transition-colors"
          aria-label="Close gallery"
        >
          Close ✕
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 md:px-20 pb-6 min-h-0">
        <button
          onClick={() => goTo(index - 1)}
          className="absolute left-2 md:left-6 z-10 font-mono text-2xl text-bone/70 hover:text-signal transition-colors p-3"
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {item.type === "video" ? (
            <video
              ref={videoRef}
              key={item.src}
              className="max-h-full max-w-full"
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.src}
              src={item.src}
              alt={item.alt || ""}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          className="absolute right-2 md:right-6 z-10 font-mono text-2xl text-bone/70 hover:text-signal transition-colors p-3"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 pb-8 shrink-0 flex-wrap px-6">
        {items.map((it, i) => (
          <button
            key={it.src}
            onClick={() => goTo(i)}
            aria-label={`Go to item ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-signal" : "w-1.5 bg-dim/50 hover:bg-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
