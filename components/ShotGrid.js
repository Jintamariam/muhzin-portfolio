import Reveal from "./Reveal";
import AutoplayVideoTile from "./AutoplayVideoTile";

/**
 * "Shot on Camera" — a raw reel-library grid of short clips, deliberately
 * unadorned: just a number and a one-word tag, no project framing. Renders
 * nothing while `shots` (lib/data/shots.js) is empty.
 */
export default function ShotGrid({ shots = [] }) {
  if (!shots.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
      <Reveal className="mb-8">
        <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">
          Shot on Camera
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {shots.map((shot, i) => (
          <Reveal
            key={shot.src}
            delay={i * 0.04}
            className="relative aspect-[4/5] overflow-hidden bg-ink2"
          >
            <AutoplayVideoTile sources={[{ src: shot.src, type: "video/mp4" }]} poster={shot.poster} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-bone/90">
              {String(i + 1).padStart(2, "0")}
              {shot.tag && <span className="text-dim"> — {shot.tag}</span>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
