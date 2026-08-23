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
 {title:"Varsity Patchwork",label:"Visual example",cls:"patch",tags:["collegiate","pattern","visible craft"],copy:"A surface direction built from current collegiate and handcrafted signals."},
 {title:"Boutique Stripe",label:"Visual example",cls:"stripe",tags:["stripe","sports","merchandising"],copy:"A polished stripe treatment for scale, rhythm, and color blocking."},
 {title:"Vintage Floral Fill",label:"Visual example",cls:"floral",tags:["floral","feminine","letter fill"],copy:"A supporting floral direction designed for letter fills and framing details."},
 {title:"Washed Heritage Ink",label:"Visual example",cls:"ink",tags:["texture","americana","vintage"],copy:"A subtle worn-print texture for nostalgic, heritage-inspired graphics."},
 {title:"Quilted School Spirit",label:"Visual example",cls:"quilt",tags:["pieced","school spirit","tactile"],copy:"A tactile pieced direction for numbers, mascots, and oversized initials."},
 {title:"Patina Coastal",label:"Visual example",cls:"patina",tags:["palette","coastal","heritage"],copy:"A coastal heritage palette with oxidized blue-green and softened neutrals."},
];

const rules=[
 ["Cross-source repetition","Prefer directions that repeat independently across marketplace, social, boutique, and competitor signals."],
 ["Taste filter","A popular surface still has to improve the specific design idea. Avoid stacking trends without a strong concept."],
 ["Originality boundary","Extract palette, hierarchy, pattern family, texture, and merchandising cues without reproducing another composition."],
 ["Production fit","Recommend a surface only when it supports the actual product, buyer, season, and intended use."],
];

export default function InspirationPage(){return <div className="page inspirationPage">
 <PageHeader kicker="VISUAL INTELLIGENCE" title="Pattern + Texture Library" copy="A visual recommendation layer that turns market signals into specific color, pattern, texture, and composition direction." />
 <div className="inspoHero"><div><span className="inspoStamp">SIGNAL → VISUAL DIRECTION</span><h2>Inspiration becomes <em>clear design direction.</em></h2><p>Raydar translates visual and market signals into practical recommendations for palette, hierarchy, pattern density, typography, texture, motif scale, and merchandising energy.</p></div><div className="inspoStack"><span>VISUAL SIGNALS</span><span>MARKET SIGNALS</span><span>COMPETITOR FORMULAS</span><span>BOUTIQUE TASTE FILTER</span><b>→ DESIGN BRIEF</b></div></div>

 <div className="libraryHead"><div><span className="eyebrow">VISUAL REFERENCES</span><h2>Examples of Raydar’s direction</h2></div><p>These examples show the kinds of visual treatments Raydar can pair with a design opportunity.</p></div>
 <div className="demoReferenceGrid">{demoExamples.map((x,i)=><Card className="demoReferenceCard" key={x.title}><div className={`demoReferenceArt ${x.cls}`}><span>REF {String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.label}</span><b>RECOMMENDED USE</b></div><h3>{x.title}</h3><div className="referenceTags">{x.tags.map(t=><span key={t}>{t}</span>)}</div><p>{x.copy}</p></Card>)}</div>

 <div className="libraryHead"><div><span className="eyebrow">SURFACE CATALOG</span><h2>{catalog.length} directions Raydar can recommend</h2></div><p>Each opportunity can receive a different visual recipe based on category, season, buyer fit, current signals, and saturation risk.</p></div>
 <div className="inspoGrid">{catalog.map((x,i)=><Card key={x.name} className="inspoCard"><div className={`swatch ${x.cls}`}><span>{String(i+1).padStart(2,"0")}</span></div><div className="inspoMeta"><span>{x.type}</span><b>{x.signal}</b></div><h3>{x.name}</h3><p className="bestUse"><strong>Best use:</strong> {x.use}</p><p>{x.note}</p></Card>)}</div>
 <div className="libraryHead rulesHead"><div><span className="eyebrow">RECOMMENDATION LOGIC</span><h2>How Raydar chooses a direction</h2></div></div>
 <div className="ruleGrid">{rules.map(([t,d],i)=><div className="rule" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
 <Card className="sourceNote"><span className="eyebrow">SYSTEM PRINCIPLE</span><h3>Use the signal. Create something distinct.</h3><p>Raydar’s job is to make every design brief more specific and commercially useful while preserving enough creative freedom for an original final design.</p></Card>
 </div>}
