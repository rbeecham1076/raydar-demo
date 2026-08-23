import Link from "next/link";
import { notFound } from "next/navigation";
import { opportunities } from "@/data/demo-data";
import { getOpportunityIntelligence } from "@/data/design-intelligence";
import { Badge, Card, Meter, Score } from "@/components/ui";
import { OpportunityDecision } from "@/components/opportunity-decision";

export default async function OpportunityDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const o=opportunities.find(x=>x.id===id); if(!o) notFound();
 const intelligence=getOpportunityIntelligence(o);
 return <><Link className="back" href="/opportunities">← Opportunities</Link>
 <div className="detailTitle"><div><span className="eyebrow">OPPORTUNITY DETAIL</span><h1>{o.name}</h1><p>{o.season} · {o.category} · Digital product</p></div><div className="decisionScore"><Badge>{o.recommendation}</Badge><Score value={o.score}/><small>/100</small></div></div>
 <div className="grid2">
  <Card><span className="eyebrow">MARKET OPPORTUNITY</span><h2>{intelligence.marketOpportunity}/100</h2><p className="muted">Commercial opportunity is scored independently from visual brand fit so strong ideas are not rejected simply for looking different from current work.</p></Card>
  <Card><span className="eyebrow">BRAND FIT</span><h2>{intelligence.brandFit}/100</h2><p className="muted">{intelligence.brandFitNote}</p></Card>
 </div>
 <div className="grid2">
  <Card><span className="eyebrow">PHRASE INTELLIGENCE</span><h2>{intelligence.phrase.status}: {intelligence.phrase.current}</h2><p>{intelligence.phrase.rationale}</p>{intelligence.phrase.alternatives.length>0&&<div className="phraseAlternatives">{intelligence.phrase.alternatives.map(x=><span key={x}>{x}</span>)}</div>}</Card>
  <Card><span className="eyebrow">COLLECTION FIT</span><h2>{intelligence.collection.name}</h2><div className="riskNumber">{intelligence.collection.fit}<small>/100 collection fit</small></div><p className="muted">{intelligence.collection.note}</p></Card>
 </div>
 <div className="grid2">
  <Card><span className="eyebrow">SELLING WINDOW</span><h2>{intelligence.timing.listBy}</h2><div className="timingGrid"><p><strong>Design by</strong><br/>{intelligence.timing.designBy}</p><p><strong>Peak search</strong><br/>{intelligence.timing.peakSearch}</p><p><strong>Reassess</strong><br/>{intelligence.timing.retireReassess}</p></div><p className="muted">{intelligence.timing.note}</p></Card>
  <Card><span className="eyebrow">PORTFOLIO OVERLAP</span><h2>{intelligence.cannibalization.status}</h2><p>{intelligence.cannibalization.note}</p><p className="muted">Raydar treats overlap as a differentiation decision, not an automatic rejection.</p></Card>
 </div>
 <Card><span className="eyebrow">PRODUCT EXPANSION MAP</span><h2>One signal can become more than one sellable asset.</h2><div className="expansionGrid">{intelligence.expansion.map(x=><div key={x.type}><b>{x.priority}</b><strong>{x.type}</strong><p>{x.reason}</p></div>)}</div></Card>
 <div className="grid2">
  <Card><span className="eyebrow">WHY RAYDAR LIKES IT</span><h2>Strong evidence with repeatable upside.</h2><ul className="bullets"><li>Demand is supported by multiple independent signal types.</li><li>Customization expands the addressable market where relevant.</li><li>Repeatability creates a variation, bundle, or collection path.</li></ul></Card>
  <Card><span className="eyebrow">RISK PROFILE</span><h2>{o.primaryRisk}</h2><div className="riskNumber">{o.saturationRisk}<small>/100 saturation</small></div><p className="muted">Risk is material but does not outweigh current evidence strength.</p></Card>
 </div>
 <Card><span className="eyebrow">SCORE BREAKDOWN</span><div className="meters">{[["Demand",o.demand],["Trend Momentum",o.momentum],["Repeatability",o.repeatability],["Customization",o.customization],["Product Fit",o.productFit],["Competition Gap",o.competitionGap],["Confidence",o.confidence],["Saturation Risk",o.saturationRisk]].map(([l,v])=><Meter key={l as string} label={l as string} value={v as number}/>)}</div></Card>
 <OpportunityDecision id={o.id} name={o.name} intelligence={intelligence}/>
 </>
}
