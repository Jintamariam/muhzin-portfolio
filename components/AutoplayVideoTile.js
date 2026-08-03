"use client";

import { useEffect, useRef } from "react";

/**
 * A video that plays automatically the moment it scrolls into view, and
 * pauses when it scrolls out — no click required. Uses IntersectionObserver
 * so off-screen tiles don't burn bandwidth/battery playing unseen video.
 */
export default function AutoplayVideoTile({
  sources = [],
  poster,
  className = "",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`h-full w-full object-cover ${className}`}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      {sources.map((src) => (
        <source key={src.src} src={src.src} type={src.type} />
      ))}
    </video>
  );
}
