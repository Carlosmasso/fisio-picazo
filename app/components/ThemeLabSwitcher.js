"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "", label: "Clinical Calm" },
  { id: "frost-ember-light", label: "Frost & Ember claro" },
  { id: "warm-sport", label: "Warm Sport Energy" },
  { id: "sage-sand", label: "Sage & Sand" },
  { id: "dark", label: "Oscuro" },
];

export default function ThemeLabSwitcher() {
  const [active, setActive] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme-preview", "");
  }, []);

  function select(id) {
    setActive(id);
    document.documentElement.setAttribute("data-theme-preview", id);
    window.localStorage.setItem("theme-preview", id);
  }

  return (
    <select
      value={active}
      onChange={(e) => select(e.target.value)}
      aria-label="Vista previa de tema (herramienta interna)"
      className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted focus:border-frost focus:outline-none"
    >
      {themes.map((t) => (
        <option key={t.id} value={t.id}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
