/**
 * Listing data model + seed portfolio.
 *
 * The 1844 Lansdowne Avenue record mirrors Capital Group's real, public listing.
 * The remaining records use real addresses with illustrative sample economics —
 * clearly placeholder data to demonstrate the portfolio + detail experience.
 * Replace `image` fields with real photo paths under /public/images to swap in
 * photography; when absent, an art-directed placeholder plate renders.
 */

export type ListingStatus = "For Sale" | "For Lease" | "Under Contract" | "Sold";

export type PropertyType =
  | "Mixed Use"
  | "Retail"
  | "Office"
  | "Industrial"
  | "Multifamily"
  | "Special Purpose"
  | "Land";

export interface ListingSpec {
  squareFootage?: number;
  lotAcreage?: number;
  buildings?: number;
  units?: number;
  zoning?: string;
  buildingClass?: string;
  yearBuilt?: number;
  yearRenovated?: number;
  parkingSpaces?: number;
  tenancy?: string;
  groundLease?: string;
}

export interface Listing {
  slug: string;
  status: ListingStatus;
  featured?: boolean;
  /** Short marketing headline shown on the detail hero + cards */
  headline?: string;
  /** Optional accent tag e.g. "Opportunity Zone", "Class A · Turnkey" */
  tag?: string;

  address: string;
  city: string;
  state: string;
  zip: string;
  county?: string;
  neighborhood?: string;
  coordinates?: { lat: number; lng: number };

  price: number | null; // null => "Unpriced"
  /** For-lease rate label, e.g. "$32.00 / SF / Yr" */
  leaseRate?: string;

  propertyType: PropertyType;
  subTypes?: string[];

  spec: ListingSpec;

  /** Investment economics (for the valuation calculator defaults) */
  noi?: number;
  capRate?: number; // percent, e.g. 6.0

  description: string;
  highlights: string[];

  /** Number of gallery frames + a seed for the placeholder art plates */
  gallery: { count: number; seed: number };
  /** Optional real photo paths (public/). If set, used before placeholders. */
  images?: string[];

  daysOnMarket: number;
  updated: string; // ISO date

  brokerName?: string; // defaults to the firm broker
}

export const listings: Listing[] = [
  {
    slug: "1844-lansdowne-avenue-merrick-ny",
    status: "For Sale",
    featured: true,
    headline: "Modern Building with Parking · Zoning X · Possible Daycare",
    tag: "Prime Commercial / Mixed-Use",
    address: "1844 Lansdowne Avenue",
    city: "Merrick",
    state: "NY",
    zip: "11566",
    county: "Nassau County",
    neighborhood: "Off Sunrise Highway",
    coordinates: { lat: 40.6629, lng: -73.5515 },
    price: 4400000,
    propertyType: "Mixed Use",
    subTypes: ["Religious / Church", "School", "Special Purpose"],
    spec: {
      squareFootage: 9777,
      lotAcreage: 0.45,
      buildings: 3,
      zoning: "X (Business)",
      buildingClass: "A",
      parkingSpaces: 20,
      groundLease: "No",
      tenancy: "Vacant / Owner-User",
    },
    noi: 325000,
    capRate: 6.0,
    description:
      "PRIME COMMERCIAL / MIXED-USE OPPORTUNITY. Highly visible commercial property just off Sunrise Highway featuring a 20-car parking lot, new windows, stucco exterior, and a mezzanine with egress. Excellent exposure from the LIRR with convenient access from both sides of Sunrise Highway. Walking distance to the train station, shops, and local businesses. Business X zoning provides flexibility for a variety of commercial uses — excellent potential for daycare, professional office, retail, restaurant, or service-based business, subject to applicable approvals.",
    highlights: [
      "Business X zoning (Town of Hempstead, Nassau County) — retail, professional office, restaurant, and personal service uses",
      "Strong daycare potential; variance in process",
      "Mezzanine level of ~2,000 SF not included in stated square footage",
      "Large ADA bathrooms installed and operational",
      "Fire sprinklers and commercial fire-detection system installed",
      "Multiple separate entrances and exits for multiple uses",
      "Possible NOI at $325,000 — ~6 cap for the area",
      "Taxes ~$81,000 / yr · Insurance ~$18,000 / yr",
    ],
    gallery: { count: 6, seed: 12 },
    images: ["/images/lansdowne-1.jpg", "/images/lansdowne-2.jpg", "/images/lansdowne-3.jpg"],
    daysOnMarket: 9,
    updated: "2026-09-09",
  },
  {
    slug: "453-2nd-avenue-new-york-ny",
    status: "For Sale",
    featured: true,
    headline: "Gramercy Mixed-Use Corner with Retail Frontage",
    tag: "Prime Manhattan Corner",
    address: "453 2nd Avenue",
    city: "New York",
    state: "NY",
    zip: "10010",
    county: "New York County",
    neighborhood: "Gramercy / Kips Bay",
    coordinates: { lat: 40.7377, lng: -73.9797 },
    price: 6500000,
    propertyType: "Mixed Use",
    subTypes: ["Retail", "Multifamily"],
    spec: {
      squareFootage: 8100,
      lotAcreage: 0.05,
      buildings: 1,
      units: 8,
      zoning: "C1-9 / R8B",
      buildingClass: "B",
      yearBuilt: 1920,
      tenancy: "Multi-Tenant",
      groundLease: "No",
    },
    noi: 358000,
    capRate: 5.5,
    description:
      "A well-located mixed-use corner in the heart of Gramercy / Kips Bay, offering ground-floor retail beneath residential units with strong pedestrian exposure on Second Avenue. A rare opportunity to acquire a stabilized, income-producing asset in one of Manhattan's most consistently in-demand submarkets, with upside through lease-up and light repositioning.",
    highlights: [
      "Hard corner with excellent Second Avenue frontage",
      "Ground-floor retail plus residential units above",
      "Steps from the East Side Medical corridor and public transit",
      "Value-add potential through unit turnover and re-leasing",
      "Strong, resilient rental demand submarket",
    ],
    gallery: { count: 6, seed: 5 },
    images: ["/images/453-2nd-1.jpg", "/images/453-2nd-2.jpg", "/images/453-2nd-3.jpg"],
    daysOnMarket: 21,
    updated: "2026-09-04",
  },
  {
    slug: "52-16-roosevelt-avenue-woodside-ny",
    status: "For Sale",
    featured: true,
    headline: "Free-Standing Office / Medical Building Near Transit",
    tag: "Owner-User Office",
    address: "52-16 Roosevelt Avenue",
    city: "Woodside",
    state: "NY",
    zip: "11377",
    county: "Queens County",
    neighborhood: "Woodside",
    coordinates: { lat: 40.7455, lng: -73.9089 },
    price: 3950000,
    propertyType: "Office",
    subTypes: ["Medical Office", "Professional Office"],
    spec: {
      squareFootage: 11200,
      lotAcreage: 0.16,
      buildings: 1,
      zoning: "C2-3 / R6",
      buildingClass: "B",
      yearBuilt: 1985,
      yearRenovated: 2019,
      parkingSpaces: 12,
      tenancy: "Owner-User / Multi-Tenant",
    },
    noi: 245000,
    capRate: 6.2,
    description:
      "A flexible free-standing office building well suited to an owner-user or medical practice, positioned steps from the Roosevelt Avenue transit corridor and the 7 line. Renovated common areas, on-site parking, and dense surrounding population make this an efficient home for a professional practice or a stable multi-tenant hold.",
    highlights: [
      "Free-standing building with on-site parking",
      "Excellent access to the 7 train and bus lines",
      "Renovated 2019 — updated systems and common areas",
      "Suited to medical, professional office, or community use",
      "Dense, transit-oriented Queens submarket",
    ],
    gallery: { count: 5, seed: 8 },
    images: ["/images/roosevelt-1.jpg", "/images/roosevelt-2.jpg", "/images/roosevelt-3.jpg"],
    daysOnMarket: 34,
    updated: "2026-08-22",
  },
  {
    slug: "122-greenwich-avenue-goshen-ny",
    status: "For Sale",
    headline: "Class A Turnkey Office Campus",
    tag: "Class A · Turnkey",
    address: "122 Greenwich Avenue",
    city: "Goshen",
    state: "NY",
    zip: "10924",
    county: "Orange County",
    neighborhood: "Village of Goshen",
    coordinates: { lat: 41.4023, lng: -74.3243 },
    price: 6900000,
    propertyType: "Office",
    subTypes: ["Office", "Medical Office"],
    spec: {
      squareFootage: 42000,
      lotAcreage: 3.2,
      buildings: 2,
      zoning: "OB (Office Business)",
      buildingClass: "A",
      yearBuilt: 2004,
      parkingSpaces: 180,
      tenancy: "Multi-Tenant",
    },
    noi: 552000,
    capRate: 8.0,
    description:
      "A turnkey, Class A multi-tenant office campus in Orange County offering institutional-quality finishes, abundant surface parking, and a stabilized rent roll. A well-managed asset delivering durable cash flow with modest mark-to-market upside as leases roll.",
    highlights: [
      "Class A finishes across two professionally managed buildings",
      "Ample surface parking — 180 spaces",
      "Stabilized, diversified multi-tenant rent roll",
      "Strong in-place cash flow with roll-over upside",
      "Convenient Route 17 / I-84 access",
    ],
    gallery: { count: 6, seed: 15 },
    images: ["/images/goshen-1.jpg", "/images/goshen-2.jpg", "/images/goshen-3.jpg"],
    daysOnMarket: 47,
    updated: "2026-08-11",
  },
  {
    slug: "126-130-e-main-street-rochester-ny",
    status: "For Sale",
    headline: "The Granite Building — Historic Downtown Multifamily",
    tag: "Adaptive Reuse · Multifamily",
    address: "126-130 E Main Street",
    city: "Rochester",
    state: "NY",
    zip: "14604",
    county: "Monroe County",
    neighborhood: "Downtown Rochester",
    coordinates: { lat: 43.157, lng: -77.6088 },
    price: 8995000,
    propertyType: "Multifamily",
    subTypes: ["Multifamily", "Mixed Use"],
    spec: {
      squareFootage: 88000,
      lotAcreage: 0.34,
      buildings: 1,
      units: 62,
      zoning: "C-2 (Downtown)",
      buildingClass: "B",
      yearBuilt: 1893,
      yearRenovated: 2016,
      tenancy: "Multi-Tenant",
    },
    noi: 629000,
    capRate: 7.0,
    description:
      "A landmark adaptive-reuse conversion in the heart of downtown Rochester, blending restored historic character with modern residential systems. The Granite Building offers a diversified unit mix, ground-floor commercial space, and the kind of irreplaceable architecture that anchors long-term tenant demand.",
    highlights: [
      "Iconic 1893 landmark, fully converted in 2016",
      "62 residential units plus ground-floor commercial",
      "Restored historic detail with modern building systems",
      "Central business district location with walkable amenities",
      "Diversified, resilient income stream",
    ],
    gallery: { count: 6, seed: 27 },
    images: ["/images/rochester-1.jpg", "/images/rochester-2.jpg", "/images/rochester-3.jpg"],
    daysOnMarket: 52,
    updated: "2026-08-06",
  },
  {
    slug: "100-suffolk-avenue-stony-brook-ny",
    status: "For Sale",
    headline: "Special-Purpose Campus with Development Upside",
    tag: "Special Purpose",
    address: "100 Suffolk Avenue",
    city: "Stony Brook",
    state: "NY",
    zip: "11790",
    county: "Suffolk County",
    neighborhood: "Stony Brook",
    coordinates: { lat: 40.9257, lng: -73.1409 },
    price: null,
    propertyType: "Special Purpose",
    subTypes: ["Institutional", "Educational"],
    spec: {
      squareFootage: 73990,
      lotAcreage: 6.8,
      buildings: 4,
      zoning: "L (Institutional)",
      buildingClass: "B",
      yearBuilt: 1972,
      parkingSpaces: 210,
      tenancy: "Vacant / Owner-User",
    },
    description:
      "A rare special-purpose campus on nearly seven acres in Suffolk County, well suited to institutional, educational, medical, or community users — with meaningful redevelopment and repositioning optionality. Offered unpriced; contact the firm for the marketing package and guidance.",
    highlights: [
      "~74,000 SF across four buildings on 6.8 acres",
      "Institutional zoning with flexible use potential",
      "Substantial on-site parking",
      "Redevelopment / repositioning optionality",
      "Priced by guidance — offering memorandum on request",
    ],
    gallery: { count: 5, seed: 31 },
    images: ["/images/stonybrook-1.jpg", "/images/stonybrook-2.jpg", "/images/stonybrook-3.jpg"],
    daysOnMarket: 63,
    updated: "2026-07-27",
  },
  {
    slug: "3202-church-avenue-brooklyn-ny",
    status: "For Sale",
    headline: "Flatbush Retail with Opportunity-Zone Upside",
    tag: "Opportunity Zone",
    address: "3202 Church Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11226",
    county: "Kings County",
    neighborhood: "Flatbush",
    coordinates: { lat: 40.6503, lng: -73.9513 },
    price: null,
    propertyType: "Retail",
    subTypes: ["Retail", "Mixed Use"],
    spec: {
      squareFootage: 6400,
      lotAcreage: 0.06,
      buildings: 1,
      units: 4,
      zoning: "C4-3",
      buildingClass: "C",
      yearBuilt: 1931,
      tenancy: "Multi-Tenant",
    },
    description:
      "A corner retail-and-residential asset on a busy Flatbush commercial stretch, sited within a designated Opportunity Zone. Strong daily foot traffic, flexible commercial zoning, and tax-advantaged reinvestment potential make this a compelling value-add or long-term hold. Offered unpriced.",
    highlights: [
      "Located within a designated Opportunity Zone",
      "High-traffic Church Avenue retail corridor",
      "Ground-floor retail with residential above",
      "Flexible C4-3 commercial zoning",
      "Value-add through re-leasing and light renovation",
    ],
    gallery: { count: 5, seed: 41 },
    images: ["/images/flatbush-1.jpg", "/images/flatbush-2.jpg", "/images/flatbush-3.jpg"],
    daysOnMarket: 28,
    updated: "2026-08-30",
  },
  {
    slug: "25-industrial-loop-bethpage-ny",
    status: "For Lease",
    headline: "Flex Industrial / Warehouse with Drive-In Loading",
    tag: "Flex · Industrial",
    address: "25 Industrial Loop",
    city: "Bethpage",
    state: "NY",
    zip: "11714",
    county: "Nassau County",
    neighborhood: "Bethpage Industrial Park",
    coordinates: { lat: 40.7457, lng: -73.4832 },
    price: null,
    leaseRate: "$18.50 / SF / Yr NNN",
    propertyType: "Industrial",
    subTypes: ["Warehouse", "Flex"],
    spec: {
      squareFootage: 24000,
      lotAcreage: 1.1,
      buildings: 1,
      zoning: "IND-G",
      buildingClass: "B",
      yearBuilt: 1998,
      parkingSpaces: 30,
      tenancy: "Single / Divisible",
    },
    description:
      "Efficient flex-industrial space in the Bethpage Industrial Park, offering clear-height warehouse, drive-in loading, and buildout-ready office. Divisible to suit; available now for lease on a NNN basis. Ideal for distribution, light manufacturing, or service-based operators seeking a central Nassau location.",
    highlights: [
      "Clear-height warehouse with drive-in loading",
      "Divisible to suit — flexible demising options",
      "Buildout-ready office component",
      "Central Nassau access to the LIE and Seaford-Oyster Bay Expwy",
      "Offered NNN — see the flyer for terms",
    ],
    gallery: { count: 4, seed: 19 },
    images: ["/images/bethpage-1.jpg", "/images/bethpage-2.jpg", "/images/bethpage-3.jpg"],
    daysOnMarket: 15,
    updated: "2026-09-03",
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getFeatured(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function getSimilar(slug: string, limit = 4): Listing[] {
  const current = getListing(slug);
  if (!current) return listings.slice(0, limit);
  const scored = listings
    .filter((l) => l.slug !== slug)
    .map((l) => ({
      l,
      score:
        (l.propertyType === current.propertyType ? 2 : 0) +
        (l.state === current.state ? 1 : 0) +
        (l.county && l.county === current.county ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.l);
}

export const propertyTypes: PropertyType[] = [
  "Mixed Use",
  "Retail",
  "Office",
  "Industrial",
  "Multifamily",
  "Special Purpose",
  "Land",
];
