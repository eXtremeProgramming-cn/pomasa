# Multi-Angle Collection

**Category**: Behavior
**Necessity**: Recommended

## Problem

How to ensure that collection covers the whole question, rather than whatever the first page of search results returns?

A collection agent given a confirmed question tends to search "the topic" and collect what comes back. Search engines rank results by dominant-narrative centrality, so a single-axis sweep systematically over-represents mainstream English-language coverage and under-represents everything else: historical background, quantitative grounding, official positions, expert disagreement, Global South media. The reserve ends up deep where the web is loud and silent where the question actually needs material.

The failure is invisible while it happens. Nothing marks which facets of the question received no material, so downstream analysis silently works from a biased reserve and renders confident conclusions from one slice of the evidence.

## Context

This pattern applies when:

- A research or analysis MAS collects information for a confirmed question (BHV-05 sets the per-source quality bar)
- The question spans facts and interpretation — most analytical questions do
- Coverage failures would distort the deliverable's conclusions

This pattern may be skipped when:

- The task is a narrow factual lookup with a single facet
- The run is an exploratory scan whose purpose is to surface whatever exists
- Speed matters more than coverage

## Forces

- **Breadth vs Depth**: every additional angle dilutes the effort available per angle
- **Structured vs Led**: decomposing angles costs planning; following search results wherever they lead is cheap but reproduces the search engine's bias
- **Completeness vs Focus**: some questions genuinely need only two angles; a mandatory full menu degenerates into ritual
- **Tailored vs Auditable**: freeform collection adapts to the question but cannot be checked; a fixed checklist can be checked but outlives its usefulness

## Solution

**Before collecting, decompose the confirmed question into named angles. Collect per angle, accept per angle, and keep gaps visible per angle.**

### The default angle skeleton

Decompose along four layers, each with default angles. The layers are the recommended default; the angles inside them are illustrative and expected to be tailored to the question.

| Layer | Default angles (illustrative) | Collection focus |
|-------|-------------------------------|------------------|
| **Facts** — what happened | Event/object overview; key data and statistics | Wire services, official statistics, primary documents |
| **Context** — how it got this way | Historical background; domain/technical knowledge; related research | Archives, standards and documentation, academic literature |
| **Reactions** — who says what | Official positions; media coverage across the stance spectrum; expert commentary | Government sites, outlets across the stance spectrum, think tanks |
| **Analysis** — what it means | Impact and outlook; power-and-interests analysis | Assessments, long-horizon commentary |

Tailoring rules:

- The four layers are a complete menu, not a mandatory checklist. Small tasks may collect only Facts and Reactions; an explicitly tailored cut is better than ritual completeness.
- Users are encouraged to define their own angles. Domain knowledge suggests angles that the defaults cannot (e.g. "supply chain exposure" for an industrial question).
- Cutting by **question layer** is the recommended default because it generalizes across topics and pre-structures downstream analysis. Cutting by **source type** (news / technical / policy / expert / data) is a valid variant, used by column-production systems; it trades generality for a directly checkable source mix.
- The angle table belongs in the methodology reference data (STR-06), so it can be adjusted without editing blueprints.

### Per-angle acceptance

Each angle carries its own acceptance line — a locally decided minimum (number of sources, or named must-have facts). Coverage is recorded per angle, for example as per-angle sections in the investigation report or per-angle excerpt sets with their own namespaces. An angle for which no material can be found after switching axes (language, outlet, framing, region — the reactive form of this same idea) is a **reported gap**, listed by name, never silence.

### Directed spectrum listening

Across the reserve — especially the Reactions layer — collect across the stance spectrum and annotate each source's stance. This is not neutral both-sidesism: which voices are sought, how they are weighted, and what counts as an outlier are decided by the system's declared ideological foundation (STR-10). Listen to all sides; weigh what you hear through the framework. Without the foundation, spectrum collection degenerates into balance-worship that re-centers the dominant narrative; without the spectrum, the foundation becomes a filter bubble and the analysis loses the contradiction material it needs.

### Language coverage

Cover every language relevant to the question — for international topics this includes Global South languages, not only English and the topic's own language. Movement and Global South outlets are buried by generic topic queries; search them by outlet name first, then fetch their pages directly.

## Consequences

### Benefits

- **Auditable coverage**: each angle's material and gaps are visible by name; a reviewer can check the reserve against the question instead of trusting the collection agent's impression
- **Structural de-biasing**: the dominant narrative loses its structural advantage because the first search page no longer defines the reserve's shape
- **Analysis pre-structured**: the angle table becomes the skeleton of the analysis; contradictions between angles surface early, as raw material rather than late surprises
- **Parallelizable**: angles are independent work units (one collection instance per angle, BHV-03; one dimension of the run axis, OBV-02)

### Liabilities

- **More queries, more time**: decomposed collection costs several times the queries of a single sweep
- **Ritual compliance risk**: agents may fill per-angle quotas with tangential sources; acceptance lines must demand relevance, not just counts
- **Maintenance**: angle tables need tailoring per question or per domain; a stale table silently narrows coverage
- **Amplified BHV-05 workload**: every angle's sources must be fetched and preserved in full

## Implementation Guidelines

### Blueprint language for a collection agent

```markdown
## Collection Angles

Collect per angle; do not mix angles in one sweep. The angle table lives in
references/methodology/research-overview.md — read it, tailor it to this
question (keep / cut / replace, note why), then work the angles in order.

For each angle:
1. Search with queries specific to this angle (relevant languages for the topic)
2. Fetch and preserve candidate sources per BHV-05 (verbatim, full text)
3. Save into this angle's namespace; register in the shared index; dedup against it
4. Record the stance of each source per the ideological foundation
5. Close the angle: sources collected vs acceptance line; if short, switch axes
   (language, outlet, framing, region) before reporting a gap

End with a per-angle coverage note: filled, thin (with what), or gap (after
which axes were tried).
```

### Where the defaults came from

This pattern is mined from three independently built systems that converged on the same structure: a news-commentary system organizing research into ten angles across the four layers above; a news-journal system investigating seven scopes that map onto the same layers; a column-production system running per-source-type collection quotas with per-category acceptance. The specific angle counts differed; the four layers and per-angle acceptance did not — which is why the layers are the pattern and the counts are local parameters.

## Examples

### Correct

```markdown
Question: "Does the recent Okinawa election result show Okinawans no longer
oppose US bases?"

Angles after tailoring:
- Facts: election date, turnout, results by district, party platforms
- Context: base-contestation history since 1995; Japan-US alliance structure
- Reactions: governor's office; OKINAWA TIMES / RYUKYU SHIMPO vs national
  dailies; US State Department statement; analysts on both sides
- Analysis: baseline-relocation politics; center-local government dynamics

Per-angle note (excerpt):
- Facts: 8 sources (2 official results pages, 6 reports) — filled
- Analysis: 2 sources, both from Tokyo think tanks — thin; switching axes
  (Japanese-language university repositories) before reporting gap
```

Each angle was searched with its own queries, each source fetched in full, and the thin angle is visible as thin — a reviewer can demand more or accept the gap knowingly.

### Incorrect

```markdown
❌ WRONG: single-sweep collection

Search("Okinawa election US bases")
→ collected 12 sources from the first result pages (8 international English
media, 3 aggregators, 1 wire item), all framing the result as a win for the
current government

Wrote the investigation from these 12 sources.

Problems:
1. Japanese-language local coverage — where the actual base debate lives —
   is absent by construction (it ranks below English coverage)
2. No historical angle: "no longer oppose" cannot be assessed without the
   baseline of prior polls and elections
3. No reaction angle: neither the governor's office nor base-opposition
   groups were sought out
4. Nothing records that context and analysis were never attempted — the
   bias is structural and invisible
```

## Quality Level Integration

| Quality Level | Multi-Angle Collection Requirement |
|--------------|-------------------------------------|
| **Simple** | Optional — single-sweep collection acceptable |
| **Standard** | Recommended — tailor the skeleton, collect per angle, report gaps |
| **Strict** | Required — per-angle acceptance lines enforced; gap report mandatory; spectrum listening per STR-10 verified in QA (QUA-02) |

## Related Patterns

- **[Grounded Web Research](./BHV-05-grounded-web-research.md)**: governs how each source is captured (verbatim, full text); this pattern governs which sources are sought. Orthogonal and always co-applied
- **[Ideological Foundation](./STR-10-ideological-foundation.md)**: directs spectrum listening — the stance spectrum is worked through the declared framework, not around it
- **[Reverse-Engineered Research Questions](./STR-07-reverse-engineered-research-questions.md)**: design-time counterpart; its generated question list can be grouped into angles for collection
- **[Methodological Guidance](./STR-06-methodological-guidance.md)**: the angle table and acceptance lines live in the methodology reference data
- **[Parallel Instance Execution](./BHV-03-parallel-instance-execution.md)**: one instance per angle is the natural parallelization
- **[Work Unit Declaration](./OBV-02-work-unit-declaration.md)**: angles form the dimensions of a multi-instance run axis

## Checklist

When designing collection for a research question, confirm:

- [ ] Angles were named and tailored (kept / cut / replaced, with reasons) before collection started?
- [ ] Every default layer was explicitly considered, not silently dropped?
- [ ] Each angle has its own acceptance line demanding relevance, not just counts?
- [ ] Each source's stance is annotated and weighed through the declared ideological foundation?
- [ ] All languages relevant to the question are covered, including Global South languages?
- [ ] Movement / Global South outlets were sought by name, not only via topic queries?
- [ ] Short angles went through axis switching before being reported as gaps?
- [ ] The final coverage note lists every angle as filled, thin, or gap?
