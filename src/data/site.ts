/**
 * Company + site configuration.
 *
 * Public brokerage details (name, broker, license, phone, office) are sourced
 * from Capital Group Commercial Realty's own public listing record. Email and a
 * few marketing lines are placeholders — swap freely once finalized.
 */

export const company = {
  name: "Capital Group Commercial Realty",
  shortName: "Capital Group",
  tagline: "Commercial Real Estate, Distinctively Represented",
  descriptor: "Commercial · Investment · Advisory",
  broker: {
    name: "Adam Broder",
    title: "Broker / Owner",
    license: "NY 10991237972",
  },
  phone: "(516) 426-8931",
  phoneHref: "tel:+15164268931",
  email: "info@capitalgroupcr.com",
  address: {
    line1: "70 Charles Lindbergh Boulevard",
    line2: "Uniondale, NY 11553",
    city: "Uniondale",
    state: "NY",
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=70+Charles+Lindbergh+Boulevard+Uniondale+NY+11553",
  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
  },
  serviceArea: "New York Metropolitan Area",
} as const;

export const primaryNav = [
  { label: "Portfolio", href: "/listings" },
  { label: "Services", href: "/services" },
  { label: "Firm", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export const heroWords = [
  "THE RIGHT ADDRESS",
  "THE RIGHT NUMBERS",
  "THE RIGHT PARTNER",
] as const;

export const stats = [
  { value: "$1.2B+", label: "Transacted Value" },
  { value: "40 Yrs", label: "Combined Experience" },
  { value: "300+", label: "Assets Represented" },
  { value: "NY Metro", label: "Focused Market" },
] as const;

export const services = [
  {
    key: "sales",
    title: "Investment Sales",
    summary:
      "Disposition and acquisition advisory for stabilized and value-add commercial assets — priced with discipline, marketed with reach.",
    points: [
      "Broker opinion of value & pricing strategy",
      "Confidential & open-market disposition",
      "1031 exchange & reinvestment guidance",
    ],
  },
  {
    key: "leasing",
    title: "Leasing & Tenant Representation",
    summary:
      "Retail, office, and industrial leasing on both sides of the table — from single storefronts to multi-tenant repositioning.",
    points: [
      "Landlord representation & lease-up",
      "Tenant site selection & negotiation",
      "Renewal & restructuring strategy",
    ],
  },
  {
    key: "advisory",
    title: "Investment Advisory",
    summary:
      "Underwriting, market intelligence, and hold/sell analysis that turns a property decision into an investment decision.",
    points: [
      "Cash-flow & cap-rate underwriting",
      "Highest-and-best-use analysis",
      "Portfolio review & repositioning",
    ],
  },
  {
    key: "development",
    title: "Land & Development",
    summary:
      "Site identification, zoning insight, and disposition for development-ready and special-purpose opportunities.",
    points: [
      "Zoning & entitlement context",
      "Development site sourcing",
      "Special-purpose & mixed-use assets",
    ],
  },
] as const;

export const team = [
  {
    name: "Adam Broder",
    title: "Broker / Owner",
    license: "NY 10991237972",
    email: "adam@capitalgroupcr.com",
    phone: "(516) 426-8931",
    focus: "Investment Sales · Mixed-Use · Special Purpose",
    bio: "Broker-owner of Capital Group Commercial Realty, Adam leads the firm's investment sales and advisory practice across the New York metropolitan area, with a focus on mixed-use, retail, and special-purpose assets throughout Nassau, Suffolk, and the outer boroughs.",
    seed: 21,
  },
  {
    name: "Senior Advisor",
    title: "Investment Sales Advisor",
    license: "NY —",
    email: "advisory@capitalgroupcr.com",
    phone: "(516) 426-8931",
    focus: "Retail · Office Leasing",
    bio: "Placeholder advisor profile — replace with a real team member. Advises owners and tenants on retail and office assignments, from storefront leasing to multi-tenant repositioning.",
    seed: 34,
  },
  {
    name: "Capital Markets Analyst",
    title: "Underwriting & Research",
    license: "—",
    email: "research@capitalgroupcr.com",
    phone: "(516) 426-8931",
    focus: "Underwriting · Market Research",
    bio: "Placeholder analyst profile — replace with a real team member. Supports the brokerage team with underwriting, market comps, and hold/sell analysis on active assignments.",
    seed: 47,
  },
] as const;
