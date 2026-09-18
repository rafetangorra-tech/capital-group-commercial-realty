import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { team, company } from "@/data/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the advisors of Capital Group Commercial Realty, led by broker-owner Adam Broder.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people behind the practice."
        subtitle="Principal-level attention on every assignment — you work directly with the advisors representing your property."
        seed={22}
        image="/images/hero-team.jpg"
      />

      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group">
                <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-ink">
                  <div className="grain absolute inset-0 opacity-20" />
                  <span className="font-display text-7xl font-light text-gold/80">
                    {initials(member.name)}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-6">
                    <p className="eyebrow-sm text-gold">{member.focus}</p>
                  </div>
                </div>
                <div className="pt-6">
                  <h2 className="font-display text-2xl font-light text-ink">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate">{member.title}</p>
                  <p className="eyebrow-sm mt-1 text-slate-soft">
                    License {member.license}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate">
                    {member.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-2 text-ink transition-colors hover:text-gold"
                    >
                      <Phone className="h-3.5 w-3.5 text-gold" />
                      {member.phone}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-ink transition-colors hover:text-gold"
                    >
                      <Mail className="h-3.5 w-3.5 text-gold" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-paper-line pt-16 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
                Interested in joining the firm?
              </h2>
              <p className="mt-3 max-w-xl text-slate">
                We&rsquo;re always glad to speak with experienced commercial agents who
                share our standard of care.
              </p>
            </div>
            <Link href="/contact" className="btn-solid shrink-0">
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
