"use client";

import { useMemo, useState } from "react";
import type { DesignDirection, OpportunityIntelligence } from "@/lib/types";
import { getGraphicElements } from "@/data/graphic-elements";

type Status="idle"|"approved"|"watch"|"hold";

export function OpportunityDecision({id,name,intelligence}:{id:string;name:string;intelligence:OpportunityIntelligence}){
 const [status,setStatus]=useState<Status>("idle");
 const [selectedId,setSelectedId]=useState(intelligence.directions[0].id);
 const [copied,setCopied]=useState(false);
 const selected=intelligence.directions.find(d=>d.id===selectedId) || intelligence.directions[0];
 const recipe=selected.recipe;
 const graphicElements=getGraphicElements(id);
 const prompt=useMemo(()=>{
  const palette=recipe.colors.map(c=>`${c.name} ${c.hex}`).join(", ");
  return `Create one original digitally hand-drawn PNG design for: ${name}.\n\nSELECTED DIRECTION: ${selected.label} — ${selected.description}\nCOLOR PALETTE: ${recipe.paletteName} — ${palette}.\nPATTERN / TEXTURE: ${recipe.surfaceType} — ${recipe.surface}.\nGRAPHIC ELEMENTS: ${graphicElements}.\nDIGITALLY HAND-DRAWN ILLUSTRATION STYLE: ${recipe.illustration}. Keep linework intentional, art-directed, human, and boutique-quality rather than generic vector clip-art or glossy AI rendering.\nTYPOGRAPHY: ${recipe.typography}.\nCOMPOSITION: ${recipe.composition}.\nWHY THIS DIRECTION FITS: ${recipe.rationale}.\nAVOID: ${recipe.avoid}.\n\nOUTPUT REQUIREMENTS: Create one isolated finished design only, no mockup, no shirt, no model, no scene, no colored backdrop. Transparent background. High-resolution 4500 x 5400 pixels, 300 DPI, print-ready transparent PNG suitable for professional apparel and digital-download production. Preserve crisp edges and readable typography at production size. Do not add elements outside this brief unless they materially improve balance and remain consistent with the direction above.`;
 },[graphicElements,name,recipe,selected]);

 async function copyPrompt(){try{await navigator.clipboard.writeText(prompt);setCopied(true);window.setTimeout(()=>setCopied(false),1600);}catch{setCopied(false)}}

 return <section className="decisionPanel">
  <div className="decisionPanel__head"><div><span className="eyebrow">HUMAN DECISION</span><h2>Choose a direction, then approve it.</h2></div><span className={`decisionState decisionState--${status}`}>{status==="idle"?"Awaiting decision":status==="approved"?"Approved for build":status==="watch"?"Watching signal":"On hold"}</span></div>
  <div className="directionGrid">{intelligence.directions.map((d:DesignDirection)=><button type="button" key={d.id} className={`directionCard ${selectedId===d.id?"is-selected":""}`} onClick={()=>{setSelectedId(d.id);setStatus("idle")}} aria-pressed={selectedId===d.id}><span>{d.kind}</span><strong>{d.label}</strong><p>{d.description}</p><div className="miniPalette">{d.recipe.colors.map(c=><i key={c.hex} style={{background:c.hex}} title={`${c.name} ${c.hex}`}/>)}</div><small>{d.recipe.paletteName} · {d.recipe.surface}</small></button>)}</div>
  <div className="selectedDirection"><span className="eyebrow">SELECTED DIRECTION</span><h3>{selected.label}: {recipe.paletteName}</h3><div className="visualDirection"><div><span>PATTERN / TEXTURE</span><strong>{recipe.surfaceType}</strong><p>{recipe.surface}</p></div><div><span>DIGITALLY HAND-DRAWN STYLE</span><strong>Illustration direction</strong><p>{recipe.illustration}</p></div><div><span>TYPOGRAPHY</span><strong>Type direction</strong><p>{recipe.typography}</p></div><div><span>COMPOSITION</span><strong>Layout direction</strong><p>{recipe.composition}</p></div></div></div>
  <div className="actions"><button type="button" onClick={()=>setStatus("approved")} aria-pressed={status==="approved"}>Approve {selected.label}</button><button type="button" className="secondary" onClick={()=>setStatus("watch")} aria-pressed={status==="watch"}>Watch</button><button type="button" className="secondary" onClick={()=>setStatus("hold")} aria-pressed={status==="hold"}>Hold</button></div>
  {status==="watch"&&<p className="decisionMessage">Added to watch mode in this demo. The three visual routes stay ready while Raydar waits for stronger evidence.</p>}
  {status==="hold"&&<p className="decisionMessage">Placed on hold. No production brief is released until you approve a direction.</p>}
  {status==="idle"&&<p className="decisionMessage">Compare the three art directions. Approval releases the full production brief, but artwork generation remains a separate human-triggered step.</p>}
  {status==="approved"&&<div className="approvedBrief">
   <div className="approvedBrief__title"><span className="eyebrow">APPROVED DESIGN DIRECTION</span><h2>{selected.label} · {recipe.paletteName}</h2><p>Raydar has released a specific build recipe for this idea. Artwork has not been generated yet.</p></div>
   <div className="paletteStrip">{recipe.colors.map(c=><div className="paletteColor" key={c.name}><i style={{background:c.hex}}/><span>{c.name}</span><b>{c.hex}</b></div>)}</div>
   <div className="visualDirection"><div><span>PATTERN / TEXTURE</span><strong>{recipe.surfaceType}</strong><p>{recipe.surface}</p></div><div><span>GRAPHIC ELEMENTS</span><strong>What to draw</strong><p>{graphicElements}</p></div><div><span>DIGITALLY HAND-DRAWN STYLE</span><strong>Illustration direction</strong><p>{recipe.illustration}</p></div><div><span>TYPOGRAPHY</span><strong>Type direction</strong><p>{recipe.typography}</p></div><div><span>COMPOSITION</span><strong>Layout direction</strong><p>{recipe.composition}</p></div><div><span>RATIONALE</span><strong>Why this fits</strong><p>{recipe.rationale}</p></div><div className="avoidCell"><span>AVOID</span><strong>Keep it differentiated</strong><p>{recipe.avoid}</p></div></div>
   <div className="generationPrompt"><div className="generationPrompt__head"><div><span className="eyebrow">IMAGE GENERATION PROMPT</span><h3>Ready when you are.</h3></div><button type="button" className="secondary" onClick={copyPrompt}>{copied?"Copied ✓":"Copy Prompt"}</button></div><pre>{prompt}</pre><div className="outputSpec"><span>4500 × 5400 px</span><span>300 DPI</span><span>Transparent PNG</span><span>Print-ready</span></div><button type="button" className="generateButton" onClick={()=>window.alert("Demo: Generate is intentionally a separate human-triggered action. In the private system this would send the approved prompt to the configured image-generation workflow.")}>Generate Artwork</button></div>
  </div>}
 </section>
}
