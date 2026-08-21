import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ModalProvider from "./components/ModalProvider";
import ContactTopBar from "./components/ContactTopBar";
import Nav from "./components/Nav";
import ScrollPulseProgress from "./components/ScrollPulseProgress";
import ThemeLabSwitcher from "./components/ThemeLabSwitcher";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { getProfile } from "./lib/dal";
import { brand } from "./lib/site-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "Álvaro Picazo · Fisioterapia Deportiva";
const description =
  "Recuperación, prevención y rendimiento con seguimiento real: cada plan se ajusta a tu lesión, tu deporte y tu evolución semana a semana.";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: brand.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function RootLayout({ children }) {
  const profile = await getProfile();

  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-bg font-sans text-foreground antialiased">
        <ScrollPulseProgress />
        <ModalProvider>
          <div className="fixed inset-x-0 top-0 z-[100]">
            <ContactTopBar />
            <Nav profile={profile} />
          </div>
          {children}
        </ModalProvider>
        <ThemeLabSwitcher />
        <FloatingWhatsApp />
        <Toaster position="top-right" theme="dark" richColors closeButton />
      </body>
    </html>
  );
}
