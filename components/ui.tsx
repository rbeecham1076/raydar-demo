import type { ReactNode } from "react";

export function PageHeader({kicker,title,copy}:{kicker:string,title:string,copy:string}) {
  return <header className="pageHeader"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{copy}</p></header>
}
export function Card({children,className=""}:{children:ReactNode,className?:string}) {
  return <section className={`card ${className}`}>{children}</section>
}
export function Badge({children}:{children:ReactNode}) { return <span className="badge">{children}</span> }
export function Score({value}:{value:number}) { return <span className="score">{value}</span> }
export function Meter({label,value}:{label:string,value:number}) {
  return <div className="meter"><div><span>{label}</span><b>{value}</b></div><div className="track"><i style={{width:`${value}%`}}/></div></div>
}
