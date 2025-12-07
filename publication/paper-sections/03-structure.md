
## 3. The Pattern Language Structure

POMASA organizes its patterns through two orthogonal classification schemes: a categorical taxonomy that groups patterns by their architectural concern, and a necessity hierarchy that indicates how critical each pattern is to system viability.

### 3.1 Categorical Taxonomy

Patterns are classified into four categories, each identified by a three-letter prefix:

**COR (Core)**: Patterns that define the fundamental characteristics of declarative MAS. These patterns establish what makes a system "declarative" and "multi-agent" in the AI era. Without Core patterns, the system would not qualify as a declarative MAS. Currently: 2 patterns.

**STR (Structure)**: Patterns that organize the static architecture of the system—how components are arranged, how data is stored, how boundaries are defined. Structure patterns determine the "shape" of the system at rest. Currently: 6 patterns.

**BHV (Behavior)**: Patterns that govern dynamic system behavior—how agents execute, how they coordinate, how data flows through the pipeline. Behavior patterns determine what happens when the system runs. Currently: 4 patterns.

**QUA (Quality)**: Patterns that ensure system reliability and output quality—how to embed standards, how to verify data, how to prevent hallucinations. Quality patterns determine whether the system produces trustworthy results. Currently: 3 patterns.

### 3.2 Necessity Hierarchy

Orthogonal to categorical classification, each pattern carries a necessity level:

**Must**: Patterns without which the system cannot function correctly. Every declarative MAS must implement these patterns. Currently: 4 patterns (COR-01, COR-02, BHV-02, QUA-03).

**Recommended**: Patterns that most systems benefit from significantly. Omitting these patterns is possible but usually results in a weaker system. Currently: 8 patterns.

**Optional**: Patterns that address specific scenarios or provide additional capabilities. Systems should adopt these based on their particular requirements. Currently: 3 patterns.

### 3.3 The Pattern Matrix

Combining these two dimensions yields the following matrix:

| Category | Must | Recommended | Optional |
|----------|-----------|-------------|----------|
| **COR** | COR-01: Prompt-Defined Agent | — | — |
|         | COR-02: Intelligent Runtime | | |
| **STR** | — | STR-01: Reference Data Configuration | — |
|         | | STR-02: Filesystem Data Bus | |
|         | | STR-03: Workspace Isolation | |
|         | | STR-04: Business-Driven Agent Design | |
|         | | STR-05: Composable Document Assembly | |
|         | | STR-06: Methodological Guidance | |
| **BHV** | BHV-02: Faithful Agent Instantiation | BHV-01: Orchestrated Agent Pipeline | BHV-03: Parallel Instance Execution |
|         | | | BHV-04: Progressive Data Refinement |
| **QUA** | QUA-03: Verifiable Data Lineage | QUA-01: Embedded Quality Standards | QUA-02: Layered Quality Assurance |

### 3.4 Pattern Relationships

Patterns do not exist in isolation; they form a network of dependencies and reinforcements:

```
                    COR-02
                  Intelligent
                    Runtime
                        |
                        | enables
                        v
                    COR-01
               Prompt-Defined Agent
                   /    |    \
                  /     |     \
                 v      v      v
            STR-01   BHV-01   QUA-01
           Reference Pipeline Quality
              Data     |    Standards
                |      |         |
                v      v         v
            STR-06   BHV-02   QUA-03
           Method.  Faithful  Data
           Guidance  Inst.   Lineage
                       |
                       v
                    STR-02
                  Filesystem
                   Data Bus
                       |
                       v
                    STR-03
                   Workspace
                   Isolation
```

The diagram reveals the architecture's foundation: COR-02 (Intelligent Runtime) enables COR-01 (Prompt-Defined Agent), which in turn makes all other patterns possible. The three branches—reference data management, execution coordination, and quality assurance—represent the primary architectural concerns that Structure, Behavior, and Quality patterns address.

### 3.5 Reading the Patterns

Each pattern in the following section follows a consistent format derived from the pattern language tradition:

- **Context**: The situation in which the pattern applies
- **Problem**: The design challenge being addressed
- **Forces**: The competing concerns that make the problem difficult
- **Solution**: The recommended approach
- **Example**: Concrete illustration from the industry analysis system
- **Discussion**: Consequences, limitations, and related considerations

This format makes patterns comparable and composable—readers can evaluate whether a pattern's context matches their situation and weigh the forces against their priorities.

