import { requireProfile } from "../../lib/dal";
import UpdatePasswordForm from "./UpdatePasswordForm";

export const metadata = { title: "Nueva contraseña · Álvaro Picazo Fisioterapia" };

export default async function UpdatePasswordPage() {
  await requireProfile();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[400px] flex-col justify-center px-8 py-20">
      <UpdatePasswordForm />
    </main>
  );
}
