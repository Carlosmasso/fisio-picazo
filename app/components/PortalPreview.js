import { portalPreview } from "../lib/site-content";

export default function PortalPreview() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-line px-5.5 py-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <div className="font-mono text-xs text-muted">{portalPreview.domain}</div>
        <div className="w-10" />
      </div>

      <div className="grid min-h-[420px] grid-cols-1 sm:grid-cols-[220px_1fr]">
        <div className="hidden border-r border-line bg-surface-2 px-4.5 py-6 sm:block">
          <div className="mb-7 flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-linear-to-br from-ember to-frost" />
            <div>
              <span className="block text-[13.5px] font-semibold">{portalPreview.user.name}</span>
              <span className="block font-mono text-[11.5px] text-frost">{portalPreview.user.tag}</span>
            </div>
          </div>
          {portalPreview.navLinks.map((link, i) => (
            <div
              key={link}
              className={`mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-[13.5px] ${
                i === 0 ? "bg-surface text-foreground" : "text-muted"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-ember" : "bg-line"}`} />
              {link}
            </div>
          ))}
        </div>

        <div className="px-7.5 py-7">
          <h4 className="mb-4.5 text-[13px] font-medium tracking-[0.06em] text-muted uppercase">
            Resumen de esta semana
          </h4>
          <div className="mb-6.5 grid grid-cols-2 gap-4">
            {portalPreview.weeklyStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-surface-2 p-4.5">
                <div className="font-mono text-[26px] text-frost">{stat.value}</div>
                <div className="mt-1 text-[12.5px] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          <h4 className="mb-4.5 text-[13px] font-medium tracking-[0.06em] text-muted uppercase">
            Ejercicios de hoy
          </h4>
          {portalPreview.todayExercises.map((ex) => (
            <div
              key={ex.name}
              className="mb-2.5 flex items-center justify-between rounded-[10px] border border-line bg-surface-2 px-4 py-3.5 text-sm"
            >
              {ex.name}
              <span
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] ${
                  ex.status === "done" ? "bg-frost-dim text-frost" : "bg-ember-dim text-ember"
                }`}
              >
                {ex.status === "done" ? "Hecho" : "Pendiente"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
