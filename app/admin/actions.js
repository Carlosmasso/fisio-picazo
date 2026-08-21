"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { createAdminClient } from "../lib/supabase/admin";
import { requireAdmin } from "../lib/dal";

export async function createPatient(prevState, formData) {
  await requireAdmin();

  const email = formData.get("email")?.toString().trim();
  const fullName = formData.get("full_name")?.toString().trim();

  if (!email) {
    return { error: "Introduce un email." };
  }

  const tempPassword = crypto.randomUUID().slice(0, 12);
  const supabaseAdmin = createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: fullName ? { full_name: fullName } : undefined,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return {
    success: `Cuenta creada para ${email}. Contraseña temporal: ${tempPassword} — compártesela para que pueda entrar (puede cambiarla luego).`,
  };
}

export async function resetPatientPassword(patientId, prevState, formData) {
  await requireAdmin();

  const tempPassword = crypto.randomUUID().slice(0, 12);
  const supabaseAdmin = createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(patientId, {
    password: tempPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: `Nueva contraseña temporal: ${tempPassword} — compártesela para que pueda entrar.`,
  };
}

export async function deletePatient(patientId, prevState, formData) {
  await requireAdmin();

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(patientId);

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function createProgram(patientId, formData) {
  await requireAdmin();
  const supabase = await createClient();

  const zone = formData.get("zone");
  const phase = Number(formData.get("phase")) || 1;

  // Only one program is shown to the patient in /portal at a time — archive
  // whatever was active before starting the new one, so it doesn't get
  // orphaned as an invisible "active" row.
  await supabase
    .from("programs")
    .update({ status: "completed" })
    .eq("patient_id", patientId)
    .eq("status", "active");

  await supabase.from("programs").insert({
    patient_id: patientId,
    zone,
    phase,
    status: "active",
  });

  revalidatePath(`/admin/patients/${patientId}`);
}

export async function updateProgramStatus(programId, patientId, status) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.from("programs").update({ status }).eq("id", programId);

  revalidatePath(`/admin/patients/${patientId}`);

  if (status === "completed") {
    redirect(`/admin/patients/${patientId}?completed=1`);
  }
}

export async function addProgramExercise(programId, patientId, formData) {
  await requireAdmin();
  const supabase = await createClient();

  const exerciseId = formData.get("exercise_id");
  const sets = formData.get("sets") ? Number(formData.get("sets")) : null;
  const reps = formData.get("reps")?.toString().trim() || null;
  const notes = formData.get("notes")?.toString().trim() || null;

  const { count } = await supabase
    .from("program_exercises")
    .select("id", { count: "exact", head: true })
    .eq("program_id", programId);

  await supabase.from("program_exercises").insert({
    program_id: programId,
    exercise_id: exerciseId,
    sets,
    reps,
    notes,
    order_index: count ?? 0,
  });

  revalidatePath(`/admin/patients/${patientId}`);
}

export async function removeProgramExercise(programExerciseId, patientId) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.from("program_exercises").delete().eq("id", programExerciseId);

  revalidatePath(`/admin/patients/${patientId}`);
}

export async function createExercise(prevState, formData) {
  const admin = await requireAdmin();
  const supabase = await createClient();

  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || null;
  const zone = formData.get("zone")?.toString() || null;
  const video = formData.get("video");

  if (!title) {
    return { error: "El título es obligatorio." };
  }

  let video_path = null;

  if (video && typeof video === "object" && video.size > 0) {
    const path = `${crypto.randomUUID()}-${video.name}`;
    const { error: uploadError } = await supabase.storage
      .from("exercise-videos")
      .upload(path, video, { contentType: video.type });

    if (uploadError) {
      return { error: `Error subiendo el vídeo: ${uploadError.message}` };
    }

    video_path = path;
  }

  const { error } = await supabase.from("exercises").insert({
    title,
    description,
    zone: zone || null,
    video_path,
    created_by: admin.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/exercises");
  return { success: "Ejercicio creado." };
}
