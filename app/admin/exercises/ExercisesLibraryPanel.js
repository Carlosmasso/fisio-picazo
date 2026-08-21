"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "../../components/Spinner";

export default function ExercisesLibraryPanel({
  title,
  filters,
  value,
  children,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const zone = e.target.value;
    startTransition(() => {
      router.push(zone ? `/admin/exercises?zone=${zone}` : "/admin/exercises");
    });
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <select
          value={value ?? ""}
          disabled={isPending}
          onChange={handleChange}
          className="rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-foreground focus:border-frost focus:outline-none disabled:opacity-60"
        >
          {filters.map((f) => (
            <option key={f.label} value={f.id ?? ""}>
              {f.label}
            </option>
          ))}
        </select>
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
