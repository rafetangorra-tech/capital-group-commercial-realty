import { PropertyMedia } from "@/components/property-media";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  seed?: number;
  image?: string;
  size?: "sm" | "md";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  seed = 3,
  image,
  size = "md",
}: PageHeroProps) {
  return (
    <section
      data-hero
      className={`relative flex w-full items-end overflow-hidden bg-ink text-paper ${
        size === "sm" ? "h-[46vh] min-h-[340px]" : "h-[62vh] min-h-[440px]"
      }`}
    >
      <PropertyMedia
        seed={seed}
        index={2}
        image={image}
        alt={title}
        className="absolute inset-0 h-full w-full"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.75rem)] font-light leading-[1.03]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
