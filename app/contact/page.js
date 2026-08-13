import Reveal from "@/components/Reveal";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 pt-36 pb-28">
      <Reveal>
        <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest mb-2">
          Have a story to tell?
        </h1>
        <h2 className="font-display italic text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-signal mb-6">
          Let&rsquo;s create it.
        </h2>
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
  );
}
