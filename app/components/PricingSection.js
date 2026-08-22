"use client";

import { useEffect, useRef, useState } from "react";
import { plans, quarterlyDiscount, location } from "../lib/site-content";

function useAnimatedPrice(target, duration = 500) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const frameRef = useRef(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    if (from === to) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      frameRef.current = requestAnimationFrame(() => {
        setDisplay(to);
        prevRef.current = to;
      });
      return () => cancelAnimationFrame(frameRef.current);
    }

    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}

function PlanCard({ plan, targetPrice }) {
  const price = useAnimatedPrice(targetPrice);

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7.5 transition-all duration-300 hover:-translate-y-1 ${
        plan.featured
          ? "border-ember bg-linear-to-b from-surface to-ember-dim shadow-[0_20px_50px_-24px_var(--color-ember)] hover:shadow-[0_28px_60px_-20px_var(--color-ember)]"
          : "border-line bg-surface hover:border-frost hover:shadow-[0_20px_40px_-26px_rgba(0,0,0,0.3)]"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-2.5 left-6 rounded-[5px] bg-ember px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] text-bg">
          MÁS ELEGIDO
        </span>
      )}
      <h3 className="mb-1.5 text-lg font-semibold">{plan.name}</h3>
      <p className="mb-5.5 text-[13.5px] text-muted">{plan.description}</p>
      <div className="mb-1 font-display text-[38px] font-bold tabular-nums">
        {price}€ <span className="font-sans text-sm font-normal text-muted">/ mes</span>
      </div>
      <ul className="mb-6.5 flex-1">
        {plan.features.map((feature, i) => (
          <li
            key={feature}
            className={`flex gap-2.5 py-2 text-[13.5px] ${i === 0 ? "" : "border-t border-line"}`}
          >
            <span className="text-frost">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
          `Hola, me interesa el plan ${plan.name} (${price}€/mes).`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-lg border px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
          plan.featured
            ? "border-ember bg-ember text-bg hover:bg-ember-hover"
            : "border-line hover:border-frost hover:text-frost"
        }`}
      >
        Empezar
      </a>
    </div>
  );
}

export default function PricingSection() {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <>
      <div className="mb-11 flex items-center gap-3.5">
        <span className="text-[13.5px] text-muted">Mensual</span>
        <button
          type="button"
          role="switch"
          aria-checked={quarterly}
          onClick={() => setQuarterly((v) => !v)}
          className={`relative h-6 w-11 rounded-full border border-line transition-colors ${
            quarterly ? "bg-ember-dim" : "bg-surface-2"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4.5 w-4.5 rounded-full transition-all ${
              quarterly ? "left-5.5 bg-ember" : "left-0.5 bg-frost"
            }`}
          />
        </button>
        <span className="text-[13.5px] text-muted">
          Trimestral{" "}
          <span className="font-mono text-frost">
            (-{Math.round(quarterlyDiscount * 100)}%)
          </span>
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {plans.map((plan) => {
          const targetPrice = quarterly
            ? Math.round(plan.priceMonthly * (1 - quarterlyDiscount))
            : plan.priceMonthly;

          return <PlanCard key={plan.id} plan={plan} targetPrice={targetPrice} />;
        })}
      </div>
    </>
  );
}
