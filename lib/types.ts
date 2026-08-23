export type Recommendation = "BUILD NOW" | "TEST" | "WATCH" | "HOLD" | "DEPRIORITIZE";

export type Opportunity = {
  id: string;
  name: string;
  category: "Sports" | "Teacher" | "Seasonal" | "Lifestyle" | "Occupations" | "Custom";
  season: string;
  demand: number;
  momentum: number;
  repeatability: number;
  customization: number;
  productFit: number;
  competitionGap: number;
  confidence: number;
  saturationRisk: number;
  score: number;
  recommendation: Recommendation;
  primaryRisk: string;
};

export type Signal = {
  id: string;
  signal: string;
  category: Opportunity["category"];
  sourceType:
    | "Marketplace Search"
    | "Social Discovery"
    | "Search Trends"
    | "Wholesale Signals"
    | "Competitor Movement"
    | "Historical Performance";
  momentum: "Gaining" | "Stable" | "Declining";
  lifecycle: "Emerging" | "Growing" | "Mature";
  confidence: number;
  movement: string;
  relatedOpportunity: string;
};
