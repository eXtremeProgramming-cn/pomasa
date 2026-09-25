# Ideological Foundation

**Category**: Structure
**Necessity**: Recommended

## Problem

How to keep an analytical system's collection, grading, and interpretation from silently adopting the dominant stance?

LLM agents inherit the stance distribution of their training data. For humanities and social-science research this is not a neutral default. Framing choices (whose action is "stabilizing" and whose is "provocative", which armed group is "militant" and which is "terrorist"), source credibility weighting, and what reads as a reasonable conclusion all drift toward the dominant narrative unless something holds them in place. Because the drift arrives through the model rather than through any file, it is invisible: no blueprint says "be Western-centric", yet the system's outputs read that way. Worse, in a multi-agent system each agent improvises its own undeclared stance, so the same source gets graded differently by the collector, the analyst, and the writer.

An undeclared stance is not the absence of ideology — it is ideology without auditability.

## Context

This pattern applies when:

- The system produces analysis, commentary, or research with an evaluative dimension
- The operating organization has a known political or methodological standpoint
- Multiple agents judge sources, frame narratives, or draw conclusions
- The deliverable's audience includes parties who would reasonably ask "from where?"

This pattern may be skipped when:

- The system has no interpretive judgment to make (pure extraction, ETL, log analysis)
- All evaluative moves are deferred to a human who reads every source directly

## Forces

- **Explicit vs Implicit**: declaring a stance costs discomfort and invites disagreement; not declaring it does not remove the stance, it only removes the audit trail
- **Consistency vs Improvisation**: a shared framework makes grading reproducible across agents; per-agent improvisation makes the system's judgment unpredictable
- **Commitment vs Openness**: the framework directs listening and weighting; applied as a pre-filter it becomes a filter bubble that destroys the evidence base
- **Universality of the pattern vs Particularity of frameworks**: the pattern is the declaration-and-binding move; the frameworks themselves differ by organization by design

## Solution

**Declare the organization's ideological / critical framework as first-class reference data, bind it into every agent that collects, grades, or interprets, and apply it critically across the stance spectrum — listen to all sides, weigh what you hear through the framework.**

### Core mechanisms

1. **One framework, versioned as reference data** (STR-01 family, as a component of STR-06 methodology). The framework states: the organization's standpoint and analytical tradition; how sources are graded (see mechanism 2); which framings are rejected as ideologically loaded and with what to replace them; what the tradition considers the driving forces in the domain.

2. **Two-axis source grading**. Grade every source on credibility tier (institutional reliability) AND standpoint (where it stands relative to the conflict being studied). The two axes are orthogonal: a low-tier partisan source can carry irreplaceable eyewitness material; a high-tier establishment source can carry the era's dominant distortions. Standpoint is recorded wherever the source is registered, so downstream agents weigh evidence through it.

3. **Bound at three points, differently**:
   - **At collection**: agents annotate stance and potential bias on what they capture, but do not pre-filter — over-filtering would destroy the reactions layer before analysis ever sees it (see BHV-09's directed spectrum listening)
   - **At analysis**: interpretive moves run through the framework explicitly; contradictions between sources and framework stay visible as raw material for the user's judgment, not smoothed away
   - **At writing**: conclusions carry the framework's standpoint openly and are labeled as the system's own judgment

4. **Default instantiation**. Use [kritik](https://extremeprogramming-cn.github.io/kritik/) — the Marxist critical framework with two-axis source grading (KR-01…KR-07) — as the default framework, the same way the knowledge-engineering skill does. Other organizations should treat kritik as a reference model and formulate their own framework to fit their politics; the pattern requires *a* declared foundation, not *this* one.

### Why "across the spectrum, through the framework"

The two halves of the solution need each other. Spectrum collection without a foundation has no scale to weigh voices with and collapses into balance-worship that re-centers whoever is loudest. A foundation without spectrum collection curates its own evidence and mistakes the resulting echo for confirmation. Directed listening — 兼听则明, heard critically through a declared framework — is the workable middle: the framework decides what hearing *means*, the spectrum guarantees there is something to hear.

## Consequences

### Benefits

- **Reproducible judgment**: all agents grade and frame from the same declared scale; disagreements become checkable against the framework rather than unexplainable
- **Auditable interpretation**: a reviewer can ask "which framework, which move" of any interpretive claim — the stance has an audit trail
- **Stance as parameter**: changing the framework file changes system behavior across all agents, with no blueprint edits (STR-01)
- **Contradictions preserved**: because the framework is applied at interpretation and not at collection, dissonant evidence survives to reach the user

### Liabilities

- **Maintenance**: a framework is domain knowledge that must be kept current like any reference data
- **Over-filtering risk**: badly written framework rules ("never use X media") collapse spectrum listening into a filter bubble; rules should direct weighing, not forbid hearing
- **Performative compliance risk**: agents may annotate stances mechanically without letting them affect weighing; QA (QUA-02) should probe interpretive moves, not annotation counts
- **Contested by design**: an explicit foundation invites disagreement. That is the cost of auditability, and it is preferable to silent drift

## Implementation Guidelines

### Collection agent binding (excerpt)

```markdown
### Ideological Foundation (internal use)

Read references/domain/kritik/ before collecting. Use it to:
- Identify stance and ideologically charged terminology in materials
  (annotate them; do not purge them)
- Avoid collecting material that is obviously distorted — but do not
  over-filter: include different perspectives and annotate their stance
- Grade every source on tier AND standpoint per KR-07
Never explicitly reference the framework in your output; it shapes your
judgment, the deliverable presents the judgment.
```

### Where the experience comes from

This pattern is mined from systems that each declared a foundation and bound it end to end: a news-commentary system embedding the kritik corpus as domain reference with two-axis grading on every excerpt; a news-journal system carrying Marxist analysis frameworks as reference data plus stance scores on media sources and orchestrator-locked writing angles; a column-production system fixing the column's political orientation in its context file that every agent reads first; and the knowledge-engineering skill making the framework its second pillar, loaded before any analysis. The frameworks differ in formulation; the declaration-and-binding move is identical.

## Examples

### Correct

```markdown
Excerpt record (collector):
  [M-G-014] "Governor opposes relocation, cites accident record"
  Source: SRC-G-007 (local daily, credibility: medium-high,
  standpoint: base-critical, annotated)
  Relevance: contradicts the national dailies' "consensus" framing;
  keep for the reactions layer's spectrum

Analyst note:
  Read through KR-01: the "consensus" framing treats the state's base
  policy as exogenous. The governor's stance is not an anomaly to explain
  away but a data point about center-local contradiction. Both framings
  go to the user, marked as such.
```

### Incorrect

```markdown
❌ WRONG: silent drift

Collector grabs 12 sources, all English-language establishment coverage.
No stance is recorded — "news sources" are treated as neutral.
The analyst, never given a framework, describes base opponents as
"activists" and the alliance as "stability" — the training distribution's
framings, reproduced as fact. A reviewer asking "from where?" gets no
answer, because there is no *where* on file.

Problems:
1. No declared framework → each agent improvised one from the training
   distribution, and they will not match each other
2. No standpoint axis → credibility tier was mistaken for neutrality
3. Spectrum missing at collection → the analyst had nothing to weigh
   against, and none of this is visible as a defect
```

## Quality Level Integration

| Quality Level | Ideological Foundation Requirement |
|--------------|-------------------------------------|
| **Simple** | Not applicable |
| **Standard** | Recommended — declare a framework, record standpoint alongside tier |
| **Strict** | Required — framework bound at all three points; QUA-02 verifies interpretive moves against it |

## Related Patterns

- **[Methodological Guidance](./STR-06-methodological-guidance.md)**: the foundation is the evaluative component of the methodology reference data; STR-06 says agents need declared methods, this pattern says one of them is the stance
- **[Multi-Angle Collection](./BHV-09-multi-angle-collection.md)**: directs its spectrum listening; the reactions layer's across-spectrum requirement is worked through this foundation
- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: where the framework lives and how it is versioned
- **[Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md)**: standpoint annotations join the lineage, so every interpretive claim traces to graded sources
- **[Layered Quality Assurance](./QUA-02-layered-quality-assurance.md)**: QA layers verify the framework is applied at interpretation, not merely cited

## Checklist

When building a system with an evaluative dimension, confirm:

- [ ] A framework is declared in reference data — not implied, not per-agent?
- [ ] It states the standpoint, the grading rule, rejected framings with replacements, and driving forces?
- [ ] Every collecting agent annotates stance and bias without pre-filtering?
- [ ] Every source carries tier AND standpoint after grading?
- [ ] Analysis agents interpret through the framework, with contradictions kept visible?
- [ ] Spectrum collection is present — the framework weighs voices, it does not forbid hearing them?
- [ ] Deliverables label conclusions as the system's own judgment?
- [ ] QA probes interpretive moves against the framework, not annotation counts?
