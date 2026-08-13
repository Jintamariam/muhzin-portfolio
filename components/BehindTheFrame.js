import Reveal from "./Reveal";

/**
 * "Behind the Frame" — a BTS still paired with the final frame it produced,
 * proving the work behind the image rather than just the result. Renders
 * nothing while `pairs` (lib/data/bts.js) is empty.
 */
export default function BehindTheFrame({ pairs = [] }) {
  if (!pairs.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
      <Reveal className="mb-8">
        <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">
          Behind the Frame
        </h2>
      </Reveal>

      <div className="space-y-10">
        {pairs.map((pair, i) => (
          <Reveal
            key={pair.finalImage}
            delay={i * 0.05}
            className="grid grid-cols-2 gap-1 md:gap-2 items-center"
          >
            <div className="relative aspect-video overflow-hidden bg-ink2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pair.btsImage} alt={pair.label ? `${pair.label} — behind the scenes` : "Behind the scenes"} className="h-full w-full object-cover" />
              <span className="absolute bottom-2 left-2 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-bone/80 bg-ink/60 px-2 py-1">
                BTS
              </span>
            </div>
            <div className="relative aspect-video overflow-hidden bg-ink2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pair.finalImage} alt={pair.label ? `${pair.label} — final frame` : "Final frame"} className="h-full w-full object-cover" />
              <span className="absolute bottom-2 left-2 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-signal bg-ink/60 px-2 py-1">
                Final
              </span>
            </div>
            {pair.label && (
              <p className="col-span-2 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim mt-1">
                {pair.label}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
