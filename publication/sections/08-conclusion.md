
## 8. Discussion and Conclusion

### 8.1 Applicability and Scope

POMASA emerged from building research-oriented multi-agent systems—specifically, systems that follow the pattern of "information collection → information processing → report generation." This pattern characterizes a broad class of knowledge work:

- Industry analysis and market research
- Literature reviews and systematic surveys
- Competitive intelligence gathering
- Policy analysis and impact assessment
- Due diligence and investigation reports

The industry analysis system demonstrates POMASA's applicability to substantive research tasks. The eVTOL analysis report—comprehensive, multi-dimensional, grounded in verifiable sources—suggests that declarative MAS can produce outputs of genuine analytical value.

POMASA's applicability extends beyond its original domain. The pattern language addresses general challenges in multi-agent coordination: how to define agents, how they communicate, how to ensure quality. These challenges arise regardless of whether agents collect industry data or perform other tasks.

The pattern language also accommodates extension. Systems requiring data from structured databases (rather than web search) can add patterns for database access through tools like MCP (Model Context Protocol). The filesystem data bus pattern doesn't preclude other data sources; it addresses inter-agent communication, not data origination.

### 8.2 Limitations

Several limitations constrain POMASA's current scope:

**Batch processing orientation**: The patterns assume batch processing rather than real-time interaction. Systems requiring immediate responses or continuous operation need additional patterns not yet developed.

**Research task bias**: The pattern language reflects its origin in research systems. Applications like code generation, customer service, or creative writing may require different or additional patterns.

**Cross-platform variability**: POMASA is distributed as a skill via skills.sh, a platform supporting over a dozen AI coding assistants including Claude Code, Cursor, Cline, Windsurf, and GitHub Copilot. The patterns are therefore portable in principle. However, different runtimes vary in tool naming conventions, subagent mechanisms, and capability levels. Some patterns (notably BHV-06: Configurable Tool Binding) remain runtime-specific, and cross-platform systems require attention to these implementation differences.

**Security**: POMASA does not currently address security concerns such as protecting domain knowledge from exposure to cloud-based AI services, securing inter-agent communication, or preventing prompt injection attacks. Security in multi-agent systems is a substantial topic that warrants dedicated treatment. Organizations deploying POMASA-based systems in sensitive domains should conduct their own security assessment and apply appropriate safeguards.

**Quality ceiling**: Output quality depends on underlying AI capabilities. POMASA provides structure and verification but cannot exceed what the AI runtime can produce. As AI capabilities evolve, achievable quality will increase.

**Scaling limits**: The industry analysis system handles 55 parallel research tasks comfortably. Systems requiring thousands of concurrent agents may encounter coordination challenges the current patterns don't address.

Beyond these architectural limitations, several practical considerations merit discussion. The industry analysis system is a research-oriented batch processing system; a complete run takes several hours and produces qualitative analytical outputs. This operational context shapes the following observations:

**Testing and evaluation**: The system's primary outputs are qualitative research analyses—research conclusions, analytical depth, argumentative soundness—that inherently resist automated verification. Evaluating whether an analysis is insightful or an argument well-supported requires domain expert judgment. The system therefore requires substantial human-in-the-loop participation, currently relying on end-to-end quality checks (QUA-01, QUA-03) and manual review. This is an objective limitation of qualitative research MAS, not an architectural deficiency.

**Fault recovery**: The batch processing nature enables a pragmatic fault recovery strategy: stage-level reruns. If a stage fails, prior stages' outputs persist on the filesystem (a benefit of STR-02), and the system can resume from the failed stage. There is no fine-grained automatic retry mechanism, but for research tasks measured in hours rather than milliseconds, stage-level recovery is practical and sufficient.

**Cost and duration**: Complete analysis runs involve substantial API calls whose cost and duration are difficult to predict precisely. No patterns currently address cost estimation or budget control—an area where future patterns may emerge as the field matures.

### 8.3 Pattern Language Evolution

POMASA continues to evolve. The pattern catalog grew from 5 patterns in early versions to 20 patterns currently. Growth follows a pattern:

1. **Build systems**: Construct working MAS for real tasks
2. **Encounter problems**: Identify recurring challenges
3. **Extract patterns**: Abstract solutions that work across contexts
4. **Validate patterns**: Apply extracted patterns to new systems
5. **Document patterns**: Write patterns in standard format

The BHV-02 (Faithful Agent Instantiation) pattern illustrates this evolution. Early system versions suffered quality degradation in long call chains. Investigation revealed orchestrators were summarizing blueprints rather than having subagents read them directly. The pattern crystallized from debugging this failure mode. Later, production incidents revealed that subagents sometimes unilaterally lowered quality standards when facing difficulties—prompting the addition of "completion criteria are non-negotiable" to the pattern.

Patterns emerge from practice, not theory. POMASA captures what we've learned building declarative MAS. As more systems are built and more failure modes discovered, the pattern language will continue growing.

### 8.4 Contributions

This paper makes three contributions to the emerging field of declarative multi-agent systems:

**A pattern language**: POMASA provides 20 patterns organized by category (Core, Structure, Behavior, Quality) and necessity (Must, Recommended, Optional). The patterns address foundational challenges in declarative MAS: agent definition, runtime execution, inter-agent communication, coordination, and quality assurance.

**A case study**: The industry analysis system demonstrates patterns in practice. The system's outputs—including a 50,000-word analysis of the eVTOL industry grounded in hundreds of verifiable sources—validate that pattern-based construction produces substantive results.

**An insight about executability**: The paper argues that pattern languages become executable in the AI era. Unlike traditional patterns that require human translation into code, POMASA patterns can be interpreted by AI systems to generate working implementations. This property transforms what "open source" means: publishing patterns equals publishing source.

### 8.5 Future Work

This paper presents the foundational patterns and key insights of POMASA. Several directions warrant further investigation:

**Quality patterns in depth**: The current paper presents one Quality pattern (QUA-03) in detail. The remaining Quality patterns—Embedded Quality Standards (QUA-01) and Layered Quality Assurance (QUA-02)—deserve fuller treatment, as quality assurance remains one of the most challenging aspects of declarative MAS.

**Cross-domain validation**: POMASA has been applied primarily to research-oriented systems. Applying the pattern language to other domains—automated code review, competitive intelligence, educational content generation—would test the generality of the patterns and likely yield new ones.

**Pattern language evolution**: As the pattern catalog continues to grow, documenting the evolution process itself—how patterns emerge, mature, and occasionally become obsolete—would contribute to the pattern community's understanding of living pattern languages.

**Community applications and knowledge sharing**: Early adoption suggests that POMASA enables a wide variety of systems beyond its original research orientation. For example, a multi-agent news curation system uses agent groups for news collection, investigative writing, and translation to produce a weekly multilingual newsletter. Such diverse applications demonstrate that the pattern language can inspire creative system designs across domains. Documenting and sharing what practitioners build with POMASA—the problems they solve, the patterns they combine, and the new patterns they discover—would be valuable for empowering a broader community of declarative MAS builders.


We envision this paper as the first in a series, establishing the core architecture and the executability insight. Subsequent work will explore specific pattern categories in greater depth and document the pattern language's application across diverse domains.

### 8.6 Conclusion

The emergence of AI systems capable of understanding and executing natural language opens new possibilities for software architecture. Declarative multi-agent systems—where agents are defined by what they should achieve rather than how they should operate—represent one such possibility.

POMASA provides vocabulary and guidance for this emerging paradigm. The pattern language captures recurring solutions to common challenges, enabling practitioners to build on accumulated wisdom rather than rediscovering solutions independently.

More fundamentally, the executability of pattern languages suggests a shift in how architectural knowledge propagates. When patterns can be directly interpreted by AI systems, the distinction between "design documentation" and "source code" blurs. Architectural knowledge becomes directly actionable.

We offer POMASA as a contribution to this evolving field. The patterns are not final answers but current best understanding—understanding that will deepen as more systems are built, more failure modes discovered, and more solutions extracted into patterns. The pattern language is open for extension by the community of practitioners working in this space.

The AI era demands new thinking about software development. Pattern languages, refined over decades for human knowledge transfer, prove remarkably suitable for AI interpretation as well. POMASA demonstrates one way to harness this alignment, enabling the construction of sophisticated multi-agent systems through declarative specification and pattern-guided design.

