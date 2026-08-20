export const brand = {
  name: "Álvaro Picazo",
  tagline: "Fisioterapia Deportiva",
  city: "Albacete, ES",
};

export const heroStats = [
  { label: "CARGA SEMANAL", value: "4.2" },
  { label: "SESIONES", value: "142" },
  { label: "ALTAS DEPORTIVAS", value: "96%" },
];

// The `id` of every zone below must also exist in the zone check
// constraints in supabase/schema.sql (profiles.injury_zone, exercises.zone,
// programs.zone) — those columns feed the admin dropdowns built from this
// array. Adding a zone here without updating schema.sql will make the
// database reject any insert that uses it.
export const zones = [
  {
    id: "rodilla",
    label: "Rodilla",
    title: "Rodilla — tendinopatía / LCA",
    description:
      "Protocolo de carga progresiva con control de dolor y readaptación al gesto deportivo. Incluye vídeos de ejecución, tests de fuerza en cada fase y criterios objetivos para pasar de fase.",
    tags: ["Fase 1 · descarga", "Fase 2 · fuerza", "Fase 3 · pliometría", "RTS test"],
    exerciseCount: 12,
  },
  {
    id: "hombro",
    label: "Hombro",
    title: "Hombro — manguito rotador",
    description:
      "Trabajo de movilidad escapular y fuerza rotadora, con progresión hacia gestos de lanzamiento u overhead según el deporte.",
    tags: ["Movilidad", "Estabilidad", "Gesto deportivo"],
    exerciseCount: 8,
  },
  {
    id: "isquios",
    label: "Isquiotibiales",
    title: "Isquiotibiales — rotura / sobrecarga",
    description:
      "Protocolo excéntrico progresivo con foco en velocidad de carrera y prevención de recidiva, el punto débil más común tras el alta.",
    tags: ["Excéntricos", "Sprint drills", "Prevención"],
    exerciseCount: 10,
  },
  {
    id: "tobillo",
    label: "Tobillo",
    title: "Tobillo — esguince / inestabilidad",
    description:
      "Propiocepción y control neuromuscular progresivo hasta superficies inestables y cambios de dirección a máxima velocidad.",
    tags: ["Propiocepción", "Fuerza", "Agilidad"],
    exerciseCount: 9,
  },
  {
    id: "cadera",
    label: "Cadera",
    title: "Cadera — pubalgia / sobrecarga",
    description:
      "Control motor de la musculatura profunda y progresión de carga en gestos de bisagra de cadera, adaptado a tu deporte de impacto.",
    tags: ["Core", "Movilidad cadera", "Carga"],
    exerciseCount: 10,
  },
  {
    id: 'pierna',
    label: 'Pierna completa',
    title: 'Pierna completa — readaptación funcional',
    description:
      'Progresión de fuerza y potencia en gestos de salto, carrera y cambios de dirección, adaptado a tu deporte.',
    tags: ['Fuerza', 'Potencia', 'Agilidad'],
    exerciseCount: 12,
  },
  {
    id: "espalda",
    label: "Espalda baja",
    title: "Espalda baja — sobrecarga lumbar",
    description:
      "Control motor del core y progresión de carga en gestos de bisagra de cadera, adaptado a tu deporte de impacto.",
    tags: ["Core", "Movilidad cadera", "Carga"],
    exerciseCount: 11,
  },
];

export const methodSteps = [
  {
    num: "01",
    title: "Valoración inicial",
    description:
      "Historial, análisis del gesto deportivo y pruebas funcionales para identificar la causa real, no solo el síntoma.",
  },
  {
    num: "02",
    title: "Plan personalizado",
    description:
      "Se activa tu acceso al portal con el contenido específico de tu zona: ejercicios, cargas y criterios de progresión.",
  },
  {
    num: "03",
    title: "Seguimiento semanal",
    description:
      "Ajusto tu plan según tu evolución real: dolor, fuerza y tolerancia a la carga, sesión a sesión.",
  },
  {
    num: "04",
    title: "Alta deportiva",
    description:
      'Test de vuelta al deporte específico de tu disciplina antes de darte el alta, no solo "ya no duele".',
  },
];

export const portalPreview = {
  domain: "portal.picazofisio.com",
  user: { name: "Marta S.", tag: "RODILLA · FASE 2" },
  navLinks: ["Mi plan", "Ejercicios", "Progreso", "Mensajes", "Suscripción"],
  weeklyStats: [
    { value: "4/5", label: "Sesiones completadas" },
    { value: "2/10", label: "Dolor (EVA)" },
  ],
  todayExercises: [
    { name: "Sentadilla búlgara — 3x10", status: "done" },
    { name: "Step-down excéntrico — 3x8", status: "done" },
    { name: "Salto a caja — progresión", status: "pending" },
  ],
};

export const plans = [
  {
    id: "seguimiento",
    name: "Seguimiento",
    description: "Para mantener tu plan activo entre sesiones presenciales.",
    priceMonthly: 39,
    featured: false,
    features: [
      "Acceso al portal y tu plan por zona",
      "Ejercicios y progresiones actualizadas",
      "1 revisión mensual por mensaje",
    ],
  },
  {
    id: "rendimiento",
    name: "Rendimiento",
    description: "El plan más elegido por deportistas en temporada activa.",
    priceMonthly: 79,
    featured: true,
    features: [
      "Todo lo de Seguimiento",
      "Ajuste semanal personalizado",
      "Videollamada quincenal",
      "Tests de vuelta al deporte",
    ],
  },
  {
    id: "presencial-plus",
    name: "Presencial +",
    description: "Combina sesiones en clínica con portal digital.",
    priceMonthly: 149,
    featured: false,
    features: [
      "Todo lo de Rendimiento",
      "2 sesiones presenciales/mes",
      "Prioridad en agenda",
    ],
  },
];

export const quarterlyDiscount = 0.15;

export const testimonials = [
  {
    quote:
      "Volví a correr trail en 4 meses tras la rotura de isquios. Lo que más valoro es que sabía en qué fase estaba cada semana.",
    who: "Runner de montaña",
  },
  {
    quote:
      "El portal me ordenó la cabeza tanto como la rodilla. Veía mi progreso real, no solo sensaciones.",
    who: "Jugadora de baloncesto amateur",
  },
  {
    quote:
      "Pasé el test de vuelta al deporte antes de recibir el alta. Eso me dio confianza para volver a saltar sin miedo.",
    who: "Triatleta",
  },
];
