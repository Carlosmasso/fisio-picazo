"use client";

import { useState } from "react";
import { plans, quarterlyDiscount } from "../lib/site-content";
import { useModal } from "./ModalProvider";

export default function PricingSection() {
  const [quarterly, setQuarterly] = useState(false);
  const { openModal } = useModal();

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
          const price = quarterly
            ? Math.round(plan.priceMonthly * (1 - quarterlyDiscount))
            : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7.5 ${
                plan.featured
                  ? "border-ember bg-linear-to-b from-surface to-ember-dim"
                  : "border-line bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-2.5 left-6 rounded-[5px] bg-ember px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] text-bg">
                  MÁS ELEGIDO
                </span>
              )}
              <h3 className="mb-1.5 text-lg font-semibold">{plan.name}</h3>
              <p className="mb-5.5 text-[13.5px] text-muted">{plan.description}</p>
              <div className="mb-1 font-display text-[38px] font-bold">
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
              <button
                type="button"
                onClick={() => openModal("signup")}
                className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "border-ember bg-ember text-bg hover:bg-ember-hover"
                    : "border-line hover:border-frost hover:text-frost"
                }`}
              >
                Empezar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
