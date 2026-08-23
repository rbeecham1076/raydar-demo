import { describe,it,expect } from "vitest";
import { calculateRawScore,calculateOpportunityScore,clampScore,SCORE_WEIGHTS,SATURATION_PENALTY_RATE } from "@/lib/scoring";
import type { ScoreDimensions } from "@/lib/types";

const BASE:ScoreDimensions={demand:80,momentum:80,repeatability:80,customization:80,productFit:80,competitionGap:80,confidence:80,saturationRisk:0};

describe("Raydar scoring",()=>{
 it("keeps a uniform score uniform before penalty",()=>expect(calculateRawScore(BASE)).toBeCloseTo(80,5));
 it("weights sum to 1",()=>expect(Object.values(SCORE_WEIGHTS).reduce((a,b)=>a+b,0)).toBeCloseTo(1,5));
 it("applies saturation as a penalty",()=>{
  const d={...BASE,saturationRisk:50};
  expect(calculateOpportunityScore(d)).toBe(Math.round(clampScore(calculateRawScore(d)-50*SATURATION_PENALTY_RATE)));
 });
 it("never lets more saturation improve the score",()=>expect(calculateOpportunityScore({...BASE,saturationRisk:60})).toBeLessThanOrEqual(calculateOpportunityScore({...BASE,saturationRisk:10})));
 it("clamps final scores to 0-100",()=>{expect(clampScore(-5)).toBe(0);expect(clampScore(105)).toBe(100);});
});
