"use client";

import { useActionState } from "react";
import { resetPatientPassword } from "../../actions";

export default function ResetPasswordButton({ patientId }) {
  const action = resetPatientPassword.bind(null, patientId);
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <div>
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-frost hover:text-frost disabled:opacity-60"
        >
          {pending ? "Generando…" : "Generar nueva contraseña"}
        </button>
      </form>
      {state?.success && <p className="mt-2 max-w-sm text-[13px] text-frost">{state.success}</p>}
      {state?.error && <p className="mt-2 text-[13px] text-ember">{state.error}</p>}
    </div>
  );
}
