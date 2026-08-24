import { brand } from "../lib/site-content";
import SectionHeader from "../components/SectionHeader";
import Gallery from "./Gallery";
import {
  modules,
  roadmap,
  totalMarket,
  totalFinal,
  savings,
  savingsPct,
  frontendPct,
  backendPct,
  iva,
  totalWithIva,
  eur,
  eurCents,
} from "./data";

export const metadata = {
  title: `Presupuesto · ${brand.name}`,
  robots: { index: false, follow: false },
};

const cardClass = "rounded-2xl border border-line bg-surface p-7";

export default function PresupuestoPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[880px] px-5 pt-32 pb-28 sm:px-8">
      {/* ---------- Cover ---------- */}
      <div className="mb-16 border-b border-line pb-11">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost">
          Presupuesto
        </div>
        <h1 className="mb-5 text-balance text-[clamp(32px,5vw,46px)] font-semibold leading-[1.08]">
          Sistema de gestión y seguimiento digital de pacientes
        </h1>
        <p className="mb-9 max-w-[62ch] text-base text-muted sm:text-lg">
          No una web corporativa suelta: un sistema completo —web, acceso privado,
          panel de administración, portal del paciente y cobro de suscripciones—
          para {brand.name} {brand.tagline}. Ya está construido y en funcionamiento
          sobre datos reales; solo queda por cerrar el cobro automático de las
          suscripciones. Está hecho a medida de cómo trabajas tú, no es una
          plantilla cerrada — lo que ves aquí es la base, y sigue abierto a cambios
          según lo que necesites de verdad.
        </p>
        <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="mb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">
              Preparado para
            </dt>
            <dd className="font-medium">{brand.name}</dd>
          </div>
          <div>
            <dt className="mb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">
              Fecha
            </dt>
            <dd className="font-medium">Agosto de 2026</dd>
          </div>
          <div>
            <dt className="mb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">
              Validez
            </dt>
            <dd className="font-medium">30 días</dd>
          </div>
          <div>
            <dt className="mb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">
              Estado
            </dt>
            <dd className="font-medium">v1 construida · falta conectar el cobro</dd>
          </div>
        </dl>
      </div>

      {/* ---------- Resumen ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Resumen"
          title="Qué incluye este presupuesto"
          description="Siete bloques de trabajo. Los seis primeros ya están construidos y en marcha; el séptimo (la pasarela de pagos) es el que queda por implementar y ya está incluido en este presupuesto."
        />
        <div className="flex flex-wrap gap-2.5">
          {modules.map((m) => (
            <div key={m.n} className="flex-1 min-w-[200px] rounded-lg border border-line bg-surface px-4 py-3.5">
              <div className="mb-1 font-mono text-xs text-ember">{m.n}</div>
              <div className="text-sm font-medium">{m.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Capturas ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Capturas"
          title="El producto, en las tres vistas"
          description="Capturas reales de la aplicación en marcha, con datos de ejemplo (ningún dato de un paciente real aparece aquí)."
        />
        <Gallery />
      </section>

      {/* ---------- Credenciales ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Pruébalo tú mismo"
          title="Credenciales de acceso"
          description={`Pulsa "Acceso clientes" arriba a la derecha con cualquiera de estas dos cuentas para ver las dos caras de la plataforma en vivo.`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-3.5 font-mono text-[11px] tracking-[0.08em] text-frost uppercase">
              Vista cliente / paciente
            </div>
            <div className="flex items-baseline justify-between border-b border-line py-2 text-sm">
              <span className="text-muted">Email</span>
              <b className="font-mono">test@gmail.com</b>
            </div>
            <div className="flex items-baseline justify-between py-2 text-sm">
              <span className="text-muted">Contraseña</span>
              <b className="font-mono">test123</b>
            </div>
          </div>
          <div className={cardClass}>
            <div className="mb-3.5 font-mono text-[11px] tracking-[0.08em] text-ember uppercase">
              Vista administrador
            </div>
            <div className="flex items-baseline justify-between border-b border-line py-2 text-sm">
              <span className="text-muted">Email</span>
              <b className="font-mono">admin@gmail.com</b>
            </div>
            <div className="flex items-baseline justify-between py-2 text-sm">
              <span className="text-muted">Contraseña</span>
              <b className="font-mono">admin123</b>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Desglose ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Desglose"
          title="Módulos y justificación de cada uno"
        />
        <p className="mb-10 max-w-[68ch] text-[15.5px] text-muted">
          No es una simple “página web”: es un sistema de gestión y seguimiento
          digital de pacientes, con cobro de suscripciones incluido. Precio por
          proyecto cerrado, no por horas. Lo que se ve a simple vista —el sitio
          público— es solo el <strong className="text-ember">{frontendPct}%</strong> de
          este precio; el <strong className="text-ember">{backendPct}%</strong> restante
          está en lo que no se ve pero es lo que hace que el sistema funcione de
          verdad: autenticación, seguridad de datos de salud, panel de
          administración, base de datos y portal del paciente.
        </p>

        <div className="flex flex-col">
          {modules.map((m) => (
            <article key={m.n} className="border-t border-line py-7 first:border-t-0">
              <div className="mb-3.5 flex items-baseline gap-3.5">
                <span className="font-mono text-[13px] text-ember">{m.n}</span>
                <h3 className="flex-1 text-lg font-semibold">{m.title}</h3>
                {m.pending && (
                  <span className="rounded-full border border-frost bg-frost-dim px-2.5 py-1 font-mono text-[10px] tracking-[0.05em] text-frost uppercase">
                    pendiente de construir
                  </span>
                )}
              </div>
              <ul className="mb-4.5 flex flex-col gap-1.5">
                {m.items.map((item) => (
                  <li key={item} className="text-[14.5px] text-muted">
                    — {item}
                  </li>
                ))}
              </ul>
              <div className="flex max-w-[340px] gap-3">
                <div className="flex-1 rounded-lg border border-line bg-surface-2 px-3.5 py-2.5">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
                    Mercado
                  </div>
                  <div className="font-mono text-[15px] text-muted line-through">
                    {eur(m.market)}
                  </div>
                </div>
                <div className="flex-1 rounded-lg border border-frost bg-frost-dim px-3.5 py-2.5">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-frost uppercase">
                    Precio final
                  </div>
                  <div className="font-mono text-[15px] font-semibold text-frost">
                    {eur(m.final)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`${cardClass} mt-10`}>
          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <div className="mb-1 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Precio de mercado
              </div>
              <div className="font-mono text-2xl text-muted line-through">{eur(totalMarket)}</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                Precio final (sin IVA)
              </div>
              <div className="font-mono text-2xl font-semibold text-frost">{eur(totalFinal)}</div>
            </div>
          </div>
          <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 rounded-lg border border-frost bg-frost-dim px-4 py-3.5 text-sm">
            <span>
              Base imponible: <b className="font-mono">{eur(totalFinal)}</b>
            </span>
            <span>
              + IVA (21%): <b className="font-mono">{eurCents(iva)}</b>
            </span>
            <span>
              Total con IVA: <b className="font-mono text-frost">{eurCents(totalWithIva)}</b>
            </span>
          </div>
          <p className="text-sm text-muted">
            Ahorro frente al precio de mercado:{" "}
            <b className="font-mono text-ember">{eur(savings)}</b> ({savingsPct}%)
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-frost bg-frost-dim/40 p-7">
          <p className="text-[15px]">
            Esto es lo que hay detrás del precio: cada paciente solo puede ver sus
            propios datos, verificado a nivel de base de datos y no solo en la
            pantalla; el cierre de sesión automático y la recuperación de
            contraseña ya están resueltos; cada función se ha probado contra datos
            reales antes de darse por terminada, no contra una maqueta. Es la
            plataforma que tus pacientes de prueba están usando hoy, no un boceto.
          </p>
          <p className="text-[15px]">
            Es además un sistema que te genera ingresos, no solo un gasto: los
            planes de 39/79/149 €/mes se cobrarán directamente desde tu propia
            plataforma en cuanto se conecte la pasarela de pagos, sin depender de
            ningún software de terceros.
          </p>
        </div>

        <p className="mt-6 text-[13px] text-muted">
          Metodología: “precio de mercado” recoge lo que cobra habitualmente un
          desarrollador freelance en España por un encargo de este alcance en 2026
          (estructura de datos, seguridad, panel de administración, portal de
          cliente y pasarela de pago). El precio final se ha fijado con el margen
          de confianza propio de trabajar para alguien cercano — no es un cálculo
          de horas × tarifa.
        </p>
      </section>

      {/* ---------- Soporte y mantenimiento ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Después de la entrega"
          title="Soporte y mantenimiento"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-2 font-mono text-[11px] tracking-[0.08em] text-frost uppercase">
              Incluido, sin coste
            </div>
            <p className="text-[14.5px] text-muted">
              Una ronda de ajustes menores tras la entrega — retoques y pequeños
              cambios sobre lo ya construido.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-2 font-mono text-[11px] tracking-[0.08em] text-ember uppercase">
              Opcional
            </div>
            <p className="text-[14.5px] text-muted">
              Si después quieres tenerme disponible de forma continua —pequeños
              cambios, corrección de incidencias, actualizaciones, dudas—, puedo
              ofrecerte un mantenimiento mensual desde{" "}
              <b className="text-foreground">50–75 €/mes</b>, sin permanencia
              mínima.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Roadmap ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Roadmap"
          title="Posibles evolutivos"
          description="Ideas para más adelante, fuera de este presupuesto — ninguna está construida todavía. Tamaño orientativo de cada una, no precio cerrado."
        />
        <div className="flex flex-col gap-2.5">
          {roadmap.map((r) => (
            <div
              key={r.title}
              className="flex flex-col gap-2 rounded-lg border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <span className="font-medium sm:w-[190px] sm:shrink-0">{r.title}</span>
              <span className="flex-1 text-[14px] text-muted">{r.desc}</span>
              <span
                className={`w-fit rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.05em] uppercase ${
                  r.size === "l"
                    ? "border-ember bg-ember-dim text-ember"
                    : r.size === "m"
                      ? "border-line bg-surface-2 text-muted"
                      : "border-frost bg-frost-dim text-frost"
                }`}
              >
                {r.sizeLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Infraestructura ---------- */}
      <section className="mb-20">
        <SectionHeader
          eyebrow="Costes recurrentes"
          title="Infraestructura (no incluida en el presupuesto)"
          description="Costes de terceros que corren por cuenta del cliente, al margen de tu trabajo."
        />
        <div className="flex flex-col overflow-hidden rounded-2xl border border-line">
          {[
            ["Dominio propio", "≈ 12–15 €/año"],
            ["Hosting (Vercel)", "gratuito en el nivel actual · ampliable desde 20 $/mes"],
            ["Base de datos (Supabase)", "gratuito en el nivel actual · ampliable desde 25 $/mes"],
            ["WhatsApp Business", "gratuito"],
          ].map(([label, cost], i) => (
            <div
              key={label}
              className={`flex flex-wrap items-center justify-between gap-3 bg-surface px-5 py-3.5 text-[14.5px] ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span>{label}</span>
              <span className="font-mono text-[13px] text-muted">{cost}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Condiciones ---------- */}
      <section>
        <SectionHeader eyebrow="Condiciones" title="Términos" />
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="mb-2.5 font-mono text-[11.5px] tracking-[0.08em] text-frost uppercase">
              Forma de pago
            </h4>
            <p className="text-[14.5px] text-muted">
              El sistema ya está construido y en marcha, así que no hay “inicio”
              que adelantar — un único pago al aceptar el presupuesto, o si lo
              prefieres, lo dividimos en dos y la segunda parte se liga a la
              conexión de la pasarela de pagos.
            </p>
          </div>
          <div>
            <h4 className="mb-2.5 font-mono text-[11.5px] tracking-[0.08em] text-frost uppercase">
              Incluye
            </h4>
            <ul className="flex flex-col gap-1.5 text-[14.5px] text-muted">
              <li>— Código fuente completo</li>
              <li>— Sin licencias de terceros más allá de los servicios usados</li>
              <li>— Una ronda de ajustes menores tras la entrega</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2.5 font-mono text-[11.5px] tracking-[0.08em] text-frost uppercase">
              No incluye
            </h4>
            <ul className="flex flex-col gap-1.5 text-[14.5px] text-muted">
              <li>— Coste de hosting, dominio o base de datos (ver infraestructura)</li>
              <li>— Fotografía o vídeo real de la clínica</li>
              <li>— Revisión legal de la política de privacidad</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2.5 font-mono text-[11.5px] tracking-[0.08em] text-frost uppercase">
              Sobre el precio
            </h4>
            <p className="text-[14.5px] text-muted">
              Es un punto de partida, no una cifra cerrada — si hay algo que
              ajustar, lo hablamos.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-20 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[13px] text-muted">
        <span>Presupuesto preparado en agosto de 2026.</span>
        <span>Cifras orientativas — ajustables antes de cerrarse.</span>
      </footer>
    </main>
  );
}
