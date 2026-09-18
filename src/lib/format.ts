import type { Listing } from "@/data/listings";

export function formatPrice(price: number | null): string {
  if (price === null) return "Unpriced";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCurrency(n: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatSqft(n?: number): string | null {
  if (!n) return null;
  return `${formatNumber(n)} SF`;
}

export function priceLabel(l: Listing): string {
  if (l.status === "For Lease" && l.leaseRate) return l.leaseRate;
  return formatPrice(l.price);
}

export function pricePerSqft(l: Listing): string | null {
  if (l.price === null || !l.spec.squareFootage) return null;
  const psf = l.price / l.spec.squareFootage;
  return `${formatCurrency(psf, 0)} / SF`;
}

export function cityLine(l: Listing): string {
  return `${l.city}, ${l.state} ${l.zip}`;
}

export function formatUpdated(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
