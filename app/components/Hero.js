"use client";

import Image from "next/image";
import { useModal } from "./ModalProvider";
import PulseWaveform from "./PulseWaveform";
import heroPhoto from "../../public/images/alvaro-hero.jpg";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <header className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-frost/10 blur-3xl"
        style={{ left: "calc(50% - 620px)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -z-10 h-[480px] w-[480px] rounded-full bg-ember/10 blur-3xl"
        style={{ right: "calc(50% - 890px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-5 pt-28 pb-10 sm:px-8 sm:pt-36 sm:pb-15">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost sm:mb-5.5">
              Fisioterapia deportiva &amp; rendimiento
            </div>
            <h1 className="mb-5 text-balance font-display text-[clamp(36px,5.5vw,56px)] leading-[1.08] font-bold sm:mb-6.5">
              Tu cuerpo registra cada señal. <span className="text-ember">Yo la leo.</span>
            </h1>
            <p className="mb-8 max-w-[460px] text-base text-muted sm:mb-9.5 sm:text-lg">
              Recuperación, prevención y rendimiento con seguimiento real: cada plan se
              ajusta a tu lesión, tu deporte y tu evolución semana a semana.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-3.5">
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
          </div>

          <div className="relative mx-auto mt-4 w-full max-w-[300px] lg:mt-0 lg:max-w-none">
            <div
              className="absolute -inset-8 -z-10 rounded-[40px] bg-ember/15 blur-3xl"
              aria-hidden="true"
            />
            <Image
              src={heroPhoto}
              alt="Álvaro Picazo, fisioterapeuta, en consulta"
              priority
              sizes="(min-width: 1024px) 480px, 300px"
              className="h-auto w-full rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-17.5">
          <PulseWaveform />
        </div>
      </div>
    </header>
  );
}
