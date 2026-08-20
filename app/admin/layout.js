import Link from "next/link";
import { requireAdmin } from "../lib/dal";

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1180px] px-8 pt-32 pb-20">
      <div className="mb-9 flex items-center gap-7 border-b border-line pb-4">
        <h1 className="mr-auto font-display text-2xl font-semibold">Panel</h1>
        <Link href="/admin" className="text-sm text-muted transition-colors hover:text-foreground">
          Pacientes
        </Link>
        <Link
          href="/admin/exercises"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Ejercicios
        </Link>
      </div>
      {children}
    </div>
  );
}
