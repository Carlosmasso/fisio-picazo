// Seeds the database with realistic demo content so the admin panel and the
// public "Zonas"/"Servicios" pages don't look empty when showing the site to
// the client. Safe to re-run: exercises are skipped by title, patients are
// skipped by email, so nothing gets duplicated.
//
// Usage:
//   node scripts/seed-demo-data.cjs
//
// All seeded patients use the @paciente-demo.es domain so they're easy to
// tell apart from real patients later. Their login credentials are printed
// at the end of the run.

const fs = require("fs");
const path = require("path");

for (const line of fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const DEMO_PASSWORD = "PacienteDemo2026!";

const EXERCISES = [
  // rodilla: "Sentadilla búlgara" y "Step-down excéntrico" ya existen.
  {
    title: "Extensión de cuádriceps con banda",
    zone: "rodilla",
    description: "3 series de 15, banda anclada por detrás, control en la fase excéntrica.",
  },
  {
    title: "Sentadilla a una pierna asistida",
    zone: "rodilla",
    description: "3 series de 6-8 por pierna, apoyo ligero en una silla para controlar el rango.",
  },
  {
    title: "Rotación externa con banda elástica",
    zone: "hombro",
    description: "3 series de 15, codo pegado al cuerpo, movimiento lento y controlado.",
  },
  {
    title: "Elevación lateral controlada",
    zone: "hombro",
    description: "3 series de 12, sin pasar de la altura del hombro, sin balanceo.",
  },
  {
    title: "Patrón Y-T-W en banco inclinado",
    zone: "hombro",
    description: "2 series de 10 por posición, peso ligero, foco en la escápula.",
  },
  {
    title: "Peso muerto rumano a una pierna",
    zone: "isquios",
    description: "3 series de 8 por pierna, cadera en bisagra, espalda neutra.",
  },
  {
    title: "Nordic curl excéntrico",
    zone: "isquios",
    description: "3 series de 5, bajada lo más lenta posible, apoyo en pareja o banco.",
  },
  {
    title: "Puente de glúteo con deslizamiento",
    zone: "isquios",
    description: "3 series de 10, talones sobre disco deslizante, extensión completa de cadera.",
  },
  {
    title: "Elevación de talón unipodal",
    zone: "tobillo",
    description: "3 series de 15, apoyo en un solo pie, control en la bajada.",
  },
  {
    title: "Equilibrio en superficie inestable",
    zone: "tobillo",
    description: "3 series de 30-45s por pierna, superficie tipo cojín propioceptivo.",
  },
  {
    title: "Dorsiflexión con banda",
    zone: "tobillo",
    description: "3 series de 15, banda anclada por delante, recorrido completo del tobillo.",
  },
  {
    title: "Puente de glúteo unipodal",
    zone: "cadera",
    description: "3 series de 10 por pierna, cadera estable, sin rotar el tronco.",
  },
  {
    title: "Abducción de cadera con banda",
    zone: "cadera",
    description: "3 series de 15 por lado, banda por encima de rodilla, tronco quieto.",
  },
  {
    title: "Zancada lateral controlada",
    zone: "cadera",
    description: "3 series de 10 por lado, rodilla alineada con el pie, bajada controlada.",
  },
  {
    title: "Sentadilla goblet",
    zone: "pierna",
    description: "4 series de 10, peso pegado al pecho, profundidad completa sin perder la espalda.",
  },
  {
    title: "Zancada con salto (progresión)",
    zone: "pierna",
    description: "3 series de 8 por pierna, aterrizaje suave, solo en fase avanzada.",
  },
  {
    title: "Step-up con carga",
    zone: "pierna",
    description: "3 series de 10 por pierna, altura de banco progresiva.",
  },
  {
    title: "Bird-dog",
    zone: "espalda",
    description: "3 series de 10 por lado, core estable, sin rotar la pelvis.",
  },
  {
    title: "Puente de glúteo con extensión lumbar neutra",
    zone: "espalda",
    description: "3 series de 12, mantener zona lumbar neutra durante todo el recorrido.",
  },
  {
    title: "Peso muerto con kettlebell",
    zone: "espalda",
    description: "3 series de 8, técnica de bisagra de cadera, espalda siempre neutra.",
  },
];

const PATIENTS = [
  {
    name: "Marta Serrano",
    zone: "rodilla",
    phase: 2,
    pain: [7, 6, 6, 5, 4, 4, 3],
    priorProgram: { zone: "hombro", phase: 1 },
  },
  {
    name: "Javier Molina",
    zone: "hombro",
    phase: 1,
    pain: [6, 6, 5, 5, 5],
  },
  {
    name: "Lucía Fernández",
    zone: "isquios",
    phase: 3,
    pain: [5, 4, 4, 3, 2, 2],
  },
  {
    name: "Carlos Ortega",
    zone: "tobillo",
    phase: 2,
    pain: [6, 5, 5, 4, 3],
  },
  {
    name: "Nuria Vidal",
    zone: "cadera",
    phase: 1,
    pain: [8, 7, 7, 6, 6],
  },
  {
    name: "Diego Ramos",
    zone: "pierna",
    phase: 3,
    pain: [4, 3, 2, 2, 1],
    priorProgram: { zone: "tobillo", phase: 2 },
  },
  {
    name: "Sara Campos",
    zone: "espalda",
    phase: 2,
    pain: [7, 6, 5, 5, 4],
  },
];

function emailFor(name) {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, ".") + "@paciente-demo.es"
  );
}

async function ensureExercises() {
  const { data: existing } = await supabase.from("exercises").select("id, title, zone");
  const existingTitles = new Set((existing ?? []).map((e) => e.title));
  const byZone = {};
  for (const e of existing ?? []) {
    (byZone[e.zone] ??= []).push(e);
  }

  for (const ex of EXERCISES) {
    if (existingTitles.has(ex.title)) continue;
    const { data, error } = await supabase.from("exercises").insert(ex).select().single();
    if (error) throw error;
    (byZone[ex.zone] ??= []).push(data);
    console.log("  + ejercicio creado:", ex.title);
  }

  return byZone;
}

async function createProgramWithHistory(patientId, { zone, phase }, exercisesByZone, status) {
  const { data: program, error } = await supabase
    .from("programs")
    .insert({ patient_id: patientId, zone, phase, status })
    .select()
    .single();
  if (error) throw error;

  const pool = (exercisesByZone[zone] ?? []).slice(0, 3);
  const peRows = [];
  for (let i = 0; i < pool.length; i++) {
    const { data: pe, error: peErr } = await supabase
      .from("program_exercises")
      .insert({
        program_id: program.id,
        exercise_id: pool[i].id,
        sets: 3,
        reps: i === 0 ? "10" : i === 1 ? "12" : "30s",
        order_index: i,
      })
      .select()
      .single();
    if (peErr) throw peErr;
    peRows.push(pe);
  }

  return { program, peRows };
}

async function main() {
  console.log("Creando/verificando ejercicios...");
  const exercisesByZone = await ensureExercises();

  console.log("\nCreando pacientes de demostración...");
  const created = [];

  for (const patient of PATIENTS) {
    const email = emailFor(patient.name);

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const already = existingUsers.users.find((u) => u.email === email);
    if (already) {
      console.log(`  - ${patient.name} ya existe, se omite (${email})`);
      continue;
    }

    const { data: userRes, error: userErr } = await supabase.auth.admin.createUser({
      email,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: patient.name },
    });
    if (userErr) throw userErr;
    const patientId = userRes.user.id;

    await supabase
      .from("profiles")
      .update({ privacy_accepted_at: new Date().toISOString() })
      .eq("id", patientId);

    if (patient.priorProgram) {
      await createProgramWithHistory(patientId, patient.priorProgram, exercisesByZone, "completed");
    }

    const { peRows } = await createProgramWithHistory(
      patientId,
      { zone: patient.zone, phase: patient.phase },
      exercisesByZone,
      "active"
    );

    for (let i = 0; i < patient.pain.length; i++) {
      const daysAgo = (patient.pain.length - i) * 3;
      const completedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
      const pe = peRows[i % peRows.length];
      if (!pe) continue;
      await supabase.from("exercise_logs").insert({
        program_exercise_id: pe.id,
        patient_id: patientId,
        pain_score: patient.pain[i],
        completed_at: completedAt,
      });
    }

    created.push({ name: patient.name, email });
    console.log(`  + ${patient.name} creado (${email})`);
  }

  console.log("\nListo. Credenciales de los pacientes de demostración:");
  console.log(`  Contraseña para todos: ${DEMO_PASSWORD}\n`);
  for (const c of created) {
    console.log(`  ${c.name.padEnd(20)} ${c.email}`);
  }
  if (!created.length) {
    console.log("  (ninguno nuevo — todos ya existían)");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
