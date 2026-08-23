import { signals } from "@/data/demo-data";
import { Card, PageHeader, Badge } from "@/components/ui";

export default function SignalsPage(){
 return <><PageHeader kicker="RAYDAR / SIGNALS" title="Market evidence, structured." copy="Inspect the signals feeding product decisions and understand why each one matters."/>
 <Card><div className="tableWrap"><table><thead><tr><th>Signal</th><th>Category</th><th>Source</th><th>Momentum</th><th>Lifecycle</th><th>Confidence</th><th>Movement</th></tr></thead>
 <tbody>{signals.map(s=><tr key={s.id}><td><b>{s.signal}</b><small>{s.relatedOpportunity}</small></td><td>{s.category}</td><td>{s.sourceType}</td><td><Badge>{s.momentum}</Badge></td><td>{s.lifecycle}</td><td className="mono">{s.confidence}</td><td className="move">{s.movement}</td></tr>)}</tbody></table></div></Card></>
}
