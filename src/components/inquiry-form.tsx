"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, propertyAddress, propertySlug }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
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
        <p className={dark ? "text-paper/70" : "text-slate"}>
          Your inquiry has reached the firm. An advisor will be in touch shortly.
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

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please call {""}
          <a href="tel:+15164268931" className="underline">
            (516) 426-8931
          </a>{" "}
          or try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn-solid w-full justify-center sm:w-auto ${
          status === "sending" ? "opacity-70" : ""
        }`}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>

      <p className={`text-xs ${dark ? "text-slate-soft" : "text-slate-soft"}`}>
        By submitting, you agree to be contacted by {""}
        Capital Group Commercial Realty regarding your inquiry.
      </p>
    </form>
  );
}
