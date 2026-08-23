export type Recommendation = "BUILD NOW" | "TEST" | "WATCH" | "HOLD" | "DEPRIORITIZE";
export type PostLaunchRecommendation = Recommendation | "SCALE";
export type Category = "Sports" | "Teacher" | "Seasonal" | "Lifestyle" | "Occupations" | "Custom";
export type SourceType = "Marketplace Search" | "Social Discovery" | "Search Trends" | "Wholesale Signals" | "Competitor Movement" | "Historical Performance";
export type PipelineStage = "RESEARCH" | "WATCHING" | "APPROVED" | "BUILDING" | "READY" | "LISTED" | "TESTING" | "WINNER";
export type PerformanceResult = "Winner" | "Testing" | "Underperformed";

export type ScoreDimensions = {
  demand:number;
  momentum:number;
  repeatability:number;
  customization:number;
  productFit:number;
  competitionGap:number;
  confidence:number;
  saturationRisk:number;
};

export type Opportunity = ScoreDimensions & {
  id:string;
  name:string;
  category:Category;
  season:string;
  score:number;
  recommendation:Recommendation;
  primaryRisk:string;
};

export type Signal = {
  id:string;
  signal:string;
  category:Category;
  sourceType:SourceType;
  momentum:"Gaining"|"Stable"|"Declining";
  lifecycle:"Emerging"|"Growing"|"Mature";
  confidence:number;
  movement:string;
  relatedOpportunity:string;
};

export type PaletteColor={name:string;hex:string};

export type VisualRecipe={
  paletteName:string;
  colors:PaletteColor[];
  surface:string;
  surfaceType:"Pattern"|"Texture"|"Pattern + Texture";
  illustration:string;
  typography:string;
  composition:string;
  rationale:string;
  avoid:string;
};

export type ApprovedDesignBrief={
  opportunityId:string;
  opportunityName:string;
  status:"APPROVED";
  recipe:VisualRecipe;
  graphicElements:string;
  generationPrompt:string;
  output:{widthPx:4500;heightPx:5400;dpi:300;format:"PNG";transparent:true;printReady:true};
};

export type PipelineItem={
  product:string;
  score:number;
  stage:PipelineStage;
  ageInStageDays:number;
  nextAction:string;
};

export type PerformanceRecord={
  product:string;
  score:number;
  result:PerformanceResult;
  revenue:number;
  orders:number;
  conversion:number;
  roas:number;
};
