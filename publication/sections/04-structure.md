
## 4. The Pattern Language Structure

### 4.1 Pattern Discovery

The patterns in POMASA were not designed top-down from theory but mined bottom-up from practice, following the classical pattern discovery process [4]. They emerged over the course of building more than one hundred declarative multi-agent systems across diverse domains. Early systems were built ad hoc: each new project reinvented solutions for agent definition, coordination, data passing, and quality assurance. As projects accumulated, recurring problems became apparent—the same challenges arose whether the system was analyzing an industry, producing a news publication, reviewing legal frameworks, or generating research reports.

Solutions that proved effective were carried forward into subsequent systems. Over time, these solutions stabilized into recognizable patterns: the practice of defining agents through markdown blueprints became COR-01 (Prompt-Defined Agent); the recurring need to separate domain knowledge from agent logic became STR-01 (Reference Data Configuration); the repeated failure mode of AI hallucinations led to QUA-03 (Verifiable Data Lineage). Each pattern was refined through multiple iterations as it was applied to new domains and new scales.

The patterns were validated across systems of varying complexity and purpose. Representative examples include:

- A **research production system** with a dual pipeline architecture (book-length reports and country conjuncture analyses), over 40 agents in its synthesis stage alone, and quality gates at every stage — the largest system built with POMASA
- **News on China**[^noc]: a multilingual news production system with 19 agents organized into 6 functional groups (news selection, content writing, translation, and review), operating on a weekly production cycle

[^noc]: https://thetricontinental.org/asia/publications/news-on-china/

- A **market analysis system** tracking industry dynamics through a structured analytical framework, with 8 agents in two parallel pipelines running on a daily cycle
- A **comparative legal review system** with 4 agents, demonstrating that the core patterns apply even at minimal scale
- A **document visualization system** with 4 agents that extracts visualization opportunities from text and generates infographics, extending the patterns beyond text-oriented research into visual content production

The industry analysis system presented in Section 2 was selected as this paper's running example because it offers a balance of complexity (8 agents, 55 parallel research tasks) and accessibility (the domain is intuitive and the outputs are verifiable). The full pattern language, however, reflects lessons learned across the entire portfolio—the categorical taxonomy and necessity hierarchy described below emerged from analyzing which patterns appeared in every system versus those needed only in specific contexts.

### 4.2 Categorical Taxonomy

Patterns are classified into four categories, each identified by a three-letter prefix:

**COR (Core)**: Patterns that define the fundamental characteristics of declarative MAS. These patterns establish what makes a system "declarative" and "multi-agent" in the AI era. Without Core patterns, the system would not qualify as a declarative MAS. Currently: 2 patterns.

**STR (Structure)**: Patterns that organize the static architecture of the system—how components are arranged, how data is stored, how boundaries are defined. Structure patterns determine the "shape" of the system at rest. Currently: 9 patterns.

**BHV (Behavior)**: Patterns that govern dynamic system behavior—how agents execute, how they coordinate, how data flows through the pipeline. Behavior patterns determine what happens when the system runs. Currently: 6 patterns.

**QUA (Quality)**: Patterns that ensure system reliability and output quality—how to embed standards, how to verify data, how to prevent hallucinations. Quality patterns determine whether the system produces trustworthy results. Currently: 3 patterns.

### 4.3 Necessity Hierarchy

Orthogonal to categorical classification, each pattern carries a necessity level:

**Must**: Patterns without which the system cannot function correctly. Every declarative MAS must implement these patterns. Currently: 6 patterns (COR-01, COR-02, STR-01, STR-06, BHV-02, QUA-03).

**Recommended**: Patterns that most systems benefit from significantly. Omitting these patterns is possible but usually results in a weaker system. Currently: 10 patterns.

**Optional**: Patterns that address specific scenarios or provide additional capabilities. Systems should adopt these based on their particular requirements. Currently: 4 patterns.

### 4.4 The Pattern Catalog

Table 1 presents the complete catalog, combining categorical taxonomy, necessity hierarchy, and key relationships for all 20 patterns.

| ID | Pattern | Necessity | Key Relationships |
|----|---------|-----------|-------------------|
| **COR (Core)** | | | |
| COR-01 | Prompt-Defined Agent | Must | Runs on COR-02; configured by STR-01, STR-06 |
| COR-02 | Intelligent Runtime | Must | Executes COR-01; constrained by BHV-06 |
| **STR (Structure)** | | | |
| STR-01 | Reference Data Configuration | Must | Configures COR-01; separates domain knowledge from agent logic |
| STR-02 | Filesystem Data Bus | Recommended | Connects agents in BHV-01; audited by QUA-03 |
| STR-03 | Workspace Isolation | Recommended | Partitions STR-02; enables BHV-03 |
| STR-04 | Business-Driven Agent Design | Recommended | Guides COR-01 decomposition along domain boundaries |
| STR-05 | Composable Document Assembly | Recommended | Consumes STR-02 outputs; feeds STR-09 |
| STR-06 | Methodological Guidance | Must | Configures COR-01 alongside STR-01 |
| STR-07 | Reverse-Engineered Research Questions | Recommended | Derives research scope from STR-01 domain knowledge |
| STR-08 | Pandoc-Ready Markdown Format | Recommended | Standardizes STR-02 file formats; enables STR-09 |
| STR-09 | Deliverable Export Pipeline | Recommended | Converts STR-05 or STR-02 outputs to final deliverables |
| **BHV (Behavior)** | | | |
| BHV-01 | Orchestrated Agent Pipeline | Recommended | Coordinates COR-01 agents; data flows via STR-02 |
| BHV-02 | Faithful Agent Instantiation | Must | Constrains how BHV-01 invokes COR-01 agents |
| BHV-03 | Parallel Instance Execution | Optional | Scales BHV-01 stages; requires STR-03 |
| BHV-04 | Progressive Data Refinement | Optional | Multi-pass refinement within BHV-01 stages |
| BHV-05 | Grounded Web Research | Recommended | Data collection for STR-02; verified by QUA-03 |
| BHV-06 | Configurable Tool Binding | Optional | Adapts COR-02 tool access per runtime environment |
| **QUA (Quality)** | | | |
| QUA-01 | Embedded Quality Standards | Recommended | Encoded in COR-01 blueprints; checked by QUA-02 |
| QUA-02 | Layered Quality Assurance | Optional | Coordinates multiple QUA-01 checks across BHV-01 stages |
| QUA-03 | Verifiable Data Lineage | Must | Audits data on STR-02; prevents hallucination propagation |

: The POMASA pattern catalog. Must patterns (6) form the non-negotiable foundation; Recommended patterns (10) strengthen most systems; Optional patterns (4) address specific scenarios. The "Key Relationships" column shows how patterns depend on, configure, or constrain each other.

Figure 1 illustrates the relationships among the eight essential patterns presented in the following section. The vertical spine shows the primary execution flow: the Intelligent Runtime (COR-02) interprets Prompt-Defined Agents (COR-01), which define agents for the Orchestrated Pipeline (BHV-01), where data flows via the Filesystem Data Bus (STR-02). On the left, Reference Data Configuration (STR-01) and Methodological Guidance (STR-06) jointly configure agent blueprints. On the right, Faithful Instantiation (BHV-02) constrains how agents are invoked within the pipeline. At the data layer, Verifiable Data Lineage (QUA-03) ensures traceability across the filesystem bus.

![Relationships among the eight essential patterns](images/pattern-relationships.png){width=85%}

Complete documentation for all 20 patterns is available in the POMASA repository at https://github.com/eXtremeProgramming-cn/pomasa.

