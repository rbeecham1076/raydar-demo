import type { Opportunity, Signal } from "@/lib/types";
import { calculateOpportunityScore, recommendationFor } from "@/lib/scoring";

const rawOpportunities = [
  ["custom-football-mascot-bow","Custom Football Mascot Bow","Sports","Fall",99,98,99,100,99,92,97,26,"Competition accelerating"],
  ["retro-teacher-icons","Retro Teacher Icon Set","Teacher","Back to School",90,86,92,88,91,84,91,33,"Crowded teacher category"],
  ["varsity-game-day","Varsity Game Day Graphic","Sports","Fall",88,84,90,87,91,80,88,41,"High visual saturation"],
  ["holiday-hostess","Holiday Hostess Club","Seasonal","Holiday",86,82,88,79,89,86,90,28,"Shorter seasonal window"],
  ["weekend-lake-club","Weekend Lake Club","Lifestyle","Summer",84,77,91,72,88,83,89,24,"Seasonality"],
  ["nurse-bow-badge","Nurse Bow Badge","Occupations","Evergreen",82,79,92,94,85,75,88,36,"Competitive occupation niche"],
  ["custom-school-script","Custom School Script","Custom","Fall",91,86,97,98,93,86,94,30,"Customization throughput"],
  ["coastal-tennis-club","Coastal Tennis Club","Lifestyle","Spring",79,83,84,65,86,88,86,22,"Demand validation"],
  ["spooky-book-club","Spooky Book Club","Seasonal","Halloween",80,78,77,55,82,79,84,35,"Short selling window"],
  ["cheer-mascot-stack","Cheer Mascot Stack","Sports","Fall",89,91,95,99,92,78,92,38,"Fast-follow competition"],
  ["teacher-mascot-bow","Teacher Mascot Bow","Teacher","Back to School",85,87,93,91,90,74,89,40,"Crowded motif"],
  ["custom-pet-prep","Custom Pet Prep Portrait","Custom","Evergreen",72,68,95,99,83,90,82,18,"Production complexity"],
  ["holiday-cookie-social","Holiday Cookie Social","Seasonal","Holiday",76,72,81,62,79,87,80,20,"Narrow occasion"],
  ["gameday-mom-club","Game Day Mom Club","Sports","Fall",83,80,89,82,87,73,86,44,"Phrase saturation"],
  ["bookstore-weekend","Bookstore Weekend","Lifestyle","Evergreen",70,74,83,58,76,91,78,15,"Lower immediate demand"],
  ["dental-bow-club","Dental Bow Club","Occupations","Evergreen",68,64,85,78,72,88,77,17,"Smaller audience"],
  ["winter-ski-social","Winter Ski Social","Seasonal","Winter",74,81,79,54,82,89,81,19,"Seasonal dependency"],
  ["custom-jersey-bow","Custom Jersey Bow","Custom","Fall",88,92,96,100,94,82,93,34,"Operational scale"]
] as const;

export const opportunities: Opportunity[] = rawOpportunities.map((r) => {
  const base = {
    id:r[0], name:r[1], category:r[2], season:r[3], demand:r[4], momentum:r[5],
    repeatability:r[6], customization:r[7], productFit:r[8], competitionGap:r[9],
    confidence:r[10], saturationRisk:r[11], primaryRisk:r[12]
  } as Omit<Opportunity,"score"|"recommendation">;
  const score = calculateOpportunityScore(base);
  return {...base, score, recommendation: recommendationFor(score)};
});

const signalNames = [
  "Mascot personalization searches rising","Game-day bow saves accelerating","Teacher icon bundles holding demand",
  "Custom school-color requests increasing","Holiday hostess phrases emerging","Lake lifestyle graphics stabilizing",
  "Occupation bow motifs gaining","Tennis-club styling accelerating","Halloween reading themes rising",
  "Cheer personalization repeating","Retro collegiate type remains durable","Custom pet graphics show whitespace",
  "Cookie-swap language emerging","Football mom phrases saturated","Bookish lifestyle graphics stable",
  "Dental occupation graphics under-served","Ski social motifs beginning early","Jersey personalization accelerating",
  "School mascot requests repeat weekly","Bow motif persists across categories","Warm coral accents gaining","Gingham usage stable",
  "Varsity lettering remains strong","Boutique personalization outperforms generic","Seasonal demand window moving earlier",
  "Custom color variants convert better","Lifestyle club language remains active","Teacher demand shifting to personalization",
  "Football design saturation increasing","Cheer demand remains resilient","Occupation niches show repeatability",
  "Wholesale preppy motifs continue","Search interest in mascot bows rising","Historical custom products outperform",
  "Social saves favor layered graphics","Marketplace autocomplete shows school terms","Competitor movement into mascot sets",
  "Holiday searches starting earlier","Fall palettes broadening beyond brown","Custom name products sustain engagement",
  "Sports bundles show repeat purchase potential","Evidence confidence improving across sources"
];

const sourceTypes: Signal["sourceType"][] = ["Marketplace Search","Social Discovery","Search Trends","Wholesale Signals","Competitor Movement","Historical Performance"];
const cats: Signal["category"][] = ["Sports","Teacher","Seasonal","Lifestyle","Occupations","Custom"];

export const signals: Signal[] = signalNames.slice(0,42).map((signal, i) => ({
  id:`sig-${i+1}`,
  signal,
  category: cats[i % cats.length],
  sourceType: sourceTypes[i % sourceTypes.length],
  momentum: i % 5 === 0 ? "Stable" : "Gaining",
  lifecycle: i % 4 === 0 ? "Emerging" : i % 3 === 0 ? "Mature" : "Growing",
  confidence: 72 + (i * 7) % 27,
  movement: `+${3 + (i * 5) % 24}%`,
  relatedOpportunity: opportunities[i % opportunities.length].name
}));

export const pipeline = [
  ["Custom Football Mascot Bow",93,"APPROVED",1,"Move to design brief"],
  ["Cheer Mascot Stack",91,"BUILDING",2,"Finish color variants"],
  ["Custom School Script",90,"READY",1,"Final QA"],
  ["Retro Teacher Icon Set",88,"TESTING",5,"Review CTR"],
  ["Holiday Hostess Club",86,"RESEARCH",3,"Validate timing"],
  ["Varsity Game Day Graphic",85,"WATCHING",4,"Monitor saturation"],
  ["Weekend Lake Club",83,"LISTED",8,"Review conversion"],
  ["Nurse Bow Badge",82,"TESTING",6,"Test thumbnail"],
  ["Coastal Tennis Club",81,"WATCHING",7,"Collect more evidence"],
  ["Custom Jersey Bow",90,"WINNER",12,"Expand variations"]
] as const;

export const performance = [
  {product:"Custom Jersey Bow",score:90,result:"Winner",revenue:1840,orders:83,conversion:4.8,roas:5.2},
  {product:"Retro Teacher Icon Set",score:88,result:"Winner",revenue:1210,orders:59,conversion:4.2,roas:4.6},
  {product:"Weekend Lake Club",score:83,result:"Testing",revenue:620,orders:27,conversion:2.9,roas:2.8},
  {product:"Varsity Game Day Graphic",score:85,result:"Testing",revenue:810,orders:34,conversion:3.1,roas:3.2},
  {product:"Holiday Hostess Club",score:86,result:"Testing",revenue:540,orders:21,conversion:2.6,roas:2.5},
  {product:"Nurse Bow Badge",score:82,result:"Winner",revenue:980,orders:46,conversion:3.9,roas:4.1},
  {product:"Bookstore Weekend",score:76,result:"Underperformed",revenue:230,orders:9,conversion:1.3,roas:1.1},
  {product:"Dental Bow Club",score:72,result:"Underperformed",revenue:190,orders:8,conversion:1.1,roas:0.9}
];
