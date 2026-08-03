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

const TIMELINE = [
  { year: "2026", entry: "Add most recent project or milestone here." },
  { year: "2025", entry: "Add a prior project or milestone here." },
  { year: "2024", entry: "Add earliest listed project or training here." },
];

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 pt-36 pb-28">
      <h1 className="font-display font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest mb-14">
        About
      </h1>

      <div className="grid md:grid-cols-[1fr,1.4fr] gap-14">
        <Reveal className="relative aspect-[3/4] bg-ink2 border border-hairline flex items-center justify-center overflow-hidden">
          {/* Viewfinder-style placeholder — corner brackets + crosshair,
              reads as an intentional design element rather than a TODO box */}
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
          <Reveal delay={0.1}>
            <p className="text-dim leading-relaxed">
              [Add 2–3 short paragraphs here: background, how you got into
              cinematography, and what you look for in a project. Keep it
              confident and specific — avoid generic statements every DOP's
              about page has.]
            </p>
          </Reveal>

          <Reveal delay={0.15} className="pt-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-4">
              Experience
            </h2>
            <ul className="space-y-4">
              {TIMELINE.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.year}
                  delay={i * 0.08}
                  y={12}
                  className="flex gap-6 border-b border-hairline pb-4"
                >
                  <span className="font-mono text-sm text-signal w-14 shrink-0">
                    {t.year}
                  </span>
                  <span className="text-bone">{t.entry}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="pt-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-4">
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
