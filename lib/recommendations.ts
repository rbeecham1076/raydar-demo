import type { PerformanceResult, PostLaunchRecommendation, Recommendation } from "./types";

export function getRecommendationTier(score:number):Recommendation{
 if(score>=90)return "BUILD NOW";
 if(score>=80)return "TEST";
 if(score>=70)return "WATCH";
 if(score>=55)return "HOLD";
 return "DEPRIORITIZE";
}

export function classifyPerformance(originalScore:number,result:PerformanceResult):PostLaunchRecommendation{
 if(result==="Winner"&&originalScore>=85)return "SCALE";
 if(result==="Winner")return "BUILD NOW";
 if(result==="Testing")return "TEST";
 return "DEPRIORITIZE";
}
