import Link from "next/link";
import { notFound } from "next/navigation";
import { opportunities } from "@/data/demo-data";
import { getVisualRecipe } from "@/data/visual-recipes";
import { Badge, Card, Meter, Score } from "@/components/ui";

export default async function OpportunityDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const o=opportunities.find(x=>x.id===id); if(!o) notFound();
 const recipe=getVisualRecipe(o.id);
 return <><Link className="back" href="/opportunities">← Opportunities</Link>
 <div className="detailTitle"><div><span className="eyebrow">OPPORTUNITY DETAIL</span><h1>{o.name}</h1><p>{o.season} · {o.category} · Digital product</p></div><div className="decisionScore"><Badge>{o.recommendation}</Badge><Score value={o.score}/><small>/100</small></div></div>
 <div className="grid2">
  <Card><span className="eyebrow">WHY RAYDAR LIKES IT</span><h2>Strong evidence with repeatable upside.</h2><ul className="bullets"><li>Demand is supported by multiple independent signal types.</li><li>Customization expands the addressable market where relevant.</li><li>Repeatability creates a variation, bundle, or collection path.</li></ul></Card>
  <Card><span className="eyebrow">RISK PROFILE</span><h2>{o.primaryRisk}</h2><div className="riskNumber">{o.saturationRisk}<small>/100 saturation</small></div><p className="muted">Risk is material but does not outweigh current evidence strength.</p></Card>
 </div>
 {recipe&&<Card><span className="eyebrow">VISUAL RECIPE</span><h2>{recipe.paletteName}</h2><p className="muted">A distinct art direction for this opportunity—not a reusable one-size-fits-all palette.</p><div className="paletteStrip">{recipe.colors.map(c=><div className="paletteColor" key={c.name}><i style={{background:c.hex}}/><span>{c.name}</span><b>{c.hex}</b></div>)}</div><div className="visualDirection"><div><span>PRIMARY SURFACE</span><strong>{recipe.surfaceType}</strong><p>{recipe.surface}</p></div><div><span>TYPOGRAPHY</span><strong>Type direction</strong><p>{recipe.typography}</p></div><div><span>COMPOSITION</span><strong>Layout direction</strong><p>{recipe.composition}</p></div><div><span>WHY THIS FITS</span><strong>Recommendation logic</strong><p>{recipe.rationale}</p></div><div className="avoidCell"><span>AVOID</span><strong>Keep it differentiated</strong><p>{recipe.avoid}</p></div></div></Card>}
 <Card><span className="eyebrow">SCORE BREAKDOWN</span><div className="meters">{[["Demand",o.demand],["Trend Momentum",o.momentum],["Repeatability",o.repeatability],["Customization",o.customization],["Product Fit",o.productFit],["Competition Gap",o.competitionGap],["Confidence",o.confidence],["Saturation Risk",o.saturationRisk]].map(([l,v])=><Meter key={l as string} label={l as string} value={v as number}/>)}</div></Card>
 <Card><span className="eyebrow">HUMAN DECISION</span><div className="actions"><button>Approve for Build</button><button className="secondary">Watch</button><button className="secondary">Hold</button></div><p className="muted">Demo actions are presentation-only. Production owner decisions persist in the private operating system.</p></Card>
 </>
}
