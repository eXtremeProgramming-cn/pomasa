# Comprehensive Analysis of Multi-Agent System Architecture (Part 2)

(Continued from Part 1: Architectural Anatomy)

## Part III: Architectural Analysis

The essence of architectural decisions lies in trade-offs. Every choice optimizes certain objectives under specific constraints while accepting certain costs. Understanding "why it's designed this way" is understanding the soul of architecture.

### Trade-off Analysis of Core Architectural Decisions

The system's five core decisions collectively define its unique character.

**Decision 1: Declarative Prompt-Based Agent Behavior Definition**

This is the system's most fundamental choice—using natural language Markdown documents to describe "what should be done" and "what quality standards should be met," rather than using Python code to specify "exactly how to do it."

The rationale for this trade-off is clear: task complexity exceeds the expressive capability of fixed logic. Different organizations use different channels to publish information, website structures can change at any time, and the definition of "activity" itself is semantic—enumerating these variables with code is unrealistic. More importantly, quality standards are semantic in nature: requiring reports to be "objective, professional, and conform to academic norms"—these standards are difficult to implement with rules, but AI can understand and adhere to them.

The costs are explicit: execution non-determinism (the same prompt may have different execution paths), debugging difficulty (cannot set breakpoints), high operational costs (AI invocation fees), platform lock-in (dependency on Claude Code). However, in scenarios involving monthly batch processing, complex and variable tasks, and small teams, the value of flexibility and development efficiency far outweighs these costs.

**Decision 2: Three-Stage Pipeline Architecture**

The task is divided into three sequentially executed stages—information gathering, report writing, and integration quality assurance—each focused on a single responsibility, with data progressively refined at each level.

This choice is based on the natural boundaries of task nature: gathering, writing, and quality checking are three essentially different tasks requiring different capabilities. More critically, it's optimized for parallelism—stages one and two can be parallelized (6 organizations processed independently), while stage three must be serial (requiring a global view). This design reduces total execution time from approximately 120 minutes to about 30 minutes. The intermediate products (structured JSON, report drafts) have intrinsic value—they can be inspected and reused.

Costs include coordination overhead, data transformation costs, and inter-stage synchronization delays. However, the speedup from parallelization, the reuse value of intermediate products, and the improvement in fault tolerance far exceed these costs.

**Decision 3: Filesystem as Data Bus**

Agents don't communicate directly; instead, they read and write JSON and Markdown files through agreed-upon file paths. The filesystem acts as a "data bus," connecting all Agents.

This seemingly "regressive" choice is actually well-considered: it naturally fits with the AI runtime (Claude Code provides Read, Write, and other file tools), provides complete traceability (all data is persisted), is human-readable and editable (JSON and Markdown formats), requires zero infrastructure (filesystem is a basic OS capability), and is version control friendly (can be managed with Git).

The costs are weak concurrency control, limited query capabilities, lower performance, and poor transactionality. However, for monthly batch processing with moderate data volumes, traceability and transparency are more important than performance, and the value of zero configuration is enormous.

**Decision 4: Claude Code as Intelligent Runtime**

Complete reliance on Claude Code, without using LangChain, AutoGen, or custom frameworks. This achieves "complete declarativeness"—even orchestration logic is described in natural language, which Claude Code understands and executes.

The core rationale is the user's insight: "The bash or Python code I write myself won't be better than the command methods Claude Code chooses when it executes." Because intelligent decisions at execution time are superior to fixed logic at development time. Claude Code selects optimal tools and methods at runtime based on actual circumstances, an adaptability that pre-coded frameworks struggle to achieve.

The costs are platform lock-in, online dependency, higher costs, and non-determinism. However, for small teams, batch processing, and quality-first scenarios, the improvement in development efficiency has enormous value.

**Decision 5: Full Parallel Execution Mode**

Stages one and two employ 6-way parallelism (one Agent Instance per organization), while stage three is serial (requiring a global view). Parallelism is data-driven: as many organizations as there are, that many parallel Agents are launched.

The rationale is the complete independence of tasks: gathering for organization A requires no information from organization B, generated data is written to different directories with no conflicts. The I/O-intensive nature makes parallelization highly beneficial—most time is spent waiting for network requests. Parallel execution takes approximately 10-15 minutes total, approaching linear speedup. The simplicity of declarative parallelism (launching multiple Tasks in the same message, with Claude Code automatically recognizing and executing) greatly reduces implementation complexity.

The costs are increased resource consumption, debugging complexity, and potential resource contention. However, in monthly batch processing, the benefit of nearly 6x speedup far exceeds these costs.

### Interaction of Architectural Characteristics

The six architectural characteristics are not isolated; they mutually support and progressively build upon each other as a systemic whole.

**Separation of Declaration and Execution** is the foundational characteristic. In traditional architecture, developers write detailed code and the runtime mechanically executes; in this architecture, developers describe intent and standards, and the intelligent runtime understands and implements. This separation brings flexibility (runtime can choose methods based on circumstances), maintainability (modifying descriptions is easier than modifying code), and comprehensibility (natural language is intuitive), but also brings trust challenges (must trust runtime decisions), debugging difficulties, and reduced determinism.

**Data-Driven Behavior** externalizes domain knowledge. organizations.json defines processing objects, activity-types.json defines the conceptual system, and output-format-guide.md defines quality standards. Modifying data changes system behavior, domain knowledge is made explicit, and the system can scale seamlessly. This design enables even non-programmers to participate in system improvement.

**Layered Quality Assurance** embeds quality at every level. First layer: Agent Blueprint embeds quality standards; second layer: Agent self-checks against standards during execution; third layer: dedicated QA Agent performs comprehensive quality inspection; fourth layer: human review. Quality is not inspected after the fact but built into the process.

**Decentralized Collaboration** is realized through the filesystem. Agents have no direct communication; they exchange data entirely through the filesystem. This loose coupling means modifying one Agent doesn't affect others, each stage can be tested independently, and new stages can be inserted or existing stages replaced.

**Complete Traceability** preserves data lineage. Web HTML → activities.json → report.md → final-report.md—the input and output of each step is persisted. One can trace the source of any data, understand how data is transformed, verify result correctness, and reproduce any execution.

**Dual-Layer Intelligence** is distributed across two levels. Agent Instance layer: each Instance is AI-driven, understanding tasks, making judgments, generating content, and self-checking. Runtime Environment layer: Claude Code itself also has AI capabilities, understanding orchestration intent, selecting tools, recognizing parallelism, and intelligent scheduling. This dual-layer intelligence gives the system both autonomy (Agents make intelligent decisions) and controllability (Runtime understands constraints), forming the balance of "agents on rails."

These characteristics work together to form the system's unique character: under appropriate constraints, the combination of declarative approach and intelligent runtime brings qualitative leaps in development efficiency, adaptability, and maintainability.

## Part IV: Pattern Language

Architectural patterns are mature solutions to recurring design problems. We identify five core patterns that collectively define this system's design language.

### Pattern 1: Prompt-Defined Agent

**Problem**: How to define agent behavior?

Traditional methods use code to specify every step of logic in detail, but when task complexity exceeds the expressive capability of fixed logic—different organizations use different channels, website structures change constantly, the definition of "activity" itself is semantic—hard-coded rules become fragile. Quality standards ("objective, professional, conforming to academic norms") are semantic-level requirements, difficult to implement with code logic.

**Solution**: Use natural language documents (Agent Blueprint) to describe what agents "should do," "what norms to follow," and "what standards to achieve," rather than specifying "exactly how to do it."

The Blueprint contains role definition, parameter placeholders (such as {ORGANIZATION_ID}), reference materials, task flow (strategic guidance, not mechanical steps), quality standards, and output requirements. At runtime, it reads the Blueprint, understands intent, and executes intelligently—selecting tools and methods based on actual circumstances, self-checking against standards.

This system has four Agent Blueprints (research, writing, QA, orchestration) totaling 1,211 lines, describing behavior in Markdown. One Blueprint can be instantiated into multiple parallel Agent Instances, processing different data partitions through parameterization.

**Trade-offs**: Gains extremely high flexibility (AI automatically adapts to changes), semantic quality assurance (AI understands abstract standards), low maintenance cost (modifying prompts is easier than modifying code), and natural readability. Costs are execution non-determinism, high operational costs, debugging difficulties, platform dependency, and reduced predictability.

**Applicable Scenarios**: Tasks that are complex and variable, require semantic understanding, prioritize quality over performance, need rapid iteration, and have intelligent runtime support. Not suitable for scenarios requiring absolute determinism, performance sensitivity, offline operation, or simple and fixed tasks.

### Pattern 2: Orchestrated Agent Pipeline

**Problem**: How to organize multiple agents to collaboratively complete complex tasks?

A single agent can complete specific tasks, but end-to-end complex tasks often require multiple steps with different natures. If one Agent completes all work, it leads to excessive cognitive burden, error propagation, inability to parallelize, and invisible intermediate products.

**Solution**: Decompose the task into multiple sequentially executed stages, with each stage handled by a specialized Agent type, and data progressively refined between stages. An Orchestrator Agent coordinates the entire flow, managing stage transitions.

This system has three stages: information gathering (6 Research Agents in parallel, producing structured JSON), report writing (6 Writing Agents in parallel, producing narrative Markdown), and integration quality assurance (1 Integration QA Agent, producing the final report). Data is progressively refined: unstructured web content → structured JSON → narrative Markdown → integrated report.

Key mechanisms: barrier synchronization between stages (waiting for all to complete before entering the next stage), parallelizable stages launch multiple Instances by data partition, intermediate products are persisted (can be inspected and reused), and declarative orchestration (describing the flow in natural language in the Orchestrator prompt).

**Trade-offs**: Gains clear separation of responsibilities, powerful parallelism (approximately 2x speedup), valuable intermediate products, good fault tolerance, and observability. Costs are coordination overhead, data transformation costs, increased overall latency (inter-stage synchronization), intermediate storage requirements, and constrained flexibility (unidirectional data flow, no feedback loops supported).

**Applicable Scenarios**: Tasks with clear stages, each stage suitable for specialization, parallelism opportunities exist, intermediate products are needed, and batch processing tasks. Not suitable for tasks that cannot be clearly staged, real-time interactive systems, simple tasks, or scenarios requiring iterative loops.

### Pattern 3: Filesystem Data Bus

**Problem**: How do Agents pass data between each other?

Traditional solutions (API calls, message queues, shared databases) require additional infrastructure, complex configuration, and network programming. AI multi-agent systems need solutions that naturally fit with the runtime, provide complete traceability, are human-readable and editable, and are simple to deploy.

**Solution**: Use the filesystem as the data transfer medium. Agents read and write JSON and Markdown files through agreed-upon file paths, without direct communication.

Directory structure reflects data flow: data/{YYYY-MM}/ (partitioned by time) → raw/ (stage one output) → drafts/ (stage two output) → final/ (stage three output). File formats: structured data uses JSON, text content uses Markdown. Path conventions: data/{YYYY-MM}/{stage}/{entity}/, implicit conventions require no configuration. Data immutability: each stage produces new data, doesn't modify old data.

**Trade-offs**: Gains ultimate simplicity (no middleware required), complete inspectability (all data visible and traceable), human readability (JSON and Markdown directly readable), AI runtime friendliness (naturally fits with Claude Code tools), version control friendliness, and zero-configuration collaboration. Costs are weak concurrency control, limited query capabilities, lower performance, poor transactionality, limited real-time capability, and space consumption.

**Applicable Scenarios**: Batch processing tasks, need complete traceability, human-machine collaboration scenarios, simple deployment requirements, AI-friendly environments. Not suitable for real-time/streaming processing, high-concurrency writes, complex query requirements, transactional requirements, or extreme performance needs.

### Pattern 4: Parallel Instance Execution

**Problem**: How to leverage parallelism to improve efficiency?

A single task may involve processing multiple independent data partitions. Serial processing takes a very long time, but not all tasks can be safely parallelized. How to identify parallelism opportunities? How to implement parallelism? How to synchronize and aggregate?

**Solution**: When tasks can be partitioned by data and partitions are completely independent, instantiate an Agent Instance for each partition, execute in parallel, wait for all to complete, then aggregate results.

Key mechanisms: data partition identification (reading organizations.json determines parallelism degree), batch Task launching (Orchestrator initiates multiple Tasks in the same message), intelligent runtime scheduling (Claude Code automatically recognizes parallelism and executes), barrier synchronization (waiting for all to complete), and result aggregation.

This system has 6-way parallelism in stages one and two (one Instance per organization), and serial execution in stage three (requiring a global view). Parallelism is data-driven: currently 6 organizations automatically become 6-way parallel; if increased to 12, automatically becomes 12-way parallel, without modifying orchestration logic. The I/O-intensive task characteristic enables near-linear speedup: a single gathering takes about 10-15 minutes, 6 in parallel still takes about 10-15 minutes.

**Trade-offs**: Gains significant performance improvement (near-linear speedup), full utilization of wait time, simple implementation (declarative parallelism), data-driven scalability, and good fault tolerance (independent failures are isolated). Costs are increased resource consumption, increased debugging complexity, potential resource contention, consistency challenges, and synchronization wait time.

**Applicable Scenarios**: Tasks can be data-partitioned, I/O-intensive, acceptable resource consumption, batch processing scenarios, tolerant of independent failures. Not suitable for inter-task dependencies, CPU-intensive, resource-constrained, real-time/streaming processing, or scenarios requiring global coordination.

### Pattern 5: Reference Data Configuration

**Problem**: How to provide domain knowledge?

AI agents need domain knowledge to execute tasks correctly. If hard-coded in Agent Blueprint, it leads to lengthy Blueprints, scattered knowledge, difficult updates, and non-programmers cannot participate. Domain knowledge continuously evolves, needs validation and review, and must serve AI, developers, and domain experts simultaneously.

**Solution**: Externalize domain knowledge as independent data files, separated from Agent Blueprint. Agent Blueprint references these files, reading and applying knowledge at execution time.

Data files are layered: metadata layer (organizations.json, defining processing objects), ontology layer (activity-types.json, defining conceptual system, 84 activity types), schema layer (activity-record-template.json, defining data structure), and specification layer (output-format-guide.md, 1,028 lines of quality standards). Each layer serves different purposes and can evolve independently.

Key mechanisms: Blueprint references data files, Agent reads and applies at execution time, structured knowledge expression (JSON and Markdown), and modifying data changes behavior (without modifying Blueprint).

**Trade-offs**: Gains flexibility (modifying data files adjusts behavior), maintainability (centralized knowledge management), collaboration-friendly (domain experts can directly edit), scalability (easy to add new objects), and explicit knowledge. Costs are performance overhead (reading and parsing each time), validation complexity (no compiler checking), dependency management (implicit dependencies between Blueprint and data), and limited expressiveness (complex logic difficult to express with pure data).

**Applicable Scenarios**: Complex and evolving domain knowledge, multi-agent shared knowledge, domain expert participation, knowledge needs review and validation, configuration-driven systems. Not suitable for simple and fixed knowledge, difficult-to-structure knowledge, performance-critical, or highly context-dependent knowledge.

### Pattern Synergy

The five patterns are not isolated; they progressively build and mutually support:

Prompt-Defined Agent (foundation) → Reference Data Configuration (knowledge layer) → Orchestrated Agent Pipeline (structure layer) → Filesystem Data Bus (communication layer) → Parallel Instance Execution (execution layer)

They collectively define the system's design language: simplicity first (filesystem, natural language, convention over configuration), transparency first (inspectable, traceable, human-readable), intelligence first (delegate decisions to AI, not hard-coded), and adaptability first (declare intent, runtime decisions, data-driven).

## Part V: Comparison and Positioning

The value of architecture lies not only in what it can do, but in clearly knowing when not to use it. Through systematic comparison with alternative solutions, we can clarify the current architecture's "sweet spot" and boundaries.

### Alternative Solution Comparison

**Traditional Python Scripts**: Writing complete crawler and report generation logic in Python requires about 2,500 lines of code and a 2-3 week development cycle. Advantages are deterministic execution, high performance, easy debugging, and no external dependencies. Disadvantages are high development cost, difficult to adapt to changes (website redesign requires code changes), and cannot guarantee semantic quality. Suitable for scenarios requiring extreme performance, absolute determinism, offline environments, and existing mature codebases.

**LangChain/LangGraph Framework**: Using Python code to explicitly define graph structure, using AI capabilities in nodes. Requires about 1,900 lines of Python code plus 800 lines of prompts, 1.5-2 week development cycle. Advantages are precise controllable flow, type safety, and support for complex conditions and loops. Disadvantages are still requiring substantial code writing and lower flexibility (changing flow requires code modification). Suitable for complex conditional branches, needing checkpoints and recovery, requiring precise control, and teams familiar with Python.

**AutoGen Multi-Agent Framework**: Completing tasks through agent-to-agent dialogue, requires about 2,200 lines of Python code plus 1,000 lines of prompts, 2-2.5 week development cycle. Advantages are agents can dialogue and negotiate, suitable for dynamic collaboration. Disadvantages are dialogue management adds complexity, actually overhead for independent tasks. Suitable for scenarios requiring agent negotiation, interactive tasks, and dynamic collaboration.

**Pure Manual Execution**: Completely manual completion, requires 42-48 hours of work (5-6 working days), annual cost approximately $25,200-28,800. Advantages are maximum flexibility and no technical dependencies. Disadvantages are high time cost (about 40-50x difference), prone to omissions, poor consistency, and not scalable.

**Current Architecture**: Declarative multi-agent system based on Claude Code, 0 lines of code, 1,200 lines of prompts plus 1,400 lines of configuration data, 3-5 day development cycle, annual cost approximately $900-1,800. Advantages are extremely high development efficiency, strong adaptability, low maintenance cost, easy horizontal scaling, and zero infrastructure. Disadvantages are platform lock-in, medium determinism, debugging difficulties, higher operational costs, and limited vertical scaling.

### Sweet Spot Analysis

The current architecture is best suited for scenarios simultaneously satisfying the following characteristics:

**Task Characteristics**: Information-intensive (needs to gather from multiple sources), high semantic understanding requirements (not simple pattern matching), batch processing (periodic execution, not real-time), relatively linear flow (three to four stages, not many conditional branches), highly independent tasks (can parallelize without communication).

**Team Characteristics**: Small team or individual (1-3 people, limited development resources), AI capability stronger than programming capability (skilled at prompt engineering), domain experts (can make tacit knowledge explicit as specifications).

**Project Characteristics**: Rapid iteration needs, low-frequency execution (monthly/quarterly level), small to medium scale (tracking 10-20 entities), quality-first (high quality requirements for results, high tolerance for execution time).

**Constraint Conditions**: Can access cloud services (stable network), acceptable costs (API fees of $100-500/month within budget), tolerates non-determinism (accepts AI decision variations).

Typical applicable scenarios: competitive analysis automation (tracking 10 competitors' monthly dynamics), academic literature review generation (regularly tracking new papers in specific fields), social organization activity monitoring (this project).

### Boundary Conditions

Understanding boundaries is equally important—when not to use the current architecture:

**High-Frequency Real-Time Scenarios** (e.g., financial transaction monitoring): Requires millisecond-level processing, millions of executions daily, API call latency and costs unacceptable. Should choose traditional code or event-driven architecture.

**Requires Absolute Determinism** (e.g., medical diagnosis assistance): Same input must produce same output, requires auditable decision paths, cannot tolerate AI "creativity." Should choose rule-based expert systems or highly constrained traditional code.

**Complex State Machines and Loop Logic** (e.g., complex approval workflows): Multiple conditional branches, requires rollback and retry loops, complex state transition rules. Should choose LangGraph or professional workflow engines.

**Offline Environments** (e.g., military or safety-critical systems): Cannot depend on external APIs, must run completely locally. Should choose traditional code or locally deployed LLMs.

**Ultra-Large Scale** (e.g., tracking 1,000 organizations with daily execution): API costs explode, execution time too long, concurrency limits become bottleneck. Should choose traditional code crawlers for gathering, or hybrid architecture.

**Requires Precise Control and Deep Debugging** (e.g., core engine of production-grade AI application): Needs step-by-step debugging of every decision, needs A/B testing with precise variable control, needs deep performance optimization. Should choose LangGraph or traditional code.

Quantitative boundary indicators: execution frequency (sweet spot monthly-weekly, boundary daily or more frequent), entity count (sweet spot 5-50, boundary >100), single execution time (sweet spot 1-5 hours, boundary needs <10 minutes), monthly API cost (sweet spot $50-500, boundary >$1,000), flow complexity (sweet spot 3-5 stages linear, boundary >5 stages multi-branch loops), determinism requirement (sweet spot tolerates 5-10% variation, boundary must be 100% consistent), team size (sweet spot 1-5 people, boundary >10 people needs more formal engineering practices).

## Part VI: Comprehensive Understanding

### What This Architecture Represents

This architecture is not technical showmanship, but a well-considered solution to a specific problem. It represents a new software construction paradigm—we're not programming, but describing intent; not writing code, but formulating specifications.

**Paradigm Shift: From Programming to Specification**. In traditional software development, developers write detailed instructions, telling computers what to do at each step (imperative thinking). In AI system development, developers describe intent, standards, and constraints, and AI understands and implements (declarative thinking). This is not just a technical change, but a role transformation: from "programmer" to "architect and specification maker," from "implementer" to "specifier," from "debugging code" to "tuning prompts."

**Asset Transfer: From Code to Knowledge**. The core asset of traditional systems is code (codebase is knowledge carrier, code quality determines system quality). The core asset of AI systems is knowledge: prompts (description of behavior), reference data (encoding of domain knowledge), quality standards embedded in natural language. Knowledge can be maintained by non-programmers, is easier to understand and inherit, and has lower evolution costs. But it also brings new challenges: how to verify knowledge correctness (no compiler)? How to manage knowledge versions and dependencies (no package manager)? How to test knowledge completeness (no unit tests)?

**Control Point Transfer: From Compile Time to Runtime**. Traditional systems have control flow determined at compile time (code specifies execution path, conditional branches are explicit, runtime is mechanical execution). AI systems have control flow decided at runtime (prompts describe intent, AI chooses path, dynamically adjusts based on actual circumstances, runtime has intelligent decision-making authority). This transfer brings stronger adaptability, lower determinism, and new testing challenges.

### Value Proposition

The core value of this architecture lies in the combination of development efficiency, quality, and transparency.

Development efficiency leap: traditional Python solution about 2,500 lines of code, 2-3 week development time; this architecture 0 lines of code, 1,200 lines of prompts, 3-5 day development time, about 5x efficiency improvement. More importantly, maintenance efficiency: website redesign, AI automatically adapts without code changes; adding new organization only requires editing JSON; adjusting report format only requires modifying format-guide.md.

Multi-layered quality assurance: embedded standards (Blueprint explicitly specifies quality requirements), process-built quality (AI self-checks against standards during execution), dedicated quality inspection (Integration QA Agent checks six dimensions), human verification (all intermediate products visible for review).

Complete transparency implementation: data lineage (complete traceability from web page to JSON to draft to final report), process visibility (quality inspection checklist records inspection process and discovered issues), human readability (JSON and Markdown formats directly understandable), intervention capability (humans can view and correct at any stage).

### Evolution Directions

The current architecture is optimized for specific needs—how to extend if needs evolve?

Current limitations and potential extensions: unidirectional data flow, no feedback loops (if quality inspection discovers issues requiring re-gathering, can describe loop logic in Orchestrator prompt, or introduce LangGraph to define conditional edges); complete generation, no incremental updates (if need mid-month updates to gather only new activities, can record last execution time, Research Agent only gathers activities after that time, add "merge" stage); single output language (if need simultaneous Chinese and English generation, can launch Chinese and English Writing Agents in parallel at stage two, or add "translation" stage); fixed quality inspection standards (if need dynamic adjustment based on report type, can introduce multiple format guides, Orchestrator selects based on target audience).

Architectural evolution paths for complex scenarios: tracking 100 organizations (introduce batching strategy, 10 per batch, 10 batches total, or introduce priority with core organizations first, or introduce distribution, allocate to multiple Claude Code instances); requires real-time updates (shift from batch processing to stream processing, use message queue to replace filesystem, may need to switch to traditional code solution); requires user interaction (introduce human approval at critical decision points, Orchestrator asks user during waiting stage); requires absolute determinism (implement critical parts with traditional code like date parsing, AI only used for parts requiring semantic understanding, add multi-layer verification, use rules to check AI output).

## Part VII: Methodological Reflection

This architectural analysis is not only a study of a system, but an exploration of how to understand new paradigms with traditional methodologies.

### Applying PoEAA to AI Systems

The core ideas of PoEAA remain effective in AI system analysis: establishing vocabulary (identifying and naming core concepts like Agent Blueprint, Agent Instance), identifying patterns (discovering recurring solutions like Prompt-Defined Agent, Filesystem Data Bus), trade-off analysis (honestly assessing pros and cons, clarifying when not to use), comparing alternatives (revealing applicable scenarios for each solution). These principles are the essence of architectural thinking, transcending specific technology stacks.

But adjustments are needed for AI systems: from traditional patterns (like Data Mapper, Active Record) to AI-era patterns (like Prompt-Defined Agent, Orchestrated Agent Pipeline)—these patterns are not variants of traditional patterns but new pattern categories, solving problems of how to define AI agent behavior, how to organize multi-agent collaboration, how to balance flexibility and controllability. From code/classes to prompts/agents, the core "implementation" is prompts not code, need to use natural language description as new "code example" approach. From deterministic behavior to adaptive intelligence, AI system behavior is adaptive (same prompt may choose different tools, AI automatically adjusts when website structure changes), need to describe "non-deterministic but bounded behavior." From static dependencies to dynamic decisions, AI system "dependencies" are dynamic (Research Agent decides at execution time whether to use WebSearch or WebFetch), traditional dependency graphs cannot capture this dynamism.

PoEAA lacks some concepts needed to describe AI systems: how to describe non-deterministic behavior (prompts provide high-level goals and suggested strategies, but specific execution is decided by AI—this descriptive approach is not yet mature)? How to analyze "intelligence distribution" (system has dual-layer intelligence: Agent Instance level and Runtime Environment level, this distribution is a key architectural characteristic, but PoEAA provides no analytical tools)? How to evaluate the separation of "understanding" and "execution" (developers write prompts expressing "intent," AI runtime "understands" and "chooses" execution methods—how to quantify this boundary)?

### New Concepts for AI System Architecture

Analysis requires some new concepts to accurately describe AI system characteristics.

**Runtime Intelligence**: Distinguishing mechanical runtime (executes instructions without understanding capability) from intelligent runtime (understands intent, makes intelligent decisions). This is not just quantitative capability change but qualitative transformation. Intelligent runtime makes "declarative programming" possible—developers don't need to specify "how to do it" in detail, only describe "what is wanted" and "what standards are," and runtime will understand and implement. The user's insight precisely captures the essence: "The bash or Python code I write myself won't be better than the command methods Claude Code chooses when it executes." Because AI possesses execution-time context that developers cannot have at coding time.

**Declarative Boundaries**: Where does declaration end and execution begin? AI systems exist between fully declarative (SQL: only say what you want) and fully imperative (assembly: specify each step in detail). Is "gathering strategy: 1. Prioritize official sources 2. Then media reports" in prompts declarative (describing priority) or imperative (specifying steps)? The answer is "agents on rails": rails (prompts provide direction and constraints) plus agents (still have freedom on the rails). This design finds balance between flexibility and controllability. Declarative boundaries are key architectural design decisions, but traditional methodologies provide no analytical tools.

**Dual-Layer Intelligence**: Intelligence is distributed across two levels. Agent Instance level (understanding tasks, selecting tools, judging quality, responding to exceptions). Runtime Environment level (understanding orchestration intent, recognizing parallelism, managing resources, handling global exceptions). How do these two layers interact? Vertical interaction (Runtime creates and manages Agent Instances), responsibility division (Agent responsible for "what to do," Runtime responsible for "how to schedule"), intelligence complementarity (Agent's domain intelligence plus Runtime's orchestration intelligence). Traditional systems have only one layer of "intelligence" (developer intelligence all encoded in code, runtime has no intelligence).

**Quality by Design vs Quality by Testing**: Traditional software is quality by testing (developers write code, testers write test cases, run tests to find bugs, fix and repeat)—quality is detected after the fact. AI systems are quality by design (developers embed quality standards in prompts, AI self-checks against standards during execution, generated content conforms to standards from generation, multi-layer Agent cross-validation)—quality is built into the process. This is proactive quality assurance. Of course the system also has post-hoc inspection (Integration QA Agent), but this is more about verification and consistency unification, not finding basic quality issues.

### Key Insights

Through systematic analysis, we gain insights at three levels:

**About AI System Architecture**: Paradigm shift (from programming to specification, control transfer, developers relinquish complete control over "exactly how to execute" in exchange for flexibility and adaptability); asset transfer (from code to knowledge, prompts and reference data are core assets, knowledge can be maintained by non-programmers, easier to understand and inherit); control point transfer (from compile time to runtime, prompts describe intent, AI chooses path, dynamically adjusts based on circumstances).

**About Architectural Analysis Methods**: PoEAA provides solid foundation (establishing vocabulary, identifying patterns, trade-off analysis, comparing alternatives—these principles are the essence of architectural thinking); needs AI-specific extensions (intelligence distribution analysis, declarative boundary analysis, non-deterministic behavior description, dynamic decision flow visualization); trade-off analysis is crucial (architecture essence is trade-offs, no perfect architecture only optimal choice under specific constraints, honest trade-off analysis helps avoid blindly chasing fashionable technology).

**About Pattern Language**: Pattern language still has value for AI systems (common language lets teams communicate efficiently, knowledge inheritance encodes experience into reusable form, design tool helps architects make wise choices—patterns are not dogma but scaffolding for thinking); pattern level elevation (traditional patterns focus on "how code is organized," AI patterns focus on "how agents collaborate"—this is abstraction level leap); needs new pattern catalog (AI systems need their own catalog: agent definition patterns, collaboration patterns, data exchange patterns, quality assurance patterns, orchestration patterns—this catalog needs community co-construction).

### Future Research Directions

This analysis opens more questions than it answers.

**Methodological Level**: How to test AI-driven systems (traditional testing relies on determinism, AI system behavior is non-deterministic, possible directions are property testing, benchmark testing, adversarial testing, human review)? How to ensure quality coexists with non-determinism (need to balance flexibility and quality, possible directions are layered constraints, multi-round validation, integration verification, statistical quality control)? How to visualize intelligent control flow (traditional UML assumes control flow is deterministic, AI system control flow is dynamic, possible directions are decision tree visualization, probabilistic control flow diagrams, execution trace replay, intent-implementation mapping)?

**Architectural Level**: Establishing AI system pattern catalog (five identified patterns are just tip of iceberg, possibly dozens or hundreds of patterns waiting to be discovered, need to analyze many actual systems to identify recurring solutions, systematically name and describe, establish relationship network between patterns)? Reference architectures for different scenarios (different types of AI applications need different architectures like batch processing tasks, real-time dialogue, content generation, decision support, automated processes—need to establish reference architecture library)? Prompt engineering as architectural practice (writing prompts is not "writing documentation" but "doing architecture," needs systematic methodology: pattern language for prompts, organizing principles, version management, testing methods)?

**Theoretical Level**: Formal model of intelligent runtime (how to define intelligent runtime capabilities? How to formalize prompt semantics? How to model intent understanding process?)? Theory of declaration-execution separation (what can be declared, what must be imperative? How does AI derive execution from declaration? How do constraints influence execution choices?)? Semantics of natural language specifications (traditional formal specifications have precise mathematical semantics, AI system specifications are natural language—how to define their semantics? How to handle ambiguity? How to verify consistency?)?

## Part VIII: Conclusion

### Distillation of Core Insights

The value of this architecture lies not in the novelty of technology, but in the transformation of mindset.

It demonstrates a possibility: under appropriate constraint conditions, the combination of declarative approach and intelligent runtime can bring qualitative leaps in development efficiency, adaptability, and maintainability. But it also clearly knows its boundaries—not suitable for real-time systems, not suitable for scenarios with extremely high determinism requirements, not suitable for offline environments, not suitable for large-scale concurrency.

The core point is the art of trade-offs. This architecture trades determinism for flexibility, platform lock-in for zero infrastructure, operational costs for development efficiency. It represents not "the best architecture," but "the most suitable architecture under specific scenarios."

### Significance of Paradigm Shift

We are at a turning point. Traditional software engineering is built on the paradigm of "imperative programming"—developers specify every step in detail, runtime mechanically executes. This paradigm has served us well, but is beginning to show limitations in certain scenarios.

AI-driven "declarative architecture" provides new possibilities: developers describe intent and standards, intelligent runtime understands and implements. This is not to replace traditional programming, but to add new choices to the toolbox. When facing information-intensive, semantically complex, rapidly evolving tasks, declarative AI architecture may be the better solution.

The deeper implication of this shift is the redefinition of knowledge assets. In traditional systems, value lies in code; in AI systems, value lies in knowledge—prompts, reference data, quality specifications. Knowledge becomes explicit, editable, evolvable, enabling even non-programmers to participate in system improvement.

### Call to Action

This analysis hopes to achieve two goals:

First, to provide reference for similar projects. If you face information gathering and report generation tasks, monthly or weekly execution, tracking 10-50 entities, small team development, this declarative multi-agent architecture may be the best choice. But if you need real-time response, absolute determinism, ultra-large scale, please consider other solutions.

Second, to provoke reflection on architectural thinking. AI is changing the nature of software; we need new vocabulary, new patterns, new methods to understand and design AI systems. This cannot be accomplished by one person or one team; it requires the entire community to build together.

For researchers: Establish formal theory of AI systems, develop new analytical and visualization tools, study quality assurance methods for AI systems.

For practitioners: Document and share your architectural experience, identify and name new patterns, honestly analyze trade-offs rather than advocacy.

For educators: Introduce AI system architecture in curricula, cultivate a new generation of "prompt architects," establish software engineering curriculum system for the AI era.

For everyone: Stay open and curious, be brave to experiment and explore, generously share knowledge.

### Final Thoughts

This multi-agent system is a successful exploration, but by no means an endpoint. It demonstrates the feasibility and value of declarative AI architecture, but also exposes limitations and challenges. In the future, better architectural patterns, more mature tools, and more systematic methodologies may emerge.

The essence of software architecture is making trade-offs under constraints, choosing what to optimize and what to sacrifice. In the AI era, this essence has not changed, but constraint conditions and choice space are both expanding. We have both traditional code solutions and new AI solutions; we can pursue determinism or embrace adaptability; we can control precisely or decide intelligently.

Understanding when to choose which solution is more important than mastering any single technology. This requires deep understanding of task characteristics, team capabilities, project constraints; requires honest assessment of the costs of each choice; requires wisdom to balance among multiple objectives.

If this document can help you make wiser architectural choices, it has fulfilled its mission.

Let us explore software architecture in the AI era together, and build the knowledge system for this new field together.

---

**Document Information**:
- Version: 1.0
- Created: 2025-10-12
- Word Count: Part III-VIII approximately 22,000 words
- Total Count: Part I-VIII approximately 43,000 words

**References**:
- Architecture Analysis Documents 00-09
- Martin Fowler: Patterns of Enterprise Application Architecture
- Menlo VC: AI Agents in Enterprise Automation
- Christopher Alexander: The Timeless Way of Building

**Acknowledgments**:
Thanks to all pioneers exploring AI system architecture—you light the way. Thanks to Martin Fowler for providing methodological foundation. Thanks to the creator of this system for providing a case worthy of deep analysis.

**License**:
This document is licensed under Creative Commons Attribution-ShareAlike (CC BY-SA). Feel free to distribute and adapt, please retain original author information.
