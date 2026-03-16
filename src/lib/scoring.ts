import { INDUSTRIES } from "./constants";

interface ScoringInput {
  websiteUrl: string | null;
  hasSsl: boolean | null;
  isMobileResponsive: boolean | null;
  pageLoadMs: number | null;
  hasMetaTags: boolean | null;
  hasStructuredData: boolean | null;
  industry: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
}

export function calculateOpportunityScore(input: ScoringInput): number {
  let score: number;

  if (!input.websiteUrl) {
    // No website = high opportunity
    score = 80;
  } else {
    // Has website — start at 20, add malus points for issues
    score = 20;
    if (input.hasSsl === false) score += 20;
    if (input.isMobileResponsive === false) score += 25;
    if (input.pageLoadMs && input.pageLoadMs > 3000) score += 15;
    if (input.hasMetaTags === false) score += 10;
    if (input.hasStructuredData === false) score += 10;
  }

  // Industry multiplier
  const industryConfig = INDUSTRIES.find((i) => i.value === input.industry);
  const industryMultiplier = industryConfig?.multiplier ?? 1.0;
  score *= industryMultiplier;

  // Google signals
  if (input.googleRating && input.googleRating >= 4.0) {
    score *= 1.1;
  }
  if (input.googleReviewCount && input.googleReviewCount >= 20) {
    score *= 1.1;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}
