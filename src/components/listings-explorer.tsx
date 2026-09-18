"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Rows3, Search, SlidersHorizontal, X } from "lucide-react";
import type { Listing, PropertyType } from "@/data/listings";
import { propertyTypes } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { priceLabel, cityLine, formatSqft, formatNumber } from "@/lib/format";

type SortKey = "featured" | "price-desc" | "price-asc" | "size-desc" | "newest";
type StatusFilter = "All" | "For Sale" | "For Lease";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-desc", label: "Price · High to Low" },
  { key: "price-asc", label: "Price · Low to High" },
  { key: "size-desc", label: "Largest" },
  { key: "newest", label: "Most Recent" },
];

export function ListingsExplorer({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<Set<PropertyType>>(new Set());
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"card" | "table">("card");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleType = (t: PropertyType) => {
    setTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  const clearAll = () => {
    setQuery("");
    setTypes(new Set());
    setStatus("All");
    setSort("featured");
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = listings.filter((l) => {
      if (types.size && !types.has(l.propertyType)) return false;
      if (status === "For Sale" && !(l.status === "For Sale" || l.status === "Under Contract"))
        return false;
      if (status === "For Lease" && l.status !== "For Lease") return false;
      if (q) {
        const hay = `${l.address} ${l.city} ${l.state} ${l.zip} ${l.county ?? ""} ${l.propertyType} ${(l.subTypes ?? []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const priceVal = (l: Listing) => (l.price === null ? -1 : l.price);
    out = [...out].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return priceVal(b) - priceVal(a);
        case "price-asc": {
          const av = a.price ?? Infinity;
          const bv = b.price ?? Infinity;
          return av - bv;
        }
        case "size-desc":
          return (b.spec.squareFootage ?? 0) - (a.spec.squareFootage ?? 0);
        case "newest":
          return +new Date(b.updated) - +new Date(a.updated);
        default:
          return Number(!!b.featured) - Number(!!a.featured);
      }
    });
    return out;
  }, [listings, query, types, status, sort]);

  const activeCount = types.size + (status !== "All" ? 1 : 0) + (query ? 1 : 0);

  return (
    <div>
      {/* Control bar */}
      <div className="sticky top-[68px] z-30 border-y border-paper-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-slate-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search address, city, or type"
              className="w-48 bg-transparent text-sm text-ink outline-none placeholder:text-slate-soft sm:w-64"
            />
          </div>

          <div className="hidden h-5 w-px bg-paper-line sm:block" />

          {/* Status segmented */}
          <div className="hidden items-center gap-1 sm:flex">
            {(["All", "For Sale", "For Lease"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`eyebrow-sm rounded-none px-3 py-1.5 transition-colors ${
                  status === s ? "bg-ink text-paper" : "text-slate hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 text-sm text-slate transition-colors hover:text-ink"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.65rem] text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="hidden items-center gap-2 text-sm text-slate md:flex">
              <span className="text-slate-soft">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer border-none bg-transparent text-ink outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center border border-paper-line">
              <button
                onClick={() => setView("card")}
                aria-label="Card view"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  view === "card" ? "bg-ink text-paper" : "text-slate hover:text-ink"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("table")}
                aria-label="Table view"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  view === "table" ? "bg-ink text-paper" : "text-slate hover:text-ink"
                }`}
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable filter tray */}
        {filtersOpen && (
          <div className="border-t border-paper-line bg-paper-2/60">
            <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow-sm text-slate-soft">Property Type</p>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1 text-xs text-slate transition-colors hover:text-gold"
                  >
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {propertyTypes.map((t) => {
                  const on = types.has(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`eyebrow-sm border px-4 py-2 transition-colors ${
                        on
                          ? "border-gold bg-gold text-white"
                          : "border-paper-line text-slate hover:border-ink hover:text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              {/* status for mobile */}
              <div className="mt-6 flex gap-2 sm:hidden">
                {(["All", "For Sale", "For Lease"] as StatusFilter[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`eyebrow-sm border px-4 py-2 ${
                      status === s ? "border-ink bg-ink text-paper" : "border-paper-line text-slate"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
        <p className="mb-8 text-sm text-slate-soft">
          {results.length} {results.length === 1 ? "property" : "properties"}
          {activeCount > 0 ? " matching your filters" : " available"}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-3xl font-light text-ink">No matches</p>
            <p className="mt-3 text-slate">Try widening your filters.</p>
            <button onClick={clearAll} className="btn-line mt-8 text-ink">
              Reset Filters
            </button>
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        ) : (
          <ListingsTable listings={results} />
        )}
      </div>
    </div>
  );
}

function ListingsTable({ listings }: { listings: Listing[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-ink text-left">
            {["Property", "Location", "Type", "Size", "Price", ""].map((h) => (
              <th
                key={h}
                className="eyebrow-sm py-4 pr-6 font-medium text-slate-soft"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr
              key={l.slug}
              className="group border-b border-paper-line transition-colors hover:bg-paper-2/50"
            >
              <td className="py-6 pr-6">
                <Link
                  href={`/listings/${l.slug}`}
                  className="font-display text-xl font-light text-ink transition-colors group-hover:text-gold"
                >
                  {l.address}
                </Link>
                {l.tag && (
                  <div className="eyebrow-sm mt-1 text-slate-soft">{l.tag}</div>
                )}
              </td>
              <td className="py-6 pr-6 text-sm text-slate">{cityLine(l)}</td>
              <td className="py-6 pr-6 text-sm text-slate">{l.propertyType}</td>
              <td className="py-6 pr-6 text-sm text-slate">
                {l.spec.squareFootage ? formatNumber(l.spec.squareFootage) + " SF" : "—"}
              </td>
              <td className="py-6 pr-6 font-display text-lg text-ink">
                {priceLabel(l)}
              </td>
              <td className="py-6 text-right">
                <Link
                  href={`/listings/${l.slug}`}
                  className="eyebrow-sm text-gold transition-colors hover:text-ink"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
