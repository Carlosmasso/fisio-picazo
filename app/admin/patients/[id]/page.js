import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import { zones } from "../../../lib/site-content";
import PainChart from "../../../components/PainChart";
import ProgramHistory from "../../../components/ProgramHistory";
import CompletedProgramModal from "./CompletedProgramModal";
import ResetPasswordButton from "./ResetPasswordButton";
import DeletePatientButton from "./DeletePatientButton";

import {
  createProgram,
  updateProgramStatus,
  addProgramExercise,
  removeProgramExercise,
} from "../../actions";

export const metadata = { title: "Paciente · Panel" };

export default async function AdminPatientPage({ params, searchParams }) {
  const { id } = await params;
  const { completed } = await searchParams;
  const supabase = await createClient();

  const { data: patient } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .eq("role", "patient")
    .single();

  if (!patient) notFound();

  const { data: allPrograms } = await supabase
    .from("programs")
    .select("*")
    .eq("patient_id", id)
    .order("started_at", { ascending: false });

  const program = allPrograms?.find((p) => p.status === "active") ?? null;
  const pastPrograms = allPrograms?.filter((p) => p.status !== "active") ?? [];

  let pastProgramExercisesByProgram = {};
  if (pastPrograms.length) {
    const { data: pastExercises } = await supabase
      .from("program_exercises")
      .select("id, program_id, sets, reps, order_index, exercises(id, title)")
      .in(
        "program_id",
        pastPrograms.map((p) => p.id)
      )
      .order("order_index", { ascending: true });

    pastProgramExercisesByProgram = (pastExercises ?? []).reduce((acc, pe) => {
      const list = acc[pe.program_id] ?? (acc[pe.program_id] = []);
      list.push({ id: pe.id, title: pe.exercises?.title, sets: pe.sets, reps: pe.reps });
      return acc;
    }, {});
  }

  const pastProgramsWithExercises = pastPrograms.map((p) => ({
    ...p,
    exercises: pastProgramExercisesByProgram[p.id] ?? [],
  }));

  let programExercises = [];
  if (program) {
    const { data } = await supabase
      .from("program_exercises")
      .select("id, sets, reps, notes, order_index, exercises(id, title)")
      .eq("program_id", program.id)
      .order("order_index", { ascending: true });
    programExercises = data ?? [];
  }

  const { data: exerciseLibrary } = await supabase
    .from("exercises")
    .select("id, title, zone")
    .order("title", { ascending: true });

  const { data: painLogs } = await supabase
    .from("exercise_logs")
    .select("completed_at, pain_score")
    .eq("patient_id", id)
    .not("pain_score", "is", null)
    .order("completed_at", { ascending: true })
    .limit(30);

  const painHistory = (painLogs ?? []).map((log) => ({
    date: new Date(log.completed_at),
    value: log.pain_score,
  }));

  const justCompleted = completed === "1" && !program;

  return (
    <div>
      <CompletedProgramModal show={justCompleted} />

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{patient.full_name || patient.email}</h2>
          <p className="text-sm text-muted">{patient.email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ResetPasswordButton patientId={id} />
          <DeletePatientButton
            patientId={id}
            patientName={patient.full_name || patient.email}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <PainChart data={painHistory} />

        {program && (
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-ember">
                {zones.find((z) => z.id === program.zone)?.label ?? program.zone} · FASE{" "}
                {program.phase}
              </span>
              <form action={updateProgramStatus.bind(null, program.id, id, "completed")} className="ml-auto">
                <button
                  type="submit"
                  className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-frost hover:text-frost"
                >
                  Marcar programa completado
                </button>
              </form>
            </div>

            <h3 className="mb-4 text-sm font-semibold text-muted uppercase">Ejercicios asignados</h3>
            <div className="mb-5 flex flex-col gap-2.5">
              {programExercises.map((pe) => (
                <div
                  key={pe.id}
                  className="flex items-center justify-between rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm"
                >
                  <span>
                    {pe.exercises?.title}
                    {pe.sets ? ` — ${pe.sets}x${pe.reps ?? ""}` : ""}
                  </span>
                  <form action={removeProgramExercise.bind(null, pe.id, id)}>
                    <button type="submit" className="text-xs text-muted hover:text-ember">
                      Quitar
                    </button>
                  </form>
                </div>
              ))}
              {!programExercises.length && (
                <p className="text-sm text-muted">Aún no hay ejercicios en este programa.</p>
              )}
            </div>

            <div className="max-w-md rounded-2xl border border-line bg-surface p-7">
              <h4 className="mb-4 text-sm font-semibold text-muted uppercase">Añadir ejercicio</h4>
              <form action={addProgramExercise.bind(null, program.id, id)} className="flex flex-col gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] text-muted">Ejercicio</span>
                  <select
                    name="exercise_id"
                    required
                    className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                  >
                    {exerciseLibrary?.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.title}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] text-muted">Series</span>
                    <input
                      type="number"
                      name="sets"
                      min="1"
                      className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] text-muted">Reps</span>
                    <input
                      type="text"
                      name="reps"
                      placeholder="10, 30s..."
                      className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] text-muted">Notas</span>
                  <input
                    type="text"
                    name="notes"
                    className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-lg border border-frost px-4 py-2.5 text-sm font-semibold text-frost transition-colors hover:bg-frost-dim"
                >
                  Añadir al programa
                </button>
              </form>
              {!exerciseLibrary?.length && (
                <p className="mt-3 text-[13px] text-muted">
                  Todavía no hay ejercicios en la biblioteca. Créalos primero en{" "}
                  <span className="text-frost">Ejercicios</span>.
                </p>
              )}
            </div>
          </div>
        )}

        {!program && (
          <div id="nuevo-programa" className="max-w-md scroll-mt-32 rounded-2xl border border-line bg-surface p-7">
            <h3 className="mb-4 text-sm font-semibold text-muted uppercase">Asignar un programa</h3>
            <form action={createProgram.bind(null, id)} className="flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] text-muted">Zona</span>
                <select
                  name="zone"
                  required
                  className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] text-muted">Fase</span>
                <input
                  type="number"
                  name="phase"
                  min="1"
                  defaultValue="1"
                  required
                  className="w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
                />
              </label>
              <button
                type="submit"
                className="rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover"
              >
                Crear programa
              </button>
            </form>
          </div>
        )}

        <ProgramHistory programs={pastProgramsWithExercises} />
      </div>
    </div>
  );
}
