"use client";

import { useModal } from "./ModalProvider";
import PulseWaveform from "./PulseWaveform";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <header className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-8 pt-25 pb-15">
      <div className="mb-5.5 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost">
        Fisioterapia deportiva &amp; rendimiento
      </div>
      <h1 className="mb-6.5 max-w-3xl font-display text-[clamp(42px,7vw,84px)] leading-[0.98] font-bold">
        Tu cuerpo registra
        <br />
        cada señal. <span className="text-ember">Yo la leo.</span>
      </h1>
      <p className="mb-9.5 max-w-[520px] text-lg text-muted">
        Recuperación, prevención y rendimiento con seguimiento real: cada plan se
        ajusta a tu lesión, tu deporte y tu evolución semana a semana.
      </p>
      <div className="mb-17.5 flex flex-wrap gap-3.5">
        <a
          href="#planes"
          className="rounded-[10px] border border-ember bg-ember px-7 py-3.5 text-[15px] font-semibold text-bg transition-all hover:-translate-y-px hover:bg-ember-hover"
        >
          Reservar primera valoración
        </a>
        <button
          type="button"
          onClick={() => openModal("login")}
          className="rounded-[10px] border border-line px-7 py-3.5 text-[15px] font-semibold transition-colors hover:border-frost hover:text-frost"
        >
          Ya soy cliente →
        </button>
      </div>

      <PulseWaveform />
    </header>
  );
}
