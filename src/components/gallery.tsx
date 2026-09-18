"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, Camera } from "lucide-react";
import { PropertyMedia } from "@/components/property-media";

interface GalleryProps {
  seed: number;
  count: number;
  images?: string[];
  label: string;
}

export function Gallery({ seed, count, images, label }: GalleryProps) {
  const total = images?.length ? images.length : count;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (dir: number) => setActive((v) => (v + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  return (
    <>
      <div className="relative">
        {/* Main frame */}
        <div className="group relative aspect-[16/10] w-full overflow-hidden bg-ink sm:aspect-[16/9]">
          <PropertyMedia
            seed={seed}
            index={active}
            image={images?.[active]}
            alt={`${label} — image ${active + 1}`}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
          />

          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => setLightbox(true)}
            className="absolute right-4 top-4 flex items-center gap-2 bg-ink/50 px-3 py-2 text-paper backdrop-blur-sm transition-colors hover:bg-gold"
          >
            <Expand className="h-4 w-4" />
            <span className="eyebrow-sm">Expand</span>
          </button>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-ink/50 px-3 py-2 text-paper backdrop-blur-sm">
            <Camera className="h-4 w-4" />
            <span className="eyebrow-sm">
              {active + 1} / {total}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[4/3] w-28 shrink-0 overflow-hidden transition-opacity ${
                i === active ? "opacity-100 ring-2 ring-gold" : "opacity-60 hover:opacity-100"
              }`}
            >
              <PropertyMedia
                seed={seed}
                index={i}
                image={images?.[i]}
                alt=""
                sizes="112px"
                className="absolute inset-0 h-full w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4">
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-gold"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-5 flex h-12 w-12 items-center justify-center text-paper transition-colors hover:text-gold"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div className="relative aspect-[16/10] w-full max-w-6xl">
            <PropertyMedia
              seed={seed}
              index={active}
              image={images?.[active]}
              alt={`${label} — image ${active + 1}`}
              sizes="90vw"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-5 flex h-12 w-12 items-center justify-center text-paper transition-colors hover:text-gold"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 eyebrow-sm text-paper/70">
            {active + 1} / {total} · {label}
          </div>
        </div>
      )}
    </>
  );
}
