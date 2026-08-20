"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { getUser } from "../lib/dal";

export async function markExerciseDone(programExerciseId, formData) {
  const user = await getUser();
  if (!user) return;

  const painScoreRaw = formData?.get("pain_score");
  const painScore =
    painScoreRaw !== null && painScoreRaw !== "" ? Number(painScoreRaw) : null;

  const supabase = await createClient();
  await supabase.from("exercise_logs").insert({
    program_exercise_id: programExerciseId,
    patient_id: user.id,
    pain_score: painScore,
  });

  revalidatePath("/portal");
}
