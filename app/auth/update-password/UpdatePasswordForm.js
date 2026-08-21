"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm_password")?.toString();

    if (!password || password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/portal");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-8">
      <h1 className="mb-1.5 font-display text-[22px] font-semibold">Elige una nueva contraseña</h1>
      <p className="mb-6 text-[13.5px] text-muted">Se aplicará a tu cuenta inmediatamente.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Nueva contraseña</span>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Confirmar contraseña</span>
          <input
            type="password"
            name="confirm_password"
            required
            placeholder="••••••••"
            className={fieldClass}
          />
        </label>
        {error && <p className="text-[13px] text-ember">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-1 rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </div>
  );
}
