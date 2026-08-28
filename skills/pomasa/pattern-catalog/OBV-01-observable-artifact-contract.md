# Observable Artifact Contract

**Category**: Observability
**Necessity**: Required

## Problem

How can a runtime UI (workbench, plugin, IDE) know what a MAS has produced without being hand-wired to one specific system?

Stage outputs land on the filesystem as files of arbitrary kinds and names. A human can open the directory and browse, but a UI cannot: it does not know which stage produced what, how many artifacts there are, what each file is about, or whether the stage is still growing. Every viewer then has to be written per-MAS, defeating the goal of rendering any MAS consistently.

## Context

This pattern applies to the following scenarios:

- MAS output needs to be surfaced by a UI (studio, workbench, DSH plugin)
- Multiple MASes share one viewer and must look consistent
- Stage agents write output to a filesystem data bus ([STR-02](./STR-02-filesystem-data-bus.md))
- Users want to see at a glance how many artifacts a stage produced and open each one

## Forces

- **Expressiveness vs Uniformity**: artifact metadata must not restrict what an agent produces, yet it must be structured enough for a generic UI
- **Detail vs Effort**: richer per-file metadata costs the producing agent extra writing work
- **Design-time vs Runtime**: contracts can be declared statically, but actual artifact instances only exist after execution

## Solution

**Every stage declares, at generation time, a contract describing the shape and location of its output; at run time, the producing agent maintains a per-stage index that lists the actual artifact instances.**

The contract is static: part of the MAS descriptor, aggregated by the generator from the blueprint. The index is dynamic: maintained by the stage agent as it writes artifacts. Together they make any stage's output enumerable and renderable by a generic UI.

### Artifact contract (static)

Each stage agent's blueprint contains an Artifact declaration:

```markdown
Artifact: assessment
Shape: single-file
Format: markdown
PathGlob: 02.deep_research/assessment.md
IndexPath: 02.deep_research/index.json
Schema:
  id
  title
  summary
  file
```

Fields:

- `Artifact`: contract id, unique within the MAS
- `Shape`: one of the four shapes below
- `Format`: dominant file format of the artifacts
- `PathGlob` / `IndexPath`: relative to the unit root (see [OBV-02](./OBV-02-work-unit-decomposition.md))
- `Schema`: entry fields the index is expected to carry

The generator aggregates all contracts into the MAS descriptor `pomasa.json` under `stages[].contracts[]` (full descriptor schema in OBV-02).

### Four artifact shapes

| Shape | Use | Index |
|-------|-----|-------|
| `vertical-list` | same-kind items that grow during research (cases, dimensions) | required |
| `horizontal-versions` | one object in many versions (draft iterations) | required |
| `multi-file` | general fallback: a loose set of markdown files | recommended |
| `single-file` | one document, typically a stage's final output | required |

### Stage index (dynamic)

After writing artifacts, the stage agent writes or updates the stage `index.json`:

```json
[
  {
    "id": "case-001",
    "title": "Meta Llama",
    "subtitle": "Open-source model landscape",
    "summary": "Key findings in one paragraph",
    "file": "case-001-meta.md",
    "size": 48232,
    "created_at": 1758000000000,
    "producer": "deep_researcher"
  }
]
```

Also accepted: `{ "version": 1, "entries": [...] }`.

Field rules:

- Required: `id`, `title`, `file`
- Recommended: `subtitle`, `summary`, `size`, `created_at`, `producer`
- Missing recommended fields must not block rendering

`file` resolves relative to the index file's directory.

## Consequences

### Benefits

- Any MAS becomes presentable by a generic UI: list, summary, open content
- Artifact counts and content are knowable per stage without reading agent text
- Cross-MAS tooling (export, search, review) becomes possible

### Liabilities

- Stage agents must maintain index.json, an added behavior on top of producing files
- Artifact declarations add a small writing burden to blueprints

## Implementation Guidelines

- Update index.json when artifacts change, not on a timer; an empty index means "waiting", not error
- The generator must keep `pomasa.json` consistent with blueprint declarations; treat a mismatch as staleness to report
- Per-file frontmatter (title, summary) is an optional enrichment; the index remains the canonical source

## Examples

A deep-research stage writes one findings summary per dimension and an index listing all six. The final report stage declares a single-file contract pointing at `05.report/final_report.md`; the viewer renders it as a document card and offers export to DOCX/PDF.

## Related Patterns

- [Filesystem Data Bus (STR-02)](./STR-02-filesystem-data-bus.md): the data bus OBV-01 observes
- [Verifiable Data Lineage (QUA-03)](./QUA-03-verifiable-data-lineage.md): lineage becomes machine-readable through contracts
- [Work Unit Decomposition (OBV-02)](./OBV-02-work-unit-decomposition.md): contract paths are relative to the unit root
- [Run Manifest (OBV-03)](./OBV-03-run-manifest.md): index entries feed the run view

## Checklist

- [ ] Every stage blueprint declares its artifact contracts?
- [ ] Contracts aggregated into pomasa.json by the generator?
- [ ] Producing agents write or update index.json at run time?
- [ ] Index entries carry id, title, file at minimum?
- [ ] Contract paths are relative to the unit root?