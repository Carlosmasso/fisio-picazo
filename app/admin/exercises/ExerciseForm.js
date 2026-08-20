"use client";

import { useActionState, useEffect, useRef } from "react";
import { createExercise } from "../actions";
import { zones } from "../../lib/site-content";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none";

export default function ExerciseForm() {
  const [state, action, pending] = useActionState(createExercise, undefined);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="h-fit rounded-2xl border border-line bg-surface p-7">
      <h3 className="mb-4 text-sm font-semibold text-muted uppercase">Nuevo ejercicio</h3>
      <form ref={formRef} action={action} className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Título</span>
          <input type="text" name="title" required className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Descripción</span>
          <textarea name="description" rows={3} className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Zona</span>
          <select name="zone" className={fieldClass} defaultValue="">
            <option value="">Sin zona específica</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Vídeo (opcional)</span>
          <input
            type="file"
            name="video"
            accept="video/*"
            className="w-full text-sm text-muted file:mr-3 file:rounded-lg file:border file:border-line file:bg-surface-2 file:px-3 file:py-1.5 file:text-foreground"
          />
        </label>

        {state?.error && <p className="text-[13px] text-ember">{state.error}</p>}
        {state?.success && <p className="text-[13px] text-frost">{state.success}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
        >
          {pending ? "Subiendo…" : "Crear ejercicio"}
        </button>
      </form>
    </div>
  );
}
