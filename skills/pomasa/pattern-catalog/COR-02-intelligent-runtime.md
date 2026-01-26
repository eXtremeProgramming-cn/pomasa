# Intelligent Runtime

**Category**: Core
**Necessity**: Required

## Problem

Who executes the behavior of declaratively defined Agents?

Traditional runtime environments (such as JVM, Python interpreters) mechanically execute code instructions and cannot understand intents described in natural language. Declarative Agent Blueprints require an execution environment capable of understanding semantics, making decisions, and adapting to changes.

## Context

This pattern applies to scenarios where:

- The system uses declarative Agent definitions (Prompt-Defined Agent pattern)
- Task execution requires semantic understanding and intelligent decision-making
- The execution environment may change (e.g., web page structure changes)
- Optimal decisions should be made at execution time rather than pre-coding all scenarios

## Forces

- **Intelligence Level vs Controllability**: The more intelligent the runtime, the harder behavior becomes to predict
- **Adaptability vs Consistency**: The ability to adapt to changes may lead to inconsistent execution
- **Autonomy vs Auditability**: Autonomous decision-making makes auditing difficult
- **Capability vs Cost**: Intelligent runtimes typically require AI model support, which has costs

## Solution

**Use an AI system with understanding and decision-making capabilities as the runtime environment. It can understand natural language Blueprints, select execution methods, evaluate output quality, and handle exceptional situations.**

### Capability Layers of Intelligent Runtime

```
Layer 4: Metacognitive Capabilities
        ├── Progress tracking and plan adjustment
        ├── Execution reflection and strategy optimization
        └── Exception identification and recovery decisions

Layer 3: Quality Evaluation Capabilities
        ├── Understanding quality standards
        ├── Evaluating output quality
        └── Self-correction

Layer 2: Execution Decision Capabilities
        ├── Tool selection and combination
        ├── Parameter inference
        └── Error handling and degradation

Layer 1: Basic Execution Capabilities
        ├── Filesystem operations
        ├── Network access
        ├── Agent instance management
        └── Tool invocation
```

### Essential Differences from Traditional Runtimes

| Dimension | Traditional Runtime | Intelligent Runtime |
|------|-----------|-----------|
| **Input** | Bytecode/source code | Natural language Blueprint |
| **Execution Method** | Mechanically execute instruction sequences | Understand intent, intelligently select methods |
| **Decision-making Capability** | None (completely determined by code) | Strong (adaptive decision-making at execution time) |
| **Error Handling** | Throw exceptions, halt execution | Understand error context, attempt recovery |
| **Determinism** | High (same input → same output) | Medium (same Blueprint may have different execution paths) |

## Consequences

### Benefits

- **Declarative Programming Becomes Possible**: Developers describe intent, runtime implements
- **Runtime Adaptability**: Automatically adapts to environmental changes (e.g., website structure changes)
- **Open-ended Intelligence**: Can handle unforeseen situations
- **Tool Selection Freedom**: Select optimal tool combinations based on actual circumstances
- **Semantic-level Quality Awareness**: Understands the meaning of "high quality"

### Liabilities

- **Platform Lock-in**: Strong dependency on specific AI platforms
- **Online Dependency**: Requires network connection to access AI services
- **Higher Cost**: AI invocations incur fees
- **Non-determinism**: Execution paths are not completely predictable
- **Difficult Debugging**: Hard to precisely trace decision-making processes

## Implementation Guidelines

### Example: Claude Code as Intelligent Runtime

Claude Code is one implementation of intelligent runtime. Other AI coding assistants (such as Cursor, Cline, Windsurf) provide similar capabilities. This section uses Claude Code as an example to illustrate:

**Basic Capabilities**:
- File reading/writing: Read, Write, Edit tools
- File searching: Glob, Grep tools
- Network access: WebSearch, WebFetch tools
- Command execution: Bash tool

**Agent Management**:
- Launch subagents (Agent instances)
- Launch multiple subagents in the same message for parallelism
- Each subagent has independent context

**Intelligent Decision-making**:
- Understand natural language Blueprints
- Select appropriate tools and methods
- Evaluate output quality
- Handle exceptional situations

### Consider Runtime Capabilities When Designing Blueprints

```markdown
## Workflow

### Phase 1: Information Collection

**Objective**: Collect activity information from target organizations

**Strategy Guidance**:
1. Prioritize accessing the official website's activity calendar
2. Next, search for relevant news reports
3. If the official website is inaccessible, try other authoritative sources

[Note: This describes strategy priorities, not specific steps.
The runtime will select the optimal method based on actual circumstances.]
```

### Understanding "Agents on Rails"

The Blueprint provides the "rails" (direction and constraints), while the runtime is the "train" (has decision-making freedom on the rails):

- **Rails Provide**: Objectives, strategy priorities, quality standards, output specifications
- **Train Decides**: Specific tool selection, execution order, error recovery methods

This design strikes a balance between controllability and flexibility.

### Trust and Verification

Since the runtime has decision-making autonomy, trust mechanisms need to be established:

1. **Output Validation**: Verify execution quality through output results
2. **Process Tracking**: Preserve intermediate artifacts to support post-hoc auditing
3. **Quality Gates**: Set quality checks at critical points
4. **Human Intervention Points**: Reserve opportunities for manual review of important decisions

## Examples

### Intelligent Decision-making in Tool Selection

The Blueprint states:
> "Visit the organization's official website and look for the activity calendar"

The runtime's decision-making process:
1. Read the organization URL from configuration
2. Use WebFetch to retrieve page content
3. If the page structure is simple, extract information directly
4. If the page structure is complex, may first use WebSearch to find the activity page
5. If the official website is inaccessible, search for alternative sources

These decisions are not explicitly specified in the Blueprint; the runtime intelligently selects based on actual circumstances.

### Intelligent Decision-making in Error Recovery

The Blueprint states:
> "If certain field information is unavailable, leave it blank or mark as 'information not disclosed'"

When the runtime encounters information that cannot be obtained:
1. Attempt to obtain from alternative sources
2. If still unsuccessful, mark according to rules
3. Continue with subsequent tasks rather than interrupting

## Related Patterns

- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**: This pattern is the foundation for executing Prompt-Defined Agents
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: The runtime needs to understand and enforce quality standards
- **[Parallel Instance Execution](./BHV-03-parallel-instance-execution.md)**: The runtime provides parallel execution capabilities

## Evolution Directions

### Multi-runtime Support

Multiple intelligent runtimes may emerge in the future; Blueprints should maintain a degree of portability:
- Avoid depending on unique features of specific runtimes
- Use generic tool description methods
- Provide adaptation layers for different runtimes

### Capability Enhancement

Runtime capabilities continue to evolve:
- Longer context windows
- Stronger reasoning capabilities
- Richer tool ecosystems
- Better multimodal support

When designing Blueprints, these evolutionary possibilities should be considered.
