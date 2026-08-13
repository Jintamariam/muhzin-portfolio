import Reveal from "@/components/Reveal";

export const metadata = { title: "About" };

const GEAR = [
  "ARRI Alexa Mini",
  "Sony FX6",
  "RED Komodo",
  "Cooke Anamorphic/i primes",
  "Zeiss Supreme Primes",
  "DJI Ronin 4D",
];

const FOCUS = [
  "Natural & practical lighting",
  "Fast-turnaround commercial sets",
  "Music video visual concepting",
  "Handheld, observational coverage for narrative work",
  "Wedding films & highlights",
  "High-energy sports & movement coverage",
];

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 pt-36 pb-28">
      <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest mb-14">
        About
      </h1>

      <div className="grid md:grid-cols-[1fr,1.4fr] gap-14">
        <Reveal className="relative aspect-[3/4] bg-ink2 border border-hairline flex items-center justify-center overflow-hidden">
          {/* Viewfinder-style placeholder — corner brackets + crosshair,
              reads as an intentional design element rather than a TODO box.
              Swap for a real <img src="/images/portrait.jpg"> once a
              portrait is ready. */}
          <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-hairline" />
          <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-hairline" />
          <span className="absolute left-4 bottom-4 h-5 w-5 border-l border-b border-hairline" />
          <span className="absolute right-4 bottom-4 h-5 w-5 border-r border-b border-hairline" />
          <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-hairline" />
          <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-hairline" />
          <p className="font-mono text-xs text-dim uppercase tracking-[0.15em] p-6 text-center">
            Portrait placeholder — replace /public/images/portrait.jpg
          </p>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <p className="font-display italic text-2xl md:text-3xl leading-snug text-bone">
              Cinematography, to me, is the art of deciding what the audience is
              allowed to see.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-dim">
              Based in Bengaluru, India — available for projects across India
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4">
            <p className="text-dim leading-relaxed">
              Working across commercial, wedding, sports, and narrative sets
              within the Malayalam film industry, my approach starts with
              light — where it comes from, what it hides, and what it&rsquo;s
              willing to give up. I&rsquo;d rather build a shot around one
              well-placed practical than fix it later in the grade.
            </p>
            <p className="text-dim leading-relaxed">
              I&rsquo;m drawn to projects with a clear visual point of view —
              directors who know what they want a frame to feel like, even if
              they can&rsquo;t always name it. My job is to translate that
              feeling into camera position, lens choice, and light, and to do
              it fast enough that a set never loses momentum waiting on me.
            </p>
          </Reveal>

          <Reveal id="focus" delay={0.15} className="pt-6 scroll-mt-28">
            <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim mb-4">
              Focus
            </h2>
            <ul className="space-y-3">
              {FOCUS.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 0.06}
                  y={10}
                  className="flex items-center gap-3 text-bone"
                >
                  <span className="h-1 w-1 rounded-full bg-signal shrink-0" />
                  {item}
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="pt-6">
            <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim mb-4">
              Gear
            </h2>
            <div className="flex flex-wrap gap-2">
              {GEAR.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs px-3 py-1.5 border border-hairline text-dim hover:border-signal hover:text-signal transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
