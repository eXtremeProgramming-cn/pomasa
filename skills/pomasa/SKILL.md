---
name: pomasa
description: >
  Generate declarative multi-agent systems (MAS) using POMASA pattern language.
  Use when building agent pipelines, orchestrating multiple AI agents,
  or creating research automation workflows. Supports patterns like
  Prompt-Defined Agent, Orchestrated Pipeline, Filesystem Data Bus,
  and Verifiable Data Lineage.
license: Apache-2.0
metadata:
  author: eXtremeProgramming-cn
  version: "0.10"
---

# POMASA Generator

## Your Role

You are a Multi-Agent System (MAS) architect. Your task is to generate a complete, immediately runnable declarative multi-agent research system based on the research project information provided by the user.

## User Input Handling

When the user wants to create a multi-agent system, determine how to collect project information:

1. **If user provides a user_input file path**: Read and use it directly
2. **If user has no file ready**, offer two options:
   - **Option A**: Copy `user_input_template.md` to user's project directory for them to fill in
   - **Option B**: Collect key information through conversation (suitable for simpler scenarios)

For conversation-based collection, gather at minimum:
- Research topic and core questions
- Data sources
- Output format requirements
- Language preferences (Blueprint language, report language)

## Architectural Pattern Reference

When generating the system, you must refer to the pattern documents under the `pattern-catalog/` directory. These patterns define the system's architectural principles, design specifications, and implementation guidelines.

**Please first read [pattern-catalog/README.md](./pattern-catalog/README.md)** to understand the complete list of patterns and their categories.

### Pattern Selection Principles

- **Required Patterns**: Must all be adopted; these are the foundation of declarative MAS systems
- **Recommended Patterns**: Strongly advised to adopt, unless there is a clear reason not to
- **Optional Patterns**: Choose whether to adopt based on specific scenarios

## Generation Workflow

### Step 1: Understand User Requirements

The user should provide the following information (via file or conversation):

- **Language Settings**: Agent Blueprint language, report output language
- **Research Topic**: What problem to research, what the core questions are
- **Initial Ideas**: Existing understanding and research direction
- **Data Sources**: Where to obtain data
- **Existing Materials**: Available reference materials
- **Analysis Methods**: What methods to use for analysis (can be suggested by AI)
- **Output Format**: What form the final report should take
- **Run Unit Planning**: Run once as a whole, or split into units (by country, by date, ...) and which units. See OBV-02. Can be suggested by AI (default: single unless repetition is implied)
- **Custom Tools**: Custom MCP tools for web search and fetch (optional)
- **Other Requirements**: Special constraints or expectations

For items marked "to be suggested by AI", provide reasonable default solutions based on the pattern catalog.

### Step 2: Select Pattern Combination

Based on user requirements, determine which patterns to adopt:

- Required patterns: Adopt all
- Recommended patterns: Adopt by default, unless the user scenario clearly does not need them
- Optional patterns: Decide based on specific needs
  - **BHV-06 Configurable Tool Binding**: Adopt if user has configured custom web search or fetch tools
  - **BHV-08 Wiki Integration**: Adopt if user selects "Wiki" in Deliverable File Formats. When adopted, also adopt BHV-07 (Cumulative Project Library) since the wiki depends on the library for source tracking

### Step 2.5: Read All Required Patterns (Mandatory)

**Before generating any files, you MUST read the complete content of all Required patterns:**

| Pattern ID | Pattern Name | Key Content |
|------------|--------------|-------------|
| COR-01 | Prompt-Defined Agent | Blueprint structure and writing guidelines |
| COR-02 | Intelligent Runtime | Runtime environment assumptions |
| STR-01 | Reference Data Configuration | How to organize reference materials |
| STR-06 | Methodological Guidance | **What files go in methodology/ (read together with STR-01)** |
| BHV-02 | Faithful Agent Instantiation | **How Orchestrator invokes other Agents (critical!)** |
| QUA-03 | Verifiable Data Lineage | Data traceability requirements |
| OBV-01 | Observable Artifact Contract | Artifact declarations, four shapes, stage index.json |
| OBV-02 | Work Unit Decomposition | work section in pomasa.json, single/multi modes, unit enumeration |
| OBV-03 | Run Manifest | run.json schema and orchestrator maintenance protocol |

**Special Emphasis on BHV-02**: This pattern defines the standard format for how the Orchestrator invokes subagents:
- Caller only passes parameters, never paraphrases Blueprint content
- One task instance = One subagent invocation
- Must use standard invocation wording: "Please read `agents/XX.xxx.md` and execute strictly according to that Blueprint, parameters:..."
- Orchestrator must verify results against Blueprint completion criteria

**Do NOT skip this step.** Failure to read BHV-02 will result in incorrectly structured Orchestrator blueprints.

### Step 3: Generate the System

Referring to the selected pattern documents, generate:

```
{project_id}/
├── pomasa.json              # MAS descriptor: stages, contracts, work (OBV)
├── agents/                  # Agent Blueprints
│   ├── 00.orchestrator.md
│   ├── 01.{first_agent}.md
│   ├── 02.{second_agent}.md
│   └── ...
├── references/              # Reference Data (processed from user materials)
│   ├── domain/              # Domain knowledge (converted to Markdown)
│   └── methodology/         # Methodological guidance
├── scripts/                 # Utility scripts (if using STR-09)
│   ├── export.sh            # Export to DOCX/PDF
│   ├── docx-template.docx   # DOCX format template
│   └── latex-header.tex     # PDF format control (for CJK support)
├── workspace/               # Runtime workspace, organized by work units (OBV-02)
│   └── ...
├── library/                 # Cumulative raw materials (if using BHV-07)
├── wiki/                    # Persistent knowledge graph (if using BHV-08)
│   ├── concepts/
│   ├── flows/
│   └── contradictions/
├── _output/                 # Deliverables (if using STR-09, may be gitignored)
├── wip/                     # Work in Progress
│   └── notes.md
└── README.md
```

**Wiki output (BHV-08):** When Wiki is selected as a deliverable format, read `pattern-catalog/BHV-08-wiki-integration.md` for the complete data model, typed link vocabulary, wiki-integrator blueprint structure, vault layout, and generation checklist. Follow its Implementation Guidelines to generate the wiki-integrator agent and wire it into the orchestrator.

### Step 3.5: Embed POMASA Provenance (Required)

Every generated MAS MUST carry a portable reverse-reference to POMASA, so that **a person (or AI) who receives the generated system without POMASA installed** can still tell it was built by POMASA and find the pattern language. This is non-negotiable: without it, the system runs differently depending on whether POMASA happens to be on the machine.

**Do this in the generated `README.md`:** add a top-level `## Built with POMASA` section (near the top, after the one-line project description) containing exactly this block (keep the URLs literal — do not relativize them to a local `01.tools/pomasa` path, which is machine-specific):

```markdown
## Built with POMASA

This system was generated by **POMASA** (Pattern-Oriented Multi-Agent System Architecture) — a pattern language + generator for declarative multi-agent systems.

- **POMASA repository**: https://github.com/eXtremeProgramming-cn/pomasa
- **Pattern language (academic)**: Xiong Jie, *A Pattern Language for Knowledge Engineering with Large Language Models*, PLoP 2025 — [DOI 10.64346/PLoP2025p02](https://doi.org/10.64346/PLoP2025p02)

The agent blueprints reference architectural patterns by ID (`COR-01`, `STR-06`, `BHV-02`, `QUA-03`, etc.) — these are POMASA patterns. You do **not** need POMASA installed to run this system (the blueprints are self-contained); to understand or modify a pattern, go to the POMASA repository above and read the pattern catalog under `skills/pomasa/pattern-catalog/`.
```

That single repository link is enough — a reader (human or AI) follows it and finds the catalog. Do **not** build per-pattern links or maintain a linkified patterns table; one canonical POMASA link is the point. Do **not** use a local filesystem path (e.g. `01.tools/pomasa/...`) as the primary pointer — it only resolves on the generator's machine. The Patterns Adopted table in this README may stay as-is (ID + necessity + rationale), unlinked.

### Step 4: Delivery Instructions

Inform the user of:
- The list of generated files
- The patterns adopted and the rationale
- The **POMASA provenance section** in the generated README (so the system stays self-identifying without POMASA installed)
- How to start and use the system
- How to make adjustments as needed

## Important Reminders

1. **Reference pattern documents**: Before generating any content, read the relevant pattern documents first
2. **Follow pattern specifications**: Generate code according to the implementation guidelines in the pattern documents
3. **Maintain consistency**: All Agents within the same system should follow the same conventions
4. **Be appropriately flexible**: Patterns are guidelines, not dogma; adapt as needed based on actual requirements
5. **Embed POMASA provenance (Step 3.5)**: Every generated README must carry the `## Built with POMASA` section with the canonical GitHub link, so the system stays self-identifying and runnable without POMASA installed — no machine-specific local paths as the primary pointer.
