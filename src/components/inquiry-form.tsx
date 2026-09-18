"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { company } from "@/data/site";

type Tone = "light" | "dark";

interface Props {
  propertyAddress?: string;
  propertySlug?: string;
  defaultType?: string;
  tone?: Tone;
  compact?: boolean;
}

const inquiryTypes = [
  "General Inquiry",
  "Request Information",
  "Submit an Offer / LOI",
  "Schedule a Tour",
  "List a Property",
  "Leasing Inquiry",
];

export function InquiryForm({
  propertyAddress,
  propertySlug,
  defaultType = "General Inquiry",
  tone = "light",
  compact,
}: Props) {
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const dark = tone === "dark";

  // Static-site friendly: compose a pre-addressed email to the firm. Swap this
  // for a POST to an email/CRM endpoint (Resend, Formspree, etc.) when a backend
  // is available — see README.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const subject = `Website Inquiry — ${d.type || "General"}${
      propertyAddress ? ` — ${propertyAddress}` : ""
    }`;
    const body = [
      `Name: ${d.name ?? ""}`,
      `Email: ${d.email ?? ""}`,
      `Phone: ${d.phone ?? ""}`,
      `Inquiry type: ${d.type ?? ""}`,
      propertyAddress ? `Property: ${propertyAddress}` : "",
      propertySlug ? `Listing: ${propertySlug}` : "",
      "",
      d.message ?? "",
    ]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    if (typeof window !== "undefined") window.location.href = href;
    setStatus("done");
    form.reset();
  }

  const fieldBase = dark
    ? "w-full border-b border-ink-line bg-transparent py-3 text-paper outline-none placeholder:text-slate-soft focus:border-gold"
    : "w-full border-b border-paper-line bg-transparent py-3 text-ink outline-none placeholder:text-slate-soft focus:border-gold";
  const labelBase = dark ? "eyebrow-sm text-paper/60" : "eyebrow-sm text-slate-soft";

  if (status === "done") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
          <Check className="h-6 w-6" />
        </span>
        <p className="font-display text-3xl font-light">Thank you.</p>
        <p className={`max-w-sm ${dark ? "text-paper/70" : "text-slate"}`}>
          We&rsquo;ve opened a pre-addressed email in your mail app — just press
          send and an advisor will be in touch. Prefer to talk?{" "}
          <a href={company.phoneHref} className="text-gold hover:underline">
            {company.phone}
          </a>
          .
        </p>
        <button onClick={() => setStatus("idle")} className={`btn-line mt-4 ${dark ? "text-paper" : "text-ink"}`}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {propertyAddress && (
        <div className={`border-l-2 border-gold pl-4 ${dark ? "text-paper/80" : "text-slate"}`}>
          <p className="eyebrow-sm text-gold">Inquiry Regarding</p>
          <p className="mt-1 font-display text-lg">{propertyAddress}</p>
        </div>
      )}

      <div className={`grid gap-6 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="block">
          <span className={labelBase}>Full Name</span>
          <input name="name" required placeholder="Jane Doe" className={fieldBase} />
        </label>
        <label className="block">
          <span className={labelBase}>Email</span>
          <input name="email" type="email" required placeholder="jane@company.com" className={fieldBase} />
        </label>
        <label className="block">
          <span className={labelBase}>Phone</span>
          <input name="phone" placeholder="(555) 555-5555" className={fieldBase} />
        </label>
        <label className="block">
          <span className={labelBase}>Inquiry Type</span>
          <select name="type" defaultValue={defaultType} className={`${fieldBase} cursor-pointer`}>
            {inquiryTypes.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelBase}>Message</span>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          placeholder={
            propertyAddress
              ? "I'd like to learn more about this property…"
              : "Tell us about your objectives…"
          }
          className={`${fieldBase} resize-none`}
        />
      </label>

      <button type="submit" className="btn-solid w-full justify-center sm:w-auto">
        Submit Inquiry
      </button>

      <p className={`text-xs ${dark ? "text-slate-soft" : "text-slate-soft"}`}>
        By submitting, you agree to be contacted by {""}
        Capital Group Commercial Realty regarding your inquiry.
      </p>
    </form>
  );
}
