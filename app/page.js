import HeroVideo from "@/components/HeroVideo";
import CinematicReel from "@/components/CinematicReel";
import CinematographyMontage from "@/components/CinematographyMontage";
import BehindTheFrame from "@/components/BehindTheFrame";
import ShotGrid from "@/components/ShotGrid";
import PortfolioIndex from "@/components/PortfolioIndex";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data/projects";
import { montageClips } from "@/lib/data/montage";
import { btsPairs } from "@/lib/data/bts";
import { shots } from "@/lib/data/shots";

const GEAR = [
  "ARRI Alexa Mini",
  "Sony FX6",
  "RED Komodo",
  "Cooke Anamorphic/i primes",
  "Zeiss Supreme Primes",
  "DJI Ronin 4D",
];

const CAPABILITIES = [
  { title: "Commercial", desc: "Fast-turnaround, high-polish visuals built for brand campaigns." },
  { title: "Wedding Films", desc: "Cinematic coverage of the full day — highlights and full-length." },
  { title: "Sports & Movement", desc: "High-energy tracking shots, slow motion, and tight-cut coverage." },
  { title: "Narrative", desc: "Handheld, observational coverage built around character." },
  { title: "Music Video", desc: "Concept-driven visuals built around the track." },
];

export default function HomePage() {
  return (
    <>
      <HeroVideo
        title="Muhzin Mohammed"
        tagline="Cinematographer"
        sources={[
          { src: "/videos/showreel.webm", type: "video/webm" },
          { src: "/videos/showreel.mp4", type: "video/mp4" },
        ]}
        poster="/images/hero-poster.jpg"
      />

      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <p className="font-display italic text-2xl md:text-3xl max-w-2xl text-bone leading-snug">
          Light is the only material I never run out of.
        </p>
        <p className="mt-6 max-w-xl text-dim leading-relaxed">
          Muhzin Mohammed is a cinematographer working across commercial, narrative,
          and music video production — building visual language from the ground up
          with directors, one frame at a time.
        </p>
      </section>

      {/* ————————————————————— WORK ————————————————————— */}
      <section id="work" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-8 pt-4">
          <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">
            Selected Work
          </h2>
        </div>

        <CinematicReel projects={projects} />

        <CinematographyMontage clips={montageClips} />
        <BehindTheFrame pairs={btsPairs} />
        <ShotGrid shots={shots} />

        <PortfolioIndex projects={projects} />
      </section>

      {/* ————————————————————— STUDIO ————————————————————— */}
      <section id="studio" className="max-w-5xl mx-auto px-6 md:px-10 pt-8 pb-28 scroll-mt-20">
        <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest mb-14">
          Studio
        </h2>

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

            <Reveal delay={0.2} className="pt-6">
              <h3 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim mb-4">
                Gear
              </h3>
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

      {/* ————————————————————— CAPABILITIES ————————————————————— */}
      <section id="capabilities" className="max-w-7xl mx-auto px-6 md:px-10 pb-28 scroll-mt-20">
        <Reveal>
          <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest mb-14">
            Capabilities
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={i * 0.05}
              className="bg-ink p-6 md:p-8 hover:bg-ink2 transition-colors"
            >
              <p className="font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-signal mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display font-bold text-xl text-bone mb-2">{cap.title}</h3>
              <p className="text-sm text-dim leading-relaxed">{cap.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————————————————————— CONTACT ————————————————————— */}
      <section id="contact" className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-28 scroll-mt-20">
        <Reveal>
          <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest mb-2">
            Have a story to tell?
          </h2>
          <p className="font-display italic text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-signal mb-6">
            Let&rsquo;s create it.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-dim mb-14 max-w-lg leading-relaxed">
            Available for commercial, wedding, sports, and narrative projects.
            Reach out directly — replies are usually within a day or two.
          </p>
        </Reveal>

        <Reveal delay={0.14} className="space-y-10 mb-16">
          <div className="group">
            <p className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-dim mb-2">
              Email
            </p>
            <a
              href="mailto:muhzinmzk4@gmail.com"
              className="inline-block font-display text-3xl sm:text-4xl md:text-5xl text-bone transition-colors hover:text-signal break-all sm:break-normal"
            >
              muhzinmzk4@gmail.com
              <span className="block h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
          <div className="group">
            <p className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-dim mb-2">
              WhatsApp
            </p>
            <a
              href="https://wa.me/919746010138"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-display text-3xl sm:text-4xl md:text-5xl text-bone transition-colors hover:text-signal"
            >
              +91 97460 10138
              <span className="block h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-dim mb-3">
            Availability
          </p>
          <p className="text-bone flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="rec-dot absolute inline-block h-2 w-2 rounded-full bg-signal" />
            </span>
            Currently taking on new commercial, wedding, sports, and narrative projects.
          </p>
        </Reveal>
      </section>
    </>
  );
}
