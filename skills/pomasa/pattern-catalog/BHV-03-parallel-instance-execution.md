# Parallel Instance Execution

**Category**: Behavior
**Necessity**: Optional

## Problem

How to leverage parallelism to improve efficiency?

A single task may involve processing multiple independent data partitions. Serial processing takes a long time, but not all tasks can be safely parallelized. There is a need to identify parallel opportunities, implement parallel execution, and synchronize and aggregate results.

## Context

This pattern applies to the following scenarios:

- Tasks can be partitioned by data
- Partitions are completely independent with no need for communication
- Tasks are I/O-intensive (network requests, file read/write)
- Sufficient resources are available to support parallel execution
- Independent failure isolation can be tolerated

## Forces

- **Efficiency vs Resource Consumption**: Parallelism improves efficiency but consumes more resources
- **Simplicity vs Performance**: Serial implementation is simple; parallelism adds complexity
- **Isolation vs Coordination Needs**: Complete isolation facilitates parallelism, but may require coordination
- **Determinism vs Speed**: The order of parallel execution is non-deterministic

## Solution

**When a task can be partitioned by data and partitions are completely independent, instantiate an Agent Instance for each partition, execute them in parallel, wait for all to complete, and then aggregate the results.**

### Parallel Execution Model

```
Orchestrator
     │
     │ Identify parallel opportunities
     │ (N independent partitions)
     │
     ├──→ Task: Agent Instance 1 (Partition 1) ──→ Output 1
     ├──→ Task: Agent Instance 2 (Partition 2) ──→ Output 2
     ├──→ Task: Agent Instance 3 (Partition 3) ──→ Output 3
     │    ...
     └──→ Task: Agent Instance N (Partition N) ──→ Output N
           │
           │ Barrier synchronization
           │ (Wait for all to complete)
           ▼
     [Aggregation/Proceed to next stage]
```

### Core Mechanisms

1. **Data Partition Identification**:
   - Read configuration data to determine partitions (e.g., organization list)
   - Number of partitions determines degree of parallelism

2. **Batch Subagent Launch**:
   - Orchestrator launches multiple subagents in the same message
   - Runtime automatically handles parallel execution

3. **Independent Execution**:
   - Each Instance has independent context
   - Writes to different output directories

4. **Barrier Synchronization**:
   - Wait for all Instances to complete
   - Check output completeness for each partition

## Consequences

### Benefits

- **Significant performance improvement**: Near-linear speedup (for I/O-intensive tasks)
- **Full utilization of wait time**: Network requests wait in parallel
- **Simple implementation**: Declarative parallelism (launch multiple subagents in the same message)
- **Data-driven scalability**: As partition count increases, parallelism automatically increases
- **Good fault isolation**: Single Instance failure does not affect other Instances

### Liabilities

- **Increased resource consumption**: More parallel requests, more API calls
- **Increased debugging complexity**: Need to trace multiple parallel executions
- **Potential resource contention**: May be limited by external API concurrency limits
- **Consistency challenges**: Order of parallel execution is non-deterministic
- **Synchronization wait time**: Slowest Instance determines overall time

## Implementation Guidelines

### Maximum Parallelism Constraint

**Recommended maximum fan-out: 7 parallel tasks**

While theoretically more tasks can run in parallel, practical experience shows that excessive parallelism often leads to:
- System instability or hanging
- API rate limiting issues
- Resource contention problems

When the number of partitions exceeds 7, use **Batch Parallelism** (see Variants section) to execute in batches of at most 7.

### Identifying Parallel Opportunities

**Conditions for parallelization**:
- Each partition has the same processing logic (same Blueprint)
- Input data for each partition is independent
- Output directories for each partition are different
- No inter-partition communication needed

**Cases where parallelization is not possible**:
- Subsequent partitions depend on outputs from previous partitions
- Tasks require global perspective (e.g., consolidation reports)
- Shared state requires synchronization

### Launching Parallel Subagents in Orchestrator

```markdown
## Stage One Execution

**Parallel Strategy**: Launch independent Research Agent for each organization

1. Read `references/organizations.json` to get organization list
2. Read `agents/01.research_agent.md` to get Agent Blueprint
3. **In the same message** launch a subagent for each organization:
   - Subagent 1: Research Agent for Organization A
   - Subagent 2: Research Agent for Organization B
   - Subagent 3: Research Agent for Organization C
   - ...
4. Wait for all subagents to complete
5. Verify output completeness for each partition
```

### Directory Partitioning to Avoid Write Conflicts

```
workspace/2025-09/raw/
├── org_1/          # Instance 1 writes here
│   ├── activities.json
│   └── sources.md
├── org_2/          # Instance 2 writes here
│   ├── activities.json
│   └── sources.md
└── org_3/          # Instance 3 writes here
    ├── activities.json
    └── sources.md
```

### Parameterized Blueprint to Support Parallelism

```markdown
## Input Parameters

- `{ORGANIZATION_ID}`: ID of the organization being processed
- `{ORGANIZATION_NAME}`: Name of the organization being processed

## Output Location

`workspace/{PERIOD}/raw/{ORGANIZATION_ID}/`

[Note: Through parameterization, the same Blueprint can be instantiated
into multiple parallel Instances, each writing to a different directory]
```

### Handling Partial Failures

```markdown
## Exception Handling

If collection for an Organization fails:
1. Record failure information to `wip/notes.md`
2. Continue waiting for other Organizations to complete
3. Mark failed partitions in stage summary
4. Decide whether to retry or proceed to next stage
```

## Examples

### From the industry_assessment System

**Stage Two: Parallel Execution of Deep Research**:

```markdown
## Deep Research Execution Strategy

### Parallel Approach
- ESSCC framework has 55 function items
- Launch independent Deep Researcher instance for each function item
- Execute in batches of 7 (8 batches total, respecting the max 7 parallelism constraint)

### Execution Method
1. Read question list to determine all function items
2. For each function item {FUNCTION_ID}:
   - Read corresponding question list
   - Launch Deep Researcher subagent
   - Parameters: {INDUSTRY_ID}, {FUNCTION_ID}, {FUNCTION_NAME}
3. Wait for all subagents to complete

### Output Directory
workspace/{INDUSTRY_ID}/01.materials/03.deep_research/
├── 1.1_control_strategic_sectors/    # Instance 1
├── 1.2_provide_public_goods/         # Instance 2
├── 1.3_stabilize_macro_economy/      # Instance 3
...
└── 12.5_execute_national_strategic_will/  # Instance 55

### Efficiency Analysis
- Single function item research: approximately 10-15 minutes
- 55 serial executions: approximately 10-14 hours
- 55 items in 8 batches of 7: approximately 2-2.5 hours
- Speedup ratio: approximately 5-6x
```

**Stage Three: Layered Parallelism in Analysis**:

```markdown
## Analysis Execution Strategy

### Layer One: Function Item Analysis (55 items in batches of 7)
- 55 function items can be analyzed in parallel batches
- Each produces independent function item analysis report

### Layer Two: Feature Synthesis (12 items in batches of 7)
- Wait for Layer One to complete
- 12 features can be synthesized in 2 parallel batches (function item analyses under each feature are complete)

### Layer Three: Dimension Synthesis (4-way parallelism)
- Wait for Layer Two to complete
- 4 dimensions can be synthesized in parallel

### Layer Four: Overall Synthesis (serial)
- Wait for Layer Three to complete
- Requires global perspective, must be serial
```

## Related Patterns

- **[Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md)**: Parallel execution occurs within stages of the Pipeline
- **[Filesystem Data Bus](./STR-02-filesystem-data-bus.md)**: Supports parallel writes through directory partitioning
- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**: Same Blueprint instantiated into multiple parallel Instances

## Variants

### Batch Parallelism
When the number of partitions exceeds 7, execute in batches with at most 7 instances per batch:
```
Batch 1: Instance 1-7 in parallel
    ↓ After completion
Batch 2: Instance 8-14 in parallel
    ↓ After completion
Batch 3: Instance 15-21 in parallel
...
```

### Priority Parallelism
Important partitions execute first, secondary partitions execute later:
```
High priority: Instance 1-3 in parallel
    ↓ After completion
Low priority: Instance 4-10 in parallel
```

### Dynamic Parallelism
Dynamically adjust parallelism based on resource usage.

## When Not to Use This Pattern

- **Inter-partition dependencies**: Subsequent partitions need outputs from previous partitions
- **Need for global coordination**: Partitions need to communicate or share state
- **Resource constraints**: Parallelism would cause resource contention or exceed limits
- **Few partitions**: Only 1-2 partitions, limited benefit from parallelism
- **CPU-intensive tasks**: Parallel benefits mainly come from I/O waiting; CPU-intensive tasks have limited benefit
