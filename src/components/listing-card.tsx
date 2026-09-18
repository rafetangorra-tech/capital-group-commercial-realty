import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Listing } from "@/data/listings";
import { PropertyMedia } from "@/components/property-media";
import { priceLabel, cityLine, formatSqft } from "@/lib/format";

const statusStyles: Record<Listing["status"], string> = {
  "For Sale": "text-gold",
  "For Lease": "text-gold",
  "Under Contract": "text-slate-soft",
  Sold: "text-slate-soft",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const sqft = formatSqft(listing.spec.squareFootage);
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        <PropertyMedia
          seed={listing.gallery.seed}
          image={listing.images?.[0]}
          alt={listing.address}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        <div className="absolute left-0 top-0 flex items-center gap-2 p-4">
          <span
            className={`eyebrow-sm bg-ink/70 px-3 py-1.5 backdrop-blur-sm ${statusStyles[listing.status]}`}
          >
            {listing.status}
          </span>
        </div>

        {listing.tag && (
          <div className="absolute bottom-0 left-0 p-4">
            <span className="eyebrow-sm text-paper/90">{listing.tag}</span>
          </div>
        )}

        <div className="absolute bottom-0 right-0 flex h-11 w-11 translate-y-2 items-center justify-center bg-gold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow-sm text-slate-soft">{listing.propertyType}</p>
        <h3 className="mt-3 font-display text-2xl font-light leading-tight text-ink transition-colors duration-300 group-hover:text-gold">
          {listing.address}
        </h3>
        <p className="mt-1 text-sm text-slate">{cityLine(listing)}</p>

        <div className="mt-5 flex items-center justify-between border-t border-paper-line pt-4">
          <span className="font-display text-xl text-ink">{priceLabel(listing)}</span>
          {sqft && <span className="text-sm text-slate-soft">{sqft}</span>}
        </div>
      </div>
    </Link>
  );
}
