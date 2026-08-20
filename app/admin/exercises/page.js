import { createClient } from "../../lib/supabase/server";
import { zones } from "../../lib/site-content";
import ExerciseForm from "./ExerciseForm";

export const metadata = { title: "Ejercicios · Panel" };

export default async function AdminExercisesPage() {
  const supabase = await createClient();
  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, title, description, zone, video_path, created_at")
    .order("created_at", { ascending: false });

  const videoPaths = (exercises ?? []).map((ex) => ex.video_path).filter(Boolean);
  let signedUrlByPath = {};
  if (videoPaths.length) {
    const { data: signed } = await supabase.storage
      .from("exercise-videos")
      .createSignedUrls(videoPaths, 3600);
    signed?.forEach((s, i) => {
      if (s.signedUrl) signedUrlByPath[videoPaths[i]] = s.signedUrl;
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h2 className="mb-6 text-lg font-semibold">Biblioteca de ejercicios ({exercises?.length ?? 0})</h2>
        <div className="flex flex-col gap-3">
          {exercises?.map((ex) => {
            const zoneLabel = zones.find((z) => z.id === ex.zone)?.label;
            const videoUrl = ex.video_path ? signedUrlByPath[ex.video_path] : null;
            return (
              <div key={ex.id} className="rounded-xl border border-line bg-surface p-5">
                <div className="mb-1 flex flex-wrap items-center gap-2.5">
                  <h3 className="font-medium">{ex.title}</h3>
                  {zoneLabel && (
                    <span className="rounded-md border border-frost-dim px-2 py-0.5 font-mono text-[11px] text-frost">
                      {zoneLabel}
                    </span>
                  )}
                </div>
                {ex.description && (
                  <p className="mb-2 text-[13.5px] text-muted">{ex.description}</p>
                )}
                {videoUrl && (
                  <video
                    controls
                    preload="metadata"
                    src={videoUrl}
                    className="mt-2 w-full max-w-xs rounded-lg border border-line"
                  />
                )}
              </div>
            );
          })}
          {!exercises?.length && (
            <p className="text-sm text-muted">Todavía no hay ejercicios en la biblioteca.</p>
          )}
        </div>
      </div>

      <ExerciseForm />
    </div>
  );
}
