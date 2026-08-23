import type { Opportunity, PerformanceRecord, PipelineItem, PipelineStage, Signal } from "./types";

export function topOpportunities(opportunities:Opportunity[],n=5){return [...opportunities].sort((a,b)=>b.score-a.score).slice(0,n);}

export function recentSignals(signals:Signal[],n=5){return signals.slice(0,n);}

export function computeMarketPulse(signals:Signal[]){return {
 gaining:signals.filter(s=>s.momentum==="Gaining").length,
 stable:signals.filter(s=>s.momentum==="Stable").length,
 declining:signals.filter(s=>s.momentum==="Declining").length,
};}

export function computeKpis(signals:Signal[],opportunities:Opportunity[],pipeline:PipelineItem[]){
 const qualified=opportunities.filter(o=>o.recommendation==="BUILD NOW"||o.recommendation==="TEST");
 const averageConfidence=opportunities.length?Math.round(opportunities.reduce((sum,o)=>sum+o.confidence,0)/opportunities.length):0;
 const launchReady=pipeline.filter(p=>p.stage==="READY"||p.stage==="LISTED").length;
 return {activeSignals:signals.length,activeSignalsDelta:signals.filter(s=>s.momentum==="Gaining").length,qualifiedOpportunities:qualified.length,averageConfidence,launchReady};
}

export function pipelineCounts(pipeline:PipelineItem[]):Record<PipelineStage,number>{
 const stages:PipelineStage[]=["RESEARCH","WATCHING","APPROVED","BUILDING","READY","LISTED","TESTING","WINNER"];
 const counts=Object.fromEntries(stages.map(s=>[s,0])) as Record<PipelineStage,number>;
 for(const item of pipeline)counts[item.stage]++;
 return counts;
}

export function totalPerformance(records:PerformanceRecord[]){
 const revenue=records.reduce((sum,r)=>sum+r.revenue,0);
 const orders=records.reduce((sum,r)=>sum+r.orders,0);
 const weightedConversion=records.reduce((sum,r)=>sum+r.conversion*r.orders,0)/(orders||1);
 const weightedRoas=records.reduce((sum,r)=>sum+r.roas*r.orders,0)/(orders||1);
 return {revenue:Math.round(revenue*100)/100,orders,conversion:Math.round(weightedConversion*10)/10,roas:Math.round(weightedRoas*100)/100};
}
