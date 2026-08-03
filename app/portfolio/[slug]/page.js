import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import Gallery from "@/components/Gallery";
import AutoplayVideoTile from "@/components/AutoplayVideoTile";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.logline,
    openGraph: { title: project.title, description: project.logline, images: [project.poster] },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article>
      {/* Project hero — autoplays on load, same as the site hero */}
      <section className="relative h-[80svh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={project.poster}
        >
          {project.video.map((src) => (
            <source key={src.src} src={src.src} type={src.type} />
          ))}
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
        <Reveal className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
            {project.category} — {project.year}
          </p>
          <h1 className="font-display font-medium text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tightest">
            {project.title}
          </h1>
        </Reveal>
      </section>

      <Reveal as="section" className="max-w-4xl mx-auto px-6 md:px-10 py-20">
        <p className="text-dim leading-relaxed text-lg">{project.logline}</p>
      </Reveal>

      <Gallery gallery={project.gallery} />

      {/* Technical breakdown — camera-HUD spec sheet, consistent with the grid badges */}
      <Reveal as="section" className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-6">
          Technical
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
          {Object.entries({
            Camera: project.specs.camera,
            Lens: project.specs.lens,
            "Frame Rate": `${project.specs.fps}fps`,
            Aperture: project.specs.aperture,
          }).map(([label, value]) => (
            <div key={label} className="bg-ink p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim mb-1">
                {label}
              </p>
              <p className="font-body text-bone">{value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Credits */}
      <Reveal as="section" className="max-w-4xl mx-auto px-6 md:px-10 pb-24">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-6">
          Credits
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(project.credits).map(([role, name]) => (
            <div key={role} className="flex justify-between border-b border-hairline pb-2">
              <dt className="text-dim capitalize">{role}</dt>
              <dd className="text-bone">{name}</dd>
            </div>
          ))}
          <div className="flex justify-between border-b border-hairline pb-2">
            <dt className="text-dim">Director of Photography</dt>
            <dd className="text-bone">Muhzin Mohammed</dd>
          </div>
        </dl>
      </Reveal>

      {/* Related projects */}
      {related.length > 0 && (
        <Reveal as="section" className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-6">
            Related
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block relative aspect-[16/9] overflow-hidden bg-ink2"
              >
                <AutoplayVideoTile
                  sources={p.video}
                  poster={p.poster}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-signal mb-1">
                    {p.category}
                  </p>
                  <p className="font-display text-xl text-bone">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </article>
  );
}
