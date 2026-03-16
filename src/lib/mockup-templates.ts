export type TemplateKey = "arzt" | "handwerker" | "anwalt" | "gastro";

export interface TemplateConfig {
  key: TemplateKey;
  name: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  headline: (firmenname: string) => string;
  cta: string;
  sections: { title: string; description: string }[];
}

export const INDUSTRY_TEMPLATE_MAP: Record<string, TemplateKey> = {
  arzt: "arzt",
  handwerker: "handwerker",
  anwalt: "anwalt",
  steuerberater: "anwalt",
  gastro: "gastro",
  einzelhandel: "gastro",
  immobilien: "anwalt",
  fitness: "handwerker",
  beauty: "gastro",
  kfz: "handwerker",
  sonstige: "handwerker",
};

export const TEMPLATES: Record<TemplateKey, TemplateConfig> = {
  arzt: {
    key: "arzt",
    name: "Arztpraxis",
    primaryColor: "#8B7355",
    accentColor: "#A0896D",
    bgColor: "#FAF7F2",
    headline: (name) => `Willkommen bei ${name}`,
    cta: "Termin vereinbaren",
    sections: [
      {
        title: "Unsere Leistungen",
        description:
          "Profitieren Sie von unserem umfassenden Behandlungsspektrum und modernster medizinischer Ausstattung.",
      },
      {
        title: "Ihr Vertrauen ist unser Antrieb",
        description:
          "Langjährige Erfahrung, einfühlsame Betreuung und individuelle Behandlungspläne für Ihre Gesundheit.",
      },
      {
        title: "Moderne Praxis",
        description:
          "Helle Räumlichkeiten und neueste Technik für eine angenehme Behandlungsatmosphäre.",
      },
    ],
  },
  handwerker: {
    key: "handwerker",
    name: "Handwerksbetrieb",
    primaryColor: "#D97706",
    accentColor: "#B45309",
    bgColor: "#FFFBF0",
    headline: (name) => `${name} — Qualität, auf die Sie zählen können`,
    cta: "Kostenlose Anfrage",
    sections: [
      {
        title: "Unsere Projekte",
        description:
          "Überzeugen Sie sich von unserer Arbeit — termingerecht, sauber und in höchster Qualität.",
      },
      {
        title: "Meisterbetrieb",
        description:
          "Kompetente Beratung und fachgerechte Ausführung durch qualifizierte Handwerksmeister.",
      },
      {
        title: "Schnell & Zuverlässig",
        description:
          "Von der Anfrage bis zur Fertigstellung — wir sind Ihr verlässlicher Partner vor Ort.",
      },
    ],
  },
  anwalt: {
    key: "anwalt",
    name: "Kanzlei",
    primaryColor: "#1E3A5F",
    accentColor: "#2D5A8E",
    bgColor: "#F5F7FA",
    headline: (name) => `${name} — Kompetente Rechtsberatung`,
    cta: "Erstberatung anfragen",
    sections: [
      {
        title: "Rechtsgebiete",
        description:
          "Fundierte Expertise in allen relevanten Rechtsbereichen für Privatpersonen und Unternehmen.",
      },
      {
        title: "Erfahrung & Kompetenz",
        description:
          "Strategische Rechtsberatung mit dem Ziel, die beste Lösung für Ihre individuelle Situation zu finden.",
      },
      {
        title: "Persönliche Betreuung",
        description:
          "Vertrauensvolle Zusammenarbeit und transparente Kommunikation auf Augenhöhe.",
      },
    ],
  },
  gastro: {
    key: "gastro",
    name: "Gastronomie",
    primaryColor: "#B45309",
    accentColor: "#92400E",
    bgColor: "#FFF8F0",
    headline: (name) => `Willkommen bei ${name}`,
    cta: "Tisch reservieren",
    sections: [
      {
        title: "Unsere Küche",
        description:
          "Frische Zutaten, kreative Rezepte und liebevolle Zubereitung für ein unvergessliches Geschmackserlebnis.",
      },
      {
        title: "Gemütliche Atmosphäre",
        description:
          "Genießen Sie Ihre Zeit bei uns in einladendem Ambiente — perfekt für jeden Anlass.",
      },
      {
        title: "Veranstaltungen",
        description:
          "Von der Familienfeier bis zum Geschäftsessen — wir gestalten Ihr Event nach Ihren Wünschen.",
      },
    ],
  },
};

export function getTemplateForIndustry(industry: string | null): TemplateConfig {
  const key = INDUSTRY_TEMPLATE_MAP[industry || "sonstige"] || "handwerker";
  return TEMPLATES[key];
}
