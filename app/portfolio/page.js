import CinematicReel from "@/components/CinematicReel";
import PortfolioIndex from "@/components/PortfolioIndex";
import { projects } from "@/lib/data/projects";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-8">
        <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest">
          Portfolio
        </h1>
      </section>

      <CinematicReel projects={projects} />

      {/* Plain scannable index — same data as the reel above, filterable by
          category, for anyone who wants to jump straight to a title rather
          than scroll the reel */}
      <PortfolioIndex projects={projects} />
    </>
  );
}
