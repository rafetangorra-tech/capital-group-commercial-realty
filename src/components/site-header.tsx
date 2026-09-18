"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { primaryNav, company } from "@/data/site";

export function SiteHeader() {
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // The header is transparent (light text) only while a dark hero section
    // sits behind it. Pages without a `[data-hero]` band render it solid.
    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (!hero) {
        setOverHero(false);
        return;
      }
      setOverHero(hero.getBoundingClientRect().bottom > 80);
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when the overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overHero || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-paper-line bg-paper/90 py-4 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6 text-paper"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Logo className="relative z-10" />

          <nav className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`eyebrow transition-colors duration-300 hover:text-gold ${
                    active ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={company.phoneHref}
              className="hidden items-center gap-2 text-sm tracking-wide transition-colors hover:text-gold xl:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <Link href="/contact" className="hidden btn-line lg:inline-flex">
              Inquire
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-paper transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="grain absolute inset-0 opacity-30" />
        <nav className="relative flex h-full flex-col justify-center gap-1 px-8">
          {primaryNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-ink-line py-5 font-display text-4xl font-light tracking-wide transition-colors hover:text-gold"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              <span className="eyebrow-sm text-gold/60">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-10 flex flex-col gap-2">
            <a href={company.phoneHref} className="text-lg tracking-wide">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="text-slate-soft">
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
