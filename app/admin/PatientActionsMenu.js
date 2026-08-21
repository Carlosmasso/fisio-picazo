"use client";

import { useEffect, useRef, useState } from "react";
import { updatePatient, resetPatientPassword, deletePatient } from "./actions";
import ActionForm from "../components/ActionForm";
import { EllipsisVertical } from "lucide-react";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground focus:border-frost focus:outline-none";

export default function PatientActionsMenu({ patient, label }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // null | "edit" | "delete"
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const updateAction = updatePatient.bind(null, patient.id);
  const resetAction = resetPatientPassword.bind(null, patient.id);
  const deleteAction = deletePatient.bind(null, patient.id);

  const patientLabel = patient.full_name || patient.email;

  return (
    <div
      className="relative shrink-0"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Acciones"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className={`rounded-lg border border-line ${label ? "p-2" : "p-1"} text-sm text-muted transition-colors hover:border-frost hover:text-frost`}
      >
        {label || <EllipsisVertical size={16} />}
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-lg border border-line bg-surface-2 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setModal("edit");
              setMenuOpen(false);
            }}
            className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface"
          >
            Editar información
          </button>
          <ActionForm
            action={resetAction}
            onSubmit={() => setMenuOpen(false)}
            successDuration={Infinity}
          >
            {(pending) => (
              <button
                type="submit"
                disabled={pending}
                className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface disabled:opacity-60"
              >
                {pending ? "Generando…" : "Restablecer contraseña"}
              </button>
            )}
          </ActionForm>
          <button
            type="button"
            onClick={() => {
              setModal("delete");
              setMenuOpen(false);
            }}
            className="block w-full px-4 py-2.5 text-left text-sm text-ember transition-colors hover:bg-ember-dim"
          >
            Eliminar paciente
          </button>
        </div>
      )}

      {modal === "edit" && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7">
            <h3 className="mb-4 font-display text-lg font-semibold">
              Editar paciente
            </h3>
            <ActionForm
              action={updateAction}
              onSubmit={() => setModal(null)}
              className="flex flex-col gap-4"
            >
              {(pending) => (
                <>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] text-muted">
                      Nombre
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      defaultValue={patient.full_name ?? ""}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] text-muted">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      defaultValue={patient.email ?? ""}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModal(null)}
                      className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
                    >
                      Cerrar
                    </button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="flex-1 rounded-lg border border-ember bg-ember px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
                    >
                      {pending ? "Guardando…" : "Guardar"}
                    </button>
                  </div>
                </>
              )}
            </ActionForm>
          </div>
        </div>
      )}

      {modal === "delete" && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7">
            <h3 className="mb-2 font-display text-lg font-semibold">
              Eliminar a {patientLabel}
            </h3>
            <p className="mb-6 text-[13.5px] text-muted">
              Se borrará su cuenta, todos sus programas, ejercicios asignados y
              registros de dolor. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
              >
                Cancelar
              </button>
              <ActionForm
                action={deleteAction}
                onSubmit={() => setModal(null)}
                className="flex-1"
              >
                {(pending) => (
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-lg border border-ember bg-ember px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover disabled:opacity-60"
                  >
                    {pending ? "Eliminando…" : "Sí, eliminar"}
                  </button>
                )}
              </ActionForm>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
