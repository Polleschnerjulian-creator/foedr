import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "foedr. | Fördermittel. Automatisiert.",
  description:
    "Die intelligente Plattform für Fördermittel im deutschen Mittelstand. Finde passende Förderprogramme in Minuten.",
  keywords: [
    "Fördermittel",
    "Förderung",
    "KMU",
    "Mittelstand",
    "Forschungszulage",
    "Zuschüsse",
    "Deutschland",
  ],
  authors: [{ name: "foedr." }],
  openGraph: {
    title: "foedr. | Fördermittel. Automatisiert.",
    description:
      "Die intelligente Plattform für Fördermittel im deutschen Mittelstand.",
    url: "https://foedr.de",
    siteName: "foedr.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
