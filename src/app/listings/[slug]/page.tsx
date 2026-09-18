import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  Clock,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import { getListing, getSimilar, listings } from "@/data/listings";
import { company } from "@/data/site";
import {
  priceLabel,
  cityLine,
  pricePerSqft,
  formatUpdated,
} from "@/lib/format";
import { Gallery } from "@/components/gallery";
import { DetailsGrid } from "@/components/details-grid";
import { ValuationCalculator } from "@/components/valuation-calculator";
import { LocationMap } from "@/components/location-map";
import { InquiryForm } from "@/components/inquiry-form";
import { ListingActions } from "@/components/listing-actions";
import { ListingCard } from "@/components/listing-card";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return { title: "Property Not Found" };
  return {
    title: `${l.address}, ${l.city} ${l.state}`,
    description: `${l.propertyType} · ${priceLabel(l)}. ${l.description.slice(0, 150)}…`,
  };
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const similar = getSimilar(slug);
  const psf = pricePerSqft(listing);
  const brokerName = listing.brokerName ?? company.broker.name;

  return (
    <article className="pt-[92px]">
      {/* Top bar */}
      <div className="mx-auto max-w-[1400px] px-5 pb-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/listings"
            className="group inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All Properties
          </Link>
          <ListingActions slug={listing.slug} title={listing.address} />
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow-sm text-gold">{listing.status}</span>
              <span className="text-slate-soft">·</span>
              <span className="eyebrow-sm text-slate-soft">{listing.propertyType}</span>
            </div>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-ink">
              {listing.address}
            </h1>
            <p className="mt-2 text-lg text-slate">{cityLine(listing)}</p>
          </div>
          <div className="text-right">
            <div className="font-display text-4xl font-light text-ink sm:text-5xl">
              {priceLabel(listing)}
            </div>
            {psf && <div className="mt-1 text-sm text-slate-soft">{psf}</div>}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Gallery
          seed={listing.gallery.seed}
          count={listing.gallery.count}
          images={listing.images}
          label={listing.address}
        />

        {/* Meta strip */}
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-paper-line py-4 text-sm text-slate">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" />
            {listing.daysOnMarket} days on market
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" />
            Updated {formatUpdated(listing.updated)}
          </span>
          {listing.neighborhood && (
            <span className="text-slate-soft">{listing.neighborhood}</span>
          )}
          {listing.county && <span className="text-slate-soft">{listing.county}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-3 lg:gap-16">
        {/* Main column */}
        <div className="space-y-16 lg:col-span-2">
          <section>
            <h2 className="eyebrow text-gold">Property Details</h2>
            <div className="mt-6">
              <DetailsGrid listing={listing} />
            </div>
          </section>

          <section>
            <h2 className="eyebrow text-gold">Marketing Description</h2>
            {listing.headline && (
              <p className="mt-6 font-display text-2xl font-light leading-snug text-ink">
                {listing.headline}
              </p>
            )}
            <p className="mt-5 text-lg leading-relaxed text-slate">
              {listing.description}
            </p>
          </section>

          <section>
            <h2 className="eyebrow text-gold">Investment Highlights</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {listing.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-slate">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="eyebrow text-gold">Run the Numbers</h2>
            <div className="mt-6">
              <ValuationCalculator
                defaultPrice={listing.price ?? 4000000}
                defaultNoi={listing.noi}
              />
            </div>
          </section>

          {listing.coordinates && (
            <section>
              <h2 className="eyebrow text-gold">Location</h2>
              <div className="mt-6">
                <LocationMap
                  lat={listing.coordinates.lat}
                  lng={listing.coordinates.lng}
                  label={listing.address}
                  address={`${listing.address}, ${cityLine(listing)}`}
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            {/* Broker card */}
            <div className="border border-paper-line bg-paper-2/40 p-6">
              <p className="eyebrow-sm text-slate-soft">Listing Advisor</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-lg text-gold">
                  {initials(brokerName)}
                </span>
                <div>
                  <p className="font-display text-xl text-ink">{brokerName}</p>
                  <p className="text-sm text-slate">{company.broker.title}</p>
                  <p className="eyebrow-sm mt-1 text-slate-soft">
                    Lic. {company.broker.license}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3 border border-paper-line px-4 py-3 text-sm text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent(
                    "Inquiry — " + listing.address,
                  )}`}
                  className="flex items-center gap-3 border border-paper-line px-4 py-3 text-sm text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  Email the Advisor
                </a>
              </div>
            </div>

            {/* Inquiry */}
            <div className="mt-4 border border-paper-line p-6">
              <p className="font-display text-2xl font-light text-ink">
                Request Information
              </p>
              <p className="mt-2 text-sm text-slate">
                Offering memorandum, financials, and tours available on request.
              </p>
              <div className="mt-6">
                <InquiryForm
                  propertyAddress={`${listing.address}, ${cityLine(listing)}`}
                  propertySlug={listing.slug}
                  defaultType="Request Information"
                  compact
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="border-t border-paper-line bg-paper-2/40 py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
                Similar Properties
              </h2>
              <Link href="/listings" className="btn-line text-ink">
                View All
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((l, i) => (
                <Reveal key={l.slug} delay={i * 0.06}>
                  <ListingCard listing={l} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
