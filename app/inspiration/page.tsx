import { Card, PageHeader } from "@/components/ui";

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

const demoExamples=[
 {title:"Varsity Patchwork",label:"Generated example",cls:"patch",tags:["collegiate","pattern","visible craft"],copy:"Example of how Raydar can translate a market signal into a surface direction without exposing the private reference library."},
 {title:"Boutique Stripe",label:"Generated example",cls:"stripe",tags:["stripe","sports","merchandising"],copy:"A generalized visual cue for scale, rhythm, and color blocking—not a source design."},
 {title:"Vintage Floral Fill",label:"Generated example",cls:"floral",tags:["floral","feminine","letter fill"],copy:"Shows the type of pattern recommendation a private visual reference could inform."},
 {title:"Washed Heritage Ink",label:"Generated example",cls:"ink",tags:["texture","americana","vintage"],copy:"Demonstrates a texture direction that can be attached to a product brief."},
 {title:"Quilted School Spirit",label:"Generated example",cls:"quilt",tags:["pieced","school spirit","tactile"],copy:"A safe public example of Raydar combining craft texture with a commercial product use."},
 {title:"Patina Coastal",label:"Generated example",cls:"patina",tags:["palette","coastal","heritage"],copy:"Illustrates palette-and-surface guidance while proprietary inspiration remains private."},
];

const rules=[
 ["Private reference layer","The operating version can ingest Rachel’s saved inspiration images and tag them for palette, pattern, typography, texture, composition, motif, season, and buyer fit."],
 ["Cross-source repetition","Prefer directions that repeat independently across market, social, boutique, and competitor evidence."],
 ["Originality boundary","Extract visual direction, product structure, buyer behavior, and merchandising patterns—never copy a source composition."],
 ["Public-demo boundary","The portfolio demo shows generated/generalized examples only. Private inspiration images and proprietary research stay out of the public interface."],
];

export default function InspirationPage(){return <div className="page inspirationPage">
 <PageHeader kicker="VISUAL INTELLIGENCE" title="Pattern + Texture Library" copy="A public demonstration of how Raydar turns private visual research into specific, usable design direction." />
 <div className="inspoHero"><div><span className="inspoStamp">PRIVATE INPUT → SAFE OUTPUT</span><h2>Inspiration becomes <em>direction, not duplication.</em></h2><p>In the operating version, saved inspiration is a private research layer. Raydar extracts useful signals—palette, hierarchy, pattern density, typography, texture, motif scale, and merchandising energy—then produces original recommendations.</p></div><div className="inspoStack"><span>PRIVATE INSPO LIBRARY</span><span>MARKET SIGNALS</span><span>COMPETITOR RESEARCH</span><span>BOUTIQUE TASTE FILTER</span><b>→ ORIGINAL BRIEF</b></div></div>

 <div className="privateBoundary"><div><span className="eyebrow">PUBLIC DEMO BOUNDARY</span><h2>Your private gallery is not displayed here.</h2></div><p>The real <strong>Design Trends Inspo</strong> collection belongs to the private operating side of Raydar. This portfolio demo uses generalized/generated visual examples to demonstrate the feature without publishing source inspiration or proprietary research.</p></div>

 <div className="libraryHead"><div><span className="eyebrow">DEMO VISUAL REFERENCES</span><h2>Generated examples of the workflow</h2></div><p>These are illustrative surfaces created inside the demo. They show what Raydar can recommend after analyzing private visual references.</p></div>
 <div className="demoReferenceGrid">{demoExamples.map((x,i)=><Card className="demoReferenceCard" key={x.title}><div className={`demoReferenceArt ${x.cls}`}><span>DEMO {String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.label}</span><b>SAFE TO SHOW</b></div><h3>{x.title}</h3><div className="referenceTags">{x.tags.map(t=><span key={t}>{t}</span>)}</div><p>{x.copy}</p></Card>)}</div>

 <div className="libraryHead"><div><span className="eyebrow">MARKET-LED SURFACE CATALOG</span><h2>{catalog.length} directions Raydar can recommend</h2></div><p>The catalog combines generalized market evidence with the private taste layer while keeping proprietary source material out of the demo.</p></div>
 <div className="inspoGrid">{catalog.map((x,i)=><Card key={x.name} className="inspoCard"><div className={`swatch ${x.cls}`}><span>{String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.type}</span><b>{x.signal}</b></div><h3>{x.name}</h3><p className="bestUse"><strong>Best use:</strong> {x.use}</p><p>{x.note}</p></Card>)}</div>
 <div className="libraryHead rulesHead"><div><span className="eyebrow">SYSTEM ARCHITECTURE</span><h2>How the private layer works</h2></div></div>
 <div className="ruleGrid">{rules.map(([t,d],i)=><div className="rule" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
 <Card className="sourceNote"><span className="eyebrow">SYSTEM PRINCIPLE</span><h3>Reference the signal. Rebuild the idea.</h3><p>The private visual library makes recommendations more specific. The public demo proves the workflow without exposing the actual inspiration archive, competitor screenshots, or proprietary intelligence behind it.</p></Card>
 </div>}
