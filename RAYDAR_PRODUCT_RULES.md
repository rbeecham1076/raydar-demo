# Raydar Product Rules

This file is the product source of truth for implementation and audit. Do not reopen these decisions unless the codebase creates a concrete conflict.

## 1. Decision philosophy

Raydar is a human-in-the-loop commerce intelligence and design decision system. It recommends, explains, prepares, and learns. The human controls approval and generation.

Market opportunity and brand fit are separate. A commercially strong idea must not be rejected solely because it falls outside the current visual language. Low brand fit produces adaptation guidance.

## 2. Opportunity scoring

- Market Opportunity uses the deterministic score in `lib/scoring.ts`.
- Saturation remains a penalty, not an automatic veto.
- Brand Fit is advisory and never changes Market Opportunity.
- Private inspiration has **0% weight** in Market Opportunity. Inspiration influences art direction only.

## 3. Three required directions

Every qualified opportunity receives exactly three directions:

1. **Best Bet** — strongest balance of commercial familiarity, differentiation, production fit, and evidence.
2. **Trend Forward** — more emerging, editorial, fashion-led, or visually current.
3. **Wildcard** — more original and experimental while remaining buyer-readable and commercially usable.

The three directions must differ meaningfully across at least **4 of 6** dimensions: palette, pattern/texture, illustration, typography, composition, and phrase treatment. Three recolors of one composition do not satisfy this requirement.

## 4. Phrase intelligence

Raydar may KEEP, REVISE, or AVOID wording.

- Saturation >= 60: AVOID the current phrase structure.
- Saturation >= 38: REVISE wording.
- Demand < 74: REVISE for specificity or emotional pull.
- Otherwise: KEEP is allowed.
- Raydar may recommend **no text** when illustration-led art is stronger.

## 5. Collections

- Collection Fit >= 80 can trigger a collection recommendation.
- Preferred mini-collection size: **3–6 designs**.
- Group using buyer, season, category, motif, launch window, or merchandising use.
- A collection should feel related, not duplicated. Do not repeat the exact palette, composition, or hero font on every design.

## 6. Font intelligence

The private operating system uses Rachel's font inventory as a recommendation library.

- Recommend actual font family/style names when available.
- Assign clear roles: hero, supporting, accent.
- Track usage across the most recent 10 unrelated designs.
- Penalize a hero font once it appears in 3 of the last 10 unrelated designs.
- Intentional collection consistency may override repetition penalties.
- Public website/UI usage must separately respect web availability/licensing; owning a desktop font does not automatically permit web embedding.

## 7. Inspiration

Private inspiration is a visual intelligence input, not an opportunity-scoring input.

Use it to identify palette, surface, texture, typography character, motif scale, composition, hierarchy, and merchandising energy. Never copy a source composition. Public demo examples must be generalized/generated and must not expose the real private inspiration archive.

## 8. Approval and revision flow

Required interaction path:

Research → Opportunity → score → 3 directions → human selects direction → Approve for Build → production recipe → generation prompt → **Generate Artwork** → artwork review → listing package → publish → performance learning.

Approval does **not** automatically generate art.

Required controls:
- Select Direction
- Approve for Build
- Regenerate Directions
- Revise Selected Direction
- Generate Artwork

The public demo may simulate Generate Artwork, but the control must visibly work.

## 9. Approved production recipe

Every approved direction must contain:

- colorway name
- palette with visible swatches and exact hex values
- pattern and/or texture
- graphic elements
- digitally hand-drawn illustration direction
- specific font roles when the font catalog is available
- typography hierarchy
- composition/layout
- rationale
- explicit avoid-list
- ready-to-copy image-generation prompt

Output target:
- 4500 × 5400 px
- 300 DPI
- transparent PNG
- print-ready
- isolated artwork only
- no model, garment, mockup, scene, or colored background

## 10. Artwork review gate

Artwork does not automatically advance to listing. Raydar should check:

- adherence to approved brief
- palette adherence
- transparent background
- expected dimensions/output specification
- typography legibility
- composition quality
- clean edges
- unwanted artifacts
- originality / avoidance of source copying

The human makes the final pass/revise decision.

## 11. Listing package

After artwork approval, Raydar prepares:

- Etsy title
- 13 Etsy tags
- description
- alt text
- thumbnail/mockup direction
- bundle ideas
- cross-sells
- Pinterest title
- Pinterest description
- social caption
- Etsy ad-group suggestion

Publishing remains human-controlled unless explicitly changed later.

## 12. Performance learning

Primary learning inputs include conversion, orders, revenue, ROAS, and sufficient traffic/sample size. CTR, favorites, add-to-cart, and time-to-first-sale should be incorporated when production integrations provide them.

Default decision rules:

- **SCALE:** conversion >= 4% and ROAS >= 4.
- **TEST:** insufficient sample, or results are between clear scale/hold thresholds.
- **HOLD:** conversion < 2% or ROAS < 1.5 once there is at least ~300 listing visits or 10 orders of evidence.
- **RETIRE:** conversion < 1% after at least ~500 listing visits or 20 orders of evidence, unless the design has a deliberate strategic/collection role.

These thresholds are operational defaults, not universal market facts; the private system may tune them as real store data accumulates.

## 13. Public demo boundary

The public portfolio demo may use synthetic/sanitized opportunity, signal, pipeline, and performance data. It must not expose:

- real private inspiration files
- proprietary competitor screenshots/research
- private store/business performance data
- credentials or private integrations

However, the public demo should demonstrate the complete workflow with functional interactions wherever safe.

## 14. Definition of done for the next audit

Claude's next pass is an **audit and verification pass**, not a product-planning exercise. It should compare implementation to this file and the master Claude operating rules, make only necessary surgical fixes, run appropriate tests/lint/build, and report remaining genuine gaps without reopening settled product decisions.
