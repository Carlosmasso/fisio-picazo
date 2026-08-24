"use client";

import { useState } from "react";
import { gallery } from "./data";

const tabs = [
  { key: "publico", label: "Público" },
  { key: "admin", label: "Panel admin" },
  { key: "paciente", label: "Portal paciente" },
];

export default function Gallery() {
  const [active, setActive] = useState("publico");

  return (
    <div>
      <div className="mb-6 inline-flex gap-1 rounded-lg border border-line bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={`rounded-md px-4 py-2 font-mono text-xs transition-colors ${
              active === t.key ? "bg-ember text-bg" : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {gallery[active].map((shot) => (
          <figure key={shot.name} className="overflow-hidden rounded-xl border border-line bg-surface">
            <img
              src={`/presupuesto/${shot.name}.png`}
              alt={shot.caption}
              loading="lazy"
              className="block w-full"
            />
            <figcaption className="border-t border-line px-4 py-3 text-[13px] text-muted">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
