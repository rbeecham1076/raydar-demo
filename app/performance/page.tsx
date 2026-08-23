"use client";
import { performance } from "@/data/demo-data";
import { Card, PageHeader, Score } from "@/components/ui";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter, ZAxis } from "recharts";

const trend=[{m:"W1",revenue:720},{m:"W2",revenue:980},{m:"W3",revenue:1240},{m:"W4",revenue:1410},{m:"W5",revenue:1760},{m:"W6",revenue:2050}];

export default function PerformancePage(){
 const revenue=performance.reduce((s,p)=>s+p.revenue,0), orders=performance.reduce((s,p)=>s+p.orders,0);
 return <><PageHeader kicker="RAYDAR / PERFORMANCE" title="Did the decision work?" copy="Performance closes the loop so future product decisions can become better informed."/>
 <div className="kpis">{[[`$${revenue.toLocaleString()}`,"Revenue"],[orders,"Orders"],["3.0%","Conversion Rate"],["$1,240","Ad Spend"],["3.3x","ROAS"]].map(([v,l])=><Card key={l as string}><div className="metric">{v}</div><h3>{l}</h3></Card>)}</div>
 <div className="grid2">
  <Card><span className="eyebrow">REVENUE TREND</span><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="#2a3044" vertical={false}/><XAxis dataKey="m" stroke="#757d94"/><YAxis stroke="#757d94"/><Tooltip/><Line type="monotone" dataKey="revenue" stroke="#D8F36A" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></div></Card>
  <Card><span className="eyebrow">SCORE VS ACTUAL</span><div className="chart"><ResponsiveContainer width="100%" height="100%"><ScatterChart><CartesianGrid stroke="#2a3044"/><XAxis type="number" dataKey="score" domain={[65,100]} stroke="#757d94"/><YAxis type="number" dataKey="conversion" stroke="#757d94"/><ZAxis range={[70,70]}/><Tooltip/><Scatter data={performance} fill="#7C9CFF"/></ScatterChart></ResponsiveContainer></div></Card>
 </div>
 <Card><div className="tableWrap"><table><thead><tr><th>Product</th><th>Original score</th><th>Actual result</th><th>Revenue</th><th>Orders</th><th>Conversion</th><th>ROAS</th></tr></thead><tbody>{performance.map(p=><tr key={p.product}><td><b>{p.product}</b></td><td><Score value={p.score}/></td><td>{p.result}</td><td>${p.revenue}</td><td>{p.orders}</td><td>{p.conversion}%</td><td>{p.roas}x</td></tr>)}</tbody></table></div></Card>
 <Card><span className="eyebrow">WHAT RAYDAR LEARNED</span><p className="lead">Customization correlated with stronger conversion than broad seasonal demand during this demo period.</p><div className="feedback">Opportunity <span>→</span> Decision <span>→</span> Launch <span>→</span> Performance <span>→</span> Learning <span>→</span> Future Scoring</div></Card>
 </>
}
