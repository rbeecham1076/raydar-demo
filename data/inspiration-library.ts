export type InspirationRef = {
  id:string;
  file:string;
  label:string;
  tags:string[];
  note:string;
};

const rawBase="https://raw.githubusercontent.com/rbeecham1076/raydar-demo/main/Design%20Trends%20Inspo/";

export const inspirationRefs: InspirationRef[] = [
  {id:"ref-01",file:"01293A87-488A-4EFB-A225-EF290F33FAE9.JPG",label:"Saved reference 01",tags:["composition","boutique-fit","color"],note:"Use for art-direction cues, spacing, hierarchy, and color relationships—not composition copying."},
  {id:"ref-02",file:"01887C5E-B9D8-4531-ACF8-57A0844AA9DF.PNG",label:"Saved reference 02",tags:["pattern","typography","color"],note:"Mine for surface ideas and type/pattern relationships."},
  {id:"ref-03",file:"097A6050-73EF-428A-B427-D636C71F86AE.JPG",label:"Saved reference 03",tags:["texture","composition","boutique-fit"],note:"Use as a tactile and merchandising-direction reference."},
  {id:"ref-04",file:"0A93FBCC-E3E7-4638-85BA-44A804F96B97.JPG",label:"Saved reference 04",tags:["motif","composition","seasonal"],note:"Extract motif scale and arrangement logic without reproducing the source artwork."},
  {id:"ref-05",file:"0D6E19F2-3982-4B63-99CD-710C8A8B0741.PNG",label:"Saved reference 05",tags:["pattern","color","boutique-fit"],note:"Useful for pattern density, palette balance, and boutique-read cues."},
  {id:"ref-06",file:"0E7B3772-A935-4FDE-9FA2-3203C4E9ED1D.JPG",label:"Saved reference 06",tags:["typography","composition","texture"],note:"Use for hierarchy, type personality, and surface treatment cues."},
  {id:"ref-07",file:"0EA89BF6-6EBC-4438-8CF5-D1B9032C1F26.JPG",label:"Saved reference 07",tags:["color","pattern","seasonal"],note:"Use to inform palette and supporting surface direction."},
  {id:"ref-08",file:"10D2A2BB-23D7-4807-9BCE-521ED4435969.JPG",label:"Saved reference 08",tags:["composition","motif","boutique-fit"],note:"Use for illustration-to-type balance and merchandising energy."},
  {id:"ref-09",file:"1285B985-C14C-4D9E-A598-5198236339B5.JPG",label:"Saved reference 09",tags:["texture","color","composition"],note:"Use for finish, color layering, and surface depth."},
  {id:"ref-10",file:"13D3A05C-EBA0-4FA0-A824-3C59615496C2.JPG",label:"Saved reference 10",tags:["typography","pattern","boutique-fit"],note:"Use for display-type treatment and supporting pattern logic."},
  {id:"ref-11",file:"13E8D2DA-C9D5-4641-93AA-8239427BAD62.JPG",label:"Saved reference 11",tags:["motif","color","composition"],note:"Use for motif family, accent color, and negative-space cues."},
  {id:"ref-12",file:"1417E239-372F-4A8E-AB6D-56FFCCA287DF.JPG",label:"Saved reference 12",tags:["pattern","texture","composition"],note:"Use for repeat structure, tactile treatment, and layering cues."},
];

export const inspirationUrl=(ref:InspirationRef)=>`${rawBase}${encodeURIComponent(ref.file).replace(/%2F/g,"/")}`;

export const visualDirections = {
  sports:{
    pattern:"Irregular checker + restrained patchwork collegiate fills",
    texture:"Visible stitch or sun-worn ink; keep distress subtle",
    palette:"School colors grounded with cream, faded navy, tomato red, or one fashion-forward accent",
    composition:"Oversized identity first; 3–5 supporting fashion/sport objects with intentional asymmetry",
    avoid:"Generic bow + leopard + checker stacks, random clip-art clusters, or default varsity templates",
    referenceTags:["pattern","typography","boutique-fit"]
  },
  custom:{
    pattern:"Modular mini-pattern family: stripe, micro-check, floral, or dot selected by customer identity",
    texture:"Clean base with one tactile cue—stitch, woven edge, or worn ink",
    palette:"Customer colors plus one controlled neutral so customization still looks designed",
    composition:"Build a repeatable template architecture; personalization should feel native, not pasted on",
    avoid:"Too many interchangeable decorations or personalization that overwhelms hierarchy",
    referenceTags:["composition","pattern","boutique-fit"]
  },
  lifestyle:{
    pattern:"Cabana/rugby stripe, retro wave, wallpaper floral, or playful polka dot",
    texture:"Washed linen or soft sun-faded print texture",
    palette:"Dopamine brights tempered with vintage cream, cornflower, aqua, or warm brown",
    composition:"Editorial hero phrase or illustration with fewer, better supporting elements",
    avoid:"Corny sayings, generic Canva layouts, and trend stacking without a concept",
    referenceTags:["color","composition","texture"]
  }
} as const;

export function refsForTags(tags:readonly string[],limit=4){
  return inspirationRefs
    .map(ref=>({ref,score:ref.tags.filter(t=>tags.includes(t)).length}))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
    .map(x=>x.ref);
}
