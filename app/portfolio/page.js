import Link from "next/link";
import CinematicReel from "@/components/CinematicReel";
import { projects } from "@/lib/data/projects";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-8">
        <h1 className="font-display font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest">
          Portfolio
        </h1>
      </section>

      <CinematicReel projects={projects} />

      {/* Plain scannable index — same data as the reel above, for anyone
          who wants to jump straight to a title rather than scroll the reel */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-28">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-6">
          Index
        </h2>
        <ul className="divide-y divide-hairline border-t border-b border-hairline">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="group flex items-baseline justify-between gap-4 py-4 hover:text-signal transition-colors"
              >
                <span className="font-display text-xl md:text-2xl text-bone group-hover:text-signal transition-colors">
                  {p.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim shrink-0">
                  {p.category} — {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
