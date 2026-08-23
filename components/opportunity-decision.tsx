"use client";

import { useMemo, useState } from "react";
import type { VisualRecipe } from "@/lib/types";
import { getGraphicElements } from "@/data/graphic-elements";

type Status="idle"|"approved"|"watch"|"hold";

export function OpportunityDecision({id,name,recipe}:{id:string;name:string;recipe:VisualRecipe}){
 const [status,setStatus]=useState<Status>("idle");
 const [copied,setCopied]=useState(false);
 const graphicElements=getGraphicElements(id);
 const prompt=useMemo(()=>{
  const palette=recipe.colors.map(c=>`${c.name} ${c.hex}`).join(", ");
  return `Create an original digitally hand-drawn PNG design for: ${name}.\n\nCOLOR PALETTE: ${recipe.paletteName} — ${palette}.\nPATTERN / TEXTURE: ${recipe.surfaceType} — ${recipe.surface}.\nGRAPHIC ELEMENTS: ${graphicElements}.\nDIGITALLY HAND-DRAWN ILLUSTRATION STYLE: ${recipe.illustration}. Keep linework intentional, art-directed, human, and boutique-quality rather than generic vector clip-art or glossy AI rendering.\nTYPOGRAPHY: ${recipe.typography}.\nCOMPOSITION: ${recipe.composition}.\nWHY THIS DIRECTION FITS: ${recipe.rationale}.\nAVOID: ${recipe.avoid}.\n\nOUTPUT REQUIREMENTS: Create one isolated finished design only, no mockup, no shirt, no model, no scene, no colored backdrop. Transparent background. High-resolution 4500 x 5400 pixels, 300 DPI, print-ready transparent PNG suitable for professional apparel and digital-download production. Preserve crisp edges and readable typography at production size. Do not add elements outside this brief unless they materially improve balance and remain consistent with the direction above.`;
 },[graphicElements,name,recipe]);

 async function copyPrompt(){
  try{await navigator.clipboard.writeText(prompt);setCopied(true);window.setTimeout(()=>setCopied(false),1600);}catch{setCopied(false)}
 }

 return <section className="decisionPanel">
  <div className="decisionPanel__head"><div><span className="eyebrow">HUMAN DECISION</span><h2>Choose what happens next.</h2></div><span className={`decisionState decisionState--${status}`}>{status==="idle"?"Awaiting decision":status==="approved"?"Approved for build":status==="watch"?"Watching signal":"On hold"}</span></div>
  <div className="actions">
   <button type="button" onClick={()=>setStatus("approved")} aria-pressed={status==="approved"}>Approve for Build</button>
   <button type="button" className="secondary" onClick={()=>setStatus("watch")} aria-pressed={status==="watch"}>Watch</button>
   <button type="button" className="secondary" onClick={()=>setStatus("hold")} aria-pressed={status==="hold"}>Hold</button>
  </div>
  {status==="watch"&&<p className="decisionMessage">Added to watch mode in this demo. The visual recipe stays ready while the opportunity waits for stronger evidence.</p>}
  {status==="hold"&&<p className="decisionMessage">Placed on hold in this demo. No production brief is released until the opportunity is approved.</p>}
  {status==="idle"&&<p className="decisionMessage">Approve the opportunity to release its production-ready visual direction and image-generation prompt.</p>}
  {status==="approved"&&<div className="approvedBrief">
   <div className="approvedBrief__title"><span className="eyebrow">APPROVED DESIGN DIRECTION</span><h2>{recipe.paletteName}</h2><p>Raydar has released a specific build recipe for this idea.</p></div>
   <div className="paletteStrip">{recipe.colors.map(c=><div className="paletteColor" key={c.name}><i style={{background:c.hex}}/><span>{c.name}</span><b>{c.hex}</b></div>)}</div>
   <div className="visualDirection">
    <div><span>PATTERN / TEXTURE</span><strong>{recipe.surfaceType}</strong><p>{recipe.surface}</p></div>
    <div><span>GRAPHIC ELEMENTS</span><strong>What to draw</strong><p>{graphicElements}</p></div>
    <div><span>DIGITALLY HAND-DRAWN STYLE</span><strong>Illustration direction</strong><p>{recipe.illustration}</p></div>
    <div><span>TYPOGRAPHY</span><strong>Type direction</strong><p>{recipe.typography}</p></div>
    <div><span>COMPOSITION</span><strong>Layout direction</strong><p>{recipe.composition}</p></div>
    <div><span>RATIONALE</span><strong>Why this fits</strong><p>{recipe.rationale}</p></div>
    <div className="avoidCell"><span>AVOID</span><strong>Keep it differentiated</strong><p>{recipe.avoid}</p></div>
   </div>
   <div className="generationPrompt"><div className="generationPrompt__head"><div><span className="eyebrow">IMAGE GENERATION PROMPT</span><h3>Ready to generate.</h3></div><button type="button" className="secondary" onClick={copyPrompt}>{copied?"Copied ✓":"Copy Prompt"}</button></div><pre>{prompt}</pre><div className="outputSpec"><span>4500 × 5400 px</span><span>300 DPI</span><span>Transparent PNG</span><span>Print-ready</span></div></div>
  </div>}
 </section>
}
