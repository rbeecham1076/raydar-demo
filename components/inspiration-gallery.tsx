"use client";

import { useMemo, useState } from "react";

export type GalleryRef={id:string;file:string;label:string;tags:string[];url:string;note:string};
const tags=["all","pattern","texture","typography","color","composition","motif","seasonal","boutique-fit"];

export function InspirationGallery({refs}:{refs:GalleryRef[]}){
 const [active,setActive]=useState("all");
 const visible=useMemo(()=>active==="all"?refs:refs.filter(r=>r.tags.includes(active)),[active,refs]);
 return <>
  <div className="inspoFilters">{tags.map(tag=><button key={tag} className={active===tag?"isActive":""} onClick={()=>setActive(tag)}>{tag.replace("-"," ")}</button>)}</div>
  <div className="referenceGrid">{visible.map(ref=><article className="referenceCard" key={ref.id}>
    <a href={ref.url} target="_blank" rel="noreferrer" className="referenceImage"><img src={ref.url} alt={ref.label}/><span>OPEN REFERENCE ↗</span></a>
    <div className="referenceBody"><div className="referenceTags">{ref.tags.map(t=><span key={t}>{t}</span>)}</div><h3>{ref.label}</h3><p>{ref.note}</p></div>
  </article>)}</div>
 </>
}
