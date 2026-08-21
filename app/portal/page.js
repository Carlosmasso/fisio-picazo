import { requireProfile } from "../lib/dal";
import { createClient } from "../lib/supabase/server";
import { markExerciseDone } from "./actions";
import { zones } from "../lib/site-content";
import PainChart from "../components/PainChart";
import ProgramHistory from "../components/ProgramHistory";

export const metadata = {
  title: "Mi portal · Álvaro Picazo Fisioterapia",
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

async function getActiveProgram(supabase, patientId) {
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("patient_id", patientId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!program) return null;

  const { data: programExercises } = await supabase
    .from("program_exercises")
    .select(
      "id, sets, reps, notes, order_index, exercises(id, title, description, video_path)"
    )
    .eq("program_id", program.id)
    .order("order_index", { ascending: true });

  const { data: todayLogs } = await supabase
    .from("exercise_logs")
    .select("program_exercise_id, pain_score, completed_at")
    .eq("patient_id", patientId)
    .gte("completed_at", startOfToday());

  const videoPaths = (programExercises ?? [])
    .map((pe) => pe.exercises?.video_path)
    .filter(Boolean);

  let signedUrlByPath = {};
  if (videoPaths.length) {
    const { data: signed } = await supabase.storage
      .from("exercise-videos")
      .createSignedUrls(videoPaths, 3600);
    signed?.forEach((s, i) => {
      if (s.signedUrl) signedUrlByPath[videoPaths[i]] = s.signedUrl;
    });
  }

  return { program, programExercises: programExercises ?? [], todayLogs: todayLogs ?? [], signedUrlByPath };
}

async function getProgramHistory(supabase, patientId) {
  const { data: pastPrograms } = await supabase
    .from("programs")
    .select("*")
    .eq("patient_id", patientId)
    .neq("status", "active")
    .order("started_at", { ascending: false });

  if (!pastPrograms?.length) return [];

  const { data: pastExercises } = await supabase
    .from("program_exercises")
    .select("id, program_id, sets, reps, order_index, exercises(id, title)")
    .in(
      "program_id",
      pastPrograms.map((p) => p.id)
    )
    .order("order_index", { ascending: true });

  const exercisesByProgram = (pastExercises ?? []).reduce((acc, pe) => {
    const list = acc[pe.program_id] ?? (acc[pe.program_id] = []);
    list.push({ id: pe.id, title: pe.exercises?.title, sets: pe.sets, reps: pe.reps });
    return acc;
  }, {});

  return pastPrograms.map((p) => ({
    ...p,
    exercises: exercisesByProgram[p.id] ?? [],
  }));
}

async function getPainHistory(supabase, patientId) {
  const { data } = await supabase
    .from("exercise_logs")
    .select("completed_at, pain_score")
    .eq("patient_id", patientId)
    .not("pain_score", "is", null)
    .order("completed_at", { ascending: true })
    .limit(30);

  return (data ?? []).map((log) => ({
    date: new Date(log.completed_at),
    value: log.pain_score,
  }));
}

export default async function PortalPage() {
  const profile = await requireProfile();
  const supabase = await createClient();
  const data = await getActiveProgram(supabase, profile.id);
  const painHistory = await getPainHistory(supabase, profile.id);
  const programHistory = await getProgramHistory(supabase, profile.id);

  const zoneLabel = data ? zones.find((z) => z.id === data.program.zone)?.label : null;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1180px] px-8 pt-32 pb-20">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 font-display text-3xl font-semibold">
            Hola, {profile.full_name?.split(" ")[0] || "paciente"}
          </h1>
          <p className="text-sm text-muted">
            {data ? (
              <span className="font-mono text-frost">
                {(zoneLabel ?? data.program.zone).toUpperCase()} · FASE {data.program.phase}
              </span>
            ) : (
              "Aún no tienes un programa asignado."
            )}
          </p>
        </div>
      </div>

      <div className="mb-9">
        <PainChart data={painHistory} />
      </div>

      {!data ? (
        <div className="rounded-2xl border border-line bg-surface p-9 text-center">
          <p className="text-[15px] text-muted">
            Todavía no tienes un programa asignado. En cuanto Álvaro lo suba a
            la plataforma, aparecerá aquí con tus ejercicios y vídeos.
          </p>
        </div>
      ) : (
        <PortalProgram data={data} />
      )}

      {programHistory.length > 0 && (
        <div className="mt-9">
          <ProgramHistory programs={programHistory} />
        </div>
      )}
    </main>
  );
}

function PortalProgram({ data }) {
  const { programExercises, todayLogs, signedUrlByPath } = data;
  const doneIds = new Set(todayLogs.map((l) => l.program_exercise_id));
  const lastPainScore = todayLogs.length
    ? todayLogs[todayLogs.length - 1].pain_score
    : null;

  return (
    <>
      <div className="mb-9 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-xl border border-line bg-surface-2 p-4.5">
          <div className="font-mono text-[26px] text-frost">
            {doneIds.size}/{programExercises.length}
          </div>
          <div className="mt-1 text-[12.5px] text-muted">Ejercicios de hoy completados</div>
        </div>
        <div className="rounded-xl border border-line bg-surface-2 p-4.5">
          <div className="font-mono text-[26px] text-frost">
            {lastPainScore ?? "—"}/10
          </div>
          <div className="mt-1 text-[12.5px] text-muted">Dolor (EVA) hoy</div>
        </div>
      </div>

      <h2 className="mb-4.5 text-[13px] font-medium tracking-[0.06em] text-muted uppercase">
        Tus ejercicios
      </h2>

      <div className="flex flex-col gap-4">
        {programExercises.map((pe) => {
          const exercise = pe.exercises;
          const done = doneIds.has(pe.id);
          const videoUrl = exercise?.video_path ? signedUrlByPath[exercise.video_path] : null;

          return (
            <div key={pe.id} className="rounded-2xl border border-line bg-surface p-6">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{exercise?.title ?? "Ejercicio"}</h3>
                  <p className="mt-0.5 font-mono text-[12.5px] text-muted">
                    {pe.sets ? `${pe.sets}x` : ""}
                    {pe.reps ?? ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] ${
                    done ? "bg-frost-dim text-frost" : "bg-ember-dim text-ember"
                  }`}
                >
                  {done ? "Hecho" : "Pendiente"}
                </span>
              </div>

              {exercise?.description && (
                <p className="mb-3 text-[14px] text-muted">{exercise.description}</p>
              )}

              {videoUrl && (
                <video
                  controls
                  preload="metadata"
                  src={videoUrl}
                  className="mb-3 w-75 rounded-lg border border-line"
                />
              )}

              {pe.notes && (
                <p className="mb-3 text-[13px] text-muted italic">{pe.notes}</p>
              )}

              {!done && (
                <form
                  action={markExerciseDone.bind(null, pe.id)}
                  className="flex flex-wrap items-center gap-3"
                >
                  <label className="flex items-center gap-2 text-[13px] text-muted">
                    Dolor (0-10)
                    <input
                      type="number"
                      name="pain_score"
                      min="0"
                      max="10"
                      className="w-16 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-sm text-foreground focus:border-frost focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-lg border border-frost px-4 py-2 text-sm font-semibold text-frost transition-colors hover:bg-frost-dim"
                  >
                    Marcar como hecho
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
