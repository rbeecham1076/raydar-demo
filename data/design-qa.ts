import type { Category, DirectionKind, Opportunity, VisualRecipe } from "@/lib/types";
import { getOpportunityIntelligence } from "@/data/design-intelligence";

/**
 * Deterministic pre-audit QA for Raydar's art-direction engine.
 * These scenarios intentionally span very different buyers/categories so an audit can
 * detect category collapse, repeated font formulas, or three-direction recolor behavior.
 */
export const DESIGN_QA_SCENARIOS: Opportunity[] = [
  {id:"qa-sports",name:"Custom Friday Night Mascot",category:"Sports",season:"Fall",score:91,recommendation:"BUILD NOW",primaryRisk:"Crowded game-day language",demand:94,momentum:91,repeatability:96,customization:98,productFit:94,competitionGap:76,confidence:92,saturationRisk:44},
  {id:"qa-teacher",name:"Personalized Teacher Desk",category:"Teacher",season:"Back to School",score:86,recommendation:"BUILD NOW",primaryRisk:"Generic teacher iconography",demand:88,momentum:84,repeatability:91,customization:94,productFit:90,competitionGap:73,confidence:88,saturationRisk:41},
  {id:"qa-coastal",name:"Gone Coastal Weekend",category:"Lifestyle",season:"Summer",score:88,recommendation:"BUILD NOW",primaryRisk:"Fast-moving coastal styling",demand:91,momentum:93,repeatability:89,customization:61,productFit:92,competitionGap:82,confidence:90,saturationRisk:33},
  {id:"qa-holiday",name:"Holiday Hosting Society",category:"Seasonal",season:"Holiday",score:82,recommendation:"TEST",primaryRisk:"Short merchandising window",demand:86,momentum:81,repeatability:84,customization:68,productFit:88,competitionGap:75,confidence:85,saturationRisk:39},
  {id:"qa-fashion",name:"Leisure Club Graphic",category:"Lifestyle",season:"Evergreen",score:79,recommendation:"TEST",primaryRisk:"Trend language can mature quickly",demand:78,momentum:90,repeatability:82,customization:55,productFit:86,competitionGap:87,confidence:81,saturationRisk:27},
];

const dimensions: (keyof VisualRecipe)[] = ["paletteName","surface","illustration","typography","composition"];

function differenceCount(a:VisualRecipe,b:VisualRecipe){
  return dimensions.reduce((n,key)=>n+(String(a[key])!==String(b[key])?1:0),0);
}

export type DesignQaResult={
  scenario:string;
  category:Category;
  pass:boolean;
  issues:string[];
  directionDifferenceCounts:Record<string,number>;
  heroFonts:Record<DirectionKind,string>;
};

export function runDesignQa():DesignQaResult[]{
  return DESIGN_QA_SCENARIOS.map(o=>{
    const intel=getOpportunityIntelligence(o);
    const [best,trend,wild]=intel.directions;
    const pairs:[[typeof best,typeof trend],[typeof best,typeof wild],[typeof trend,typeof wild]]=[[best,trend],[best,wild],[trend,wild]];
    const counts:Record<string,number>={};
    const issues:string[]=[];
    for(const [a,b] of pairs){
      const key=`${a.kind} vs ${b.kind}`;
      counts[key]=differenceCount(a.recipe,b.recipe);
      if(counts[key]<4)issues.push(`${key} differs across only ${counts[key]} tracked visual dimensions; target is at least 4.`);
    }
    const heroFonts={
      "BEST BET":best.recipe.fontRoles?.hero||"",
      "TREND FORWARD":trend.recipe.fontRoles?.hero||"",
      "WILDCARD":wild.recipe.fontRoles?.hero||"",
    } as Record<DirectionKind,string>;
    if(new Set(Object.values(heroFonts)).size<2)issues.push("Directions collapsed onto the same hero font formula.");
    if(intel.marketOpportunity!==o.score)issues.push("Market Opportunity was altered by downstream taste/art-direction logic.");
    if(intel.directions.length!==3)issues.push("Opportunity did not produce exactly three directions.");
    return {scenario:o.name,category:o.category,pass:issues.length===0,issues,directionDifferenceCounts:counts,heroFonts};
  });
}

/** Compact audit-friendly report. This can be rendered in a dev-only page or exercised by tests. */
export function designQaSummary(){
  const results=runDesignQa();
  return {passed:results.every(r=>r.pass),scenarioCount:results.length,results};
}
