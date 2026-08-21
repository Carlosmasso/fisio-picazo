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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
