# Embedded Quality Standards

**Category**: Quality
**Necessity**: Recommended

## Problem

How to ensure AI Agents produce high-quality results?

Traditional software testing relies on determinism: the same input should produce the same output, which can be verified with assertions. However, AI Agent outputs have semantic properties (such as "reports should be objective and professional"), and execution paths are not completely deterministic. How can quality be ensured in this context?

## Context

This pattern applies to the following scenarios:

- Quality standards for Agent outputs are difficult to define precisely with rules
- Quality standards have semantic properties (require understanding to judge)
- Want AI to focus on quality during execution, rather than remediation after the fact
- Need to make implicit quality expectations explicit

## Forces

- **Flexibility vs Constraint**: Standards that are too strict limit flexibility, while those too loose cannot guarantee quality
- **Comprehensiveness vs Executability**: Standards that are too comprehensive are difficult to execute, while those too simple may have gaps
- **Subjectivity vs Objectivity**: Quality judgments inherently have subjective components
- **Execution Efficiency vs Inspection Depth**: Deep inspection takes time, but provides better quality assurance

## Solution

**Embed quality standards directly in Agent Blueprints, enabling AI to continuously self-check against standards during execution, rather than checking after the fact.**

### Hierarchy of Quality Standards

```
Standard Hierarchy:
├── Format Standards: Output format, file structure, naming conventions
│   └── Example: Use Markdown format, only one first-level heading
│
├── Content Standards: Required content, prohibited content
│   └── Example: Every argument must be supported by data
│
├── Style Standards: Language style, expression norms
│   └── Example: Use objective, neutral academic language
│
├── Quality Standards: Credibility, completeness, consistency
│   └── Example: Critical data requires cross-validation
│
├── Quantitative Analysis Standards: Estimation validity and confidence labeling
│   └── Example: All derived figures must be labeled with confidence tier
│
└── Analytical Derivation Standards: Mechanism-before-conclusion requirement
    └── Example: Every directional prediction must state its key premise before the conclusion
```

### Embedding Standards in Blueprints

```markdown
## Quality Requirements

### Format Requirements
- Use Markdown format
- Heading hierarchy not to exceed three levels
- Code blocks annotated with language type

### Content Requirements
- Every argument must be supported by data or cases
- Citations must be attributed to sources
- Must not contain unverified speculation

### Style Requirements
- Use objective, neutral academic language
- Avoid subjective evaluative terms
- Maintain consistent terminology throughout

### Completion Criteria
- [ ] All required fields have been filled
- [ ] All citations have been attributed to sources
- [ ] Format check has been performed
```

## Consequences

### Benefits

- **Quality Upfront**: Quality is ensured during generation, rather than patched afterward
- **Standards Made Explicit**: Implicit quality expectations become explicit checklist items
- **AI Executable**: Standards described in natural language can be understood and executed by AI
- **Improved Consistency**: All Agents follow the same standards
- **Facilitates Communication**: Quality expectations are clear to both humans and AI

### Liabilities

- **Blueprint Complexity**: Requires detailed description of quality standards
- **Execution Overhead**: Self-checking process consumes time and tokens
- **Standard Maintenance Cost**: Standards need to evolve with practice
- **Imperfect Guarantee**: AI may misjudge or miss issues

## Implementation Guidelines

### Embedding vs Externalizing Quality Standards

Quality standards can be either embedded directly in Blueprints or externalized to reference files. Choose based on:

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Embed in Blueprint** | Standards are specific to this Agent and not shared | A unique completion checklist for one Agent |
| **Externalize to Reference File** | Standards are shared across multiple Agents, or are complex/lengthy | Format specifications, writing style guides |

**When standards are externalized, the Blueprint should reference them without duplicating content:**

```markdown
## Quality Requirements

**You must follow the standards in `references/methodology/quality-standards.md`.**

This file defines data collection standards, analysis standards, and format standards.

**Important**: The reference file is authoritative; this Blueprint does not repeat specific rules.
```

See [STR-01 Reference Data Configuration](./STR-01-reference-data-configuration.md) for the principle of not duplicating reference content in Blueprints.

### Four Dimensions of Quality Standards

**1. Data Quality Standards**
```markdown
### Data Collection Standards

**Source Credibility**:
- Prioritize: Academic papers, official policy documents, authoritative institution reports
- Use cautiously: News reports, corporate announcements
- Avoid: Personal blogs, self-media, content without attribution

**Data Timeliness**:
- Prioritize: Data from the past 5 years
- Historical data: Only for background context
- Attribution requirement: All data must be annotated with publication date

**Data Verification**:
- Critical data requires cross-validation (at least 2 independent sources)
- When contradictions exist, faithfully record different accounts
```

**2. Analysis Quality Standards**
```markdown
### Analysis Standards

**Sufficient Evidence**:
- Every argument must be supported by specific data or cases
- Avoid vague expressions like "possibly", "perhaps"
- Clearly distinguish "facts" from "inferences"

**Logical Rigor**:
- Cause-and-effect relationships must be clear
- Avoid leaping to conclusions
- Acknowledge limitations and uncertainties

**Objectivity and Fairness**:
- Present multiple perspectives
- Show both achievements and problems
- Avoid one-sided tendencies
```

**3. Output Format Standards**
```markdown
### Format Standards

**Document Structure**:
- Use clear hierarchical headings
- Long documents need table of contents
- Use lists and tables to improve readability

**Citation Format**:
- Format: [Source Name](URL)
- Direct quotes use quote blocks >
- Critical data annotated with specific source location

**File Naming**:
- Use lowercase letters and underscores
- Names should be self-descriptive
- Follow project naming conventions
```

**4. Completeness Checklist**
```markdown
### Completion Criteria

Before submitting output, confirm the following checklist items:

- [ ] All required content completed
- [ ] All data attributed to sources
- [ ] Format conforms to specifications
- [ ] No obvious grammatical errors
- [ ] Logic is coherent with no contradictions
- [ ] Files written to correct location
```

**5. Quantitative Analysis Standards**
```markdown
### Quantitative Analysis Standards

- [ ] Every quantitative conclusion is labeled with its confidence tier (🟢 Direct / 🟡 Derived-1 / 🔴 Derived-N)
- [ ] Any derived figure documents the estimation method and key assumptions
- [ ] Derived figures have been cross-checked against all available directly observed anchor data
- [ ] Where estimated and observed values differ by more than 3×, the discrepancy is explicitly noted
- [ ] Multi-step derived figures (🔴) carry a disclaimer and are not presented as precise values
- [ ] Prohibited: expressing derived conclusions with the same certainty as directly observed data
```

**6. Analytical Derivation Standards**
```markdown
### Analytical Derivation Standards

For any agent that produces directional predictions, strategic priorities, or investment recommendations:

- [ ] Before stating a conclusion, explicitly state the key premise it depends on:
      "This conclusion depends on [key premise]"
- [ ] The key premise is supported by evidence in the workspace (cite specifically)
- [ ] The conclusion is derived from the premise; it does not appear independently
- [ ] Prohibited: stating a directional conclusion without completing the above steps
- [ ] If the derivation chain cannot be completed, output:
      "Insufficient basis for directional conclusion on [topic]"
      rather than a directional claim
```

### Tiered Quality Standards

For content of different importance, different levels of standards can be applied:

```markdown
### Quality Tiers

**Critical Content** (must satisfy):
- Core arguments supported by multi-source evidence
- Critical data cross-validated
- Conforms to all format specifications

**Important Content** (should satisfy):
- Arguments supported by evidence
- Data sources clearly identified
- Conforms to basic format specifications

**Supporting Content** (recommended to satisfy):
- Has supporting explanation
- Sources are clear
- Format basically compliant
```

## Examples

### From the industry_assessment System

**Data Collection Quality Standards (Initial Scanner)**:
```markdown
## Data Collection Principles

### Comprehensiveness
- Industry overview must cover all four aspects
- Problem list must cover all 55 functional items

### Accuracy
- Prioritize high-credibility sources
- Critical data must be cross-validated
- Accurately record source information

### Traceability
- All data must have clear sources
- URLs must be complete and valid
- Record collection time

### Objectivity
- No preconceived positions
- Record faithfully without subjective interpretation
```

**Analysis Quality Standards (Analyzer)**:
```markdown
## Analysis Quality Requirements

### Sufficient Evidence
- Every argument must be supported by data or cases
- Avoid empty descriptions and judgments without basis
- Data must be attributed to sources

### Logical Rigor
- Arguments, evidence, and reasoning must be tightly linked
- Avoid leaping to conclusions
- Cause-and-effect relationships must be clear

### Objectivity and Fairness
- Must see both achievements and problems
- Avoid one-sided tendentious statements
- Present multiple viewpoints on controversial issues

### Traceability
- All evidence can be traced to original materials
- Key citations must indicate specific source and location
```

**Quality Fields in Individual Data Records**:
```markdown
## [Data Title]

**Source Type**: [Academic Article/Policy Document/Industry Report/News Report/...]
**Source URL**: [Complete URL]
**Collection Time**: [YYYY-MM-DD]
**Publication Time**: [Original publication time]
**Credibility Assessment**: [High/Medium-High/Medium/Low]
**Core Content Summary**: [...]
**Key Quotes from Original**: > [...]
```

## Related Patterns

- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**: Quality standards are embedded in Blueprints
- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: Detailed quality specifications can be externalized as Reference Data
- **[Layered Quality Assurance](./QUA-02-layered-quality-assurance.md)**: Foundation for multi-layered quality assurance

## Variants

### Domain-Specific Standards
Different types of Agents have specialized quality standard sets:
- Collection Agents: Source credibility, timeliness, completeness
- Analysis Agents: Sufficient evidence, logical rigor, objectivity and fairness
- Report Agents: Format compliance, language style, structural completeness

### Dynamic Standards
Dynamically select standard levels based on task importance or type:
- Critical reports: Apply strictest standards
- Interim drafts: Apply basic standards
- Exploratory tasks: Apply relaxed standards

### External Standard References
Quality standards are externalized as Reference Data, referenced by Blueprints:
```markdown
## Quality Requirements

Please refer to the standards in `references/quality-standards.md` for execution.
```
