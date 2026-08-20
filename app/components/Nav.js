"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useModal } from "./ModalProvider";
import { brand } from "../lib/site-content";
import { signOut } from "../actions/auth";
import { LogOut } from "lucide-react";

const navLinks = [
  { href: "/#zonas", label: "Zonas" },
  { href: "/#metodo", label: "Método" },
  // { href: "/portal", label: "Portal cliente" },
  { href: "/#planes", label: "Planes" },
];

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
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b bg-bg/75 px-8 py-[22px] backdrop-blur-md transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 font-display text-lg font-bold tracking-wide"
      >
        <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_var(--color-ember)]" />
        {brand.name.toUpperCase()}
        <span className="font-normal text-muted"> · {brand.tagline}</span>
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

      <div className="flex items-center gap-3">
        {profile ? (
          <>
            <span className="hidden text-sm text-muted sm:inline">
              Hola, {profile.full_name?.split(" ")[0] || "paciente"}
            </span>

            <Link
              href={isAdmin ? "/admin" : "/portal"}
              className="rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover"
            >
              {isAdmin ? "Admin" : "Mi portal"}
            </Link>

            <button
              onClick={signOut}
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
            >
              <LogOut size={24} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => openModal("login")}
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-frost hover:text-frost"
            >
              Acceso clientes
            </button>
            <Link
              href="/#planes"
              className="rounded-lg border border-ember bg-ember px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover"
            >
              Reservar valoración
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
