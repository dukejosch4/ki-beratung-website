import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "veqtis | DSGVO-konforme KI-Lösungen für den Mittelstand",
  description:
    "Schlüsselfertige KI-Systeme für regionale Unternehmen. Wissensassistenten, Workflow-Automatisierung und Kundenservice-Bots. 100% DSGVO-konform. Hildesheim & Hannover.",
  keywords:
    "KI Beratung, Hildesheim, Hannover, KMU, DSGVO, RAG, Künstliche Intelligenz, Automatisierung, Wissensassistent",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
