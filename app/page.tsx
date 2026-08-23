import Link from "next/link";
import { opportunities, performance, pipeline, signals } from "@/data/demo-data";
import type { PerformanceRecord } from "@/lib/types";
import { buildWeeklyCommandCenter } from "@/lib/command-center";
import { Card, Badge, Score } from "@/components/ui";
import { MarketSignalLab } from "@/components/market-signal-lab";

export default function Overview() {
  const top = opportunities[0];
  const command=buildWeeklyCommandCenter(opportunities,performance as PerformanceRecord[]);
  const queues=[["BUILD THESE",command.build],["WATCH THESE",command.watch],["REFRESH / REWORK",command.refresh],["SCALE THESE",command.scale],["RETIRE / HOLD",command.retire],["SKIP THIS WEEK",command.skip]] as const;
  return <div>
    <div className="topbar"><span className="eyebrow">RAYDAR / OVERVIEW</span><span className="statusDot">System current</span></div>
    <section className="hero">
      <div><span className="eyebrow">COMMERCE INTELLIGENCE</span><h1>Turn market noise into<br/><em>product decisions.</em></h1><p>Structured evidence, deterministic scoring, and human-controlled product decisions.</p></div>
      <div className="principle"><span>CORE PRINCIPLE</span><strong>Code calculates.<br/>AI interprets.<br/>Humans decide.</strong></div>
    </section>

    <div className="kpis">
      {[[42,"Active Signals","+8 this week"],[12,"Qualified Opportunities","7 high confidence"],[87,"Average Confidence","evidence weighted"],[4,"Launch Ready","owner approved"]].map(([v,l,s])=><Card key={l as string}><Score value={v as number}/><h3>{l}</h3><p>{s}</p></Card>)}
    </div>

    <Card className="commandCenter">
      <div className="cardHead"><div><span className="eyebrow">WEEKLY COMMAND CENTER</span><h2>What moves the whole shop forward.</h2></div><span className="statusDot">Shop-growth optimized</span></div>
      <div className="commandGrid">{queues.map(([label,items])=><div className="commandColumn" key={label}><h3>{label}</h3>{items.length?items.slice(0,3).map(item=><div className="commandItem" key={item.name}><strong>{item.name}</strong>{item.score&&<b>{item.score}</b>}<p>{item.reason}</p></div>):<p className="muted">Nothing currently qualifies.</p>}</div>)}</div>
    </Card>

    <MarketSignalLab />

    <div className="grid2">
      <Card className="topOpportunity">
        <div className="cardHead"><div><span className="eyebrow">TOP OPPORTUNITY</span><h2>{top.name}</h2></div><Badge>{top.recommendation}</Badge></div>
        <div className="bigScore">{top.score}<small>/100</small></div>
        <div className="miniGrid">
          {[["Demand",top.demand],["Momentum",top.momentum],["Repeatability",top.repeatability],["Customization",top.customization]].map(([l,v])=><div key={l as string}><span>{l}</span><b>{v}</b></div>)}
        </div>
        <Link className="cta" href={`/opportunities/${top.id}`}>Explore Example →</Link>
      </Card>

      <Card>
        <div className="cardHead"><div><span className="eyebrow">MARKET PULSE</span><h2>Evidence is strengthening</h2></div></div>
        <div className="pulse"><div><b>24</b><span>Gaining</span></div><div><b>13</b><span>Stable</span></div><div><b>5</b><span>Declining</span></div></div>
        <p className="muted">Personalization and sports signals are carrying the strongest cross-source evidence in this demo period.</p>
      </Card>
    </div>

    <div className="grid2">
      <Card>
        <div className="cardHead"><div><span className="eyebrow">OPPORTUNITY RANKING</span><h2>Highest priority</h2></div><Link href="/opportunities">View all</Link></div>
        <div className="list">{opportunities.slice(0,5).map((o,i)=><div className="listRow" key={o.id}><span className="rank">0{i+1}</span><div><b>{o.name}</b><span>{o.category} · {o.season}</span></div><Badge>{o.recommendation}</Badge><Score value={o.score}/></div>)}</div>
      </Card>
      <Card>
        <div className="cardHead"><div><span className="eyebrow">RECENT SIGNALS</span><h2>Latest evidence</h2></div><Link href="/signals">Inspect</Link></div>
        <div className="list">{signals.slice(0,5).map(s=><div className="listRow compact" key={s.id}><div><b>{s.signal}</b><span>{s.sourceType}</span></div><span className="move">{s.movement}</span></div>)}</div>
      </Card>
    </div>

    <Card>
      <div className="cardHead"><div><span className="eyebrow">PIPELINE SNAPSHOT</span><h2>Decision → launch</h2></div><Link href="/pipeline">Open workflow</Link></div>
      <div className="stageRow">{["RESEARCH","WATCHING","APPROVED","BUILDING","READY","LISTED","TESTING","WINNER"].map(stage=><div key={stage}><b>{pipeline.filter(p=>p[2]===stage).length}</b><span>{stage}</span></div>)}</div>
    </Card>
    <p className="disclosure">Demonstration data has been anonymized and sanitized. The demo reflects workflows and system architecture developed for a real commerce operation.</p>
  </div>
}
