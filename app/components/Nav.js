"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useModal } from "./ModalProvider";
import { brand } from "../lib/site-content";
import { signOut } from "../actions/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/#zonas", label: "Zonas" },
  { href: "/#metodo", label: "Método" },
  // { href: "/portal", label: "Portal cliente" },
  { href: "/#planes", label: "Planes" },
];

const btnBase =
  "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors sm:px-5 sm:py-2.5 sm:text-sm";

export default function Nav({ profile = null }) {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useModal();
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between gap-3 border-b bg-bg/75 px-4 py-4 backdrop-blur-md transition-colors sm:px-8 sm:py-[22px] ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 font-display text-base font-bold tracking-wide sm:gap-2.5 sm:text-lg"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-ember shadow-[0_0_12px_var(--color-ember)]" />
        {brand.name.toUpperCase()}
        <span className="hidden font-normal text-muted sm:inline"> · {brand.tagline}</span>
      </Link>

      <div className="hidden gap-9 text-sm text-muted md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {profile ? (
          <>
            <span className="hidden text-sm text-muted sm:inline">
              Hola, {profile.full_name?.split(" ")[0] || "paciente"}
            </span>

            <Link
              href={isAdmin ? "/admin" : "/portal"}
              className={`${btnBase} border-ember bg-ember text-bg hover:bg-ember-hover`}
            >
              {isAdmin ? "Admin" : "Mi portal"}
            </Link>

            <button
              onClick={() => {
                signOut();
                toast.success("Sesión cerrada");
              }}
              aria-label="Cerrar sesión"
              className={`${btnBase} border-line hover:border-frost hover:text-frost`}
            >
              <LogOut size={16} className="sm:hidden" />
              <LogOut size={18} className="hidden sm:block" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => openModal("login")}
              className={`${btnBase} border-line hover:border-frost hover:text-frost`}
            >
              <span className="sm:hidden">Acceso</span>
              <span className="hidden sm:inline">Acceso clientes</span>
            </button>
            <Link
              href="/#planes"
              className={`${btnBase} border-ember bg-ember text-bg hover:bg-ember-hover`}
            >
              <span className="sm:hidden">Reservar</span>
              <span className="hidden sm:inline">Reservar valoración</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
