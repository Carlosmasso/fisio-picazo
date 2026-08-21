import Link from "next/link";
import { brand } from "../lib/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-8 pt-22.5 pb-10">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-8.5 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-15">
          <h2 className="max-w-[520px] font-display text-[clamp(28px,4vw,42px)] font-semibold">
            ¿Listo para entrenar tu recuperación con datos, no con suposiciones?
          </h2>
          <a
            href="#planes"
            className="rounded-[10px] border border-ember bg-ember px-7 py-3.5 text-[15px] font-semibold text-bg transition-all hover:-translate-y-px hover:bg-ember-hover"
          >
            Reservar valoración inicial
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
          <span>© 2026 {brand.name} · Fisioterapia Deportiva</span>
          <Link href="/servicios" className="transition-colors hover:text-foreground">
            Servicios
          </Link>
          <Link href="/privacidad" className="transition-colors hover:text-foreground">
            Política de privacidad
          </Link>
          <span className="font-mono">{brand.city}</span>
        </div>
      </div>
    </footer>
  );
}
