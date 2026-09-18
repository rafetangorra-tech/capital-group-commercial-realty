import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/inquiry-form";
import { LocationMap } from "@/components/location-map";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Capital Group Commercial Realty to discuss selling, leasing, or acquiring commercial property across the New York metropolitan area.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your property."
        subtitle="Whether you're selling, leasing, or looking to acquire — a direct conversation is the best place to start."
        seed={28}
        image="/images/hero-contact.jpg"
        size="sm"
      />

      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold">The Firm</p>
            <h2 className="mt-6 font-display text-3xl font-light text-ink sm:text-4xl">
              {company.name}
            </h2>

            <div className="mt-10 space-y-6">
              <ContactRow icon={<MapPin className="h-5 w-5 text-gold" />} label="Office">
                <a href={company.mapsHref} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                </a>
              </ContactRow>
              <ContactRow icon={<Phone className="h-5 w-5 text-gold" />} label="Phone">
                <a href={company.phoneHref} className="hover:text-gold">
                  {company.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail className="h-5 w-5 text-gold" />} label="Email">
                <a href={`mailto:${company.email}`} className="hover:text-gold">
                  {company.email}
                </a>
              </ContactRow>
              <ContactRow icon={<Clock className="h-5 w-5 text-gold" />} label="Hours">
                Monday – Friday · 9:00 AM – 6:00 PM
                <br />
                Weekends by appointment
              </ContactRow>
            </div>

            <div className="mt-10">
              <p className="eyebrow-sm text-slate-soft">Broker of Record</p>
              <p className="mt-2 font-display text-lg text-ink">
                {company.broker.name} · {company.broker.title}
              </p>
              <p className="text-sm text-slate-soft">License {company.broker.license}</p>
            </div>

            <div className="mt-10">
              <LocationMap
                lat={40.7223}
                lng={-73.5943}
                label={company.name}
                address={`${company.address.line1}, ${company.address.line2}`}
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="border border-paper-line p-8 sm:p-10">
              <p className="eyebrow text-gold">Send a Message</p>
              <h3 className="mt-4 font-display text-2xl font-light text-ink">
                Tell us how we can help.
              </h3>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="eyebrow-sm text-slate-soft">{label}</p>
        <p className="mt-1.5 leading-relaxed text-ink">{children}</p>
      </div>
    </div>
  );
}
