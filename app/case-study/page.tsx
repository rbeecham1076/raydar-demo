import Link from "next/link";
import { Card } from "@/components/ui";

const dimensions = [
  ["Demand", "20%", "Evidence that buyers are actively looking for or responding to the idea."],
  ["Trend Momentum", "15%", "Whether the signal is strengthening across the observed period."],
  ["Repeatability", "15%", "Potential to extend the concept into a repeatable product family."],
  ["Customization", "15%", "How naturally the opportunity supports personalization or variants."],
  ["Product Fit", "15%", "Alignment with the business, production model, and product catalog."],
  ["Competition Gap", "10%", "Room to differentiate rather than simply follow a crowded market."],
  ["Confidence", "10%", "Strength and consistency of the evidence behind the recommendation."],
  ["Saturation Risk", "−10%", "A penalty when strong demand is paired with excessive competition."],
] as const;

export default function CaseStudy() {
  return (
    <div>
      <div className="topbar">
        <span className="eyebrow">RAYDAR / CASE STUDY</span>
        <span className="statusDot">Public portfolio case study</span>
      </div>

      <section className="hero">
        <div>
          <span className="eyebrow">FROM MARKET SIGNALS TO PRODUCT DECISIONS</span>
          <h1>From market noise to<br/><em>product decisions.</em></h1>
          <p>
            Raydar is an AI-assisted commerce intelligence system designed to turn fragmented trend,
            market, and product evidence into structured, explainable decisions.
          </p>
          <div style={{display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"20px"}}>
            <Link className="cta" href="/">Open the demo →</Link>
            <a className="cta" href="https://github.com/rbeecham1076/raydar-demo" target="_blank" rel="noreferrer">View GitHub →</a>
          </div>
        </div>
        <div className="principle">
          <span>CORE PRINCIPLE</span>
          <strong>Code calculates.<br/>AI interprets.<br/>Humans decide.</strong>
        </div>
      </section>

      <div className="grid2">
        <Card>
          <span className="eyebrow">01 / THE PROBLEM</span>
          <h2>More information was not the answer.</h2>
          <p className="muted">
            Running a digital product business creates a constant stream of trend signals, competitor
            observations, seasonal timing, product ideas, and performance data. The real bottleneck was
            turning those scattered inputs into a consistent decision about what deserved production time.
          </p>
        </Card>
        <Card>
          <span className="eyebrow">02 / THE PRODUCT</span>
          <h2>A decision system, not a trend dashboard.</h2>
          <p className="muted">
            Raydar structures evidence, scores opportunities with deterministic logic, surfaces the reasoning
            behind the score, and then moves owner-approved opportunities through a product workflow from
            research to launch and performance review.
          </p>
        </Card>
      </div>

      <Card>
        <span className="eyebrow">03 / WORKFLOW</span>
        <h2>One continuous decision loop.</h2>
        <div className="stageRow" style={{marginTop:"20px"}}>
          {[
            "SIGNALS",
            "EVIDENCE",
            "SCORING",
            "INTERPRETATION",
            "HUMAN DECISION",
            "PIPELINE",
            "LAUNCH",
            "LEARNING",
          ].map((stage, index) => (
            <div key={stage}><b>{String(index + 1).padStart(2,"0")}</b><span>{stage}</span></div>
          ))}
        </div>
      </Card>

      <div className="grid2">
        <Card>
          <span className="eyebrow">04 / ARCHITECTURE</span>
          <h2>Deterministic where it should be.</h2>
          <p className="muted">
            Numerical scoring is handled by code rather than an LLM. That keeps recommendations reproducible,
            inspectable, and easier to debug. AI belongs at the interpretation layer: summarizing evidence,
            identifying patterns, and helping a person understand why an opportunity may matter.
          </p>
        </Card>
        <Card>
          <span className="eyebrow">05 / HUMAN-IN-THE-LOOP</span>
          <h2>The model does not get the final vote.</h2>
          <p className="muted">
            Raydar intentionally separates assistance from authority. The system can organize, compare, score,
            and recommend. A human owner still decides whether an opportunity moves forward, changes direction,
            or gets rejected.
          </p>
        </Card>
      </div>

      <Card>
        <span className="eyebrow">06 / SCORING MODEL</span>
        <div className="cardHead">
          <div><h2>Explainable opportunity scoring</h2><p className="muted">Dimensions are scored 0–100 before weighting.</p></div>
        </div>
        <div className="miniGrid" style={{marginTop:"18px"}}>
          {dimensions.map(([name, weight, description]) => (
            <div key={name} style={{alignItems:"flex-start"}}>
              <span>{name}</span>
              <b>{weight}</b>
              <p className="muted" style={{margin:"6px 0 0", fontSize:"0.82rem"}}>{description}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid2">
        <Card>
          <span className="eyebrow">07 / ENGINEERING</span>
          <h2>Built as a portfolio-safe public system.</h2>
          <p className="muted">
            The public demo is implemented with Next.js, TypeScript, React, Recharts, and Vercel. It uses
            synthetic and anonymized data, does not expose paid AI endpoints or credentials, and does not
            persist visitor actions.
          </p>
        </Card>
        <Card>
          <span className="eyebrow">08 / PRODUCT JUDGMENT</span>
          <h2>Private operations, public proof.</h2>
          <p className="muted">
            The production concept was developed for a real commerce workflow, but the public version was
            deliberately separated from private competitor intelligence, real sales records, and owner data.
            The goal is to demonstrate the system without compromising the business behind it.
          </p>
        </Card>
      </div>

      <Card>
        <span className="eyebrow">09 / WHAT I LEARNED</span>
        <h2>The hardest part of AI product design is deciding where AI should stop.</h2>
        <p className="muted">
          Raydar reinforced a principle I want to keep applying: useful automation is not measured by how much
          human judgment it removes. The better system is often the one that improves the quality, speed, and
          consistency of the decision while keeping accountability with the person making it.
        </p>
        <div style={{display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"20px"}}>
          <Link className="cta" href="/">Explore Raydar →</Link>
          <a className="cta" href="https://www.rachelbeecham.dev" target="_blank" rel="noreferrer">Back to portfolio →</a>
        </div>
      </Card>

      <p className="disclosure">
        Portfolio case study. Demonstration data is synthetic/anonymized and does not represent live business performance.
      </p>
    </div>
  );
}
