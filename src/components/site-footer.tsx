import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { company, primaryNav, services } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="grain absolute inset-0 opacity-20" />

      {/* CTA band */}
      <div className="relative border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
          <p className="eyebrow text-gold">Begin a Conversation</p>
          <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl">
              Every asset has a story. Let us help you write the next chapter.
            </h2>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 whitespace-nowrap border border-paper/40 px-8 py-4 text-sm uppercase tracking-[0.22em] transition-colors hover:border-gold hover:text-gold"
            >
              Contact the Firm
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Logo href={null} />
          <p className="max-w-xs text-sm leading-relaxed text-slate-soft">
            Boutique commercial real estate advisory across the {company.serviceArea}.
            Institutional discipline, personal representation.
          </p>
        </div>

        <div>
          <p className="eyebrow-sm text-gold/70">Navigate</p>
          <ul className="mt-6 space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-paper/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow-sm text-gold/70">Services</p>
          <ul className="mt-6 space-y-3">
            {services.map((s) => (
              <li key={s.key}>
                <Link
                  href="/services"
                  className="text-sm text-paper/80 transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow-sm text-gold/70">Office</p>
          <address className="mt-6 space-y-3 text-sm not-italic text-paper/80">
            <p>
              {company.address.line1}
              <br />
              {company.address.line2}
            </p>
            <p>
              <a href={company.phoneHref} className="transition-colors hover:text-gold">
                {company.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-gold"
              >
                {company.email}
              </a>
            </p>
            <p className="pt-2 text-slate-soft">
              {company.broker.name}, {company.broker.title}
              <br />
              License {company.broker.license}
            </p>
          </address>
        </div>
      </div>

      {/* Legal strip */}
      <div className="relative border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
          <p className="text-xs leading-relaxed text-slate-soft">
            © {new Date().getFullYear()} {company.name}. All rights reserved. All
            information is deemed reliable but not guaranteed and is subject to errors,
            omissions, prior sale, or withdrawal without notice. Prospective purchasers
            and tenants should verify all information independently. Equal Housing
            Opportunity.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-soft">
            <span>Licensed Real Estate Broker · State of New York</span>
            <a href="#" className="transition-colors hover:text-gold">
              Fair Housing Notice
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Standard Operating Procedures
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
