import type { Opportunity, Recommendation, ScoreDimensions } from "./types";

export const SCORE_WEIGHTS={demand:.20,momentum:.15,repeatability:.15,customization:.15,productFit:.15,competitionGap:.10,confidence:.10} as const;
export const SATURATION_PENALTY_RATE=.10;

export function clampScore(n:number){return Math.max(0,Math.min(100,n));}

export function calculateRawScore(d:ScoreDimensions){
 return d.demand*SCORE_WEIGHTS.demand+d.momentum*SCORE_WEIGHTS.momentum+d.repeatability*SCORE_WEIGHTS.repeatability+d.customization*SCORE_WEIGHTS.customization+d.productFit*SCORE_WEIGHTS.productFit+d.competitionGap*SCORE_WEIGHTS.competitionGap+d.confidence*SCORE_WEIGHTS.confidence;
}

export function calculateOpportunityScore(opportunity:Omit<Opportunity,"score"|"recommendation">|ScoreDimensions){
 const finalScore=Math.round(calculateRawScore(opportunity)-opportunity.saturationRisk*SATURATION_PENALTY_RATE);
 return clampScore(finalScore);
}

export function recommendationFor(score:number):Recommendation{
 if(score>=90)return "BUILD NOW";
 if(score>=80)return "TEST";
 if(score>=70)return "WATCH";
 if(score>=55)return "HOLD";
 return "DEPRIORITIZE";
}
