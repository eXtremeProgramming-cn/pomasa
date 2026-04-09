# Estimation Method Validation

**Category**: Quality
**Necessity**: Recommended

## Problem

How to prevent AI Agents from producing quantitative conclusions using logically invalid estimation methods?

AI Agents readily generate specific numbers when direct data is unavailable. The problem is not hallucination of sources—the inputs may be real—but rather the *reasoning chain* connecting those inputs to the output figure. Common failures include:

- Using a metric from one scope (e.g., domestic market share) to derive a figure from a different scope (e.g., global export volume)
- Failing to check whether an estimated result is internally consistent with other known directly measured values
- Presenting multi-step derived estimates with the same certainty as directly observed facts

Unlike QUA-03 (Verifiable Data Lineage), which addresses whether *sources are real*, this pattern addresses whether the *method is logically valid*.

## Context

This pattern applies in the following scenarios:

- An Agent must produce quantitative conclusions but lacks direct access to the target data
- Estimation or inference from proxy data is necessary
- The final report will be used for decision-making where misleading figures carry real consequences
- Multiple quantitative figures exist in the same document and may contradict each other

## Forces

- **Precision vs. Availability**: Decision-makers want specific numbers; direct data is often unavailable
- **Confidence vs. Completeness**: Refusing to estimate leaves gaps; estimating without validation creates false confidence
- **Automation vs. Rigor**: Requiring full validation slows the pipeline; skipping it risks undetected errors
- **Derived vs. Observed**: Agents naturally treat derived figures the same as measured ones in subsequent reasoning

## Solution

**Establish a three-stage gate for any quantitative estimation: validate the method before calculating, cross-check the result against anchor data after calculating, and label all quantitative outputs with a mandatory confidence tier.**

### Stage 1: Method Validity Gate (before calculating)

Before executing any estimation, the Agent must answer the following questions. If any answer is "no" or "unknown," the method must be revised or abandoned.

```markdown
## Estimation Method Validity Check

**What am I trying to estimate?**
[State the target metric clearly]

**What estimation method am I using?**
[Describe the formula or reasoning chain]

**Validity checks:**
- [ ] Scope alignment: Does the numerator come from the same population as the denominator?
      Example of failure: domestic market share (%) × total global industry exports ($) — different scopes
- [ ] Causal validity: Is there a documented theoretical basis for using input A to estimate output B,
      or is this an assumed correlation?
- [ ] Falsifiability: Can a single counterexample disprove this method? If yes, actively search for it.
- [ ] Input independence: Are the formula inputs independent, or do shared factors cause
      double-counting or cancellation?

**If any check fails:** Revise the method. If no valid method exists, report the data as unavailable
and explain why estimation is not feasible.
```

### Stage 2: Anchor Consistency Gate (after calculating, before outputting)

After computing an estimate, cross-check it against all directly observed values for the same subject.

```markdown
## Anchor Consistency Check

**Directly observed values available for this subject:**
| Data Point | Value | Source | Type |
|-----------|-------|--------|------|
| [e.g., annual revenue] | [value] | [filing/registration] | 🟢 Direct |

**Estimated value:** [result]

**Comparison:**
- Difference factor: [estimated / observed = N×]
- If N < 3: Proceed — result is plausible
- If N ≥ 3 and < 10: Flag as SUSPICIOUS — document and explain the discrepancy
- If N ≥ 10: Flag as LIKELY INVALID — do not present as a finding; report anchor data instead
  and state that estimation is not feasible

**Conflict resolution rule:** When estimated and observed values conflict, observed data always takes precedence.
```

### Stage 3: Confidence Tier Labeling (mandatory on all quantitative outputs)

Every quantitative value in the output must carry one of the following labels:

| Tier | Label | Definition | Presentation Rule |
|------|-------|------------|-------------------|
| 🟢 Direct | Directly observed | From primary source (filing, official publication, verified third-party data) | May be cited as fact |
| 🟡 Derived-1 | Single-step estimate | One inference step from direct data, with valid method | Must state method and assumption |
| 🔴 Derived-N | Multi-step estimate | Two or more inference steps | Must include disclaimer; never present as a precise figure |

**Confidence propagation rule**: The confidence of a chain is bounded by its weakest link. If any step is 🔴, the final output is 🔴 regardless of how reliable other steps are.

### Data Limitation Reporting

When estimation is not feasible due to missing anchor data or invalid methods, the output must explicitly state:

```markdown
## Data Limitations

**[Metric name]**: Not estimable from available public data.

Reason: [Explain why no valid estimation method exists, e.g., "The only available proxy (X)
comes from a different scope than the target metric (Y), making the derivation logically invalid."]

Available anchor data: [List what IS known directly]
```

## Consequences

### Benefits

- **Prevents method errors**: Catches logically invalid estimation chains before they produce output
- **Detects internal contradictions**: Anchor consistency check surfaces conflicts between derived and observed figures
- **Calibrates reader confidence**: Mandatory tier labeling allows downstream users to weight figures appropriately
- **Forces honest reporting**: When estimation is not feasible, the pattern requires explicit acknowledgment rather than a fabricated number

### Liabilities

- **Slower output**: Three-stage validation adds time to quantitative analysis
- **More "data unavailable" conclusions**: Rigorous validation will correctly identify more cases where estimation is not feasible — this may feel like reduced output but is actually higher quality
- **Requires anchor data**: The consistency check is only effective when at least one directly observed value exists for cross-referencing

## Implementation Guidelines

### Embedding in Agent Blueprints

For any Agent that produces quantitative estimates, add the following section to its Blueprint:

```markdown
## Quantitative Estimation Protocol

Before producing any estimated figure, you must complete the three-stage validation
defined in QUA-04:

1. **Method Validity Gate**: Complete the validity checklist before calculating.
   If any check fails, revise the method or report the metric as unavailable.

2. **Anchor Consistency Gate**: After calculating, compare the result against all
   directly observed values. If the difference exceeds 10×, do not present the estimate.

3. **Confidence Tier Labeling**: Label every quantitative output as
   🟢 Direct / 🟡 Derived-1 / 🔴 Derived-N.

These steps are not optional. Skipping them and presenting an unvalidated estimate
as a finding is a quality failure.
```

### Integration with STR-06 Methodological Guidance

The `estimation-methods.md` component of STR-06 provides project-specific rules for what estimation methods are acceptable. QUA-04 provides the validation process that those methods must pass through. Both are required:

- STR-06 `estimation-methods.md` → defines *which* methods are allowed for this project
- QUA-04 → defines *how* each method must be validated before use

### Integration with QUA-02 Layered Quality Assurance

QUA-04 operates at Layer 1 (Agent self-checking) and Layer 2 (downstream cross-Agent validation):

- **Layer 1**: The estimating Agent applies the three-stage gate before outputting
- **Layer 2**: A downstream analysis or reporting Agent checks that all quantitative inputs it receives carry confidence tier labels; if any figure is unlabeled, it requests clarification or applies the most conservative tier (🔴)

## Checklist

When designing a system that produces quantitative estimates, confirm:

- [ ] Estimating Agents have the three-stage gate embedded in their Blueprints
- [ ] The project's `estimation-methods.md` (STR-06) defines acceptable methods for this domain
- [ ] At least one directly observed anchor value is identified for each key estimated metric
- [ ] All quantitative outputs carry confidence tier labels (🟢 / 🟡 / 🔴)
- [ ] The final report includes a "Data Limitations" section for any metric where estimation was not feasible
- [ ] Downstream Agents are instructed to treat unlabeled figures as 🔴

## Related Patterns

- **[Methodological Guidance](./STR-06-methodological-guidance.md)**: The `estimation-methods.md` component defines project-specific acceptable methods; QUA-04 provides the validation process
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: The Quantitative Analysis Standards dimension in QUA-01 enforces confidence tier labeling; QUA-04 defines the full validation protocol
- **[Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md)**: QUA-03 verifies that sources are real; QUA-04 verifies that the reasoning from those sources is valid — complementary, not redundant
- **[Layered Quality Assurance](./QUA-02-layered-quality-assurance.md)**: QUA-04 operates at Layers 1 and 2 of the five-layer model
