# Reverse-Engineered Research Questions

**Category**: Structure
**Necessity**: Recommended

## Problem

How to generate a comprehensive list of research questions for a topic?

Starting from scratch to design research questions is difficult—you don't know what you don't know. Abstract "concept decomposition" approaches (like 5W1H frameworks) provide guidance that is too generic and easily miss important angles. When a research system receives a broad topic, it's unclear what specific questions to investigate.

## Context

This pattern applies in the following scenarios:

- Need to generate comprehensive research questions before deep investigation
- The topic is broad and it's unclear where to start
- Want to ensure coverage of important angles
- Have access to existing reports, articles, or analyses on the topic
- Research involves a specific analytical stance or perspective

This pattern is particularly useful in **multi-stage research workflows**:
- Stage 1 produces an overview or initial report
- This pattern extracts research questions from the Stage 1 output
- Stage 2 investigates those questions in depth

## Forces

- **Completeness vs Focus**: Want comprehensive coverage but also need prioritization
- **Grounded vs Creative**: Questions should be grounded in real content but also identify blind spots
- **Objective vs Perspective-Driven**: Questions should cover objective facts but also reflect analytical stance
- **Efficiency vs Thoroughness**: Thorough analysis takes time but provides better coverage

## Solution

**Don't design questions from scratch. Find existing reports on the topic, reverse-engineer the questions they answer, then identify missing questions from your specific analytical stance.**

### Two-Phase Process

```
Seed Documents (existing reports/articles on the topic)
    ↓
【Phase 1: Reverse Engineering】
    → Read each section/paragraph carefully
    → Ask: "What question would need to be answered to produce this content?"
    → Output: List of inferred questions (Category A)
    ↓
【Phase 2: Gap Identification】
    → Apply your analytical stance/framework
    → Ask: "What important questions were NOT asked?"
    → Output: List of gap questions (Category B)
    ↓
Complete Research Question List (A + B)
```

### Core Mechanisms

1. **Seed Document Selection**
   - Find 1-3 existing analyses, reports, or articles on the topic
   - These don't need to be perfect—they provide anchoring points
   - Can be the output of a previous research stage (e.g., an overview)

2. **Reverse Engineering Technique**
   - Read the document sentence by sentence, paragraph by paragraph
   - For each piece of information, ask: "What research question would produce this?"
   - Consider both explicit claims and implicit assumptions
   - Infer overarching questions that guide the document's structure

3. **Analytical Stance Anchoring**
   - Define a specific perspective, framework, or set of concerns
   - Use this stance to critically assess what's missing
   - The stance provides direction for gap identification
   - Without a stance, gap identification becomes unfocused

4. **Two-Category Output**
   - **Category A**: Questions inferred from existing content (what WAS asked)
   - **Category B**: Gap questions from your stance (what SHOULD have been asked)
   - Both categories together provide comprehensive coverage

### Why This Works

| Approach | Problem |
|----------|---------|
| From-scratch brainstorming | Don't know what you don't know |
| Abstract frameworks (5W1H) | Too generic, no domain grounding |
| **Reverse engineering** | Grounded in real content, reveals actual coverage |
| **+ Analytical stance** | Provides direction for identifying gaps |

## Consequences

### Benefits

- **Grounded Questions**: Questions anchored in real content, not abstract speculation
- **Comprehensive Coverage**: Combines what exists with what's missing
- **Explicit Gaps**: Clearly identifies blind spots in existing analyses
- **Perspective-Driven**: Analytical stance ensures questions serve research goals
- **Reusable Process**: Can be applied to any topic with existing literature

### Liabilities

- **Requires Seed Documents**: Need existing material to reverse-engineer from
- **Quality Depends on Seeds**: Poor seed documents produce poor inferred questions
- **Stance Must Be Defined**: Gap identification requires clear analytical stance
- **Time Investment**: Thorough reverse-engineering takes significant effort

## Implementation Guidelines

### Integration with Multi-Stage Research

This pattern is typically used as a **bridge between research stages**:

```
┌─────────────────────────────────────────────────────────┐
│ Stage 1: Overview Generation                            │
│   Agent: Overview Researcher                            │
│   Output: Initial report on the topic                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Question Generation (This Pattern)                      │
│   Agent: Question Generator                             │
│   Input: Stage 1 report (as seed document)              │
│   Output: Research question list                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Stage 2: Deep Research                                  │
│   Agent: Deep Researcher (one per question or group)    │
│   Input: Questions from previous step                   │
│   Output: Detailed findings for each question           │
└─────────────────────────────────────────────────────────┘
```

### Specifying in Methodology

In user input (Analysis Methods section), describe the multi-stage approach:

```markdown
## Analysis Methods

This research uses a two-stage approach:

**Stage 1: Overview**
Generate an initial overview report covering the basic landscape of {topic}.

**Stage 2: Deep Research**
Apply STR-07 (Reverse-Engineered Research Questions) to the Stage 1 output:
- Reverse-engineer questions answered by the overview
- Identify gap questions from the perspective of {analytical stance}
- Use the resulting question list to guide deep research

**Analytical Stance**: {describe your perspective, framework, or concerns}
```

### Blueprint Template for Question Generator Agent

```markdown
# Question Generator

## Your Role

You are an Expert Analyst and Research Strategist. Your task is to analyze
an existing report and generate comprehensive research questions.

## Analytical Stance

{ANALYTICAL_STANCE}

[Describe the perspective, framework, or concerns that guide gap identification.
This is critical—without a clear stance, gap identification becomes unfocused.]

## Input

Read the seed document at: `{SEED_DOCUMENT_PATH}`

## Task Protocol

### Phase 1: Reverse Engineering

Read the input document carefully, section by section.

For each significant piece of content (finding, argument, data point, claim):
1. Identify what research question would need to be answered to produce this content
2. Consider both explicit statements and implicit assumptions
3. Note overarching questions that guide the document's structure

### Phase 2: Gap Identification

Drawing on your defined analytical stance, critically assess the document for:
- Significant omissions or silences
- Unexamined assumptions
- Angles that were not explored
- Questions that SHOULD have been asked from your perspective

Formulate new questions that address these gaps.

## Output Format

Write your output to: `{OUTPUT_PATH}`

Structure as follows:

```
# Research Questions for {TOPIC}

## Category A: Questions Inferred from Existing Content

[List questions that the seed document answers or addresses]

### {Thematic Group 1}
- Question 1
- Question 2
...

### {Thematic Group 2}
...

## Category B: Gap Questions (from {ANALYTICAL_STANCE} Perspective)

[List questions that SHOULD have been asked but weren't]

### {Gap Theme 1}
- Question 1
- Question 2
...

### {Gap Theme 2}
...
```

## Quality Standards

- Questions should be clear, specific, and unambiguous
- Questions should be analytical, not just factual recall
- Questions should be actionable for guiding research
- Category B questions must align with the defined analytical stance
```

### Choosing Seed Documents

| Seed Type | Pros | Cons |
|-----------|------|------|
| Stage 1 output (overview) | Fresh, relevant to your research | May have its own gaps |
| Published reports | Professional quality, comprehensive | May not match your focus |
| Academic papers | Rigorous methodology | May be too narrow |
| Multiple sources | Better coverage | More work to process |

**Recommendation**: For multi-stage research, use your Stage 1 output as the primary seed. Optionally supplement with 1-2 external sources for broader coverage.

### Defining Analytical Stance

The analytical stance is **critical** for Phase 2 (gap identification). Without it, you're just guessing what might be missing.

**Good stances are specific and actionable**:
- ✅ "From the perspective of small business owners affected by this policy"
- ✅ "Focusing on environmental sustainability impacts"
- ✅ "Through the lens of the ESSCC framework for state-owned enterprise functions"
- ❌ "A comprehensive perspective" (too vague)
- ❌ "Looking at everything important" (not actionable)

## Examples

### Example: Industry Research

**Seed Document**: Overview report on the electric vehicle industry in China

**Analytical Stance**: "From the perspective of evaluating state-owned enterprise policy functions in the industry"

**Category A (Inferred Questions)**:
- What is the current market size and growth rate of China's EV industry?
- Who are the major players and what are their market shares?
- What government subsidies and incentives exist for EV adoption?
- What is the state of charging infrastructure development?
- ...

**Category B (Gap Questions)**:
- How do state-owned enterprises fulfill the "stabilize macro economy" function in this industry?
- What strategic sectors within the EV supply chain are controlled by SOEs?
- How does SOE participation affect market competition dynamics?
- What public goods (infrastructure, standards) are SOEs providing?
- ...

### Example: Policy Analysis

**Seed Document**: Government white paper on digital transformation

**Analytical Stance**: "From the perspective of impact on small and medium enterprises"

**Category A (Inferred Questions)**:
- What are the stated goals of the digital transformation policy?
- What funding and support programs are announced?
- What regulatory changes are planned?
- ...

**Category B (Gap Questions)**:
- What barriers do SMEs face in adopting digital technologies?
- Are the support programs accessible to businesses with limited technical capacity?
- What is the expected cost burden on SMEs for compliance?
- How will digital transformation affect SME competitiveness against large firms?
- ...

## Related Patterns

- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: Seed documents may be stored as reference data
- **[Methodological Guidance](./STR-06-methodological-guidance.md)**: Multi-stage workflows using this pattern are described in methodology
- **[Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md)**: Question generation is a stage in the pipeline
- **[Progressive Data Refinement](./BHV-04-progressive-data-refinement.md)**: Questions drive the refinement from overview to deep research

## Checklist

When implementing this pattern:

- [ ] Seed document(s) identified and accessible?
- [ ] Analytical stance clearly defined (specific and actionable)?
- [ ] Blueprint includes both Phase 1 (reverse engineering) and Phase 2 (gap identification)?
- [ ] Output format distinguishes Category A and Category B questions?
- [ ] Questions are organized thematically for usability?
- [ ] Downstream stage knows how to consume the question list?

## Supersedes

This pattern supersedes the deprecated "Concept-to-Questions Decomposition" approach, which attempted to generate questions through abstract conceptualization. The reverse-engineering approach is more practical because:

1. It starts from concrete material, not abstract concepts
2. Reverse-engineering is cognitively easier than forward design
3. Gap identification has a reference point (the seed document)
4. The analytical stance provides focused direction
