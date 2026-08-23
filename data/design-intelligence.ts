import type { Category, DirectionKind, Opportunity, OpportunityIntelligence, VisualRecipe } from "@/lib/types";
import { getVisualRecipe } from "@/data/visual-recipes";
import { RAYDAR_POLICY } from "@/lib/product-policy";
import { recommendFontRoles } from "@/lib/font-intelligence";

const alternatePalettes:Record<Category,[string,{name:string;hex:string}[],string,{name:string;hex:string}[]]>= {
 Sports:["Fresh Sideline",[{name:"Pool",hex:"#6FA8A8"},{name:"Tomato",hex:"#D95C4B"},{name:"Butter",hex:"#E9D56C"},{name:"Ink",hex:"#27303D"}],"Electric Pep",[{name:"Hot Coral",hex:"#F06B5C"},{name:"Periwinkle",hex:"#7F83CF"},{name:"Lime",hex:"#D9E86D"},{name:"Cream",hex:"#F7EDDF"}]],
 Teacher:["Study Hall",[{name:"Denim",hex:"#66859F"},{name:"Apple",hex:"#C65A4E"},{name:"Paper",hex:"#F2E7D3"},{name:"Olive",hex:"#7C8565"}],"Art Room Pop",[{name:"Tangerine",hex:"#E57A45"},{name:"Lilac",hex:"#A997C7"},{name:"Mint",hex:"#A7C6AE"},{name:"Cream",hex:"#F5E9D8"}]],
 Seasonal:["Editorial Holiday",[{name:"Wine",hex:"#8C3F52"},{name:"Pine",hex:"#496558"},{name:"Champagne",hex:"#E8D3A8"},{name:"Ink",hex:"#302B31"}],"Seasonal Remix",[{name:"Persimmon",hex:"#D9784F"},{name:"Aqua",hex:"#77AAA7"},{name:"Mauve",hex:"#A9788D"},{name:"Vanilla",hex:"#F4E6CC"}]],
 Lifestyle:["Boutique Leisure",[{name:"Sea Glass",hex:"#8FB3AA"},{name:"Clay",hex:"#C97864"},{name:"Canvas",hex:"#EEE4D3"},{name:"Navy",hex:"#3C5061"}],"Leisure Pop",[{name:"Cobalt",hex:"#536DB3"},{name:"Citrus",hex:"#D8DF6C"},{name:"Shell Pink",hex:"#DFA5A1"},{name:"Cream",hex:"#F5EADC"}]],
 Occupations:["Polished Workwear",[{name:"Dusty Blue",hex:"#99B3C4"},{name:"Berry",hex:"#B85B79"},{name:"Cream",hex:"#F4EBDD"},{name:"Plum",hex:"#635166"}],"Shift Change",[{name:"Aqua",hex:"#78B4B2"},{name:"Cherry",hex:"#D45662"},{name:"Butter",hex:"#E7D66D"},{name:"Ink",hex:"#303541"}]],
 Custom:["Signature Custom",[{name:"Sage",hex:"#9DAA91"},{name:"Blush",hex:"#D4A4A4"},{name:"Cream",hex:"#F2E7D6"},{name:"Chocolate",hex:"#5B473D"}],"Collector Custom",[{name:"Periwinkle",hex:"#7E86C8"},{name:"Coral",hex:"#E06C5D"},{name:"Acid",hex:"#DCE76E"},{name:"Ink",hex:"#2D3442"}]],
};

const collectionByCategory:Record<Category,{name:string;note:string}>={
 Sports:{name:"Friday Night Social Club",note:"Coordinate school spirit, mascot, cheer, and game-day ideas through related but non-identical varsity cues."},
 Teacher:{name:"Back to School Boutique",note:"Build a small collection around personalized school identity, retro classroom graphics, and teacher-specific variants."},
 Seasonal:{name:"Seasonal Social Calendar",note:"Group event-led seasonal concepts with coordinated entertaining, club, and collectible merchandise energy."},
 Lifestyle:{name:"Weekend Club Series",note:"Connect leisure concepts through editorial club language while varying setting, palette, and illustration."},
 Occupations:{name:"Profession Club Series",note:"Create occupation-specific badges and identities with a shared level of polish rather than one repeated bow template."},
 Custom:{name:"Made for You Collection",note:"Bundle personalization-first concepts around authored lettering, portraits, team identity, and repeatable customization."},
};

function phraseGuidance(o:Opportunity){
 const p=RAYDAR_POLICY.phrase;
 if(o.saturationRisk>=p.avoidAtSaturation) return {status:"AVOID" as const,current:o.name,rationale:"The wording itself is saturated enough that Raydar should preserve the buyer need but replace the phrase structure entirely.",alternatives:["Use an original short title","Use a custom identity instead of a phrase",...(p.allowNoText?["No-text graphic direction"]:[])]};
 if(o.saturationRisk>=p.reviseAtSaturation) return {status:"REVISE" as const,current:o.name,rationale:"The market signal is useful, but the current wording or familiar phrase structure is saturated enough that freshness should come from naming as well as art direction.",alternatives:[`${o.name.replace(/Game Day/gi,"Sideline")} Social`,`The ${o.category} Club`,`${o.season} Social Edition`,...(p.allowNoText?["No-text graphic direction"]:[])]};
 if(o.demand<p.reviseBelowDemand) return {status:"REVISE" as const,current:o.name,rationale:"The underlying lifestyle angle has whitespace, but the title needs more specificity or emotional pull before production.",alternatives:[`${o.name} Club`,`Weekend ${o.category} Society`,`${o.name} Edition`,...(p.allowNoText?["No-text graphic direction"]:[])]};
 return {status:"KEEP" as const,current:o.name,rationale:"The phrase is clear enough to test without making naming the primary source of differentiation.",alternatives:p.allowNoText?["No-text graphic direction"]:[]};
}

function seasonalTiming(o:Opportunity){
 const evergreen=o.season==="Evergreen";
 if(evergreen)return {designBy:"Rolling / 2–3 weeks before launch",listBy:"As soon as production-ready",peakSearch:"Monitor rolling 30-day demand",retireReassess:"Quarterly",note:"Evergreen opportunity: freshness and saturation matter more than a holiday deadline."};
 const map:Record<string,[string,string,string,string]>={
  Fall:["10–12 weeks before fall demand","8–10 weeks before fall demand","6–8 weeks before peak season","2–3 weeks after peak"],
  "Back to School":["12–14 weeks before school start","9–11 weeks before school start","4–8 weeks before school start","2 weeks after local school-start peak"],
  Holiday:["12–16 weeks before holiday","10–12 weeks before holiday","6–9 weeks before holiday","First week after holiday"],
  Halloween:["12–14 weeks before Halloween","9–11 weeks before Halloween","5–8 weeks before Halloween","Nov 1 / performance review"],
  Summer:["10–12 weeks before summer","8–10 weeks before summer","4–8 weeks before summer travel/activities","Late summer / reassess"],
  Spring:["10–12 weeks before spring","8–10 weeks before spring","4–7 weeks before spring peak","Late spring / reassess"],
  Winter:["10–14 weeks before winter peak","8–12 weeks before winter peak","4–8 weeks before winter activity peak","End of winter / reassess"],
 };
 const t=map[o.season]||["10–12 weeks before demand","8–10 weeks before demand","4–8 weeks before peak","After peak / reassess"];
 return {designBy:t[0],listBy:t[1],peakSearch:t[2],retireReassess:t[3],note:"Timing is based on the selling window, not the event date. Validate against fresh marketplace/search evidence before production."};
}

function expansionMap(o:Opportunity){
 const items=[{type:"Core transparent PNG",priority:"HIGH" as const,reason:"Base sellable asset and anchor for downstream listing/collection work."}];
 if(o.customization>=80)items.push({type:"Personalized name / team / mascot variant",priority:"HIGH",reason:"Customization score is strong enough to justify a repeatable editable version."});
 if(o.repeatability>=88)items.push({type:"Coordinated mini-collection",priority:"HIGH",reason:"High repeatability supports related designs without relying on one isolated winner."});
 if(o.productFit>=84)items.push({type:"Bundle / cross-sell version",priority:"MEDIUM",reason:"Strong product fit supports merchandising beyond a single listing."});
 if(["Lifestyle","Seasonal","Teacher"].includes(o.category))items.push({type:"Seamless pattern or supporting surface",priority:"MEDIUM",reason:"Category can support coordinated pattern/surface products or merchandising assets."});
 return items;
}

function cannibalization(o:Opportunity){
 if(o.saturationRisk>=60)return {status:"REWORK/REFRESH" as const,note:"Market remains interesting, but the concept is saturated enough that a familiar existing treatment should be rebuilt rather than duplicated."};
 if(o.repeatability>=92&&o.productFit>=88)return {status:"BUNDLE" as const,note:"Strong repeatability/product fit favors a coordinated expansion or bundle before another near-duplicate standalone listing."};
 if(o.saturationRisk>=38)return {status:"DIFFERENTIATE" as const,note:"Check current shop/pipeline for the same buyer/search intent and deliberately change phrase, composition, surface, or product format."};
 return {status:"DIFFERENTIATE" as const,note:"No automatic veto. Compare against existing products before build and preserve a clear reason for this version to exist."};
}

function withFonts(recipe:VisualRecipe,o:Opportunity,direction:DirectionKind):VisualRecipe{
 const fontRoles=recommendFontRoles({opportunityId:o.id,category:o.category,direction});
 return {...recipe,fontRoles,typography:`${recipe.typography} Recommended owned-font roles: Hero — ${fontRoles.hero}; Supporting — ${fontRoles.supporting}; Accent — ${fontRoles.accent}.`};
}

function variant(base:VisualRecipe,category:Category,kind:"trend"|"wild"):VisualRecipe{
 const p=alternatePalettes[category];
 const trend=kind==="trend";
 return {
  ...base,
  paletteName:trend?p[0]:p[2],
  colors:trend?p[1]:p[3],
  surface:trend?`Fashion-forward ${category==="Sports"?"rugby stripe + visible stitch":category==="Lifestyle"?"cabana stripe + washed ink":category==="Seasonal"?"small-scale wallpaper repeat + paper grain":"micro-pattern + tactile ink grain"}`:`Unexpected ${category==="Custom"?"pieced patchwork + hand-inked contour":category==="Teacher"?"oversized irregular checker + crayon-like grain":"asymmetric pattern fragments + hand-painted texture"}`,
  surfaceType:"Pattern + Texture",
  illustration:trend?`${base.illustration}. Push it toward current boutique editorial illustration with looser scale shifts and more fashion-led restraint.`:`${base.illustration}. Make the illustration more collectible and surprising through exaggerated scale, cropped motifs, or intentionally naïve hand-drawn details.`,
  typography:trend?`Fashion-led version of the concept: ${base.typography}; favor stronger contrast between editorial display type and compact utility text.`:`Unexpected type pairing: use one distinctive display face with an intentionally contrasting hand-lettered or condensed secondary style. Avoid the obvious category font formula.`,
  composition:trend?`Editorial asymmetry, cropped hero element, stronger whitespace, and one directional secondary detail. ${base.composition}`:`Break the expected badge/stack formula. Use an off-center hero, unusual negative space, and one oversized illustrated element while preserving print readability.`,
  rationale:trend?`Trend-forward interpretation of the same commercial opportunity. It preserves the market signal but moves the visual language closer to boutique/fashion merchandising.`:`Wildcard interpretation designed to create novelty in a saturated feed. It keeps the product idea recognizable while deliberately avoiding the expected category composition.`,
  avoid:trend?`${base.avoid} Also avoid copying currently common trend stacks literally.`:`${base.avoid} Do not become weird for novelty alone; the final design still needs a clear buyer and readable product identity.`
 };
}

export function getOpportunityIntelligence(o:Opportunity):OpportunityIntelligence{
 const base=getVisualRecipe(o.id)!;
 const marketOpportunity=o.score;
 const brandFit=Math.max(58,Math.min(97,Math.round((o.productFit*.45+o.repeatability*.25+o.customization*.15+o.confidence*.15) - (o.category==="Occupations"?6:0))));
 const collection=collectionByCategory[o.category];
 const collectionFit=Math.round((o.repeatability+o.productFit)/2);
 const best=withFonts(base,o,"BEST BET");
 const trend=withFonts(variant(base,o.category,"trend"),o,"TREND FORWARD");
 const wild=withFonts(variant(base,o.category,"wild"),o,"WILDCARD");
 return {
  marketOpportunity,
  brandFit,
  brandFitNote:brandFit>=85?"Strong fit with the current boutique design language and production model.":brandFit>=72?"Good opportunity with some adaptation needed to make it feel native to the brand.":"Commercially interesting but outside the current visual language; adapt deliberately rather than rejecting it.",
  phrase:phraseGuidance(o),
  collection:{name:collection.name,fit:collectionFit,note:collectionFit>=RAYDAR_POLICY.collection.minimumFit?`${collection.note} Strong enough to consider a ${RAYDAR_POLICY.collection.preferredSize.min}–${RAYDAR_POLICY.collection.preferredSize.max} design mini-collection using the 70/30 shared-DNA rule.`:`${collection.note} Keep it standalone until collection fit strengthens.`},
  timing:seasonalTiming(o),
  expansion:expansionMap(o),
  cannibalization:cannibalization(o),
  directions:[
   {id:`${o.id}-best`,kind:"BEST BET",label:"Best Bet",description:`Highest-confidence balance of demand, differentiation, production fit, and buyer familiarity. Directions must differ meaningfully across at least ${RAYDAR_POLICY.directions.minimumMeaningfulDifferences} visual dimensions.`,recipe:best},
   {id:`${o.id}-trend`,kind:"TREND FORWARD",label:"Trend Forward",description:"More fashion-led and emerging while staying commercially recognizable.",recipe:trend},
   {id:`${o.id}-wild`,kind:"WILDCARD",label:"Wildcard",description:"A more original visual route intended to create feed-stopping novelty without losing product clarity.",recipe:wild}
  ]
 };
}
