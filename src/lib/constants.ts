export const PIPELINE_STAGES = [
  "neu",
  "mockup",
  "kontaktiert",
  "follow_up",
  "response",
  "angebot",
  "gewonnen",
  "verloren",
] as const;

export type PipelineStatus = (typeof PIPELINE_STAGES)[number];

export const PIPELINE_LABELS: Record<PipelineStatus, string> = {
  neu: "Neu",
  mockup: "Mockup",
  kontaktiert: "Kontaktiert",
  follow_up: "Follow-Up",
  response: "Response",
  angebot: "Angebot",
  gewonnen: "Gewonnen",
  verloren: "Verloren",
};

export const INDUSTRIES = [
  { value: "arzt", label: "Arzt / Zahnarzt", multiplier: 1.4 },
  { value: "handwerker", label: "Handwerker", multiplier: 1.3 },
  { value: "anwalt", label: "Anwalt / Notar", multiplier: 1.3 },
  { value: "steuerberater", label: "Steuerberater", multiplier: 1.2 },
  { value: "gastro", label: "Gastronomie", multiplier: 0.9 },
  { value: "einzelhandel", label: "Einzelhandel", multiplier: 0.85 },
  { value: "immobilien", label: "Immobilien", multiplier: 1.2 },
  { value: "fitness", label: "Fitness / Sport", multiplier: 1.0 },
  { value: "beauty", label: "Friseur / Kosmetik", multiplier: 1.0 },
  { value: "kfz", label: "KFZ / Werkstatt", multiplier: 1.1 },
  { value: "sonstige", label: "Sonstige", multiplier: 1.0 },
] as const;

export type Industry = (typeof INDUSTRIES)[number]["value"];

export const REGIONS = [
  { value: "hildesheim", label: "Hildesheim", lat: 52.1505, lng: 9.9518 },
  { value: "hannover", label: "Hannover", lat: 52.3759, lng: 9.732 },
  { value: "braunschweig", label: "Braunschweig", lat: 52.2689, lng: 10.5268 },
  { value: "salzgitter", label: "Salzgitter", lat: 52.1547, lng: 10.3324 },
  { value: "peine", label: "Peine", lat: 52.3193, lng: 10.2336 },
  { value: "goslar", label: "Goslar", lat: 51.9059, lng: 10.4289 },
  { value: "wolfsburg", label: "Wolfsburg", lat: 52.4227, lng: 10.7865 },
] as const;

export type Region = (typeof REGIONS)[number]["value"];
