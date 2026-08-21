"use client";

import { useModal } from "./ModalProvider";
import PulseWaveform from "./PulseWaveform";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <header className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-5 pt-28 pb-10 sm:px-8 sm:pt-25 sm:pb-15">
      <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost sm:mb-5.5">
        Fisioterapia deportiva &amp; rendimiento
      </div>
      <h1 className="mb-5 max-w-3xl font-display text-[clamp(36px,10vw,84px)] leading-[1.02] font-bold sm:mb-6.5 sm:leading-[0.98]">
        Tu cuerpo registra
        <br />
        cada señal. <span className="text-ember">Yo la leo.</span>
      </h1>
      <p className="mb-8 max-w-[520px] text-base text-muted sm:mb-9.5 sm:text-lg">
        Recuperación, prevención y rendimiento con seguimiento real: cada plan se
        ajusta a tu lesión, tu deporte y tu evolución semana a semana.
      </p>
      <div className="mb-10 flex flex-wrap gap-3 sm:mb-17.5 sm:gap-3.5">
        <a
          href="#planes"
          className="rounded-[10px] border border-ember bg-ember px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-px hover:bg-ember-hover sm:px-7 sm:py-3.5 sm:text-[15px]"
        >
          Reservar primera valoración
        </a>
        <button
          type="button"
          onClick={() => openModal("login")}
          className="rounded-[10px] border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-frost hover:text-frost sm:px-7 sm:py-3.5 sm:text-[15px]"
        >
          Ya soy cliente →
        </button>
      </div>

      <PulseWaveform />
    </header>
  );
}
