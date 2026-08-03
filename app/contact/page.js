import Reveal from "@/components/Reveal";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 pt-36 pb-28">
      <Reveal>
        <h1 className="font-display font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest mb-6">
          Contact
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-dim mb-14 max-w-lg leading-relaxed">
          Available for commercial, narrative, and music video projects.
          Reach out directly — replies are usually within a day or two.
        </p>
      </Reveal>

      <Reveal delay={0.14} className="grid sm:grid-cols-2 gap-8 mb-16">
        <div className="group">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-dim mb-2">
            Email
          </p>
          <a
            href="mailto:muhzinmo@gmail.com"
            className="inline-block font-display text-2xl md:text-3xl text-bone transition-colors hover:text-signal"
          >
            muhzinmo@gmail.com
            <span className="block h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
        <div className="group">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-dim mb-2">
            Phone
          </p>
          {/* Placeholder — original number was incomplete, fill in the real one */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="inline-block font-display text-2xl md:text-3xl text-bone transition-colors hover:text-signal"
          >
            +91 97XX XXX XX8
            <span className="block h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-dim mb-3">
          Availability
        </p>
        <p className="text-bone flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="rec-dot absolute inline-block h-2 w-2 rounded-full bg-signal" />
          </span>
          Booking projects from Q3 2026 onward.
        </p>
      </Reveal>

      <Reveal delay={0.26} className="mt-14 flex gap-6">
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-dim hover:text-bone transition-colors">
          Instagram
        </a>
        <a href="https://vimeo.com/" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-dim hover:text-bone transition-colors">
          Vimeo
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-dim hover:text-bone transition-colors">
          LinkedIn
        </a>
      </Reveal>
    </section>
  );
}
