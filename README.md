# POMASA

**Pattern-Oriented Multi-Agent System Architecture**

## Purpose

POMASA is a pattern language and generation toolkit for building Declarative Multi-Agent Systems.

Its core value proposition: **Enable AI to rapidly construct new MAS systems guided by patterns**.

## Overall Approach

### Problem

When building multi-agent systems, every team uses their own approach to construct systems and their own terminology to describe architecture. The lack of a common pattern language makes it difficult to:
- Disseminate knowledge
- Reuse experience
- Discuss problems clearly

### Solution

POMASA adopts a "pattern language + generator" approach:

1. **Pattern Catalog** (`pattern-catalog/`): Reusable architectural patterns extracted from real systems, each describing a specific problem and its solution
2. **Generator** (`generator.md`): A prompt that guides AI to build new systems based on patterns

### Architecture Overview

![POMASA Architecture](./pomasa-explained.png)

POMASA patterns are organized into four categories (shown on the left), governing three architectural layers:

- **Definition Layer**: Blueprints define Agent behavior; Reference Data provides domain knowledge and methodology
- **Execution Layer**: Intelligent Runtime executes Blueprints; Orchestrator coordinates Workers through staged pipelines
- **Data Layer**: File System serves as the data bus, with data progressively refined from Materials → Drafts → Final outputs

### Core Principles

- **Patterns are knowledge carriers**: Transform tacit architectural experience into explicit, shareable patterns
- **Patterns have necessity levels**: Required, Recommended, Optional—systems can be flexibly composed
- **AI is the executor**: AI reads pattern documents, understands design principles, and generates pattern-conforming systems
- **Continuous evolution**: New patterns are added as practice accumulates

## Directory Structure

```
pomasa/
├── README.md                # This file
├── generator.md             # MAS generator prompt
├── user_input_template.md   # User input template
├── pattern-catalog/         # Pattern catalog
│   ├── README.md            # Pattern overview and usage guide
│   ├── COR-01-prompt-defined-agent.md
│   ├── COR-02-intelligent-runtime.md
│   ├── STR-01-...
│   ├── BHV-01-...
│   ├── QUA-01-...
│   └── ...
└── references/              # Reference materials
    ├── declarative-multi-agent-architecture-part1-en.md
    └── declarative-multi-agent-architecture-part2-en.md
```

## How to Use the Generator

### Scenario 1: Building a New Research-Oriented MAS

**Step 1**: Copy `user_input_template.md` to your working directory and fill in your research project information

**Step 2**: Issue a command to Claude Code:

```
Please read pomasa/generator.md, then generate a multi-agent research system based on [your user_input file path].
```

The Generator will guide the AI to:
1. Read your completed user_input
2. Read the relevant patterns in pattern-catalog
3. Select the appropriate pattern combination based on your needs
4. Generate the complete system files

### Scenario 2: Understanding or Improving an Existing System

```
Please read pomasa/pattern-catalog/README.md, then analyze which patterns [a system directory] uses and what improvements could be made.
```

### Scenario 3: Learning MAS Architecture

Read the pattern documents under `pattern-catalog/` directly to learn about declarative MAS design principles and best practices.

## Pattern Overview

See [pattern-catalog/README.md](./pattern-catalog/README.md)

## Evolution Plan

POMASA is a continuously evolving project:

- Extract new patterns as more systems are built and operated
- Refine existing pattern descriptions based on practical feedback
- Explore pattern variants and adaptations across different domains
