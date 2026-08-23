import type { Opportunity, PerformanceRecord } from "./types";

export type CommandItem={name:string;reason:string;score?:number};
export type WeeklyCommandCenter={build:CommandItem[];watch:CommandItem[];refresh:CommandItem[];scale:CommandItem[];retire:CommandItem[];skip:CommandItem[]};

export function buildWeeklyCommandCenter(opportunities:Opportunity[],performance:PerformanceRecord[]):WeeklyCommandCenter{
 const sorted=[...opportunities].sort((a,b)=>b.score-a.score);
 const build=sorted.filter(o=>o.score>=86&&o.saturationRisk<45).slice(0,5).map(o=>({name:o.name,score:o.score,reason:o.customization>=90?"High opportunity plus scalable customization potential.":"High-confidence opportunity with manageable saturation."}));
 const watch=sorted.filter(o=>(o.score>=74&&o.score<86)||o.saturationRisk>=45).slice(0,6).map(o=>({name:o.name,score:o.score,reason:o.saturationRisk>=45?"Evidence is useful, but saturation requires stronger differentiation or fresher confirmation.":"Promising signal that needs timing or evidence before build."}));
 const scale=performance.filter(p=>p.conversion>=4&&p.roas>=4).sort((a,b)=>b.revenue-a.revenue).slice(0,4).map(p=>({name:p.product,reason:`Proven result: ${p.conversion}% conversion and ${p.roas} ROAS. Expand variants, bundles, or related concepts.`}));
 const retire=performance.filter(p=>p.result==="Underperformed"&&p.conversion<1.5).slice(0,4).map(p=>({name:p.product,reason:`Weak result (${p.conversion}% conversion, ${p.roas} ROAS). Hold or retire unless it fills a strategic collection role.`}));
 const refresh=performance.filter(p=>p.result==="Testing"&&p.conversion>=2&&p.conversion<4).slice(0,4).map(p=>({name:p.product,reason:`Middle-zone performance (${p.conversion}% conversion). Test thumbnail, phrase, colorway, or product positioning before abandoning.`}));
 const skip=sorted.filter(o=>o.saturationRisk>=40||o.score<72).slice(-4).reverse().map(o=>({name:o.name,score:o.score,reason:o.saturationRisk>=40?"Tempting market, but saturation/overlap makes it a poor immediate use of production time.":"Current evidence is weaker than higher-priority shop-growth opportunities."}));
 return {build,watch,refresh,scale,retire,skip};
}
