import { location } from "../lib/site-content";
import WhatsAppIcon from "./WhatsAppIcon";

const whatsappHref = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
  "Hola, me gustaría pedir información sobre fisioterapia."
)}`;

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-4 left-4 z-[300] flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
