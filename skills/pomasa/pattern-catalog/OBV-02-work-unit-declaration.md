# Work Unit Declaration

**Category**: Observability
**Necessity**: Required

## Problem

How does a MAS divide its work into runs, and how is that division itself declared?

Different MASes divide work differently: a monitoring MAS runs once per date, an index MAS once per country, a research MAS possibly once overall. Hardcoding a single "run" layer (for example, a timestamped run directory) misrepresents systems that run over other axes and cannot express cases like "run all pending countries" or "run today's issue". Conversely, without a declared division, a UI cannot list what there is to run, what has run, and what remains.

## Context

This pattern applies to the following scenarios:

- A MAS is executed repeatedly, or as a batch of independent instances
- Repeated execution occurs over an axis (time, entity, partition)
- A UI must list runnable units and their state

## Forces

- **Uniform mechanism vs Diverse axes**: the machinery should be one, while the axis varies
- **Planned vs Discovered**: units may be known ahead (a static country list) or only found during execution (an early stage enumerates them)

## Solution

**The MAS descriptor declares a `work` section; each work unit is a self-contained directory; execution always runs on a unit.**

### work section (in pomasa.json)

```json
"work": {
  "mode": "multi",
  "dimensions": ["country"],
  "units": null,
  "units_index": "units.json",
  "unit_layout": "workspace/{country}"
}
```

Field meanings:

- `mode`: `single` (the whole MAS is one unit; unit root is `workspace/`) or `multi`
- `dimensions`: physical meaning of the unit key, e.g. `["country"]`, `["date"]`. Multiple dimensions nest: `["country", "year"]` maps to `workspace/{country}/{year}/`
- `units`: pre-declared unit keys, or `null` when units are enumerated at run time
- `units_index`: file, relative to the MAS root, where a runtime enumeration phase writes discovered units
- `unit_layout`: glob template that locates unit roots

The minimal form of `single` mode:

```json
"work": { "mode": "single" }
```

### Layout

```
<mas>/
├── pomasa.json
├── agents/
├── references/
├── units.json          # optional: run-time enumeration result
└── workspace/
    ├── <unit-key>/     # multi mode: one root per unit
    │   ├── run.json    # see OBV-03
    │   ├── NN.<stage>/
    │   └── ...
    └── (stage dirs)    # single mode: workspace is the unit root
```

### Unit enumeration

- Pre-declared: `units` lists keys; a run can target one unit or all.
- Discovered: an enumeration stage writes `units_index`. Units listed there but without a directory yet are in the "planned, not run" state, which a UI shows as a remaining workload.

## Consequences

### Benefits

- The run axis is a declared property of the system, not a hardcoded shape
- Meaningful unit keys (country, date) replace opaque run ids in the UI
- Batch runs map directly onto parallel execution ([BHV-03](./BHV-03-parallel-instance-execution.md))

### Liabilities

- Generation must elicit the run plan from the user
- Multi mode adds a directory level and enumeration mechanics

## Implementation Guidelines

- The generator writes `pomasa.json` in the same pass as the blueprints. Blueprint Artifact declarations (OBV-01) are the authoritative source; the descriptor aggregates them. Recompute the descriptor whenever blueprints change.
- At generation time ask: run once as a whole, or separate isolated runs each for one research object (by country, by date, ...); default to single unless the problem implies repetition
- Give units meaningful keys, preferring the axis value itself over generated ids
- For date axes, the natural new-run key is "today" unless a specific period is given

## Examples

- **Country index**: multi, dimensions ["country"], units enumerated by stage 1; UI shows "112 enumerated, 34 run".
- **News digest**: multi, dimensions ["date"], no pre-declared units; "run new issue" creates `workspace/2026-08-28/`.
- **Research report**: single; the whole MAS is one unit and one run.

## Related Patterns

- [Parallel Instance Execution (BHV-03)](./BHV-03-parallel-instance-execution.md): batch execution of a multi-MAS
- [Cumulative Project Library (BHV-07)](./BHV-07-cumulative-project-library.md): shared raw-material library across units
- [Observable Artifact Contract (OBV-01)](./OBV-01-observable-artifact-contract.md): contract paths resolve relative to the unit root
- [Run Manifest (OBV-03)](./OBV-03-run-manifest.md): each unit root carries its run record

## Checklist

- [ ] pomasa.json carries a work section?
- [ ] The single/multi choice reflects the problem, not the default?
- [ ] Units are either pre-declared or enumerable at run time?
- [ ] Unit keys are meaningful axis values?
- [ ] Contract paths resolve relative to the unit root?