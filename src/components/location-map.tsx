import { MapPin, ExternalLink } from "lucide-react";

interface Props {
  lat: number;
  lng: number;
  label: string;
  address: string;
}

export function LocationMap({ lat, lng, label, address }: Props) {
  const d = 0.006;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <div className="overflow-hidden border border-paper-line">
      <div className="relative aspect-[16/9] w-full bg-paper-2">
        <iframe
          title={`Map of ${label}`}
          src={embed}
          loading="lazy"
          className="absolute inset-0 h-full w-full grayscale-[0.25]"
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-paper-line bg-paper px-5 py-4">
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 shrink-0 text-gold" />
          <span className="text-sm text-slate">{address}</span>
        </div>
        <a
          href={gmaps}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 eyebrow-sm text-gold transition-colors hover:text-ink"
        >
          Directions
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
