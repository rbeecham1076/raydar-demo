import Link from "next/link";
import { notFound } from "next/navigation";
import { opportunities } from "@/data/demo-data";
import { getVisualRecipe } from "@/data/visual-recipes";
import { Badge, Card, Meter, Score } from "@/components/ui";
import { OpportunityDecision } from "@/components/opportunity-decision";

export default async function OpportunityDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const o=opportunities.find(x=>x.id===id); if(!o) notFound();
 const recipe=getVisualRecipe(o.id);
 return <><Link className="back" href="/opportunities">← Opportunities</Link>
 <div className="detailTitle"><div><span className="eyebrow">OPPORTUNITY DETAIL</span><h1>{o.name}</h1><p>{o.season} · {o.category} · Digital product</p></div><div className="decisionScore"><Badge>{o.recommendation}</Badge><Score value={o.score}/><small>/100</small></div></div>
 <div className="grid2">
  <Card><span className="eyebrow">WHY RAYDAR LIKES IT</span><h2>Strong evidence with repeatable upside.</h2><ul className="bullets"><li>Demand is supported by multiple independent signal types.</li><li>Customization expands the addressable market where relevant.</li><li>Repeatability creates a variation, bundle, or collection path.</li></ul></Card>
  <Card><span className="eyebrow">RISK PROFILE</span><h2>{o.primaryRisk}</h2><div className="riskNumber">{o.saturationRisk}<small>/100 saturation</small></div><p className="muted">Risk is material but does not outweigh current evidence strength.</p></Card>
 </div>
 <Card><span className="eyebrow">SCORE BREAKDOWN</span><div className="meters">{[["Demand",o.demand],["Trend Momentum",o.momentum],["Repeatability",o.repeatability],["Customization",o.customization],["Product Fit",o.productFit],["Competition Gap",o.competitionGap],["Confidence",o.confidence],["Saturation Risk",o.saturationRisk]].map(([l,v])=><Meter key={l as string} label={l as string} value={v as number}/>)}</div></Card>
 {recipe&&<OpportunityDecision id={o.id} name={o.name} recipe={recipe}/>} 
 </>
}
