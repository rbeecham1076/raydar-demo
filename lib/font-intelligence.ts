import type { Category, DirectionKind, FontRoles } from "./types";

/**
 * Curated recommendation layer sourced from Rachel_Font_Library.txt (1,174 OTF filenames).
 * Font binaries are intentionally not stored in this public repo. Names are recommendation metadata only.
 * Web/UI embedding requires a separate licensing/availability check.
 */
const pools = {
  editorial:["BodoniLTPro-Bold","GaramondPremrPro-Smbd","BerlingLTStd-Bold","Atelierblossomserif","Authentic Society Serif","Bardens Serif","Cardeals Serif","Lady Crush Serif","London Serif Font","Maerison Serif Regular","Pretty Satisfy Serif","Tropique Serif"],
  clean:["HKGrotesk-Bold","HKGrotesk-SemiBold","DINNextLTPro-Medium","FuturaLTPro-Bold","AvenirNextLTPro-Light","GillSansNova-Book","Pearlside Bold","DhMondwild-SemiBold","Sanford Region Semi Bold","Veluna Sans Regular"],
  sports:["Athletic Vintage","Birthday Varsity","Brody Sport Regular","Brooklyn Sport","Campus","Famous Varsity","Forge Block Regular","Home Field","Home Plate","Leading College","LettermanJacket-Regular","Mascot College","Modern College","North College","Playbook-Fill","Quantro Sport","Slugger Union","Varsity Slab Serif","Varsity Spirit"],
  retro:["American Vintage Regular","Analog Flow","Diary Retro","Fifties Pastel","Fresco Vintage Sans","Modern Vintage","Retro Display","Retro Poster","Retro School","Signed Retro","Tbj Sugaria Vintage","Vintage Poster","Wonderful Vintages"],
  script:["Authentic Society Script","Blackroad Script","Blinky Darling Script","Costa Brisa Script","Fresco Vintage Script","HeadleyScript","La Cabane Script","Magnolia Coast","Mountain Lake Script Bold","Peach Club Script Bold","Sign Painting","Tropique Script","Varsity Signature","Vintage Postman Script"],
  handdrawn:["Aesthetic Monoline","Candbhandwriting","Color Scrawl Regular","Doodle Line","Hand Drawn","Handwriting","Handwritten","Jackie's Pen","MySketch","Penandpaper","Scribble Chunk","Slightlysketchy","Summer Marker Script"],
  coastal:["Coastal Delight","Costa Brisa Sans","Costa Brisa Script","La Cabane Sans","Laguna Tropic Sans Regular","Lagunatropicserif Regular","Magnolia Coast Sans","Mountain Lake Sans Serif","Salty Sans","Tropique Sans","Tropique Serif","Welcome Beach"],
  western:["Cowboys Vintage","Minimal Western","Oldtown Signer Sans","Oldtown Signer Script","Rodeo Circus","Rustic Ranger","Sheriff Cowboy","Texas Simple","Wildwesternbysqueebcreative Regular","wtf_horseland_regular"],
  playful:["Boogie Soul Regular","Bubblegum","Candy Color Regular","Chunky Bright","Funky Whimsy Regular","Juicy Lemon Regular","Mellow Regular","Peachy Rebels","Paultine Groovy","Quirky Punch","Retro Summer","Sunny Squeeze Bold","Whimsy Hippie"],
} as const;

type PoolName=keyof typeof pools;

const categoryPools:Record<Category,PoolName[]>={
  Sports:["sports","retro","clean","script"],
  Teacher:["retro","playful","handdrawn","clean"],
  Seasonal:["editorial","retro","script","handdrawn"],
  Lifestyle:["editorial","coastal","retro","script"],
  Occupations:["clean","editorial","script","retro"],
  Custom:["script","editorial","clean","handdrawn"],
};

function hash(value:string){let h=0;for(let i=0;i<value.length;i++)h=((h<<5)-h+value.charCodeAt(i))|0;return Math.abs(h)}
function pick(pool:readonly string[],seed:string,recent:string[]){
 const available=pool.filter(x=>!recent.includes(x));
 const source=available.length?available:pool;
 return source[hash(seed)%source.length];
}

export function recommendFontRoles({opportunityId,category,direction,recentHeroFonts=[]}:{opportunityId:string;category:Category;direction:DirectionKind;recentHeroFonts?:string[]}):FontRoles{
 const base=categoryPools[category];
 const heroPool=direction==="BEST BET"?pools[base[0]]:direction==="TREND FORWARD"?pools.editorial:pools[category==="Sports"?"retro":category==="Lifestyle"?"playful":"handdrawn"];
 const supportPool=direction==="WILDCARD"?pools.clean:pools[base[1]];
 const accentPool=category==="Sports"?pools.script:category==="Lifestyle"?pools.script:pools.handdrawn;
 const hero=pick(heroPool,`${opportunityId}-${direction}-hero`,recentHeroFonts);
 const supporting=pick(supportPool,`${opportunityId}-${direction}-support`,[hero]);
 const accent=pick(accentPool,`${opportunityId}-${direction}-accent`,[hero,supporting]);
 return {
  hero,
  supporting,
  accent,
  rationale:direction==="BEST BET"?"Commercially legible pairing using an owned font with strong category recognition and a contrasting support/accent role.":direction==="TREND FORWARD"?"More editorial pairing chosen to move the concept toward boutique/fashion merchandising without sacrificing readability.":"Less expected pairing chosen to create novelty while keeping one clean supporting face for control and production legibility.",
  source:"Rachel Font Book inventory",
 };
}

export function heroFontRepetitionPenalty(font:string,recentHeroFonts:string[],sameCollection=false){
 if(sameCollection)return 0;
 const uses=recentHeroFonts.slice(0,10).filter(x=>x===font).length;
 return uses>=3?Math.min(12,(uses-2)*4):0;
}

export const publicUiCandidates=["HKGrotesk","DIN Next LT Pro","Futura LT Pro","Avenir Next LT Pro","Gill Sans Nova","Bodoni LT Pro","Garamond Premier Pro"] as const;
