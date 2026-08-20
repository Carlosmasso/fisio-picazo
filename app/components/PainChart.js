"use client";

import { useState } from "react";

const WIDTH = 560;
const HEIGHT = 200;
const PAD_LEFT = 28;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;
const PLOT_WIDTH = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = HEIGHT - PAD_TOP - PAD_BOTTOM;

export default function PainChart({ data, title = "Evolución del dolor (EVA)" }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (data.length < 2) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6">
        <h3 className="mb-2 text-[13px] font-medium tracking-[0.06em] text-muted uppercase">
          {title}
        </h3>
        <p className="text-sm text-muted">
          Todavía no hay suficientes registros de dolor para mostrar una evolución.
        </p>
      </div>
    );
  }

  const xFor = (i) => PAD_LEFT + (i / (data.length - 1)) * PLOT_WIDTH;
  const yFor = (v) => PAD_TOP + PLOT_HEIGHT - (v / 10) * PLOT_HEIGHT;

  const linePath = data
    .map((p, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(p.value)}`)
    .join(" ");
  const areaPath = `${linePath} L${xFor(data.length - 1)},${PAD_TOP + PLOT_HEIGHT} L${xFor(0)},${PAD_TOP + PLOT_HEIGHT} Z`;

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    data.forEach((_, i) => {
      const dist = Math.abs(xFor(i) - x);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-medium tracking-[0.06em] text-muted uppercase">{title}</h3>
        <details className="text-[12px] text-muted">
          <summary className="cursor-pointer list-none select-none hover:text-foreground">
            Ver tabla
          </summary>
          <div className="absolute right-8 z-10 mt-2 max-h-48 w-48 overflow-y-auto rounded-lg border border-line bg-surface-2 shadow-lg">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="px-2.5 py-1.5 font-normal">Fecha</th>
                  <th className="px-2.5 py-1.5 font-normal">Dolor</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice()
                  .reverse()
                  .map((p, i) => (
                    <tr key={i} className="border-b border-line last:border-0">
                      <td className="px-2.5 py-1.5 tabular-nums">
                        {p.date.toLocaleDateString("es-ES")}
                      </td>
                      <td className="px-2.5 py-1.5 tabular-nums">{p.value}/10</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full touch-none"
        onPointerMove={handleMove}
        onPointerLeave={() => setHoverIndex(null)}
        role="img"
        aria-label={`${title}: ${data.length} registros, de ${data[0].value} a ${data[data.length - 1].value} sobre 10`}
      >
        {[0, 5, 10].map((tick) => (
          <g key={tick}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yFor(tick)}
              y2={yFor(tick)}
              stroke="var(--color-line)"
              strokeWidth="1"
            />
            <text
              x={PAD_LEFT - 8}
              y={yFor(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted font-mono text-[10px]"
            >
              {tick}
            </text>
          </g>
        ))}

        <path d={areaPath} fill="var(--color-frost)" opacity="0.1" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-frost)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {hovered && (
          <line
            x1={xFor(hoverIndex)}
            x2={xFor(hoverIndex)}
            y1={PAD_TOP}
            y2={PAD_TOP + PLOT_HEIGHT}
            stroke="var(--color-muted)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}

        {data.map((p, i) => (
          <circle
            key={i}
            cx={xFor(i)}
            cy={yFor(p.value)}
            r={i === hoverIndex ? 5 : 4}
            fill="var(--color-frost)"
            stroke="var(--color-surface)"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-1 text-center font-mono text-[12px] text-muted">
        {hovered ? (
          <>
            {hovered.date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })} ·{" "}
            <span className="font-medium text-foreground">{hovered.value}/10</span>
          </>
        ) : (
          <>&nbsp;</>
        )}
      </div>
    </div>
  );
}
