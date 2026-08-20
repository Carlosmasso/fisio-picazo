"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "", label: "Oscuro (actual)" },
  { id: "frost-ember-light", label: "Frost & Ember claro" },
  { id: "clinical-calm", label: "Clinical Calm" },
  { id: "warm-sport", label: "Warm Sport Energy" },
  { id: "sage-sand", label: "Sage & Sand" },
];

export default function ThemeLabSwitcher() {
  // Always starts empty so server- and client-rendered markup match exactly.
  // The stored preference is applied to the DOM directly in the effect below
  // (not mirrored into this state), so this button-highlight resets to
  // "Oscuro" on reload even though the applied palette is preserved — an
  // acceptable trade-off for a temporary comparison tool.
  const [active, setActive] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme-preview") || "";
    document.documentElement.setAttribute("data-theme-preview", stored);
  }, []);

  function select(id) {
    setActive(id);
    document.documentElement.setAttribute("data-theme-preview", id);
    window.localStorage.setItem("theme-preview", id);
  }

  return (
    <div className="fixed bottom-4 left-4 z-[300] flex max-w-[calc(100vw-2rem)] flex-wrap gap-2 rounded-xl border border-line bg-surface p-3 shadow-lg">
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => select(t.id)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
            active === t.id
              ? "border-ember bg-ember text-bg"
              : "border-line text-muted hover:border-frost hover:text-frost"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
