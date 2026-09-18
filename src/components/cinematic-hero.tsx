"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PropertyMedia } from "@/components/property-media";
import { heroWords, company } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicHero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroWords.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      data-hero
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-paper"
    >
      <PropertyMedia
        seed={2}
        index={1}
        image="/images/home-hero.png"
        alt="Cinematic commercial building at twilight"
        className="absolute inset-0 h-full w-full"
        priority
      />
      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />

      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.p
          className="eyebrow text-gold"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {company.name}
        </motion.p>

        <motion.h1
          className="mt-8 font-display text-[clamp(2.6rem,8vw,6.5rem)] font-light leading-[1.02] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.35 }}
        >
          <span className="block text-paper/85">Commercial real estate,</span>
          <span className="relative mt-2 block h-[1.1em] overflow-hidden">
            <AnimatePresence>
              <motion.span
                key={heroWords[i]}
                className="absolute inset-0 flex items-center justify-center italic text-gold-light"
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "-70%" }}
                transition={{ duration: 0.85, ease }}
              >
                {toSentence(heroWords[i])}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          className="mt-10 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
        >
          A boutique brokerage representing distinctive commercial, mixed-use, and
          investment properties across the New York metropolitan area.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
        >
          <Link href="/listings" className="btn-solid">
            View the Portfolio
          </Link>
          <Link
            href="/contact"
            className="btn-line border-paper/50 text-paper hover:border-gold hover:text-gold"
          >
            Speak with an Advisor
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-paper/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function toSentence(s: string): string {
  return s.charAt(0) + s.slice(1).toLowerCase();
}
