import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/cinematic-hero";
import { ListingCard } from "@/components/listing-card";
import { Reveal, DrawLine } from "@/components/reveal";
import { PropertyMedia } from "@/components/property-media";
import { getFeatured } from "@/data/listings";
import { stats, services, company } from "@/data/site";

export default function Home() {
  const featured = getFeatured();

  return (
    <>
      <CinematicHero />

      {/* Statement */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-gold">The Firm</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1] text-ink">
                A boutique brokerage built for owners and investors who expect the
                diligence of an institution and the attention of a partner.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-slate">
                From single storefronts to special-purpose campuses, Capital Group
                Commercial Realty advises across the {company.serviceArea} — pairing
                rigorous underwriting with a presentation standard usually reserved
                for the finest residential addresses.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold"
              >
                Our Approach
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-paper-line pt-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <div className="font-display text-4xl font-light text-ink sm:text-5xl">
                  {s.value}
                </div>
                <div className="eyebrow-sm mt-3 text-slate-soft">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="bg-paper-2/50 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-gold">Selected Portfolio</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-ink">
                  Properties of distinction
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Link href="/listings" className="btn-line text-ink">
                View All Properties
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.08}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-gold">Capabilities</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-tight text-ink">
                Full-service commercial advisory
              </h2>
              <p className="mt-6 text-slate">
                Four disciplines, one standard of care — engineered to move a
                transaction from first conversation to close.
              </p>
              <Link href="/services" className="btn-line mt-8 text-ink">
                Explore Services
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-px bg-paper-line sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.key} delay={i * 0.06}>
                  <div className="h-full bg-paper p-8 transition-colors hover:bg-paper-2/60">
                    <span className="font-display text-2xl text-gold">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-light text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {s.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach — cinematic dark band */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <PropertyMedia
          seed={7}
          index={3}
          image="/images/hero-firm.jpg"
          className="absolute inset-0 h-full w-full opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
          <div>
            <Reveal>
              <p className="eyebrow text-gold">The Difference</p>
              <h2 className="mt-8 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-light leading-[1.08]">
                We market commercial assets the way the finest properties deserve
                to be marketed.
              </h2>
              <div className="mt-8 max-w-lg">
                <DrawLine className="text-gold" />
              </div>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/75">
                Precise underwriting. Considered presentation. Genuine market
                relationships. Every listing is prepared with the discipline of a
                capital markets desk and the eye of a design studio.
              </p>
              <Link
                href="/contact"
                className="btn-line mt-10 border-paper/50 text-paper hover:border-gold hover:text-gold"
              >
                Start a Conversation
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
