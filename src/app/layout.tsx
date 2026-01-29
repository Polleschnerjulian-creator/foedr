import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "foedr. | Fördermittel. Automatisiert.",
  description:
    "Die intelligente Plattform für Fördermittel im deutschen Mittelstand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
