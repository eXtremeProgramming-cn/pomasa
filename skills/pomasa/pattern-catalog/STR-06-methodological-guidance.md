# Methodological Guidance

**Category**: Structure
**Necessity**: Required

## Problem

How to ensure AI Agents execute tasks according to correct methodology?

Domain knowledge tells Agents "what is", but not "how to do it". Agents need methodological guidance to know: where data comes from, how to assess credibility, what methods to use for analysis, and what format to output. If this information is missing or implicit in the Blueprint, it leads to:

- Inconsistent data quality (not knowing which sources are credible)
- Insufficient analysis depth (not knowing which questions to answer)
- Inconsistent output formats (each Agent decides format independently)
- Difficulty adjusting methodology (requiring modifications to multiple Blueprints)

## Context

This pattern applies in the following scenarios:

- System needs to execute tasks with clear methodology (e.g., academic research, data analysis)
- Multiple Agents need to follow unified methods and standards
- Methodology may need to be adjusted independently of Agent logic
- Domain experts need to be able to review and improve methodology

## Forces

- **Specific vs Flexible**: Too specific limits Agent flexibility, too flexible leads to inconsistent execution
- **Complete vs Concise**: Complete guides are lengthy, concise ones may miss key points
- **General vs Specialized**: General methods have broad applicability, specialized methods are more precise
- **Standardized vs Innovative**: Strict standards ensure consistency but may inhibit innovation

## Solution

**Externalize methodological guidance as independent configuration files, managed separately from domain knowledge. Methodology files should be specific enough to be executable, including explicit checklists.**

### Five Components of Methodological Guidance

```
Methodological Guidance:
├── Research Overview (research-overview)
│   ├── Research Objectives: What questions to answer
│   ├── Research Scope: Where the boundaries are
│   ├── Research Stance: Value orientation and principles
│   └── Core Questions: Specific list of questions to answer
│
├── Data Sources Guide (data-sources)
│   ├── Source Types: What types of data sources
│   ├── Credibility Ratings: Credibility of each source type
│   ├── Sources to Use Cautiously: Sources to avoid
│   └── Recording Format: Standard format for data records
│
├── Analysis Methods Guide (analysis-methods)
│   ├── Analysis Framework: What framework to use for analysis
│   ├── Core Questions: Questions to answer at each analysis point
│   ├── Analysis Process: Specific steps
│   └── Results Format: Storage format for analysis results
│
├── Estimation Methods Guide (estimation-methods)
│   ├── Acceptability Criteria: When estimation is permitted
│   ├── Method Validity Checks: Logical premise validation before calculating
│   ├── Anchor Consistency Check: Cross-checking against directly observed data
│   └── Confidence Tier Classification: Labeling derived results by reliability
│
└── Output Template (output-template)
    ├── Document Structure: Chapter arrangement
    ├── Format Specifications: Headings, citations, lists, etc.
    ├── Writing Style: Language style requirements
    └── Quality Checklist: Items to check before delivery
```

### Detailed Content for Each Component

#### 1. Research Overview (research-overview.md)

```markdown
# Research Overview

## Research Topic
[Brief description of what is being researched]

## Core Research Questions
1. [Question 1]: [Specific description]
2. [Question 2]: [Specific description]
3. [Question 3]: [Specific description]
...

## Research Scope
- Includes: [Explicitly included content]
- Excludes: [Explicitly excluded content]

## Research Stance
[Declare research value orientation, objectivity requirements, etc.]

## Input Parameters
[Explain what parameters the system accepts]
```

#### 2. Data Sources Guide (data-sources.md)

```markdown
# Data Sources Guide

## Data Source Types

### 1. [Source Type A]
- Description: [What this type of source is]
- Priority: [High/Medium/Low]
- Credibility: [High/Medium-High/Medium/Low]
- Examples: [Specific examples]

### 2. [Source Type B]
...

## Sources to Use Cautiously
- [Source type to avoid 1]: [Reason]
- [Source type to avoid 2]: [Reason]

## Data Recording Format

Each data record should include:
- Title
- Source Type
- Source URL
- Collection Time
- Publication Time
- Related Analysis Point
- Core Content Summary
- Key Quotes from Original Text
- Credibility Assessment
- Notes
```

#### 3. Analysis Methods Guide (analysis-methods.md)

```markdown
# Analysis Methods Guide

## Analysis Framework
[What theoretical framework or analysis model to use]

## Core Questions
For each analysis point, need to answer:
1. [Question 1]: [Analysis points]
2. [Question 2]: [Analysis points]
3. [Question 3]: [Analysis points]
...

## Analysis Process

### Stage 1: [Stage Name]
[Specific steps]

### Stage 2: [Stage Name]
[Specific steps]

...

## Analysis Results Storage Format

Results for each analysis point should be stored in the following format:
```
[Specific Markdown template]
```

## Quality Requirements
- [Requirement 1]
- [Requirement 2]
...
```

#### 4. Estimation Methods Guide (estimation-methods.md)

```markdown
# Estimation Methods Guide

## When Estimation Is Permitted

Estimation is only acceptable when ALL of the following conditions are met:
- Direct data is not publicly available and cannot be obtained within project scope
- The estimation is used to indicate trends or relative magnitude, NOT as a precise figure
- The estimation method and its assumptions are explicitly documented
- Decision-makers are informed that the output is an estimate, not a measured value

## Method Validity Checks (complete BEFORE calculating)

For any derived quantitative metric, answer the following before proceeding:

- [ ] **Unit and scope alignment**: Does the numerator come from the same population as the denominator? (e.g., using a domestic market share percentage against a global export total is a scope mismatch)
- [ ] **Causal validity**: Is there a theoretical basis for using metric A to derive metric B, or is it a coincidental correlation?
- [ ] **Falsifiability**: Can this estimation method be disproved by a single counterexample? If yes, search for that counterexample first.
- [ ] **Independence of inputs**: Are the inputs to the formula independent, or do they share common factors that would cause double-counting or cancellation?

If any check fails, the method must be revised or abandoned. Do not proceed to calculation.

## Anchor Consistency Check (complete BEFORE outputting conclusion)

1. List all directly observed values available for this subject (financial filings, official registrations, verified third-party data)
2. Compare the estimated result against each anchor value:
   - Same order of magnitude → flag as plausible, proceed
   - Differs by more than 3×: → flag as **suspicious**, document the discrepancy and reason
   - Differs by more than 10×: → flag as **likely invalid**, do not present the estimate as a finding; instead, report the anchor data and note that estimation is not feasible
3. When estimate conflicts with anchor data, anchor data always takes precedence.

## Confidence Tier Classification (mandatory labeling on all quantitative outputs)

| Tier | Label | Definition | Presentation Requirement |
|------|-------|------------|--------------------------|
| 🟢 Direct | Directly observed | From primary source (filing, official publication) | Can be cited as fact |
| 🟡 Derived-1 | Single-step estimate | One inference from direct data | Must note method and assumption |
| 🔴 Derived-N | Multi-step estimate | Two or more inference steps | Must add disclaimer; cannot be presented as a precise figure |

The confidence of a multi-step derivation is bounded by the weakest step. If any step is 🔴, the final output is 🔴 regardless of other steps.
```

#### 5. Output Template (output-template.md)

```markdown
# Output Template

## Document Structure

```
# Title

## Chapter 1 [Chapter Name]
### 1.1 [Section Name]
...

## Chapter 2 [Chapter Name]
...
```

## Format Specifications

### Headings
- Level 1 heading: [Specification]
- Level 2 heading: [Specification]
- Level 3 heading: [Specification]

### Citations
- [Citation format specification]

### Lists
- [List format specification]

## Writing Style
- [Style requirement 1]
- [Style requirement 2]

## Quality Checklist
- [ ] [Check item 1]
- [ ] [Check item 2]
...
```

## Consequences

### Benefits

- **Execution Consistency**: All Agents follow unified methodology
- **Quality Control**: Clear standards facilitate quality checking
- **Adjustable Methods**: Modify methodology files to adjust execution approach
- **Knowledge Transfer**: Explicit methodology facilitates learning and improvement
- **Expert Participation**: Domain experts can directly review and improve methodology

### Liabilities

- **Upfront Investment**: Time needed to write detailed methodology documentation
- **Maintenance Costs**: Methodology evolution requires synchronized document updates
- **Reduced Flexibility**: Strict methodology may limit Agent's flexible response

## Implementation Guidelines

### Determining Level of Detail

Methodological guidance should be **specific enough to be executable**, not vague generalizations:

| Poor Approach | Good Approach |
|--------------|---------------|
| "Pay attention to data quality" | "Data sources are divided into 5 categories with credibility ratings as follows: Academic articles (High), Policy documents (High), Industry reports (Medium-High)..." |
| "Follow academic standards" | "Every argument must be supported by data or cases, citation format is [Source Name](URL)" |
| "Maintain objectivity" | "Must see both achievements and problems, avoid one-sided tendency in expressions" |
| "Standardized output format" | "Level 1 heading uses #, only one in the entire document; Level 2 heading uses ##; lists have blank lines before and after" |

### Value of Checklists

Each methodology file should include **checkable checklists** to facilitate verification of execution quality:

```markdown
## Quality Checklist

- [ ] Are all analysis points covered?
- [ ] Does each analysis point have empirical material support?
- [ ] Is there both positive analysis and problem identification?
- [ ] Can all citations be traced to original sources?
- [ ] Is the language formal and objective?
- [ ] Is the structure complete and logic clear?
```

### Relationship with Domain Knowledge

Methodological guidance and domain knowledge should be **managed separately**:

```
references/
├── domain/                    # Domain Knowledge
│   ├── theoretical_framework.md
│   └── literature_review.md
│
└── methodology/               # Methodological Guidance
    ├── research-overview.md
    ├── data-sources.md
    ├── analysis-methods.md
    ├── estimation-methods.md
    └── output-template.md
```

Benefits of this separation:
- Domain knowledge can be reused across different methodologies
- Methodology can evolve independently of domain knowledge
- Clear responsibilities, facilitating maintenance by different roles

## Examples

### From industry_assessment System

**analysis-methods.md (Core Questions section)**:

```markdown
## Analysis Framework

This research adopts the ESSCC theoretical framework for systematic analysis. For each functional item, the following five core questions need to be answered:

### Question 1: Function Manifestation
**How is this ESSCC function manifested in this industry?**

Analysis points:
- Look for specific instances such as institutional arrangements, policy measures, corporate behaviors
- Use data and cases to illustrate specific manifestations of the function
- Distinguish between "direct manifestation" and "indirect manifestation"

### Question 2: Positive Effects
**What benefits has this manifestation brought to the development of this industry?**

Analysis points:
- Quantified development achievements (scale, growth rate, market share, etc.)
- Technological progress and innovation achievements
- Enhancement of international competitiveness
...

### Question 3: Deficiencies
**Are there situations where this function is insufficiently manifested in this industry?**

Analysis points:
- Objective assessment, do not avoid problems
- Gaps compared to ideal state or international benchmarks
...
```

**data-sources.md (Credibility Rating section)**:

```markdown
## Data Source Types

### 1. Academic Articles
- Academic papers from databases like CNKI, Wanfang
- Working papers from platforms like SSRN, ResearchGate
- **Priority**: High
- **Credibility**: High

### 2. Policy Documents
- Policy documents issued by the State Council and various ministries
- Relevant policies from local governments
- **Priority**: High
- **Credibility**: High

### 3. Industry Research Reports
- Brokerage research reports
- Industry analysis reports from consulting firms
- **Priority**: High
- **Credibility**: Medium-High

## Sources to Use Cautiously

The following types of information sources should be **used cautiously** or **avoided**:

- Purely personal blog articles (non-professionals)
- Subjective comments from self-media (lacking data support)
- Content with obvious commercial promotional purposes
```

## Related Patterns

- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: Methodological guidance is a subtype of Reference Data
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: Quality checklists in methodology are specific implementations of quality standards
- **[Composable Document Assembly](./STR-05-composable-document-assembly.md)**: Output templates provide format specifications for document assembly
- **[Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md)**: Data sources guide supports data lineage tracing
- **[Estimation Method Validation](./QUA-04-estimation-method-validation.md)**: The estimation-methods component of this pattern is governed by the QUA-04 pattern
