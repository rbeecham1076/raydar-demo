import type { PerformanceRecord } from "./types";

export const RAYDAR_POLICY = {
  scoring: {
    marketOpportunity: "Uses the deterministic opportunity score. Brand fit never changes or blocks market opportunity.",
    saturationPenaltyWeight: 0.1,
    brandFitRole: "Advisory only. Low brand fit triggers adaptation guidance, never automatic rejection.",
  },
  directions: {
    count: 3,
    requiredKinds: ["BEST BET", "TREND FORWARD", "WILDCARD"] as const,
    minimumMeaningfulDifferences: 4,
    dimensions: ["palette", "surface", "illustration", "typography", "composition", "phraseTreatment"] as const,
  },
  phrase: {
    reviseAtSaturation: 38,
    avoidAtSaturation: 60,
    reviseBelowDemand: 74,
    allowNoText: true,
  },
  collection: {
    minimumFit: 80,
    preferredSize: { min: 3, max: 6 },
    matchingSignals: ["buyer", "season", "category", "motif", "launchWindow", "merchandisingUse"] as const,
    rule: "Coordinate collections through related visual language, not identical palettes, layouts, or fonts.",
  },
  inspiration: {
    opportunityScoreWeight: 0,
    use: "Art-direction evidence only: palette, surface, motif, typography, composition, merchandising energy and taste fit.",
  },
  fontUsage: {
    recentWindow: 10,
    heroRepeatPenaltyAt: 3,
    collectionException: true,
    rule: "Penalize hero-font repetition across unrelated designs. Intentional collection consistency may override the penalty.",
  },
  approval: {
    approvalDoesNotGenerateArtwork: true,
    actions: ["SELECT DIRECTION", "APPROVE FOR BUILD", "REGENERATE DIRECTIONS", "REVISE SELECTED DIRECTION", "GENERATE ARTWORK"] as const,
  },
  artworkOutput: {
    widthPx: 4500,
    heightPx: 5400,
    dpi: 300,
    format: "PNG",
    transparent: true,
    printReady: true,
    noMockup: true,
  },
  artworkReview: {
    requiredChecks: ["brief adherence", "palette adherence", "transparent background", "dimensions", "legibility", "composition", "edge quality", "unwanted artifacts", "originality"] as const,
  },
  listingPackage: {
    required: ["Etsy title", "13 Etsy tags", "description", "alt text", "thumbnail/mockup direction", "bundle ideas", "cross-sells", "Pinterest title", "Pinterest description", "social caption", "ad-group suggestion"] as const,
  },
  publicDemo: {
    realPrivateInspiration: false,
    realPrivateCompetitorResearch: false,
    realBusinessPerformanceData: false,
    interactionsShouldWork: true,
    generationMayBeSimulated: true,
  },
} as const;

export type LearningDecision = "SCALE" | "TEST" | "HOLD" | "RETIRE";

export function learningDecision(record: PerformanceRecord, listingVisits?: number): LearningDecision {
  const enoughForHold = (listingVisits ?? 0) >= 300 || record.orders >= 10;
  const enoughForRetire = (listingVisits ?? 0) >= 500 || record.orders >= 20;

  if (record.conversion >= 4 && record.roas >= 4) return "SCALE";
  if (!enoughForHold) return "TEST";
  if (record.conversion < 1 && enoughForRetire) return "RETIRE";
  if (record.conversion < 2 || record.roas < 1.5) return "HOLD";
  return "TEST";
}
