import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KI-Beratung Hildesheim | DSGVO-konforme KI-Lösungen für KMU",
  description:
    "Schlüsselfertige KI-Systeme für regionale Unternehmen. Wissensassistenten, Workflow-Automatisierung und Kundenservice-Bots. 100% DSGVO-konform. Hildesheim & Hannover.",
  keywords:
    "KI Beratung, Hildesheim, Hannover, KMU, DSGVO, RAG, Künstliche Intelligenz, Automatisierung, Wissensassistent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
