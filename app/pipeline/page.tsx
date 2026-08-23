import { pipeline } from "@/data/demo-data";
import { Badge, PageHeader } from "@/components/ui";

const stages=["RESEARCH","WATCHING","APPROVED","BUILDING","READY","LISTED","TESTING","WINNER"];
export default function PipelinePage(){
 return <><PageHeader kicker="RAYDAR / PIPELINE" title="From evidence to launch." copy="A compact product workflow keeps every opportunity tied to a next action."/>
 <div className="kanban">{stages.map(stage=><section className="lane" key={stage}><header><span>{stage}</span><b>{pipeline.filter(p=>p[2]===stage).length}</b></header>{pipeline.filter(p=>p[2]===stage).map(p=><article key={p[0]}><Badge>{p[1]}</Badge><h3>{p[0]}</h3><p>{p[3]}d in stage</p><small>{p[4]}</small></article>)}</section>)}</div></>
}
