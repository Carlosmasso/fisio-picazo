"use client";

import { useActionState, useEffect } from "react";
import { useModal } from "./ModalProvider";
import { signIn, signUp } from "../actions/auth";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none";

function LoginForm({ onSwitch }) {
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
      <div className="mt-[18px] text-center text-[13px] text-muted">
        ¿Aún no tienes acceso?{" "}
        <button type="button" onClick={onSwitch} className="text-frost">
          Suscríbete
        </button>
      </div>
    </>
  );
}

function SignupForm({ onSwitch }) {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <>
      <h3 className="mb-1.5 font-display text-[22px] font-semibold">Crear cuenta</h3>
      <p className="mb-6 text-[13.5px] text-muted">
        Se activará tras confirmar el pago de tu suscripción.
      </p>
      {state?.success ? (
        <p className="text-[13.5px] text-frost">{state.success}</p>
      ) : (
        <form action={action} className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-muted">Nombre</span>
            <input type="text" name="name" required placeholder="Tu nombre" className={fieldClass} />
          </label>
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
            {pending ? "Creando…" : "Continuar al pago →"}
          </button>
        </form>
      )}
      <div className="mt-[18px] text-center text-[13px] text-muted">
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={onSwitch} className="text-frost">
          Inicia sesión
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

        {modalType === "login" ? (
          <LoginForm onSwitch={() => openModal("signup")} />
        ) : (
          <SignupForm onSwitch={() => openModal("login")} />
        )}
      </div>
    </div>
  );
}
