"use client";

import { useState } from "react";

export default function CompletedProgramModal({ show }) {
  const [open, setOpen] = useState(show);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7">
        <h3 className="mb-2 font-display text-lg font-semibold">Programa completado</h3>
        <p className="mb-6 text-[13.5px] text-muted">
          ¿Quieres asignar el siguiente programa a este paciente ahora?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
          >
            Ahora no
          </button>
          <a
            href="#nuevo-programa"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-lg border border-ember bg-ember px-4 py-2.5 text-center text-sm font-semibold text-bg transition-colors hover:bg-ember-hover"
          >
            Sí, crear ahora
          </a>
        </div>
      </div>
    </div>
  );
}
