import fs from "node:fs";
import path from "node:path";
import { Card, PageHeader } from "@/components/ui";
import { InspirationGallery, type GalleryRef } from "@/components/inspiration-gallery";

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

const tagSets=[["composition","boutique-fit","color"],["pattern","typography","color"],["texture","composition","boutique-fit"],["motif","composition","seasonal"],["pattern","color","boutique-fit"],["typography","composition","texture"],["color","pattern","seasonal"],["composition","motif","boutique-fit"]];

function loadGallery():GalleryRef[]{
 const dir=path.join(process.cwd(),"Design Trends Inspo");
 if(!fs.existsSync(dir)) return [];
 return fs.readdirSync(dir).filter(file=>/\.(jpe?g|png|webp)$/i.test(file)).sort().map((file,i)=>({
   id:`folder-ref-${i+1}`,
   file,
   label:`Saved visual reference ${String(i+1).padStart(3,"0")}`,
   tags:tagSets[i%tagSets.length],
   url:`https://raw.githubusercontent.com/rbeecham1076/raydar-demo/main/Design%20Trends%20Inspo/${encodeURIComponent(file)}`,
   note:"Use for visual-direction cues only: palette, hierarchy, pattern density, typography, texture, motif scale, or merchandising energy. Do not reproduce the source design."
 }));
}

export default function InspirationPage(){
 const refs=loadGallery();
 return <div className="page inspirationPage">
  <PageHeader kicker="VISUAL INTELLIGENCE" title="Pattern + Texture Library" copy="Saved visual references, market signals, and boutique taste rules combined into a practical recommendation layer." />
  <div className="inspoHero"><div><span className="inspoStamp">CURATED, NOT COPIED</span><h2>Give every idea a <em>surface point of view.</em></h2><p>Raydar uses saved inspiration as evidence for palette, hierarchy, pattern density, typography, texture, and merchandising energy—never as artwork to reproduce.</p></div><div className="inspoStack"><span>SAVED REFERENCES</span><span>MARKET SIGNALS</span><span>COMPETITOR FORMULAS</span><span>BOUTIQUE TASTE FILTER</span><b>→ DESIGN BRIEF</b></div></div>

  <div className="libraryHead"><div><span className="eyebrow">SAVED VISUAL REFERENCES</span><h2>{refs.length} references connected</h2></div><p>The full <code>Design Trends Inspo</code> folder is read automatically at build time. Add images to that folder and the gallery expands without hand-editing this page.</p></div>
  <InspirationGallery refs={refs}/>

  <div className="libraryHead"><div><span className="eyebrow">MARKET-LED SURFACE CATALOG</span><h2>{catalog.length} directions to test</h2></div><p>Generalized pattern and texture formulas keep the public demo useful without exposing proprietary research.</p></div>
  <div className="inspoGrid">{catalog.map((x,i)=><Card key={x.name} className="inspoCard"><div className={`swatch ${x.cls}`}><span>{String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.type}</span><b>{x.signal}</b></div><h3>{x.name}</h3><p className="bestUse"><strong>Best use:</strong> {x.use}</p><p>{x.note}</p></Card>)}</div>
  <div className="libraryHead rulesHead"><div><span className="eyebrow">RECOMMENDATION LOGIC</span><h2>How Raydar uses it</h2></div></div>
  <div className="ruleGrid">{rules.map(([t,d],i)=><div className="rule" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
  <Card className="sourceNote"><span className="eyebrow">SYSTEM PRINCIPLE</span><h3>Reference the signal. Rebuild the idea.</h3><p>The visual library exists to make recommendations more specific: palette, pattern family, type personality, texture, composition density, and merchandising direction. Source images are never treated as templates to replicate.</p></Card>
 </div>
}
