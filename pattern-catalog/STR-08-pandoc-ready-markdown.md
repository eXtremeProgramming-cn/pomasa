# Pandoc-Ready Markdown Format

**Category**: Structure
**Necessity**: Recommended

## Problem

How to ensure AI-generated Markdown documents can be correctly converted to DOCX, PDF, and other formats?

AI-generated Markdown often contains format issues that are invisible when viewing the source but cause problems during conversion: missing blank lines before lists cause them to display as plain text, skipped heading levels result in incorrect document structure, special characters trigger parsing errors. These issues are difficult to detect until conversion is attempted.

## Context

This pattern applies to the following scenarios:

- Research outputs need to be delivered in DOCX or PDF format
- Documents will be processed by pandoc (directly or via tools that use pandoc)
- Multiple AI agents generate different sections that will be combined
- Documents need to maintain consistent formatting after conversion

## Forces

- **Readability vs Strictness**: Markdown is readable but conversion tools require strict formatting
- **AI Flexibility vs Format Consistency**: AI may produce valid but inconsistently formatted Markdown
- **Invisible Errors**: Format issues often only appear after conversion
- **Tool-Specific Requirements**: Different conversion tools have different requirements

## Solution

**Establish explicit Markdown format specifications designed for pandoc compatibility, embed these specifications in Agent Blueprints, and use checkable criteria that AI can verify before output.**

### Core Principles

1. **Explicit Over Implicit**
   - Don't assume AI knows pandoc requirements
   - Specify every formatting rule explicitly
   - Use checklist format for self-verification

2. **Preventive Over Corrective**
   - Embed specifications in generation prompts
   - Catch issues during generation, not after conversion
   - Make specifications part of the Agent's quality standards

3. **Checkable Criteria**
   - Each rule should be verifiable
   - Use checkbox format: `- [ ] rule description`
   - AI can mentally check each item before finalizing output

## Format Specification

The following specification should be embedded in or referenced by any Agent Blueprint that generates Markdown intended for pandoc conversion:

### Heading Specification

- [ ] Document has exactly one level-1 heading (#) for the main title
- [ ] Sections use level-2 headings (##) and below
- [ ] Heading levels are continuous—do not skip levels (## followed by ###, not ####)
- [ ] Blank line before each heading
- [ ] Blank line after each heading

### Paragraph and Spacing Specification

- [ ] One blank line between paragraphs
- [ ] One blank line at the beginning of the file
- [ ] One blank line at the end of the file
- [ ] No trailing spaces at end of lines (can cause unintended line breaks)

### List Specification

- [ ] One blank line before starting a list
- [ ] One blank line after ending a list
- [ ] Consistent bullet character (use `-` throughout)
- [ ] Nested lists: use 2-space indentation
- [ ] Continuation lines within list items: use 2-space indentation
- [ ] Numbered lists: use `1.` format (pandoc will renumber automatically)

### Code Block Specification

- [ ] One blank line before code block
- [ ] One blank line after code block
- [ ] Use triple backticks (```) not indentation for code blocks
- [ ] Specify language after opening backticks (```python, ```bash, etc.)
- [ ] No trailing backticks on the same line as code

### Quote Block Specification

- [ ] One blank line before quote block
- [ ] One blank line after quote block
- [ ] Each line of multi-line quotes starts with `>`
- [ ] Nested quotes use `>>` (with no space between)

### Table Specification

- [ ] One blank line before table
- [ ] One blank line after table
- [ ] Header row followed by separator row with dashes and pipes
- [ ] Consistent column alignment (use colons in separator row if needed)
- [ ] No empty cells (use space or dash if needed)

### Link and Reference Specification

- [ ] Footnotes use `[^n]` format for reference and `[^n]:` for definition
- [ ] Footnote definitions placed at end of section or document
- [ ] URLs in links are complete and properly encoded
- [ ] Image paths are correct relative to document location

### Special Characters

- [ ] Avoid characters that may cause parsing issues: `<`, `>`, `&` in plain text
- [ ] Use HTML entities if special characters are needed: `&lt;`, `&gt;`, `&amp;`
- [ ] Escape characters that have Markdown meaning when used literally: `\*`, `\_`, `\#`
- [ ] Smart quotes and em-dashes are acceptable (pandoc handles these well)

### Chinese Typography Specification

When generating Chinese-language documents, use proper Chinese punctuation marks instead of ASCII equivalents:

- [ ] Use fullwidth quotation marks: `“...”` (U+201C, U+201D) not `"..."` (U+0022)
- [ ] Use fullwidth single quotes: `‘...’` (U+2018, U+2019) not `'...'` (U+0027)
- [ ] Use fullwidth colon: `：` (U+FF1A) not `:` (U+003A) in Chinese sentences
- [ ] Use fullwidth comma: `，` (U+FF0C) not `,` (U+002C) in Chinese sentences
- [ ] Use fullwidth period: `。` (U+3002) not `.` (U+002E) in Chinese sentences
- [ ] Use fullwidth parentheses: `（）` (U+FF08, U+FF09) not `()` in Chinese context
- [ ] Use Chinese book title marks for titles: `《书名》` (U+300A, U+300B)

**Important**: AI models (including Claude) have a known tendency to use ASCII straight quotes (`"`) instead of proper Chinese quotation marks (`“”`). This must be explicitly corrected.

**Correction Method**: If post-processing is needed, use paired replacement:

```python
def fix_quotes(text):
    """Replace ASCII quotes with Chinese fullwidth quotes."""
    # Unicode characters
    LEFT_DOUBLE = '\u201c'   # "
    RIGHT_DOUBLE = '\u201d'  # "
    LEFT_SINGLE = '\u2018'   # '
    RIGHT_SINGLE = '\u2019'  # '

    result = []
    in_double_quote = False
    in_single_quote = False

    for char in text:
        if char == '"':
            if not in_double_quote:
                result.append(LEFT_DOUBLE)
                in_double_quote = True
            else:
                result.append(RIGHT_DOUBLE)
                in_double_quote = False
        elif char == "'":
            if not in_single_quote:
                result.append(LEFT_SINGLE)
                in_single_quote = True
            else:
                result.append(RIGHT_SINGLE)
                in_single_quote = False
        else:
            result.append(char)

    return ''.join(result)
```

## Consequences

### Benefits

- **Reliable Conversion**: Documents convert without format errors
- **Consistent Output**: All sections follow same formatting rules
- **Self-Checking**: AI can verify compliance before output
- **Reusable Specification**: Same rules apply across all document-generating Agents

### Liabilities

- **Verbose Prompts**: Specifications add length to Agent Blueprints
- **Over-Specification Risk**: Some rules may be unnecessary for simpler documents
- **Maintenance Burden**: Specifications may need updating as pandoc evolves

## Implementation Guidelines

### Embedding in Agent Blueprint

```markdown
# Report Section Writer Agent

## Your Task

Generate the specified section of the research report.

## Format Requirements

**You must follow the Pandoc-Ready Markdown Format specification.**

Before finalizing your output, verify:
- [ ] Blank line before and after all headings
- [ ] Blank line before and after all lists
- [ ] Blank line before and after all code blocks
- [ ] Sections start with ## (level-2 heading)
- [ ] No skipped heading levels
- [ ] One blank line at file beginning and end

## Output

Write to `data/04.sections/{section_name}.md`
```

### Creating a Reusable Reference File

For projects with multiple document-generating Agents, create a reference file:

```
references/
└── markdown-format-spec.md    # Full specification
```

Then reference it in Blueprints:

```markdown
## Format Requirements

Follow all rules in `references/markdown-format-spec.md`.
```

### Quick Verification Checklist

For rapid checking, use this minimal checklist:

```markdown
Before output, verify:
- [ ] Blank lines around all block elements (headings, lists, code, quotes, tables)
- [ ] Heading levels are sequential (no skipping from ## to ####)
- [ ] Single # heading only for document title
- [ ] File starts and ends with blank line
```

## Examples

### Correct Example

```markdown

## Research Findings

This section presents our key findings from the analysis.

### Data Collection Results

We collected data from three sources:

- Primary interviews (n=25)
- Survey responses (n=150)
- Document analysis (n=45)

The following table summarizes response rates:

| Source | Total | Responses | Rate |
|--------|-------|-----------|------|
| Email  | 200   | 150       | 75%  |
| Phone  | 50    | 25        | 50%  |

### Statistical Analysis

The correlation was significant:

```r
cor.test(x, y, method = "pearson")
```

This indicates a strong relationship between variables.

```

### Incorrect Example

```markdown
## Research Findings
This section presents our findings.        ❌ No blank line after heading

#### Data Collection Results              ❌ Skipped heading level (## to ####)

We collected data from three sources:     ❌ No blank line before list
- Primary interviews
- Survey responses
- Document analysis
The following table summarizes rates:     ❌ No blank line after list

| Source | Total | Responses |
|--------|-------|-----------|              ❌ No blank line before table
| Email  | 200   | 150       |
```python                                  ❌ No blank line before code block
cor.test(x, y)
```
```

## Related Patterns

- **[Deliverable Export Pipeline](./STR-09-deliverable-export-pipeline.md)**: Consumes Pandoc-ready Markdown to produce DOCX/PDF
- **[Composable Document Assembly](./STR-05-composable-document-assembly.md)**: Uses this format specification for section generation
- **[Embedded Quality Standards](./QUA-01-embedded-quality-standards.md)**: Format rules as quality criteria in Blueprints
- **[Faithful Agent Instantiation](./BHV-02-faithful-agent-instantiation.md)**: Each section generator follows the same format rules

## Checklist

When implementing this pattern, confirm:

- [ ] Is there a format specification document or embedded specification?
- [ ] Does the specification cover all Markdown elements used in outputs?
- [ ] Are specifications in checklist format for self-verification?
- [ ] Do all document-generating Agent Blueprints reference the specification?
- [ ] Has test conversion been performed to verify pandoc compatibility?
- [ ] Is there a process for updating specifications if issues are found?
- [ ] For Chinese documents: Are Chinese typography rules included in the specification?
- [ ] For Chinese documents: Is there a post-processing step to fix AI-generated ASCII quotes?
