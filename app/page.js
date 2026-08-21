import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import SectionHeader from "./components/SectionHeader";
import ZonesSection from "./components/ZonesSection";
import MethodSection from "./components/MethodSection";
import PortalPreview from "./components/PortalPreview";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import { location } from "./lib/site-content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: location.name,
  medicalSpecialty: "Physiotherapy",
  description:
    "Recuperación, prevención y rendimiento con seguimiento real: cada plan se ajusta a tu lesión, tu deporte y tu evolución semana a semana.",
  telephone: `+${location.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    postalCode: location.postalCode,
    addressLocality: location.addressLocality,
    addressCountry: location.addressCountry,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />

      <section id="zonas" className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="Por zona, no por talla única"
              title="Cada lesión tiene su propio protocolo"
              description="Selecciona una zona para ver cómo se estructura el contenido y seguimiento que recibirías en tu portal."
            />
          </Reveal>
          <Reveal>
            <ZonesSection />
          </Reveal>
        </div>
      </section>

      <section id="metodo" className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="El proceso"
              title="De la valoración al alta deportiva"
              description="Cuatro fases con objetivos claros. Sabes exactamente en qué punto estás y qué falta para el siguiente."
            />
          </Reveal>
          <MethodSection />
        </div>
      </section>

      <section id="portal" className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="Tu portal, no una carpeta de PDFs"
              title="Así ve tu progreso cada cliente"
              description="Login privado, contenido filtrado por su lesión y un registro real de sesiones y evolución."
            />
          </Reveal>
          <Reveal>
            <PortalPreview />
          </Reveal>
        </div>
      </section>

      <section id="planes" className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="Suscripción mensual"
              title="Un plan para cada nivel de acompañamiento"
              description="Pago recurrente seguro. Puedes cancelar o cambiar de plan cuando quieras desde tu portal."
            />
          </Reveal>
          <Reveal>
            <PricingSection />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="Resultados"
              title="Lo que dicen quienes ya volvieron a competir"
            />
          </Reveal>
          <Reveal>
            <TestimonialsSection />
          </Reveal>
        </div>
      </section>

      <section id="ubicacion" className="border-t border-line px-8 py-27.5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionHeader
              eyebrow="Ubicación"
              title="Ven a conocernos en clínica"
              description="En Albacete, en Clínica Graus. Escríbenos por WhatsApp si tienes cualquier duda antes de reservar."
            />
          </Reveal>
          <Reveal>
            <LocationSection />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
