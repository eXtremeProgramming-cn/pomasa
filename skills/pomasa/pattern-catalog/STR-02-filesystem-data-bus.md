# Filesystem Data Bus

**Category**: Structure
**Necessity**: Recommended

## Problem

How do Agents transfer data between each other?

In multi-agent systems, Agents need to exchange data. Traditional approaches (API calls, message queues, shared databases) require additional infrastructure, complex configuration, and network programming. AI multi-agent systems need a solution that naturally fits the runtime, is fully traceable, human-readable and editable, and simple to deploy.

## Context

This pattern applies to the following scenarios:

- Batch processing tasks (non-realtime systems)
- Need for complete traceability and auditability
- Desire for humans to directly view and edit intermediate results
- Runtime environment provides good filesystem tool support
- Medium data volumes, no need for complex queries

## Forces

- **Simplicity vs Functionality**: Filesystems are simple but lack advanced features like transactions and queries
- **Transparency vs Performance**: All data being visible brings transparency, but I/O overhead is greater
- **Loose Coupling vs Realtime**: Loose coupling through files, but difficult to support realtime communication
- **Human Readability vs Machine Efficiency**: Text formats are human-friendly, but processing efficiency is lower

## Solution

**Use the filesystem as the data transfer medium. Agents read and write JSON and Markdown files through agreed-upon file paths, without communicating directly.**

### Directory Structure Reflects Data Flow

```
workspace/
├── {TIME_PERIOD}/           # Partition by time period
│   ├── 01.materials/        # Stage one output: raw data
│   │   ├── {entity_1}/      # Partition by processing entity
│   │   ├── {entity_2}/
│   │   └── ...
│   │
│   ├── 02.analysis/         # Stage two output: analysis results
│   │   └── ...
│   │
│   └── 03.reports/          # Stage three output: final reports
│       └── ...
```

### Core Design Principles

1. **Directory Structure as Data Flow**
   - Directory hierarchy reflects processing stages
   - Subdirectories reflect data partitions

2. **File Format Conventions**
   - Structured data uses JSON
   - Text content uses Markdown
   - Metadata uses YAML front matter

3. **Path Conventions**
   - Use consistent naming standards
   - Paths can be derived from parameters, no explicit configuration needed

4. **Data Immutability**
   - Each stage produces new data, does not modify previous data
   - Preserves complete data evolution history

## Consequences

### Benefits

- **Ultimate Simplicity**: No middleware needed, zero configuration
- **Fully Auditable**: All data visible and traceable
- **Human Readable**: JSON and Markdown formats directly readable
- **AI Runtime Friendly**: Naturally fits AI runtime file tools
- **Version Control Friendly**: Can use Git to manage data versions
- **Zero-Config Collaboration**: Collaboration through directory conventions rather than explicit configuration

### Liabilities

- **Weak Concurrency Control**: No locking mechanism, must avoid conflicts through design
- **Limited Query Capability**: Cannot perform complex queries like databases
- **Lower Performance**: File I/O slower than memory operations
- **Poor Transactionality**: Cannot guarantee atomic operations
- **Limited Realtime**: Not suitable for scenarios requiring immediate communication

## Implementation Guidelines

### Directory Naming Conventions

```
# Stage directories: numeric prefix indicates order
01.materials/     # Stage one
02.analysis/      # Stage two
03.reports/       # Stage three

# Entity directories: use ID or normalized name
org_1/            # Organization 1 data
org_2/            # Organization 2 data

# Special directories
wip/              # Work in progress tracking
references/       # Reference data (not part of data flow)
```

### File Naming Conventions

```
# Primary data files: descriptive names
activities.json       # Activity data
basic_profile.md      # Basic profile

# Source lists: unified naming
source_list.md        # Source list for this directory's data

# Check reports: unified naming
quality_check_report.md   # Quality check report

# Final outputs: unified naming
final_report.md       # Final report
executive_summary.md  # Executive summary
```

### Path References in Blueprints

```markdown
## Output Requirements

**Output Location**: `workspace/{INDUSTRY_ID}/01.materials/01.industry_overview/`

**Output Format**:
```
workspace/{INDUSTRY_ID}/01.materials/01.industry_overview/
├── basic_profile.md          # Industry basic profile
├── ownership_structure.md    # Ownership structure profile
├── policy_environment.md     # Policy environment profile
├── development_history.md    # Development history profile
└── source_list.md            # Source list
```

[Note: Paths use parameter placeholders, replaced with actual values during execution]
```

### Avoiding Write Conflicts

Avoid multiple Agents writing to the same file simultaneously through data partitioning:

```
# During parallel execution, each Agent writes to a different directory
Agent_1 → workspace/2025-09/raw/org_1/
Agent_2 → workspace/2025-09/raw/org_2/
Agent_3 → workspace/2025-09/raw/org_3/
...
```

### Dual-File Pattern

For important data, can adopt the "dual-file" pattern:

```
{entity}/
├── data.json       # Machine-readable structured data
└── sources.md      # Human-readable source documentation
```

## Examples

### From the industry_assessment System

**Data Directory Structure**:
```
workspace/
└── evtol/                           # Industry ID
    ├── 01.materials/                # Raw materials
    │   ├── 01.industry_overview/    # Industry overview
    │   │   ├── basic_profile.md
    │   │   ├── ownership_structure.md
    │   │   └── source_list.md
    │   │
    │   ├── 02.question_list/        # Question list
    │   │   ├── overview.md
    │   │   ├── dimension_1_ownership.md
    │   │   └── ...
    │   │
    │   └── 03.deep_research/        # Deep research
    │       ├── 1.1_control_strategic_sectors/
    │       │   ├── policies.md
    │       │   ├── statistics.md
    │       │   ├── cases.md
    │       │   └── source_list.md
    │       └── ...
    │
    ├── 02.analysis/                 # Analysis results
    │   ├── functions/               # Function analysis
    │   ├── features/                # Feature synthesis
    │   ├── dimensions/              # Dimension synthesis
    │   └── overall_synthesis.md
    │
    └── 03.reports/                  # Final reports
        ├── final_report.md
        └── executive_summary.md
```

**Data Flow**:
```
Initial Scanner → 01.materials/01.industry_overview/
                → 01.materials/02.question_list/

Deep Researcher → 01.materials/03.deep_research/

Analyzer        → 02.analysis/functions/
                → 02.analysis/features/
                → 02.analysis/dimensions/
                → 02.analysis/overall_synthesis.md

Reporter        → 03.reports/final_report.md
                → 03.reports/executive_summary.md
```

## Related Patterns

- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: Reference Data is also stored in the filesystem, but located in `references/` rather than `workspace/` (runtime workspace)
- **[Workspace Isolation](./STR-03-workspace-isolation.md)**: Restricts Agents to access only specific directories
- **[Progressive Data Refinement](./BHV-04-progressive-data-refinement.md)**: Data undergoes gradual refinement as it flows between directories
- **[Parallel Instance Execution](./BHV-03-parallel-instance-execution.md)**: Supports parallel writes through directory partitioning

## Data Directory Partitioning Strategy

### Choosing Partition Dimensions

**First-Level Directory = Dimension for Distinguishing Run Instances**

Choose appropriate first-level partitioning based on task characteristics:

| Task Type | Partition Dimension | Example |
|----------|----------|------|
| Periodic tasks | Time/Date | `workspace/2025-12-03/` |
| Multi-entity tasks | Entity ID | `workspace/US/`, `workspace/CN/` |
| One-time tasks | No first-level partition | Directly `workspace/01.xxx/` |

**Second-Level Directory = Agent Output Stage Division**

Regardless of first-level partitioning approach, second-level directories always follow Agent stage numbering:

```
workspace/{first_level_partition}/
├── 01.initial_scan/
├── 02.deep_research/
├── 03.analysis/
└── 04.reports/
```

### Time-Based Partitioning

**Applicable Scenarios**: Periodically repeated tasks

- Weekly news digests
- Monthly market reports
- Daily data collection

**Directory Structure**:
```
workspace/
├── 2025-12-01/              # Sunday digest
│   ├── 01.news_collection/
│   ├── 02.analysis/
│   └── 03.digest/
├── 2025-12-08/              # Next Sunday digest
│   ├── 01.news_collection/
│   └── ...
└── latest -> 2025-12-08/    # Optional: symbolic link to latest
```

**Naming Standards**:
- Date format: `YYYY-MM-DD` (easy to sort)
- Monthly tasks: `YYYY-MM`
- Weekly tasks: `YYYY-Wxx` or `YYYY-MM-DD` (week start date)

### Entity-Based Partitioning

**Applicable Scenarios**: Same process run separately for multiple independent entities

- Regional/country research (one run per country)
- Multi-industry assessment (one run per industry)
- Multi-organization analysis (one run per organization)

**Directory Structure**:
```
workspace/
├── US/                      # United States research
│   ├── 01.data_collection/
│   ├── 02.analysis/
│   └── 03.report/
├── CN/                      # China research
│   ├── 01.data_collection/
│   └── ...
└── JP/                      # Japan research
    └── ...
```

**Naming Standards**:
- Use standardized IDs (ISO country codes, industry codes, etc.)
- Avoid using Chinese or special characters (cross-platform compatibility)
- Keep short but recognizable

### Hybrid Partitioning

**Applicable Scenarios**: Both periodic and multi-entity

- Monthly economic indicator tracking for multiple countries
- Weekly multi-industry dynamics monitoring

**Directory Structure**:
```
workspace/
└── 2025-03/                 # First level: time
    ├── US/                  # Second level: entity
    │   ├── 01.collection/
    │   └── 02.report/
    ├── CN/
    └── JP/
```

**Principles for Choosing First-Level Dimension**:
- Which dimension is more commonly the unit of "one run"? → Use as first level
- Fixed time period, variable entity count → Time at first level
- Fixed entities, flexible time period → Entity at first level

### One-Time Tasks

**Applicable Scenarios**: Run only once, no need to distinguish instances

**Directory Structure**:
```
workspace/
├── 01.initial_scan/
├── 02.deep_research/
├── 03.analysis/
└── 04.reports/
```

No first-level partition needed, stage directories directly under `workspace/`.

### Parameterization in Blueprints

**Orchestrator Passes Partition Parameters**:
```markdown
## Execution Parameters

Parameters for this run:
- INSTANCE_ID: {date or entity ID, used as first-level partition}
- For example: `2025-12-03` or `US`

All Agent output paths use `workspace/{INSTANCE_ID}/` as root directory.
```

**Agent Blueprint Uses Parameters**:
```markdown
## Output Location

`workspace/{INSTANCE_ID}/02.analysis/`

Where {INSTANCE_ID} is passed in by Orchestrator.
```

### Referencing Historical Data

When needing to reference historical run results:

```markdown
## Input

**Current Period Data**: `workspace/{CURRENT_INSTANCE}/01.collection/`
**Previous Period Data**: `workspace/{PREVIOUS_INSTANCE}/01.collection/` (if comparison needed)

Orchestrator must provide PREVIOUS_INSTANCE parameter when invoking.
```

## When Not to Use This Pattern

- **Realtime Systems**: Require millisecond-level response
- **High Concurrent Writes**: Large number of Agents writing to the same data simultaneously
- **Complex Query Requirements**: Need SQL-level query capabilities
- **Large Data Volumes**: Filesystem I/O becomes a bottleneck
- **Transaction Guarantees Required**: Must guarantee atomic operations
