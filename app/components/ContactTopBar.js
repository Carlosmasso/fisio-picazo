import { Clock, MapPin, Phone } from "lucide-react";
import { location } from "../lib/site-content";

export default function ContactTopBar() {
  return (
    <div className="hidden h-9 items-center justify-center gap-6 border-b border-line bg-surface px-8 font-mono text-[11.5px] text-muted md:flex">
      <span className="flex items-center gap-1.5">
        <MapPin size={13} className="text-frost" />
        {location.addressLocality}
      </span>
      <a
        href={`tel:+${location.whatsapp}`}
        className="flex items-center gap-1.5 transition-colors hover:text-foreground"
      >
        <Phone size={13} className="text-frost" />
        {location.phoneDisplay}
      </a>
      <span className="flex items-center gap-1.5">
        <Clock size={13} className="text-frost" />
        {location.hours.map((h) => `${h.short} ${h.opens}-${h.closes}`).join(" · ")}
      </span>
    </div>
  );
}
