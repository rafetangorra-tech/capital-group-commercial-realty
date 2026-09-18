"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";

interface Props {
  defaultPrice: number;
  defaultNoi?: number;
}

export function ValuationCalculator({ defaultPrice, defaultNoi }: Props) {
  const [price, setPrice] = useState(defaultPrice);
  const [noi, setNoi] = useState(defaultNoi ?? Math.round(defaultPrice * 0.06));
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(25);

  const m = useMemo(() => {
    const loan = price * (1 - downPct / 100);
    const down = price * (downPct / 100);
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      r === 0 ? loan / n : (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const annualDebt = monthly * 12;
    const cashFlow = noi - annualDebt;
    const capRate = price > 0 ? (noi / price) * 100 : 0;
    const dscr = annualDebt > 0 ? noi / annualDebt : 0;
    const coc = down > 0 ? (cashFlow / down) * 100 : 0;
    return { loan, down, annualDebt, cashFlow, capRate, dscr, coc };
  }, [price, noi, downPct, rate, term]);

  return (
    <div className="relative overflow-hidden bg-ink text-paper">
      <div className="grain absolute inset-0 opacity-20" />
      <div className="relative grid gap-0 md:grid-cols-2">
        {/* Inputs */}
        <div className="border-b border-ink-line p-8 md:border-b-0 md:border-r sm:p-10">
          <p className="eyebrow text-gold">Valuation Calculator</p>
          <p className="mt-4 text-sm leading-relaxed text-paper/70">
            Run the numbers on this property — cap rate, debt service, DSCR, and
            cash-on-cash return. Estimates only.
          </p>

          <div className="mt-8 space-y-6">
            <NumberField label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
            <NumberField label="Net Operating Income" value={noi} onChange={setNoi} prefix="$" />
            <SliderField
              label="Down Payment"
              value={downPct}
              onChange={setDownPct}
              min={0}
              max={100}
              step={1}
              suffix="%"
            />
            <SliderField
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={0}
              max={12}
              step={0.05}
              suffix="%"
            />
            <SliderField
              label="Amortization"
              value={term}
              onChange={setTerm}
              min={5}
              max={30}
              step={1}
              suffix=" yrs"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-3 gap-4">
            <Metric label="Cap Rate" value={`${m.capRate.toFixed(2)}%`} accent />
            <Metric label="DSCR" value={m.dscr.toFixed(2)} />
            <Metric
              label="Cash-on-Cash"
              value={`${m.coc.toFixed(1)}%`}
              accent={m.coc >= 0}
              negative={m.coc < 0}
            />
          </div>

          <dl className="mt-8 space-y-0 divide-y divide-ink-line border-t border-ink-line">
            <Row label="Loan Amount" value={formatCurrency(m.loan)} />
            <Row label="Down Payment" value={formatCurrency(m.down)} />
            <Row label="Annual Debt Service" value={formatCurrency(m.annualDebt)} />
            <Row
              label="Annual Cash Flow"
              value={formatCurrency(m.cashFlow)}
              highlight={m.cashFlow >= 0 ? "positive" : "negative"}
            />
          </dl>

          <p className="mt-8 text-xs leading-relaxed text-slate-soft">
            For illustration only. Not an offer, appraisal, or financing commitment.
            Verify all figures with your own advisors.
          </p>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow-sm text-paper/60">{label}</span>
      <div className="mt-2 flex items-center border-b border-ink-line focus-within:border-gold">
        {prefix && <span className="text-paper/50">{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          value={value.toLocaleString("en-US")}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^0-9.]/g, ""));
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className="w-full bg-transparent py-2 pl-2 font-display text-2xl text-paper outline-none"
        />
      </div>
    </label>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow-sm text-paper/60">{label}</span>
        <span className="font-display text-lg text-gold-light">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--gold)]"
      />
    </label>
  );
}

function Metric({
  label,
  value,
  accent,
  negative,
}: {
  label: string;
  value: string;
  accent?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="border border-ink-line p-4 text-center">
      <div
        className={`font-display text-2xl sm:text-3xl ${
          negative ? "text-red-300" : accent ? "text-gold-light" : "text-paper"
        }`}
      >
        {value}
      </div>
      <div className="eyebrow-sm mt-2 text-paper/50">{label}</div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "positive" | "negative";
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <dt className="text-sm text-paper/70">{label}</dt>
      <dd
        className={`font-display text-lg ${
          highlight === "negative"
            ? "text-red-300"
            : highlight === "positive"
              ? "text-gold-light"
              : "text-paper"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
