import { opportunities } from "@/data/demo-data";
import { Badge, Card, Meter } from "@/components/ui";

export default function DecisionBriefPage(){
 const o=opportunities[0];
 return <><div className="memoHead"><span className="eyebrow">RAYDAR DECISION BRIEF</span><h1>{o.name}</h1><div><Badge>{o.recommendation}</Badge><strong>{o.score} / 100</strong></div></div>
 <Card className="memo"><section><span className="eyebrow">EXECUTIVE READ</span><p className="lead">Demand is strong, customization increases repeatability across school markets, and current evidence suggests adequate whitespace despite increasing competition.</p></section>
 {[
 ["WHY NOW","Cross-source evidence is converging while the seasonal selling window is still early enough to build variation depth."],
 ["SUPPORTING SIGNALS","Marketplace search, social discovery, and historical performance all support personalized sports products."],
 ["RISKS","Competition is accelerating. Execution should emphasize customization and visual distinction rather than generic football language."],
 ["RECOMMENDED TEST","Launch one mascot-bow concept with five school-color examples and one neutral custom preview."],
 ["SUGGESTED VARIATIONS","Mascot name · school colors · cheer · football mom · game day"],
 ["TIMING","Build now, test immediately, and evaluate conversion before expanding the full variation set."],
 ["HUMAN NEXT STEP","Approve for build or hold for additional evidence."]
 ].map(([h,p])=><section key={h}><span className="eyebrow">{h}</span><p>{p}</p></section>)}
 <section><span className="eyebrow">CONFIDENCE</span><Meter label="Evidence confidence" value={o.confidence}/></section>
 <footer>Calculated by Raydar scoring engine · Interpretation modeled from structured evidence · Human approval required</footer>
 </Card></>
}
