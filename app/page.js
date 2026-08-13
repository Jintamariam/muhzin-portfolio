import HeroVideo from "@/components/HeroVideo";
import CinematicReel from "@/components/CinematicReel";
import CinematographyMontage from "@/components/CinematographyMontage";
import BehindTheFrame from "@/components/BehindTheFrame";
import ShotGrid from "@/components/ShotGrid";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { montageClips } from "@/lib/data/montage";
import { btsPairs } from "@/lib/data/bts";
import { shots } from "@/lib/data/shots";

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

      <section id="selected-work" className="max-w-7xl mx-auto px-6 md:px-10 pb-8 pt-4 scroll-mt-24">
        <div className="flex items-end justify-between">
          <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">
            Selected Work
          </h2>
          <Link
            href="/portfolio"
            className="font-mono font-semibold text-xs uppercase tracking-[0.15em] text-bone hover:text-signal transition-colors"
          >
            View all →
          </Link>
        </div>
      </section>

      <CinematicReel projects={projects} />

      <CinematographyMontage clips={montageClips} />
      <BehindTheFrame pairs={btsPairs} />
      <ShotGrid shots={shots} />
    </>
  );
}
