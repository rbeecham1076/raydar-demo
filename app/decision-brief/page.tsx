import { opportunities } from "@/data/demo-data";
import { Badge, Card, Meter } from "@/components/ui";
import { directionForCategory, inspirationUrl, refsForTags } from "@/data/inspiration-library";

export default function DecisionBriefPage(){
 const o=opportunities[0];
 const direction=directionForCategory(o.category);
 const refs=refsForTags(direction.referenceTags,4);
 return <><div className="memoHead"><span className="eyebrow">RAYDAR DECISION BRIEF</span><h1>{o.name}</h1><div><Badge>{o.recommendation}</Badge><strong>{o.score} / 100</strong></div></div>
 <Card className="memo"><section><span className="eyebrow">EXECUTIVE READ</span><p className="lead">Demand is strong, customization increases repeatability across school markets, and current evidence suggests adequate whitespace despite increasing competition.</p></section>
 {[
 ["WHY NOW","Cross-source evidence is converging while the seasonal selling window is still early enough to build variation depth."],
 ["SUPPORTING SIGNALS","Marketplace search, social discovery, historical performance, and saved visual references all support a differentiated personalized sports direction."],
 ["RISKS","Competition is accelerating. Execution should emphasize customization and visual distinction rather than generic football language."],
 ["RECOMMENDED TEST","Launch one mascot-led concept with five school-color examples and one neutral custom preview."],
 ["SUGGESTED VARIATIONS","Mascot name · school colors · cheer · football mom · game day"],
 ["TIMING","Build now, test immediately, and evaluate conversion before expanding the full variation set."],
 ].map(([h,p])=><section key={h}><span className="eyebrow">{h}</span><p>{p}</p></section>)}
 <section><span className="eyebrow">VISUAL DIRECTION</span><div className="visualDirection"><div><span>PATTERN</span>{direction.pattern}</div><div><span>TEXTURE</span>{direction.texture}</div><div><span>PALETTE</span>{direction.palette}</div><div><span>COMPOSITION</span>{direction.composition}</div><div><span>AVOID</span>{direction.avoid}</div></div></section>
 <section><span className="eyebrow">MATCHED INSPIRATION REFERENCES</span><p>Use these for direction cues only—palette, hierarchy, pattern density, material feel, and merchandising energy.</p><div className="briefRefs">{refs.map(ref=><a key={ref.id} href={inspirationUrl(ref)} target="_blank" rel="noreferrer"><img src={inspirationUrl(ref)} alt={ref.label}/></a>)}</div></section>
 <section><span className="eyebrow">CONFIDENCE</span><Meter label="Evidence confidence" value={o.confidence}/></section>
 <section><span className="eyebrow">HUMAN NEXT STEP</span><p>Approve the direction for build, revise the visual recipe, or hold for additional evidence. Raydar recommends; the owner decides.</p></section>
 <footer>Calculated by Raydar scoring engine · Visual recommendations matched from structured inspiration tags · Human approval required</footer>
 </Card></>
}
