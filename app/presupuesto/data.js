export const modules = [
  {
    n: "01",
    title: "Sitio web corporativo",
    market: 1800,
    final: 760,
    items: [
      "Diseño a medida completo (no plantilla): hero con estadísticas animadas, zonas de lesión, método de trabajo con scroll narrativo, planes y ubicación.",
      "Sección “Nuestros servicios” con los 12 servicios reales de la clínica.",
      "Responsive completo (móvil, tablet, escritorio) y accesible — respeta la preferencia de “reducir movimiento” del sistema operativo.",
      "SEO técnico: ficha de negocio local para Google, imagen de vista previa al compartir en redes/WhatsApp, metadatos completos.",
      "WhatsApp flotante, barra de contacto con horario y teléfono, botón de volver arriba.",
    ],
  },
  {
    n: "02",
    title: "Autenticación y seguridad",
    market: 900,
    final: 380,
    items: [
      "Sistema de acceso propio: solo tú das de alta a los pacientes, nadie puede registrarse por su cuenta.",
      "Recuperación de contraseña por email.",
      "Cierre de sesión automático por inactividad, con aviso previo, para proteger datos de salud.",
      "Seguridad a nivel de base de datos: cada paciente solo puede ver sus propios datos, incluso ante un acceso directo a la base de datos.",
    ],
  },
  {
    n: "03",
    title: "Panel de administración",
    market: 1800,
    final: 700,
    items: [
      "Alta, edición y baja de pacientes, con borrado en cascada de todo lo asociado.",
      "Menú de acciones por paciente: editar información, restablecer contraseña, eliminar cuenta (con confirmación).",
      "Biblioteca de ejercicios reutilizable, con vídeo, filtrado por zona y alta de ejercicios nuevos.",
      "Constructor de programas: zona, fase y ejercicios (series/repeticiones) por paciente.",
      "Confirmaciones claras de éxito o error en cada acción, sin recargar la página.",
    ],
  },
  {
    n: "04",
    title: "Portal del paciente",
    market: 900,
    final: 380,
    items: [
      "Cada paciente ve solo su plan activo: ejercicios de hoy, series y repeticiones.",
      "Gráfico de evolución del dolor (EVA) sesión a sesión.",
      "Historial de programas anteriores completados.",
      "Registro de cada sesión, con nivel de dolor asociado.",
    ],
  },
  {
    n: "05",
    title: "Base de datos y backend",
    market: 700,
    final: 325,
    items: [
      "Estructura de datos completa (pacientes, programas, ejercicios, historial) con reglas de acceso a nivel de base de datos.",
      "Almacenamiento privado de vídeos de ejercicios.",
      "Preparado para crecer: nuevas zonas, servicios o tipos de programa sin rehacer nada.",
    ],
  },
  {
    n: "06",
    title: "Detalles y experiencia de uso",
    market: 500,
    final: 160,
    items: [
      "Indicadores de carga y confirmaciones visuales en cada acción.",
      "Política de privacidad adaptada a datos de salud (RGPD).",
      "Pulido continuo: cada cambio se prueba en real, no solo “que compile”.",
    ],
  },
  {
    n: "07",
    title: "Pasarela de pagos",
    pending: true,
    market: 1400,
    final: 545,
    items: [
      "Integración de cobro con pasarela de pago (Stripe u otra) para los planes ya definidos en la web.",
      "Cobro recurrente automático — sin gestionar cada mes a mano.",
      "Estado de la suscripción visible en el portal del paciente: activa, próxima renovación, cancelar.",
      "Factura automática en cada cobro.",
    ],
  },
];

export const roadmap = [
  {
    title: "Citas y calendario",
    desc: "Reserva de horas online, sincronizada con tu agenda.",
    size: "m",
    sizeLabel: "Medio",
  },
  {
    title: "Notificaciones automáticas",
    desc: "Aviso por email o WhatsApp de sesiones próximas o ejercicios pendientes.",
    size: "s",
    sizeLabel: "Pequeño",
  },
  {
    title: "Videollamada de seguimiento",
    desc: "Revisión remota sin desplazamiento a la clínica.",
    size: "l",
    sizeLabel: "Grande",
  },
  {
    title: "Panel de estadísticas del negocio",
    desc: "Ingresos, altas, bajas y adherencia a los ejercicios.",
    size: "m",
    sizeLabel: "Medio",
  },
  {
    title: "Varios fisioterapeutas",
    desc: "Si el equipo crece, cada uno con su propia cartera de pacientes.",
    size: "l",
    sizeLabel: "Grande",
  },
  {
    title: "App instalable (PWA)",
    desc: "Acceso directo desde el móvil, sin pasar por el navegador.",
    size: "s",
    sizeLabel: "Pequeño",
  },
  {
    title: "Versión en inglés",
    desc: "Para pacientes internacionales.",
    size: "s",
    sizeLabel: "Pequeño",
  },
];

export const gallery = {
  publico: [
    { name: "public-hero", caption: "Página de inicio — hero con estadísticas animadas" },
    { name: "public-zonas", caption: "Zonas de lesión — contenido filtrado por zona" },
    { name: "public-metodo", caption: "El método — narrativa a scroll con las 4 fases" },
    { name: "public-planes", caption: "Planes de suscripción mensual" },
    { name: "public-servicios", caption: "Los 12 servicios reales de la clínica" },
  ],
  admin: [
    { name: "admin-dashboard", caption: "Panel — listado de pacientes y alta de nuevas cuentas" },
    { name: "admin-patient-detail", caption: "Ficha de paciente — evolución del dolor y programa activo" },
    { name: "admin-actions-menu", caption: "Menú de acciones sobre un paciente" },
    { name: "admin-edit-patient", caption: "Editar información del paciente" },
    { name: "admin-delete-confirm", caption: "Confirmación antes de eliminar (con aviso de lo que se borra)" },
    { name: "admin-reset-password-toast", caption: "Restablecer contraseña — aviso con la nueva clave temporal" },
    { name: "admin-exercises", caption: "Biblioteca de ejercicios, filtrable por zona" },
    { name: "admin-create-exercise-form", caption: "Alta de un ejercicio nuevo en la biblioteca" },
    { name: "admin-create-exercise-toast", caption: "Ejercicio creado y ya disponible en la biblioteca" },
  ],
  paciente: [
    { name: "patient-portal", caption: "Portal del paciente — su plan, su evolución" },
    { name: "patient-portal-mobile", caption: "El mismo portal, en el móvil" },
  ],
};

export const totalMarket = modules.reduce((s, m) => s + m.market, 0);
export const totalFinal = modules.reduce((s, m) => s + m.final, 0);
export const savings = totalMarket - totalFinal;
export const savingsPct = Math.round((savings / totalMarket) * 100);

const frontendModule = modules.find((m) => m.n === "01");
export const frontendPct = Math.round((frontendModule.final / totalFinal) * 100);
export const backendPct = 100 - frontendPct;

export const IVA_RATE = 0.21;
export const iva = totalFinal * IVA_RATE;
export const totalWithIva = totalFinal + iva;

export function eur(n) {
  return n.toLocaleString("es-ES", { useGrouping: true }) + " €";
}
export function eurCents(n) {
  return (
    n.toLocaleString("es-ES", {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}
