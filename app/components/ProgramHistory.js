import { zones } from "../lib/site-content";

const statusLabel = { active: "Activo", paused: "Pausado", completed: "Completado" };

export default function ProgramHistory({ programs }) {
  if (!programs.length) return null;

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-muted uppercase">Historial de programas</h3>
      <div className="flex flex-col gap-2.5">
        {programs.map((p) => (
          <details
            key={p.id}
            className="group rounded-lg border border-line bg-surface-2 open:bg-surface"
          >
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
              <span>
                {zones.find((z) => z.id === p.zone)?.label ?? p.zone} · FASE {p.phase}
                <span className="ml-2 text-[12.5px] text-muted">
                  desde {new Date(p.started_at).toLocaleDateString("es-ES")}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  {statusLabel[p.status] ?? p.status}
                </span>
                <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
              </span>
            </summary>
            <div className="border-t border-line px-4 py-3">
              {p.exercises.length ? (
                <ul className="flex flex-col gap-1.5">
                  {p.exercises.map((ex) => (
                    <li key={ex.id} className="text-[13.5px] text-muted">
                      <span className="text-foreground">{ex.title}</span>
                      {ex.sets ? ` — ${ex.sets}x${ex.reps ?? ""}` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-muted">Este programa no tenía ejercicios asignados.</p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
