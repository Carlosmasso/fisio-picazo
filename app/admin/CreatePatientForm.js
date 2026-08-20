"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPatient } from "./actions";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none";

export default function CreatePatientForm() {
  const [state, action, pending] = useActionState(createPatient, undefined);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="h-fit rounded-2xl border border-line bg-surface p-7">
      <h3 className="mb-4 text-sm font-semibold text-muted uppercase">Nuevo paciente</h3>
      <form ref={formRef} action={action} className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Nombre</span>
          <input type="text" name="full_name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="paciente@ejemplo.com"
            className={fieldClass}
          />
        </label>

        {state?.error && <p className="text-[13px] text-ember">{state.error}</p>}
        {state?.success && <p className="text-[13px] text-frost">{state.success}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
        >
          {pending ? "Creando…" : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
