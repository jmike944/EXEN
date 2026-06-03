import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/exen/theme-provider";
import { Nav } from "@/components/exen/nav";
import { Footer } from "@/components/exen/footer";
import { FloatingActions } from "@/components/exen/floating-actions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EXEN — Portafolio de Desarrollos",
  description:
    "EXEN — Firma de comercialización y desarrollo inmobiliario en Saltillo y Arteaga, Coahuila. Lotes campestres, terrenos residenciales y desarrollos verticales.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      data-theme="warm"
      data-corners="sharp"
      className={`${poppins.variable} ${cormorant.variable}`}
    >
      <body>
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
