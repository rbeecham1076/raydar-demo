import type { Category, DirectionKind } from "@/lib/types";

/**
 * Attribute vocabulary for translating PRIVATE inspiration into reusable art-direction
 * signals. No source images, source shop names, or copied compositions belong here.
 * Inspiration affects art direction only — never Market Opportunity scoring.
 */
export const INSPIRATION_TAXONOMY={
  paletteFamilies:["sun-faded brights","dopamine prep","coastal sport","heritage primary","sorbet pastel","editorial earth + pop","high-contrast resort","vintage Americana"],
  patterns:["cabana stripe","rugby stripe","irregular checker","micro gingham","hand-painted plaid","wallpaper floral","scattered novelty repeat","pieced patchwork","wavy stripe","mini geometric"],
  textures:["washed ink","paper grain","screenprint distress","sun-faded pigment","crayon grain","embroidered/stitch cue","dry brush","hand-inked contour","vintage print wear"],
  illustrationStyles:["digitally hand-drawn editorial","naive boutique illustration","vintage souvenir graphic","folk-influenced linework","loose marker drawing","clean mascot redraw","fashion-object still life","oversized cropped motif"],
  typographyCharacters:["editorial serif contrast","clean condensed utility","authored script accent","retro display","collegiate/varsity","hand-lettered marker","fashion sans","soft nostalgic serif"],
  compositions:["oversized hero + tiny utility copy","editorial asymmetry","stacked type + integrated illustration","badge broken by illustration","off-center crop","postcard/souvenir layout","arched identity + object cluster","clean central mark with negative space"],
  merchandisingEnergy:["boutique tee wall","resort shop","mall-brand graphic tee","gift-shop collectible","fashion editorial","campus/game-day","Southern lifestyle","coastal leisure"],
  avoidSignals:["generic Canva stack","AI-perfect symmetry","random bows as filler","unmotivated sparkles","overstuffed icon collage","craft-fair script overload","three recolors presented as three concepts","direct source composition mimicry","illegible novelty font pairing"],
} as const;

const categoryBias:Record<Category,{patterns:string[];textures:string[];energy:string[]}>= {
  Sports:{patterns:["rugby stripe","irregular checker","hand-painted plaid"],textures:["embroidered/stitch cue","screenprint distress","washed ink"],energy:["campus/game-day","mall-brand graphic tee"]},
  Teacher:{patterns:["micro gingham","irregular checker","scattered novelty repeat"],textures:["crayon grain","paper grain","hand-inked contour"],energy:["gift-shop collectible","boutique tee wall"]},
  Seasonal:{patterns:["wallpaper floral","mini geometric","scattered novelty repeat"],textures:["paper grain","vintage print wear","washed ink"],energy:["gift-shop collectible","fashion editorial"]},
  Lifestyle:{patterns:["cabana stripe","wavy stripe","wallpaper floral"],textures:["sun-faded pigment","washed ink","dry brush"],energy:["resort shop","coastal leisure","fashion editorial"]},
  Occupations:{patterns:["mini geometric","micro gingham","irregular checker"],textures:["paper grain","hand-inked contour","screenprint distress"],energy:["boutique tee wall","gift-shop collectible"]},
  Custom:{patterns:["pieced patchwork","hand-painted plaid","wavy stripe"],textures:["hand-inked contour","embroidered/stitch cue","dry brush"],energy:["boutique tee wall","mall-brand graphic tee"]},
};

function hash(v:string){let h=0;for(let i=0;i<v.length;i++)h=((h<<5)-h+v.charCodeAt(i))|0;return Math.abs(h)}
function pick<T>(items:readonly T[],seed:string){return items[hash(seed)%items.length]}

export function recommendInspirationAttributes(opportunityId:string,category:Category,direction:DirectionKind){
  const bias=categoryBias[category];
  const seed=`${opportunityId}-${category}-${direction}`;
  const pattern=pick(bias.patterns,`${seed}-pattern`);
  const texture=pick(bias.textures,`${seed}-texture`);
  const energy=pick(bias.energy,`${seed}-energy`);
  const palette=pick(INSPIRATION_TAXONOMY.paletteFamilies,`${seed}-palette`);
  const illustration=pick(INSPIRATION_TAXONOMY.illustrationStyles,`${seed}-illustration`);
  const composition=pick(INSPIRATION_TAXONOMY.compositions,`${seed}-composition`);
  return {palette,pattern,texture,illustration,composition,merchandisingEnergy:energy,avoid:[...INSPIRATION_TAXONOMY.avoidSignals],source:"Private inspiration attribute taxonomy (source imagery not exposed)"};
}
