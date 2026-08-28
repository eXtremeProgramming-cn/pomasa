# Run Manifest

**Category**: Observability
**Necessity**: Required

## Problem

How do humans and UIs know a run's progress, and how do they see it after the run is over? Where does the durable, runtime-agnostic record of a run live?

Session transcripts are runtime-specific and ephemeral. File timestamps tell a story only in retrospect. A UI needs coarse, authoritative, restart-proof state: which stage is active, which completed, which failed, and when.

## Context

This pattern applies to the following scenarios:

- A run executes under an intelligent runtime (Claude Code, DSH, ...) that may be restarted
- A UI shows per-stage progress and run history
- Audits need a run record independent of the runtime

## Forces

- **Live precision vs Durable truth**: runtime events are live but perishable; a state machine is coarse but stable
- **Agent-maintained vs Host-maintained**: the MAS knows its own stages; a host could observe them, but only for one runtime

## Solution

**Each unit root carries `run.json`, a stage-level state machine maintained incrementally by the orchestrator at stage boundaries. It stores run metadata and per-stage status; artifact listings are left to the stage indexes (OBV-01).**

### run.json schema

```json
{
  "schema_version": "obv-1",
  "mas_id": "sos-digital-index",
  "unit": "brasil",
  "created_at": 1758000000000,
  "status": "running",
  "trigger": "ui",
  "runtime": "dsh",
  "runtime_session_id": "sess-123",
  "stages": [
    {
      "index": 2,
      "id": "deep_research",
      "status": "active",
      "started_at": 1758000001000,
      "finished_at": null
    }
  ]
}
```

- Run `status`: `queued | running | completed | failed | aborted`
- Stage `status`: `waiting | active | completed | failed | skipped | aborted`

### Maintenance protocol

1. On run start, the orchestrator writes the initial skeleton.
2. At each stage boundary (enter, complete, fail), it updates the stage entry.
3. On run end, it sets the run status and closes timestamps.

Index maintenance (OBV-01) belongs to the stage agents; run.json maintenance belongs to the orchestrator. The generated orchestrator blueprint must carry this protocol as part of its own behavior.

### Degradation

A runtime host may optionally backfill `run.json` from observed session events when the MAS lags in writing it. This is a fallback, not the primary mechanism; runtimes without a host observer simply rely on the MAS.

## Consequences

### Benefits

- Run progress is restart-safe and runtime-agnostic
- History and audit are plain files, copied with the unit
- UI state derives from files, never from session text

### Liabilities

- Administrative writing costs the orchestrator a few extra actions
- run.json lags real time by one stage boundary; a live pulse requires the runtime event stream

## Implementation Guidelines

- Do not duplicate index entries into run.json; the stage index is the single source for artifacts
- Keep run.json small: run metadata plus stage transitions
- Optional: an `events.jsonl` per unit for finer traces and richer history

## Examples

A three-stage research run: stage 1 completes, stage 2 goes active. The UI renders stage lights from run.json and artifact cards from the stage indexes; the live panel shows the current agent from session events.

## Related Patterns

- [Observable Artifact Contract (OBV-01)](./OBV-01-observable-artifact-contract.md): artifact instances live in stage indexes
- [Work Unit Decomposition (OBV-02)](./OBV-02-work-unit-decomposition.md): every unit root has one run.json
- [Intelligent Runtime (COR-02)](./COR-02-intelligent-runtime.md): the orchestrator interprets the maintenance protocol
- [Verifiable Data Lineage (QUA-03)](./QUA-03-verifiable-data-lineage.md): run timestamps support lineage

## Checklist

- [ ] Every unit root carries run.json?
- [ ] Orchestrator updates run.json at stage boundaries?
- [ ] run.json holds only the state machine, not artifact lists?
- [ ] Run and stage status enums are respected?
- [ ] Live pulse, if any, comes from session events rather than more frequent run.json writes?