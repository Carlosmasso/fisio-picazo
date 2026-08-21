"use client";

import { useActionState, useEffect, useState } from "react";
import { useModal } from "./ModalProvider";
import { signIn } from "../actions/auth";
import { createClient } from "../lib/supabase/client";
import { location } from "../lib/site-content";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none";

const contactHref = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero darme de alta como paciente."
)}`;

function LoginForm({ onForgotPassword }) {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <>
      <h3 className="mb-1.5 font-display text-[22px] font-semibold">Acceso clientes</h3>
      <p className="mb-6 text-[13.5px] text-muted">Entra para ver tu plan y tu progreso.</p>
      <form action={action} className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] text-muted">Contraseña</span>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className={fieldClass}
          />
        </label>
        {state?.error && <p className="text-[13px] text-ember">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-1 rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
      <div className="mt-3 text-center text-[13px]">
        <button type="button" onClick={onForgotPassword} className="text-muted hover:text-frost">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      <div className="mt-[18px] text-center text-[13px] text-muted">
        ¿Aún no tienes acceso?<br/>
        <a href={contactHref} target="_blank" rel="noopener noreferrer" className="text-frost">
          Contacta con Álvaro
        </a>
      </div>
    </>
  );
}

function ForgotPasswordForm({ onSwitch }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const email = new FormData(e.currentTarget).get("email")?.toString().trim();
    const supabase = createClient();

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/auth/update-password`,
    });

    if (resetError) {
      setStatus("error");
      setError(resetError.message);
      return;
    }

    setStatus("sent");
  }

  return (
    <>
      <h3 className="mb-1.5 font-display text-[22px] font-semibold">Recuperar contraseña</h3>
      <p className="mb-6 text-[13.5px] text-muted">
        Te enviamos un enlace para elegir una contraseña nueva.
      </p>

      {status === "sent" ? (
        <p className="text-[13.5px] text-frost">
          Revisa tu correo y sigue el enlace para crear una contraseña nueva.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-muted">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="tucorreo@ejemplo.com"
              className={fieldClass}
            />
          </label>
          {error && <p className="text-[13px] text-ember">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar enlace"}
          </button>
        </form>
      )}

      <div className="mt-[18px] text-center text-[13px] text-muted">
        <button type="button" onClick={onSwitch} className="text-frost">
          Volver a acceso clientes
        </button>
      </div>
    </>
  );
}

export default function AuthModal() {
  const { modalType, openModal, closeModal } = useModal();
  const isOpen = modalType !== null;

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-[400px] rounded-2xl border border-line bg-surface p-8">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Cerrar"
          className="absolute top-[18px] right-[18px] text-lg text-muted transition-colors hover:text-foreground"
        >
          ×
        </button>

        {modalType === "login" && <LoginForm onForgotPassword={() => openModal("forgot")} />}
        {modalType === "forgot" && <ForgotPasswordForm onSwitch={() => openModal("login")} />}
      </div>
    </div>
  );
}
