import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal, DrawLine } from "@/components/reveal";
import { PropertyMedia } from "@/components/property-media";
import { stats, company } from "@/data/site";

export const metadata: Metadata = {
  title: "The Firm",
  description:
    "Capital Group Commercial Realty is a boutique commercial brokerage combining institutional underwriting with a presentation standard reserved for the finest addresses.",
};

const values = [
  {
    title: "Underwriting First",
    body: "Every engagement begins with the numbers. We price to the market, not to the pitch — so owners make decisions with clarity and buyers move with conviction.",
  },
  {
    title: "Considered Presentation",
    body: "A commercial asset deserves the same care as a trophy residence. We prepare each listing with editorial photography, clean materials, and a story that carries.",
  },
  {
    title: "Real Relationships",
    body: "Deals close on trust. Decades of relationships across owners, tenants, lenders, and investors let us find the right counterparty, quietly and quickly.",
  },
  {
    title: "Boutique Attention",
    body: "You work directly with the principals of the firm — not a call center. Fewer clients, deeper focus, and accountability from first call to closing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Firm"
        title="Institutional discipline. Boutique attention."
        subtitle={`Capital Group Commercial Realty advises owners and investors across the ${company.serviceArea}.`}
        seed={9}
        image="/images/hero-firm.jpg"
      />

      {/* Intro */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold">Our Story</p>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-tight text-ink">
                Founded on a simple belief: commercial real estate should be
                represented as beautifully as it is analyzed.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="space-y-6 text-lg leading-relaxed text-slate">
                <p>
                  Led by broker-owner {company.broker.name}, Capital Group Commercial
                  Realty is a boutique firm built around a single standard of care.
                  We represent commercial, mixed-use, and investment assets — from
                  neighborhood storefronts to special-purpose campuses — across
                  Nassau, Suffolk, and the five boroughs.
                </p>
                <p>
                  Where larger shops treat listings as inventory, we treat each one
                  as a mandate. That means disciplined underwriting, marketing built
                  to a design standard, and the kind of direct, principal-level
                  attention that keeps a transaction moving.
                </p>
                <p>
                  The result is a smaller book of work, executed exceptionally well —
                  and clients who come back.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

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

      {/* Values */}
      <section className="bg-paper-2/50 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold">What Guides Us</p>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-ink">
              Four principles behind every engagement
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div>
                  <span className="font-display text-3xl text-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-light text-ink">
                    {v.title}
                  </h3>
                  <div className="my-5 max-w-xs">
                    <DrawLine className="text-paper-line" />
                  </div>
                  <p className="leading-relaxed text-slate">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market band */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <PropertyMedia
          seed={13}
          index={1}
          image="/images/hero-portfolio.jpg"
          className="absolute inset-0 h-full w-full opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
          <Reveal>
            <p className="eyebrow text-gold">The Market</p>
            <h2 className="mt-8 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.08]">
              Deep in the {company.serviceArea} — from Long Island to the five
              boroughs and the Hudson Valley.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
              Local knowledge is the whole game in commercial real estate. We know
              the corridors, the zoning quirks, and the owners — because we work
              here every day.
            </p>
            <Link
              href="/listings"
              className="btn-line mt-10 border-paper/50 text-paper hover:border-gold hover:text-gold"
            >
              Explore the Portfolio
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
