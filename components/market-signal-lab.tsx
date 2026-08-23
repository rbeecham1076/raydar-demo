"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

const signalSets = [
  {
    label: "Sports",
    accent: "pink",
    score: 93,
    confidence: 97,
    momentum: 98,
    note: "Personalized mascot + game-day signals are accelerating across multiple source types.",
    bars: [62, 74, 69, 81, 88, 93, 98],
  },
  {
    label: "Teacher",
    accent: "orange",
    score: 88,
    confidence: 91,
    momentum: 86,
    note: "Back-to-school demand remains strong, but generic teacher graphics are more saturated.",
    bars: [55, 63, 72, 79, 82, 84, 86],
  },
  {
    label: "Lifestyle",
    accent: "aqua",
    score: 81,
    confidence: 86,
    momentum: 83,
    note: "Club-language and leisure motifs are gaining steadily with useful whitespace in niche themes.",
    bars: [48, 57, 61, 66, 72, 78, 83],
  },
  {
    label: "Seasonal",
    accent: "peri",
    score: 86,
    confidence: 90,
    momentum: 82,
    note: "Holiday demand is appearing earlier, making timing and launch readiness unusually important.",
    bars: [41, 49, 58, 67, 73, 79, 82],
  },
] as const;

export function MarketSignalLab() {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(true);
  const data = signalSets[active];
  const max = useMemo(() => Math.max(...data.bars), [data]);

  return (
    <section className={`signalLab signalLab--${data.accent}`} aria-label="Interactive market signal explorer">
      <div className="signalLab__tape" aria-hidden="true">
        <span>LIVE SIGNAL LAB</span><span>LIVE SIGNAL LAB</span><span>LIVE SIGNAL LAB</span><span>LIVE SIGNAL LAB</span>
      </div>

      <div className="signalLab__head">
        <div>
          <span className="eyebrow">INTERACTIVE MARKET PULSE</span>
          <h2>Touch the signal mix.</h2>
          <p>Switch categories to see how momentum, confidence, and opportunity priority shift together.</p>
        </div>
        <button className={`signalLab__live ${live ? "is-live" : ""}`} type="button" onClick={() => setLive(v => !v)} aria-pressed={live}>
          <Zap size={15}/>{live ? "Motion on" : "Motion paused"}
        </button>
      </div>

      <div className="signalLab__tabs" role="tablist" aria-label="Market categories">
        {signalSets.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "is-active" : ""}
            key={item.label}
            onClick={() => setActive(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="signalLab__body">
        <div className="signalLab__visual">
          <div className={`signalLab__orbit ${live ? "is-moving" : ""}`} aria-hidden="true">
            <i/><i/><i/>
            <div className="signalLab__core"><Sparkles size={20}/><strong>{data.score}</strong><span>OPPORTUNITY</span></div>
          </div>
          <div className="signalLab__bars" aria-label={`${data.label} signal momentum over seven periods`}>
            {data.bars.map((bar, i) => (
              <span key={i} style={{ height: `${Math.max(24, (bar / max) * 100)}%` }}><em>{bar}</em></span>
            ))}
          </div>
        </div>

        <div className="signalLab__readout" aria-live="polite">
          <div className="signalLab__category"><span>Selected signal</span><strong>{data.label}</strong></div>
          <div className="signalLab__metric"><span>Momentum</span><b>{data.momentum}</b><i style={{width:`${data.momentum}%`}}/></div>
          <div className="signalLab__metric"><span>Confidence</span><b>{data.confidence}</b><i style={{width:`${data.confidence}%`}}/></div>
          <p>{data.note}</p>
          <a href="/opportunities">See ranked opportunities <ArrowUpRight size={15}/></a>
        </div>
      </div>
    </section>
  );
}
