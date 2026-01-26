# Prompt-Defined Agent

**Category**: Core
**Necessity**: Required

## Problem

How to define the behavior of an AI Agent?

The traditional approach uses code to specify every step of logic in detail, but when task complexity exceeds the expressive capacity of fixed logic—different data sources have varying structures, the external environment changes constantly, "quality" itself is a semantic concept—hard-coded rules become fragile. Quality standards (such as "objective, professional, conforming to academic norms") are semantic-level requirements that are difficult to implement with code logic.

## Context

This pattern applies to the following scenarios:

- Tasks require semantic understanding capabilities (such as information extraction, content generation, quality judgment)
- Task details may change frequently (such as data source format changes)
- Non-programmers need to be able to understand and maintain system behavior
- There is an intelligent runtime environment (such as Claude Code, Cursor, Cline) to support execution

## Forces

- **Flexibility vs Predictability**: Declarative style brings flexibility but reduces execution determinism
- **Expressiveness vs Complexity**: Natural language has strong expressive power but may produce ambiguity
- **Development Efficiency vs Runtime Cost**: Development efficiency is extremely high, but each execution consumes AI invocation costs
- **Human Readable vs Machine Executable**: Need to find an expression that balances both

## Solution

**Use natural language documents (Agent Blueprint) to describe what the Agent "should do", "what norms to follow", and "what standards to achieve", rather than prescribing "how to do it specifically".**

### Core Elements of a Blueprint

```markdown
# Agent Name

## Your Role
[Define the Agent's identity and overall responsibilities]

## Task Parameters
[List the parameters the Agent receives, including placeholders like {PARAM}]

## Reference Materials
[Indicate Reference Data files that need to be read]

## Workflow
[Detailed task description, strategies, process—"guidance" rather than "instructions"]

## Output Requirements
[Clear deliverable standards and file paths]

## Completion Standards
[Quality checklist]
```

### Key Design Principles

1. **Declare Intent, Not Details**
   - Describe "the effect to be achieved" rather than "specific steps"
   - Leave room for runtime decision-making

2. **Support Parameterization**
   - Use placeholders (such as `{ORGANIZATION_ID}`)
   - The same Blueprint can be instantiated into multiple Agent Instances

3. **Embed Quality Standards**
   - Write quality requirements into the Blueprint
   - AI continuously self-checks against standards during execution

4. **Maintain Readability**
   - Use structured Markdown format
   - Non-programmers can also understand and modify

## Consequences

### Benefits

- **Extremely High Flexibility**: AI automatically adapts to environmental changes
- **Semantic-Level Quality Assurance**: AI understands abstract standards
- **Low Maintenance Cost**: Modifying prompts is easier than modifying code
- **Natural Readability**: Non-programmers can participate in maintenance
- **Rapid Iteration**: Changes take effect immediately, no compilation or deployment needed

### Liabilities

- **Execution Non-Determinism**: The same prompt may produce different execution paths
- **Higher Operating Cost**: Depends on AI model invocations
- **Difficult Debugging**: Cannot set breakpoints like with code
- **Platform Dependency**: Bound to a specific intelligent runtime
- **Reduced Predictability**: Difficult to precisely predict execution details

## Implementation Guidelines

### Blueprint Structure Template

```markdown
# [Agent Name]

## Workspace Isolation Requirements
[Workspace constraints, see Workspace Isolation pattern]

## Your Role
[Brief summary of the Agent's identity and core responsibilities]

## Prerequisites
[List of reference materials that must be read before execution]

## Input Parameters
- `{PARAM_1}`: [Parameter description]
- `{PARAM_2}`: [Parameter description]

## Workflow

### Stage 1: [Stage Name]
[Goals, strategies, and considerations for this stage]

### Stage 2: [Stage Name]
...

## Output Requirements

**Output Location**: `path/to/output/`

**Output Format**:
[Detailed description of output file structure and format]

## Completion Standards
- [ ] [Check item 1]
- [ ] [Check item 2]
- ...

## Important Notes
[Special reminders, edge cases, prohibited actions, etc.]
```

### Writing Techniques

1. **Use Second Person**: Use "you" rather than "Agent" to establish role identification
2. **Provide Examples**: For complex formats, provide specific examples
3. **Clarify Boundaries**: Make it clear what should not be done
4. **Layered Explanation**: Expand from overview to details, layer by layer

### Common Pitfalls

- **Too Abstract**: Only saying "analyze data" without specifying what to analyze or how to present it
- **Too Specific**: Writing out every shell command, losing flexibility
- **Missing Output Specifications**: Not clearly defining output paths and formats
- **Vague Quality Standards**: Only saying "high quality" without specific criteria

## Examples

### From the industry_assessment System

```markdown
# Initial Scanner

## Your Role

You are the Initial Scanner for the ESSCC industry analysis research project.
Your responsibility is to form an overall perception of the target industry
and develop a problem checklist tailored to the industry characteristics for
each functional item in the ESSCC framework, laying the foundation for
subsequent in-depth research.

## Input Parameters

- `{INDUSTRY_ID}`: Industry identifier
- `{INDUSTRY_NAME}`: Target industry name

## Workflow

### Stage 1: Industry Overview Collection

**Goal**: Form a preliminary overall perception of the target industry.

**Collection Content**:
1. Basic industry overview (definition, scale, landscape, industry chain)
2. Ownership structure overview (roles of state-owned, private, foreign enterprises)
3. Policy environment overview (national policies, local measures, regulatory framework)
4. Development history overview (key stages, major events, technology evolution)

**Output Location**: `workspace/{INDUSTRY_ID}/01.materials/01.industry_overview/`

### Stage 2: Problem Checklist Refinement

**Goal**: Develop specific problem checklists for each functional item in the ESSCC framework.

**Working Method**:
1. Understand industry characteristics: Carefully read the overview materials from Stage 1
2. Review functional items one by one: Cross-reference with the 55 functional items in the ESSCC framework
3. Develop specific questions: Formulate 3-5 questions for each functional item
4. Annotate research directions: Label data source types for each question

## Data Collection Principles

### Comprehensiveness
- Industry overview should cover all four aspects
- Problem checklist should cover all 55 functional items

### Accuracy
- Prioritize highly credible sources
- Cross-verify key data
```

## Related Patterns

- **[Intelligent Runtime](./COR-02-intelligent-runtime.md)**: This pattern relies on the intelligent runtime to understand and execute Blueprints
- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**: Blueprints reference externalized reference data
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: Embed quality standards in Blueprints
- **[Workspace Isolation](./STR-03-workspace-isolation.md)**: Blueprints should include workspace isolation requirements

## Variants

### Parameterized Agent
Blueprint contains many placeholders that are dynamically replaced during execution, suitable for batch processing scenarios.

### Conversational Agent
Blueprint describes conversation strategies rather than single-task workflows, suitable for interactive scenarios.

### Meta-Agent (Orchestrator)
Blueprint describes how to coordinate other Agents rather than directly executing tasks.
