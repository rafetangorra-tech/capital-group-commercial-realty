import Link from "next/link";

/**
 * Capital Group Commercial Realty wordmark.
 * Typographic + a fine skyline emblem. Colour follows `currentColor`, so tone
 * is set by the parent's text color (text-paper on dark, text-ink on light).
 * The gold accent is applied to the emblem via `text-gold` on the mark only.
 */

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* fine frame */}
      <rect x="4" y="4" width="40" height="40" strokeWidth="1" opacity="0.55" />
      {/* skyline of ascending towers */}
      <g strokeWidth="1.4">
        <line x1="13" y1="34" x2="13" y2="22" />
        <line x1="19" y1="34" x2="19" y2="16" />
        <line x1="25" y1="34" x2="25" y2="12" />
        <line x1="31" y1="34" x2="31" y2="18" />
        <line x1="37" y1="34" x2="37" y2="25" />
      </g>
      {/* horizon */}
      <line x1="10" y1="34.5" x2="38" y2="34.5" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

interface LogoProps {
  variant?: "full" | "stacked" | "mark";
  className?: string;
  href?: string | null;
}

export function Logo({ variant = "full", className = "", href = "/" }: LogoProps) {
  const content =
    variant === "mark" ? (
      <Emblem className="h-9 w-9 text-gold" />
    ) : variant === "stacked" ? (
      <span className="flex flex-col items-center gap-2 leading-none">
        <Emblem className="h-8 w-8 text-gold" />
        <span className="flex flex-col items-center gap-1">
          <span className="font-display text-[1.35rem] font-medium tracking-[0.22em]">
            CAPITAL GROUP
          </span>
          <span className="eyebrow-sm text-current/70">Commercial Realty</span>
        </span>
      </span>
    ) : (
      <span className="flex items-center gap-3 leading-none">
        <Emblem className="h-9 w-9 shrink-0 text-gold" />
        <span className="flex flex-col gap-1">
          <span className="font-display text-[1.25rem] font-medium tracking-[0.2em]">
            CAPITAL GROUP
          </span>
          <span className="eyebrow-sm text-current/65">Commercial Realty</span>
        </span>
      </span>
    );

  if (href === null) {
    return <span className={className}>{content}</span>;
  }
  return (
    <Link href={href} aria-label="Capital Group Commercial Realty — home" className={className}>
      {content}
    </Link>
  );
}
