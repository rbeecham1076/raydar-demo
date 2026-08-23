import Link from "next/link";
import { opportunities } from "@/data/demo-data";
import { Card, PageHeader, Badge, Score } from "@/components/ui";

export default function OpportunitiesPage(){
 return <><PageHeader kicker="RAYDAR / OPPORTUNITIES" title="What should we build next?" copy="Ranked opportunities convert fragmented evidence into clear, explainable product priorities."/>
 <Card><div className="tableWrap"><table><thead><tr><th>Opportunity</th><th>Category</th><th>Season</th><th>Recommendation</th><th>Confidence</th><th>Primary risk</th><th>Score</th></tr></thead>
 <tbody>{opportunities.sort((a,b)=>b.score-a.score).map(o=><tr key={o.id}><td><Link className="textLink" href={`/opportunities/${o.id}`}><b>{o.name}</b></Link></td><td>{o.category}</td><td>{o.season}</td><td><Badge>{o.recommendation}</Badge></td><td className="mono">{o.confidence}</td><td>{o.primaryRisk}</td><td><Score value={o.score}/></td></tr>)}</tbody></table></div></Card></>
}
