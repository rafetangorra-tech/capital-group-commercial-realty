import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Investment sales, leasing and tenant representation, investment advisory, and land & development services from Capital Group Commercial Realty.",
};

const process = [
  {
    step: "01",
    title: "Discovery & Underwriting",
    body: "We start with the asset and the objective — a rigorous broker opinion of value, a read on the market, and a clear recommendation.",
  },
  {
    step: "02",
    title: "Positioning & Preparation",
    body: "Materials, photography, and the offering narrative are prepared to a design standard that sets the property apart.",
  },
  {
    step: "03",
    title: "Marketing & Outreach",
    body: "Targeted, relationship-driven outreach plus broad market exposure to reach the right principals — quietly or openly.",
  },
  {
    step: "04",
    title: "Negotiation & Close",
    body: "We manage LOIs, diligence, and financing coordination through to a clean close, protecting your position at every step.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-service commercial advisory."
        subtitle="Four disciplines, one standard of care — from first valuation to final closing."
        seed={16}
        image="/images/hero-services.png"
      />

      {/* Services detail */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="space-y-px bg-paper-line">
          {services.map((s, i) => (
            <Reveal key={s.key}>
              <div className="grid gap-8 bg-paper py-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-1">
                  <span className="font-display text-4xl text-gold">0{i + 1}</span>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate">
                    {s.summary}
                  </p>
                </div>
                <div className="lg:col-span-6 lg:pl-8">
                  <ul className="space-y-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                        <span className="text-slate">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold">How We Work</p>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-light">
              A disciplined process, start to close
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="border-t border-ink-line pt-6">
                  <span className="font-display text-3xl text-gold-light">{p.step}</span>
                  <h3 className="mt-4 font-display text-xl font-light">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-16">
              <Link
                href="/contact"
                className="btn-line border-paper/50 text-paper hover:border-gold hover:text-gold"
              >
                Discuss Your Property
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
