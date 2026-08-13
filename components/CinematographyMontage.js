import Reveal from "./Reveal";
import AutoplayVideoTile from "./AutoplayVideoTile";

/**
 * "This is what I can do with a camera" — a horizontal reel of short,
 * unlabeled clips distinct from named projects. Renders nothing while
 * `clips` (lib/data/montage.js) is empty, so it never shows as a gap.
 */
export default function CinematographyMontage({ clips = [] }) {
  if (!clips.length) return null;

  return (
    <section className="pt-8 pb-24">
      <Reveal className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim mb-2">
          Cinematography
        </h2>
        <p className="font-display italic text-xl md:text-2xl text-bone">
          Light. Movement. Composition. Story.
        </p>
      </Reveal>

      <Reveal className="flex gap-3 overflow-x-auto px-6 md:px-10 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {clips.map((clip, i) => (
          <div
            key={clip.src}
            className="relative shrink-0 w-[70vw] sm:w-[38vw] md:w-[26vw] aspect-[9/16] snap-start overflow-hidden bg-ink2"
          >
            <AutoplayVideoTile sources={[{ src: clip.src, type: "video/mp4" }]} poster={clip.poster} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
