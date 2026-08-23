import type { Opportunity, Recommendation } from "./types";

export function calculateOpportunityScore(
  opportunity: Omit<Opportunity, "score" | "recommendation">
) {
  const raw =
    opportunity.demand * 0.2 +
    opportunity.momentum * 0.15 +
    opportunity.repeatability * 0.15 +
    opportunity.customization * 0.15 +
    opportunity.productFit * 0.15 +
    opportunity.competitionGap * 0.1 +
    opportunity.confidence * 0.1;

  const finalScore = Math.round(raw - opportunity.saturationRisk * 0.1);
  return Math.max(0, Math.min(100, finalScore));
}

export function recommendationFor(score: number): Recommendation {
  if (score >= 90) return "BUILD NOW";
  if (score >= 80) return "TEST";
  if (score >= 70) return "WATCH";
  if (score >= 55) return "HOLD";
  return "DEPRIORITIZE";
}
