import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import CreatePatientForm from "./CreatePatientForm";
import PatientActionsMenu from "./PatientActionsMenu";

export const metadata = { title: "Pacientes · Panel" };

export default async function AdminPatientsPage() {
  const supabase = await createClient();
  const { data: patients } = await supabase
    .from("profiles")
    .select("id, full_name, email, created_at, programs(status)")
    .eq("role", "patient")
    .order("created_at", { ascending: false });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h2 className="mb-6 text-lg font-semibold">Pacientes ({patients?.length ?? 0})</h2>

        <div className="flex flex-col gap-3">
          {patients?.map((patient) => {
            const hasActive = patient.programs?.some((p) => p.status === "active");
            return (
              <div
                key={patient.id}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-frost"
              >
                <Link
                  href={`/admin/patients/${patient.id}`}
                  className="flex flex-1 items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-medium">{patient.full_name || patient.email}</div>
                    <div className="text-[13px] text-muted">{patient.email}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] ${
                      hasActive ? "bg-frost-dim text-frost" : "bg-ember-dim text-ember"
                    }`}
                  >
                    {hasActive ? "Programa activo" : "Sin programa"}
                  </span>
                </Link>
                <PatientActionsMenu
                  patient={{
                    id: patient.id,
                    full_name: patient.full_name,
                    email: patient.email,
                  }}
                />
              </div>
            );
          })}

          {!patients?.length && (
            <p className="text-sm text-muted">Todavía no hay pacientes registrados.</p>
          )}
        </div>
      </div>

      <CreatePatientForm />
    </div>
  );
}
