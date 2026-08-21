import {
  Activity,
  Baby,
  Bandage,
  Brain,
  Dumbbell,
  Ribbon,
  ScanLine,
  Smile,
  Stethoscope,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { brand, location, services } from "../lib/site-content";

const icons = {
  Stethoscope,
  ScanLine,
  Zap,
  Dumbbell,
  Activity,
  Brain,
  Smile,
  Baby,
  Ribbon,
  Bandage,
  Wind,
  Users,
};

export const metadata = {
  title: `Servicios · ${brand.name}`,
  description:
    "Fisioterapia clínica, deportiva, invasiva, neurológica y más — el detalle de cada servicio que ofrecemos en consulta.",
};

const whatsappHref = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
  "Hola, tengo una duda sobre qué servicio necesito."
)}`;

export default function ServiciosPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1180px] px-8 pt-32 pb-24">
      <div className="mb-14 max-w-[640px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost">
          Qué hacemos en consulta
        </div>
        <h1 className="mb-4 text-[clamp(30px,4vw,44px)] font-semibold">Nuestros servicios</h1>
        <p className="text-base text-muted">
          Además del seguimiento por zona de lesión en tu portal, en consulta cubrimos
          estas áreas de tratamiento.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <div key={service.id} className="rounded-2xl border border-line bg-surface p-7">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-ember-dim bg-ember/10">
                <Icon size={18} className="text-ember" />
              </div>
              <h2 className="mb-2 text-lg font-semibold">{service.title}</h2>
              <p className="text-[15px] text-muted">{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-9">
        <div>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Tienes dudas sobre qué servicio necesitas?
          </h2>
          <p className="text-[15px] text-muted">
            Escríbenos por WhatsApp y te orientamos sin compromiso.
          </p>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[10px] border border-ember bg-ember px-7 py-3.5 text-[15px] font-semibold text-bg transition-all hover:-translate-y-px hover:bg-ember-hover"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </main>
  );
}
