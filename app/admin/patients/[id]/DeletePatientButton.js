"use client";

import { useActionState, useState } from "react";
import { deletePatient } from "../../actions";

export default function DeletePatientButton({ patientId, patientName }) {
  const [open, setOpen] = useState(false);
  const action = deletePatient.bind(null, patientId);
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-fit rounded-lg border border-ember px-4 py-2 text-sm font-semibold text-ember transition-colors hover:bg-ember-dim"
      >
        Eliminar paciente
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7">
            <h3 className="mb-2 font-display text-lg font-semibold">
              Eliminar a {patientName}
            </h3>
            <p className="mb-6 text-[13.5px] text-muted">
              Se borrará su cuenta, todos sus programas, ejercicios asignados y
              registros de dolor. Esta acción no se puede deshacer.
            </p>
            {state?.error && <p className="mb-4 text-[13px] text-ember">{state.error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
              >
                Cancelar
              </button>
              <form action={formAction} className="flex-1">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-lg border border-ember bg-ember px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
                >
                  {pending ? "Eliminando…" : "Sí, eliminar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
