#!/bin/bash

# POMASA Paper Build Script
# Assembles markdown sections into a complete document and generates PDF

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SECTIONS_DIR="$SCRIPT_DIR/sections"
OUTPUT_DIR="$SCRIPT_DIR/_output"
PAPER_NAME="pomasa-paper"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

# Clean and recreate output directory
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Output file paths
MD_OUTPUT="$OUTPUT_DIR/${PAPER_NAME}-${TIMESTAMP}.md"
PDF_OUTPUT="$OUTPUT_DIR/${PAPER_NAME}-${TIMESTAMP}.pdf"

echo "Building POMASA paper..."

# Assemble markdown from sections (excluding format spec)
echo "Assembling markdown sections..."

# Start with title and author
cat > "$MD_OUTPUT" << 'EOF'
# POMASA: A Pattern Language for AI-Executable Multi-Agent Systems

XIONG Jie, East China Normal University

EOF

# Append each section in order
for section in 00-abstract 01-introduction 02-background 03-structure 04-patterns 05-applying 06-insight 07-conclusion; do
    section_file="$SECTIONS_DIR/${section}.md"
    if [ -f "$section_file" ]; then
        echo "  Adding: $section"
        # Append section content (cat preserves formatting)
        cat "$section_file" >> "$MD_OUTPUT"
        echo "" >> "$MD_OUTPUT"
    else
        echo "  WARNING: Section not found: $section_file"
    fi
done

echo "Markdown assembled: $MD_OUTPUT"

# Generate PDF using pandoc
echo "Generating PDF..."
pandoc "$MD_OUTPUT" \
    -o "$PDF_OUTPUT" \
    --pdf-engine=xelatex \
    -V geometry:margin=1in \
    -V fontsize=11pt \
    -V mainfont="Times New Roman" \
    -V monofont="Menlo"

echo "PDF generated: $PDF_OUTPUT"

echo ""
echo "Build complete!"
echo "  Markdown: $MD_OUTPUT"
echo "  PDF:      $PDF_OUTPUT"
