import { describe,it,expect } from "vitest";
import { getRecommendationTier,classifyPerformance } from "@/lib/recommendations";

describe("recommendation thresholds",()=>{
 it("uses the pre-launch score bands",()=>{
  expect(getRecommendationTier(90)).toBe("BUILD NOW");
  expect(getRecommendationTier(80)).toBe("TEST");
  expect(getRecommendationTier(70)).toBe("WATCH");
  expect(getRecommendationTier(55)).toBe("HOLD");
  expect(getRecommendationTier(54)).toBe("DEPRIORITIZE");
 });
 it("reserves SCALE for post-launch evidence",()=>{
  expect(classifyPerformance(85,"Winner")).toBe("SCALE");
  expect(classifyPerformance(84,"Winner")).toBe("BUILD NOW");
  expect(classifyPerformance(95,"Testing")).toBe("TEST");
  expect(classifyPerformance(95,"Underperformed")).toBe("DEPRIORITIZE");
 });
});
