# Cumulative Project Library

**Category**: Behavior
**Necessity**: Recommended

## Problem

How to accumulate reusable raw materials across multiple runs of a multi-agent system?

A research-oriented MAS typically runs multiple times — with different parameters, different topics, or at different points in time. Each run collects raw materials from the web (articles, books, reports, data files). Without a shared accumulation mechanism, each run starts from scratch: re-downloading materials that previous runs already obtained, missing connections between topics that share source literature, and losing the serendipitous discovery that comes from browsing a rich collection.

## Context

This pattern applies when:

- A MAS will be run multiple times against the same project (different topics, different time periods, different research questions)
- Multiple MAS within the same project share overlapping source domains
- Raw materials (books, articles, reports) have lasting value beyond a single run
- The cost of fetching materials is non-trivial (API credits, rate limits, time)

This pattern may be skipped when:

- The MAS runs only once
- Raw materials are ephemeral and have no reuse value
- The project has a single, narrow research question with no expected expansion

## Forces

- **Isolation vs Sharing**: Each run needs its own workspace to avoid interference, but raw materials have value across runs
- **Accumulation vs Staleness**: A growing library is increasingly valuable, but some materials may become outdated
- **Discovery vs Organization**: Serendipitous discovery requires browsable structure, but too much structure imposes overhead
- **Simplicity vs Infrastructure**: The simplest approach (grep over markdown files) works surprisingly well at moderate scale, but may need augmentation as the library grows

## Solution

**Separate raw materials from analysis artifacts. Raw materials go into a project-wide shared library (`library/`); analysis artifacts go into run-private workspaces (`workspace/{run_id}/`). Each run contributes to the library and benefits from previous contributions.**

### The Boundary

The core design decision is a single boundary line:

```
project/
├── library/                    # Shared, cumulative, immutable
│   ├── books/
│   │   ├── raw/                # Original formats (PDF, EPUB)
│   │   └── markdown/           # LLM-readable conversions
│   ├── articles/               # Web articles, blog posts, reports
│   └── verbal/                 # Transcripts, interviews, oral materials
│
├── workspace/                  # Run-private, disposable
│   ├── {run_id_1}/             # First run's analysis artifacts
│   │   ├── 01.literature-review/
│   │   ├── 03.sources/         # SRC files referencing library/ materials
│   │   ├── 04.dimension-reports/
│   │   └── 06.research-report/
│   ├── {run_id_2}/             # Second run's analysis artifacts
│   └── ...
│
└── agents/                     # Agent blueprints (read-only)
```

Everything above the line (`library/`) is a shared, growing asset. Everything below (`workspace/`) is run-specific output. The boundary determines what accumulates and what doesn't.

### Core Characteristics

1. **Monotonic Growth**: The library only grows — each run is a net contributor. Materials are added but never removed or modified. This mirrors the immutability principle of [BHV-05 Grounded Web Research](./BHV-05-grounded-web-research.md): raw materials are preserved verbatim.

2. **Collect-Analyze Separation**: Raw materials (reusable assets) and analysis artifacts (run-specific output) live in different locations. This is the spatial counterpart to BHV-05's temporal separation (collect first, analyze later). A downloaded book is useful to any run; a dimension report is specific to the run that produced it.

3. **Grep-Navigable Structure**: The library is organized into a small number of well-named subdirectories. Materials are stored as markdown files with descriptive filenames. Navigation relies on filesystem tools (grep, glob, read) rather than vector databases or embedding indices. At moderate scale (~100-500 files), this works well — an agent reads directory listings to discover what's available, then greps for specific content.

4. **Accidental Reuse**: The most valuable property of a cumulative library is not planned reuse but accidental discovery. A run on topic A downloads a book that turns out to be relevant to a later run on topic B — a connection that no one planned for. This emergent cross-pollination is impossible when each run manages its own materials in isolation.

### Behavior During a Run

Each run interacts with the library in two phases:

**Phase 1: Survey** — At the start of a run (typically during literature review), the agent scans the library to discover what's already available. Materials downloaded by previous runs may be directly relevant. This avoids redundant downloads and provides unexpected connections.

**Phase 2: Contribute** — During research, when the agent fetches new materials from the web, it saves them to `library/` (following [BHV-05](./BHV-05-grounded-web-research.md) preservation rules) rather than to the run's private workspace. The workspace contains only analysis artifacts that reference library materials.

```
Run N starts
    │
    ▼
Survey library/
    │  "What books and articles are already here?"
    │  "Any of these relevant to my research questions?"
    │
    ▼
Identify gaps
    │  "What do I still need to fetch?"
    │
    ▼
Fetch new materials → save to library/
    │  (Following BHV-05: full content, verbatim, with metadata)
    │
    ▼
Analyze using library/ + new materials → write to workspace/{run_id}/
    │  (SRC files in workspace reference library/ paths)
    │
    ▼
Run N ends
    │
    Library is now richer for Run N+1
```

## Consequences

### Benefits

- **No Redundant Fetching**: Materials downloaded once are available to all subsequent runs
- **Cross-Topic Discovery**: A book downloaded for one topic may prove relevant to another — these connections emerge naturally from browsing a shared collection
- **Growing Returns**: The library becomes more valuable over time; later runs benefit from the accumulated investment of all earlier runs
- **Debuggable and Auditable**: Raw materials are plain files in a directory — readable by humans, searchable by grep, diffable by git
- **No Infrastructure Dependency**: No vector database, no embedding pipeline, no index server. Just files. Version history, branching, and collaboration come free from git.

### Liabilities

- **Storage Growth**: The library grows monotonically. For text-based research, this is typically manageable (hundreds of markdown files); for media-heavy projects, it may require attention.
- **Scale Limits of Grep**: Filesystem navigation works well up to ~500 files. Beyond that, an index file (a table of contents maintained by agents) or a search tool may be needed. See Karpathy's LLM Wiki pattern for an approach to index maintenance.
- **Naming Discipline Required**: The library's discoverability depends on descriptive filenames and a small number of well-named subdirectories. Poor naming degrades the library's value.
- **No Automated Deduplication**: Two runs may download the same article under different filenames. At small scale this is harmless; at large scale, a lint pass may be needed.

## Implementation Guidelines

### Blueprint Language for Collection Agents

```markdown
## Library Usage

### Before Fetching New Materials

Before downloading any book, article, or report:
1. Check `library/books/markdown/` and `library/articles/` for existing copies
2. Use grep to search for author names, titles, or key terms
3. If the material already exists, use it directly — do not re-download

### When Downloading New Materials

When you fetch a new source from the web:
1. Save it to the appropriate `library/` subdirectory (not to your workspace)
2. Follow BHV-05 rules: preserve full content verbatim, include metadata
3. Use a descriptive filename: `{author}-{short-title}-{year}.md`

### In Your Analysis

When referencing library materials in your SRC files or reports:
- Use relative paths from the project root: `library/books/markdown/illich-tools-for-conviviality-1973.md`
- This allows any future run to locate the same material
```

### Library Subdirectory Conventions

Keep the top-level structure minimal and stable:

```
library/
├── books/
│   ├── raw/          # Original formats (PDF, EPUB) — for archival
│   └── markdown/     # LLM-readable markdown conversions
├── articles/         # Web articles, blog posts, news reports, academic papers
└── verbal/           # Transcripts, interviews, oral history materials
```

Adding new subdirectories is acceptable when a distinct material type emerges (e.g., `datasets/`, `legislation/`), but resist premature categorization. A flat list of well-named files within each subdirectory is better than a deep hierarchy.

### Optional: Index File

At scale (~100+ files), an `index.md` file at the library root can help agents navigate:

```markdown
# Library Index

## Books (23 files)
- [illich-tools-for-conviviality-1973.md](books/markdown/illich-tools-for-conviviality-1973.md) — Radical monopoly, convivial tools, disabling professions
- [williams-keywords-1976.md](books/markdown/williams-keywords-1976.md) — Historical semantics of culture, industry, democracy
- ...

## Articles (87 files)
- [morozov-meme-engineering-2013.md](articles/morozov-meme-engineering-2013.md) — O'Reilly's role in "open source" replacing "free software"
- ...
```

This index can be maintained by agents (updated after each ingest) or by humans. It serves the same role as Karpathy's `index.md` in the LLM Wiki pattern: a grep-friendly table of contents that lets agents find relevant materials without reading every file.

## Examples

### From the Hidden Wave Research Project

The Hidden Wave (暗涌) project ran its research MAS 24 times across different technology topics (BASIC, Logo, Smalltalk, Unix, Windows, Delphi, Web, blockchain, low-code, etc.). Each run:

1. **Surveyed** `library/books/markdown/` and `library/articles/` for existing materials
2. **Downloaded** new books and articles relevant to its specific topic
3. **Saved** them to the shared library
4. **Produced** analysis artifacts in `workspace/{topic_id}/`

By the 24th run (on "language elimination and discourse mechanisms"), the library contained books by Illich, Williams, Lakoff, Winner, Orwell, and dozens of academic articles — many downloaded by earlier runs on completely different topics. The 24th run discovered that Emerson's research on "transparency" (downloaded by the 4th run on Unix shell scripting) was directly relevant to its discourse analysis of keyword meaning shifts. This cross-pollination was not planned — it emerged from the shared library structure.

```
hidden-wave/
├── library/
│   ├── books/
│   │   ├── raw/
│   │   └── markdown/
│   │       ├── illich-tools-for-conviviality-1973.md      # Downloaded by run 24
│   │       ├── emerson-reading-writing-interfaces-2014.md  # Downloaded by run 4
│   │       └── ... (15+ books)
│   ├── articles/                                           # 100+ articles
│   └── verbal/                                             # Interview transcripts
│
├── workspace/
│   ├── 01-basic-personal-computer/      # Run 1
│   ├── 04-unix-shell-scripting/         # Run 4 — downloaded Emerson
│   ├── 19-blockchain-false-decentralization/  # Run 19
│   ├── 24-language-elimination/         # Run 24 — found Emerson already there
│   └── ... (24 topic workspaces)
│
└── agents/
    ├── 00.orchestrator.md
    ├── 01.literature-reviewer.md        # Scans library/ first
    └── ...
```

## Prior Art

### Claude Code's Agentic Search

Boris Cherny (creator of Claude Code, Anthropic) reported that early versions of Claude Code used RAG with a local vector database, but the team found that agentic search — using grep, glob, and read to navigate files on demand — "outperformed [RAG] by a lot, and this was surprising." The advantages cited: simpler architecture, no staleness issues, no security/privacy concerns, full reliability. The Cumulative Project Library relies on the same insight: organized files + grep is a sufficient retrieval mechanism at moderate scale.

### Karpathy's LLM Wiki (2026)

Andrej Karpathy's LLM Wiki pattern describes a three-layer architecture for personal knowledge bases: **raw sources** (immutable), **wiki** (LLM-maintained synthesis), and **schema** (configuration). The Cumulative Project Library corresponds to Karpathy's "raw sources" layer. His wiki layer — where the LLM maintains cross-referenced summaries and entity pages — represents a possible evolution: not just accumulating raw materials, but also accumulating synthesized knowledge across runs.

## Related Patterns

- **[Grounded Web Research](./BHV-05-grounded-web-research.md)**: Defines how to collect materials (fetch full content, preserve verbatim). The Cumulative Project Library defines where to put them.
- **[Workspace Isolation](./STR-03-workspace-isolation.md)**: Each run has its own workspace. The library is the deliberate exception — the one shared space that crosses workspace boundaries.
- **[Filesystem Data Bus](./STR-02-filesystem-data-bus.md)**: Within a single run, agents communicate via the filesystem. The library extends this principle across runs.
- **[Progressive Data Refinement](./BHV-04-progressive-data-refinement.md)**: Raw materials in the library are Level 0 — the input to each run's refinement pipeline.
- **[Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md)**: SRC files in workspaces reference library paths, making the lineage from raw material to final report traceable across the shared library boundary.

## When Not to Use This Pattern

- **Single-run systems**: No accumulation needed if the MAS runs only once
- **Ephemeral data**: If raw materials have no value beyond the current run (e.g., real-time market data)
- **Strict isolation requirements**: If runs must not share any state (e.g., for reproducibility experiments where each run must be fully self-contained)
- **Very large media collections**: If raw materials are primarily large binary files (video, audio, high-resolution images), filesystem-based browsing may not be practical
