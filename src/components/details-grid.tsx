import type { Listing } from "@/data/listings";
import { formatNumber, formatCurrency, pricePerSqft } from "@/lib/format";

export function DetailsGrid({ listing }: { listing: Listing }) {
  const s = listing.spec;
  // Going-in cap rate: derive from NOI ÷ price so it agrees with the calculator;
  // fall back to the stored area cap when price is withheld.
  const capRate =
    listing.noi && listing.price
      ? (listing.noi / listing.price) * 100
      : listing.capRate;
  const rows: [string, string | null][] = [
    ["Property Type", listing.propertyType],
    ["Sub Type", listing.subTypes?.join(" · ") ?? null],
    ["Square Footage", s.squareFootage ? `${formatNumber(s.squareFootage)} SF` : null],
    ["Lot Size", s.lotAcreage ? `${s.lotAcreage} AC` : null],
    ["Buildings", s.buildings ? String(s.buildings) : null],
    ["Units", s.units ? String(s.units) : null],
    ["Zoning", s.zoning ?? null],
    ["Building Class", s.buildingClass ?? null],
    ["Year Built", s.yearBuilt ? String(s.yearBuilt) : null],
    ["Year Renovated", s.yearRenovated ? String(s.yearRenovated) : null],
    ["Parking", s.parkingSpaces ? `${s.parkingSpaces} spaces` : null],
    ["Tenancy", s.tenancy ?? null],
    ["Ground Lease", s.groundLease ?? null],
    ["Cap Rate", capRate ? `${capRate.toFixed(2)}%` : null],
    ["NOI", listing.noi ? formatCurrency(listing.noi) : null],
    ["Price / SF", pricePerSqft(listing)],
  ];
  const shown = rows.filter(([, v]) => v);

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-3">
      {shown.map(([label, value]) => (
        <div key={label} className="bg-paper p-5">
          <dt className="eyebrow-sm text-slate-soft">{label}</dt>
          <dd className="mt-2 font-display text-lg text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
