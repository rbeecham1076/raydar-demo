"use client";

import { useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import { inspirationRefs, inspirationTags, inspirationUrl } from "@/data/inspiration-library";

const catalog = [
  {name:"Irregular Checker",type:"Pattern",signal:"HIGH",use:"School identity fills, side panels, numbers",note:"Hand-drawn or imperfect only; avoid generic checker stacks.",cls:"checker"},
  {name:"Patchwork Collegiate",type:"Pattern",signal:"MAKE NOW",use:"Varsity letters, mascot names, class-year graphics",note:"Mix 2–3 restrained fills: stripe, floral, micro-check. Keep composition premium.",cls:"patch"},
  {name:"Rugby + Cabana Stripe",type:"Pattern",signal:"RISING",use:"Sports back prints, ribbons, borders, oversized type",note:"Vary stripe width and spacing so it reads boutique rather than template-made.",cls:"stripe"},
  {name:"Wallpaper Floral",type:"Pattern",signal:"RISING",use:"Letter fills, frames, feminine sports accents",note:"Use small-scale vintage florals as a supporting surface—not the entire concept.",cls:"floral"},
  {name:"Polka Dot Pop",type:"Pattern",signal:"RISING",use:"Cheer, game day, lifestyle, accessories",note:"Best as one playful layer paired with cleaner typography.",cls:"dots"},
  {name:"Sunburst + Wavy Retro",type:"Pattern",signal:"BRAND FIT",use:"Lifestyle, summer, spirit, editorial backgrounds",note:"Keep shapes bold and simplified.",cls:"waves"},
  {name:"Washed Linen",type:"Texture",signal:"2026",use:"Background grain, vintage apparel feel, mockup direction",note:"Soft tonal variation adds human texture without unnecessary distress.",cls:"linen"},
  {name:"Visible Stitch",type:"Texture",signal:"RISING",use:"Appliqué type, patch graphics, faux embroidery accents",note:"Use stitch lines to communicate construction and craft.",cls:"stitch"},
  {name:"Sun-Worn Ink",type:"Texture",signal:"STRONG FIT",use:"Americana, sports, lake/coastal, nostalgic lifestyle",note:"Uneven ink + subtle fade. Keep legibility crisp.",cls:"ink"},
  {name:"Quilted / Pieced",type:"Texture",signal:"RISING",use:"Numbers, mascots, oversized initials",note:"Tactile and handmade without becoming craft-fair.",cls:"quilt"},
  {name:"Ribbon + Woven Detail",type:"Texture",signal:"WATCH",use:"Banners, mascot framing, feminine sport details",note:"Treat ribbon as material and structure—not an automatic bow.",cls:"ribbon"},
  {name:"Patina Blue Surface",type:"Color + Texture",signal:"2026",use:"Vintage athletic palettes, coastal, heritage graphics",note:"Pair oxidized blue-green with cream, tomato red, faded navy, or warm brown.",cls:"patina"},
];

const rules=[
  ["Cross-source repetition","Prefer surfaces appearing independently in marketplace, social, and boutique/wholesale signals."],
  ["Taste filter","A popular pattern still has to improve the composition. No trend stacking just because each ingredient is popular."],
  ["Originality boundary","Extract visual direction, product structure, buyer behavior, and merchandising patterns—never copy a source composition."],
  ["Production fit","Recommend a surface only when it supports the actual product: letter fill, background, border, illustration texture, or mockup direction."],
];

export default function InspirationPage(){
 const [active,setActive]=useState("all");
 const refs=useMemo(()=>active==="all"?inspirationRefs:inspirationRefs.filter(r=>r.tags.includes(active)),[active]);
 return <div className="page inspirationPage">
  <PageHeader kicker="VISUAL INTELLIGENCE" title="Pattern + Texture Library" copy="Saved visual references, market signals, and boutique taste rules combined into a practical recommendation layer." />
  <div className="inspoHero"><div><span className="inspoStamp">CURATED, NOT COPIED</span><h2>Give every idea a <em>surface point of view.</em></h2><p>Raydar uses saved inspiration as evidence for palette, hierarchy, pattern density, typography, texture, and merchandising energy—never as artwork to reproduce.</p></div><div className="inspoStack"><span>SAVED REFERENCES</span><span>MARKET SIGNALS</span><span>COMPETITOR FORMULAS</span><span>BOUTIQUE TASTE FILTER</span><b>→ DESIGN BRIEF</b></div></div>

  <div className="libraryHead"><div><span className="eyebrow">SAVED VISUAL REFERENCES</span><h2>{inspirationRefs.length} references connected</h2></div><p>These images now live inside the working visual-intelligence layer. Filter by the kind of direction you need, then Raydar can surface matching references in a decision brief.</p></div>
  <div className="inspoFilters">{inspirationTags.map(tag=><button key={tag} className={active===tag?"isActive":""} onClick={()=>setActive(tag)}>{tag.replace("-"," ")}</button>)}</div>
  <div className="referenceGrid">{refs.map(ref=><article className="referenceCard" key={ref.id}>
    <a href={inspirationUrl(ref)} target="_blank" rel="noreferrer" className="referenceImage"><img src={inspirationUrl(ref)} alt={ref.label}/><span>OPEN REFERENCE ↗</span></a>
    <div className="referenceBody"><div className="referenceTags">{ref.tags.filter(t=>t!=="saved-reference").map(t=><span key={t}>{t}</span>)}</div><h3>{ref.label}</h3><p>{ref.note}</p></div>
  </article>)}</div>

  <div className="libraryHead"><div><span className="eyebrow">MARKET-LED SURFACE CATALOG</span><h2>{catalog.length} directions to test</h2></div><p>Generalized pattern and texture formulas keep the public demo useful without exposing proprietary research.</p></div>
  <div className="inspoGrid">{catalog.map((x,i)=><Card key={x.name} className="inspoCard"><div className={`swatch ${x.cls}`}><span>{String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.type}</span><b>{x.signal}</b></div><h3>{x.name}</h3><p className="bestUse"><strong>Best use:</strong> {x.use}</p><p>{x.note}</p></Card>)}</div>
  <div className="libraryHead rulesHead"><div><span className="eyebrow">RECOMMENDATION LOGIC</span><h2>How Raydar uses it</h2></div></div>
  <div className="ruleGrid">{rules.map(([t,d],i)=><div className="rule" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
  <Card className="sourceNote"><span className="eyebrow">SYSTEM PRINCIPLE</span><h3>Reference the signal. Rebuild the idea.</h3><p>The visual library exists to make recommendations more specific: palette, pattern family, type personality, texture, composition density, and merchandising direction. Source images are never treated as templates to replicate.</p></Card>
 </div>
}
