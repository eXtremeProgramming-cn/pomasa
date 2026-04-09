
## 5. Essential Patterns

This section presents eight patterns that form a self-contained network for building a working multi-agent system. The selection follows two principles. First, all six Must patterns are included, as they define the non-negotiable foundation of any declarative MAS: COR-02 (Intelligent Runtime), COR-01 (Prompt-Defined Agent), STR-01 (Reference Data Configuration), STR-06 (Methodological Guidance), BHV-02 (Faithful Agent Instantiation), and QUA-03 (Verifiable Data Lineage). Second, two Recommended patterns—BHV-01 (Orchestrated Agent Pipeline) and STR-02 (Filesystem Data Bus)—are included because they enable the "multi" in multi-agent systems, providing coordination and communication mechanisms respectively. The remaining twelve patterns extend and enhance this foundation; complete documentation is available in the POMASA repository.

The eight patterns form an interconnected network, organized here by the logical sequence of system construction. The foundation is COR-02 (Intelligent Runtime), which provides the execution environment capable of understanding natural language. This runtime enables COR-01 (Prompt-Defined Agent), which allows agents to be defined through natural language blueprints rather than code. Together, these two Core patterns establish the declarative paradigm.

From agent definition, three architectural concerns branch out. First, agents need external knowledge to perform their tasks—STR-01 (Reference Data Configuration) separates domain knowledge from agent blueprints, while STR-06 (Methodological Guidance) externalizes the "how to do things" knowledge: data sources, analysis methods, and output formats. Second, complex tasks require multiple agents working together—BHV-01 (Orchestrated Agent Pipeline) provides the coordination mechanism, while BHV-02 (Faithful Agent Instantiation) ensures agents are correctly invoked without information loss. Third, AI outputs require quality assurance—QUA-03 (Verifiable Data Lineage) ensures all data can be traced to verifiable sources.

The coordination branch continues: when agents exchange data, they need a communication medium—STR-02 (Filesystem Data Bus) uses the filesystem for transparent, traceable data passing.

Each pattern below follows a consistent format derived from the pattern language tradition [4]: **Context** (the situation in which the pattern applies), **Problem** (the design challenge being addressed), **Forces** (the competing concerns that make the problem difficult), **Solution** (the recommended approach), **Example** (concrete illustration from the industry analysis system), and **Discussion** (consequences, limitations, and related considerations).

### 5.1 COR-02: Intelligent Runtime

**Context**: You are building a system where agents are defined declaratively through natural language descriptions rather than imperative code.

**Problem**: Who executes the declaratively-defined agent behavior?

Traditional runtime environments (JVM, Python interpreter, shell) mechanically execute code instructions. They cannot understand natural language descriptions of intent. A declarative agent blueprint requires an execution environment capable of semantic understanding, decision-making, and adaptive behavior.

**Forces**:

- *Intelligence vs. Controllability*: The more intelligent the runtime, the less predictable its behavior
- *Adaptability vs. Consistency*: Ability to adapt to changes may cause execution inconsistency
- *Autonomy vs. Auditability*: Autonomous decision-making makes auditing difficult
- *Capability vs. Cost*: Intelligent runtimes require AI model access, incurring costs

**Solution**: Use an AI system with comprehension and decision-making capabilities as the runtime environment. The intelligent runtime understands natural language blueprints, selects execution methods, evaluates output quality, and handles exceptional situations. This solution accepts the trade-offs embedded in the forces: it prioritizes intelligence and adaptability while managing controllability through structured blueprints (COR-01), managing auditability through filesystem-based data passing (STR-02), and managing cost as an operational parameter rather than an architectural constraint.

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

**Example**: In the industry analysis system, Claude Code serves as the intelligent runtime. The Initial Scanner blueprint specifies detailed collection topics (industry definition, market size, ownership structure, policy environment), the methodology guide specifies source credibility tiers, and the output format is prescribed down to file names and markdown structure. The blueprint leaves little room for high-level decision-making—what to collect, where to look, and how to format outputs are all specified. The runtime's intelligence manifests at the *execution* level:

1. Navigating diverse web pages with varying structures—extracting relevant information from government statistics portals, news sites, and research databases that each present data differently
2. Handling unexpected situations during execution—a URL returns a PDF instead of HTML, a search yields no results for a specific sub-topic, a page requires different parsing strategies
3. Judging whether a specific piece of retrieved information actually matches the blueprint's specified topic (e.g., distinguishing "eVTOL market size" from "drone market size" when search results conflate the two)
4. Organizing heterogeneous raw information into the structured markdown format the blueprint prescribes
5. Self-checking output against the blueprint's completion criteria before reporting done

The blueprint specifies *what* to collect, *where* to look, and *what standards* to meet; the runtime handles the *execution-level complexity* of interacting with an unpredictable information environment. When difficulties arise, the blueprint requires the runtime to report rather than adapt independently—a deliberate constraint that preserves predictability.

**Discussion**: The intelligent runtime pattern has a profound architectural consequence: *every agent in a POMASA system possesses full cognitive capabilities*. Unlike traditional MAS frameworks where some agents may be simple executors while a dedicated "planner" or "reasoner" agent coordinates them, every POMASA agent runs on the same intelligent runtime and can plan, reason, evaluate, and adapt. Agent differentiation comes not from varying cognitive capabilities but from varying blueprints—different business responsibilities, domain knowledge, and quality criteria. A Deep Researcher agent does research not because it "can only search" but because its blueprint assigns it that responsibility.

This architectural choice means that POMASA does not prescribe which agents a system should have or what cognitive roles they should play. Questions like "which agent handles planning?" or "which agent manages state?" do not apply at the pattern language level. Planning is embedded in the orchestrator's blueprint (BHV-01). State is managed through the filesystem (STR-02). Memory is the collection of files agents have written. These are consequences of applying patterns, not roles assigned to specialized agents. POMASA provides design principles for building multi-agent systems, not a fixed system design.

The intelligent runtime pattern introduces platform considerations. POMASA is portable across multiple AI coding assistants (see Section 8.2), though runtimes vary in capability levels and subagent mechanisms. Claude Code currently provides the most mature implementation. Blueprint designers should avoid relying on runtime-specific features when portability is desired.

The non-determinism of intelligent runtimes challenges traditional software engineering assumptions. The same blueprint may execute differently across runs. This trade-off—flexibility for determinism—defines the declarative MAS paradigm.

### 5.2 COR-01: Prompt-Defined Agent

**Context**: You have an intelligent runtime (COR-02) capable of understanding and executing natural language instructions.

**Problem**: How do you define AI agent behavior?

Traditional approaches use code to specify every logical step. But when task complexity exceeds what fixed logic can express—when data sources have varying structures, external environments change unpredictably, and "quality" is a semantic concept—hardcoded rules become brittle. Quality standards like "objective, professional, conforming to academic norms" are semantic-level requirements that resist expression in procedural code.

**Forces**:

- *Flexibility vs. Predictability*: Declarative definitions enable flexibility but reduce execution certainty
- *Expressiveness vs. Ambiguity*: Natural language is expressive but may introduce ambiguity
- *Development efficiency vs. Runtime cost*: Development is highly efficient, but each execution consumes AI resources
- *Human readability vs. Machine executability*: Must find expression that serves both

**Solution**: Use natural language documents (Agent Blueprints) to describe what the agent "should do," "what standards to follow," and "what outcomes to achieve"—rather than specifying "exactly how to do it." Markdown's structured headings and templates tame ambiguity while preserving natural-language expressiveness; the declarative style trades runtime cost for dramatic development efficiency gains; and the same document remains readable by both human reviewers and AI runtimes.

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

**Discussion**: Prompt-defined agents trade determinism for adaptability. The same blueprint may produce different execution paths—a feature, not a bug. The agent adapts to what it finds rather than failing when reality doesn't match expectations. This declarative approach to agent definition has been validated by prior work such as Generative Agents [15], which demonstrated that natural language specifications can produce believable autonomous behavior.

The pattern also dramatically lowers the barrier to system maintenance. Domain experts who cannot program can read, understand, and modify agent blueprints. This democratizes system evolution.

### 5.3 STR-01: Reference Data Configuration

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

**Solution**: Externalize knowledge as independent data files, separate from agent blueprints. Blueprints reference these files; agents read and apply the knowledge at execution time. This balances centralization and distribution—knowledge is managed in dedicated files yet distributed to agents on demand. The domain/methodology split addresses generality vs. specificity: domain knowledge captures what is specific to the subject, while methodological guidance remains reusable across projects. Markdown format provides enough structure for machine processing while remaining freely editable by domain experts.

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

The choice of plain markdown files as the storage format for reference data is deliberate. One might expect a more sophisticated retrieval mechanism such as Retrieval-Augmented Generation (RAG) [16], which dynamically retrieves knowledge from vector databases at inference time. However, for intelligent runtimes (COR-02) capable of directly reading and searching files, structured markdown proves more effective. The Claude Code team at Anthropic arrived at the same conclusion empirically: after building RAG with vector databases into early prototypes, they found that agentic search—letting the AI use basic filesystem tools (glob, grep, read) to find information on demand—"outperformed everything, by a lot" [18]. Agentic search also eliminates the complexity of maintaining embedding indexes, avoids staleness when files change, and removes security concerns around external vector stores [18]. Reference data configuration follows this same principle: pre-positioned, human-readable markdown files that the intelligent runtime consults directly. That said, RAG remains a valid complement for scenarios involving very large or frequently updated knowledge bases where pre-positioning all data as files becomes impractical.

### 5.4 BHV-01: Orchestrated Agent Pipeline

**Context**: You have multiple agents defined through blueprints (COR-01) that need to collaborate to accomplish a complex task.

**Problem**: How do multiple agents coordinate to accomplish tasks that exceed any single agent's scope?

Complex tasks like "analyze an industry" cannot be accomplished by a single agent in a single execution. The task naturally decomposes into stages: first scan the landscape, then research details, then analyze findings, then synthesize conclusions, then generate reports. Each stage has different requirements and produces different outputs.

**Forces**:

- *Autonomy vs. Coordination*: Agents need freedom to execute but must align toward common goals
- *Parallelism vs. Dependencies*: Some work can proceed in parallel; other work depends on prior results
- *Simplicity vs. Capability*: Simple coordination is easier to implement but limits what the system can achieve
- *Centralization vs. Distribution*: Central orchestration enables control but creates bottlenecks

**Solution**: Decompose tasks into sequential stages, each handled by specialized agent types, coordinated by an Orchestrator agent. The stage-based pipeline resolves the forces through separation of concerns: agents retain autonomy *within* each stage while the orchestrator enforces coordination *between* stages; independent tasks within a stage can execute in parallel while cross-stage dependencies remain sequential; and the orchestrator provides centralized control over stage sequencing without becoming a bottleneck for intra-stage work.

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

**Discussion**: A critical question arises: where does the orchestrator's execution plan come from, and how is the complex work decomposed into tasks?

In POMASA, the orchestrator is itself a Prompt-Defined Agent (COR-01). Its blueprint explicitly defines the execution stages, which agent to invoke at each stage, what parameters to pass, and what completion criteria to check. The task decomposition is performed at *design time*—when a human architect writes the orchestrator blueprint—not at *runtime* through dynamic planning. The orchestrator executes a *predefined plan*, not a self-generated one. This is a deliberate architectural choice that distinguishes POMASA from autonomous planning systems: it sacrifices dynamic adaptability in exchange for predictability and debuggability.

The decomposition itself derives from the domain's natural structure. In the industry analysis system, the theoretical framework defines 55 functional items, which naturally map to 55 independent research tasks. The 7-stage pipeline (scan → research → verify → analyze → synthesize → report → review) follows the inherent logic of systematic research. Reference data (STR-01) and methodological guidance (STR-06) provide the decomposition rationale; the orchestrator blueprint encodes it.

The orchestrated pipeline pattern trades flexibility for predictability. The fixed stage sequence constrains what the system can do but makes behavior comprehensible and debuggable. When something goes wrong, you know which stage failed. This pattern relates to multi-agent coordination approaches in systems like AutoGen [7] and MetaGPT [8], though POMASA emphasizes declarative blueprints over programmatic agent definitions.

The pattern also enables incremental execution. If Stage 3 fails, Stages 1 and 2 outputs remain intact on the filesystem (STR-02). The system can resume from the failed stage rather than starting over—a property particularly valuable for long-running research tasks that may take hours to complete.

### 5.5 BHV-02: Faithful Agent Instantiation

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

**Solution**: Every agent instance must directly read and execute the complete blueprint. The caller passes only parameters, never blueprint content. Each independent task corresponds to an independent subagent invocation. The orchestrator must verify results against blueprint completion criteria. This solution resolves the forces decisively in favor of quality, completeness, and rigor—accepting the overhead of separate invocations and full blueprint reads as the price of reliable execution.

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

### 5.6 STR-02: Filesystem Data Bus

**Context**: You have multiple agents (COR-01) coordinated through a pipeline (BHV-01) that need to exchange data.

**Problem**: How do agents pass data to each other?

Multi-agent systems require data exchange between agents. Traditional solutions (API calls, message queues, shared databases) require additional infrastructure, complex configuration, and network programming. AI multi-agent systems need a data passing mechanism that naturally fits the runtime, is fully traceable, is human-readable and editable, and requires minimal deployment complexity.

**Forces**:

- *Simplicity vs. Functionality*: File systems are simple but lack transactions, queries, and other advanced features
- *Transparency vs. Performance*: All data being visible enables transparency but increases I/O overhead
- *Loose coupling vs. Real-time*: File-based loose coupling cannot support real-time communication
- *Human readability vs. Machine efficiency*: Text formats are human-friendly but less efficient to process

**Solution**: Use the filesystem as the data passing medium. Agents read and write JSON and Markdown files through agreed-upon file paths. They do not communicate directly. This solution deliberately favors simplicity, transparency, and human readability over functionality, performance, and real-time communication—a trade-off well suited to batch-oriented research systems where debuggability matters more than throughput.

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

### 5.7 STR-06: Methodological Guidance

**Context**: You have agents defined through blueprints (COR-01) with externalized domain knowledge (STR-01). STR-01 has given agents the "what"—domain concepts, theoretical frameworks, classification systems—but not the "how."

**Problem**: How do you ensure AI agents execute tasks according to correct methodology?

Domain knowledge tells agents what concepts mean and how a theoretical framework is structured. But agents also need to know: where to find data, how to assess source credibility, what analytical methods to apply, and what format to use for outputs. Without this methodological guidance, systems suffer from inconsistent data quality (agents not knowing which sources are credible), insufficient analysis depth (agents not knowing which questions to answer), inconsistent output formats (each agent deciding format independently), and difficulty adjusting methodology (requiring modifications to multiple blueprints).

**Forces**:

- *Specificity vs. Flexibility*: Too specific methodology limits agent adaptability; too flexible leads to inconsistent execution
- *Completeness vs. Conciseness*: Complete methodological guides are lengthy; concise ones may miss critical procedures
- *Generality vs. Specialization*: General methods apply broadly but lack precision; specialized methods are precise but narrow
- *Standardization vs. Innovation*: Strict methodological standards ensure consistency but may inhibit the agent's ability to adapt to unexpected findings

**Solution**: Externalize methodological guidance as independent configuration files, managed separately from domain knowledge. While STR-01 addresses both domain knowledge and methodology at a structural level, this pattern provides detailed guidance on the methodology component specifically. The key to resolving the forces is making guidance *specific enough to be executable* yet *structured as reference rather than script*—concrete credibility tiers and analysis checklists ensure standardization and completeness, while the intelligent runtime retains flexibility to adapt methods to specific situations.

Organize methodology into four components:

1. **Research Overview** (`research-overview.md`): Research objectives, scope, analytical stance, and core questions to answer
2. **Data Sources Guide** (`data-sources.md`): Source types with credibility ratings, sources to use cautiously, and standard recording formats
3. **Analysis Methods Guide** (`analysis-methods.md`): Analytical framework, core questions for each analysis point, step-by-step process, and results format
4. **Output Template** (`output-template.md`): Document structure, format specifications, writing style requirements, and quality checklist

Critical design principle: methodological guidance must be **specific enough to be executable**—not vague generalizations like "pay attention to data quality" but concrete instructions like "data sources are divided into five credibility tiers: government statistics (High), academic publications (High), industry reports (Medium-High), mainstream media (Medium), other sources (Low)."

**Example**: The industry analysis system's data sources guide includes:

```markdown
## Data Source Types

### 1. Government Statistics and Policy Documents
- Priority: High
- Credibility: High
- Examples: National Bureau of Statistics, ministry announcements

### 2. Academic Publications
- Priority: High
- Credibility: High
- Examples: CNKI, SSRN, peer-reviewed journals

### 3. Industry Research Reports
- Priority: High
- Credibility: Medium-High
- Examples: Consulting firm reports, brokerage research

## Sources to Use Cautiously
- Personal blogs without professional credentials
- Self-media content lacking data support
- Content with obvious commercial promotional intent
```

The analysis methods guide specifies five core questions that every functional item analysis must answer—function manifestation, positive effects, deficiencies, interactions with other ownership forms, and improvement directions—each with concrete analytical guidance.

**Discussion**: Methodological guidance enables separation of concerns along a different axis than domain knowledge. Domain experts maintain what concepts mean; methodology experts maintain how research should be conducted; system developers maintain agent blueprints. Each can evolve independently. The forces in this pattern are resolved through the specificity of the guidance: concrete, checklist-driven methodology provides consistency without requiring agents to follow rigid scripts, because the intelligent runtime can adapt the methodology to specific situations while respecting its constraints.

The pattern also supports system reuse across domains. The same methodological guidance—data source tiers, analysis question templates, output formats—can apply to different industries or research topics. Combined with different domain knowledge (STR-01), the methodology produces different but consistently structured analyses.

STR-03 (Workspace Isolation) complements STR-06 by ensuring that agents following these methodological procedures operate within designated directories, preventing cross-project contamination of both data and methodology.

### 5.8 QUA-03: Verifiable Data Lineage

**Context**: You have a multi-agent system that collects, processes, and synthesizes data to produce analytical outputs.

**Problem**: How do you ensure that data and conclusions produced by the AI system are trustworthy?

AI systems, especially LLMs, suffer from severe "hallucination" problems [17]: they may fabricate non-existent data, invent URLs, and create fictitious citations. Even when blueprints explicitly require data verification, within the same execution context, AI often cannot effectively identify hallucinations it produced earlier.

This problem is especially severe in research-oriented MAS because:

- Final outputs require academic-level credibility
- Erroneous data leads to erroneous conclusions
- Hallucinated data, once entering the analysis stage, gets "laundered" into seemingly reasonable arguments

**Forces**:

- *Efficiency vs. Rigor*: Strict verification increases time cost
- *Trust vs. Verification*: Cannot blindly trust AI output; need independent verification
- *Completeness vs. Credibility*: Better to have less data that is credible than more data that is questionable
- *Automation vs. Human intervention*: Some verification may require human involvement

**Solution**: Establish full-chain verifiable data lineage. All data must have verifiable sources, maintain numbered traceability throughout, undergo layered verification in independent contexts, and unqualified data must be firmly eliminated. The solution resolves the forces by prioritizing rigor over efficiency (verification doubles runtime but eliminates hallucination contamination), verification over trust (independent context prevents self-confirmation bias), and credibility over completeness (less data with verified sources is more valuable than more data of uncertain provenance).

Core principles:

1. **Data must have verifiable sources**: Every collected data item must have a URL or academic citation. Sources must be externally accessible and verifiable. Do not accept vague sourcing like "it is well known" or "reportedly."

2. **Full-chain numbering and tracing**: Raw materials have unique identifiers. Analysis materials cite raw material identifiers. Final report references point to verifiable sources.

3. **Independent context verification**: Data verification must be performed by a separate subagent. The verifier agent does not share context with the collector agent. This enables effective hallucination detection.

4. **Layered verification mechanism**: After collection—fact-checking (does the data actually exist?); After analysis—argument verification (do citations accurately support conclusions?)

5. **Unqualified data handling**: Untruthful data—firmly eliminate. Low-credibility sources—downgrade or eliminate. Uncertain credibility—clearly mark.

The data lineage chain works as follows:

1. **Collection**: An agent collects data from external sources. Each data item is assigned a unique identifier (e.g., SRC-001) and must include its source URL or academic citation.

2. **Post-collection verification**: A separate verifier agent—running in an independent context with no memory of the collection process—visits each URL to confirm the source exists and the collected content accurately reflects it. Data that fails verification is eliminated.

3. **Analysis**: Analyzer agents process verified data to produce analytical materials. Each analysis item (e.g., ANA-001) explicitly cites the raw material identifiers it draws from (e.g., "cites: SRC-001, SRC-003").

4. **Post-analysis verification**: Another verification pass confirms that citations accurately support the conclusions drawn. Arguments that misrepresent or overreach their sources are flagged.

5. **Report generation**: The final report includes a reference list pointing back to the original external sources. Any reader can trace any claim back through the analysis to its verified source.

The end result is a complete audit trail: every claim in the final output can be traced back to a verifiable external source, with verification checkpoints at each transformation stage.

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

This cost is justified for outputs requiring high credibility. The eVTOL analysis report, with its hundreds of cited sources, would be worthless if sources proved fictitious upon inspection. In practice, the verification stage consistently identifies and eliminates a non-trivial proportion of initially collected data—URLs that no longer exist, content that doesn't match the claimed summary, or sources that lack credibility. This contaminated data would otherwise propagate through analysis and corrupt conclusions.

For systems with lower credibility requirements, this pattern may be relaxed. But for research-oriented MAS producing analytical outputs that humans will rely upon, verifiable data lineage is essential.


