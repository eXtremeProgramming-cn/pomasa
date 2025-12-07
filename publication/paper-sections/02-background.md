
## 2. Background: The Industry Analysis System

To ground our discussion of patterns in concrete reality, we introduce an industry analysis system built using POMASA. This system conducts systematic research on industrial sectors, analyzing them through a theoretical framework that examines ownership structures, distribution mechanisms, resource allocation, and economic governance. The system has produced substantive reports, including a comprehensive analysis of the electric vertical takeoff and landing (eVTOL) industry that spans multiple dimensions of institutional analysis.

### 2.1 System Overview

The industry analysis system transforms a research question into an academic-quality report through a multi-stage pipeline. Given an industry identifier and a theoretical framework, the system:

1. **Scans** the industry landscape to establish basic understanding and generate targeted research questions
2. **Researches** each question through systematic web search, collecting policies, statistics, cases, and expert views
3. **Verifies** collected data in an independent context to identify and eliminate AI hallucinations
4. **Analyzes** each research dimension against the theoretical framework
5. **Synthesizes** individual analyses into coherent higher-level insights
6. **Generates** a final report with executive summary
7. **Reviews** the complete output against quality standards

### 2.2 System Scale and Complexity

The system comprises 8 distinct agents, each defined by a natural language blueprint averaging 7-9 KB of structured markdown. The theoretical framework encompasses 4 dimensions, 12 features, and 55 functional items, each requiring independent research and analysis. A complete run produces:

- Initial industry overview documents covering basic profile, ownership structure, policy environment, and development history
- Research questions organized by dimension (approximately 200 specific questions across 55 functional items)
- Deep research materials including policies, statistics, cases, and expert views for each functional item
- Verification reports identifying unreliable data
- Analysis documents for each functional item, feature, and dimension
- Final report with executive summary (the eVTOL report spans approximately 50,000 words)

### 2.3 Why This Case Study

We selected this system as our running example for several reasons:

**Complexity**: The system involves genuine multi-agent coordination, not merely sequential prompts. Agents must pass data through file-based interfaces, maintain data lineage across stages, and coordinate parallel execution of 55 independent research tasks.

**Real Deployment**: The system has been used in practice, producing reports that have undergone human review. We can point to concrete outputs rather than hypothetical scenarios.

**Pattern Coverage**: Building this system required solving most challenges that declarative MAS developers face: agent definition, inter-agent communication, quality assurance, hallucination prevention, parallel execution, and orchestration.

**Verifiable Quality**: The eVTOL analysis report demonstrates that the pattern language approach can produce substantive, academically-rigorous output. The report includes 150+ citations to verifiable sources, structured analysis across multiple dimensions, and actionable policy recommendations—quality markers that validate the underlying architecture.

### 2.4 A Glimpse of the Output

To illustrate what this system produces, consider this excerpt from the executive summary of the eVTOL industry analysis:

> The eVTOL industry exhibits clear functional division and effective synergy among three ownership forms: state-owned economy plays a "stabilizing anchor" role, maintaining comprehensive control over airspace resources, airworthiness certification, infrastructure construction, and industrial fund investment (exceeding 100 billion yuan); public land ownership enables "planning leadership," with rapid deployment of 1,200 takeoff/landing points in Shenzhen, 400 routes in Shanghai, and the world's first cross-sea cross-city route—achievements difficult to replicate in countries with private land ownership; non-public economy serves as "innovation engine," with private enterprises accounting for 68.1%-81% of aircraft manufacturers, 40 companies simultaneously conducting R&D with diversified technical routes, and patent applications accounting for 58.3% globally.

This excerpt demonstrates several pattern outcomes: data grounded in verifiable sources (the percentages and counts), multi-dimensional analysis (ownership structure as one of four dimensions), and synthesis that goes beyond mere data compilation to identify institutional patterns. The full report maintains this quality across 55 functional items and four dimensions, enabled by the systematic application of POMASA patterns.

