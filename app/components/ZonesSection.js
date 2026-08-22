"use client";

import { useState } from "react";
import { zones } from "../lib/site-content";

export default function ZonesSection() {
  const [activeZone, setActiveZone] = useState(zones[0].id);
  const zone = zones.find((z) => z.id === activeZone) ?? zones[0];

  return (
    <>
      <div className="mb-12.5 flex flex-wrap gap-3">
        {zones.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setActiveZone(z.id)}
            className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
              z.id === activeZone
                ? "border-frost bg-frost-dim text-frost shadow-[0_10px_30px_-16px_var(--color-frost)]"
                : "border-line bg-surface text-muted hover:border-muted hover:text-foreground hover:shadow-[0_10px_24px_-18px_rgba(0,0,0,0.3)]"
            }`}
          >
            {z.label}
          </button>
        ))}
      </div>

      <div className="grid gap-9 rounded-2xl border border-line bg-surface p-9 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-2xl font-semibold">{zone.title}</h3>
          <p className="mb-4.5 text-[15px] text-muted">{zone.description}</p>
          <div className="flex flex-wrap gap-2">
            {zone.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-frost-dim px-2.5 py-1.5 font-mono text-[11.5px] text-frost"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-xl bg-surface-2">
          <div className="flex h-30 w-30 items-center justify-center rounded-full border-[3px] border-ember font-mono text-[28px] font-medium shadow-[0_0_40px_-10px_var(--color-ember)]">
            {zone.exerciseCount}
          </div>
        </div>
      </div>
    </>
  );
}
