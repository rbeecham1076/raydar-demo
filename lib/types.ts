export type Recommendation = "BUILD NOW" | "TEST" | "WATCH" | "HOLD" | "DEPRIORITIZE";
export type PostLaunchRecommendation = Recommendation | "SCALE";
export type Category = "Sports" | "Teacher" | "Seasonal" | "Lifestyle" | "Occupations" | "Custom";
export type SourceType = "Marketplace Search" | "Social Discovery" | "Search Trends" | "Wholesale Signals" | "Competitor Movement" | "Historical Performance";
export type PipelineStage = "RESEARCH" | "WATCHING" | "APPROVED" | "BUILDING" | "READY" | "LISTED" | "TESTING" | "WINNER";
export type PerformanceResult = "Winner" | "Testing" | "Underperformed";
export type TrendLifecycle = "Emerging" | "Accelerating" | "Growing" | "Mature" | "Declining";

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
  lifecycle:TrendLifecycle;
  confidence:number;
  movement:string;
  relatedOpportunity:string;
};

export type PaletteColor={name:string;hex:string};
export type FontRoles={hero:string;supporting:string;accent:string;rationale:string;source:string};

export type VisualRecipe={
  paletteName:string;
  colors:PaletteColor[];
  surface:string;
  surfaceType:"Pattern"|"Texture"|"Pattern + Texture";
  illustration:string;
  typography:string;
  fontRoles?:FontRoles;
  composition:string;
  rationale:string;
  avoid:string;
};

export type DirectionKind="BEST BET"|"TREND FORWARD"|"WILDCARD";

export type DesignDirection={
  id:string;
  kind:DirectionKind;
  label:string;
  description:string;
  recipe:VisualRecipe;
};

export type PhraseGuidance={
  status:"KEEP"|"REVISE"|"AVOID";
  current:string;
  rationale:string;
  alternatives:string[];
};

export type SeasonalTiming={designBy:string;listBy:string;peakSearch:string;retireReassess:string;note:string};
export type ExpansionItem={type:string;priority:"HIGH"|"MEDIUM"|"LOW";reason:string};
export type CannibalizationGuidance={status:"DIFFERENTIATE"|"BUNDLE"|"REWORK/REFRESH"|"REPLACE"|"SKIP";note:string};

export type OpportunityIntelligence={
  marketOpportunity:number;
  brandFit:number;
  brandFitNote:string;
  phrase:PhraseGuidance;
  collection:{name:string;fit:number;note:string};
  timing:SeasonalTiming;
  expansion:ExpansionItem[];
  cannibalization:CannibalizationGuidance;
  directions:DesignDirection[];
};

export type ApprovedDesignBrief={
  opportunityId:string;
  opportunityName:string;
  status:"APPROVED";
  direction:DirectionKind;
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
