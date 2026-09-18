import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ListingsExplorer } from "@/components/listings-explorer";
import { listings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse commercial, mixed-use, and investment properties for sale and lease across the New York metropolitan area, represented by Capital Group Commercial Realty.",
};

export default function ListingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Commercial properties, curated."
        subtitle="Investment sales, mixed-use, retail, office, industrial, and special-purpose assets across the New York metropolitan area."
        seed={4}
        image="/images/hero-portfolio.jpg"
        size="sm"
      />
      <ListingsExplorer listings={listings} />
    </>
  );
}
