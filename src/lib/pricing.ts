export type ServiceType =
  | "wissensassistent"
  | "workflow"
  | "kundenservice"
  | "webdev";

export type IndustryType = "standard" | "regulated";
export type CompanySize = "1-10" | "11-50" | "51-200" | "200+";
export type DocumentVolume = "small" | "medium" | "large" | "enterprise";
export type Infrastructure = "cloud" | "onpremise";
export type UserCount = "1-5" | "6-20" | "21-50" | "50+";
export type ChatVolume = "low" | "medium" | "high";
export type WebProjectType = "landing" | "website" | "webapp";

export interface CalculatorInput {
  services: ServiceType[];
  industry: IndustryType;
  companySize: CompanySize;
  documentVolume: DocumentVolume;
  infrastructure: Infrastructure;
  workflowCount: number;
  userCount: UserCount;
  chatVolume: ChatVolume;
  webProjectType: WebProjectType;
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
  "11-50": 1.3,
  "51-200": 1.7,
  "200+": 2.2,
};

const DOC_SURCHARGE: Record<DocumentVolume, number> = {
  small: 0,
  medium: 500,
  large: 1500,
  enterprise: 3000,
};

const USER_SETUP_SURCHARGE: Record<UserCount, number> = {
  "1-5": 0,
  "6-20": 500,
  "21-50": 1500,
  "50+": 3000,
};

const USER_MONTHLY_SURCHARGE: Record<UserCount, number> = {
  "1-5": 0,
  "6-20": 50,
  "21-50": 100,
  "50+": 200,
};

const CHAT_SETUP_SURCHARGE: Record<ChatVolume, number> = {
  low: 0,
  medium: 800,
  high: 2000,
};

const CHAT_MONTHLY_SURCHARGE: Record<ChatVolume, number> = {
  low: 0,
  medium: 100,
  high: 250,
};

// Web-Dev: [setup, monthly] per project type per company size
const WEBDEV_PRICING: Record<WebProjectType, Record<CompanySize, [number, number]>> = {
  landing: {
    "1-10": [1500, 40],
    "11-50": [2000, 50],
    "51-200": [2500, 60],
    "200+": [3000, 80],
  },
  website: {
    "1-10": [2500, 60],
    "11-50": [4000, 80],
    "51-200": [6000, 100],
    "200+": [8000, 120],
  },
  webapp: {
    "1-10": [5000, 120],
    "11-50": [8000, 150],
    "51-200": [12000, 200],
    "200+": [18000, 300],
  },
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
    let setup =
      Math.round(4900 * sizeMul) +
      DOC_SURCHARGE[input.documentVolume] +
      USER_SETUP_SURCHARGE[input.userCount];
    let monthly = 490 + USER_MONTHLY_SURCHARGE[input.userCount];
    if (isRegulated) setup = Math.round(setup * 1.25);
    breakdown.push({ label: "KI-Wissensassistent", setup, monthly });
  }

  // P2: Workflow-Autopilot
  if (input.services.includes("workflow")) {
    let setup = calcWorkflowSetup(input.workflowCount);
    if (isRegulated) setup = Math.round(setup * 1.15);
    breakdown.push({ label: "Workflow-Autopilot", setup, monthly: 350 });
  }

  // P3: KI-Kundenservice-Bot
  if (input.services.includes("kundenservice")) {
    let setup = 5900 + CHAT_SETUP_SURCHARGE[input.chatVolume];
    let monthly = 490 + CHAT_MONTHLY_SURCHARGE[input.chatVolume];
    if (isRegulated) setup = Math.round(setup * 1.2);
    breakdown.push({ label: "KI-Kundenservice-Bot", setup, monthly });
  }

  // P4: Web-Development
  if (input.services.includes("webdev")) {
    const [setup, monthly] = WEBDEV_PRICING[input.webProjectType][input.companySize];
    breakdown.push({ label: "Web-Development", setup, monthly });
  }

  // Infrastructure (only for KI services)
  if (input.services.some((s) => s !== "webdev")) {
    if (input.infrastructure === "cloud") {
      breakdown.push({
        label: "Cloud-Hosting (Hetzner DE)",
        setup: 0,
        monthly: 180,
      });
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
  const discountedServiceSetup = Math.round(
    serviceSetup * (1 - comboDiscount)
  );
  const setupTotal = discountedServiceSetup + infraSetup;

  const yearlyTotal = setupTotal + monthlyTotal * 12;

  // Notes
  if (comboDiscount > 0) {
    notes.push(
      `${Math.round(comboDiscount * 100)}% Kombi-Rabatt auf Setup-Kosten`
    );
  }
  if (input.services.some((s) => s !== "webdev")) {
    notes.push(
      "Potenzialanalyse (1.490\u00A0\u20AC) wird bei Folgeauftrag vollst\u00E4ndig angerechnet"
    );
  }
  if (isRegulated) {
    notes.push(
      "Aufschlag f\u00FCr regulierte Branche (\u00A7203 StGB Compliance, Mandantentrennung)"
    );
  }
  if (
    input.infrastructure === "onpremise" &&
    input.services.some((s) => s !== "webdev")
  ) {
    notes.push(
      "Hardware-Kosten einmalig, danach keine laufenden Hosting-Kosten"
    );
  }

  return { setupTotal, monthlyTotal, yearlyTotal, breakdown, notes };
}
