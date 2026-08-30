# POMASA Pattern Catalog

**Pattern-Oriented Multi-Agent System Architecture**

This catalog contains architectural patterns for Declarative Multi-Agent Systems. These patterns are derived from analysis and extraction of real running systems and can be used to guide the construction of new MAS systems.

## Pattern Language Description

### Format Conventions

Each pattern is described using the following structure:

```
# Pattern Name

**Category**: [Core/Structure/Behavior/Quality]
**Necessity**: [Required/Recommended/Optional]

## Problem

Describes the problem this pattern addresses.

## Context

Describes the scenarios and preconditions where this pattern applies.

## Forces

Lists the various factors (forces) that influence solution selection; these factors often constrain each other.

## Solution

Describes the core solution of the pattern.

## Consequences

### Benefits
The advantages of applying this pattern.

### Liabilities
The costs of applying this pattern.

## Implementation Guidelines

Suggestions and considerations for specific implementation.

## Examples

Examples from real systems.

## Related Patterns

Relationships with other patterns (dependencies, complements, alternatives, etc.).
```

### Pattern Classification and Numbering

Patterns are grouped by category, identified by a three-letter prefix:

| Prefix | Category | Description |
|--------|----------|-------------|
| **COR** | Core | Patterns that define fundamental system characteristics; usually required |
| **STR** | Structure | Patterns that organize the static structure of systems |
| **BHV** | Behavior | Patterns that define dynamic system behavior |
| **QUA** | Quality | Patterns that ensure system quality |
| **OBV** | Observability | Patterns that make MAS output and run progress uniformly observable and presentable |

### Necessity Levels

- **Required**: Patterns that must be adopted when building declarative MAS systems
- **Recommended**: Strongly advised to adopt, unless there is a clear reason not to
- **Optional**: Choose whether to adopt based on specific scenarios
- **Deprecated**: Patterns that are no longer recommended; kept for reference only

## Pattern Overview

### COR - Core Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| COR-01 | [Prompt-Defined Agent](./COR-01-prompt-defined-agent.md) | Required | Define Agent behavior using natural language blueprints |
| COR-02 | [Intelligent Runtime](./COR-02-intelligent-runtime.md) | Required | Runtime environment with understanding and decision-making capabilities |

### STR - Structure Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| STR-01 | [Reference Data Configuration](./STR-01-reference-data-configuration.md) | Required | Externalize domain knowledge as independent configuration |
| STR-02 | [Filesystem Data Bus](./STR-02-filesystem-data-bus.md) | Recommended | Use filesystem as data transfer mechanism between Agents |
| STR-03 | [Workspace Isolation](./STR-03-workspace-isolation.md) | Recommended | Restrict Agents to work only within designated directories |
| STR-04 | [Business-Driven Agent Design](./STR-04-business-driven-agent-design.md) | Recommended | Agent division follows business process, numbered by execution order |
| STR-05 | [Composable Document Assembly](./STR-05-composable-document-assembly.md) | Recommended | Generate long documents by sections, standardize format, mechanically assemble |
| STR-06 | [Methodological Guidance](./STR-06-methodological-guidance.md) | Required | Methodological guidance: data sources, analysis methods, output templates |
| STR-07 | [Reverse-Engineered Research Questions](./STR-07-reverse-engineered-research-questions.md) | Recommended | Generate research questions by reverse-engineering existing documents and identifying gaps from analytical stance |
| STR-08 | [Pandoc-Ready Markdown Format](./STR-08-pandoc-ready-markdown.md) | Recommended | Markdown format specification ensuring correct conversion to DOCX/PDF |
| STR-09 | [Deliverable Export Pipeline](./STR-09-deliverable-export-pipeline.md) | Recommended | Export final reports to DOCX/PDF with templates and timestamped filenames |

### BHV - Behavior Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| BHV-01 | [Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md) | Recommended | Orchestrate multiple Agents to execute in staged sequence |
| BHV-02 | [Faithful Agent Instantiation](./BHV-02-faithful-agent-instantiation.md) | Required | When invoking an Agent, must have it read the complete Blueprint; each task requires independent invocation |
| BHV-03 | [Parallel Instance Execution](./BHV-03-parallel-instance-execution.md) | Optional | Launch multiple Agent instances in parallel to handle independent tasks |
| BHV-04 | [Progressive Data Refinement](./BHV-04-progressive-data-refinement.md) | Optional | Data undergoes gradual refinement through multiple stages |
| BHV-05 | [Grounded Web Research](./BHV-05-grounded-web-research.md) | Recommended | Fetch original content before using web information |
| BHV-06 | [Configurable Tool Binding](./BHV-06-configurable-tool-binding.md) | Optional | Allow users to configure custom search and fetch tools with fallback |
| BHV-07 | [Cumulative Project Library](./BHV-07-cumulative-project-library.md) | Recommended | Accumulate raw materials in a shared library across multiple runs |
| BHV-08 | [Wiki Integration](./BHV-08-wiki-integration.md) | Optional | Transform research output into persistent, compounding Obsidian knowledge graph |

### QUA - Quality Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| QUA-01 | [Embedded Quality Standards](./QUA-01-embedded-quality-standards.md) | Recommended | Embed quality standards in Agent blueprints |
| QUA-02 | [Layered Quality Assurance](./QUA-02-layered-quality-assurance.md) | Optional | Multi-layered quality assurance mechanism |
| QUA-03 | [Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md) | Required | End-to-end verifiable data lineage to prevent AI hallucination |

### OBV - Observability Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| OBV-01 | [Observable Artifact Contract](./OBV-01-observable-artifact-contract.md) | Required | Stages declare artifact contracts and maintain per-stage indexes of actual outputs |
| OBV-02 | [Work Unit Declaration](./OBV-02-work-unit-declaration.md) | Required | Declare the run axis and per-run work units (single vs multi, dimensions, enumeration) |
| OBV-03 | [Run Manifest](./OBV-03-run-manifest.md) | Required | Per-unit run.json state machine maintained by the orchestrator |

## Pattern Relationship Diagram

```
                    ┌─────────────────────┐
                    │  COR-02             │
                    │  Intelligent        │
                    │  Runtime            │
                    └─────────┬───────────┘
                              │ supports
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  COR-01                                  │
│                  Prompt-Defined Agent                    │
│                     (Core Foundation)                    │
└────────────┬────────────────────────────┬───────────────┘
             │                            │
     ┌───────▼───────┐            ┌───────▼───────┐
     │  STR-01       │            │  QUA-01       │
     │  Reference    │            │  Embedded     │
     │  Data Config  │            │  Quality      │
     └───────┬───────┘            └───────┬───────┘
             │                            │
     ┌───────┴───────┐                    │
     │               │                    │
┌────▼────┐   ┌──────▼──────┐             │
│ STR-06  │   │   STR-07    │             │
│ Method. │   │  Reverse-   │             │
│ Guidance│   │  Eng. Qs    │             │
└────┬────┘   └──────┬──────┘             │
     └───────┬───────┘                    │
             │                            │
             ▼                            ▼
┌────────────────────┐          ┌─────────────────────┐
│ BHV-01             │◄─────────│ QUA-02              │
│ Orchestrated Agent │          │ Layered Quality     │
│ Pipeline           │          │ Assurance           │
└────────┬───────────┘          └─────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐  ┌──────────────────┐
│BHV-03 │  │BHV-04            │
│Parallel│  │Progressive Data │
│Instance│  │Refinement       │
└───┬───┘  └────────┬─────────┘
    │               │
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │ STR-02        │
    │ Filesystem    │
    │ Data Bus      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ STR-03        │
    │ Workspace     │
    │ Isolation     │
    └───────────────┘

    ┌───────────────┐       ┌───────────────┐
    │ BHV-07        │──────▶│ BHV-08        │
    │ Cumulative    │       │ Wiki          │
    │ Project       │       │ Integration   │
    │ Library       │       │ (Optional)    │
    └───────────────┘       └───────────────┘
     library/ feeds wiki/    wiki/ compounds
```

OBV-01/02/03 make the STR-02 filesystem data bus observable: OBV-01 declares what each stage produces, OBV-02 declares the run axis and its work units, OBV-03 records each unit's stage-level progress. They let any runtime UI render a MAS uniformly, and make QUA-03 lineage machine-readable. BHV-03 (parallel instance execution) is the batch form of multi-unit OBV-02 runs.

## How to Use This Catalog

### Building New Systems

1. **Required Patterns**: First ensure adoption of all patterns marked as "Required"
   - COR-01, COR-02 (Core)
   - STR-01, STR-06 (Structure)
   - BHV-02 (Behavior)
   - QUA-03 (Quality)
   - OBV-01, OBV-02, OBV-03 (Observability)
2. **Evaluate Recommended Patterns**: Assess whether each "Recommended" pattern applies based on system requirements
3. **Select Optional Patterns**: Choose appropriate "Optional" patterns based on specific scenarios
4. **Combined Application**: Refer to the pattern relationship diagram to ensure related patterns work together

### Understanding Existing Systems

1. **Identify Patterns**: Compare against the pattern catalog to identify which patterns a system uses
2. **Understand Variants**: Note that systems may use variant forms of patterns
3. **Discover Gaps**: Identify potentially valuable patterns that may have been overlooked

## Version History

- **v0.14** (2026-08): Added OBV observability category with OBV-01 Observable Artifact Contract (artifact contracts + stage indexes), OBV-02 Work Unit Declaration (declared run-axis: single/multi, dimensions, enumeration), OBV-03 Run Manifest (per-unit run.json state machine). All required; generated systems now carry pomasa.json and are uniformly renderable by runtime UIs.
- **v0.13** (2026-04): Added BHV-08 Wiki Integration for transforming research output into a persistent Obsidian knowledge graph with typed links
- **v0.12** (2026-04): Added BHV-07 Cumulative Project Library for accumulating raw materials across multiple MAS runs
- **v0.11** (2026-01): Replaced STR-07 with Reverse-Engineered Research Questions (practical alternative to the abstract conceptualization approach)
- **v0.10** (2026-01): Upgraded STR-06 Methodological Guidance to Required (was Recommended); STR-01 and STR-06 are now a mandatory pair
- **v0.9** (2026-01): Added BHV-06 Configurable Tool Binding for custom search/fetch tools with fallback
- **v0.8** (2026-01): Added STR-09 Deliverable Export Pipeline for exporting final reports to DOCX/PDF
- **v0.7** (2025-12): Added STR-08 Pandoc-Ready Markdown Format, extracted from STR-05 as independent format specification pattern
- **v0.6** (2025-12): Added BHV-05 Grounded Web Research, requiring agents to fetch original web content rather than trusting search summaries
- **v0.5** (2025-12): Added STR-07 Concept-to-Questions Decomposition, providing systematic methodology for transforming abstract concepts into concrete question items
- **v0.4** (2025-12): Based on demo_mas incident retrospective, updated BHV-02 (added acceptance-side faithfulness and non-negotiable principle) and QUA-02 (added process execution compliance layer)
- **v0.3** (2025-12): Added STR-06 Methodological Guidance, updated STR-01 to distinguish domain knowledge from methodology
- **v0.2** (2025-12): Restructured pattern numbering, grouped by category (COR/STR/BHV/QUA)
- **v0.1** (2025-12): Initial version, extracted from the industry_assessment system

## References

- [Anatomy of Declarative Multi-Agent System Architecture (Part 1)](../../../references/declarative-multi-agent-architecture-part1-en.md)
- [Anatomy of Declarative Multi-Agent System Architecture (Part 2)](../../../references/declarative-multi-agent-architecture-part2-en.md)
