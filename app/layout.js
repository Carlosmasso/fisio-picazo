import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ModalProvider from "./components/ModalProvider";
import Nav from "./components/Nav";
import ThemeLabSwitcher from "./components/ThemeLabSwitcher";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { getProfile } from "./lib/dal";

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
  title: "Álvaro Picazo · Fisioterapia Deportiva",
  description:
    "Recuperación, prevención y rendimiento con seguimiento real: cada plan se ajusta a tu lesión, tu deporte y tu evolución semana a semana.",
};

export default async function RootLayout({ children }) {
  const profile = await getProfile();

  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-bg font-sans text-foreground antialiased">
        <ModalProvider>
          <Nav profile={profile} />
          {children}
        </ModalProvider>
        <ThemeLabSwitcher />
        <FloatingWhatsApp />
        <Toaster position="top-right" theme="dark" richColors closeButton />
      </body>
    </html>
  );
}
