import { brand } from "../lib/site-content";

export const metadata = {
  title: `Política de privacidad · ${brand.name}`,
};

const sectionClass = "mb-8";
const h2Class = "mb-3 font-display text-xl font-semibold";
const pClass = "mb-3 text-[15px] leading-relaxed text-muted";
const ulClass = "mb-3 list-disc pl-5 text-[15px] leading-relaxed text-muted";

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] px-8 pt-32 pb-24">
      <div className="mb-10 rounded-xl border border-frost-dim bg-frost-dim/40 p-5 text-[13.5px] text-muted">
        <strong className="text-frost">Nota:</strong> este es un borrador de política
        de privacidad orientativo, no una revisión legal. Antes de usarlo con
        pacientes reales, revísalo con un abogado o gestor especializado en
        protección de datos, especialmente porque el servicio trata datos de
        salud (categoría especial según el artículo 9 del RGPD).
      </div>

      <h1 className="mb-8 font-display text-3xl font-semibold">Política de privacidad</h1>

      <section className={sectionClass}>
        <h2 className={h2Class}>1. Responsable del tratamiento</h2>
        <p className={pClass}>
          {brand.name} ({brand.tagline}), con domicilio en {brand.city}, es el
          responsable del tratamiento de tus datos personales en esta plataforma.
          Para cualquier consulta relacionada con tus datos, puedes escribir a{" "}
          <span className="text-foreground">[email de contacto pendiente]</span>.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>2. Qué datos recogemos</h2>
        <ul className={ulClass}>
          <li>Datos identificativos: nombre y correo electrónico.</li>
          <li>
            Datos de salud: zona de lesión, fase del tratamiento, ejercicios
            asignados y nivel de dolor (escala EVA) que registras al completar
            cada sesión.
          </li>
          <li>Datos de uso: qué ejercicios marcas como completados y cuándo.</li>
        </ul>
        <p className={pClass}>
          Los datos de salud son una <strong className="text-foreground">categoría
          especial de datos</strong> bajo el RGPD y reciben protección reforzada:
          solo tú y tu fisioterapeuta podéis acceder a ellos.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>3. Para qué usamos tus datos</h2>
        <ul className={ulClass}>
          <li>Darte acceso a tu plan de recuperación y a tu portal personal.</li>
          <li>
            Permitir a tu fisioterapeuta hacer seguimiento de tu evolución y
            ajustar tu programa.
          </li>
          <li>Gestionar tu cuenta y las comunicaciones relacionadas con el servicio.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>4. Base legal</h2>
        <p className={pClass}>
          Tratamos tus datos identificativos y de uso en base a la ejecución del
          servicio que has contratado. Tratamos tus datos de salud en base a tu{" "}
          <strong className="text-foreground">consentimiento explícito</strong>,
          que prestas al marcar la casilla correspondiente al crear tu cuenta.
          Puedes retirar este consentimiento en cualquier momento, lo que
          implicará la baja del servicio.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>5. Con quién compartimos tus datos</h2>
        <p className={pClass}>
          Tus datos se almacenan en Supabase, nuestro proveedor de base de datos
          y autenticación, que actúa como encargado del tratamiento. No vendemos
          ni cedemos tus datos a terceros con fines comerciales.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>6. Cuánto tiempo conservamos tus datos</h2>
        <p className={pClass}>
          Conservamos tus datos mientras mantengas una cuenta activa en la
          plataforma, y durante los plazos adicionales que exija la normativa
          aplicable tras la baja del servicio. Puedes solicitar la eliminación
          de tu cuenta en cualquier momento.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>7. Tus derechos</h2>
        <p className={pClass}>Puedes ejercer en cualquier momento tu derecho a:</p>
        <ul className={ulClass}>
          <li>Acceder a los datos que tenemos sobre ti.</li>
          <li>Rectificar datos inexactos.</li>
          <li>Solicitar la supresión de tus datos.</li>
          <li>Oponerte al tratamiento o solicitar su limitación.</li>
          <li>Solicitar la portabilidad de tus datos.</li>
        </ul>
        <p className={pClass}>
          Para ejercer cualquiera de estos derechos, escribe a{" "}
          <span className="text-foreground">[email de contacto pendiente]</span>.
          También tienes derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (aepd.es).
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>8. Seguridad</h2>
        <p className={pClass}>
          El acceso a tus datos está protegido mediante autenticación y reglas de
          seguridad a nivel de base de datos que garantizan que cada paciente solo
          puede ver su propia información, y que solo tu fisioterapeuta tiene
          acceso administrativo.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={h2Class}>9. Cambios en esta política</h2>
        <p className={pClass}>
          Podemos actualizar esta política ocasionalmente. Te avisaremos de
          cualquier cambio relevante a través de la plataforma o por correo
          electrónico.
        </p>
      </section>
    </main>
  );
}
