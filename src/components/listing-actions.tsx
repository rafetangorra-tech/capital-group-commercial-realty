"use client";

import { useEffect, useState } from "react";
import { Bookmark, Printer, Share2, Check } from "lucide-react";

export function ListingActions({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const set = JSON.parse(localStorage.getItem("cg:saved") ?? "[]");
      setSaved(Array.isArray(set) && set.includes(slug));
    } catch {
      /* ignore */
    }
  }, [slug]);

  const toggleSave = () => {
    try {
      const set: string[] = JSON.parse(localStorage.getItem("cg:saved") ?? "[]");
      const next = set.includes(slug) ? set.filter((s) => s !== slug) : [...set, slug];
      localStorage.setItem("cg:saved", JSON.stringify(next));
      setSaved(next.includes(slug));
    } catch {
      setSaved((v) => !v);
    }
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const btn =
    "flex h-10 w-10 items-center justify-center border border-paper-line text-slate transition-colors hover:border-ink hover:text-ink";

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleSave} aria-label="Save property" className={btn}>
        <Bookmark className={`h-4 w-4 ${saved ? "fill-gold text-gold" : ""}`} />
      </button>
      <button onClick={share} aria-label="Share property" className={btn}>
        {copied ? <Check className="h-4 w-4 text-gold" /> : <Share2 className="h-4 w-4" />}
      </button>
      <button
        onClick={() => window.print()}
        aria-label="Print"
        className={`${btn} hidden sm:flex`}
      >
        <Printer className="h-4 w-4" />
      </button>
    </div>
  );
}
