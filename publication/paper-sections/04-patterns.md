
## 4. Essential Patterns

This section presents eight patterns essential to building declarative multi-agent systems, organized by the logical sequence of system construction: runtime foundation → agent definition → knowledge organization → coordination mechanisms → data flow → quality assurance.

### 4.1 COR-02: Intelligent Runtime

**Context**: You are building a system where agents are defined declaratively through natural language descriptions rather than imperative code.

**Problem**: Who executes the declaratively-defined agent behavior?

Traditional runtime environments (JVM, Python interpreter, shell) mechanically execute code instructions. They cannot understand natural language descriptions of intent. A declarative agent blueprint requires an execution environment capable of semantic understanding, decision-making, and adaptive behavior.

**Forces**:

- *Intelligence vs. Controllability*: The more intelligent the runtime, the less predictable its behavior
- *Adaptability vs. Consistency*: Ability to adapt to changes may cause execution inconsistency
- *Autonomy vs. Auditability*: Autonomous decision-making makes auditing difficult
- *Capability vs. Cost*: Intelligent runtimes require AI model access, incurring costs

**Solution**: Use an AI system with comprehension and decision-making capabilities as the runtime environment. The intelligent runtime understands natural language blueprints, selects execution methods, evaluates output quality, and handles exceptional situations.

The intelligent runtime operates at four capability layers:

1. **Basic Execution**: File system operations, network access, tool invocation
2. **Execution Decisions**: Tool selection and composition, parameter inference, error handling
3. **Quality Evaluation**: Understanding quality standards, assessing output quality, self-correction
4. **Meta-cognition**: Progress tracking, strategy optimization, anomaly identification

The fundamental distinction from traditional runtimes:

| Dimension | Traditional Runtime | Intelligent Runtime |
|-----------|---------------------|---------------------|
| Input | Bytecode/source code | Natural language blueprint |
| Execution | Mechanical instruction sequence | Intent understanding, intelligent method selection |
| Decision-making | None (determined by code) | Strong (adaptive decisions at runtime) |
| Error handling | Throw exception, halt | Understand error context, attempt recovery |
| Determinism | High (same input → same output) | Medium (same blueprint may take different paths) |

**Example**: In the industry analysis system, Claude Code serves as the intelligent runtime. When the Initial Scanner blueprint states "collect basic industry information including scale, market structure, ownership composition, and policy environment," the runtime:

1. Decides to use web search for each topic
2. Selects appropriate search queries based on the industry
3. Evaluates whether retrieved information is sufficient
4. Adapts strategy if certain information proves difficult to find
5. Formats output according to the blueprint's specifications

None of these decisions are explicitly programmed—the runtime interprets intent and acts accordingly.

**Discussion**: The intelligent runtime pattern introduces platform dependency. Currently, Claude Code provides the most mature implementation, but this creates lock-in. Blueprint designers should avoid relying on runtime-specific features when possible, maintaining portability for future runtime alternatives.

The non-determinism of intelligent runtimes challenges traditional software engineering assumptions. The same blueprint may execute differently across runs. This trade-off—flexibility for determinism—defines the declarative MAS paradigm.

### 4.2 COR-01: Prompt-Defined Agent

**Context**: You have an intelligent runtime (COR-02) capable of understanding and executing natural language instructions.

**Problem**: How do you define AI agent behavior?

Traditional approaches use code to specify every logical step. But when task complexity exceeds what fixed logic can express—when data sources have varying structures, external environments change unpredictably, and "quality" is a semantic concept—hardcoded rules become brittle. Quality standards like "objective, professional, conforming to academic norms" are semantic-level requirements that resist expression in procedural code.

**Forces**:

- *Flexibility vs. Predictability*: Declarative definitions enable flexibility but reduce execution certainty
- *Expressiveness vs. Ambiguity*: Natural language is expressive but may introduce ambiguity
- *Development efficiency vs. Runtime cost*: Development is highly efficient, but each execution consumes AI resources
- *Human readability vs. Machine executability*: Must find expression that serves both

**Solution**: Use natural language documents (Agent Blueprints) to describe what the agent "should do," "what standards to follow," and "what outcomes to achieve"—rather than specifying "exactly how to do it."

A blueprint's essential structure:

```markdown
# Agent Name

## Workspace Isolation Requirements
[Workspace constraints per STR-03]

## Your Role
[One paragraph defining identity and core responsibility]

## Prerequisites
[Reference materials to read before execution]

## Input Parameters
- `{PARAM_1}`: [Description]
- `{PARAM_2}`: [Description]

## Workflow

### Phase One: [Phase Name]
[Goals, strategies, considerations for this phase]

### Phase Two: [Phase Name]
...

## Output Requirements

**Output Location**: `path/to/output/`

**Output Format**:
[Detailed file structure and format specification]

## Completion Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- ...

## Notes
[Special reminders, edge cases, prohibitions]
```

Key design principles:

1. **Declare intent, not details**: Describe desired outcomes rather than specific steps
2. **Support parameterization**: Use placeholders (e.g., `{INDUSTRY_ID}`) for instantiation
3. **Embed quality standards**: Write quality requirements into the blueprint
4. **Maintain readability**: Use structured Markdown that non-programmers can understand

**Example**: The Deep Researcher agent in the industry analysis system begins:

```markdown
# Deep Researcher

## Your Role

You are the deep research specialist for the ESSCC industry analysis
project. Your responsibility is to conduct comprehensive, in-depth
research on a specific functional item, collecting policies, statistics,
cases, and expert views that provide evidence for subsequent analysis.

## Input Parameters

- `{INDUSTRY_ID}`: Industry identifier
- `{FUNCTION_ID}`: Functional item identifier (e.g., "1.1")
- `{FUNCTION_NAME}`: Functional item name

## Workflow

### Research Strategy

For each functional item, collect four types of information:
1. **Policies**: Government policies, regulations, plans related to this function
2. **Statistics**: Quantitative data demonstrating this function
3. **Cases**: Concrete examples illustrating this function in practice
4. **Expert Views**: Academic or industry expert opinions on this function

### Quality Requirements

- Every piece of information must have a verifiable source (URL)
- Prioritize authoritative sources (government, academic, major industry)
- Cross-verify important claims across multiple sources
```

This blueprint tells the agent *what* to collect and *what standards* to meet, not *how* to search or *which websites* to visit.

**Discussion**: Prompt-defined agents trade determinism for adaptability. The same blueprint may produce different execution paths—a feature, not a bug. The agent adapts to what it finds rather than failing when reality doesn't match expectations.

The pattern also dramatically lowers the barrier to system maintenance. Domain experts who cannot program can read, understand, and modify agent blueprints. This democratizes system evolution.

### 4.3 STR-01: Reference Data Configuration

**Context**: You have agents defined through blueprints (COR-01) that need external knowledge to perform their tasks.

**Problem**: How do you provide agents with the external knowledge they need to execute tasks?

AI agents require two types of external knowledge:

1. **Domain knowledge**: What things are—theoretical frameworks, concept definitions, classification systems
2. **Methodological guidance**: How to do things—data sources, analysis methods, output formats

Embedding this knowledge directly in agent blueprints creates bloated blueprints, scattered knowledge, difficult updates, and excludes domain experts from maintenance.

**Forces**:

- *Centralization vs. Distribution*: Centralized management aids maintenance but may create single points of failure
- *Structure vs. Flexibility*: Structured formats enable machine processing but limit expressive freedom
- *Completeness vs. Conciseness*: Complete knowledge bases are large; concise ones may omit important details
- *Generality vs. Specificity*: General knowledge applies broadly; specific knowledge is more precise

**Solution**: Externalize knowledge as independent data files, separate from agent blueprints. Blueprints reference these files; agents read and apply the knowledge at execution time.

Organize reference data into two subdirectories:

```
references/
+-- domain/                    # Domain knowledge: what things are
|   +-- theoretical_framework.md    # Theoretical framework
|   +-- concepts.md                 # Concept definitions
|   `-- literature_review.md        # Background literature
|
`-- methodology/               # Methodological guidance: how to do things
    +-- research-overview.md        # Research objectives and scope
    +-- data-sources.md             # Data source guide
    +-- analysis-methods.md         # Analysis methods
    `-- output-template.md          # Output format template
```

**Critical principle**: User-provided domain reference materials must be preserved in full—never summarized or condensed. AI systems tend to "helpfully" summarize lengthy documents, but this:

- Loses information (summaries inevitably omit details that may prove crucial)
- Introduces bias (AI understanding may be skewed)
- Destroys authority (original materials carry expert authority that summaries lack)
- Breaks traceability (summaries prevent tracing back to original statements)

**Example**: The industry analysis system's reference data includes:

```
references/
+-- domain/
|   +-- theoretical_framework_explained.md   # 15KB framework explanation
|   `-- theoretical_framework_literature_review.md  # Academic grounding
|
`-- methodology/
    +-- research-overview.md    # What questions to answer
    +-- data-sources.md         # Where to find data, credibility tiers
    +-- analysis-methods.md     # Five core questions per functional item
    `-- output-template.md      # Report structure and formatting
```

The `theoretical_framework_explained.md` file contains the complete ESSCC framework—4 dimensions, 12 features, 55 functional items—each with definitions, manifestations, and evaluation criteria. This is the domain knowledge that every agent consults.

**Discussion**: Reference data configuration enables separation of concerns. Domain experts maintain domain knowledge; methodology experts maintain methodological guidance; system developers maintain agent blueprints. Each can evolve independently.

The pattern also supports system reuse. The same agent blueprints can be applied to different domains by swapping reference data—a different theoretical framework yields a different analysis system.

### 4.4 BHV-01: Orchestrated Agent Pipeline

**Context**: You have multiple agents defined through blueprints (COR-01) that need to collaborate to accomplish a complex task.

**Problem**: How do multiple agents coordinate to accomplish tasks that exceed any single agent's scope?

Complex tasks like "analyze an industry" cannot be accomplished by a single agent in a single execution. The task naturally decomposes into stages: first scan the landscape, then research details, then analyze findings, then synthesize conclusions, then generate reports. Each stage has different requirements and produces different outputs.

**Forces**:

- *Autonomy vs. Coordination*: Agents need freedom to execute but must align toward common goals
- *Parallelism vs. Dependencies*: Some work can proceed in parallel; other work depends on prior results
- *Simplicity vs. Capability*: Simple coordination is easier to implement but limits what the system can achieve
- *Centralization vs. Distribution*: Central orchestration enables control but creates bottlenecks

**Solution**: Decompose tasks into sequential stages, each handled by specialized agent types, coordinated by an Orchestrator agent.

The pipeline structure:

```
Orchestrator
    +-- Stage 1: Data Collection (parallel)
    |   +-- Agent Instance 1 → output/stage1/item1/
    |   +-- Agent Instance 2 → output/stage1/item2/
    |   `-- Agent Instance N → output/stage1/itemN/
    |
    +-- Stage 2: Analysis (parallel)
    |   `-- Agent Instance M → output/stage2/
    |
    `-- Stage 3: Report Generation (sequential)
        `-- Agent Instance 1 → output/stage3/
```

The Orchestrator agent:

- Reads the master plan and reference data
- Initializes the data directory structure
- Launches each stage in sequence
- Passes parameters to stage agents
- Validates stage completion before proceeding
- Handles exceptions and coordinates retries

**Example**: The industry analysis system's orchestrator (`00.orchestrator.md`) coordinates seven stages:

```markdown
## Execution Flow

### Stage 0: Initialization
- Verify reference files exist and are complete
- Create data directory structure for this industry

### Stage 1: Initial Scanning
- Launch Initial Scanner agent
- Parameters: INDUSTRY_ID, INDUSTRY_NAME
- Wait for completion; verify outputs exist

### Stage 2: Deep Research
- For each of 55 functional items:
  - Launch Deep Researcher agent
  - Parameters: INDUSTRY_ID, FUNCTION_ID, FUNCTION_NAME
- Can execute in parallel
- Wait for all to complete

### Stage 3: Data Verification
- Launch Data Verifier agent in independent context
- Verify all collected data; eliminate hallucinations
- Wait for completion; note which data was eliminated

### Stage 4: Analysis
- For each functional item:
  - Launch Analyzer agent
  - Parameters: INDUSTRY_ID, FUNCTION_ID
- Can execute in parallel
- Wait for all to complete

### Stage 5: Synthesis
- Launch Synthesizer agent
- Aggregate functional item analyses into feature and dimension syntheses
- Wait for completion

### Stage 6: Report Generation
- Launch Reporter agent
- Generate final report and executive summary
- Wait for completion

### Stage 7: Quality Review
- Launch Quality Checker agent
- Final quality verification
- Wait for completion
```

**Discussion**: The orchestrated pipeline pattern trades flexibility for predictability. The fixed stage sequence constrains what the system can do but makes behavior comprehensible and debuggable. When something goes wrong, you know which stage failed.

The pattern also enables incremental execution. If Stage 3 fails, Stages 1 and 2 outputs remain intact. The system can resume from the failed stage rather than starting over.

### 4.5 BHV-02: Faithful Agent Instantiation

**Context**: You have an Orchestrator (BHV-01) that needs to invoke other agents to execute portions of the task.

**Problem**: How do you ensure agents are correctly instantiated and executed?

In multi-agent systems, orchestrators invoke other agents to execute tasks. Common mistakes include:

1. **Summary relay**: The orchestrator reads Agent B's blueprint, then summarizes it to launch a subagent. Critical details are lost; execution deviates.

2. **Task bundling**: When executing batch tasks, the orchestrator bundles multiple independent tasks into a single subagent call. Each task receives inadequate execution quality.

These shortcuts may seem harmless in short call chains, but in long chains or large batches, they cause severe quality degradation.

**Forces**:

- *Efficiency vs. Quality*: Summary relay or task bundling may seem "efficient" but degrades quality
- *Brevity vs. Completeness*: Brief invocations may omit critical information
- *Flexibility vs. Rigor*: Flexible invocation patterns are harder to keep consistent

**Solution**: Every agent instance must directly read and execute the complete blueprint. The caller passes only parameters, never blueprint content. Each independent task corresponds to an independent subagent invocation. The orchestrator must verify results against blueprint completion criteria.

Core principles:

1. **Caller passes parameters only, never relays blueprint**: The orchestrator tells the subagent which blueprint file to read. The subagent reads the complete blueprint and executes. No summarizing, simplifying, or relaying.

2. **One task instance = one subagent invocation**: In batch tasks, each independent task launches a separate subagent. Do not bundle multiple tasks into one invocation.

3. **Blueprint is the sole basis for execution**: Subagent behavior is determined entirely by the blueprint. No dependence on caller's "interpretation" or "guidance."

4. **Orchestrator must validate results**: When receiving subagent results, verify against blueprint completion criteria item by item. Do not accept results that fail criteria; require redo or report exception.

5. **Completion criteria are non-negotiable**: Blueprint completion criteria are hard requirements. Subagents must not unilaterally lower standards. When facing difficulties, they must consult the orchestrator rather than cutting corners.

**Example**: The orchestrator's invocation of Deep Researcher:

```markdown
## Stage 2: Deep Research

For each functional item in the question list:

1. Launch a new subagent
2. Instruct the subagent:
   - Read `agents/02.deep_researcher.md`
   - Execute strictly according to the blueprint
   - Parameters: INDUSTRY_ID={current industry}, FUNCTION_ID={current item}
3. Wait for subagent completion
4. Verify outputs against completion criteria

**Important**:
- Each functional item launches an independent subagent
- Do NOT bundle multiple items into one subagent
- Do NOT summarize or relay blueprint content
```

Standard invocation wording:

```
Please launch a subagent to perform the following task:
1. Read agents/02.deep_researcher.md
2. Execute strictly according to that blueprint
3. Parameters:
   - INDUSTRY_ID: evtol
   - FUNCTION_ID: 1.1
   - FUNCTION_NAME: Control Strategic Sectors

**Important constraints**:
- Completion criteria in the blueprint are hard requirements
- Do not lower standards for any reason
- If difficulties arise, report immediately rather than adopting workarounds
```

**Discussion**: This pattern emerged from debugging production failures. Early versions of the industry analysis system suffered from quality degradation in long call chains—by the time instructions passed through multiple orchestration levels, critical requirements had been lost through successive summarization.

The principle that completion criteria are non-negotiable was added after observing agents "helpfully" reducing scope when facing difficulties. An agent tasked with researching 55 items might decide to sample 10 "representative" items—a reasonable-seeming adaptation that destroys the analysis's comprehensiveness.

### 4.6 STR-02: Filesystem Data Bus

**Context**: You have multiple agents (COR-01) coordinated through a pipeline (BHV-01) that need to exchange data.

**Problem**: How do agents pass data to each other?

Multi-agent systems require data exchange between agents. Traditional solutions (API calls, message queues, shared databases) require additional infrastructure, complex configuration, and network programming. AI multi-agent systems need a data passing mechanism that naturally fits the runtime, is fully traceable, is human-readable and editable, and requires minimal deployment complexity.

**Forces**:

- *Simplicity vs. Functionality*: File systems are simple but lack transactions, queries, and other advanced features
- *Transparency vs. Performance*: All data being visible enables transparency but increases I/O overhead
- *Loose coupling vs. Real-time*: File-based loose coupling cannot support real-time communication
- *Human readability vs. Machine efficiency*: Text formats are human-friendly but less efficient to process

**Solution**: Use the filesystem as the data passing medium. Agents read and write JSON and Markdown files through agreed-upon file paths. They do not communicate directly.

The directory structure reflects data flow:

```
data/
+-- {INSTANCE_ID}/              # Partition by run instance
|   +-- 01.materials/           # Stage 1 output: raw data
|   |   +-- {entity_1}/         # Partition by processing entity
|   |   +-- {entity_2}/
|   |   `-- ...
|   |
|   +-- 02.analysis/            # Stage 2 output: analysis results
|   |   `-- ...
|   |
|   `-- 03.reports/             # Stage 3 output: final reports
|       `-- ...
```

Core design principles:

1. **Directory structure is data flow**: Directory hierarchy reflects processing stages; subdirectories reflect data partitions

2. **File format conventions**: Structured data uses JSON; textual content uses Markdown; metadata uses YAML front matter

3. **Path conventions**: Use consistent naming conventions; paths can be derived from parameters without explicit configuration

4. **Data immutability**: Each stage produces new data without modifying prior stages; preserve complete data evolution history

**Example**: The industry analysis system's data directory for eVTOL:

```
data/evtol/
+-- 01.materials/
|   +-- 01.industry_overview/
|   |   +-- basic_profile.md
|   |   +-- ownership_structure.md
|   |   +-- policy_environment.md
|   |   `-- source_list.md
|   +-- 02.question_list/
|   |   +-- dimension_1_ownership.md
|   |   `-- ...
|   `-- 03.deep_research/
|       +-- 1.1_control_strategic_sectors/
|       |   +-- policies.md
|       |   +-- statistics.md
|       |   +-- cases.md
|       |   `-- source_list.md
|       `-- ...
|
+-- 02.analysis/
|   +-- functions/
|   +-- features/
|   `-- dimensions/
|
`-- 03.reports/
    +-- final_report.md
    `-- executive_summary.md
```

Data flows through the structure:

- Initial Scanner → `01.materials/01.industry_overview/`, `01.materials/02.question_list/`
- Deep Researcher → `01.materials/03.deep_research/`
- Analyzer → `02.analysis/functions/`, `02.analysis/features/`, `02.analysis/dimensions/`
- Reporter → `03.reports/`

**Discussion**: The filesystem data bus pattern optimizes for debuggability over performance. Every intermediate artifact is visible, inspectable, and editable. When analysis produces unexpected results, developers can examine exactly what data each agent received and produced.

The pattern also enables human intervention. A domain expert can review and correct deep research outputs before analysis proceeds. The system accommodates human-in-the-loop workflows naturally.

The main limitation is performance. File I/O is slower than in-memory communication. For systems requiring high throughput or real-time responses, this pattern is inappropriate. The industry analysis system, where a complete run takes hours and throughput is measured in reports per day, finds this trade-off acceptable.

### 4.7 STR-03: Workspace Isolation

**Context**: You have agents (COR-01) that read and write files through the filesystem data bus (STR-02).

**Problem**: How do you prevent agents from accessing or modifying files they shouldn't?

AI agents have file system read/write capabilities. Without restrictions, they may:

- Accidentally read files from other projects, contaminating context
- Accidentally modify system files or other projects' data
- Cause interference between different projects
- Make system behavior depend on state outside the project

**Forces**:

- *Security vs. Convenience*: Access restrictions increase security but may add inconvenience
- *Isolation vs. Sharing*: Complete isolation may prevent legitimate resource sharing
- *Explicit constraints vs. Implicit assumptions*: Explicit constraints are more reliable but add configuration burden

**Solution**: At the beginning of every agent blueprint, explicitly declare workspace boundaries. Forbid reading or writing any files outside the specified directory.

Standard constraint declaration:

```markdown
## Workspace Isolation Requirements

**IMPORTANT**: You must work ONLY within the project directory `{PROJECT_PATH}/`.
- You are **forbidden** from reading any files outside this directory
- You are **forbidden** from writing any files outside this directory
- All file paths you use must be relative to this project root or absolute paths within this directory
- This constraint ensures system isolation and prevents context contamination
```

Placement: The constraint declaration should appear at the very beginning of the blueprint (immediately after the title), ensuring it is:

1. Read first by the agent
2. Emphasized in importance
3. Established before any concrete task

**Example**: Every agent in the industry analysis system begins with:

```markdown
# Initial Scanner

## Workspace Isolation Requirements

**IMPORTANT**: You must work ONLY within the project directory `industry_assessment/`.
- You are **forbidden** from reading any files outside this directory
- You are **forbidden** from writing any files outside this directory
- All file paths you use must be relative to this project root
- This constraint ensures system isolation and prevents context contamination

---

## Your Role
...
```

**Discussion**: Workspace isolation relies on convention rather than technical enforcement. The intelligent runtime (Claude Code) respects these constraints but could technically violate them. The pattern works because the AI system genuinely attempts to follow instructions, not because violations are technically impossible.

This convention-based approach has an important benefit: the constraint is visible and auditable. Reviewers can see that the blueprint includes isolation requirements. Technical enforcement mechanisms, by contrast, operate invisibly—you must trust that they work correctly.

### 4.8 QUA-03: Verifiable Data Lineage

**Context**: You have a multi-agent system that collects, processes, and synthesizes data to produce analytical outputs.

**Problem**: How do you ensure that data and conclusions produced by the AI system are trustworthy?

AI systems, especially LLMs, suffer from severe "hallucination" problems: they may fabricate non-existent data, invent URLs, and create fictitious citations. Even when blueprints explicitly require data verification, within the same execution context, AI often cannot effectively identify hallucinations it produced earlier.

This problem is especially severe in research-oriented MAS because:

- Final outputs require academic-level credibility
- Erroneous data leads to erroneous conclusions
- Hallucinated data, once entering the analysis stage, gets "laundered" into seemingly reasonable arguments

**Forces**:

- *Efficiency vs. Rigor*: Strict verification increases time cost
- *Trust vs. Verification*: Cannot blindly trust AI output; need independent verification
- *Completeness vs. Credibility*: Better to have less data that is credible than more data that is questionable
- *Automation vs. Human intervention*: Some verification may require human involvement

**Solution**: Establish full-chain verifiable data lineage. All data must have verifiable sources, maintain numbered traceability throughout, undergo layered verification in independent contexts, and unqualified data must be firmly eliminated.

Core principles:

1. **Data must have verifiable sources**: Every collected data item must have a URL or academic citation. Sources must be externally accessible and verifiable. Do not accept vague sourcing like "it is well known" or "reportedly."

2. **Full-chain numbering and tracing**: Raw materials have unique identifiers. Analysis materials cite raw material identifiers. Final report references point to verifiable sources.

3. **Independent context verification**: Data verification must be performed by a separate subagent. The verifier agent does not share context with the collector agent. This enables effective hallucination detection.

4. **Layered verification mechanism**: After collection—fact-checking (does the data actually exist?); After analysis—argument verification (do citations accurately support conclusions?)

5. **Unqualified data handling**: Untruthful data—firmly eliminate. Low-credibility sources—downgrade or eliminate. Uncertain credibility—clearly mark.

The data lineage chain:

```
External Source (URL/Academic Citation)
    |
    v
Raw Material [ID: SRC-001]
    | ← Post-collection verification: verify URL valid, content matches
    v
Analysis Material [ID: ANA-001, cites: SRC-001, SRC-003]
    | ← Post-analysis verification: verify citations accurate, arguments valid
    v
Final Report [References: URL list]
    |
    v
Externally Verifiable
```

**Example**: The industry analysis system includes a dedicated Data Verifier agent (`03.data_verifier.md`) that runs after deep research completes:

```markdown
# Data Verifier

## Your Role

You are an independent data verifier. Your task is to verify the
authenticity and credibility of collected data.

## Critical Principle

You must independently verify each data item. Do not assume prior
collection was correct. For each URL, you must actually visit and
confirm content matches. When you find problems, record them honestly—
do not "let things slide."

## Verification Content

### 1. Source Accessibility
- Visit each URL; confirm accessible
- Record inaccessible URLs

### 2. Content Matching
- Confirm URL content matches the collected summary
- Confirm quoted text actually exists in source
- Mark data items with mismatched content

### 3. Source Credibility
- Assess source authority (official > mainstream media > industry > personal)
- Mark low-credibility sources
```

The critical design choice is that verification runs in an **independent context**. A fresh subagent that did not perform the collection has no "memory" of what the data "should" be. It approaches verification without the cognitive biases that would prevent the original collector from recognizing its own hallucinations.

**Discussion**: Verifiable data lineage imposes significant overhead. The verification stage may take as long as the collection stage itself, as each URL must be re-visited and content re-examined. For the industry analysis system's 55 functional items, each with multiple sources, verification represents substantial runtime.

This cost is justified for outputs requiring high credibility. The eVTOL analysis report, with its 150+ cited sources, would be worthless if sources proved fictitious upon inspection. The verification stage caught and eliminated approximately 8-12% of initially collected data in test runs—a significant proportion that would have contaminated subsequent analysis.

For systems with lower credibility requirements, this pattern may be relaxed. But for research-oriented MAS producing analytical outputs that humans will rely upon, verifiable data lineage is essential.

