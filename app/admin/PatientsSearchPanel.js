"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Spinner from "../components/Spinner";

export default function PatientsSearchPanel({ title, value, children }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(value ?? "");
  const debounceRef = useRef(null);

  function handleChange(e) {
    const next = e.target.value;
    setQuery(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        router.push(next ? `/admin?q=${encodeURIComponent(next)}` : "/admin");
      });
    }, 350);
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Buscar por nombre o email…"
          className="w-full max-w-[260px] rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-frost focus:outline-none"
        />
      </div>

      <div className="relative">
        {isPending ? (
          <div className="absolute inset-0 z-10 flex justify-center bg-bg/60 pt-16">
            <Spinner className="h-6 w-6 text-frost" />
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}
