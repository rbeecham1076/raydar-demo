# Raydar

An AI-assisted commerce intelligence and product decision system that transforms market signals, product evidence, and trend data into scored opportunities and evidence-backed recommendations.

**Code calculates. AI interprets. Humans decide.**

## Explore

- Live demo: https://raydar-demo.vercel.app
- In-app case study: https://raydar-demo.vercel.app/case-study
- Portfolio case study: https://www.rachelbeecham.dev/raydar.html

## Public demo

This repository is the portfolio-safe Raydar demo. It uses synthetic, anonymized data and deterministic scoring. It does not expose private competitor intelligence, real sales records, credentials, owner data, or paid AI endpoints.

## Product workflow

Market Signals → Structured Evidence → Trend Intelligence → Opportunity Scoring → AI Interpretation → Human Decision → Product Workflow → Launch → Performance → Learning

## Stack

- Next.js
- TypeScript
- React
- Recharts
- Lucide icons
- CSS
- Vercel

## Scoring

Dimensions are scored 0–100.

- Demand: 20%
- Trend Momentum: 15%
- Repeatability: 15%
- Customization Potential: 15%
- Product Fit: 15%
- Competition Gap: 10%
- Confidence: 10%
- Saturation penalty: Saturation Risk × 0.10

Recommendation thresholds:

- 90–100 BUILD NOW
- 80–89 TEST
- 70–79 WATCH
- 55–69 HOLD
- 0–54 DEPRIORITIZE

`SCALE` is reserved for post-launch performance validation.

## Product and AI boundary

Raydar intentionally separates calculation, interpretation, and authority:

1. Code applies explicit scoring logic.
2. AI can summarize evidence and explain patterns.
3. A human owner makes the final product decision.

This keeps numerical recommendations reproducible while using AI where contextual interpretation is most useful.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Privacy boundary

The public demo contains only sanitized or synthetic material. The private SRD operating environment uses the same product language and UI direction while retaining real data, persistence, workflows, integrations, and owner actions.

## Limitations

The public demo does not make paid live LLM calls and does not persist visitor actions. Synthetic metrics illustrate product workflows and are not presented as live business results.
