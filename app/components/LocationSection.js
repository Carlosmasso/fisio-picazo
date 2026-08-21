import { Clock, Mail, MapPin } from "lucide-react";
import { location } from "../lib/site-content";
import WhatsAppIcon from "./WhatsAppIcon";

const mapsQuery = encodeURIComponent(`${location.name}, ${location.address}`);
const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsDirectionsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const whatsappHref = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
  "Hola, me gustaría pedir información sobre fisioterapia."
)}`;

export default function LocationSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
      <div className="flex flex-col justify-center rounded-2xl border border-line bg-surface p-7 sm:p-9">
        <h3 className="mb-2 text-xl font-semibold">{location.name}</h3>

        <div className="mb-6 flex flex-col gap-3 text-[15px] text-muted">
          <span className="flex items-start gap-2.5">
            <MapPin size={17} className="mt-0.5 shrink-0 text-frost" />
            <span className="max-w-[380px]">{location.address}</span>
          </span>
          <a
            href={`mailto:${location.email}`}
            className="flex items-center gap-2.5 transition-colors hover:text-foreground"
          >
            <Mail size={17} className="shrink-0 text-frost" />
            {location.email}
          </a>
          <span className="flex items-start gap-2.5">
            <Clock size={17} className="mt-0.5 shrink-0 text-frost" />
            <span className="flex flex-col gap-0.5">
              {location.hours.map((h) => (
                <span key={h.label}>
                  {h.label}: {h.opens}–{h.closes}
                </span>
              ))}
            </span>
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border border-frost bg-frost-dim px-5 py-3 text-sm font-semibold text-frost transition-colors hover:bg-frost hover:text-bg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escríbenos por WhatsApp
          </a>
          <a
            href={mapsDirectionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
          >
            Cómo llegar →
          </a>
        </div>
      </div>

      <div className="min-h-[280px] overflow-hidden rounded-2xl border border-line">
        <iframe
          src={mapsEmbedSrc}
          className="h-full min-h-[280px] w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${location.name}`}
        />
      </div>
    </div>
  );
}
