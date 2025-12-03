# Architectural Dissection of Declarative Multi-Agent Systems (Part 1)

## Part I: Introduction

### AI is Changing the Fundamental Assumptions of Architecture

What are we really discussing when we talk about software architecture? Traditionally, we discuss how to organize classes, divide modules, design APIs, and manage data flows. The fundamental assumption underlying these discussions is that system behavior is precisely defined through code, and the runtime environment mechanically executes these definitions. From Erich Gamma et al.'s "Design Patterns" to Martin Fowler's "Patterns of Enterprise Application Architecture," over half a century of software engineering wisdom has been built upon this basic assumption.

However, when AI models become the core execution units of a system, this assumption begins to waver. System behavior is no longer precisely specified by code but guided by intents and standards described in natural language. The runtime environment is no longer a passive executor but an active understander and decision-maker. Many concepts from traditional architectural patterns—such as interfaces, abstract classes, and dependency injection—begin to seem overly mechanical and low-level, while new architectural concepts—such as Agent Blueprints, intelligent runtimes, and data-driven behavior—begin to emerge.

This is not a simple replacement of technology stacks but a fundamental shift in architectural thinking. We face a critical question: How do we describe and discuss the architecture of such new types of systems? Is the traditional architectural vocabulary sufficient? What kind of new pattern language do we need?

### Why We Need a Pattern Language

In the preface to "Patterns of Enterprise Application Architecture," Martin Fowler wrote: "The value of patterns lies not in novelty but in codifying time-tested solutions into communicable forms." A pattern language is a sign of industry maturity—it indicates we have moved from individual case exploration to systematic knowledge accumulation.

Currently, the development of AI multi-agent systems is still in the exploratory phase. Every team is building systems in their own way, using their own terminology to describe architecture. The word "agent" may refer to completely different concepts in different systems. The lack of a common pattern language makes knowledge difficult to disseminate, experience difficult to reuse, and problems difficult to discuss clearly.

What we need is a pattern language specifically for AI multi-agent systems—not rigidly applying traditional patterns, nor creating concepts out of thin air, but extracting reusable design knowledge from actual systems, naming this knowledge, clarifying its applicable scenarios and trade-offs, and revealing the relationships between patterns. This is precisely the goal of this article.

### System Overview

The system analyzed in this article appears simple on the surface: it automatically generates a monthly report tracking the activities of certain organizations. However, when you observe its operation closely, you'll find it represents a new paradigm of software construction—the system contains not a single line of traditional "code." Instead, it consists of:

- **1,200 lines of natural language prompts in Markdown format**, describing what agents should do
- **1,400 lines of reference data in JSON and Markdown formats**, defining domain knowledge and quality standards
- **An intelligent runtime environment** (Claude Code) that understands these descriptions and executes them intelligently

The system's core workflow is: search for all public activities of six organizations in a specific month, transform unstructured web content into structured data, then transform it into academically compliant Chinese reports, and finally perform quality checks and integration. The entire process involves extensive web searching, information extraction, language generation, and quality judgment. Traditionally, this would require thousands of lines of crawler code, data cleaning logic, template engines, and validation rules.

More importantly, this architecture is not a technical showcase but a well-considered solution to a specific problem. It excels in batch processing, information-intensive, quality-first scenarios, but also clearly knows its boundaries—it's not suitable for real-time systems, scenarios requiring extreme determinism, or offline environments. Understanding the value of this architecture lies in understanding the design philosophy it represents: **Under the right constraints, the combination of declarative + intelligent runtime can bring quantum leaps in development efficiency, adaptability, and maintainability**.

This system provides us with a concrete, analyzable case from which we can extract patterns, understand trade-offs, and explore architectural design principles for the AI era.

### Analytical Methodology: Learning from PoEAA

When describing this system's architecture, we face a methodological question: How do we systematically analyze and present architectural knowledge? Fortunately, we have Martin Fowler's "Patterns of Enterprise Application Architecture" as a methodological reference.

Fowler's book succeeds not only because it catalogs valuable patterns but also because it employs an effective narrative structure: **narrative first, then patterns**. The first part of the book ("The Narratives") builds readers' understanding of domain problems through problem-driven narration, introducing core concepts and trade-offs. The second part ("The Patterns") is a structured pattern catalog, with each pattern following a fixed format: problem, solution, trade-offs, examples.

The wisdom of this structure lies in: **Patterns don't appear out of thin air but naturally emerge from concrete problems**. If you present a list of patterns directly, readers will find them abstract and empty; but if you first establish problem awareness through narrative, the value of patterns becomes obvious.

This article borrows this approach but makes adaptive adjustments:

**Part One: Architectural Dissection** (this article)
- Establish vocabulary: clearly define core concepts in the system
- Static structure analysis: dissect file organization and design intent
- Dynamic execution tracing: understand runtime mechanisms through a complete execution
- Runtime environment analysis: deeply understand the role of intelligent runtime

**Part Two: Patterns and Reflections** (following article, to be continued)
- Architectural pattern extraction: abstract reusable patterns from concrete systems
- Pattern language construction: reveal the network of relationships between patterns
- Comparative study: compare with traditional architecture and other AI systems
- Comprehensive reflection: what does this architecture represent and what does it foretell

This structure ensures depth and systematicity of analysis: we don't superficially enumerate features but dissect layer by layer, from concrete to abstract, from observation to insight, from description to judgment.

More importantly, we follow a principle emphasized by Fowler: **problem-driven, not technology-driven**. We're not building a system to show off AI technology but to solve a real problem—how to efficiently generate high-quality monthly tracking reports. The technology choices (declarative, intelligent runtime, file system data bus) all originate from this problem, through careful trade-offs.

Now, let's begin our journey of architectural dissection.

---

## Part II: Architectural Dissection

### Step One: Establishing Vocabulary

Before analyzing the architecture of this multi-agent system, we face a fundamental difficulty: the lack of a clear set of vocabulary to describe various concepts in the system. The word "Agent" is used to refer to different things in different contexts—sometimes referring to a Markdown file, sometimes to an instance executing a task, and sometimes to the entire Claude Code environment. This vocabulary ambiguity hinders our clear understanding of the architecture.

Let's identify and define core concepts from two dimensions: static structure (design time) and dynamic structure (runtime).

#### Core Concept One: Agent Blueprint

**Definition**: Markdown files stored in the `prompts/` directory that use natural language to describe in detail what tasks an agent should complete, what specifications to follow, and how to collaborate with other components.

**Typical Examples**:
- `01-research-agent.md`: defines the Research Agent's responsibilities, search strategies, and data recording requirements
- `02-writing-agent.md`: defines the Writing Agent's writing tasks, style specifications, and quality standards

**Key Characteristics**:
- Uses declarative natural language rather than imperative code
- Describes "what to do" and "quality standards" in detail but doesn't prescribe "how to do it"
- Contains structured information including role definition, task parameters, reference materials, workflow, and output requirements
- Can include parameter placeholders (such as `{ORGANIZATION_ID}`, `{YEAR}`) that are replaced during instantiation

**Naming Rationale**: We chose the word "Blueprint" because it emphasizes the design nature of these files—they are design blueprints for agents, not agents themselves. An architect's blueprint is not a building but a description of a building; similarly, an Agent Blueprint is not an Agent but a description of Agent behavior.

#### Core Concept Two: Agent Instance

**Definition**: At runtime, an agent entity created based on an Agent Blueprint that is executing a specific task. An Agent Instance is an execution unit launched by the runtime environment (Claude Code) by reading an Agent Blueprint and combining it with specific parameters.

**Typical Example**: When the Orchestrator starts Phase One, it creates 6 Research Agent Instances based on `01-research-agent.md`, each responsible for searching activities of 6 different organizations. Each Instance receives different parameters, and these 6 Instances execute in parallel, independently of each other.

**Key Characteristics**:
- Has independent execution context and state
- Has specific task parameters (such as target organization, target month)
- Can execute in parallel (multiple Instances running simultaneously)
- Produces output (files) after completing tasks, then terminates

**Comparison with Traditional Concepts**: Similar to "object instances" in object-oriented programming, Blueprint is the "class," and Instance is the "object." Unlike traditional "processes," Agent Instances are driven by AI models and possess understanding, reasoning, and decision-making capabilities.

#### Core Concept Three: Runtime Environment

**Definition**: The environment that provides all the infrastructure and capabilities required for Agent Instance execution. In this system, this role is fulfilled by Claude Code.

**Capabilities Provided**:
- **File system operations**: create directories, read files, write files, search files
- **Network capabilities**: search engines, web scraping, content extraction
- **Agent management**: start Agent Instances, pass parameters, parallel scheduling, wait for completion
- **Tool integration**: provides Read, Write, WebSearch, WebFetch, and other tools
- **Intelligent decision-making**: understands natural language instructions and transforms them into concrete actions

**Key Characteristics**: Not just a passive "container" but an intelligent environment that actively participates in decision-making. Capable of understanding natural language instructions (Agent Blueprints) and transforming them into concrete actions.

**Naming Issue**: The term "Runtime Environment" may not be precise enough, as Claude Code's role far exceeds traditional runtime environments. It's more like an "Intelligent Execution Platform." However, to maintain continuity with traditional terminology, we'll use Runtime Environment for now while clarifying its "intelligent" characteristics.

#### Core Concept Four: Data Bus

**Definition**: The mechanism through which Agent Instances pass data to each other. In this system, the file system serves as the data bus.

**How It Works**:
- Research Agent Instances write search results to `data/{YYYY-MM}/raw/{org_id}/`
- Writing Agent Instances read from the raw directory and write reports to `data/{YYYY-MM}/drafts/`
- Integration QA Agent reads from the drafts directory and generates the final report to `data/{YYYY-MM}/final/`

**Key Characteristics**:
- Based on conventional directory structure and file naming
- Uses standardized data formats (JSON, Markdown)
- Loose coupling: Agents don't need to know about each other, only the location and format of data
- Traceable: all intermediate artifacts are preserved

**Design Trade-off**: Using the file system as a data bus sacrifices performance and real-time capabilities in exchange for simplicity, inspectability, and natural alignment with AI tools.

#### Core Concept Five: Reference Data

**Definition**: Structured data and documents stored in the `references/` directory used to regulate and guide Agent behavior.

**Specific Content**:
- `organizations.json`: defines basic information about organizations to be tracked
- `activity-types.json`: defines a classification system of 84 activity types
- `activity-record-template.json`: defines the standardized field structure for activity records
- `output-format-guide.md`: detailed report writing specifications (1,028 lines)

**Architectural Significance**: The existence of Reference Data embodies the "data-driven" architectural philosophy—system behavior is not hardcoded in Agent Blueprints but defined by external data. Changing Reference Data can change system behavior without modifying Agent Blueprints.

#### Correspondence Between Static and Dynamic

A key to understanding this system is distinguishing between static structure (design time) and dynamic structure (runtime):

**Static Structure** (visible in the file system):
```
project/
├── prompts/              # Agent Blueprints
├── references/           # Reference Data
└── data/                 # Data Bus (structure definition)
```

**Dynamic Structure** (runtime):
```
[Orchestrator Instance]
    ↓ Reads 01-research-agent.md, parameterizes, launches in batch
[Research Agent × 6] executes in parallel
    ↓ Writes to raw/ directory
[Writing Agent × 6] executes in parallel
    ↓ Writes to drafts/ directory
[Integration QA Agent × 1] executes serially
    ↓ Writes to final/ directory
```

| Static Element | Dynamic Element | Relationship |
|---------------|-----------------|--------------|
| Agent Blueprint | Agent Instance | Blueprint is the template, Instance is the running entity |
| Reference Data | Agent Instance input | Data guides Instance behavior |
| Data directory structure | Data Bus | Directory defines data flow paths |
| Runtime Environment | No static counterpart | Runtime infrastructure |

With this precise vocabulary, we can now clearly discuss the system's architecture without falling into the quagmire of terminology confusion.

### Step Two: Static Structure Analysis

Opening the project directory, you'll see a clear three-layer separation:

```
project/
├── prompts/              # Behavior definition layer (1,200 lines Markdown)
│   ├── 00-orchestrator.md        (220 lines)
│   ├── 01-research-agent.md      (262 lines)
│   ├── 02-writing-agent.md       (331 lines)
│   └── 03-integration-qa-agent.md(398 lines)
│
├── references/           # Domain knowledge layer (1,400 lines data)
│   ├── organizations.json        (6 organization metadata)
│   ├── activity-types.json       (84 activity types)
│   ├── activity-record-template.json (data contract)
│   └── output-format-guide.md    (1,028 lines quality specifications)
│
└── data/                 # Runtime data layer
    └── {YYYY-MM}/        # Partitioned by month
        ├── raw/          # Phase 1 output: structured data
        ├── drafts/       # Phase 2 output: report drafts
        └── final/        # Phase 3 output: final report
```

This structure is not a random pile of files but an embodiment of deliberate architectural design. Let's dissect it layer by layer.

#### Behavior Definition Layer: prompts/ Directory

File names are numbered with prefixes (00, 01, 02, 03), which not only facilitate sorting but more importantly **reflect the execution order**:
- **00-orchestrator**: executes first, responsible for launching all other agents
- **01-research-agent**: executes in phase one, conducts information searching
- **02-writing-agent**: executes in phase two, conducts report writing
- **03-integration-qa-agent**: executes in phase three, conducts integration quality assurance

This numbering convention makes the system's execution flow clear at a glance in the directory structure—a **self-documenting** design.

Although the four Agent Blueprints define different agents, they follow a common structural pattern:

```markdown
# Agent Blueprint Structural Pattern

## Your Role
[Define the agent's identity and overall responsibilities]

## Task Parameters
[List parameters the agent receives, including placeholders]

## Reference Materials
[Indicate Reference Data files to be read]

## [Core Work Content]
[Detailed task description, strategies, processes]

## Output Requirements
[Clear deliverable standards and file paths]

## Completion Standards
[Quality checklist]
```

This common structural pattern embodies: **consistency** (reduces understanding cost), **completeness** (ensures necessary information), **composability** (clear inputs and outputs), **quality orientation** (every Blueprint includes completion standards).

Particularly noteworthy is the special status of `00-orchestrator.md`. It is not just an Agent Blueprint but the "meta-program" of the entire system—it describes how to coordinate other agents. From a software engineering perspective, the Orchestrator is like a "compiler" or "interpreter"—it reads other Blueprints and transforms them into executable Agent Instances. But unlike traditional compilers, this "compilation" process is understood and executed by AI.

#### Knowledge Layer: references/ Directory

This layer contains four types of Reference Data, each externalizing one kind of knowledge:

**1. organizations.json: Search Space Definition**
Defines the system's **search targets**. To track new organizations, simply add new entries to this file without modifying Agent Blueprints. This embodies **data-driven extensibility**.

**2. activity-types.json: Domain Ontology**
A hierarchical classification system of 84 activity types across 10 major categories. This is not simple "configuration" but an encoding of systematic understanding of the "organizational activities" domain.

**3. activity-record-template.json: Data Contract**
Defines the standardized field structure for activity records. This template ensures that data produced by Research Agents has consistent structure, Writing Agents know how to interpret it, and Integration QA Agents know how to validate it. Fields are divided into three priority levels—critical, important, supplementary—embodying a **pragmatic data quality strategy**.

**4. output-format-guide.md: Quality Specification**
1,028 lines of detailed writing specifications, transforming the vague concept of "what is a high-quality report" into operational standards. The scale of this file indicates that **defining quality standards is one of the most complex parts of the system**, reflecting a design philosophy: quality is not inspected but designed and guided into existence.

These four files constitute **layered domain knowledge externalization**:

```
Layers of domain knowledge:
├── Metadata layer: organization information (whom we track)
├── Ontology layer: concept classification system (what types of activities exist)
├── Schema layer: data structure definition (how data should be organized)
└── Specification layer: quality standards (what a good report looks like)
```

Each layer can evolve independently, with clear responsibility boundaries, and the same knowledge can be used by multiple Agents.

#### Data Layer: data/ Directory

The top level is partitioned by time period (`{YYYY-MM}/`), reflecting the system's **batch processing** nature: each monthly report is an independent, complete execution unit.

Within each month's directory, data is divided into three layers by processing stage:

```
raw/      (Research Agent output)
  ↓ From unstructured to structured
drafts/   (Writing Agent output)
  ↓ From structured to narrative
final/    (Integration QA Agent output)
  ↓ From distributed to integrated
```

This three-layer structure directly maps to the system's three-phase processing flow, embodying several key characteristics:

**Unidirectional Data Flow**: Data only flows forward, never backwards. This design simplifies reasoning, supports parallelism, and supports retries.

**Organization-based Storage**: At the raw/ layer, each organization has an independent subdirectory, allowing 6 Research Agent Instances to write in parallel without conflicts.

**Dual-file Pattern**: Each organization directory contains `activities.json` (machine-readable) and `sources.md` (human-readable), balancing machine processing and human review needs.

**Uniqueness of Final Layer**: The final/ layer contains `report-{YYYY-MM}.md` (result) and `qa-checklist.md` (process), embodying **equal emphasis on process and result**. The qa-checklist not only records "checks passed" but also "what was checked" and "what was found," making the quality process transparent.

#### Overall Architectural Patterns of Static Structure

Synthesizing the three directories, we can identify several key architectural patterns:

**Pattern 1: Three-layer Separation of Code-Data-Runtime**
```
prompts/    ← Defines "what to do"
    ↑ read
references/ ← Provides "standards and specifications"
    ↑ read
data/       ← Stores "execution results"
```

The three layers have unidirectional dependencies with no reverse dependencies.

**Pattern 2: Declarative Configuration Pattern**
The entire system's behavior is defined by behavioral configuration (Agent Blueprints) and data configuration (Reference Data). Changing configuration can change system behavior while the runtime environment remains unchanged. This is similar to "infrastructure as code" but applied to agent systems: **behavior as declaration**.

**Pattern 3: File System as Database**
The system treats the file system as a database: directory structure is like table structure, JSON files are like table records, file existence is like transaction completion flags. This design sacrifices performance in exchange for simplicity, inspectability, version control friendliness, and AI friendliness.

**Pattern 4: Convention Over Configuration**
The system extensively uses conventions to reduce explicit configuration: file naming conventions (`00-`, `{YYYY-MM}`), directory structure conventions (`data/{YYYY-MM}/raw/{org_id}/`), filename conventions (`activities.json` always stores activity data). These conventions mean Agent Blueprints don't need to explicitly configure file paths, reducing configuration and enhancing consistency.

#### Missing Elements

It's worth noting some elements common in traditional software but missing here:

**No Traditional Code Files**: The system has no `.py`, `.js`, or other code files. This absence is **an intentional architectural decision**, reflecting the designer's choice to declaratively express everything that can be delegated to AI decision-making.

**No Test Code**: This raises an interesting question: how do you test a declarative system driven by AI? The quality assurance strategy adopted by the system is: embed "completion standards" in Agent Blueprints, conduct comprehensive quality checks with Integration QA Agent, and preserve all intermediate artifacts for human review. This may represent **a new paradigm for AI system quality assurance**: shifting from "testing correctness" to "validating compliance with specifications."

**No Dependency Management Files**: The system's "dependencies" are tools and capabilities provided by the Runtime Environment, which are implicit and embedded in Claude Code. This simplifies deployment but also increases binding to a specific Runtime Environment.

**No Configuration Files**: The system's "configuration" is already integrated into Reference Data and Agent Blueprints, with no independent runtime configuration layer.

### Step Three: Dynamic Execution Tracing

Static structure tells us what the system "is," while execution tracing reveals how the system "works." Let's observe the system's dynamic behavior through a complete generation process of the September 2025 monthly report.

#### Initialization Phase: Startup and Preparation

The execution starting point is when the Orchestrator Agent receives the instruction: generate the September 2025 monthly report.

The Orchestrator's first action is to read its own Agent Blueprint—`00-orchestrator.md`. This action is crucial because it embodies the system's core architectural characteristic: **separation of behavior and execution**. The Orchestrator doesn't execute tasks through hardcoded program logic but by reading a natural language-described blueprint to understand what it should do.

After reading the prompt, the Orchestrator immediately plans the entire workflow and transforms it into a task list:

```
- [ ] Confirm reference files exist
- [ ] Create 2025-09 working directory structure
- [ ] Phase 1: parallel information search for 6 organizations
- [ ] Phase 2: parallel report writing for 6 organizations
- [ ] Phase 3: integration QA to generate final report
- [ ] Deliver final report to user
```

This task list is not only a progress tracking tool but **a materialization of the execution plan**, revealing the Orchestrator's understanding of the entire process: six steps, three main phases, from data preparation to final delivery, embodying a **pipeline architecture**.

The Orchestrator then validates that all required reference files exist (organizations.json, activity-types.json, activity-record-template.json, output-format-guide.md). This seemingly simple check embodies a **defensive design principle**: before launching expensive web search tasks, ensure all necessary infrastructure and configuration are in place.

Then the Orchestrator creates the working directory structure needed for this execution:

```bash
mkdir -p data/2025-09/raw/{org_1,org_2,org_3,org_4,org_5,org_6}
mkdir -p data/2025-09/drafts
mkdir -p data/2025-09/final
```

This is an embodiment of the **file system-based Data Bus pattern**. The directory structure itself contains architectural information: subdivision by organization under `raw/` implies a data partitioning strategy, and the three-layer directory structure (**raw → drafts → final**) directly maps to the three stages of data refinement.

#### Phase One: Parallel Information Search

After the working directory is prepared, the Orchestrator enters Phase One: information search. The core is launching 6 parallel Research Agent Instances, each responsible for searching activities of 6 different organizations.

The Orchestrator first reads the content of `01-research-agent.md`. This action is noteworthy: the Orchestrator doesn't inherently know how to launch Research Agents but learns by reading the Agent Blueprint. This again embodies the system's **declarative nature**.

Subsequently, the Orchestrator initiates 6 parallel Task calls in the same message:

```
Task: Search Organization A September 2025 activities
Task: Search Organization B September 2025 activities
Task: Search Organization C September 2025 activities
...
```

Each Task's input includes:
- **subagent_type**: "general-purpose"
- **description**: human-readable task description
- **prompt**: complete Agent Blueprint content with parameter placeholders replaced

This **parameterized Agent instantiation** mechanism is key to the system achieving scalability. The same Agent Blueprint, instantiated with different parameters, produces 6 independent Agent Instances.

From execution timestamps, all 6 Research Agents completed within approximately 10 minutes. If executed serially, total time would be 6 times the current time. **Parallelization** brings significant performance improvement.

But parallelization is not just a performance optimization technique; it's more a **reflection of architectural constraints**. Why can these 6 Agents run in parallel? Because they have **no data dependencies**. Each Agent is responsible for an independent organization, the information searched doesn't overlap, and the data produced is written to different directories. This design embodies the principle of **statelessness and data partitioning**.

Each Research Agent's work process is:
1. Web search: use WebSearch tool to search for specific organization's activities in September 2025
2. Content extraction: use WebFetch tool to access relevant web pages and extract activity information
3. Data structuring: according to `activity-record-template.json`, transform unstructured web content into structured JSON
4. File writing: write data to `data/2025-09/raw/{org}/activities.json`, while creating `sources.md` to record information sources
5. Summary report: generate brief summary reporting search results

This process demonstrates the unique advantage of AI agents: **understanding and structuring of unstructured data**. Traditional crawlers can scrape web pages but have difficulty understanding semantics and cannot accurately extract the abstract concept of "activities." Through language models, Research Agents can identify what information constitutes an "activity" and map it to predefined data structures.

After all 6 Research Agents complete, the Orchestrator conducts a Phase One summary, generating a detailed search results overview table and extracting cross-organizational patterns. This **meta-level monitoring** is an important responsibility of the Orchestrator role: not only coordinating processes but also evaluating quality and identifying anomalies.

#### Phase Two: Parallel Report Writing

After Phase One completes, the system enters Phase Two: report writing. The pattern is highly similar to Phase One.

The Orchestrator reads `02-writing-agent.md`, then again launches 6 Agent Instances in parallel, each responsible for writing one organization's report section.

This pattern repetition is **architectural pattern reuse**. The Orchestrator seems to follow a general coordination strategy: read Agent Blueprint → instantiate one Agent for each data partition → wait for all Agents to complete → aggregate results. The generality of this strategy makes the system easily extensible.

The Writing Agent's input is the output of Phase One: `activities.json` and `sources.md` under the `data/2025-09/raw/{org}/` directory. The task is to transform this structured JSON data into Chinese Markdown reports conforming to format specifications.

This transformation process involves several key intelligent tasks:
- Data parsing: read and understand JSON structure
- Content organization: decide activity presentation order
- Language generation: transform structured fields into fluent Chinese narrative
- Format control: follow style specifications in `output-format-guide.md`
- Citation management: annotate information sources for each activity
- Length control: ensure each activity description is of reasonable length

These tasks, if implemented with traditional programming, would require complex template engines, natural language generation systems, and format validation logic. Through language model capabilities, Writing Agents can accomplish everything within a unified framework. This demonstrates another advantage of AI agents: **unified handling of multiple intelligent tasks**.

After all Writing Agents complete, the Orchestrator again aggregates and explicitly lists writing quality assurance checkpoints, embodying a **layered quality control strategy**.

#### Phase Three: Integration and Quality Assurance

The first two phases both adopt parallelization strategies, but Phase Three adopts a completely different pattern: launching a **single** Integration QA Agent.

This shift is not accidental but determined by task nature. Integration tasks need to read all 6 organizations' draft reports, merge them into a unified document, and conduct cross-chapter consistency checks. These operations are essentially **global** and cannot be partitioned for parallelization. This embodies: **parallelization is not universal; some tasks are naturally serial**.

The Integration QA Agent's tasks are multifaceted:
- Document integration: read all `drafts/{org}.md`, merge according to unified structure
- Format unification: ensure Markdown format consistency throughout the document
- Language polishing: check and correct language expression
- Fact-checking: verify information accuracy, check citation completeness
- Quality assessment: evaluate report on various dimensions according to predefined QA checklist
- Issue correction: make necessary corrections if problems are found

The Integration QA Agent produces two key outputs:
- `final/report-2025-09.md`: final integrated complete report
- `final/qa-checklist.md`: QA checklist recording results of all check items

The existence of the second file is particularly noteworthy. It's not just an internal work product but **traceability evidence of the quality assurance process**. Anyone can review this checklist to understand what checks the report underwent. This transparency is rare in traditional automated systems.

#### Overall Picture of Control Flow and Data Flow

Through complete execution tracing, we can see the system's control flow pattern:

**Phase-driven State Machine**:
```
Initialization → Phase 1 (Research) → Phase 2 (Writing) → Phase 3 (Integration QA) → Delivery
```

The trigger condition for each state transition is: **all Agents of the previous phase complete**. This is a **completion-based synchronization mechanism**, similar to **Barrier Synchronization**.

Data undergoes three refinement levels in the system:

```
Web content (unstructured)
  → activities.json (structured)
    → drafts/{org}.md (narrative)
      → final/report.md (integrated)
```

Each arrow represents processing by an Agent:
- Research Agent: unstructured → structured
- Writing Agent: structured → narrative
- Integration QA Agent: narrative → integrated

This **Progressive Refinement** pattern is common in data processing systems, but its implementation in AI agent systems is unique: not through predefined transformation functions but through AI's understanding and generation capabilities.

There are no direct interface definitions between Agents; the contract is **implicit file path conventions**. Observing execution history, we notice an important property: data produced by each phase is not modified by subsequent phases. This **Data Immutability** brings traceability, concurrency safety, and fault tolerance.

The system also demonstrates a classic **Partition-Aggregate** pattern:

```
Phase 1: 1 task → 6 partitions (by organization)
Phase 2: 6 partitions → 6 partitions (maintain partitioning)
Phase 3: 6 partitions → 1 aggregated report
```

### Step Four: Intelligent Runtime Environment Dissection

In traditional software architecture, the runtime environment plays a relatively passive role. JVM mechanically executes bytecode, Python interpreter faithfully executes scripts, operating systems schedule processes according to instructions. Their responsibility is to **accurately execute** instructions written by developers, not to **understand and decide**.

However, in this multi-agent system, the runtime environment role played by Claude Code is fundamentally different from traditional concepts. A user's statement captures the core of this difference: "The bash or Python code I write myself wouldn't be better than the instructions and methods Claude Code chooses when it executes there."

This statement reveals a profound architectural shift: **from "imperative execution" to "intent understanding and intelligent execution"**.

#### Claude Code's Capability Inventory

**First Layer: Basic Tool Capabilities**
- File system operations: create directories, read/write files, search files
- Network capabilities: WebSearch tool, WebFetch tool, content understanding
- Shell command execution: Bash tool supports arbitrary shell commands

These seem simple, but Claude Code provides a **complete file system abstraction layer**. Agent Blueprints only need to declare "read a certain file," and Claude Code automatically selects appropriate tools, handles errors, and ensures correct permissions.

**Second Layer: Agent Management Capabilities**
- Agent instance launching: launch new Agent Instances through Task tool
- Parallel scheduling: initiate multiple Tasks in the same message, automatically execute in parallel
- Context isolation: each Agent Instance has independent context
- Context passing: share data through file system

This is a **meta-programming mechanism**. The Orchestrator doesn't launch Agents through API calls but by passing a "prompt" to define a new agent. This new agent reads the prompt, understands the task, and then executes autonomously.

**Third Layer: Intelligent Decision-making Capabilities**

This is Claude Code's most unique and powerful capability layer:

**Natural Language Understanding**: Capable of understanding natural language descriptions in Agent Blueprints and transforming them into concrete execution plans.

For example, an Agent Blueprint states: "Visit the organization's official website and look for the activity calendar." Claude Code needs to understand:
- "Visit official website" means first read the URL from organizations.json, then use WebFetch to get content
- "Look for activity calendar" means identify specific structures or keywords in web page content
- "Highest priority" means when encountering problems, should focus on ensuring this part is completed

**Tool Selection and Composition**: At execution time, possesses **complete contextual information** (current task objectives, available tool capabilities, completed operations, current environment state), and makes **optimal tool selection decisions** based on this information.

If developers write bash or Python code in advance, they lose this **runtime adaptability**. Code can only be based on development-time assumptions, whereas Claude Code can be based on actual execution-time situations.

**Error Handling and Recovery**: Agent Blueprints can declaratively describe expectations and standards, and Claude Code intelligently handles exceptions. For example: "If certain field information is unavailable, leave it blank or mark as 'information not disclosed'." Claude Code understands these rules, and when encountering problems, tries to obtain from alternative sources; if still failing, marks according to rules and continues execution rather than crashing.

**Quality Judgment and Optimization**: Claude Code not only executes tasks but also **evaluates output quality**. Reads output-format-guide.md to understand quality standards, continuously checks against standards while generating reports, and self-corrects when discovering non-compliance.

**Fourth Layer: Meta-cognitive Capabilities**

The highest level is Claude Code's **meta-cognition**—cognition and management of its own execution process:

**Progress Tracking**: Todo tool allows the Orchestrator to maintain a task list, update status in real-time, providing self-monitoring and user visibility.

**Execution Planning**: After reading Agent Blueprint, the Orchestrator first generates an execution plan (Todo list), then executes according to plan, embodying a **plan-execution separation** pattern.

**Reflection and Adjustment**: Although not obviously manifested in this execution, Claude Code theoretically has reflection capabilities: if a strategy fails, can analyze causes and adjust; if output quality doesn't meet expectations, can regenerate.

#### Comparison with Traditional Runtimes

| Dimension | Traditional Runtime (JVM/Python) | Intelligent Runtime (Claude Code) |
|-----------|----------------------------------|-----------------------------------|
| **Input** | Bytecode/source code | Natural language Agent Blueprint |
| **Execution Method** | Mechanically execute instruction sequence | Understand intent, intelligently choose execution method |
| **Decision-making Capability** | None (completely determined by code) | Strong (can make adaptive decisions at execution time) |
| **Error Handling** | Throw exception, stop execution | Understand error context, attempt recovery or degradation |
| **Optimization** | Low-level optimization like JIT compilation | High-level optimization like strategy selection, tool composition |
| **Determinism** | High (same input → same output) | Medium (same Blueprint may have different execution paths) |

**Fundamental Difference**: Traditional runtime is a **passive executor**, faithfully executing every line of code without judgment. Claude Code is an **active decision-maker**, understanding objectives, choosing methods, evaluating results.

#### In-depth Analysis of Key Quote

"The bash or Python code I write myself wouldn't be better than the instructions and methods Claude Code chooses when it executes there."

**Why is this true?**

**Reason 1: Information Asymmetry**
- Development time: only knows general task description, doesn't know specific execution-time environment state, must make various assumptions
- Execution time: knows specific organization to process, knows current network state, knows previous step results, can adjust according to actual situation

Claude Code possesses **complete context at execution time** and can make better decisions.

**Reason 2: Different Levels of Intelligence**
- Pre-written code: can only contain logic branches the developer foresaw
- Claude Code intelligence: can handle unforeseen situations (website structure changed? Analyze new structure to extract information)

Claude Code's **intelligence is open-ended**, not limited to predefined logic branches.

**Reason 3: Flexibility of Tool Selection**
- Pre-written code: must decide in advance what tools to use
- Claude Code: choose optimal tool combination according to actual situation (page simple? Directly WebFetch; content complex? First WebFetch then use Grep for precise extraction)

Claude Code has **freedom in tool selection**, can optimize execution efficiency.

**Reason 4: Quality Awareness**
- Pre-written code: can only check format correctness
- Claude Code: can evaluate content quality (Is this activity description objective? Is this date reasonable?)

Claude Code has **semantic-level quality awareness**.

This reveals a profound architectural insight: **Deferring decisions to execution time** is a powerful architectural pattern. Traditional software engineering emphasizes advance planning, detailed design, and code-solidified logic. AI-driven architecture opens new possibilities: high-level planning, specification constraints, runtime decisions.

#### Separation of Declarative and Execution

Claude Code as an intelligent runtime embodies an important architectural principle: **separation of declarative definition and intelligent execution**.

**Agent Blueprint: Declaration Layer**
- Responsibilities: define role responsibilities, describe task objectives, specify quality standards, provide strategic guidance
- Characteristics: uses natural language, descriptive rather than imperative, leaves room for execution-time decisions

**Claude Code: Execution Layer**
- Responsibilities: understand Blueprint intent, choose appropriate tools and methods, execute concrete operations, evaluate result quality, handle exceptions and edge cases
- Characteristics: has understanding and reasoning capabilities, can make runtime decisions, adapts to specific situations

**Value of Separation**:
- **Flexibility**: declarations can remain unchanged while execution can be optimized
- **Maintainability**: modifying quality standards only requires modifying descriptions in Blueprint
- **Comprehensibility**: Blueprints are human-readable; even non-programmers can understand them
- **Portability**: theoretically, the same Blueprint can execute on different intelligent runtimes

This separation is not absolute. Blueprints are not purely "declarative" but also contain some "procedural" guidance (such as "step one," "step two"). Why not completely declarative? Because **complete declarativeness might lead to uncontrollable execution**. Procedural guidance in Blueprints is a form of **guidance**, not **instruction**. It tells Claude Code "what the recommended strategy is," but Claude Code still has flexibility to adjust.

This embodies the "agents on rails" concept: **agents on tracks**. Tracks provide direction and constraints, but agents still have decision-making freedom.

#### Limitations and Dependencies

While Claude Code is powerful, it also has limitations:

- **Cannot run offline**: depends on online services, requires network connection
- **Runtime cost**: each Agent Instance execution consumes AI model calls, has cost
- **Execution uncertainty**: same Blueprint and parameters may produce slightly different results in different executions
- **Binding to specific runtime**: strong dependence on Claude Code's specific capabilities, difficult to migrate to other AI platforms

Do these limitations mean there's a problem with the architecture? Not necessarily.

**Logic of Trade-offs**:
- Trade "execution cost" for "development cost": although runtime cost is high, development cost is greatly reduced
- Trade "uncertainty" for "adaptability": although losing determinism, gains ability to adapt to complex situations
- Trade "platform binding" for "capability enhancement": although bound to Claude Code, gains powerful understanding and decision-making capabilities

**Applicable Scenarios**:
- Tasks are complex and variable, difficult to implement with fixed code
- Execution frequency is not high (such as monthly reports), runtime cost is acceptable
- Quality over speed
- Development team size is small, development efficiency is important

**Unsuitable Scenarios**:
- High-frequency execution (such as real-time systems)
- Cost-sensitive
- Requires absolute determinism (such as financial transactions)
- Needs to run offline

---

## Summary and Outlook

Through these four steps of architectural dissection—establishing vocabulary, analyzing static structure, tracing dynamic execution, and dissecting the runtime environment—we have gained deep understanding of this declarative multi-agent system.

We've seen a carefully designed architecture that, through clear division of labor (three-layer separation), clear data flow (three-phase refinement), reasonable parallelization (data partitioning), and rigorous quality control (layered assurance), completes complex information processing tasks.

We understand the system's core architectural characteristics:
- **Declarative definition**: uses natural language to describe intents and standards rather than code specifying steps
- **Intelligent runtime**: Claude Code understands intents, intelligently chooses methods, evaluates quality
- **File system data bus**: simple, transparent, traceable
- **Data-driven behavior**: change system behavior by modifying Reference Data
- **Layered quality assurance**: build quality at every step rather than checking at the end

We also recognize the system's applicable boundaries and trade-off choices: it excels in batch processing, information-intensive, quality-first scenarios but is not suitable for real-time, high-frequency, scenarios requiring extreme determinism.

However, architectural dissection is only the first step. We haven't yet systematically extracted reusable architectural patterns, haven't revealed the network of relationships between these patterns, haven't compared this system with traditional architecture and other AI systems, and haven't deeply reflected on the long-term implications of this architecture for software engineering.

All of these will be explored in the next article.

**(To be continued: Part 2 will include architectural pattern extraction, pattern language construction, comparative study, and comprehensive reflection)**
