"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";

export async function signIn(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Introduce tu email y contraseña." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email o contraseña incorrectos." };
  }

  // Consulta la tabla profiles
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  const isAdmin = profileData?.role === "admin";
  revalidatePath("/", "layout");
  redirect(isAdmin ? "/admin" : "/portal");
}

export async function signUp(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!name || name.length < 2) {
    return { error: "Introduce tu nombre." };
  }
  if (!email) {
    return { error: "Introduce tu email." };
  }
  if (!password || password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (formData.get("privacy_accepted") !== "on") {
    return { error: "Debes aceptar la política de privacidad para continuar." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name, privacy_accepted: "true" } },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "Cuenta creada. Revisa tu correo para confirmar el acceso antes de entrar.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
