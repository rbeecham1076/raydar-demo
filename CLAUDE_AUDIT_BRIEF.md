# Claude Audit Brief — Raydar

## Purpose
Audit the existing Raydar implementation against the settled product rules. This is not a strategy, redesign, re-research, or product-planning task.

Use `RAYDAR_PRODUCT_RULES.md` as the product source of truth and follow the supplied Claude master operating rules: preserve working architecture, make surgical edits only when required, reuse existing patterns, run proportionate verification, do not invent results, and stop when acceptance criteria are satisfied.

## Required audit scope
Start with these files and their direct dependencies only:
- `RAYDAR_PRODUCT_RULES.md`
- `lib/types.ts`
- `lib/product-policy.ts`
- `lib/font-intelligence.ts`
- `data/design-intelligence.ts`
- `data/inspiration-taxonomy.ts`
- `data/design-qa.ts`
- Opportunity/detail UI that renders design directions and approval actions
- Weekly command-center implementation

Expand only when evidence from those files requires it.

## Acceptance criteria to verify
1. Market Opportunity and Brand Fit remain separate signals; taste/inspiration must not alter Market Opportunity.
2. Every qualified opportunity produces exactly three directions: Best Bet, Trend Forward, Wildcard.
3. Each pair of directions differs meaningfully across at least four visual dimensions; recolors do not count as distinct concepts.
4. Phrase intelligence supports KEEP / REVISE / AVOID and permits no-text when appropriate.
5. Collection logic respects the 70/30 shared-DNA rule and 3–6 design target.
6. Font recommendations use owned-font metadata with Hero / Supporting / Accent roles and repetition control.
7. Private inspiration contributes palette/pattern/texture/illustration/composition/merchandising attributes only; it has 0% opportunity-score weight and no source copying.
8. Product Expansion Map, scalable customization opportunities, cannibalization guidance, trend lifecycle, and seasonal selling-window timing are represented correctly.
9. Human-in-the-loop flow remains: select direction → approve for build → production brief/prompt → separate Generate Artwork action → artwork QA → listing package.
10. Production brief includes palette hex values, pattern/texture, graphic elements, digitally hand-drawn illustration direction, typography/font roles, composition, rationale, avoid-list, and image-generation prompt targeting 4500×5400, 300 DPI, transparent PNG.
11. Weekly command center supports Build / Watch / Refresh-Rework / Scale / Retire-Hold / Skip and optimizes overall shop growth rather than one score only.
12. Public demo uses synthetic/sanitized data and does not expose private inspiration, proprietary competitor research, private analytics, credentials, or learned private-preference history.
13. Existing visible UI remains functional; buttons/actions should not be dead controls.
14. Run the smallest meaningful verification first (targeted tests/type-check/lint/build as warranted). Report exactly what ran and what passed/failed.

## Existing QA helper
`data/design-qa.ts` contains five deliberately different scenarios (sports/custom, teacher, coastal lifestyle, holiday, trend-led lifestyle) and checks direction differentiation, hero-font collapse, exactly-three-directions behavior, and Market Opportunity score integrity. Use or extend it only if needed for meaningful verification.

## Critical privacy finding to resolve
The public repository currently contains a real `Design Trends Inspo/` directory with source JPG/PNG files. `data/inspiration-library.ts` also contains direct raw GitHub URLs and filenames for those real private references. The current public `/inspiration` page itself uses generalized/generated catalog examples and does not need those source files.

This conflicts with the public-demo boundary in `RAYDAR_PRODUCT_RULES.md`. Treat removal of current-public references as a required privacy fix. Do not replace them with another copy of the private source material. Preserve only generalized taxonomy/demo data. Note that deleting files from the current tree does not erase them from Git history; report that distinction accurately and recommend history cleanup only if true purge is required.

## Security checks
- Confirm no committed real `.env`, API keys, tokens, passwords, private keys, credentials, analytics exports, or private store data.
- `.env.example` should remain placeholder/documentation only.
- Confirm `.gitignore` protects `.env*` except `.env.example`.
- Check for public raw links or imports that expose private inspiration assets.

## Do not do
- Do not redesign Raydar.
- Do not re-decide product rules.
- Do not add speculative features.
- Do not broadly refactor or reorganize working code.
- Do not replace real private logic with fake production behavior.
- Do not expose or duplicate private source inspiration.
- Do not claim verification passed unless it actually ran and passed.

## Final report format
Return only:
1. Critical findings fixed
2. Other findings fixed
3. Verification performed and exact results
4. Genuine remaining blockers/gaps, if any
5. Files changed

If the implementation already satisfies an item, leave it alone.
