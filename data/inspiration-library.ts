export type InspirationRef = {
  id:string;
  file:string;
  label:string;
  tags:string[];
  note:string;
};

const rawBase="https://raw.githubusercontent.com/rbeecham1076/raydar-demo/main/Design%20Trends%20Inspo/";

const files = [
"01293A87-488A-4EFB-A225-EF290F33FAE9.JPG","01887C5E-B9D8-4531-ACF8-57A0844AA9DF.PNG","097A6050-73EF-428A-B427-D636C71F86AE.JPG","0A93FBCC-E3E7-4638-85BA-44A804F96B97.JPG","0D6E19F2-3982-4B63-99CD-710C8A8B0741.PNG","0E7B3772-A935-4FDE-9FA2-3203C4E9ED1D.JPG","0EA89BF6-6EBC-4438-8CF5-D1B9032C1F26.JPG","10D2A2BB-23D7-4807-9BCE-521ED4435969.JPG","1285B985-C14C-4D9E-A598-5198236339B5.JPG","13D3A05C-EBA0-4FA0-A824-3C59615496C2.JPG","13E8D2DA-C9D5-4641-93AA-8239427BAD62.JPG","1417E239-372F-4A8E-AB6D-56FFCCA287DF.JPG","157A73AE-2276-4159-B3E4-BC3E776D77EE.JPG","18C6E306-DBDE-4703-9A2B-1689450A2E34.JPG","1AE01792-DD28-4087-B298-38B66B994A57.JPG","222D342C-8238-4D77-A986-47AE3B56B4F9.JPG","247C38D7-D6CF-43DF-BAF5-B160BCF30B5D.JPG","26DF038D-EB6C-4370-918A-41EF34BFFC0A.PNG","284E355A-973E-47D5-B094-688B4200435E.JPG","2C992778-1294-4C86-BD40-34BD185B5C5B.JPG","302AF008-D650-4609-9B6D-9EAB4D9D0F33.JPG","3995B9BD-2F65-4DAF-A860-805639EE957F.JPG","39B4C4E1-E584-4635-BA3F-D079C5315741.JPG","41766EA8-D154-4311-B919-B4DD3A008224.JPG","429FAAB3-FEFC-4CAC-9A3C-4E56EA7E6054.JPG","47992E3F-61DD-43FA-A707-FCD590B63638.JPG","4D559025-FD4C-45B3-B8E8-903E1EB83904.JPG","56AE7CA9-ECBA-48A8-BF88-6F43DFA70DE7.JPG","581AB72D-7B7D-4A8C-B567-936431287334.JPG","5A96B492-9491-4751-A5BF-84ED1936F5D6.JPG","5CC9F4F4-5359-4903-A3FC-C7887EA27D27.JPG","5D8E916B-8A4A-4A15-BF74-733395D53E3A.PNG"
] as const;

const tagSets = [
 ["composition","boutique-fit","color"],["pattern","typography","color"],["texture","composition","boutique-fit"],["motif","composition","seasonal"],["pattern","color","boutique-fit"],["typography","composition","texture"],["color","pattern","seasonal"],["composition","motif","boutique-fit"]
] as const;

export const inspirationRefs: InspirationRef[] = files.map((file,i)=>({
  id:`ref-${String(i+1).padStart(2,"0")}`,
  file,
  label:`Saved visual reference ${String(i+1).padStart(2,"0")}`,
  tags:[...tagSets[i%tagSets.length],"saved-reference"],
  note:"Use for visual-direction cues only: extract palette, scale, hierarchy, surface treatment, or merchandising energy without reproducing source artwork."
}));

export const inspirationUrl=(ref:InspirationRef)=>`${rawBase}${encodeURIComponent(ref.file).replace(/%2F/g,"/")}`;

export const inspirationTags=["all","pattern","texture","typography","color","composition","motif","seasonal","boutique-fit"] as const;

export const visualDirections = {
  sports:{pattern:"Irregular checker + restrained patchwork collegiate fills",texture:"Visible stitch or sun-worn ink; keep distress subtle",palette:"School colors grounded with cream, faded navy, tomato red, or one fashion-forward accent",composition:"Oversized identity first; 3–5 supporting fashion/sport objects with intentional asymmetry",avoid:"Generic bow + leopard + checker stacks, random clip-art clusters, or default varsity templates",referenceTags:["pattern","typography","boutique-fit"]},
  custom:{pattern:"Modular mini-pattern family: stripe, micro-check, floral, or dot selected by customer identity",texture:"Clean base with one tactile cue—stitch, woven edge, or worn ink",palette:"Customer colors plus one controlled neutral so customization still looks designed",composition:"Build a repeatable template architecture; personalization should feel native, not pasted on",avoid:"Too many interchangeable decorations or personalization that overwhelms hierarchy",referenceTags:["composition","pattern","boutique-fit"]},
  lifestyle:{pattern:"Cabana/rugby stripe, retro wave, wallpaper floral, or playful polka dot",texture:"Washed linen or soft sun-faded print texture",palette:"Dopamine brights tempered with vintage cream, cornflower, aqua, or warm brown",composition:"Editorial hero phrase or illustration with fewer, better supporting elements",avoid:"Corny sayings, generic Canva layouts, and trend stacking without a concept",referenceTags:["color","composition","texture"]}
} as const;

export function directionForCategory(category:string){
 const c=category.toLowerCase();
 if(c.includes("sport")||c.includes("cheer")||c.includes("teacher")) return visualDirections.sports;
 if(c.includes("custom")) return visualDirections.custom;
 return visualDirections.lifestyle;
}

export function refsForTags(tags:readonly string[],limit=6){
 return inspirationRefs.map(ref=>({ref,score:ref.tags.filter(t=>tags.includes(t)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.ref);
}
