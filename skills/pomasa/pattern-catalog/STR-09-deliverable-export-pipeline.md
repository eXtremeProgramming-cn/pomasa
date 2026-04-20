# Deliverable Export Pipeline

**Category**: Structure
**Necessity**: Recommended

## Problem

How to convert final research reports into professional document formats for delivery?

Research outputs in Markdown format cannot be directly delivered to stakeholders who expect standard document formats like DOCX or PDF. Manual conversion is error-prone and inconsistent. Without a standardized export process, each project handles conversion differently, leading to inconsistent deliverable quality.

## Context

This pattern applies to the following scenarios:

- Research projects that produce final reports for external delivery
- Deliverables need to be in DOCX format (for editing) and/or PDF format (for distribution)
- Consistent formatting and professional appearance are required
- Multiple languages may be involved (especially CJK languages requiring special handling)

## Forces

- **Format Flexibility vs Consistency**: Stakeholders expect different formats, but each should look consistent
- **Automation vs Customization**: Automated export saves time, but formatting needs may vary
- **Simplicity vs Features**: Simple scripts are maintainable, but advanced formatting requires configuration
- **Intermediate vs Final**: Markdown is great for AI generation, but not for delivery

## Solution

**Create a dedicated export pipeline that converts the final Markdown report to DOCX and PDF formats using pandoc, with template files controlling formatting and output organized in a separate deliverables directory.**

### Core Principles

1. **Dedicated Output Directory**
   - Export deliverables to `_output/` in the project root
   - Keep separate from `workspace/` which holds intermediate artifacts
   - Consider adding `_output/` to `.gitignore` (user's choice)

2. **Script-Based Automation**
   - Place export scripts in `scripts/` directory
   - Scripts are deterministic and repeatable
   - No AI involvement in the export process

3. **Template-Controlled Formatting**
   - DOCX formatting via reference document template
   - PDF formatting via LaTeX header file
   - Templates stored in `scripts/` alongside the export script

4. **Title-Based Naming**
   - Extract report title from Markdown heading
   - Add timestamp for version tracking
   - Sanitize special characters for filesystem compatibility

## Consequences

### Benefits

- **Professional Output**: Consistent, well-formatted deliverables
- **Reproducible**: Same script produces same output
- **Flexible Formats**: Support both editable (DOCX) and final (PDF) formats
- **Multi-Language Support**: Proper handling of CJK and other scripts via XeLaTeX

### Liabilities

- **External Dependencies**: Requires pandoc and optionally XeLaTeX
- **Template Maintenance**: Format templates need occasional updates
- **Platform Differences**: Font availability may vary across systems

## Implementation Guidelines

### Directory Structure

```
my-mas/
├── agents/
├── references/
├── workspace/
│   └── 05.report/
│       └── final_report.md      # Source for export
├── scripts/
│   ├── export.sh                # Export script (supports --lang cn|en)
│   ├── docx-template.docx       # DOCX format template
│   ├── latex-header.tex         # PDF format (Chinese, default)
│   └── latex-header-en.tex      # PDF format (English, block-style)
└── _output/                     # Deliverables (may be gitignored)
    ├── Report Title [20260101-093510].docx
    └── Report Title [20260101-093510].pdf
```

### Export Script Example

The export script supports a `--lang cn|en` parameter to select the appropriate LaTeX header. The default is `cn` (Chinese, with first-line indentation). Use `--lang en` for English documents (block-style paragraphs, no indent).

```bash
#!/bin/bash
# export.sh - Export final report to DOCX and PDF

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="${PROJECT_ROOT}/_output"

# Parse arguments
LANG="cn"
INPUT_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --lang)
            LANG="$2"
            shift 2
            ;;
        *)
            INPUT_FILE="$1"
            shift
            ;;
    esac
done

# Default input file
INPUT_FILE="${INPUT_FILE:-${PROJECT_ROOT}/workspace/05.report/final_report.md}"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file not found: $INPUT_FILE"
    exit 1
fi

# Extract title from first heading
TITLE=$(grep -m 1 '^# ' "$INPUT_FILE" | sed 's/^# //')
if [ -z "$TITLE" ]; then
    echo "Error: No title found (expected '# Title' on first content line)"
    exit 1
fi

# Sanitize title for filename (replace invalid chars with -)
SAFE_TITLE=$(echo "$TITLE" | sed 's/[:<>"|?*\/\\]/-/g' | sed 's/  */ /g')

# Add timestamp
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BASENAME="${SAFE_TITLE} [${TIMESTAMP}]"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Template files
DOCX_TEMPLATE="${SCRIPT_DIR}/docx-template.docx"

# Select LaTeX header by language
LATEX_HEADER="${SCRIPT_DIR}/latex-header.tex"
if [ "$LANG" = "en" ]; then
    LATEX_HEADER="${SCRIPT_DIR}/latex-header-en.tex"
    echo "Using English PDF template (block paragraphs, no indent)"
else
    echo "Using Chinese PDF template (first-line indentation)"
fi

# Export to DOCX
echo "Exporting to DOCX..."
if [ -f "$DOCX_TEMPLATE" ]; then
    pandoc "$INPUT_FILE" \
        --reference-doc="$DOCX_TEMPLATE" \
        -o "${OUTPUT_DIR}/${BASENAME}.docx"
else
    pandoc "$INPUT_FILE" \
        -o "${OUTPUT_DIR}/${BASENAME}.docx"
fi
echo "Created: ${OUTPUT_DIR}/${BASENAME}.docx"

# Export to PDF
echo "Exporting to PDF..."
if [ -f "$LATEX_HEADER" ]; then
    pandoc "$INPUT_FILE" \
        --pdf-engine=xelatex \
        -H "$LATEX_HEADER" \
        -o "${OUTPUT_DIR}/${BASENAME}.pdf"
else
    pandoc "$INPUT_FILE" \
        --pdf-engine=xelatex \
        -o "${OUTPUT_DIR}/${BASENAME}.pdf"
fi
echo "Created: ${OUTPUT_DIR}/${BASENAME}.pdf"

echo "Export complete!"
```

### DOCX Template

The `docx-template.docx` file controls DOCX formatting:

- Create a Word document with desired styles (headings, body text, lists, etc.)
- Set fonts (e.g., Cochin for English, SimSun/宋体 for Chinese)
- Configure margins, line spacing, paragraph spacing
- Pandoc will apply these styles to the generated document

To create a template:
1. Generate a basic DOCX: `pandoc sample.md -o template.docx`
2. Open in Word/LibreOffice and modify styles
3. Save as `docx-template.docx`

### LaTeX Header for PDF

The export pipeline provides **language-specific LaTeX headers** to handle the different typographic conventions of Chinese and English documents:

#### Chinese Documents (`latex-header.tex`, default)

Chinese documents use first-line paragraph indentation (首行缩进), centered section/subsection headings, and `indentfirst` to ensure even the first paragraph after a heading is indented.

```latex
% 段落格式 — 中文：首行缩进两个字
\usepackage{indentfirst}
\setlength{\parindent}{2em}
\setlength{\parskip}{0pt}

% 标题格式 — 各级标题明显大于正文，居中
\usepackage{titlesec}
\titleformat{\section}{\LARGE\bfseries\centering}{\thesection}{1em}{}
\titleformat{\subsection}{\Large\bfseries\centering}{\thesubsection}{1em}{}
\titleformat{\subsubsection}{\large\bfseries}{\thesubsubsection}{1em}{}
```

#### English Documents (`latex-header-en.tex`)

English documents use block-style paragraphs (no indent, spacing between paragraphs), left-aligned headings, and larger font sizes for clear visual hierarchy.

```latex
% Paragraph formatting — English: block-style, no indent
\setlength{\parindent}{0em}
\setlength{\parskip}{0.5em}

% Title formatting — larger than body text
\usepackage{titlesec}
\titleformat{\section}{\LARGE\bfseries}{\thesection}{1em}{}[\vspace{0.3em}]
\titleformat{\subsection}{\Large\bfseries}{\thesubsection}{1em}{}
\titleformat{\subsubsection}{\large\bfseries}{\thesubsubsection}{1em}{}
```

Both headers include CJK font support (`xeCJK`) so that Chinese terms within English documents render correctly.

#### Font Size Hierarchy

Both templates define a clear visual hierarchy using `titlesec`:

| Heading Level | LaTeX Command | Font Size |
|--------------|---------------|-----------|
| Section (##) | `\section` | `\LARGE` (~17pt) |
| Subsection (###) | `\subsection` | `\Large` (~14pt) |
| Sub-subsection (####) | `\subsubsection` | `\large` (~12pt) |
| Body text | — | `\normalsize` (~10pt) |

This ensures all heading levels are visually distinct from body text. The third-level heading (`\subsubsection`) has its own line with proper spacing above and below via `\titlespacing*`.

### Usage

Basic usage (Chinese document, default):
```bash
./scripts/export.sh
```

English document:
```bash
./scripts/export.sh --lang en
```

With explicit input file:
```bash
./scripts/export.sh --lang en workspace/05.report/final_report.md
```

## Examples

### Correct Directory Layout

```
industry-assessment/
├── agents/
│   └── ...
├── references/
│   └── ...
├── workspace/
│   ├── 01.raw/
│   ├── 02.processed/
│   └── 05.report/
│       └── final_report.md
├── scripts/
│   ├── export.sh
│   ├── docx-template.docx
│   ├── latex-header.tex
│   └── latex-header-en.tex
└── _output/
    ├── Industry Assessment Report [20260101-093510].docx
    └── Industry Assessment Report [20260101-093510].pdf
```

### Title Extraction and Sanitization

| Original Title | Sanitized Filename |
|----------------|-------------------|
| `# My Report` | `My Report [timestamp].docx` |
| `# Analysis: Q1 2025` | `Analysis- Q1 2025 [timestamp].docx` |
| `# What/Why/How?` | `What-Why-How- [timestamp].docx` |

### Integration with Composable Document Assembly

When using STR-05 (Composable Document Assembly), the workflow is:

1. Generate sections independently → `workspace/04.sections/`
2. Assemble into final report → `workspace/05.report/final_report.md`
3. Export to deliverables → `_output/`

The assembly script and export script are separate:
- `scripts/assemble.sh` - combines sections (may be in `workspace/scripts/`)
- `scripts/export.sh` - converts to DOCX/PDF

## Related Patterns

- **[Pandoc-Ready Markdown Format](./STR-08-pandoc-ready-markdown.md)**: Ensures source Markdown converts correctly
- **[Composable Document Assembly](./STR-05-composable-document-assembly.md)**: Produces the final report to be exported
- **[Filesystem Data Bus](./STR-02-filesystem-data-bus.md)**: `_output/` as final stage in data flow
- **[Workspace Isolation](./STR-03-workspace-isolation.md)**: Export script works within project boundaries

## Checklist

When implementing this pattern, confirm:

- [ ] Is there a `scripts/` directory for export tooling?
- [ ] Is there an `_output/` directory for deliverables?
- [ ] Does the export script extract title from Markdown heading?
- [ ] Does the script sanitize title for filesystem compatibility?
- [ ] Does the script add timestamp to filename?
- [ ] Is there a DOCX template file with appropriate styles?
- [ ] Is there a LaTeX header file for PDF generation (if CJK support needed)?
- [ ] Does the final Markdown follow Pandoc-Ready format (STR-08)?
