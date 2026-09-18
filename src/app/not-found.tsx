import Link from "next/link";

export default function NotFound() {
  return (
    <section
      data-hero
      className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-ink px-5 text-center text-paper"
    >
      <div className="grain absolute inset-0 opacity-25" />
      <div className="relative">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="mt-8 font-display text-[clamp(3rem,10vw,7rem)] font-light leading-none">
          Off the map.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-paper/70">
          The page you&rsquo;re looking for has moved or never existed. Let&rsquo;s get
          you back to solid ground.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-solid">
            Return Home
          </Link>
          <Link
            href="/listings"
            className="btn-line border-paper/50 text-paper hover:border-gold hover:text-gold"
          >
            Browse the Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
