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

### Necessity Levels

- **Required**: Patterns that must be adopted when building declarative MAS systems
- **Recommended**: Strongly advised to adopt, unless there is a clear reason not to
- **Optional**: Choose whether to adopt based on specific scenarios

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
| STR-06 | [Methodological Guidance](./STR-06-methodological-guidance.md) | Recommended | Methodological guidance: data sources, analysis methods, output templates |

### BHV - Behavior Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| BHV-01 | [Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md) | Recommended | Orchestrate multiple Agents to execute in staged sequence |
| BHV-02 | [Faithful Agent Instantiation](./BHV-02-faithful-agent-instantiation.md) | Required | When invoking an Agent, must have it read the complete Blueprint; each task requires independent invocation |
| BHV-03 | [Parallel Instance Execution](./BHV-03-parallel-instance-execution.md) | Optional | Launch multiple Agent instances in parallel to handle independent tasks |
| BHV-04 | [Progressive Data Refinement](./BHV-04-progressive-data-refinement.md) | Optional | Data undergoes gradual refinement through multiple stages |

### QUA - Quality Patterns

| ID | Pattern | Necessity | Description |
|----|---------|-----------|-------------|
| QUA-01 | [Embedded Quality Standards](./QUA-01-embedded-quality-standards.md) | Recommended | Embed quality standards in Agent blueprints |
| QUA-02 | [Layered Quality Assurance](./QUA-02-layered-quality-assurance.md) | Optional | Multi-layered quality assurance mechanism |
| QUA-03 | [Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md) | Required | End-to-end verifiable data lineage to prevent AI hallucination |

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
     ┌───────▼───────┐                    │
     │  STR-06       │                    │
     │  Methodolog.  │                    │
     │  Guidance     │                    │
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
```

## How to Use This Catalog

### Building New Systems

1. **Required Patterns**: First ensure adoption of all patterns marked as "Required"
   - COR-01, COR-02 (Core)
   - STR-01 (Structure)
   - BHV-02 (Behavior)
   - QUA-03 (Quality)
2. **Evaluate Recommended Patterns**: Assess whether each "Recommended" pattern applies based on system requirements
3. **Select Optional Patterns**: Choose appropriate "Optional" patterns based on specific scenarios
4. **Combined Application**: Refer to the pattern relationship diagram to ensure related patterns work together

### Understanding Existing Systems

1. **Identify Patterns**: Compare against the pattern catalog to identify which patterns a system uses
2. **Understand Variants**: Note that systems may use variant forms of patterns
3. **Discover Gaps**: Identify potentially valuable patterns that may have been overlooked

## Version History

- **v0.4** (2025-12): Based on demo_mas incident retrospective, updated BHV-02 (added acceptance-side faithfulness and non-negotiable principle) and QUA-02 (added process execution compliance layer)
- **v0.3** (2025-12): Added STR-06 Methodological Guidance, updated STR-01 to distinguish domain knowledge from methodology
- **v0.2** (2025-12): Restructured pattern numbering, grouped by category (COR/STR/BHV/QUA)
- **v0.1** (2025-12): Initial version, extracted from the industry_assessment system

## References

- [Anatomy of Declarative Multi-Agent System Architecture (Part 1)](../references/declarative-multi-agent-architecture-part1-en.md)
- [Anatomy of Declarative Multi-Agent System Architecture (Part 2)](../references/declarative-multi-agent-architecture-part2-en.md)
