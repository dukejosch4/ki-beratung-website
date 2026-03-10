export type ServiceType =
  | "wissensassistent"
  | "workflow"
  | "kundenservice"
  | "webdev";

export type IndustryType = "standard" | "regulated";
export type CompanySize = "1-10" | "11-50" | "51-200" | "200+";
export type DocumentVolume = "small" | "medium" | "large" | "enterprise";
export type Infrastructure = "cloud" | "onpremise";

export interface CalculatorInput {
  services: ServiceType[];
  industry: IndustryType;
  companySize: CompanySize;
  documentVolume: DocumentVolume;
  infrastructure: Infrastructure;
  workflowCount: number;
}

export interface BreakdownItem {
  label: string;
  setup: number;
  monthly: number;
}

export interface PricingResult {
  setupTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
  breakdown: BreakdownItem[];
  notes: string[];
}

const SIZE_MULTIPLIER: Record<CompanySize, number> = {
  "1-10": 1.0,
  "11-50": 1.4,
  "51-200": 1.8,
  "200+": 2.4,
};

const DOC_SURCHARGE: Record<DocumentVolume, number> = {
  small: 0,
  medium: 500,
  large: 1500,
  enterprise: 3000,
};

function calcWorkflowSetup(count: number): number {
  if (count <= 1) return 2500;
  if (count <= 3) return 6900;
  if (count <= 5) return 10000;
  if (count <= 10) return 17500;
  return 17500 + (count - 10) * 1500;
}

export function calculatePricing(input: CalculatorInput): PricingResult {
  const breakdown: BreakdownItem[] = [];
  const notes: string[] = [];
  const isRegulated = input.industry === "regulated";
  const sizeMul = SIZE_MULTIPLIER[input.companySize];

  // P1: KI-Wissensassistent
  if (input.services.includes("wissensassistent")) {
    let setup = Math.round(4900 * sizeMul) + DOC_SURCHARGE[input.documentVolume];
    if (isRegulated) setup = Math.round(setup * 1.25);
    breakdown.push({ label: "KI-Wissensassistent", setup, monthly: 490 });
  }

  // P2: Workflow-Autopilot
  if (input.services.includes("workflow")) {
    let setup = calcWorkflowSetup(input.workflowCount);
    if (isRegulated) setup = Math.round(setup * 1.15);
    breakdown.push({ label: "Workflow-Autopilot", setup, monthly: 350 });
  }

  // P3: KI-Kundenservice-Bot
  if (input.services.includes("kundenservice")) {
    let setup = 5900;
    if (isRegulated) setup = Math.round(setup * 1.2);
    breakdown.push({ label: "KI-Kundenservice-Bot", setup, monthly: 590 });
  }

  // P4: Web-Development
  if (input.services.includes("webdev")) {
    let setup = 3500;
    if (input.companySize === "51-200" || input.companySize === "200+") {
      setup = 6500;
    } else if (input.companySize === "11-50") {
      setup = 4500;
    }
    breakdown.push({ label: "Web-Development", setup, monthly: 150 });
  }

  // Infrastructure
  if (input.services.some((s) => s !== "webdev")) {
    if (input.infrastructure === "cloud") {
      breakdown.push({ label: "Cloud-Hosting (Hetzner DE)", setup: 0, monthly: 180 });
    } else {
      breakdown.push({ label: "On-Premise Hardware", setup: 4500, monthly: 0 });
    }
  }

  // Combo discount
  const serviceCount = input.services.length;
  let comboDiscount = 0;
  if (serviceCount === 2) comboDiscount = 0.05;
  if (serviceCount >= 3) comboDiscount = 0.1;

  const rawSetup = breakdown.reduce((sum, b) => sum + b.setup, 0);
  const monthlyTotal = breakdown.reduce((sum, b) => sum + b.monthly, 0);

  // Apply combo discount only to service setups (not infra)
  const infraSetup = breakdown
    .filter((b) => b.label.includes("Hosting") || b.label.includes("Hardware"))
    .reduce((sum, b) => sum + b.setup, 0);
  const serviceSetup = rawSetup - infraSetup;
  const discountedServiceSetup = Math.round(serviceSetup * (1 - comboDiscount));
  const setupTotal = discountedServiceSetup + infraSetup;

  const yearlyTotal = setupTotal + monthlyTotal * 12;

  // Notes
  if (comboDiscount > 0) {
    notes.push(
      `${Math.round(comboDiscount * 100)}% Kombi-Rabatt auf Setup-Kosten`
    );
  }
  notes.push(
    "Potenzialanalyse (1.490\u00A0\u20AC) wird bei Folgeauftrag vollständig angerechnet"
  );
  if (isRegulated) {
    notes.push(
      "Aufschlag für regulierte Branche (§203 StGB Compliance, Mandantentrennung)"
    );
  }
  if (input.infrastructure === "onpremise" && input.services.some((s) => s !== "webdev")) {
    notes.push("Hardware-Kosten einmalig, danach keine laufenden Hosting-Kosten");
  }

  return { setupTotal, monthlyTotal, yearlyTotal, breakdown, notes };
}
