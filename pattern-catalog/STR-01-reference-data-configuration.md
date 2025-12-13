# Reference Data Configuration

**Category**: Structure
**Necessity**: Required

## Problem

How to provide Agents with the external knowledge needed to execute tasks?

AI Agents require two types of external knowledge:
1. **Domain Knowledge**: Tells the Agent "what it is"—theoretical frameworks, concept definitions, taxonomy systems, etc.
2. **Methodological Guidance**: Tells the Agent "how to do it"—data sources, analysis methods, output formats, etc.

If this knowledge is hardcoded into Agent Blueprints, it leads to verbose Blueprints, scattered knowledge, difficult updates, and prevents non-programmers from participating in maintenance.

## Context

This pattern applies to the following scenarios:

- Systems involving complex and evolving domain knowledge
- Multiple Agents need to share the same knowledge base
- Domain experts should be able to directly participate in knowledge maintenance
- Knowledge needs version control and review

## Forces

- **Centralized vs Distributed**: Centralized management facilitates maintenance but may create a single point of failure
- **Structured vs Flexibility**: Structured formats facilitate machine processing but limit expressive freedom
- **Completeness vs Conciseness**: Complete knowledge bases are large, concise ones may have omissions
- **Generic vs Specific**: Generic knowledge has broader applicability, specific knowledge is more precise

## Solution

**Externalize knowledge as independent data files, separate from Agent Blueprints. Blueprints reference these files, and Agents read and apply the knowledge during execution.**

### Two Types of Reference Data

Reference data is divided into two major categories, recommended to be organized in subdirectories:

```
references/
├── domain/                    # Domain knowledge: what it is
│   ├── theoretical_framework.md    # Theoretical framework
│   ├── concepts.md                 # Concept definitions
│   ├── taxonomy.json               # Taxonomy system
│   └── literature_review.md        # Literature review
│
└── methodology/               # Methodological guidance: how to do it
    ├── research-overview.md        # Research overview
    ├── data-sources.md             # Data sources guide
    ├── analysis-methods.md         # Analysis methods
    └── output-template.md          # Output template
```

#### Domain Knowledge (domain/)

Tells the Agent "what it is":

| Type | Description | Examples |
|------|-------------|----------|
| Theoretical Framework | Theoretical system that analysis is based on | ESSCC theoretical framework explained |
| Concept Definitions | Precise definitions of key concepts | Glossary, concept explanations |
| Taxonomy | Classification methods for entities | Activity types, organization categories |
| Background Knowledge | Relevant background information | Literature review, historical evolution |

#### Methodological Guidance (methodology/)

Tells the Agent "how to do it", see [STR-06 Methodological Guidance](./STR-06-methodological-guidance.md) for details:

| Type | Description | Examples |
|------|-------------|----------|
| Research Overview | Goals, scope, stance | What questions to answer |
| Data Sources | Where to get data, credibility | Source types, rating criteria |
| Analysis Methods | What methods to use for analysis | Analysis framework, core questions |
| Output Template | What format to output | Document structure, format specifications |

### Standard Directory Structure

```
project/
├── agents/           # Agent Blueprints (reference references/)
│   └── ...
│
├── references/       # Reference data (independently managed)
│   ├── domain/       # Domain knowledge
│   │   └── ...
│   └── methodology/  # Methodological guidance
│       └── ...
│
└── data/             # Runtime data
    └── ...
```

## Consequences

### Benefits

- **Flexibility**: System behavior can be adjusted by modifying data files without changing Blueprints
- **Maintainability**: Knowledge is centrally managed, changes are traceable
- **Collaboration-Friendly**: Domain experts can directly edit data files
- **Extensibility**: Easy to add new processing objects
- **Knowledge Explicitness**: Tacit knowledge becomes explicit, auditable documentation

### Liabilities

- **Performance Overhead**: Data files need to be read and parsed on every execution
- **Validation Complexity**: No compiler to check data file correctness
- **Dependency Management**: Implicit dependencies exist between Blueprints and data files
- **Limited Expressiveness**: Complex logic is difficult to express with pure data

## Implementation Guidelines

### Data File Format Selection

| Format | Use Cases | Advantages | Disadvantages |
|--------|-----------|------------|---------------|
| JSON | Structured data | Machine-readable, strict format | No comments, average readability |
| Markdown | Specification documents | Human-readable, supports rich text | Loose structure |
| YAML | Configuration data | Good readability, supports comments | Indentation-sensitive |

### Referencing in Blueprints

```markdown
## Prerequisites

Before starting the task, you must:

1. Read `references/research-overview.md` to understand the research goals
2. Read `references/data-sources.md` to understand the data sources guide
3. Read `references/theoretical_framework.md` to understand the theoretical framework

[Note: Explicitly list the reference files to be read; the Agent will read these files first during execution]
```

### Data File Design Principles

1. **Single Responsibility**: Each file contains only one type of knowledge
2. **Self-Contained**: File content should be independently understandable
3. **Version-Friendly**: Structural changes should consider backward compatibility
4. **Human and Machine**: Convenient for both AI processing and human reading

### Domain Knowledge Completeness Principle

**Domain reference materials provided by users must be preserved in full, without summarization or condensation.**

This is a critical principle. AI tends to be "overly helpful" when processing domain knowledge—summarizing, condensing, and reorganizing source materials. This causes:

- **Information Loss**: Summarization inevitably loses details, which may be crucial in subsequent analysis
- **Introducing Bias**: AI's understanding may be biased, and summarization solidifies that bias
- **Destroying Authority**: Original materials are the work of domain experts; AI summaries do not have equivalent authority
- **Blocking Traceability**: After summarization, it's impossible to trace back to original statements, violating data lineage principles

Correct approach:

| Original Format | Processing Method |
|----------------|-------------------|
| Markdown files | Copy directly to references/domain/ |
| PDF files | Convert to Markdown and preserve in full |
| Word documents (.docx) | Convert to Markdown and preserve in full |
| Web pages (URL) | Fetch full content, convert to Markdown, save locally |

**Critical: Preserve All Rich Text Elements**

When converting to Markdown, the following elements must be faithfully preserved:

| Element | Importance | Handling Method |
|---------|------------|-----------------|
| Hyperlinks | High | Convert to Markdown link format `[text](url)` |
| Footnotes/Endnotes | High | Convert to Markdown footnote format `[^1]` |
| Citations/References | High | Preserve full citation info, convert to link where possible |
| Tables | Medium | Convert to Markdown table format |
| Images | Medium | Download locally, use relative path reference |
| Headings structure | Medium | Preserve heading hierarchy with # syntax |
| Lists (ordered/unordered) | Medium | Convert to Markdown list format |
| Bold/Italic emphasis | Low | Convert to `**bold**` and `*italic*` |

**Why preserve these elements:**

- **Hyperlinks**: External links are valuable sources that readers can verify; internal links reveal document structure
- **Footnotes**: Often contain important supplementary information, academic sources, or nuanced explanations
- **Citations**: The foundation of data lineage; losing citations breaks the verification chain (see [QUA-03 Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md))

**Web Content Special Handling:**

When the source is a web URL:

1. **Fetch full content**: Download the complete page, not just a summary or excerpt
2. **Preserve all links**: External links often point to primary sources or related materials
3. **Record source metadata**: Add a YAML frontmatter block:
   ```markdown
   ---
   source_url: https://example.com/article
   fetched_at: 2024-01-15T10:30:00Z
   title: Original Page Title
   ---
   ```
4. **Handle dynamic content**: If the page has important dynamic content, note what may be missing

```
# Incorrect Example
User provides a 50-page theoretical framework document, AI "helpfully"
summarizes it to a 5-page essence when generating the system.

# Also Incorrect Example
User provides a URL, AI only extracts the main text, discarding all
hyperlinks, footnotes, and sidebar content.

# Correct Example
User provides a 50-page theoretical framework document, converted to
Markdown with all footnotes and citations intact, saved to
references/domain/theoretical_framework.md

# Also Correct Example
User provides a URL, AI fetches the full page, converts to Markdown
preserving all links and structure, adds source metadata, saves to
references/domain/article_title.md
```

**Exception**: If source materials are truly excessively lengthy (e.g., entire books), discuss with the user how to handle it rather than AI deciding to summarize on its own.

### Metadata File Example

```json
// organizations.json - Metadata layer
{
  "organizations": [
    {
      "id": "org_1",
      "name": "Organization A",
      "official_website": "https://...",
      "category": "government",
      "priority": "high"
    },
    {
      "id": "org_2",
      "name": "Organization B",
      ...
    }
  ]
}
```

### Specification File Example

```markdown
# Report Format Guide

## Title Specifications

- Level 1 heading: Use #, only one in the entire document
- Level 2 heading: Use ##, for main chapters
- Level 3 heading: Use ###, for subsections

## Citation Specifications

- All data must be annotated with sources
- Citation format: [Source Name](URL)
- Direct quotes use > quote blocks

## Language Style

- Use objective, neutral academic language
- Avoid subjective evaluative terms
- Maintain consistent terminology throughout
```

## Examples

### From the industry_assessment System

**Recommended references directory structure**:
```
references/
├── domain/                                # Domain knowledge
│   ├── theoretical_framework_explained.md      # ESSCC theoretical framework explained
│   └── theoretical_framework_literature_review.md  # Literature review
│
└── methodology/                           # Methodological guidance
    ├── research-overview.md                    # Research overview
    ├── data-sources.md                         # Data sources guide
    ├── analysis-methods.md                     # Analysis methods guide
    └── report-template.md                      # Report template
```

**Domain knowledge example (excerpt from domain/theoretical_framework_explained.md)**:
```markdown
# ESSCC Theoretical Framework Explained

## Dimension 1: Ownership Structure

### Feature 1: Public Ownership Dominance

**Definition**: Public ownership economy holds a dominant position in the national economy...

**Functional Items**:

#### 1.1 Control Strategic Sectors
- **Meaning**: State-owned economy maintains control in important industries
  and key sectors related to the national economic lifeline
- **Manifestation**: State-owned enterprises' dominant position in sectors
  like energy, telecommunications, railways
- **Assessment Points**: Control degree, coverage scope, efficiency performance
```

**Methodological guidance example (excerpt from methodology/analysis-methods.md)**:
```markdown
# Analysis Methods Guide

## Analysis Framework

For each functional item, answer the following five core questions:

### Question 1: Function Manifestation
**How is this ESSCC function manifested in this industry?**

Analysis points:
- Find specific institutional arrangements, policy measures, corporate behaviors, and other instances
- Use data and cases to illustrate the specific manifestation forms of the function
- Distinguish between "direct manifestation" and "indirect manifestation"

### Question 2: Positive Effects
**What benefits has this manifestation brought to the industry's development?**
...
```

This design enables:
- Domain knowledge and methodology can evolve independently
- Domain experts maintain domain knowledge, methodology experts maintain methodology
- Multiple Agents can share the same set of reference data

## Related Patterns

- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**: Blueprint references Reference Data
- **[Methodological Guidance](./STR-06-methodological-guidance.md)**: Detailed specification of methodological guidance
- **[Filesystem Data Bus](./STR-02-filesystem-data-bus.md)**: Reference Data is provided to Agents through the filesystem
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: Specification-type Reference Data contains quality standards

## Variants

### Dynamic Reference Data
Some Reference Data may need dynamic updates (e.g., organization lists); automatic update mechanisms can be designed.

### Layered Reference Data
Large systems may need multi-layer Reference Data: globally shared, domain-specific, project-specific.

### External Reference Data
Reference Data can be obtained from external systems (e.g., APIs) rather than static files.
